'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * FigureSettle — THE ONE MOMENT (§3.4).
 *
 * A currency figure resolves via mono odometer: digits settle right-to-left at
 * 40ms offsets over 900ms, then a hairline draws beneath.
 *
 * BUDGET: at most one per viewport, at most three per page. Permitted on the
 * enterprise-value line (§4 section 4) and the single headline figure on each
 * /evidence/[slug]. NOT on the homepage results table — six odometers rolling
 * in a table reads as a slot machine and contradicts "one moment". Table
 * figures render static. The component cannot enforce that; the page author
 * does, and `npm run check:motion` counts them.
 *
 * NO-JS: the idle state is the final value, so the server renders the number
 * already correct and a crawler sees it. To roll, the strip is primed to a
 * start offset for exactly one frame with transitions suppressed, then
 * released. prefers-reduced-motion renders the final value instantly.
 */

const ROLL_MS = 900;
const DIGIT_OFFSET_MS = 40;

type Phase = 'idle' | 'primed' | 'rolling' | 'settled';

export function FigureSettle({
  value,
  className,
  rule = true,
}: {
  value: string;
  className?: string;
  /** The hairline that draws beneath once the digits land. */
  rule?: boolean;
}) {
  const [phase, setPhase] = useState<Phase>('idle');
  const ref = useRef<HTMLSpanElement>(null);

  const chars = value.split('');
  const digitPositions = chars.map((c, i) => (/\d/.test(c) ? i : -1)).filter((i) => i >= 0);
  const totalMs = ROLL_MS + digitPositions.length * DIGIT_OFFSET_MS;

  // Fires once at 15% visibility, matching the standard entrance trigger.
  useEffect(() => {
    const el = ref.current;
    if (!el || phase !== 'idle') return;

    /* eslint-disable react-hooks/set-state-in-effect -- capability probe on mount */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('settled');
      return;
    }
    if (typeof IntersectionObserver === 'undefined') {
      setPhase('settled');
      return;
    }
    /* eslint-enable react-hooks/set-state-in-effect */

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setPhase('primed');
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [phase]);

  useEffect(() => {
    if (phase !== 'primed') return;
    const frame = requestAnimationFrame(() => setPhase('rolling'));
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'rolling') return;
    const t = window.setTimeout(() => setPhase('settled'), totalMs);
    return () => window.clearTimeout(t);
  }, [phase, totalMs]);

  const rolling = phase === 'rolling';
  const primed = phase === 'primed';
  const landed = phase === 'settled' || phase === 'idle';

  return (
    <span ref={ref} className={cn('relative inline-block', className)}>
      <span className="sr-only">{value}</span>

      <span aria-hidden="true" className="t-figure-lg inline-flex items-baseline">
        {chars.map((char, i) => {
          if (!/\d/.test(char)) return <span key={i}>{char}</span>;

          const fromRight = digitPositions.length - 1 - digitPositions.indexOf(i);
          const target = Number(char);
          const rows = primed ? target + 10 : target;

          return (
            <span
              key={i}
              className="relative inline-block overflow-hidden align-baseline"
              style={{ height: '1em' }}
            >
              {/* In-flow invisible twin: sets the cell width from real font
                  metrics AND establishes the baseline. Without an in-flow line
                  box the inline-block's baseline becomes its bottom edge, which
                  makes the separators look dropped. */}
              <span aria-hidden="true" style={{ visibility: 'hidden' }}>
                {char}
              </span>

              <span
                className="absolute inset-x-0 top-0 flex flex-col"
                style={{
                  transform: `translateY(${-rows}em)`,
                  transition: rolling
                    ? `transform ${ROLL_MS}ms var(--ease) ${fromRight * DIGIT_OFFSET_MS}ms`
                    : 'none',
                  letterSpacing: 0,
                }}
              >
                {Array.from({ length: 20 }, (_, d) => (
                  <span
                    key={d}
                    className="block text-center"
                    style={{ height: '1em', lineHeight: '1em' }}
                  >
                    {d % 10}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </span>

      {rule && (
        <span
          aria-hidden="true"
          className="absolute -bottom-4 left-0 block h-px w-full origin-left bg-brand"
          style={{
            transform: `scaleX(${landed ? 1 : 0})`,
            transition: 'transform 400ms var(--ease)',
          }}
        />
      )}
    </span>
  );
}
