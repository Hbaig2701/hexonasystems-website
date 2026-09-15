import { Surface } from '@/components/ui/Surface';
import { Lattice } from '@/components/ui/Lattice';
import { SectionMarker } from '@/components/layout/SectionMarker';
import { FigureBlock } from '@/components/ui/FigureBlock';
import { RecordTable, ColumnKey, type Column } from '@/components/ui/RecordTable';
import { TextLink } from '@/components/ui/Button';
import {
  COLUMN_DEFINITIONS,
  LEAKAGE_SCALE,
  RECORDS,
  RECORD_PREAMBLE,
  hasRecords,
  hasScalePeriod,
} from '@/content/evidence';

/**
 * SECTION 1 — THE PATTERN. VOID.
 *
 * This replaced STANDING, which carried two unlinked awards and three terms of
 * engagement. The awards pointed at a software-founder history rather than an
 * operating one and neither could be verified, and the terms were already
 * stated in Fit and in The engagement. The trusted-by band now does the work
 * that block was there to do, earlier and with less ceremony.
 *
 * It stays VOID even though it now follows the void band. Alternation is
 * forced from the other end: Close must be void, which fixes Fit paper,
 * The engagement void, Why this first paper, and this one void. The band is a
 * thin strip on the hero's own ground, so the run reads as one opening block
 * rather than three sections that forgot to change colour.
 *
 * Replaces what was an empty engagement record showing an interim notice. The
 * argument now leads with the thing that is true at scale: leakage is
 * structural, it is everywhere, and this firm has measured it a lot.
 *
 * ⚠️ THE TWO FIGURES GET DIVIDED. $6B over 500 businesses is $12M each, against
 * an ICP of $10M-$100M. Read naively that says we routinely find more than a
 * company at the bottom of our range earns in a year, and an operating partner
 * does that division on sight. The definitions underneath are therefore NOT
 * decoration and must not be trimmed for space: they state that the 500 are
 * mostly smaller than our own ICP, and that the $6B is cumulative and not
 * annualised. Without them the pair is an own goal. See LEAKAGE_SCALE.
 *
 * §5 still governs the engagement record, which appears BENEATH this when
 * RECORDS has entries. The section gets stronger when it does; it is not
 * waiting on it.
 */

const COLUMNS: Column[] = [
  { key: 'sector', label: 'Sector' },
  { key: 'revenue', label: 'Revenue', numeric: true },
  { key: 'found', label: 'Found', numeric: true, tone: 'loss' },
  { key: 'sealed', label: 'Sealed', numeric: true, tone: 'brand' },
  { key: 'payback', label: 'Payback', numeric: true },
];

export function Pattern() {
  return (
    <Surface surface="void" className="hex-stage">
      <Lattice />

      <div className="shell">
        <SectionMarker index="01" label="The pattern" className="mb-14" />

        <div className="col-12 gap-y-16">
          <div className="[grid-column:1/8]">
            <h2 className="t-display-2 mb-8">
              Every operating business leaks. Almost none of them can see where.
            </h2>

            <p className="t-lead mb-8 text-fg-2">
              Leakage is not negligence. It is what happens when a company outgrows the systems
              that were built to run it.
            </p>

            <p className="t-body text-fg-2">
              An inbound form routes to a mailbox nobody owns. A follow-up sequence stops on day
              four because the person who wrote it left. A quote takes six days in a market that
              decides in two. None of it appears in the accounts as a loss, because the revenue
              was never booked. It shows up as a number that was simply never there, which is
              exactly why it survives every budget review.
            </p>
          </div>

          {/* The scale. Figures first, definitions immediately under them, in
              that order, because the definition is what makes the figure
              survive being divided. */}
          <div className="[grid-column:9/13]">
            <FigureBlock
              label={LEAKAGE_SCALE.audited.label}
              figure={LEAKAGE_SCALE.audited.figure}
              annotation={LEAKAGE_SCALE.audited.definition}
            />
            <FigureBlock
              className="mt-6"
              label={LEAKAGE_SCALE.unrealized.label}
              figure={LEAKAGE_SCALE.unrealized.figure}
              annotation={LEAKAGE_SCALE.unrealized.definition}
              tone="brand"
            />

            {hasScalePeriod() ? (
              <p className="t-small mt-6 text-fg-3">
                Measured across {LEAKAGE_SCALE.period}, through the firm&apos;s own diagnostic
                process.
              </p>
            ) : (
              process.env.NODE_ENV !== 'production' && (
                <p className="t-small mt-6 text-loss">
                  Dev only · LEAKAGE_SCALE.period is empty. &quot;Cumulative&quot; is not a
                  measurement without the window it accumulated over.
                </p>
              )
            )}
          </div>
        </div>

        {/* §5. Absent until there is something real to put here, and it only
            ever strengthens the section above. */}
        {hasRecords() && (
          <div className="mt-28 border-t border-line pt-16">
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
          </div>
        )}
      </div>
    </Surface>
  );
}
