'use client';

import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Accordion } from '@/components/ui/Accordion';
import { useInView, useReducedMotion } from '@/lib/hooks';
import { cn } from '@/lib/cn';

/**
 * SECTION 7 — THE METHOD. §7.1 S7.
 *
 * The three diagnostic questions are Hamza's own framework from the
 * amplification article — strong, differentiated thinking, presented as an
 * interactive element rather than a bullet list.
 *
 * Below them, the four-step process strip: on scroll a 1px cyan line draws
 * horizontally through the four steps, left to right, over 1.2s, illuminating
 * each step's number as it passes.
 */

const QUESTIONS = [
  {
    question: 'Would a thousand AI-generated pieces all tell the same story about your company?',
    answer:
      'If the answer is no, you do not have a content problem. You have a definition problem. Volume will only multiply the inconsistency, and it will do it faster than anyone can review it.',
  },
  {
    question: 'Do your departments describe what you do in the same language?',
    answer:
      'Sales says one thing, fulfillment says another, and the customer experiences the gap between them as a company that does not know itself. Automation hardens whichever version it is pointed at.',
  },
  {
    question: 'Strip the logo off every touchpoint. Is it still recognisably you?',
    answer:
      'If not, what you have is a logo rather than a system. Anything built on top of it inherits that, at scale.',
  },
];

const STEPS = [
  { index: '01', title: 'Map', copy: 'Every path revenue takes through your operation, and every seam.' },
  { index: '02', title: 'Quantify', copy: 'What each gap costs annually. Priorities set by dollars, not opinion.' },
  { index: '03', title: 'Build', copy: 'Bespoke implementation on the Hexona engine. No downtime.' },
  {
    index: '04',
    title: 'Compound',
    copy: 'Measured against revenue and profit, the only two metrics that count.',
  },
];

export function Method() {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const reduced = useReducedMotion();
  const drawn = inView || reduced;

  return (
    <section className="section-pad">
      <div className="page-shell">
        <SectionHeading
          eyebrow="Our process"
          index="05"
          sub="Don't believe complexity equals value."
          className="mb-16"
        >
          Foundation first. <span className="text-accent">Then automation.</span>
        </SectionHeading>

        <div className="grid-12 mb-16">
          <div className="[grid-column:2/7]">
            <Reveal index={1}>
              <p className="type-body mb-6 max-w-[56ch] text-secondary">
                AI is an amplifier. Point it at a coherent operation and it compounds what already
                works. Point it at a fragmented one and it industrialises the fragmentation: the
                same inconsistencies, now produced a thousand times faster.
              </p>
            </Reveal>
            <Reveal index={2}>
              <p className="type-body max-w-[56ch] text-secondary">
                So we don&apos;t start with tools. We start with a map of where your revenue actually
                moves, and where it doesn&apos;t.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <Accordion items={QUESTIONS} className="mb-10" />
        </Reveal>

        <Reveal>
          <p className="type-lead mb-24 max-w-[52ch] text-primary">
            If any answer is no, automation will scale the problem. That&apos;s what we fix first.
          </p>
        </Reveal>

        {/* The four-step process strip with the drawing cyan line. */}
        <div ref={ref} className="relative">
          <span
            aria-hidden="true"
            className={cn(
              'absolute left-0 top-[13px] hidden h-px w-full origin-left bg-accent md:block',
              !reduced && 'transition-transform duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)]',
            )}
            style={{ transform: drawn ? 'scaleX(1)' : 'scaleX(0)' }}
          />
          <span
            aria-hidden="true"
            className="absolute left-0 top-[13px] hidden h-px w-full bg-hairline md:block"
            style={{ zIndex: -1 }}
          />

          <div className="grid gap-10 md:grid-cols-4 md:gap-6">
            {STEPS.map((step, i) => (
              <div key={step.index} className="relative pt-0 md:pt-10">
                <p
                  className={cn(
                    'type-micro mb-4 md:absolute md:left-0 md:top-0 md:mb-0 md:bg-base md:pr-3',
                    !reduced && 'transition-colors duration-300',
                    drawn ? 'text-accent' : 'text-quaternary',
                  )}
                  style={{ transitionDelay: `${i * 300}ms` }}
                >
                  {step.index}
                </p>
                <h3 className="type-label mb-3 text-primary">{step.title}</h3>
                <p className="text-small max-w-[34ch] text-secondary">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
