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
  PUBLICATION_STANDARD,
  RECORD_PREAMBLE,
  hasRecords,
  industryLabel,
  recordsByIndustry,
} from '@/content/evidence';

/**
 * /evidence — the engagement record.
 *
 * ⚠️ §5 GOVERNS THIS PAGE ABSOLUTELY. It shows real records or it shows the
 * interim notice. There is no third option, and inventing rows here would be
 * the single most damaging thing on the property, because this is the page a
 * PE operating partner checks hardest and the only one he arrives at already
 * sceptical.
 *
 * WHAT AN EMPTY EVIDENCE PAGE SHOULD DO. Not apologise, and not pad. It states
 * the bar a record has to clear before it appears, which is the strongest
 * thing available while RECORDS is empty because it is true TODAY: those
 * requirements are the fields a record cannot be built without, so the page is
 * empty precisely because the bar has not yet been cleared rather than because
 * nothing has happened. An absence with a published standard reads as
 * discipline. An absence with an excuse reads as an absence.
 *
 * The page strengthens on its own as records land. Nothing here needs
 * rewriting when they do.
 */

export const metadata: Metadata = {
  title: 'Engagement records: Hexona Systems',
  description:
    'What every published engagement record has to prove before it appears: scale, a named sector, leakage found, recovery measured, the window it was measured over, the system it was measured in, and written client consent.',
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
                A number you cannot check
                <br className="hidden sm:inline" />
                is not evidence.
              </h1>
              <p className="t-lead max-w-[56ch] text-fg-2">
                Every record published here names the system its figures were measured in, the
                period they cover, and the client who approved them being shown to you.
              </p>
            </div>
          </div>
        </div>
      </Surface>

      {/* --- 01 The standard ----------------------------------------------- */}
      <Surface surface="paper">
        <div className="shell">
          <SectionMarker index="01" label="The standard" className="mb-14" />
          <div className="col-12 gap-y-16">
            <div className="[grid-column:1/5]">
              <h2 className="t-display-2 mb-6">
                What has to be true before a record appears here.
              </h2>
              <p className="t-body max-w-[38ch] text-fg-2">
                All seven, every time. A record that cannot clear them is not published, including
                when that means publishing none.
              </p>
            </div>

            <dl className="[grid-column:6/13] m-0 border-t border-line">
              {PUBLICATION_STANDARD.map((s) => (
                <div key={s.term} className="border-b border-line py-7">
                  <dt className="t-body mb-2 text-fg">{s.term}</dt>
                  <dd className="t-small m-0 max-w-[64ch] text-fg-2">{s.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Surface>

      {/* --- 02 The record, or its absence --------------------------------- */}
      <Surface surface="void" className="hex-stage">
        <Lattice />
        <div className="shell">
          <SectionMarker index="02" label="The record" className="mb-14" />

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
              <ColumnKey items={COLUMN_DEFINITIONS} />
            </>
          ) : (
            /* §5's interim, verbatim. Stronger than a padded page and, unlike a
               caught exaggeration, recoverable. */
            <div className="col-12">
              <div className="[grid-column:1/9]">
                <p className="t-display-2 mb-10">
                  {INTERIM_NOTICE.body}
                  {INTERIM_NOTICE.month ? ` ${INTERIM_NOTICE.month}.` : '.'}
                </p>
                <p className="t-body max-w-[62ch] text-fg-2">{INTERIM_NOTICE.reassurance}</p>
              </div>
            </div>
          )}
        </div>
      </Surface>

      {/* --- 03 The columns, defined --------------------------------------- */}
      <Surface surface="paper">
        <div className="shell">
          <SectionMarker index="03" label="What the columns mean" className="mb-14" />
          <div className="col-12 gap-y-16">
            <div className="[grid-column:1/5]">
              <h2 className="t-display-2 mb-6">An undefined column is an unfalsifiable claim.</h2>
              <p className="t-body max-w-[38ch] text-fg-2">
                So each one is defined before it is used, and the definitions do not change between
                records.
              </p>
            </div>

            <dl className="[grid-column:6/13] m-0 border-t border-line">
              {COLUMN_DEFINITIONS.map((c) => (
                <div key={c.term} className="border-b border-line py-7">
                  <dt className="t-body mb-2 text-fg">{c.term}</dt>
                  <dd className="t-small m-0 max-w-[64ch] text-fg-2">{c.definition}</dd>
                </div>
              ))}
              <div className="border-b border-line py-7">
                <dt className="t-body mb-2 text-fg">Why sealed is always the smaller number</dt>
                <dd className="t-small m-0 max-w-[64ch] text-fg-2">
                  Found is what the diagnostic identified. Sealed is what implementation actually
                  recovered, measured afterwards in the same system against the same baseline. Some
                  leaks are not worth the cost of closing and some close only partly. A record
                  showing the two figures equal would mean the measurement was not real.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Surface>

      {/* --- Close ---------------------------------------------------------- */}
      <Surface surface="void" className="hex-stage">
        <Lattice />
        <div className="shell">
          <div className="col-12">
            <div className="[grid-column:1/9]">
              <h2 className="t-display-1 mb-16">
                Your own record starts
                <br className="hidden sm:inline" />
                with your own number.
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
