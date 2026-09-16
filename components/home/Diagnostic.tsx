import { Surface } from '@/components/ui/Surface';
import { Lattice } from '@/components/ui/Lattice';
import { SectionMarker } from '@/components/layout/SectionMarker';
import { RecordTable } from '@/components/ui/RecordTable';
import { Button, TextLink } from '@/components/ui/Button';
import { DIAGNOSTIC } from '@/content/firm';

/**
 * SECTION 5 — THE DIAGNOSTIC. §4. VOID.
 *
 * The guarantee sentence is, per §4, the highest-value line in the offer. It is
 * also a commitment, and honouring it is not optional.
 *
 * Duration reads from DIAGNOSTIC.duration so the clock is stated identically
 * everywhere (§4 warning): a two week intensive FROM SYSTEMS ACCESS, never from
 * purchase.
 */
export function DiagnosticOffer() {
  return (
    <Surface surface="void" className="hex-stage">
      <Lattice />
      <div className="shell">
        <SectionMarker index="04" label="The engagement" className="mb-14" />

        <div className="col-12 gap-y-14">
          <div className="[grid-column:1/6]">
            <h2 className="t-display-2 mb-8">
              The Leakage Diagnostic
              <br />
              <span className="text-brand">{DIAGNOSTIC.priceFormatted}</span>
            </h2>

            <p className="t-body mb-10 text-fg-2">
              If the leakage is immaterial, the report says so in the first paragraph and we tell
              you not to hire us.
            </p>

            <div className="flex flex-col items-start gap-6">
              <Button href="/diagnostic">
                Commission a diagnostic <span aria-hidden="true">→</span>{' '}
                {DIAGNOSTIC.priceFormatted}
              </Button>
              <TextLink href="/diagnostic#discuss">Discuss it first</TextLink>
            </div>
          </div>

          <div className="[grid-column:7/13]">
            <RecordTable
              caption="What the diagnostic includes"
              columns={[
                { key: 'term', label: 'Scope' },
                { key: 'value', label: '' },
              ]}
              rows={[
                { id: 'd', cells: { term: 'Duration', value: DIAGNOSTIC.duration } },
                {
                  id: 'a',
                  cells: {
                    term: 'Access required',
                    value: 'CRM, inbound channels, calendar, ticketing, any system touching a lead',
                  },
                },
                {
                  id: 'i',
                  cells: {
                    term: 'Interviews',
                    value: '4 to 6, 45 minutes, across sales, ops, service',
                  },
                },
                {
                  id: 'de',
                  cells: {
                    term: 'Deliverable',
                    value:
                      'Written report. Every leak quantified annually, ranked by recoverable dollars against effort',
                  },
                },
                { id: 'r', cells: { term: 'Readout', value: '90 minutes, live' } },
                { id: 'w', cells: { term: 'Who runs it', value: DIAGNOSTIC.delivery } },
                {
                  id: 'ro',
                  cells: {
                    term: 'Roadmap',
                    value: 'Sequenced build plan, cost and timeline per phase',
                  },
                },
                {
                  id: 'f',
                  cells: {
                    term: 'Fee',
                    value: `${DIAGNOSTIC.priceFormatted}, credited in full against implementation`,
                  },
                },
                {
                  id: 'af',
                  cells: { term: 'Afterward', value: 'No obligation. The report is yours.' },
                },
              ]}
            />
          </div>
        </div>
      </div>
    </Surface>
  );
}
