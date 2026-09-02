import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { RECORD } from '@/content/claims';
import { cn } from '@/lib/cn';

/**
 * SECTION 8 — THE RECORD. §7.1 S8.
 *
 * Awards presented as CREDENTIALS IN A FORMAL REGISTER, not badge images.
 * A ledger layout with hairline rows, animating in with a left-to-right
 * hairline draw at 80ms stagger. Each row is a link where a link exists.
 *
 * ⚠️ The current site claims "5 industry awards" but names only one. §7.1 S8:
 * either name all five here or change the count to what can be evidenced. The
 * count is therefore not rendered anywhere — the ledger names what exists,
 * which is the stronger move regardless.
 */
export function Record({
  id = 'the-record',
  index = '07',
}: {
  id?: string;
  /** The section index differs between the homepage arc and /about. */
  index?: string;
}) {
  return (
    <section id={id} className="section-pad scroll-mt-24">
      <div className="page-shell">
        <SectionHeading
          eyebrow="The record"
          index={index}
          sub="Credentials in a register, not badges on a wall."
          className="mb-16"
        >
          Recognition, on the record.
        </SectionHeading>

        <div className="border-t border-hairline">
          {RECORD.map((row, i) => {
            const content = (
              <>
                <span className="type-figure w-16 shrink-0 text-[15px] text-accent">
                  {row.year}
                </span>
                <span className="type-label flex-1 text-primary">{row.title}</span>
                <span className="text-small max-w-[42ch] text-secondary">{row.detail}</span>
              </>
            );

            return (
              <Reveal key={row.title} index={i} delay={i * 0.08}>
                <div
                  className={cn(
                    'flex flex-col gap-2 border-b border-hairline py-6 md:flex-row md:items-baseline md:gap-8',
                    row.href && 'group transition-colors hover:bg-surface',
                  )}
                >
                  {row.href ? (
                    <a
                      href={row.href}
                      className="flex flex-1 flex-col gap-2 md:flex-row md:items-baseline md:gap-8"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
