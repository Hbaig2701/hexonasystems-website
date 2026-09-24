import { Surface } from '@/components/ui/Surface';
import { SectionMarker } from '@/components/layout/SectionMarker';
import { FigureBlock } from '@/components/ui/FigureBlock';
import { RecordTable, ColumnKey, type Column } from '@/components/ui/RecordTable';
import { TextLink } from '@/components/ui/Button';
import {
  CASE_COLUMN_DEFINITIONS,
  CASE_STUDIES,
  LEAKAGE_SCALE,
  hasCaseStudies,
  hasScalePeriod,
  measured,
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
 * PAPER, which deliberately breaks §3.1's strict alternation.
 *
 * The arithmetic of that rule: five sections, and Close has to be void, so
 * alternating backwards from it forces Fit paper, The engagement void, Why
 * this first paper, and this one VOID. Held to the letter, the page opened
 * with the hero, the band and this section all on the dark ground, which is
 * most of two screens before any relief.
 *
 * So this one turns white and sits next to Why this first, which is also
 * white. The structure that produces is better than the rule it breaks: a dark
 * opening, a light middle where the actual argument is made, and a dark close.
 * The hairline rule and the section marker still separate the two light
 * sections, which is all §3.1's hard edge was ever asking for.
 *
 * No lattice here any more. The field is cyan on near-black and needs the dark
 * ground; on paper it either vanishes or turns muddy.
 *
 * Replaces what was an empty engagement record showing an interim notice. The
 * argument now leads with the thing that is true at scale: leakage is
 * structural, it is everywhere, and this firm has measured it a lot.
 *
 * ⚠️ THE TWO FIGURES GET DIVIDED. $100M over 500 businesses is $200,000 each,
 * which is about 6.7% of a $3M company's revenue and a credible leakage rate.
 * It was $6B, which divided to $12M per business and was impossible once the
 * range moved to $3M-$15M. The definitions underneath are still NOT decoration
 * and must not be trimmed for space: they state that the 500 span every size
 * and that the total is cumulative rather than annualised. See LEAKAGE_SCALE.
 *
 * The library appears BENEATH this. The section gets stronger when it has
 * something under it; it was never waiting on it.
 *
 * ⚠️ MEASURED CASE STUDIES ONLY. content/evidence.ts keeps the not-yet-measured
 * ones apart from the measured ones, and /evidence gives them their own table
 * under a heading that says so. There is no room for that distinction on the
 * homepage, so the homepage does not carry the rows that need it. A projected
 * figure standing unlabelled in a table on the front page is exactly the
 * failure the separation exists to prevent.
 *
 * No revenue column. No source document for any of these states the client's
 * revenue, so the field does not exist and the column cannot.
 */

const COLUMNS: Column[] = [
  { key: 'sector', label: 'Sector' },
  { key: 'found', label: 'Found', numeric: true, tone: 'loss' },
  { key: 'result', label: 'Result', numeric: true, tone: 'brand' },
];

export function Pattern() {
  return (
    <Surface surface="paper">
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

            {hasScalePeriod() && (
              <p className="t-small mt-6 text-fg-3">
                Measured across {LEAKAGE_SCALE.period}, through the firm&apos;s own diagnostic
                process.
              </p>
            )}
          </div>
        </div>

        {/* Absent until there is something real to put here, and it only
            ever strengthens the section above. */}
        {hasCaseStudies() && (
          <div className="mt-28 border-t border-line pt-16">
            {/* The homepage points at the library rather than explaining the
                terms of publication. CASE_PREAMBLE still runs on /evidence,
                which is where a reader is actually reading the figures. */}
            <p className="mb-12">
              <TextLink href="/evidence">View our recent implementations</TextLink>
            </p>

            <RecordTable
              caption="Case studies"
              columns={COLUMNS}
              rows={measured(CASE_STUDIES).map((c) => ({
                id: c.slug,
                href: `/evidence/${c.slug}`,
                cells: {
                  sector: c.sector,
                  found: c.found ?? '',
                  result: c.result ?? '',
                },
              }))}
            />

            <div className="mt-10 flex justify-end">
              <TextLink href="/evidence">
                Verification method published with each case study
              </TextLink>
            </div>

            {/* Found and Result only. The homepage table has no Window
                column, and defining a column that is not there is the same
                fault in reverse as leaving one undefined. */}
            <ColumnKey items={CASE_COLUMN_DEFINITIONS.slice(0, 2)} />
          </div>
        )}

      </div>
    </Surface>
  );
}
