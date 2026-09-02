'use client';

import { SectionHeading } from '@/components/layout/SectionHeading';
import { Odometer } from '@/components/ui/Odometer';
import { useInView } from '@/lib/hooks';
import { NUMBERS_GRID } from '@/content/claims';
import { cn } from '@/lib/cn';

/**
 * SECTION 6 — THE NUMBERS. §7.1 S6.
 *
 * Headline kept from the current site — it has personality and it's the one
 * piece of existing copy worth saving.
 *
 * Six stats in a 3×2 grid with hairline dividers, all using the odometer roll,
 * each with a mono label and — critically — a SOURCE ANNOTATION in
 * --text-quaternary micro type. Annotating the source is what separates
 * credible numbers from decoration.
 *
 * Every figure comes from content/claims.ts. No statistic is hardcoded here.
 */
export function Numbers() {
  const [ref, inView] = useInView<HTMLDivElement>(0.55);

  return (
    <section className="band band-glow section-pad">
      <div className="page-shell">
        <SectionHeading
          eyebrow="By the numbers"
          index="06"
          sub="Every figure below carries the source it came from. That is the difference between a number and a decoration."
          className="mb-16"
        >
          For the <span className="text-accent">Numerically Inclined</span>
        </SectionHeading>

        {/* Cards rather than a bare hairline grid. Six figures floating in a
            column of grey text is the flattest possible way to present the most
            persuasive content on the page. */}
        <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NUMBERS_GRID.map((claim, i) => (
            <div
              key={claim.label}
              data-glow={i === 0 || i === 4 ? 'on' : undefined}
              style={{ ['--glow-x' as string]: `${(i % 3) * 45}%` }}
              className={cn(
                'glow-card flex flex-col rounded-md border border-hairline bg-surface p-7',
                'transition-colors duration-[320ms] hover:border-hairline-bright',
              )}
            >
              <p
                className={cn(
                  'type-figure mb-5 text-[clamp(2.4rem,4.5vw,3.4rem)]',
                  // The first figure in each row carries the accent, so the eye
                  // has somewhere to go rather than scanning six identical tiles.
                  i % 3 === 0 ? 'text-accent' : 'text-primary',
                )}
              >
                <Odometer value={claim.value} play={inView} />
              </p>

              <p className="type-label mb-2 text-secondary">{claim.label}</p>
              <p className="type-micro mt-auto pt-3 text-quaternary">{claim.annotation}</p>

              {claim.status === 'pending' && (
                <p className="type-micro mt-3 max-w-[32ch] text-leak">
                  ⚠️ Pending verification · §12
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="type-micro mx-auto mt-10 max-w-[70ch] text-center text-quaternary">
          ⚠️ §12: several of these publish conflicting versions across the current site, press
          releases and the portfolio page. Every figure must be locked to one value everywhere
          before launch. A prospect who notices two different numbers stops believing all of them.
        </p>
      </div>
    </section>
  );
}
