import type { Metadata } from 'next';
import { Surface } from '@/components/ui/Surface';
import { Lattice } from '@/components/ui/Lattice';
import { SectionMarker } from '@/components/layout/SectionMarker';
import { RecordTable } from '@/components/ui/RecordTable';
import { Button, TextLink } from '@/components/ui/Button';
import { DIAGNOSTIC } from '@/content/firm';
import { BUILDS, BUILD_TEAM, IMPLEMENTATION } from '@/content/diagnostic';

/**
 * /implementation — the build.
 *
 * WHY THIS PAGE EXISTS. The build was load-bearing across the entire site and
 * described nowhere: the hero says "seal it", the diagnostic fee is credited
 * against implementation in eleven places, and SEALED is defined as recovery
 * measured AFTER implementation. A reader was being asked to buy the first
 * half of a transaction whose second half had no stated shape.
 *
 * The cost of that lands on the DIAGNOSTIC, not here. A $5,000 report is only
 * worth commissioning if the follow-on is viable, and this is the page that
 * lets a buyer decide whether it is before they spend anything.
 *
 * Phase COUNT is deliberately never stated. Nobody knows it before the
 * diagnostic, and inventing a number here would contradict the one honest
 * thing the pricing says: you approve phases one at a time because until the
 * work is scoped neither party knows the total.
 */

export const metadata: Metadata = {
  title: 'Implementation: sealing what the diagnostic found',
  description:
    'Fixed price per phase, typically $25,000 to $75,000 across all phases, with the diagnostic fee credited against the first. Four engineers, and recovery measured after each phase in the system the leak was found in.',
  alternates: { canonical: '/implementation' },
};

export default function ImplementationPage() {
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
                <span className="px-1.5 text-brand opacity-50">·</span> Implementation
              </p>
              <h1 className="t-display-1 mb-12">
                Finding it is the cheap part.
                <br className="hidden sm:inline" />
                Sealing it is the work.
              </h1>
              <p className="t-lead max-w-[58ch] text-fg-2">
                The diagnostic prices every leak and ranks them. The build closes the ones worth
                closing, in the order the report puts them in, and then proves the money came back.
              </p>
            </div>
          </div>
        </div>
      </Surface>

      {/* --- 01 What gets built -------------------------------------------- */}
      <Surface surface="paper">
        <div className="shell">
          <SectionMarker index="01" label="What gets built" className="mb-14" />
          <div className="col-12 gap-y-16">
            <div className="[grid-column:1/5]">
              <h2 className="t-display-2 mb-6">The leak decides the build.</h2>
              <p className="t-body max-w-[36ch] text-fg-2">
                Which is why no two look alike. The work is always the same kind of work. Only its
                form changes.
              </p>
            </div>
            <dl className="[grid-column:6/13] m-0 border-t border-line">
              {BUILDS.map((b) => (
                <div key={b.term} className="border-b border-line py-7">
                  <dt className="t-body mb-2 text-fg">{b.term}</dt>
                  <dd className="t-small m-0 max-w-[64ch] text-fg-2">{b.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Surface>

      {/* --- 02 Who builds it ---------------------------------------------- */}
      <Surface surface="void" className="hex-stage">
        <Lattice />
        <div className="shell">
          <SectionMarker index="02" label="Who builds it" className="mb-14" />
          <div className="col-12">
            <div className="[grid-column:1/8]">
              <h2 className="t-display-2 mb-10">Four engineers, and none of them bills by the hour.</h2>
              {BUILD_TEAM.body.map((para, i) => (
                <p key={i} className="t-body mb-6 max-w-[62ch] text-fg-2 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Surface>

      {/* --- 03 Scope, price, proof ---------------------------------------- */}
      <Surface surface="paper">
        <div className="shell">
          <SectionMarker index="03" label="Scope, price and proof" className="mb-14" />
          <div className="col-12 gap-y-16">
            <div className="[grid-column:1/7]">
              {IMPLEMENTATION.body.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0 ? 't-lead mb-8 max-w-[52ch] text-fg' : 't-body mb-6 max-w-[58ch] text-fg-2'
                  }
                >
                  {para}
                </p>
              ))}
            </div>
            <div className="[grid-column:8/13]">
              <RecordTable
                caption="Implementation terms"
                columns={[
                  { key: 'term', label: 'Term' },
                  { key: 'value', label: '' },
                ]}
                rows={IMPLEMENTATION.terms.map((t, i) => ({
                  id: String(i),
                  cells: { term: t.term, value: t.value },
                }))}
              />
            </div>
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
                Nobody builds anything
                <br className="hidden sm:inline" />
                until the number is on paper.
              </h2>
              <div className="flex flex-col items-start gap-8">
                <Button href="/diagnostic">
                  Start with the diagnostic <span aria-hidden="true">→</span>{' '}
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
