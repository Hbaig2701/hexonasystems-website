import type { Metadata } from 'next';
import { Surface } from '@/components/ui/Surface';
import { Lattice } from '@/components/ui/Lattice';
import { SectionMarker } from '@/components/layout/SectionMarker';
import { RecordTable, ColumnKey, type Column } from '@/components/ui/RecordTable';
import { Button, TextLink } from '@/components/ui/Button';
import { DIAGNOSTIC } from '@/content/firm';
import { IndustryFilter } from '@/components/ui/IndustryFilter';
import {
  COLUMN_DEFINITIONS,
  INTERIM_NOTICE,
  RECORD_PREAMBLE,
  hasRecords,
  industryLabel,
  recordsByIndustry,
} from '@/content/evidence';

/**
 * /evidence — the library.
 *
 * ⚠️ §5 STILL GOVERNS THE RECORDS THEMSELVES. Real engagements or the interim
 * notice, never invented rows. This is the page an operating partner checks
 * hardest and the only one he arrives at already sceptical.
 *
 * The publication standard and the expanded column definitions were cut at the
 * founder's request: the page led with seven requirements a record must clear
 * before showing any, which put a page of qualifications in front of the work.
 * The record now opens the page.
 *
 * What survives of that discipline is the ColumnKey beneath the table. FOUND,
 * SEALED and PAYBACK still carry their definitions wherever they are printed,
 * because an undefined column is an unfalsifiable claim, and those three
 * columns are the entire argument of the page. PUBLICATION_STANDARD is still
 * in content/evidence.ts if it is ever wanted back.
 *
 * Grounds: the record is PAPER, the two ends VOID, and the close shares the
 * footer's ground so the page goes quiet into it.
 */

export const metadata: Metadata = {
  title: 'Engagement records: Hexona Systems',
  description:
    'A record of recent implementations across a variety of industries. Every figure names the system it was measured in and the period it covers.',
  alternates: { canonical: '/evidence' },
};

const COLUMNS: Column[] = [
  { key: 'sector', label: 'Sector' },
  { key: 'revenue', label: 'Revenue', numeric: true },
  { key: 'found', label: 'Found', numeric: true, tone: 'loss' },
  { key: 'sealed', label: 'Sealed', numeric: true, tone: 'brand' },
  { key: 'payback', label: 'Payback', numeric: true },
];

export default async function EvidencePage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string }>;
}) {
  /* The filter is a URL, not component state. See IndustryFilter. */
  const { industry } = await searchParams;
  const shelf = industryLabel(industry ?? '') ? industry : undefined;
  const records = recordsByIndustry(shelf);

  return (
    <>
      {/* --- Opening ------------------------------------------------------- */}
      <Surface surface="void" rule={false} as="header" className="hex-stage">
        <Lattice />
        <div className="shell">
          <div className="col-12">
            <div className="[grid-column:1/9]">
              <p className="t-label mb-14 text-fg-3">
                <span className="text-brand">Hexona Systems</span>
                <span className="px-1.5 text-brand opacity-50">·</span> Engagement records
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

          {hasRecords() ? (
            <>
              <IndustryFilter active={shelf} />

              <p className="t-lead mb-12 text-fg">{RECORD_PREAMBLE}</p>
              <RecordTable
                caption={
                  shelf ? `Engagement records: ${industryLabel(shelf)}` : 'Engagement records'
                }
                columns={COLUMNS}
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
              {/* The last of the discipline that used to run the page. Keep it:
                  these three columns carry the whole argument. */}
              <ColumnKey items={COLUMN_DEFINITIONS} />
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

      {/* --- Close ---------------------------------------------------------- */}
      <Surface surface="void" className="hex-stage">
        <Lattice />
        <div className="shell">
          <div className="col-12">
            <div className="[grid-column:1/9]">
              <h2 className="t-display-1 mb-16">
                Every one of these began
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
