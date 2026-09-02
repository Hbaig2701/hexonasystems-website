'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { buildLattice, cellAssembly, seatFlash, type LatticeData } from '@/lib/lattice/geometry';
import { latticeState } from '@/lib/lattice/state';

/**
 * THE LATTICE — tiers 2 and 3, spec §5.2.
 *
 *   mode="animated"  Tier 2. Same choreography as the WebGL renderer, ~40 cells
 *                    instead of ~180. Used when WebGL2 is unavailable, on
 *                    low-power devices, and after a runtime downgrade.
 *   mode="static"    Tier 3. prefers-reduced-motion. The ASSEMBLED lattice,
 *                    NO motion at all. The page must be completely
 *                    comprehensible in this state.
 *
 * Both are aria-hidden — the lattice is decorative, and every argument it makes
 * is also made in words (§10.4).
 */

const SVG_CELLS = 40;
const PACKETS = 18;

function hexPath(lattice: LatticeData): string {
  return (
    lattice.vertices.map((v, i) => `${i === 0 ? 'M' : 'L'}${v.x.toFixed(2)} ${v.y.toFixed(2)}`).join(' ') +
    ' Z'
  );
}

export function LatticeSVG({ mode }: { mode: 'animated' | 'static' }) {
  const [size, setSize] = useState({ w: 1440, h: 900 });

  useEffect(() => {
    const read = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    read();
    window.addEventListener('resize', read, { passive: true });
    return () => window.removeEventListener('resize', read);
  }, []);

  const lattice = useMemo(
    () => buildLattice(size.w, size.h, { targetCells: SVG_CELLS }),
    [size.w, size.h],
  );

  const path = useMemo(() => hexPath(lattice), [lattice]);
  const groupsRef = useRef<(SVGGElement | null)[]>([]);
  const packetsRef = useRef<(SVGCircleElement | null)[]>([]);

  /* --- Tier 2: the same assembly, driven by the same progress value ------- */
  useEffect(() => {
    if (mode !== 'animated') return;

    let raf = 0;
    let running = true;
    let t = 0;
    let last = performance.now();

    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;

      const progress = latticeState.progress;

      for (let i = 0; i < lattice.cells.length; i++) {
        const g = groupsRef.current[i];
        if (!g) continue;
        const cell = lattice.cells[i];
        const local = cellAssembly(progress, cell.order);
        const x = cell.cx + cell.dx * (1 - local);
        const y = cell.cy + cell.dy * (1 - local);
        const rot = (cell.rot * (1 - local) * 180) / Math.PI;

        g.setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${rot.toFixed(2)})`);
        g.setAttribute('stroke-opacity', (0.22 + 0.2 * local).toFixed(3));

        const flash = seatFlash(local);
        g.setAttribute('stroke', flash > 0.15 ? 'var(--accent)' : 'var(--hairline-bright)');
      }

      // Packets: a small number, on a simple orbit around their own cell, and
      // falling through the gaps while the lattice is still fractured.
      for (let i = 0; i < PACKETS; i++) {
        const c = packetsRef.current[i];
        if (!c) continue;
        const cell = lattice.cells[(i * 7) % lattice.cells.length];
        const local = cellAssembly(progress, cell.order);
        const phase = (t * 0.28 + i / PACKETS) % 1;
        const edge = Math.floor(phase * 6);
        const et = phase * 6 - edge;
        const v0 = lattice.vertices[edge];
        const v1 = lattice.vertices[(edge + 1) % 6];

        const cx = cell.cx + cell.dx * (1 - local) + v0.x + (v1.x - v0.x) * et;
        const cy = cell.cy + cell.dy * (1 - local) + v0.y + (v1.y - v0.y) * et;

        // While fractured, a share of packets fall out of the gaps.
        const falls = (i % 3 === 0) && local < 0.9;
        const fallPhase = falls ? ((t * 0.6 + i * 0.13) % 1) : 0;
        const drop = falls ? fallPhase * fallPhase * 260 : 0;

        c.setAttribute('cx', cx.toFixed(2));
        c.setAttribute('cy', (cy - drop).toFixed(2));
        c.setAttribute('fill', falls ? 'var(--signal-leak)' : 'var(--accent)');
        c.setAttribute('opacity', falls ? (1 - fallPhase).toFixed(2) : '0.9');
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [mode, lattice]);

  const isStatic = mode === 'static';

  return (
    <svg
      aria-hidden="true"
      role="presentation"
      focusable="false"
      className="pointer-events-none fixed inset-0 h-full w-full"
      viewBox={`${-size.w / 2} ${-size.h / 2} ${size.w} ${size.h}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* SVG y grows downward; the lattice model uses y-up like the WebGL tier. */}
      <g transform="scale(1,-1)">
        {lattice.cells.map((cell, i) => (
          <g
            key={i}
            ref={(el) => {
              groupsRef.current[i] = el;
            }}
            transform={
              isStatic
                ? `translate(${cell.cx.toFixed(2)} ${cell.cy.toFixed(2)})`
                : `translate(${(cell.cx + cell.dx).toFixed(2)} ${(cell.cy + cell.dy).toFixed(2)}) rotate(${((cell.rot * 180) / Math.PI).toFixed(2)})`
            }
            stroke="var(--hairline-bright)"
            strokeOpacity={isStatic ? 0.42 : 0.22}
            strokeWidth={1}
            fill="none"
          >
            <path d={path} />
          </g>
        ))}

        {!isStatic &&
          Array.from({ length: PACKETS }, (_, i) => (
            <circle
              key={i}
              ref={(el) => {
                packetsRef.current[i] = el;
              }}
              r={2}
              cx={0}
              cy={0}
              fill="var(--accent)"
              opacity={0.9}
            />
          ))}

        {/* Static tier keeps a few packets at rest on the sealed lattice so the
            image still reads as a system carrying something. Nothing moves. */}
        {isStatic &&
          Array.from({ length: 10 }, (_, i) => {
            const cell = lattice.cells[(i * 11) % lattice.cells.length];
            const v = lattice.vertices[i % 6];
            return (
              <circle
                key={i}
                r={2}
                cx={cell.cx + v.x}
                cy={cell.cy + v.y}
                fill="var(--accent)"
                opacity={0.75}
              />
            );
          })}
      </g>
    </svg>
  );
}
