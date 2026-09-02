import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { initials, TESTIMONIALS } from '@/content/testimonials';

/**
 * HEAR FROM THOSE THAT MADE THE RIGHT CHOICE — the 2×2 testimonial grid.
 *
 * Every quote is REAL HTML TEXT, not a screenshot. That is the whole point:
 * §1.4 and §7.5 item 5 both name image-only testimonials as a defect on the
 * current site — invisible to search engines, to screen readers, and to anyone
 * skimming.
 *
 * Stars are drawn once and marked aria-hidden; the rating is announced as text
 * so it is never carried by shape alone (§10.4). Missing avatars fall back to a
 * monogram rather than a grey silhouette — a placeholder that looks like a
 * person is worse than one that plainly isn't.
 */
export function Testimonials() {
  return (
    <section className="band section-pad">
      <div className="page-shell">
        <SectionHeading
          eyebrow="Recent clients"
          index="12"
          sub="We don’t have clients. We have partners."
          className="mb-16"
        >
          Hear from those that <span className="text-accent">made the right choice</span>
        </SectionHeading>

        <div className="mx-auto grid max-w-[1040px] gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((item, i) => (
            <Reveal key={item.name} index={i}>
              <figure
                data-glow={i % 3 === 0 ? 'on' : undefined}
                style={{ ['--glow-x' as string]: i % 2 === 0 ? '0%' : '100%' }}
                className="glow-card flex h-full flex-col rounded-md border border-hairline bg-surface p-7 transition-colors duration-[320ms] hover:border-hairline-bright"
              >
                <Stars rating={item.rating} />

                <blockquote className="text-small mb-7 mt-5 flex-1 text-secondary">
                  {item.quote}
                </blockquote>

                <figcaption className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="type-micro flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-hairline-bright bg-surface-raised text-tertiary"
                  >
                    {initials(item.name)}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-small font-medium text-primary">{item.name}</span>
                    <span className="type-micro text-quaternary">{item.company}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="type-micro mx-auto max-w-[70ch] text-center text-quaternary">
            ⚠️ Transcribed from the reference design. Confirm exact wording against the original
            submissions, and permission to attribute by name and company, before launch (§11).
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="sr-only">{rating} out of 5</span>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={i < rating ? 'text-accent' : 'text-decorative'}
        >
          <path
            d="M10 1.8 L12.5 7.3 L18.4 8 L14 12.1 L15.2 18 L10 15.1 L4.8 18 L6 12.1 L1.6 8 L7.5 7.3 Z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  );
}
