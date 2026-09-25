import type { Metadata } from 'next';
import { Faqs } from '@/components/sections/Faqs';
import { JsonLd, breadcrumbLd, diagnosticServiceLd, faqPageLd } from '@/lib/jsonld';
import { DIAGNOSTIC_FAQS } from '@/content/faqs';
import { Surface } from '@/components/ui/Surface';
import { Lattice } from '@/components/ui/Lattice';
import { SectionMarker } from '@/components/layout/SectionMarker';
import { RecordTable } from '@/components/ui/RecordTable';
import { Button, TextLink } from '@/components/ui/Button';
import { DIAGNOSTIC } from '@/content/firm';
import {
  CONFIDENTIALITY,
  MEASUREMENT,
  IMPLEMENTATION,
  DELIVERABLES,
  DISCUSS,
  REQUIREMENTS,
  SEQUENCE,
  TERMS,
  hasConfidentiality,
} from '@/content/diagnostic';

/**
 * /diagnostic — the offer, in full.
 *
 * THIRTEEN LINKS POINT HERE. Every button on every page lands on this one, so
 * it cannot assume the visitor read the homepage and cannot defer anything to
 * a page they may never open. It closes, or nothing does.
 *
 * Structure answers the four questions in the order a buyer actually asks
 * them: what arrives, how it runs, what it costs and commits me to, and who
 * ends up holding my data. The last of those is the real transaction. $5,000
 * is not what makes an operating partner hesitate; handing a firm he has not
 * met the keys to the system his revenue runs through is.
 *
 * Grounds follow the site rule: 01 PAPER as the fixed point, close sharing the
 * footer's void.
 */

export const metadata: Metadata = {
  title: `The Leakage Diagnostic: ${DIAGNOSTIC.priceFormatted}`,
  description: `A fixed-scope diagnostic for operating companies at $3M to $15M. Every leak quantified annually and ranked by recoverable dollars. ${DIAGNOSTIC.priceFormatted}, credited against the build.`,
  alternates: { canonical: '/diagnostic' },
};

export default function DiagnosticPage() {
  return (
    <>
      <JsonLd data={diagnosticServiceLd()} />
      <JsonLd data={faqPageLd(DIAGNOSTIC_FAQS, '/diagnostic')} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'The diagnostic', path: '/diagnostic' },
        ])}
      />
      {/* --- Opening ------------------------------------------------------- */}
      <Surface surface="void" rule={false} as="header" className="hex-stage">
        <Lattice />
        <div className="shell">
          <div className="col-12">
            <div className="[grid-column:1/9]">
              <p className="t-label mb-14 text-fg-3">
                <span className="text-brand">Hexona Systems</span>
                <span className="px-1.5 text-brand opacity-50">·</span> The engagement
              </p>
              <h1 className="t-display-1 mb-12">The Leakage Diagnostic.</h1>
              <p className="t-lead mb-14 max-w-[56ch] text-fg-2">
                A two week intensive that starts the day you grant access. Every leak found is priced
                against your own numbers. If the leakage is immaterial, the report says so in its first
                paragraph and we tell you not to hire us.
              </p>
              <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
                <Button href="#commission">
                  Commission a diagnostic <span aria-hidden="true">→</span>{' '}
                  {DIAGNOSTIC.priceFormatted}
                </Button>
                <TextLink href="#discuss">Discuss it first</TextLink>
              </div>
            </div>
          </div>
        </div>
      </Surface>

      {/* --- 01 What arrives ----------------------------------------------- */}
      <Surface surface="paper">
        <div className="shell">
          <SectionMarker index="01" label="The deliverable" className="mb-14" />
          <div className="col-12 gap-y-16">
            <div className="[grid-column:1/5]">
              <h2 className="t-display-2 mb-6">What you receive.</h2>
              <p className="t-body max-w-[36ch] text-fg-2">
                All three are yours to keep, whether or not you ever hire us to build anything.
              </p>
            </div>
            <dl className="[grid-column:6/13] m-0 border-t border-line">
              {DELIVERABLES.map((d) => (
                <div key={d.term} className="border-b border-line py-7">
                  <dt className="t-body mb-2 text-fg">{d.term}</dt>
                  <dd className="t-small m-0 max-w-[64ch] text-fg-2">{d.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Surface>

      {/* --- 02 How it runs, and what it needs ----------------------------- */}
      <Surface surface="void" className="hex-stage">
        <Lattice />
        <div className="shell">
          <SectionMarker index="02" label="How it runs, and how it is measured" className="mb-14" />

          <div className="col-12 gap-y-16">
            <div className="[grid-column:1/7]">
              <ol className="m-0 list-none border-t border-line p-0">
                {SEQUENCE.map((s, i) => (
                  <li key={s.step} className="flex gap-6 border-b border-line py-7">
                    <span className="t-label shrink-0 pt-1 text-brand">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="t-body mb-2 text-fg">{s.step}</p>
                      <p className="t-small max-w-[52ch] text-fg-2">{s.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="[grid-column:8/13]">
              <h2 className="t-display-2 mb-10">What we need from you.</h2>
              <dl className="m-0 border-t border-line">
                {REQUIREMENTS.map((r) => (
                  <div key={r.term} className="border-b border-line py-6">
                    <dt className="t-label mb-2 text-fg-3">{r.term}</dt>
                    <dd className="t-small m-0 max-w-[48ch] text-fg-2">{r.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* What was going to be /method. It sits here because "why should I
              believe the figure" is asked while somebody is deciding to
              commission, not on a page they may never open. A full-width block
              rather than a section, so the grounds below do not invert. */}
          <div className="col-12 mt-24 border-t border-line pt-16">
            <div className="[grid-column:1/7]">
              <h2 className="t-display-2 mb-8">How a leak becomes a number.</h2>
              {MEASUREMENT.body.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0 ? 't-lead mb-8 max-w-[52ch] text-fg' : 't-body max-w-[56ch] text-fg-2'
                  }
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="[grid-column:8/13]">
              <p className="t-label mb-6 text-fg-3">What we will not count</p>
              <dl className="m-0 border-t border-line">
                {MEASUREMENT.excluded.map((e) => (
                  <div key={e.term} className="border-b border-line py-6">
                    <dt className="t-body mb-2 text-fg">{e.term}</dt>
                    <dd className="t-small m-0 max-w-[48ch] text-fg-2">{e.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Surface>

      {/* --- 03 Terms, and confidentiality --------------------------------- */}
      <Surface surface="paper">
        <div className="shell">
          <SectionMarker index="03" label="Terms, and what follows" className="mb-14" />
          <div className="col-12 gap-y-16">
            <div className="[grid-column:1/7]">
              <RecordTable
                caption="Terms of the engagement"
                columns={[
                  { key: 'term', label: 'Term' },
                  { key: 'value', label: '' },
                ]}
                rows={TERMS.map((t, i) => ({
                  id: String(i),
                  cells: { term: t.term, value: t.value },
                }))}
              />
            </div>

            <div className="[grid-column:8/13]">
              <h2 className="t-display-2 mb-8">Your systems, and what happens to them.</h2>
              {hasConfidentiality() ? (
                <dl className="m-0 border-t border-line">
                  {CONFIDENTIALITY.map((c) => (
                    <div key={c.term} className="border-b border-line py-6">
                      <dt className="t-label mb-2 text-fg-3">{c.term}</dt>
                      <dd className="t-small m-0 max-w-[48ch] text-fg-2">{c.detail}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                /* Gated like §5. An invented security posture is worse than an
                   absent one: a vague claim is weak, a specific false one is
                   actionable. See CONFIDENTIALITY_QUESTIONS. */
                <p className="t-body max-w-[44ch] text-fg-2">
                  Access is scoped, time-limited and agreed in writing before any credential
                  changes hands. The specifics are set out in the engagement letter, which you see
                  before you commit.
                </p>
              )}
            </div>
          </div>

          {/* The build. A full-width block rather than a fifth section: it is
              a commercial term and belongs with the others, and inserting a
              section here would invert every ground below it. */}
          <div className="col-12 mt-24 border-t border-line pt-16">
            <div className="[grid-column:1/7]">
              <h2 className="t-display-2 mb-8">After the diagnostic.</h2>
              {IMPLEMENTATION.body.map((para, i) => (
                <p key={i} className="t-body mb-6 max-w-[54ch] text-fg-2 last:mb-0">
                  {para}
                </p>
              ))}
              <p className="mt-8">
                <TextLink href="/implementation">What gets built, and who builds it</TextLink>
              </p>
            </div>
            <div className="[grid-column:8/13]">
              <dl className="m-0 border-t border-line">
                {IMPLEMENTATION.terms.map((t) => (
                  <div key={t.term} className="border-b border-line py-6">
                    <dt className="t-label mb-2 text-fg-3">{t.term}</dt>
                    <dd className="t-small m-0 max-w-[46ch] text-fg-2">{t.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Surface>

      {/* --- Ticket 7: five-plus visible Q&A pairs on the service page. The same
              array feeds the FAQPage schema above, so the two cannot drift. --- */}
      <Faqs
        items={DIAGNOSTIC_FAQS}
        index="04"
        surface="void"
        heading="The questions buyers ask here."
        lede="Including the two where the honest answer is inconvenient for us."
      />

      {/* --- Close. Both anchors live here. -------------------------------- */}
      <Surface surface="void" className="hex-stage">
        <Lattice />
        <div className="shell">
          <div className="col-12 gap-y-20">
            <div id="commission" className="scroll-mt-32 [grid-column:1/7]">
              <h2 className="t-display-2 mb-8">Commission it.</h2>
              <p className="t-body mb-10 max-w-[44ch] text-fg-2">
                {DIAGNOSTIC.priceFormatted}, credited in full against implementation. The clock
                starts the day you grant access, not the day you pay.
              </p>
              <Button href={`mailto:${DISCUSS.email}?subject=Commission%20a%20diagnostic`}>
                Commission a diagnostic <span aria-hidden="true">→</span>{' '}
                {DIAGNOSTIC.priceFormatted}
              </Button>
            </div>

            <div id="discuss" className="scroll-mt-32 [grid-column:8/13]">
              <h2 className="t-display-2 mb-8">Or talk first.</h2>
              <p className="t-body mb-10 max-w-[44ch] text-fg-2">{DISCUSS.body}</p>
              <TextLink
                href={
                  DISCUSS.bookingUrl ||
                  `mailto:${DISCUSS.email}?subject=Discuss%20the%20diagnostic`
                }
              >
                {DISCUSS.bookingUrl ? 'Book thirty minutes' : DISCUSS.email}
              </TextLink>
            </div>
          </div>
        </div>
      </Surface>
    </>
  );
}
