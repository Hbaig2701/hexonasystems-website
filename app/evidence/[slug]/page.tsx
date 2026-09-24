import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Surface } from '@/components/ui/Surface';
import { Lattice } from '@/components/ui/Lattice';
import { SectionMarker } from '@/components/layout/SectionMarker';
import { FigureBlock } from '@/components/ui/FigureBlock';
import { RecordTable } from '@/components/ui/RecordTable';
import { Button, TextLink } from '@/components/ui/Button';
import { DIAGNOSTIC } from '@/content/firm';
import { CASE_STUDIES, RECORDS, type CaseStudy } from '@/content/evidence';

/**
 * /evidence/[slug] — one case study, or one engagement record.
 *
 * ⚠️ BOTH CLASSES RESOLVE HERE AND THEY RENDER DIFFERENTLY. An engagement
 * record is the strict §5 class (revenue, found, sealed, payback, consent) and
 * RECORDS is still empty; a case study is implementation work. The adapter at
 * the foot of this file maps a record onto the same layout so there is one page
 * to maintain, but it keeps the record's own labels: `sealed` is presented as
 * annualised measured recovery and never as the looser "result".
 *
 * ⚠️ A PROJECTED CASE STUDY MUST NEVER READ LIKE A MEASURED ONE. Three of the
 * ten shipped and have not been measured. On those pages the hero carries a
 * status block instead of a result, section 04 is titled "What is expected"
 * rather than "What changed", and the outcomes list is introduced by a sentence
 * that says the figures are projections. Removing any one of those three would
 * leave a page that reads as evidence and is not.
 *
 * Order is deliberate. Situation, then what was found, then what was built,
 * then what changed, then how it was measured. A reader who stops early has
 * still read the claim in the order it was earned. Verification is last and is
 * never optional, because it is the only thing separating this from a
 * testimonial.
 */

export function generateStaticParams() {
  return [
    ...CASE_STUDIES.map((c) => ({ slug: c.slug })),
    ...RECORDS.map((r) => ({ slug: r.slug })),
  ];
}

function resolve(slug: string): CaseStudy | undefined {
  const study = CASE_STUDIES.find((c) => c.slug === slug);
  if (study) return study;
  const record = RECORDS.find((r) => r.slug === slug);
  return record ? fromRecord(record) : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = resolve(slug);
  if (!study) return { title: 'Case study not found' };

  /* The description states the basis. An assistant lifting this line out of a
     search result must not be able to quote a projection as a result. */
  const lede =
    study.basis === 'measured'
      ? `${study.found ?? study.headline.figure} found, ${study.result ?? 'measured after implementation'}.`
      : `${study.found ?? study.headline.figure} found. Built and live; measurement period still open.`;

  return {
    title: `${study.sector}: ${study.title}`,
    description: `${lede} ${study.verification}`.slice(0, 300),
    alternates: { canonical: `/evidence/${study.slug}` },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = resolve(slug);
  if (!study) notFound();

  const isProjected = study.basis === 'projected';

  return (
    <>
      <Surface surface="void" rule={false} as="header" className="hex-stage">
        <Lattice />
        <div className="shell">
          <div className="col-12">
            <div className="[grid-column:1/10]">
              <p className="t-label mb-14 text-fg-3">
                <span className="text-brand">{study.index}</span>
                <span className="px-1.5 text-brand opacity-50">·</span> {study.sector}
                {study.region && (
                  <>
                    <span className="px-1.5 text-brand opacity-50">·</span> {study.region}
                  </>
                )}
                {study.clientName && (
                  <>
                    <span className="px-1.5 text-brand opacity-50">·</span> {study.clientName}
                  </>
                )}
              </p>
              <h1 className="t-display-1 mb-12 max-w-[22ch]">{study.title}</h1>

              {/* Said once, in prose, above the figures. The status block below
                  says it again, and section 04 says it a third time. */}
              {isProjected && (
                <p className="t-lead mb-4 max-w-[62ch] text-fg-2">
                  This system is live and the measurement period has not closed. Everything below
                  that looks forward is a projection, and it is named as one where it appears.
                </p>
              )}
            </div>
          </div>

          {/* ⚠️ THESE BLOCKS SET AT DISPLAY SIZE. Everything in them must be a
              figure and a unit, never a phrase: `found` is the table cell and
              wraps to five lines here, so `foundFigure` exists for this and the
              blocks use it. Anything long belongs in the annotation. */}
          {isProjected ? (
            /* Two blocks, not three. A projected study has no result, and the
               third block previously repeated the found figure under a
               "Delivered" label, which read as a second and larger finding. */
            <div className="col-12 mt-8 gap-6">
              <div className="[grid-column:1/7]">
                <FigureBlock
                  label={study.foundFigure ? 'Found' : 'Delivered'}
                  figure={study.foundFigure ?? study.headline.figure}
                  annotation={study.foundFigure ? study.found : study.headline.label}
                  tone={study.foundFigure ? 'loss' : undefined}
                />
              </div>
              <div className="[grid-column:7/13]">
                <FigureBlock
                  label="Status"
                  figure="Not yet measured"
                  annotation="Built and live. No post-implementation period has been measured against it."
                />
              </div>
            </div>
          ) : (
            <div className="col-12 mt-8 gap-6">
              <div className="[grid-column:1/5]">
                <FigureBlock
                  label="Found"
                  figure={study.foundFigure ?? study.headline.figure}
                  annotation={study.foundFigure ? study.found : study.headline.label}
                  tone="loss"
                />
              </div>
              <div className="[grid-column:5/9]">
                <FigureBlock
                  label="Result"
                  figure={study.headline.figure}
                  annotation={study.headline.label}
                  tone="brand"
                />
              </div>
              <div className="[grid-column:9/13]">
                <FigureBlock
                  label="Window"
                  figure={study.window ?? 'Not stated'}
                  annotation={
                    study.window
                      ? undefined
                      : 'The source document does not state a measurement window. See verification below.'
                  }
                />
              </div>
            </div>
          )}
        </div>
      </Surface>

      <Surface surface="paper">
        <div className="shell">
          <SectionMarker index="01" label="The situation" className="mb-14" />
          <div className="col-12">
            <div className="[grid-column:1/8]">
              {study.situation.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0 ? 't-lead mb-8 max-w-[58ch]' : 't-body mb-6 max-w-[64ch] text-fg-2'
                  }
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Surface>

      <Surface surface="void" className="hex-stage">
        <Lattice />
        <div className="shell">
          <SectionMarker index="02" label="What we found" className="mb-14" />
          <RecordTable
            caption="Leakage identified before the build"
            columns={[
              { key: 'leak', label: 'Leak' },
              { key: 'figure', label: 'Cost', numeric: true, tone: 'loss' },
            ]}
            /* An unpriced leak leaves the cell empty rather than carrying a
               placeholder. Some of these are real and were never quantified,
               and a dash in a costed column invites the reader to read it as
               zero. */
            rows={study.whatWeFound.map((f, i) => ({
              id: String(i),
              cells: { leak: f.leak, figure: f.figure ?? '' },
            }))}
          />
        </div>
      </Surface>

      <Surface surface="paper">
        <div className="shell">
          <SectionMarker index="03" label="What we built" className="mb-14" />
          <div className="col-12">
            <ul className="[grid-column:1/9] border-t border-line">
              {study.whatWeBuilt.map((item) => (
                <li key={item} className="t-body border-b border-line py-6 text-fg-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Surface>

      <Surface surface="void" className="hex-stage">
        <Lattice />
        <div className="shell">
          <SectionMarker
            index="04"
            label={isProjected ? 'What is expected' : 'What changed'}
            className="mb-14"
          />

          {/* ⚠️ ON A PROJECTED STUDY THIS PARAGRAPH GOES FIRST. It used to sit
              under the before-and-after table and say "the figures below",
              which left the table above it uncovered by the very qualifier it
              exists to apply. Everything in this section is now inside it. */}
          {isProjected && (
            <div className="col-12 mb-14">
              <div className="[grid-column:1/9]">
                <p className="t-body max-w-[64ch] text-fg-2">
                  Nothing in this section is a measured result. The before-and-after figures are
                  the delivered system as the client reports it, and everything after them is a
                  projection from the measurements taken before the build. None of it has been
                  measured against a period after the system went live.
                </p>
              </div>
            </div>
          )}

          {study.whatChanged && study.whatChanged.length > 0 && (
            <RecordTable
              caption={isProjected ? 'Reported before and after' : 'Measured before and after'}
              columns={[
                { key: 'metric', label: 'Metric' },
                { key: 'before', label: 'Before', numeric: true },
                { key: 'after', label: 'After', numeric: true, tone: 'brand' },
              ]}
              rows={study.whatChanged.map((c, i) => ({
                id: String(i),
                cells: { metric: c.metric, before: c.before, after: c.after },
              }))}
            />
          )}

          <div className="col-12 mt-14">
            <div className="[grid-column:1/9]">
              <ul className="border-t border-line">
                {study.outcomes.map((item) => (
                  <li key={item} className="t-body border-b border-line py-6 text-fg-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Surface>

      <Surface surface="paper">
        <div className="shell">
          <SectionMarker
            index="05"
            label={isProjected ? 'What has and has not been measured' : 'How this was measured'}
            className="mb-14"
          />
          <div className="col-12">
            <div className="[grid-column:1/8]">
              {/* Never optional, and never softened. This paragraph is what
                  separates a case study from a testimonial, and on a projected
                  study it is the most important text on the page. */}
              <p className="t-lead mb-8 max-w-[58ch] text-fg">{study.verification}</p>
              {!study.clientName && (
                <p className="t-small max-w-[58ch] text-fg-3">
                  The client is not named here. Their name is withheld by agreement, and the
                  figures are unaltered.
                </p>
              )}
              <p className="mt-10">
                <TextLink href="/evidence">All case studies</TextLink>
              </p>
            </div>
          </div>
        </div>
      </Surface>

      <Surface surface="void" className="hex-stage">
        <Lattice />
        <div className="shell">
          <div className="col-12">
            <div className="[grid-column:1/9]">
              <h2 className="t-display-1 mb-16">
                This began the same way
                <br className="hidden sm:inline" />
                yours would.
              </h2>
              <div className="flex flex-col items-start gap-8">
                <Button href="/diagnostic">
                  Commission a diagnostic <span aria-hidden="true">→</span>{' '}
                  {DIAGNOSTIC.priceFormatted}
                </Button>
                <TextLink href="/diagnostic#discuss">Discuss it first</TextLink>
              </div>
            </div>
          </div>
        </div>
      </Surface>
    </>
  );
}

/**
 * EngagementRecord → CaseStudy, so there is one page to maintain rather than
 * two that drift apart.
 *
 * ⚠️ THE ADAPTER MUST NOT LAUNDER THE STRICT CLASS INTO THE LOOSE ONE. A
 * record's `sealed` is annualised recovery measured after implementation and
 * always smaller than `found`; a case study's `result` carries no such promise.
 * So the mapping keeps the record's own vocabulary in the text it produces, and
 * revenue, headcount and payback, which a case study has no field for, are
 * carried into `outcomes` rather than dropped.
 */
function fromRecord(r: (typeof RECORDS)[number]): CaseStudy {
  return {
    slug: r.slug,
    index: r.index,
    industry: r.industry,
    sector: r.sector,
    region: `${r.region}, ${r.year}`,
    basis: 'measured',
    headline: { figure: r.sealed, label: 'Annualised recovery, measured' },
    found: r.found,
    foundFigure: r.found,
    result: r.sealed,
    window: r.payback,
    title: r.title,
    situation: r.situation,
    whatWeFound: r.whatWeFound.map((f) => ({ leak: f.leak, figure: f.annualised })),
    whatWeBuilt: r.whatWeBuilt,
    whatChanged: r.whatChanged,
    outcomes: [
      `Client revenue at the time of the engagement: ${r.revenue}, ${r.headcount}`,
      `Annualised leakage identified: ${r.found}`,
      `Annualised recovery measured after implementation: ${r.sealed}`,
      `Payback, meaning weeks for measured recovery to equal total fees paid: ${r.payback}`,
    ],
    verification: r.verification,
  };
}
