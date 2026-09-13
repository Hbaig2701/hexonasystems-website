import type { Metadata } from 'next';
import { Surface, type SurfaceName } from '@/components/ui/Surface';
import { SectionMarker } from '@/components/layout/SectionMarker';
import { Button, TextLink } from '@/components/ui/Button';
import { FigureBlock } from '@/components/ui/FigureBlock';
import { FigureSettle } from '@/components/ui/FigureSettle';
import { RecordTable, ColumnKey, type Column, type Row } from '@/components/ui/RecordTable';
import { CREDENTIALS, ENGAGEMENT_TERMS } from '@/content/firm';

/**
 * /styleguide — Phase 1 deliverable (§8).
 *
 * Every component on BOTH surfaces. The acceptance criteria are specific:
 * the contrast audit passes on both grounds, the primary button is clearly
 * visible on void, a record table is legible at 375px without horizontal
 * scroll, and nothing is rounded past 2px.
 */

export const metadata: Metadata = {
  title: 'Styleguide',
  robots: { index: false, follow: false },
};

const RECORD_COLUMNS: Column[] = [
  { key: 'sector', label: 'Sector' },
  { key: 'revenue', label: 'Revenue', numeric: true },
  { key: 'found', label: 'Found', numeric: true, tone: 'loss' },
  { key: 'sealed', label: 'Sealed', numeric: true, tone: 'brand' },
  { key: 'payback', label: 'Payback', numeric: true },
];

/** Illustrative only. Real records are gated behind §5. */
const RECORD_ROWS: Row[] = [
  {
    id: 'a',
    cells: {
      sector: 'Specialty industrial distribution',
      revenue: '$34M',
      found: '$412,000',
      sealed: '$287,000',
      payback: '11 weeks',
    },
  },
  {
    id: 'b',
    cells: {
      sector: 'Multi-site healthcare',
      revenue: '$61M',
      found: '$906,000',
      sealed: '$514,000',
      payback: '9 weeks',
    },
  },
  {
    id: 'c',
    cells: {
      sector: 'Commercial services',
      revenue: '$22M',
      found: '$268,000',
      sealed: '$191,000',
      payback: '14 weeks',
    },
  },
];

function Block({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-line py-14 first:border-t-0">
      <SectionMarker index={index} label={label} className="mb-10" />
      {children}
    </div>
  );
}

/** Everything below renders identically on both grounds. That is the test. */
function Specimens({ surface }: { surface: SurfaceName }) {
  return (
    <>
      <Block index="01" label="Type scale">
        <div className="flex flex-col gap-10">
          <div>
            <p className="t-label mb-3 text-fg-3">display-1 · serif 400 · never bold</p>
            <p className="t-display-1">
              The most expensive revenue is the revenue you already bought.
            </p>
          </div>
          <div>
            <p className="t-label mb-3 text-fg-3">display-2 · serif 400</p>
            <p className="t-display-2">A dollar recovered is worth more than a dollar earned.</p>
          </div>
          <div>
            <p className="t-label mb-3 text-fg-3">lead</p>
            <p className="t-lead text-fg-2">
              We find demand a company already paid for and is failing to convert, price it in
              EBITDA, and seal it.
            </p>
          </div>
          <div>
            <p className="t-label mb-3 text-fg-3">body · max 68ch</p>
            <p className="t-body text-fg-2">
              New revenue carries acquisition cost. Recovered revenue does not, because you already
              spent it. The constraint is rarely capability; it is having someone senior with two
              clear weeks and no stake in the answer.
            </p>
          </div>
          <div className="flex flex-wrap items-baseline gap-10">
            <div>
              <p className="t-label mb-3 text-fg-3">label</p>
              <p className="t-label text-fg-2">Engagement record</p>
            </div>
            <div>
              <p className="t-label mb-3 text-fg-3">figure-lg · tabular</p>
              <p className="t-figure-lg">$2,800,000</p>
            </div>
          </div>
        </div>
      </Block>

      <Block index="02" label="Buttons">
        <div className="flex flex-wrap items-center gap-6">
          <Button>Commission a diagnostic · $5,000</Button>
          <Button variant="secondary">Discuss it first</Button>
          <Button disabled>Disabled</Button>
          <TextLink href="/diagnostic">What you receive</TextLink>
        </div>
        <p className="t-small mt-8 max-w-[68ch] text-fg-3">
          {surface === 'void'
            ? 'On void the primary inverts to a paper fill with ink text at 17.96:1, making it the brightest object on screen. An accent fill here would be 1.60:1 and effectively invisible.'
            : 'On paper the primary is an accent fill with paper text at 11.16:1, and hovers to void at 17.9:1.'}
        </p>
      </Block>

      <Block index="03" label="Figure block">
        <div className="grid gap-5 md:grid-cols-3">
          <FigureBlock
            label="Found"
            figure="$412,000"
            tone="loss"
            annotation="Annualised leakage identified during the diagnostic."
          />
          <FigureBlock
            label="Sealed"
            figure="$287,000"
            tone="brand"
            annotation="Annualised recovery measured after implementation."
          />
          <FigureBlock label="Payback" figure="11 wks" annotation="Weeks to recover total fees." />
        </div>
      </Block>

      <Block index="04" label="Record table">
        <RecordTable
          columns={RECORD_COLUMNS}
          rows={RECORD_ROWS}
          caption="Illustrative engagement records"
        />
        <ColumnKey
          items={[
            { term: 'Found', definition: 'Annualised leakage identified during the diagnostic.' },
            {
              term: 'Sealed',
              definition:
                'Annualised recovery measured after implementation, over the period stated in each record. Always less than found.',
            },
            {
              term: 'Payback',
              definition:
                'Weeks for measured recovery to equal total fees paid, diagnostic plus implementation.',
            },
          ]}
        />
        <p className="t-small mt-8 max-w-[68ch] text-fg-3">
          Below 640px each row becomes a stacked block with its column header reattached as a label.
          No horizontal scroll, no shrinking. Narrow this window to check.
        </p>
      </Block>

      <Block index="05" label="Record table · zebra + linked rows">
        <RecordTable
          columns={[
            { key: 'year', label: 'Year' },
            { key: 'title', label: 'Credential' },
            { key: 'detail', label: 'Detail' },
          ]}
          rows={CREDENTIALS.map((c) => ({
            id: c.year + c.title,
            cells: { year: c.year, title: c.title, detail: c.detail },
            href: '/firm',
          }))}
          zebra
        />
        <div className="mt-10">
          <RecordTable
            columns={[
              { key: 'term', label: '' },
              { key: 'value', label: 'How we work' },
            ]}
            rows={ENGAGEMENT_TERMS.map((t) => ({
              id: t.term,
              cells: { term: t.term.toUpperCase(), value: t.value },
            }))}
          />
        </div>
        <p className="t-small mt-8 max-w-[68ch] text-fg-3">
          Two tables, separated. §4 section 2: credentials and terms of engagement are different
          things and must not be mixed.
        </p>
      </Block>

      <Block index="06" label="The figure settle · the one moment">
        <p className="t-display-2 mb-10 max-w-[24ch]">
          At a 7× multiple, $400,000 of recovered EBITDA is{' '}
          <FigureSettle value="$2,800,000" className="text-brand" /> of enterprise value.
        </p>
        <p className="t-small mt-10 max-w-[68ch] text-fg-3">
          At most one per viewport, three per page. Not on the results table: six odometers rolling
          in a table reads as a slot machine. Reduced motion renders the final value instantly.
        </p>
      </Block>

      <Block index="07" label="Section marker">
        <div className="flex flex-col gap-7">
          <SectionMarker index="01" label="Standing" />
          <SectionMarker index="02" label="Engagement record" />
          <SectionMarker index="05" label="Fit" />
        </div>
      </Block>
    </>
  );
}

export default function StyleguidePage() {
  return (
    <>
      <Surface surface="void" rule={false} padded={false}>
        <div className="shell py-16">
          <p className="t-label mb-5 text-fg-3">Internal · noindex</p>
          <h1 className="t-display-1 mb-6">Styleguide</h1>
          <p className="t-lead text-fg-2">
            Every component on both surfaces. Narrow the window to 375px to check the record table.
          </p>
        </div>
      </Surface>

      <Surface surface="void" padded={false}>
        <div className="shell pb-20">
          <p className="t-label mb-12 text-brand">Void surface</p>
          <Specimens surface="void" />
        </div>
      </Surface>

      <Surface surface="paper" padded={false}>
        <div className="shell py-20">
          <p className="t-label mb-12 text-brand">Paper surface</p>
          <Specimens surface="paper" />
        </div>
      </Surface>
    </>
  );
}
