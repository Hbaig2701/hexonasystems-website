import Link from 'next/link';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BeforeAfterPanel } from '@/components/ui/BeforeAfterPanel';
import { FeaturedOutcome } from './FeaturedOutcome';
import { featuredCase, supportingCases } from '@/content/cases';

/**
 * SECTION 5 — PROOF. §7.1 S5.
 *
 * The featured case is the daycare story and it is the most prominent single
 * block on the page after the hero. It uses MOMENT 5 (the cyan sweep) with
 * MOMENT 3 (the odometer roll) firing on each metric as the sweep crosses it —
 * the sweep is the trigger, the odometer is the transition.
 *
 * At launch this is one featured case + two cards, expanding to one + three
 * when the fourth lands. The grid handles 2–3 items without a layout gap.
 */
export function Proof() {
  const featured = featuredCase();
  const supporting = supportingCases();

  return (
    <section className="band section-pad">
      <div className="page-shell">
        <SectionHeading
          eyebrow="Case studies"
          index="04"
          sub="The impact of one of our implementations echoes through the industry."
          className="mb-16"
        >
          Browse Our <span className="text-accent">Conquests</span>
        </SectionHeading>

        {featured && (
          <Reveal>
            <div className="overflow-hidden rounded-md border border-hairline bg-surface">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-hairline bg-surface-raised px-6 py-3">
                <span className="type-label text-accent">{featured.index}</span>
                <span aria-hidden="true" className="text-decorative">
                  ·
                </span>
                <span className="type-label text-tertiary">{featured.industry}</span>
                <span aria-hidden="true" className="text-decorative">
                  ·
                </span>
                <span className="type-label text-tertiary">{featured.region}</span>
              </div>

              <div className="p-7 md:p-12">
                <blockquote className="type-display-3 mb-8 max-w-[24ch] text-primary">
                  &ldquo;Thirty inquiries a day, answered in a day and a half.&rdquo;
                </blockquote>

                <p className="type-body mb-12 max-w-[62ch] text-secondary">
                  A childcare operator was receiving 30 inquiries daily and taking 24 to 48 hours to
                  respond. By the time a reply went out, most parents had already enrolled somewhere
                  else. The marketing was working. The response wasn&apos;t.
                </p>

                <BeforeAfterPanel metrics={featured.metrics} className="mb-12" />

                {featured.outcome && (
                  <FeaturedOutcome
                    value={featured.outcome.value}
                    label={featured.outcome.label}
                  />
                )}

                <div className="mt-12">
                  <Button href={`/work/${featured.slug}`} variant="secondary" arrow>
                    Read the full breakdown
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {supporting.length > 0 && (
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {supporting.map((study, i) => (
              <Reveal key={study.slug} index={i}>
                <Card href={`/work/${study.slug}`} className="flex h-full flex-col p-7">
                  <p className="type-label mb-6 text-quaternary">{study.industry}</p>

                  {study.headline ? (
                    <>
                      <p className="type-figure mb-3 text-[36px] text-accent">
                        {study.headline.value}
                      </p>
                      <p className="type-label mb-5 text-tertiary">{study.headline.label}</p>
                    </>
                  ) : (
                    <div className="mb-5 rounded-md border border-dashed border-hairline-bright p-4">
                      <p className="type-label mb-2 text-leak">Asset pending</p>
                      <p className="type-micro text-quaternary">
                        Headline metric required before launch. §7.1 S5: cut the card rather than
                        ship a vague one.
                      </p>
                    </div>
                  )}

                  <p className="text-small mt-auto text-secondary">{study.problem}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal className="mt-10">
          <Link
            href="/work"
            className="type-label text-tertiary transition-colors hover:text-primary"
          >
            All case studies →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
