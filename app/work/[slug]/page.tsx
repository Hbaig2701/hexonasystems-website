import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageFrame } from '@/components/layout/PageFrame';
import { SectionEyebrow } from '@/components/layout/SectionEyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { BeforeAfterPanel } from '@/components/ui/BeforeAfterPanel';
import { AssetPlaceholder } from '@/components/ui/AssetPlaceholder';
import { FeaturedOutcome } from '@/components/sections/FeaturedOutcome';
import { JsonLd, articleLd } from '@/lib/jsonld';
import { CASES, caseBySlug } from '@/content/cases';

/**
 * /work/[slug] — THE CASE STUDY TEMPLATE. §7.3.
 *
 * A FIXED STRUCTURE, used identically every time — consistency here reads as
 * methodology:
 *
 *   01 THE SITUATION     What the business looked like before.
 *   02 WHERE IT LEAKED   The specific gaps, named and quantified.
 *   03 WHAT WE BUILT     The implementation, in plain language.
 *   04 WHAT CHANGED      The before/after data panel (Moment 5).
 *   05 IN THEIR WORDS    Direct client quote. [ASSET NEEDED per case]
 *
 * Ends with an offer to run the audit against the reader's own numbers (§2.3).
 */

export function generateStaticParams() {
  return CASES.filter((c) => c.published).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseBySlug(slug);
  if (!study) return { title: 'Case study not found' };

  return {
    title: study.title,
    description: `${study.industry}, ${study.region}. ${study.problem}`,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      title: study.title,
      description: study.problem,
      url: `/work/${study.slug}`,
    },
  };
}

const SECTIONS = [
  { index: '01', label: 'The situation', key: 'situation' as const },
  { index: '02', label: 'Where it leaked', key: 'whereItLeaked' as const },
  { index: '03', label: 'What we built', key: 'whatWeBuilt' as const },
];

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseBySlug(slug);
  if (!study) notFound();

  return (
    <>
      <JsonLd
        data={articleLd({
          headline: study.title,
          description: study.problem,
          slug: study.slug,
          datePublished: `${study.year}-01-01`,
        })}
      />

      <PageFrame>
        <article className="page-shell pb-24 pt-24 md:pt-32">
          <div className="mb-10 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="type-label text-accent">{study.index}</span>
            <span aria-hidden="true" className="text-decorative">·</span>
            <span className="type-label text-tertiary">{study.industry}</span>
            <span aria-hidden="true" className="text-decorative">·</span>
            <span className="type-label text-tertiary">{study.region}</span>
            <span aria-hidden="true" className="text-decorative">·</span>
            <span className="type-label text-tertiary">{study.year}</span>
          </div>

          <div className="grid-12 mb-20">
            <div className="[grid-column:1/10]">
              <h1 className="type-display-2 max-w-[22ch]">{study.title}</h1>
            </div>
          </div>

          {/* --- At a glance --- */}
          {study.atAGlance.length > 0 && (
            <Reveal>
              <div className="mb-24 overflow-hidden rounded-md border border-hairline bg-surface">
                <div className="border-b border-hairline bg-surface-raised px-5 py-3">
                  <span className="type-label text-tertiary">At a glance</span>
                </div>
                <dl className="grid grid-cols-1 sm:grid-cols-2">
                  {study.atAGlance.map((row, i) => (
                    <div
                      key={row.label}
                      className={`border-hairline px-5 py-5 ${i % 2 === 0 ? 'sm:border-r' : ''} ${
                        i < study.atAGlance.length - (study.atAGlance.length % 2 === 0 ? 2 : 1)
                          ? 'border-b'
                          : ''
                      }`}
                    >
                      <dt className="type-micro mb-2 text-quaternary">{row.label}</dt>
                      <dd
                        className={
                          row.value === 'ASSET PENDING'
                            ? 'type-label text-leak'
                            : 'text-small text-primary'
                        }
                      >
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          )}

          {study.metricsPending && (
            <Reveal className="mb-24">
              <AssetPlaceholder
                label={`Case data · ${study.title}`}
                detail="§7.1 S5 build note: this case needs real before/after metrics, a timeline and a client quote before launch. Until then it renders as a placeholder rather than as a vague claim. Three specific cases beat six vague ones by a wide margin."
              />
            </Reveal>
          )}

          {/* --- 01 / 02 / 03 --- */}
          {SECTIONS.map(
            (section) =>
              study[section.key].length > 0 && (
                <section key={section.index} className="mb-24">
                  <SectionEyebrow index={section.index} label={section.label} className="mb-10" />
                  <div className="grid-12">
                    <div className="flex flex-col gap-6 [grid-column:1/9]">
                      {study[section.key].map((para, i) => (
                        <Reveal key={i} index={i}>
                          <p className="type-body max-w-[64ch] text-secondary">{para}</p>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </section>
              ),
          )}

          {/* --- 04 WHAT CHANGED — Moment 5 --- */}
          {study.metrics.length > 0 && (
            <section className="mb-24">
              <SectionEyebrow index="04" label="What changed" className="mb-10" />
              <Reveal>
                <BeforeAfterPanel metrics={study.metrics} className="mb-12" />
              </Reveal>
              {study.outcome && (
                <Reveal>
                  <FeaturedOutcome value={study.outcome.value} label={study.outcome.label} />
                </Reveal>
              )}
            </section>
          )}

          {/* --- 05 IN THEIR WORDS --- */}
          <section className="mb-24">
            <SectionEyebrow index="05" label="In their words" className="mb-10" />
            {study.quote ? (
              <Reveal>
                <blockquote className="border-l-2 border-accent pl-7">
                  <p className="type-display-3 mb-5 max-w-[30ch]">{study.quote.text}</p>
                  <cite className="type-label not-italic text-tertiary">
                    {study.quote.attribution}
                  </cite>
                </blockquote>
              </Reveal>
            ) : (
              <Reveal>
                <AssetPlaceholder
                  label="Direct client quote"
                  detail="[ASSET NEEDED per case, §7.3] The client's own words, with permission to attribute. Anonymised by role and industry is acceptable; invented is not."
                />
              </Reveal>
            )}
          </section>

          {/* --- Case studies end with an offer to run the audit (§2.3) --- */}
          <section className="border-t border-hairline pt-16">
            <Reveal>
              <h2 className="type-display-3 mb-6 max-w-[24ch]">
                Run the same arithmetic on your numbers.
              </h2>
              <p className="type-body mb-9 max-w-[56ch] text-secondary">
                Four questions, under a minute, and the model shows its working. No email required
                to see the number.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/audit" variant="primary" arrow>
                  Run the Revenue Leak Audit
                </Button>
                <Button href="/work" variant="ghost" arrow>
                  All case studies
                </Button>
              </div>
            </Reveal>
          </section>
        </article>
      </PageFrame>
    </>
  );
}
