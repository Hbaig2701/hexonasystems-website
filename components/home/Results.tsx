import { Surface } from '@/components/ui/Surface';
import { SectionMarker } from '@/components/layout/SectionMarker';
import { RecordTable, ColumnKey, type Column } from '@/components/ui/RecordTable';
import { TextLink } from '@/components/ui/Button';
import {
  COLUMN_DEFINITIONS,
  INTERIM_NOTICE,
  RECORDS,
  RECORD_PREAMBLE,
  hasRecords,
} from '@/content/evidence';

/**
 * SECTION 3 — RESULTS. §4. VOID.
 *
 * ⚠️ §5 GATES THIS SECTION. It renders real records or it renders the interim
 * notice. There is no third option: inventing rows here would be the single
 * most damaging thing on the site, because this is the block a PE operating
 * partner reads first and checks hardest.
 *
 * FOUND in --loss-on-void, SEALED in --accent-on-void, both label-paired.
 * Figures are STATIC. §3.4 rules out the odometer here: six settling at once
 * reads as a slot machine and contradicts "one moment".
 */

const COLUMNS: Column[] = [
  { key: 'sector', label: 'Sector' },
  { key: 'revenue', label: 'Revenue', numeric: true },
  { key: 'found', label: 'Found', numeric: true, tone: 'loss' },
  { key: 'sealed', label: 'Sealed', numeric: true, tone: 'brand' },
  { key: 'payback', label: 'Payback', numeric: true },
];

export function Results() {
  return (
    <Surface surface="void">
      <div className="shell">
        <SectionMarker index="02" label="Engagement record" className="mb-14" />

        {hasRecords() ? (
          <>
            <p className="t-lead mb-12 text-fg">{RECORD_PREAMBLE}</p>

            <RecordTable
              caption="Engagement records"
              columns={COLUMNS}
              rows={RECORDS.map((r) => ({
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

            <div className="mt-10 flex justify-end">
              <TextLink href="/evidence">Verification method published with each record</TextLink>
            </div>

            <ColumnKey items={COLUMN_DEFINITIONS} />
          </>
        ) : (
          /* §5 interim. Stronger than a padded page, and recoverable. */
          <div className="col-12">
            <div className="[grid-column:1/9]">
              <p className="t-display-2 mb-10">
                {INTERIM_NOTICE.body} {INTERIM_NOTICE.month}.
              </p>
              <p className="t-body text-fg-2">{INTERIM_NOTICE.reassurance}</p>
            </div>
          </div>
        )}
      </div>
    </Surface>
  );
}
