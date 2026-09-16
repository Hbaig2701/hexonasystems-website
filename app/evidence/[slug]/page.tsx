import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Surface } from '@/components/ui/Surface';
import { Lattice } from '@/components/ui/Lattice';
import { SectionMarker } from '@/components/layout/SectionMarker';
import { FigureBlock } from '@/components/ui/FigureBlock';
import { RecordTable } from '@/components/ui/RecordTable';
import { Button, TextLink } from '@/components/ui/Button';
import { DIAGNOSTIC } from '@/content/firm';
import { RECORDS } from '@/content/evidence';

/**
 * /evidence/[slug] — one engagement record.
 *
 * Built now, empty by construction. RECORDS holds nothing, so
 * generateStaticParams returns no paths and every slug 404s, which is correct:
 * the index links to `/evidence/${slug}` and the first real record would
 * otherwise land on a dead route the moment it was added.
 *
 * ⚠️ §5 APPLIES IN FULL HERE. Every figure on this page must be measured, not
 * estimated, and `verification` is never optional: it names the system and the
 * metric. `consentOnFile` must be true before a record is added at all, and
 * the page states the consent to the reader rather than assuming it.
 *
 * Order is deliberate. Situation, then what was found, then what was built,
 * then what changed, then how it was verified. A reader who stops early has
 * still read the claim in the order it was earned.
 */

export function generateStaticParams() {
  return RECORDS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const record = RECORDS.find((r) => r.slug === slug);
  if (!record) return { title: 'Record not found' };
  return {
    title: `${record.sector}, ${record.year}: ${record.title}`,
    description: `${record.found} found, ${record.sealed} sealed. ${record.verification}`,
    alternates: { canonical: `/evidence/${record.slug}` },
  };
}

export default async function RecordPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const record = RECORDS.find((r) => r.slug === slug);
  if (!record) notFound();

  return (
    <>
      <Surface surface="void" rule={false} as="header" className="hex-stage">
        <Lattice />
        <div className="shell">
          <div className="col-12">
            <div className="[grid-column:1/10]">
              <p className="t-label mb-14 text-fg-3">
                <span className="text-brand">{record.index}</span>
                <span className="px-1.5 text-brand opacity-50">·</span> {record.sector}
                <span className="px-1.5 text-brand opacity-50">·</span> {record.region}
                <span className="px-1.5 text-brand opacity-50">·</span> {record.year}
              </p>
              <h1 className="t-display-1 mb-12 max-w-[20ch]">{record.title}</h1>
            </div>
          </div>

          <div className="col-12 mt-8 gap-6">
            <div className="[grid-column:1/4]">
              <FigureBlock label="Revenue" figure={record.revenue} annotation={record.headcount} />
            </div>
            <div className="[grid-column:4/7]">
              <FigureBlock label="Found" figure={record.found} tone="loss" />
            </div>
            <div className="[grid-column:7/10]">
              <FigureBlock label="Sealed" figure={record.sealed} tone="brand" />
            </div>
            <div className="[grid-column:10/13]">
              <FigureBlock label="Payback" figure={record.payback} />
            </div>
          </div>
        </div>
      </Surface>

      <Surface surface="paper">
        <div className="shell">
          <SectionMarker index="01" label="The situation" className="mb-14" />
          <div className="col-12">
            <div className="[grid-column:1/8]">
              {record.situation.map((para, i) => (
                <p
                  key={i}
                  className={i === 0 ? 't-lead mb-8 max-w-[58ch]' : 't-body mb-6 max-w-[64ch] text-fg-2'}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Surface>

      <Surface surface="void" className="hex-stage">
        <Lattice />
        <div className="shell">
          <SectionMarker index="02" label="What we found" className="mb-14" />
          <RecordTable
            caption="Leakage identified, annualised"
            columns={[
              { key: 'leak', label: 'Leak' },
              { key: 'annualised', label: 'Annualised', numeric: true, tone: 'loss' },
            ]}
            rows={record.whatWeFound.map((f, i) => ({
              id: String(i),
              cells: { leak: f.leak, annualised: f.annualised },
            }))}
          />
        </div>
      </Surface>

      <Surface surface="paper">
        <div className="shell">
          <SectionMarker index="03" label="What we built" className="mb-14" />
          <div className="col-12">
            <ul className="[grid-column:1/9] border-t border-line">
              {record.whatWeBuilt.map((item) => (
                <li key={item} className="t-body border-b border-line py-6 text-fg-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Surface>

      <Surface surface="void" className="hex-stage">
        <Lattice />
        <div className="shell">
          <SectionMarker index="04" label="What changed" className="mb-14" />
          <RecordTable
            caption="Measured before and after"
            columns={[
              { key: 'metric', label: 'Metric' },
              { key: 'before', label: 'Before', numeric: true },
              { key: 'after', label: 'After', numeric: true, tone: 'brand' },
            ]}
            rows={record.whatChanged.map((c, i) => ({
              id: String(i),
              cells: { metric: c.metric, before: c.before, after: c.after },
            }))}
          />
        </div>
      </Surface>

      <Surface surface="paper">
        <div className="shell">
          <SectionMarker index="05" label="Verification" className="mb-14" />
          <div className="col-12">
            <div className="[grid-column:1/8]">
              {/* Never optional, and never softened. This paragraph is what
                  separates a record from a testimonial. */}
              <p className="t-lead mb-8 max-w-[58ch] text-fg">{record.verification}</p>
              {record.consentOnFile && (
                <p className="t-small max-w-[58ch] text-fg-3">
                  The client has reviewed and approved this record as published. Their name is
                  withheld by agreement; the figures are unaltered.
                </p>
              )}
              <p className="mt-10">
                <TextLink href="/evidence">All engagement records</TextLink>
              </p>
            </div>
          </div>
        </div>
      </Surface>

      <Surface surface="void" className="hex-stage">
        <Lattice />
        <div className="shell">
          <div className="col-12">
            <div className="[grid-column:1/9]">
              <h2 className="t-display-1 mb-16">
                This began the same way
                <br className="hidden sm:inline" />
                yours would.
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
