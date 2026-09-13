import { Surface } from '@/components/ui/Surface';
import { SectionMarker } from '@/components/layout/SectionMarker';
import { FigureSettle } from '@/components/ui/FigureSettle';
import { RecordTable } from '@/components/ui/RecordTable';

/**
 * SECTION 4 — THE ARITHMETIC. §4. PAPER.
 *
 * This carries THE ONE FIGURE SETTLE on the homepage (§3.4, §8). Nothing else
 * on the page animates a number.
 *
 * The disclaimer beneath it stays. §4: its presence is what makes the figure
 * credible to someone who does this arithmetic for a living. Removing it to
 * tighten the page would cost more than the space it saves.
 */
export function Arithmetic() {
  return (
    <Surface surface="paper">
      <div className="shell">
        <SectionMarker index="03" label="Why this first" className="mb-14" />

        <div className="col-12 gap-y-14">
          <div className="[grid-column:1/7]">
            <h2 className="t-display-2 mb-8">
              A dollar recovered is worth more than a dollar earned.
            </h2>
            <p className="t-body text-fg-2">
              New revenue carries acquisition cost. Recovered revenue doesn&apos;t, because you
              already spent it.
            </p>
          </div>

          <div className="[grid-column:8/13]">
            <RecordTable
              caption="New revenue compared with recovered leakage"
              columns={[
                { key: 'dim', label: '' },
                { key: 'new', label: 'New revenue' },
                { key: 'rec', label: 'Recovered' },
              ]}
              rows={[
                {
                  id: 'cac',
                  cells: { dim: 'Acquisition cost', new: 'Full CAC', rec: 'Zero, already spent' },
                },
                {
                  id: 'time',
                  cells: { dim: 'Time to realize', new: 'One sales cycle', rec: 'Immediate' },
                },
                {
                  id: 'head',
                  cells: { dim: 'Incremental headcount', new: 'Usually', rec: 'Rarely' },
                },
                {
                  id: 'dep',
                  cells: {
                    dim: 'Dependent on',
                    new: 'Market conditions',
                    rec: 'Your own operations',
                  },
                },
              ]}
            />
          </div>
        </div>

        {/* Set apart. The largest typographic moment on the page. */}
        <div className="mt-28 border-t border-line pt-16">
          <div className="col-12">
            <div className="[grid-column:1/10]">
              <p className="t-display-2 max-w-[24ch]">
                At a 7× multiple, $400,000 of recovered EBITDA is{' '}
                <FigureSettle value="$2,800,000" className="text-brand" /> of enterprise value.
              </p>

              <p className="t-small mt-16 max-w-[68ch] text-fg-3">
                Illustrative. Multiples vary by sector and cycle. Recovered revenue carries normal
                cost of goods; the claim is zero incremental acquisition cost, not full
                flow-through.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Surface>
  );
}
