'use client';

import { useEffect, useRef } from 'react';

/**
 * The living lattice behind the hero.
 *
 * Three hexagonal layers at different scales give it depth: the far layer is
 * large, faint and barely moves; the near layer is small, crisp and moves most
 * with the pointer and the scroll (parallax). Cyan pulses travel along the
 * edges of the middle layer vertex to vertex — work moving through the
 * business — and the cells nearest the pointer light up and lift towards it.
 *
 * On load the near layer assembles from a slightly fractured state, a nod to
 * v1's lattice, then settles.
 *
 * Cost control: one 2D canvas, DPR capped at 2, the loop stops when the hero is
 * off screen or the tab is hidden, and reduced-motion users get one static
 * frame. No dependencies.
 */

type Vec = { x: number; y: number };

interface Cell {
  cx: number;
  cy: number;
  /** Random fracture offset, eased to zero during assembly. */
  fx: number;
  fy: number;
  spin: number;
  delay: number;
  phase: number;
}

interface Layer {
  radius: number;
  alpha: number;
  width: number;
  parallax: number;
  color: string;
  cells: Cell[];
}

interface Pulse {
  from: number;
  to: number;
  t: number;
  speed: number;
  steps: number;
  prev: number;
}

const TEAL = '11, 85, 102';
const CYAN = '53, 198, 209';

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildCells(w: number, h: number, radius: number, rand: () => number): Cell[] {
  const stepX = radius * 1.5;
  const stepY = radius * Math.sqrt(3);
  const cells: Cell[] = [];
  const cols = Math.ceil(w / stepX) + 3;
  const rows = Math.ceil(h / stepY) + 3;
  for (let q = -1; q < cols; q++) {
    for (let r = -1; r < rows; r++) {
      const cx = q * stepX;
      const cy = r * stepY + (q % 2 === 0 ? 0 : stepY / 2);
      const a = rand() * Math.PI * 2;
      const m = radius * (0.25 + rand() * 0.6);
      cells.push({
        cx,
        cy,
        fx: Math.cos(a) * m,
        fy: Math.sin(a) * m,
        spin: (rand() - 0.5) * 0.5,
        delay: rand() * 0.6 + (cx / w) * 0.5,
        phase: rand() * Math.PI * 2,
      });
    }
  }
  return cells;
}

/** Shared vertices and edges of a flat-top hex grid, for the pulses to walk. */
function buildGraph(cells: Cell[], radius: number) {
  const verts: Vec[] = [];
  const index = new Map<string, number>();
  const adj: number[][] = [];
  const key = (x: number, y: number) => `${Math.round(x)}:${Math.round(y)}`;
  const vid = (x: number, y: number) => {
    const k = key(x, y);
    let i = index.get(k);
    if (i === undefined) {
      i = verts.length;
      verts.push({ x, y });
      index.set(k, i);
      adj.push([]);
    }
    return i;
  };
  for (const c of cells) {
    const ids: number[] = [];
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i;
      ids.push(vid(c.cx + Math.cos(a) * radius, c.cy + Math.sin(a) * radius));
    }
    for (let i = 0; i < 6; i++) {
      const a = ids[i];
      const b = ids[(i + 1) % 6];
      if (!adj[a].includes(b)) adj[a].push(b);
      if (!adj[b].includes(a)) adj[b].push(a);
    }
  }
  return { verts, adj };
}

const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3);

export function LatticeCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rand = rng(0x4845584f);

    let w = 0;
    let h = 0;
    let layers: Layer[] = [];
    let graph = { verts: [] as Vec[], adj: [] as number[][] };
    let pulses: Pulse[] = [];
    let raf = 0;
    let running = false;
    let start = performance.now();
    let last = start;

    // Pointer, smoothed so the field glides rather than snapping.
    const pointer = { x: 0.7, y: 0.4, tx: 0.7, ty: 0.4, active: 0, tActive: 0 };
    let scroll = 0;

    const spawnPulse = (): Pulse => {
      const n = graph.verts.length;
      // Bias starts to the right half, where the copy is not.
      let from = Math.floor(rand() * n);
      for (let i = 0; i < 6 && graph.verts[from].x < w * 0.45; i++) from = Math.floor(rand() * n);
      const nb = graph.adj[from];
      return {
        from,
        to: nb[Math.floor(rand() * nb.length)] ?? from,
        t: 0,
        speed: 0.9 + rand() * 1.2,
        steps: 6 + Math.floor(rand() * 10),
        prev: -1,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const small = w < 700;
      const base = small ? 34 : 46;
      layers = [
        { radius: base * 2.4, alpha: 0.07, width: 1, parallax: 6, color: TEAL, cells: [] },
        { radius: base * 1.35, alpha: 0.12, width: 1, parallax: 14, color: TEAL, cells: [] },
        { radius: base, alpha: 0.2, width: 1.25, parallax: 26, color: TEAL, cells: [] },
      ];
      for (const l of layers) l.cells = buildCells(w + 80, h + 80, l.radius, rand);
      graph = buildGraph(layers[1].cells, layers[1].radius);
      pulses = Array.from({ length: small ? 7 : 14 }, spawnPulse);
    };

    const hexPath = (cx: number, cy: number, r: number, spin: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i + spin;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    const frame = (now: number) => {
      const t = (now - start) / 1000;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      pointer.active += (pointer.tActive - pointer.active) * 0.05;

      ctx.clearRect(0, 0, w, h);
      const px = pointer.x * w;
      const py = pointer.y * h;
      const ox = (pointer.x - 0.5);
      const oy = (pointer.y - 0.5);
      const assemble = reduced ? 1 : easeOut(t / 2.2);

      for (let li = 0; li < layers.length; li++) {
        const l = layers[li];
        const shiftX = -ox * l.parallax - 40;
        const shiftY = -oy * l.parallax - 40 - scroll * (li + 1) * 0.08;
        const near = li === layers.length - 1;
        ctx.lineWidth = l.width;

        for (const c of l.cells) {
          const local = near ? easeOut((t - c.delay) / 1.4) : assemble;
          const breathe = reduced ? 0 : Math.sin(t * 0.6 + c.phase) * 0.6;
          let cx = c.cx + shiftX + c.fx * (1 - local);
          let cy = c.cy + shiftY + c.fy * (1 - local) + breathe;
          if (cy < -l.radius * 2 || cy > h + l.radius * 2 || cx < -l.radius * 2 || cx > w + l.radius * 2) continue;

          // Proximity to the pointer: brighter, slightly larger, pulled a touch closer.
          const dx = px - cx;
          const dy = py - cy;
          const d = Math.sqrt(dx * dx + dy * dy);
          const glow = near ? Math.max(0, 1 - d / 260) * pointer.active : 0;
          cx += dx * glow * 0.06;
          cy += dy * glow * 0.06;
          const r = l.radius * (0.92 + glow * 0.08);
          const a = l.alpha * (near ? local : 1) + glow * 0.35;

          hexPath(cx, cy, r, c.spin * (1 - local));
          if (glow > 0.05) {
            ctx.fillStyle = `rgba(${CYAN}, ${glow * 0.1})`;
            ctx.fill();
            ctx.strokeStyle = `rgba(${CYAN}, ${Math.min(a + 0.1, 0.8)})`;
          } else {
            ctx.strokeStyle = `rgba(${l.color}, ${a})`;
          }
          ctx.stroke();
        }
      }

      // Pulses on the middle layer.
      const mid = layers[1];
      const msx = -ox * mid.parallax - 40;
      const msy = -oy * mid.parallax - 40 - scroll * 2 * 0.08;
      if (!reduced && t > 1.2) {
        for (let i = 0; i < pulses.length; i++) {
          const p = pulses[i];
          p.t += dt * p.speed;
          if (p.t >= 1) {
            p.steps -= 1;
            if (p.steps <= 0) {
              pulses[i] = spawnPulse();
              continue;
            }
            const options = graph.adj[p.to].filter((v) => v !== p.from);
            p.prev = p.from;
            p.from = p.to;
            p.to = options[Math.floor(rand() * options.length)] ?? p.prev;
            p.t = 0;
          }
          const a = graph.verts[p.from];
          const b = graph.verts[p.to];
          const x = a.x + (b.x - a.x) * p.t + msx;
          const y = a.y + (b.y - a.y) * p.t + msy;
          const ax = a.x + msx;
          const ay = a.y + msy;
          const fade = Math.min(1, p.steps / 3);

          // The lit edge behind the pulse.
          const grad = ctx.createLinearGradient(ax, ay, x, y);
          grad.addColorStop(0, `rgba(${CYAN}, 0)`);
          grad.addColorStop(1, `rgba(${CYAN}, ${0.85 * fade})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(x, y);
          ctx.stroke();

          ctx.fillStyle = `rgba(${CYAN}, ${0.18 * fade})`;
          ctx.beginPath();
          ctx.arc(x, y, 9, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(${CYAN}, ${fade})`;
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (running) raf = requestAnimationFrame(frame);
    };

    const play = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    start = performance.now();
    if (reduced) frame(start + 10_000);

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : pause()), {
      threshold: 0,
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? pause() : play());
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = (e.clientX - rect.left) / rect.width;
      pointer.ty = (e.clientY - rect.top) / rect.height;
      pointer.tActive = e.clientY >= rect.top && e.clientY <= rect.bottom ? 1 : 0;
    };
    const onLeave = () => (pointer.tActive = 0);
    const onScroll = () => (scroll = window.scrollY);
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        if (reduced) frame(start + 10_000);
      }, 120);
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      pause();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
