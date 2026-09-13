'use client';

import { SectionHeading } from '@/components/layout/SectionHeading';
import { Icon } from '@/components/ui/Icon';
import { useInView, useReducedMotion } from '@/lib/hooks';
import { COMPARISON, COMPARISON_HEADINGS } from '@/content/positioning';
import { cn } from '@/lib/cn';

/**
 * WHAT MAKES US STAND OUT — the ✕/✓ comparison from the reference design.
 *
 * The strongest single pattern in it: every line on the right is a claim a
 * competitor cannot copy, which is exactly the §13 test for whether copy is
 * doing work. Kept close to the original wording.
 *
 * Motion: the two columns enter together, then the rows tick in one at a time
 * left-to-right at 70ms — the ✓ column trailing the ✕ column by a beat, so the
 * eye finishes on the right. Rows are `<li>` inside real lists, and the ✕/✓ are
 * `aria-hidden` with the meaning carried in visually-hidden text, because
 * §10.4 forbids conveying information by icon or colour alone.
 */
export function Comparison({ index = '05' }: { index?: string } = {}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  const reduced = useReducedMotion();
  const on = inView || reduced;

  return (
    <section className="band band-glow section-pad">
      <div className="page-shell">
        <SectionHeading
          eyebrow="Why us"
          index={index}
          sub="Choosing to work with Hexona should be a straightforward decision. Here is the arithmetic."
          className="mb-16"
        >
          What makes us <span className="text-accent">stand out</span> in the industry
        </SectionHeading>

        <div ref={ref} className="mx-auto grid max-w-[980px] gap-5 md:grid-cols-2">
          {/* --- Them --- */}
          <div
            className={cn(
              'rounded-md border border-hairline bg-surface p-7 transition-[opacity,transform] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
              on ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
            )}
          >
            <h3 className="type-label mb-7 text-tertiary">{COMPARISON_HEADINGS.them}</h3>
            <ul className="flex flex-col gap-4">
              {COMPARISON.map((row, i) => (
                <li
                  key={row.them}
                  className={cn(
                    'flex items-start gap-3 transition-[opacity,transform] duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
                    on ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0',
                  )}
                  style={{ transitionDelay: reduced ? '0ms' : `${180 + i * 70}ms` }}
                >
                  <Icon name="cross" className="mt-0.5 shrink-0 text-quaternary" />
                  <span className="text-small text-tertiary">
                    <span className="sr-only">Other agencies: </span>
                    {row.them}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Us. Carries the glow, so the eye lands here. --- */}
          <div
            data-glow={on ? 'on' : 'off'}
            className={cn(
              'glow-card rounded-md border border-accent/25 bg-surface p-7',
              'transition-[opacity,transform] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
              on ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
            )}
            style={{ transitionDelay: reduced ? '0ms' : '90ms' }}
          >
            <h3 className="type-label mb-7 text-primary">{COMPARISON_HEADINGS.us}</h3>
            <ul className="flex flex-col gap-4">
              {COMPARISON.map((row, i) => (
                <li
                  key={row.us}
                  className={cn(
                    'flex items-start gap-3 transition-[opacity,transform] duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
                    on ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0',
                  )}
                  style={{ transitionDelay: reduced ? '0ms' : `${250 + i * 70}ms` }}
                >
                  <Icon name="check" className="mt-0.5 shrink-0 text-accent" />
                  <span className="text-small text-primary">
                    <span className="sr-only">Hexona: </span>
                    {row.us}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
