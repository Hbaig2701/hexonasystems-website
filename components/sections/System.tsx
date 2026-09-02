import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ProductSurface } from '@/components/ui/ProductSurface';
import { INTEGRATIONS } from '@/content/claims';
import { cn } from '@/lib/cn';

/**
 * SECTION 4 — THE SYSTEM. §7.1 S4.
 *
 * Rebuilt as ALTERNATING FEATURE ROWS, following the reference design's
 * "Our Core Non-Negotiables" block: a drawn product surface on one side, the
 * claim on the other, sides swapping each row.
 *
 * It was four stacked text cards, which is exactly the "three feature cards,
 * identical layout" filler pattern §15 names. Four paragraphs in a row is also
 * where a reader stops reading. Every row now leads with something to look at.
 */

export const CAPABILITIES = [
  {
    id: 'embedded-ai',
    index: '01',
    title: 'Embedded Artificial Intelligence',
    copy: 'Market and proprietary LLMs deployed inside your operations, not beside them: appointment-setting agents that answer in seconds, generative campaign systems, and support that resolves instead of deflecting.',
    tags: ['Answering', 'Qualifying', 'Booking'],
    surface: 'agent' as const,
  },
  {
    id: 'integrated-stack',
    index: '02',
    title: 'Integrated Tech Stack',
    copy: 'One platform absorbing the functions currently spread across a dozen subscriptions. Fewer logins, fewer handoffs, one source of truth, and a software bill that goes down instead of up.',
    tags: ['CRM', 'Scheduling', 'Reporting'],
    surface: 'stack' as const,
  },
  {
    id: 'bespoke-development',
    index: '03',
    title: 'Bespoke Development',
    copy: 'Nothing here is a template. Your operation gets mapped, the gaps get identified, and what’s built is built for how you actually work, implemented without downtime.',
    tags: ['Routing', 'Assignment', 'Follow-up'],
    surface: 'queue' as const,
  },
  {
    id: 'consulting',
    index: '04',
    title: 'Expert Consulting',
    copy: 'Over 40 years of combined automation and software experience, applied before a line of code is written. The build is the easy part. Knowing what to build is the work.',
    tags: ['Mapping', 'Pricing the gaps', 'Sequencing'],
    surface: 'metrics' as const,
  },
];

export function System() {
  return (
    <section className="band section-pad">
      <div className="page-shell">
        <SectionHeading
          eyebrow="Our services"
          index="03"
          sub="Hexona replaces the stack, not just a step in it."
          className="mb-24"
        >
          One system. Every department. <span className="text-accent">No seams.</span>
        </SectionHeading>

        <div className="flex flex-col gap-20 md:gap-28">
          {CAPABILITIES.map((cap, i) => {
            const flipped = i % 2 === 1;
            return (
              <div key={cap.id} id={cap.id} className="grid-12 scroll-mt-24 items-center gap-y-10">
                <Reveal
                  className={cn(
                    'md:[grid-column:1/7]',
                    flipped && 'md:order-2 md:[grid-column:7/13]',
                  )}
                >
                  <ProductSurface variant={cap.surface} />
                </Reveal>

                <Reveal
                  index={1}
                  className={cn(
                    'md:[grid-column:8/13]',
                    flipped && 'md:order-1 md:[grid-column:1/6]',
                  )}
                >
                  <span className="pill mb-6">
                    <span className="type-micro text-accent">{cap.index}</span>
                    <span className="type-label text-secondary">Core capability</span>
                  </span>

                  <h3 className="type-display-3 mb-5 max-w-[18ch] text-primary">{cap.title}</h3>

                  <p className="type-body mb-7 max-w-[48ch] text-secondary">{cap.copy}</p>

                  <ul className="flex flex-wrap gap-2">
                    {cap.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-hairline bg-surface px-3 py-1.5 text-[12px] text-tertiary"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            );
          })}
        </div>

        {/* The integration bar. Monochrome, restoring on hover. Never colored
            logo soup (§15). */}
        <Reveal className="mt-28">
          <p className="type-label mb-7 text-center text-quaternary">
            Runs on top of what you already have
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {INTEGRATIONS.map((integration) => (
              <li
                key={integration.name}
                className="type-label text-tertiary opacity-55 transition-opacity duration-[240ms] hover:opacity-100"
              >
                {integration.name}
              </li>
            ))}
          </ul>
          {/* §11 item 5: the relationship must be labelled precisely, because
              partner / integration / customer are legally different claims. */}
          <p className="type-micro mx-auto mt-6 max-w-[62ch] text-center text-quaternary">
            Integrations. ⚠️ Display permission and the exact nature of each relationship must be
            confirmed before launch (§11).
          </p>
        </Reveal>
      </div>
    </section>
  );
}
