import { cn } from '@/lib/cn';

/**
 * Lattice — the drifting hex field, carried over from v1.
 *
 * v1 ran this as a three-tier system: a three.js WebGL renderer of ~180 cells,
 * an animated SVG fallback of ~40, and a static tier for reduced motion, with a
 * capability probe and a runtime downgrade guard between them. All of that
 * existed because v1's lattice was SCROLL-DRIVEN and told a story: it began
 * fractured, assembled as you scrolled, and dropped packets through its gaps.
 *
 * This one is only ever background. It makes no argument, so it needs none of
 * that machinery: no WebGL, no three.js, no canvas, and NO CLIENT JAVASCRIPT AT
 * ALL. The grid is generated once at module scope from a seeded PRNG, so the
 * server and the browser produce byte-identical markup and it cannot cause a
 * hydration mismatch. Motion is two CSS animations.
 *
 * WHY THE CELLS ARE NUDGED OFF THEIR CENTRES. A true hexagonal tiling reads as
 * wallpaper, which is exactly how the first attempt at a hex field failed. Each
 * cell is displaced a few units in a random direction and rotated a few
 * degrees, which is v1's "fractured" state at roughly a tenth of its amplitude.
 * It reads as something drawn rather than something tiled.
 *
 * WHY THE DRIFT ALTERNATES rather than looping. A hex grid does tile, but these
 * per-cell displacements do not, so there is no translation that maps the field
 * back onto itself. A slow sway has no seam to get wrong.
 *
 * ── TWO EXPORTS, AND YOU NEED BOTH ────────────────────────────────────────
 *
 * <LatticeDefs/> emits the geometry ONCE per document and must be mounted in
 * the root layout. <Lattice/> is then only a viewport onto it, via <use>, so
 * putting the field on four sections costs four <use> elements instead of four
 * copies of 190 paths. Without the defs, <Lattice/> draws nothing.
 *
 * This is also why every visual property below is a presentation attribute or
 * an inline style rather than a class. <use> clones into a shadow tree that
 * document stylesheets are not guaranteed to reach, but attributes and inline
 * styles belong to the cloned element and always survive. `stroke` and `fill`
 * stay `currentColor`, which DOES inherit across that boundary, so each
 * instance still takes its colour from the surface it sits on.
 */

const VIEW_W = 1600;
const VIEW_H = 1000;
/* Cell size. Smaller means more cells and a finer weave; v1 ran ~180 cells over
   a viewport, which this is set to land near. Much larger and the field stops
   reading as a lattice and starts reading as a few big outlines. */
const RADIUS = 58;

/** Must match the lattice-pulse duration in globals.css. Delays are spread
 *  across one full cycle so the nodes twinkle instead of blinking in unison. */
const PULSE_SECONDS = 3.2;

const FIELD_ID = 'hex-lattice-field';

/** Deterministic PRNG, carried over from v1: the field must be identical on
 *  every render, on the server and in the browser. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Cell {
  path: string;
  /** Vertex chosen to carry a node dot, or null. */
  node: { x: number; y: number; delay: number } | null;
}

function buildField(): Cell[] {
  const rand = mulberry32(0x4845584f); // "HEXO", as in v1
  const stepX = RADIUS * 1.5;
  const stepY = RADIUS * Math.sqrt(3);

  // Overscan by one ring, which is all the +-16px drift can ever expose. The
  // first cut overscanned by two and culled loosely, which put 460 paths in
  // each instance and ~900 on the page; this lands near 190 for a field that
  // looks identical.
  const cols = Math.ceil(VIEW_W / stepX) + 2;
  const rows = Math.ceil(VIEW_H / stepY) + 2;
  const cells: Cell[] = [];

  for (let q = -Math.ceil(cols / 2); q <= Math.ceil(cols / 2); q++) {
    for (let r = -Math.ceil(rows / 2); r <= Math.ceil(rows / 2); r++) {
      const baseX = VIEW_W / 2 + stepX * q;
      const baseY = VIEW_H / 2 + stepY * (r + q / 2);
      if (baseX < -RADIUS || baseX > VIEW_W + RADIUS) continue;
      if (baseY < -RADIUS || baseY > VIEW_H + RADIUS) continue;

      const angle = rand() * Math.PI * 2;
      const mag = 2 + rand() * 8;
      const spin = ((rand() * 6 - 3) * Math.PI) / 180;
      const cx = baseX + Math.cos(angle) * mag;
      const cy = baseY + Math.sin(angle) * mag;

      // Flat-top hexagon, first vertex at 0deg, rotated by `spin`.
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 3) * i + spin;
        return { x: cx + Math.cos(a) * RADIUS, y: cy + Math.sin(a) * RADIUS };
      });

      const pick = rand();
      const dotRand = rand();
      cells.push({
        path:
          pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') +
          ' Z',
        // Roughly a quarter of cells carry a node. Any more and the field reads
        // as a starfield rather than as a structure.
        node:
          pick > 0.74
            ? {
                ...pts[Math.floor(dotRand * 6)],
                delay: Number((dotRand * PULSE_SECONDS).toFixed(2)),
              }
            : null,
      });
    }
  }
  return cells;
}

/* Built once, at module scope. Not per render, and not per mount. */
const FIELD = buildField();

/**
 * The geometry, emitted once per document. Mount this in the root layout.
 * It paints nothing on its own.
 */
export function LatticeDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: 'absolute' }}
    >
      <defs>
        <g id={FIELD_ID}>
          {FIELD.map((cell, i) => (
            <path
              key={i}
              d={cell.path}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.16"
            />
          ))}
          {FIELD.map((cell, i) =>
            cell.node ? (
              <circle
                key={`n${i}`}
                cx={cell.node.x.toFixed(1)}
                cy={cell.node.y.toFixed(1)}
                r="3"
                fill="currentColor"
                style={{
                  opacity: 0.18,
                  animation: `lattice-pulse ${PULSE_SECONDS}s ease-in-out infinite`,
                  animationDelay: `${cell.node.delay}s`,
                }}
              />
            ) : null,
          )}
        </g>
      </defs>
    </svg>
  );
}

/** One viewport onto the field. Requires <LatticeDefs/> in the document. */
export function Lattice({ className }: { className?: string }) {
  return (
    <svg
      className={cn('lattice', className)}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g className="lattice-drift">
        <use href={`#${FIELD_ID}`} />
      </g>
    </svg>
  );
}
