'use client';

import { useEffect, useState } from 'react';
import { Odometer } from './Odometer';
import { cn } from '@/lib/cn';
import { useInView, useReducedMotion } from '@/lib/hooks';
import type { CaseMetric } from '@/content/cases';

/**
 * MOMENT 5 — THE BEFORE/AFTER SWEEP. Spec §6.4.
 *
 * "On scroll-in, the 'before' state renders first with metrics in
 *  --signal-leak. After a 400ms hold, a 1px cyan divider sweeps left-to-right
 *  across the panel in 600ms, and as it passes each metric, that metric
 *  cross-fades to the 'after' value in --signal-sealed while the odometer
 *  rolls. THE SWEEP IS THE REVEAL MECHANISM — nothing changes until the line
 *  passes over it."
 *
 * Used in two places: the homepage featured case panel (§7.1 S5) and every case
 * study results section (§7.3).
 *
 * §6.5: with prefers-reduced-motion the sweep is disabled and both states are
 * simply present — the panel still makes its whole argument.
 */

const HOLD_MS = 400;
const SWEEP_MS = 600;

export function BeforeAfterPanel({
  metrics,
  className,
}: {
  metrics: CaseMetric[];
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const reduced = useReducedMotion();
  const [sweeping, setSweeping] = useState(false);
  const [swept, setSwept] = useState<number>(-1);

  // Reduced motion shows both columns outright — derived, not stored, so there
  // is no state to get out of sync with the preference changing mid-session.
  const revealed = reduced ? metrics.length : swept;

  useEffect(() => {
    if (!inView || reduced) return;

    const timers: number[] = [];
    timers.push(window.setTimeout(() => setSweeping(true), HOLD_MS));

    // Each metric flips as the line reaches it: the sweep crosses the "after"
    // column just past halfway, then travels down the stack.
    metrics.forEach((_, i) => {
      const at = HOLD_MS + SWEEP_MS * (0.5 + i * 0.14);
      timers.push(window.setTimeout(() => setSwept((r) => Math.max(r, i)), at));
    });

    return () => timers.forEach(window.clearTimeout);
  }, [inView, reduced, metrics]);

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-md border border-hairline bg-surface',
        className,
      )}
    >
      {/* The sweep itself — a 1px cyan divider crossing the panel left to
          right. Animating `left` rather than a transform is the one case where
          it is simpler and the cost is irrelevant: one 1px line, 600ms, once. */}
      {!reduced && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-10 w-px bg-accent shadow-[0_0_18px_var(--accent-glow)]"
          style={{
            left: sweeping ? '100%' : '0%',
            transition: `left ${SWEEP_MS}ms cubic-bezier(0.65,0,0.35,1), opacity 200ms linear`,
            opacity: sweeping && revealed >= metrics.length - 1 ? 0 : 1,
          }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2">
        <Column
          title="Before"
          metrics={metrics}
          side="before"
          revealed={revealed}
          className="border-b border-hairline md:border-b-0 md:border-r"
        />
        <Column title="After" metrics={metrics} side="after" revealed={revealed} />
      </div>
    </div>
  );
}

function Column({
  title,
  metrics,
  side,
  revealed,
  className,
}: {
  title: string;
  metrics: CaseMetric[];
  side: 'before' | 'after';
  revealed: number;
  className?: string;
}) {
  return (
    <div className={cn('p-6', className)}>
      <p className="type-label mb-5 text-quaternary">{title}</p>
      <div className="flex flex-col">
        {metrics.map((metric, i) => {
          const isRevealed = i <= revealed;
          const showValue = side === 'before' ? metric.before : metric.after;

          return (
            <div
              key={metric.label}
              className="flex items-baseline justify-between gap-6 border-b border-hairline py-3.5 last:border-b-0"
            >
              <span className="text-[13px] text-tertiary">{metric.label}</span>

              {side === 'before' ? (
                <span className="type-figure text-[17px] text-leak">{showValue}</span>
              ) : (
                <span
                  className="type-figure text-[17px] text-sealed transition-opacity duration-300"
                  style={{ opacity: isRevealed ? 1 : 0 }}
                >
                  <Odometer value={showValue} play={isRevealed} />
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
