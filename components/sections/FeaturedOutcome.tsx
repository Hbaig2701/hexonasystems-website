'use client';

import { Odometer } from '@/components/ui/Odometer';
import { useInView } from '@/lib/hooks';

/**
 * The +$80,000 figure, set at --text-display-2 with tabular lining figures.
 * §7.1 S5: "This one number is the most persuasive object on the entire site."
 *
 * The "+" is passed INTO the odometer rather than rendered beside it, so the
 * whole string shares one baseline and one letter-spacing rhythm. Rendering it
 * as a sibling span put it on a different box model from the digits.
 *
 * Rolls once at 55% viewport visibility (Moment 3). The value server-renders at
 * its final state, so with JS off it is simply there.
 */
export function FeaturedOutcome({ value, label }: { value: string; label: string }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.55);

  return (
    <div ref={ref} className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
      <Odometer
        value={`+${value}`}
        play={inView}
        className="text-accent"
        style={{ fontSize: 'var(--text-display-2)' }}
      />
      <span className="type-label text-secondary">{label}</span>
    </div>
  );
}
