/**
 * lib/lattice/geometry.ts
 *
 * The hexagonal lattice, as data. Shared by the WebGL renderer and the SVG
 * fallback so the two tiers describe the same object and the choreography
 * matches (§5.2, fallback ladder).
 *
 * Flat-top hexagons on an axial grid. All coordinates are CSS pixels with the
 * origin at the centre of the viewport, which is also how the orthographic
 * camera is set up — 1 world unit = 1 px.
 */

export interface HexCell {
  /** Assembled centre — where the cell belongs. */
  cx: number;
  cy: number;
  /** Scatter offset applied in the FRACTURED state (12–40px, §5.3). */
  dx: number;
  dy: number;
  /** Scatter rotation in radians (2–8°, §5.3). */
  rot: number;
  /** 0 at the viewport centre → 1 at the furthest cell. Drives the assembly
   *  wave: cells nearest the centre settle first (§5.3). */
  order: number;
  /** Stable per-cell randomness. */
  seed: number;
}

export interface LatticeData {
  cells: HexCell[];
  radius: number;
  /** Unit-circle vertices of a flat-top hexagon, scaled by `radius`. */
  vertices: { x: number; y: number }[];
  width: number;
  height: number;
}

/** Deterministic PRNG — the lattice must look identical on every reload. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hexVertices(radius: number) {
  // Flat-top: first vertex at 0°.
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i;
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
  });
}

export function buildLattice(
  width: number,
  height: number,
  opts: { targetCells?: number; seed?: number } = {},
): LatticeData {
  const targetCells = opts.targetCells ?? 180;
  const rand = mulberry32(opts.seed ?? 0x4845584f); // "HEXO"

  // Solve for a radius that lands near the target cell count. Flat-top hexes
  // step 1.5R horizontally and √3·R vertically, so cells ≈ area / (2.598 R²).
  const area = width * height;
  let radius = Math.sqrt(area / (2.598 * targetCells));
  radius = Math.max(38, Math.min(84, radius));

  const stepX = radius * 1.5;
  const stepY = radius * Math.sqrt(3);

  // Overscan by one ring so the field never shows an edge.
  const cols = Math.ceil(width / stepX) + 2;
  const rows = Math.ceil(height / stepY) + 2;

  const cells: HexCell[] = [];
  let maxDist = 1;

  for (let q = -Math.ceil(cols / 2); q <= Math.ceil(cols / 2); q++) {
    for (let r = -Math.ceil(rows / 2); r <= Math.ceil(rows / 2); r++) {
      const cx = stepX * q;
      const cy = stepY * (r + q / 2);

      if (Math.abs(cx) > width / 2 + radius * 2) continue;
      if (Math.abs(cy) > height / 2 + radius * 2) continue;

      // 12–40px displacement in a random direction, 2–8° rotation.
      const angle = rand() * Math.PI * 2;
      const mag = 12 + rand() * 28;
      const rotDeg = (2 + rand() * 6) * (rand() > 0.5 ? 1 : -1);

      const dist = Math.hypot(cx, cy);
      maxDist = Math.max(maxDist, dist);

      cells.push({
        cx,
        cy,
        dx: Math.cos(angle) * mag,
        dy: Math.sin(angle) * mag,
        rot: (rotDeg * Math.PI) / 180,
        order: dist, // normalised below
        seed: rand(),
      });
    }
  }

  for (const cell of cells) cell.order = cell.order / maxDist;

  return { cells, radius, vertices: hexVertices(radius), width, height };
}

/* ---------------------------------------------------------------------------
 * ASSEMBLY MODEL — §5.3, shared by every tier.
 * ------------------------------------------------------------------------ */

/** Global assembly, 0 → 1, across the 0.25–0.70 progress window. */
export function assemblyOf(progress: number): number {
  return clamp01((progress - 0.25) / 0.45);
}

/**
 * Per-cell assembly. The wave propagates outward from the viewport centre:
 * a cell at `order` 0 starts immediately, a cell at 1 starts at 55% of the
 * window, and each takes the remaining 45% to seat.
 */
export function cellAssembly(progress: number, order: number): number {
  const p = assemblyOf(progress);
  return easeOut(clamp01((p - order * 0.55) / 0.45));
}

/**
 * Cyan flash as a cell seats — a Gaussian peak centred just before it locks
 * in. Scrub-safe in both directions, which a time-based decay would not be.
 */
export function seatFlash(local: number): number {
  const d = (local - 0.92) / 0.09;
  return Math.exp(-d * d);
}

/** Packet loss rate, packets/sec. ~6 lost per second when fully fractured. */
export function lossRate(progress: number): number {
  return 6 * (1 - assemblyOf(progress));
}

export function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

export function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
