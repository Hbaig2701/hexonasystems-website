'use client';

import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { useInView, useReducedMotion } from '@/lib/hooks';
import { cn } from '@/lib/cn';

/**
 * SECTION 2 — THE DIAGNOSIS. §7.1 S2.
 *
 * Copy in columns 1–6. Columns 7–12 hold four stacked "seam" panels.
 * On scroll-in each bar draws left to right, then a gap opens in the middle
 * with a small cyan packet falling out of it. Stagger 120ms.
 * Simple, cheap, and it makes the abstract point physical.
 */

const SEAMS = [
  { from: 'Lead source', to: 'CRM' },
  { from: 'CRM', to: 'Assignment' },
  { from: 'Assignment', to: 'Follow-up' },
  { from: 'Follow-up', to: 'Fulfillment' },
];

export function Diagnosis() {
  const [ref, inView] = useInView<HTMLDivElement>(0.35);
  const reduced = useReducedMotion();
  const active = inView || reduced;

  return (
    <section className="section-pad">
      <div className="page-shell">
        <SectionHeading
          eyebrow="The diagnosis"
          index="01"
          sub="Nobody notices, because nothing breaks."
          className="mb-16"
        >
          Growth doesn&apos;t break companies.{' '}
          <span className="text-accent">Coordination does.</span>
        </SectionHeading>

        <div className="grid-12 gap-y-14">
          <div className="[grid-column:1/7]">
            <Reveal index={1}>
              <p className="type-body mb-6 max-w-[58ch] text-secondary">
                You added a channel. Then a tool to manage the channel. Then someone to manage the
                tool. Now a lead comes in through one system, gets logged in a second, assigned in a
                third, and followed up from a fourth. Every seam between them is a place where
                something gets dropped.
              </p>
            </Reveal>
            <Reveal index={2}>
              <p className="type-body max-w-[58ch] text-secondary">
                Nobody notices, because nothing breaks. Revenue just quietly stops arriving.
              </p>
            </Reveal>
          </div>

          <div ref={ref} className="flex flex-col gap-4 [grid-column:8/13]">
            {SEAMS.map((seam, i) => (
              <Seam key={seam.from} seam={seam} index={i} active={active} reduced={reduced} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Seam({
  seam,
  index,
  active,
  reduced,
}: {
  seam: { from: string; to: string };
  index: number;
  active: boolean;
  reduced: boolean;
}) {
  const delay = index * 120;

  return (
    <div className="relative">
      <div className="flex items-center gap-3 rounded-md border border-hairline bg-surface px-4 py-3.5">
        <span className="type-label shrink-0 text-secondary">{seam.from}</span>

        {/* The seam: a rule that draws in, then opens a gap in the middle. */}
        <span className="relative h-px flex-1" aria-hidden="true">
          <span
            className={cn(
              'absolute inset-0 origin-left bg-hairline-bright',
              !reduced && 'transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
            )}
            style={{
              transform: active || reduced ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: `${delay}ms`,
            }}
          />
          {/* The gap — a notch punched out of the middle of the rule. */}
          <span
            className={cn(
              'absolute left-1/2 top-1/2 h-1 w-6 -translate-x-1/2 -translate-y-1/2 bg-surface',
              !reduced && 'transition-opacity duration-300',
            )}
            style={{ opacity: active ? 1 : 0, transitionDelay: `${delay + 600}ms` }}
          />
          {/* The packet falling out of it. */}
          {!reduced && (
            <span
              className="absolute left-1/2 top-1/2 block h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent"
              style={{
                animation: active ? `seam-drop 1800ms linear ${delay + 700}ms infinite` : 'none',
                opacity: active ? undefined : 0,
              }}
            />
          )}
        </span>

        <span className="type-label shrink-0 text-secondary">{seam.to}</span>
      </div>
    </div>
  );
}
