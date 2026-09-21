import { Surface } from '@/components/ui/Surface';
import { SectionMarker } from '@/components/layout/SectionMarker';
import { cn } from '@/lib/cn';

/**
 * SECTION 6 — FIT. §4. PAPER.
 *
 * §3.6: the two columns stack on mobile with "Not a fit" SECOND. It is the more
 * persuasive of the two, so it lands last. The DOM order already puts it second,
 * which is what makes the stacking correct without a CSS reorder.
 */

const FIT = [
  '$10M–$100M revenue',
  'Inbound demand exists and is being paid for',
  'Someone owns operations and can grant systems access',
  'Willing to change how work is done, not just which tools are used',
];

const NOT_FIT = [
  'Companies under $10M, where the leakage rarely justifies the fee and we will tell you so',
  'The goal is headcount reduction rather than recovered revenue',
  'Systems undocumented and nobody available to document them',
  'What’s wanted is a tool recommendation, which any consultant gives away free',
];

function Column({
  heading,
  items,
  tone,
}: {
  heading: string;
  items: string[];
  tone: 'fit' | 'not';
}) {
  return (
    <div>
      {/* Fit and Not a fit are a signal pair, so they take the signal colours.
          Both are label-paired by definition: the heading IS the label. */}
      <h3
        className={cn(
          't-label mb-8 border-b pb-4',
          tone === 'fit' ? 'border-brand/40 text-brand' : 'border-loss/40 text-loss',
        )}
      >
        {heading}
      </h3>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item} className="t-body border-b border-line py-4 text-fg-2 last:border-b-0">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Fit() {
  return (
    <Surface surface="paper">
      <div className="shell">
        <SectionMarker index="05" label="Fit" className="mb-14" />

        <h2 className="t-display-2 mb-16 max-w-[20ch]">
          We decline more of this work than we take.
        </h2>

        <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
          <Column heading="Fit" items={FIT} tone="fit" />
          <Column heading="Not a fit" items={NOT_FIT} tone="not" />
        </div>
      </div>
    </Surface>
  );
}
