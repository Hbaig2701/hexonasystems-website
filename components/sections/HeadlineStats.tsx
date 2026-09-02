'use client';

import { Odometer } from '@/components/ui/Odometer';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { useInView } from '@/lib/hooks';
import { HEADLINE_STATS } from '@/content/claims';

/**
 * The three headline stat cards from the reference design's About page:
 * icon, figure, label, one line of context.
 *
 * Each figure still rolls (Moment 3, §6.4) and still carries its source
 * annotation in micro type — §7.1 S6 is emphatic that annotating the source is
 * what separates a credible number from decoration, and putting three big
 * figures above the fold without one would undo that.
 *
 * Every value comes from content/claims.ts. Nothing is hardcoded here.
 */

const ICONS: IconName[] = ['businesses', 'value', 'award'];

export function HeadlineStats() {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);

  return (
    <div ref={ref} className="grid gap-5 md:grid-cols-3">
      {HEADLINE_STATS.map((claim, i) => (
        <Reveal key={claim.label} index={i}>
          <div
            data-glow="on"
            style={{ ['--glow-x' as string]: `${20 + i * 30}%` }}
            className="glow-card h-full rounded-md border border-hairline bg-surface p-7"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="text-accent">
                <Icon name={ICONS[i] ?? 'businesses'} />
              </span>
              <p className="type-figure text-[clamp(1.6rem,3vw,2.2rem)] text-primary">
                <Odometer value={claim.value} play={inView} />
              </p>
            </div>

            <p className="type-label mb-3 text-secondary">{claim.label}</p>
            <p className="type-micro max-w-[34ch] text-quaternary">{claim.annotation}</p>

            {claim.status === 'pending' && (
              <p className="type-micro mt-3 text-leak">⚠️ Pending verification · §12</p>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
