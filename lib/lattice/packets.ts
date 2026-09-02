/**
 * lib/lattice/packets.ts — the data packets that travel the lattice.
 *
 * §5.3, per state:
 *   FRACTURED  packets travel along cell edges, reach a gap, and FALL —
 *              accelerating downward, fading out, tinting to --signal-leak.
 *              Roughly 6 lost per second.
 *   ASSEMBLING loss rate falls proportionally with progress.
 *   SEALED     zero lost. Packets travel continuous multi-cell paths, leaving
 *              a 3-cell-long cyan trail.
 *
 * Renderer-agnostic on purpose: the WebGL tier feeds the output into a Points
 * buffer, and the same maths would drive the SVG tier if it ever needs packets.
 */

import { cellAssembly, type LatticeData } from './geometry';

export const TRAIL_LENGTH = 3; // "a 3-cell-long cyan trail" (§5.3)

const SPEED = 105; // px/sec along an edge
const GRAVITY = 900; // px/sec² once falling
const FALL_FADE = 1.1; // seconds from fall start to fully faded
/** Per-vertex chance of finding a gap, scaled by how unassembled the cell is.
 *  Tuned so a fully fractured lattice loses ≈6 packets/sec (§5.3). */
const GAP_CHANCE = 0.035;

export const ACCENT_RGB = [0.1333, 0.8275, 0.9333] as const; // #22D3EE — brand cyan
export const LEAK_RGB = [1.0, 0.3608, 0.3608] as const; //   #FF5C5C — --signal-leak

interface Packet {
  cell: number;
  edge: number;
  t: number;
  falling: boolean;
  vy: number;
  fallAge: number;
  x: number;
  y: number;
  trail: number[]; // flat [x0,y0,x1,y1,...], newest first
}

export class PacketSystem {
  readonly count: number;
  readonly slots: number; // head + trail, per packet

  private lattice: LatticeData;
  private packets: Packet[] = [];
  private neighbors: Int32Array;
  private rand: () => number;
  private trailTimer = 0;

  /** Interleaved output buffers, sized `count * slots`. */
  readonly positions: Float32Array;
  readonly colors: Float32Array;
  readonly alphas: Float32Array;
  readonly sizes: Float32Array;

  constructor(lattice: LatticeData, count = 120) {
    this.lattice = lattice;
    this.count = count;
    this.slots = 1 + TRAIL_LENGTH;

    let seed = 0x9e3779b9;
    this.rand = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };

    const total = count * this.slots;
    this.positions = new Float32Array(total * 3);
    this.colors = new Float32Array(total * 3);
    this.alphas = new Float32Array(total);
    this.sizes = new Float32Array(total);

    this.neighbors = this.buildNeighbors();

    for (let i = 0; i < count; i++) this.packets.push(this.spawn());
  }

  /** Neighbour index across each of the six edges, or -1 at the field boundary. */
  private buildNeighbors(): Int32Array {
    const { cells, radius } = this.lattice;
    const step = radius * Math.sqrt(3);
    const key = (x: number, y: number) => `${Math.round(x)}:${Math.round(y)}`;

    const index = new Map<string, number>();
    cells.forEach((c, i) => index.set(key(c.cx, c.cy), i));

    const out = new Int32Array(cells.length * 6).fill(-1);
    for (let i = 0; i < cells.length; i++) {
      for (let e = 0; e < 6; e++) {
        // Edge e runs from vertex e to vertex e+1; its outward normal sits at
        // 30° + 60°e, one full cell-step away.
        const angle = (Math.PI / 180) * (30 + 60 * e);
        const nx = cells[i].cx + Math.cos(angle) * step;
        const ny = cells[i].cy + Math.sin(angle) * step;
        out[i * 6 + e] = index.get(key(nx, ny)) ?? -1;
      }
    }
    return out;
  }

  private spawn(): Packet {
    const cell = Math.floor(this.rand() * this.lattice.cells.length);
    return {
      cell,
      edge: Math.floor(this.rand() * 6),
      t: this.rand(),
      falling: false,
      vy: 0,
      fallAge: 0,
      x: 0,
      y: 0,
      trail: [],
    };
  }

  private respawn(p: Packet) {
    p.cell = Math.floor(this.rand() * this.lattice.cells.length);
    p.edge = Math.floor(this.rand() * 6);
    p.t = 0;
    p.falling = false;
    p.vy = 0;
    p.fallAge = 0;
    p.trail.length = 0;
  }

  /** Current rendered position of a cell vertex, honouring assembly state. */
  private vertexAt(cellIdx: number, vertexIdx: number, progress: number, out: [number, number]) {
    const cell = this.lattice.cells[cellIdx];
    const local = cellAssembly(progress, cell.order);
    const rot = cell.rot * (1 - local);
    const v = this.lattice.vertices[vertexIdx % 6];
    const c = Math.cos(rot);
    const s = Math.sin(rot);
    out[0] = cell.cx + cell.dx * (1 - local) + (v.x * c - v.y * s);
    out[1] = cell.cy + cell.dy * (1 - local) + (v.x * s + v.y * c);
  }

  private a: [number, number] = [0, 0];
  private b: [number, number] = [0, 0];

  update(
    dt: number,
    progress: number,
    field: {
      mouseX: number;
      mouseY: number;
      mouseActive: number;
      converge: number;
      convergeX: number;
      convergeY: number;
    },
  ) {
    const { height } = this.lattice;
    const sealed = progress > 0.7;
    const dtc = Math.min(dt, 0.05); // clamp after a tab stall

    this.trailTimer += dtc;
    const recordTrail = this.trailTimer > 0.05;
    if (recordTrail) this.trailTimer = 0;

    for (let i = 0; i < this.packets.length; i++) {
      const p = this.packets[i];

      if (p.falling) {
        p.vy += GRAVITY * dtc;
        p.y -= p.vy * dtc;
        p.fallAge += dtc;
        if (p.fallAge > FALL_FADE || p.y < -height / 2 - 80) this.respawn(p);
      } else {
        const cell = this.lattice.cells[p.cell];
        const local = cellAssembly(progress, cell.order);

        // Cursor accelerates packets within the field in the sealed state (§5.4).
        let speed = SPEED;
        if (sealed && field.mouseActive > 0) {
          const d = Math.hypot(cell.cx - field.mouseX, cell.cy - field.mouseY);
          if (d < 220) speed *= 1 + 0.4 * (1 - d / 220);
        }

        this.vertexAt(p.cell, p.edge, progress, this.a);
        this.vertexAt(p.cell, p.edge + 1, progress, this.b);
        const edgeLen = Math.hypot(this.b[0] - this.a[0], this.b[1] - this.a[1]) || 1;

        p.t += (speed * dtc) / edgeLen;

        if (p.t >= 1) {
          p.t = 0;
          // At each vertex the packet either continues, hops to the adjacent
          // cell, or finds a gap and falls. Gaps close as the cell assembles.
          const gapChance = GAP_CHANCE * (1 - local);
          if (this.rand() < gapChance) {
            p.falling = true;
            p.vy = 20;
            p.fallAge = 0;
          } else {
            const next = this.neighbors[p.cell * 6 + p.edge];
            // Sealed: continuous multi-cell paths. Otherwise stay on this cell.
            if (local > 0.98 && next >= 0 && this.rand() < 0.55) {
              p.cell = next;
              p.edge = (p.edge + 3 + 1) % 6; // enter along the shared edge
            } else {
              p.edge = (p.edge + 1) % 6;
            }
          }
          this.vertexAt(p.cell, p.edge, progress, this.a);
          this.vertexAt(p.cell, p.edge + 1, progress, this.b);
        }

        p.x = this.a[0] + (this.b[0] - this.a[0]) * p.t;
        p.y = this.a[1] + (this.b[1] - this.a[1]) * p.t;
      }

      // MOMENT 6 — convergence toward the closing CTA (§6.4).
      if (field.converge > 0) {
        const k = field.converge;
        p.x += (field.convergeX - p.x) * k;
        p.y += (field.convergeY - p.y) * k;
      }

      if (recordTrail) {
        p.trail.unshift(p.x, p.y);
        if (p.trail.length > TRAIL_LENGTH * 2) p.trail.length = TRAIL_LENGTH * 2;
      }

      this.writeSlots(i, p, sealed);
    }
  }

  private writeSlots(i: number, p: Packet, sealed: boolean) {
    const base = i * this.slots;
    const fallFade = p.falling ? Math.max(0, 1 - p.fallAge / FALL_FADE) : 1;

    // Head
    this.write(base, p.x, p.y, p.falling, fallFade, 1);

    // Trail — only in the sealed state, where packets leave a 3-cell cyan
    // trail. Before that the lattice is meant to look sparse and lossy.
    for (let t = 0; t < TRAIL_LENGTH; t++) {
      const slot = base + 1 + t;
      const hasPoint = sealed && !p.falling && p.trail.length >= (t + 1) * 2;
      if (!hasPoint) {
        this.alphas[slot] = 0;
        this.sizes[slot] = 0;
        continue;
      }
      this.write(slot, p.trail[t * 2], p.trail[t * 2 + 1], false, 1, 0.45 * (1 - t / TRAIL_LENGTH));
    }
  }

  private write(
    slot: number,
    x: number,
    y: number,
    falling: boolean,
    fade: number,
    alphaScale: number,
  ) {
    this.positions[slot * 3] = x;
    this.positions[slot * 3 + 1] = y;
    this.positions[slot * 3 + 2] = 0;

    // Falling packets tint from cyan to --signal-leak as they fall.
    const mix = falling ? 1 - fade : 0;
    for (let c = 0; c < 3; c++) {
      this.colors[slot * 3 + c] = ACCENT_RGB[c] + (LEAK_RGB[c] - ACCENT_RGB[c]) * mix;
    }

    this.alphas[slot] = fade * alphaScale;
    // Falling packets grow slightly — §6.4 Moment 4 leans on packet size as a
    // carrier of deal value, and the same treatment reads here as weight.
    this.sizes[slot] = falling ? 3.4 : 2.6 * (alphaScale > 0.9 ? 1 : 0.8);
  }
}
