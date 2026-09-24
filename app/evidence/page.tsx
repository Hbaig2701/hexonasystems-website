import type { Metadata } from 'next';
import { Faqs } from '@/components/sections/Faqs';
import { JsonLd, breadcrumbLd, faqPageLd } from '@/lib/jsonld';
import { EVIDENCE_FAQS } from '@/content/faqs';
import { Surface } from '@/components/ui/Surface';
import { Lattice } from '@/components/ui/Lattice';
import { SectionMarker } from '@/components/layout/SectionMarker';
import { RecordTable, ColumnKey, type Column } from '@/components/ui/RecordTable';
import { Button, TextLink } from '@/components/ui/Button';
import { DIAGNOSTIC } from '@/content/firm';
import { IndustryFilter } from '@/components/ui/IndustryFilter';
import {
  CASE_COLUMN_DEFINITIONS,
  CASE_PREAMBLE,
  COLUMN_DEFINITIONS,
  INTERIM_NOTICE,
  RECORD_PREAMBLE,
  caseStudiesByIndustry,
  hasCaseStudies,
  industryLabel,
  measured,
  projected,
  recordsByIndustry,
} from '@/content/evidence';

/**
 * /evidence — the library.
 *
 * ⚠️ TWO CLASSES, RENDERED APART. content/evidence.ts explains why at length.
 * The short version: an ENGAGEMENT RECORD is the strict §5 class and RECORDS is
 * still empty; a CASE STUDY is implementation work and there are ten. They
 * never share a table, because found and sealed mean something narrower in an
 * engagement record than anything a case study claims, and the whole argument
 * of this page is that a published figure means one specific thing.
 *
 * ⚠️ AND WITHIN THE CASE STUDIES, MEASURED AND PROJECTED ARE ALSO APART.
 * Three of the ten shipped and have not been measured yet. They sit under their
 * own heading which says exactly that. Do not merge the two tables to tidy the
 * page up: the separation IS the credibility, and a reader who scrolls past the
 * heading still cannot mistake one for the other because every projected row
 * carries no result column at all.
 *
 * The publication standard and the expanded column definitions were cut at the
 * founder's request: the page led with seven requirements a record must clear
 * before showing any, which put a page of qualifications in front of the work.
 * The work now opens the page. What survives of that discipline is the
 * ColumnKey beneath each table, because an undefined column is an unfalsifiable
 * claim. PUBLICATION_STANDARD is still in content/evidence.ts if it is wanted.
 *
 * Grounds: the library is PAPER, the two ends VOID, and the close shares the
 * footer's ground so the page goes quiet into it.
 */

export const metadata: Metadata = {
  title: 'Case studies: Hexona Systems',
  description:
    'Implementation case studies across home services, hospitality, coaching, health and automotive. Every figure names the system it was measured in, and work that has not yet been measured is listed separately.',
  alternates: { canonical: '/evidence' },
};

/** The strict class. Only renders once RECORDS has entries. */
const RECORD_COLUMNS: Column[] = [
  { key: 'sector', label: 'Sector' },
  { key: 'revenue', label: 'Revenue', numeric: true },
  { key: 'found', label: 'Found', numeric: true, tone: 'loss' },
  { key: 'sealed', label: 'Sealed', numeric: true, tone: 'brand' },
  { key: 'payback', label: 'Payback', numeric: true },
];

/* No Window column, deliberately. Four of the seven source documents do not
   state a measurement window, so the column carried "Not stated" more often
   than it carried information while squeezing the two columns that matter. The
   window is not dropped, it is moved: every record page carries it as a figure
   block, and where it is absent the block says so and the verification
   paragraph explains why. A directory is not the place to litigate it. */
const MEASURED_COLUMNS: Column[] = [
  { key: 'sector', label: 'Sector' },
  { key: 'found', label: 'Found', numeric: true, tone: 'loss' },
  { key: 'result', label: 'Result', numeric: true, tone: 'brand' },
];

/* No result column, deliberately. A projected study has nothing to put in one,
   and an empty cell under a "Result" heading invites the reader to assume the
   figure is merely missing rather than absent by definition. */
const PROJECTED_COLUMNS: Column[] = [
  { key: 'sector', label: 'Sector' },
  { key: 'found', label: 'Found', numeric: true, tone: 'loss' },
];

export default async function EvidencePage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string }>;
}) {
  /* The filter is a URL, not component state. See IndustryFilter. */
  const { industry } = await searchParams;
  const shelf = industryLabel(industry ?? '') ? industry : undefined;

  const studies = caseStudiesByIndustry(shelf);
  const done = measured(studies);
  const pending = projected(studies);
  const records = recordsByIndustry(shelf);

  return (
    <>
      <JsonLd data={faqPageLd(EVIDENCE_FAQS, '/evidence')} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Evidence', path: '/evidence' },
        ])}
      />
      {/* --- Opening ------------------------------------------------------- */}
      <Surface surface="void" rule={false} as="header" className="hex-stage">
        <Lattice />
        <div className="shell">
          <div className="col-12">
            <div className="[grid-column:1/9]">
              <p className="t-label mb-14 text-fg-3">
                <span className="text-brand">Hexona Systems</span>
                <span className="px-1.5 text-brand opacity-50">·</span> Case studies
              </p>
              <h1 className="t-display-1 mb-12">
                A series of transformed
                <br className="hidden sm:inline" />
                organisations.
              </h1>
              <p className="t-lead max-w-[56ch] text-fg-2">
                Browse a record of our recent implementations across a variety of industries.
              </p>
            </div>
          </div>
        </div>
      </Surface>

      {/* --- 01 The record -------------------------------------------------
          id="records" is the no-JS landing point for the industry filter. See
          IndustryFilter. scroll-mt clears the fixed header. */}
      <Surface surface="paper" id="records" className="scroll-mt-20">
        <div className="shell">
          <SectionMarker index="01" label="The record" className="mb-14" />

          {hasCaseStudies() ? (
            <>
              <IndustryFilter active={shelf} />

              {/* The strict class, above the case studies and never mixed with
                  them. Absent until §5 is cleared by a real engagement. */}
              {records.length > 0 && (
                <div className="mb-24">
                  <h2 className="t-display-2 mb-8">Engagement records</h2>
                  <p className="t-lead mb-12 text-fg">{RECORD_PREAMBLE}</p>
                  <RecordTable
                    caption="Engagement records"
                    columns={RECORD_COLUMNS}
                    rows={records.map((r) => ({
                      id: r.slug,
                      href: `/evidence/${r.slug}`,
                      cells: {
                        sector: r.sector,
                        revenue: r.revenue,
                        found: r.found,
                        sealed: r.sealed,
                        payback: r.payback,
                      },
                    }))}
                  />
                  <ColumnKey items={COLUMN_DEFINITIONS} />
                </div>
              )}

              <p className="t-lead mb-12 max-w-[72ch] text-fg">{CASE_PREAMBLE}</p>

              {done.length > 0 && (
                <>
                  <RecordTable
                    caption={
                      shelf ? `Case studies: ${industryLabel(shelf)}` : 'Case studies, measured'
                    }
                    columns={MEASURED_COLUMNS}
                    rows={done.map((c) => ({
                      id: c.slug,
                      href: `/evidence/${c.slug}`,
                      cells: {
                        sector: c.sector,
                        found: c.found ?? '',
                        result: c.result ?? '',
                      },
                    }))}
                  />
                  {/* Found and Result. The Window definition stays in the content
                      module and prints on the record pages, which is where the
                      column now lives. */}
                  <ColumnKey items={CASE_COLUMN_DEFINITIONS.slice(0, 2)} />
                </>
              )}

              {/* Built, not yet measured. Under its own heading, in its own
                  table, with no result column. See the note at the top. */}
              {pending.length > 0 && (
                <div className="mt-24 border-t border-line pt-16">
                  <h2 className="t-display-2 mb-8">Built, and not yet measured.</h2>
                  <p className="t-body mb-12 max-w-[68ch] text-fg-2">
                    These systems are live and the measurement period has not closed. Each one
                    states what was found before the build and what was built. Nothing on these
                    pages is presented as a result, and any forward-looking figure is named as a
                    projection where it appears.
                  </p>
                  <RecordTable
                    caption="Case studies where measurement is still open"
                    columns={PROJECTED_COLUMNS}
                    rows={pending.map((c) => ({
                      id: c.slug,
                      href: `/evidence/${c.slug}`,
                      cells: { sector: c.sector, found: c.found ?? '' },
                    }))}
                  />
                </div>
              )}
            </>
          ) : (
            /* §5's interim, verbatim. Stronger than a padded page and, unlike a
               caught exaggeration, recoverable. */
            <div className="col-12">
              <div className="[grid-column:1/9]">
                <p className="t-display-2 mb-10">
                  {INTERIM_NOTICE.month
                    ? `${INTERIM_NOTICE.body} ${INTERIM_NOTICE.firstPublish(INTERIM_NOTICE.month)}`
                    : INTERIM_NOTICE.body}
                </p>
                <p className="t-body max-w-[62ch] text-fg-2">{INTERIM_NOTICE.reassurance}</p>
              </div>
            </div>
          )}
        </div>
      </Surface>

      {/* --- Ticket 7 FAQ block --------------------------------------------- */}
      <Faqs
        items={EVIDENCE_FAQS}
        index="02"
        surface="void"
        heading="What people ask about this page."
        lede="Starting with how to read the figures, and why some of them are missing."
      />

      {/* --- Close ---------------------------------------------------------- */}
      <Surface surface="void" className="hex-stage">
        <Lattice />
        <div className="shell">
          <div className="col-12">
            <div className="[grid-column:1/9]">
              <h2 className="t-display-1 mb-16">
                Every engagement begins
                <br className="hidden sm:inline" />
                with a diagnostic.
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
