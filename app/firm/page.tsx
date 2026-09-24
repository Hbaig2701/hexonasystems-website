import type { Metadata } from 'next';
import { Surface } from '@/components/ui/Surface';
import { Lattice } from '@/components/ui/Lattice';
import { SectionMarker } from '@/components/layout/SectionMarker';
import { FigureBlock } from '@/components/ui/FigureBlock';
import { Button, TextLink } from '@/components/ui/Button';
import {
  AWARDS,
  COMMITMENTS,
  DIAGNOSTIC,
  ENTITY_SENTENCE,
  KEY_FACTS,
  ORIGIN,
  SEGMENTS,
  SERVICES,
  TEAM,
} from '@/content/firm';
import { JsonLd, breadcrumbLd, faqPageLd } from '@/lib/jsonld';
import { Faqs } from '@/components/sections/Faqs';
import { FIRM_FAQS } from '@/content/faqs';
import { RecordTable } from '@/components/ui/RecordTable';

/**
 * /firm — the About page.
 *
 * Built from the old Framer About page's SUBSTANCE and none of its register.
 * That page ran "A Tale of Inevitability", "Objective Dominance" and "Take Your
 * First Step to Liberation" over gradient cards. The facts underneath were
 * good; the styling was doing work the facts could do on their own.
 *
 * WHAT WAS DROPPED, and why. The old page carried a competitor table: "Other
 * Agencies: Riding the AI Wave / Unremarkable Leadership" against "Hexona:
 * Building Since Before ChatGPT". The comparison is fair and the sneer is not,
 * and a firm selling diligence to operating partners does not win by naming an
 * opponent it will not name. The one fact that table existed to deliver, that
 * this firm predates the tools, is now a date in the first paragraph, where it
 * is stronger and cannot be argued with.
 *
 * Grounds follow the homepage rule: section 01 is PAPER and is the fixed
 * point, and the close shares the footer's void so the page goes quiet into it.
 */

export const metadata: Metadata = {
  title: 'The firm: Hexona Systems',
  description: `${ENTITY_SENTENCE} Who runs the firm, and what it holds to.`,
  alternates: { canonical: '/firm' },
};

export default function FirmPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'The firm', path: '/firm' },
        ])}
      />
      {/* The same array drives the visible FAQ block below, so the marked-up
          answers and the on-page answers are one object. */}
      <JsonLd data={faqPageLd(FIRM_FAQS, '/firm')} />

      {/* --- Opening. Void, like the homepage hero. ------------------------ */}
      <Surface surface="void" rule={false} as="header" className="hex-stage">
        <Lattice />
        <div className="shell">
          <div className="col-12">
            <div className="[grid-column:1/9]">
              <p className="t-label mb-14 text-fg-3">
                <span className="text-brand">Hexona Systems</span>
                <span className="px-1.5 text-brand opacity-50">·</span> The firm
              </p>
              <h1 className="t-display-1 mb-12">
                We were doing this before
                <br className="hidden sm:inline" />
                there was a name for it.
              </h1>
              <p className="t-lead mb-8 max-w-[56ch] text-fg-2">
                Hexona has paved the way for AI automation agencies since establishing in{' '}
                {ORIGIN.since}, long before this AI era began.
              </p>

              {/* The entity definition, third person and verbatim. Same constant
                  the homepage hero and the Organization schema use, so the four
                  placements cannot drift; check:seo fails if they do. */}
              <p className="t-small mt-8 max-w-[76ch] text-fg-3">{ENTITY_SENTENCE}</p>

              {/* TICKET 5 — the entity sentence, first paragraph of /firm, in
                  selectable body text. Identical to the homepage hero and to the
                  Organization schema `description`. This is the page an assistant
                  is most likely to fetch when asked what Hexona is, so the
                  definition belongs above the origin story rather than after
                  it. */}
              <p className="t-small max-w-[76ch] text-fg-3">{ENTITY_SENTENCE}</p>
            </div>
          </div>
        </div>
      </Surface>

      {/* --- 01 What the firm does. PAPER. --------------------------------
          Six services, each stating what is delivered and what changes. The
          SOP wants a service list an extractor can walk; this is the same six
          the implementation page describes at length, stated once as facts. */}
      <Surface surface="paper">
        <div className="shell">
          <SectionMarker index="01" label="What Hexona Systems does" className="mb-14" />
          <div className="col-12 gap-y-16">
            <div className="[grid-column:1/5]">
              <h2 className="t-display-2 mb-6">Six services.</h2>
              <p className="t-body max-w-[36ch] text-fg-2">
                One finds the money. The other five close the gaps it finds, in the order the
                report puts them in.
              </p>
            </div>
            <dl className="[grid-column:6/13] m-0 border-t border-line">
              {SERVICES.map((sv) => (
                <div key={sv.name} className="border-b border-line py-7">
                  <dt className="t-body mb-2 text-fg">{sv.name}</dt>
                  <dd className="t-small m-0 max-w-[64ch] text-fg-2">
                    {sv.delivered} {sv.outcome}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Surface>

      {/* --- 02 Who it is for. VOID. --------------------------------------
          A taxonomy rather than marketing copy: named revenue band, named
          industries, named buyer, and who it is explicitly not for. */}
      <Surface surface="void" className="hex-stage">
        <Lattice />
        <div className="shell">
          <SectionMarker index="02" label="Who it is for" className="mb-14" />
          <div className="col-12 gap-y-16">
            <div className="[grid-column:1/7]">
              <h2 className="t-display-2 mb-8">Operating companies, $3M to $15M.</h2>
              <p className="t-lead mb-8 max-w-[52ch] text-fg">{SEGMENTS.primary}</p>
              <p className="t-body mb-6 max-w-[56ch] text-fg-2">{SEGMENTS.buyer}</p>
              <p className="t-body max-w-[56ch] text-fg-2">{SEGMENTS.notFor}</p>
            </div>
            <div className="[grid-column:8/13]">
              <p className="t-label mb-6 text-fg-3">Industries served</p>
              <ul className="m-0 border-t border-line p-0">
                {SEGMENTS.industries.map((i) => (
                  <li key={i} className="t-body border-b border-line py-4 text-fg-2">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Surface>

      {/* --- 03 Origin. PAPER, the fixed point. ---------------------------- */}
      <Surface surface="paper">
        <div className="shell">
          <SectionMarker index="03" label="Origin" className="mb-14" />
          <div className="col-12 gap-y-16">
            <div className="[grid-column:1/8]">
              {ORIGIN.body.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0 ? 't-lead mb-8 max-w-[58ch] text-fg' : 't-body max-w-[64ch] text-fg-2'
                  }
                >
                  {para}
                </p>
              ))}
            </div>
            <div className="[grid-column:9/13] flex flex-col gap-6">
              {ORIGIN.figures.map((f) => (
                <FigureBlock key={f.label} label={f.label} figure={f.figure} />
              ))}
            </div>
          </div>
        </div>
      </Surface>

      {/* --- 02 The team. VOID. -------------------------------------------- */}
      <Surface surface="void" className="hex-stage">
        <Lattice />
        <div className="shell">
          <SectionMarker index="04" label="Who does the work" className="mb-14" />
          <div className="col-12">
            <div className="[grid-column:1/8]">
              <h2 className="t-display-2 mb-8">The team behind the work.</h2>
              <p className="t-body mb-16 max-w-[60ch] text-fg-2">
                Engagements are led by the principal with one or two operators, and the team that
                takes your systems access is the team that presents the findings. Builds are
                delivered by a separate engineering team, described on the{' '}
                <a href="/implementation" className="link">
                  implementation page
                </a>
                .
              </p>
            </div>
          </div>

          <ul className="col-12 gap-y-0 border-t border-line">
            {TEAM.map((person) => (
              <li
                key={person.name}
                className="flex flex-col gap-x-12 gap-y-1 border-b border-line py-6 md:flex-row md:items-baseline [grid-column:1/13]"
              >
                <p className="t-body shrink-0 text-fg md:w-64">{person.name}</p>
                <p className="t-small text-fg-3">{person.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </Surface>

      {/* --- 03 Commitments. PAPER. ---------------------------------------- */}
      <Surface surface="paper">
        <div className="shell">
          <SectionMarker index="05" label="What we hold to" className="mb-14" />
          <div className="col-12 gap-y-16">
            <div className="[grid-column:1/5]">
              <h2 className="t-display-2 mb-6">Four commitments you can hold us to.</h2>
              <p className="t-body max-w-[36ch] text-fg-2">
                A value nobody could disagree with is decoration. Each of these is enforced by the
                engagement terms.
              </p>
            </div>

            <dl className="[grid-column:6/13] m-0 border-t border-line">
              {COMMITMENTS.map((c) => (
                <div key={c.term} className="border-b border-line py-7">
                  <dt className="t-body mb-2 text-fg">{c.term}</dt>
                  <dd className="t-small m-0 max-w-[62ch] text-fg-2">{c.detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Awards sit here rather than on the homepage: there they would be
              proof and cannot be checked, here they are biography. */}
          <div className="col-12 mt-24">
            <div className="[grid-column:6/13]">
              <p className="t-label mb-6 text-fg-3">Recognition</p>
              <ul className="border-t border-line">
                {AWARDS.map((a) => (
                  <li
                    key={a.title}
                    className="flex flex-col gap-x-8 gap-y-1 border-b border-line py-5 md:flex-row md:items-baseline"
                  >
                    <span className="t-label shrink-0 text-brand md:w-20">{a.year}</span>
                    <span className="t-body text-fg-2">
                      {a.title}
                      {/* Says award or nomination, every time. See AWARDS. */}
                      {a.detail && <span className="t-small block text-fg-3">{a.detail}</span>}
                    </span>
                    {a.href && (
                      <a
                        href={a.href}
                        className="link t-label md:ml-auto"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Verify <span aria-hidden="true">→</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* KEY FACTS. A key-value store in HTML, which is the format an
              extractor handles best and why the SOP calls it the most
              important block on the page. A real table, never an image.

              A block inside §05 rather than a seventh section: a seventh would
              push the FAQ, which takes the close's ground, into a run of four
              dark blocks. Rows with no value do not render, so nothing ships
              as a placeholder. */}
          <div className="col-12 mt-24 border-t border-line pt-16">
            <div className="[grid-column:1/5]">
              <h2 className="t-display-2 mb-6">Key facts.</h2>
              <p className="t-body max-w-[34ch] text-fg-2">
                Every figure on this page in one place, stated as plainly as it can be.
              </p>
            </div>
            <div className="[grid-column:6/13]">
              <RecordTable
                caption="Key facts about Hexona Systems"
                columns={[
                  { key: 'field', label: 'Field' },
                  { key: 'value', label: 'Value' },
                ]}
                rows={KEY_FACTS.map((r, i) => ({
                  id: String(i),
                  cells: { field: r.field, value: r.value },
                }))}
              />
            </div>
          </div>
        </div>
      </Surface>

      {/* --- Frequently asked. VOID, matching the close it runs into. ------ */}
      <Faqs
        items={FIRM_FAQS}
        index="06"
        surface="void"
        heading="What people ask about the firm."
        lede="Answered in full rather than linked to."
      />

      {/* --- Close. VOID, shared with the footer. --------------------------- */}
      <Surface surface="void" className="hex-stage">
        <Lattice />
        <div className="shell">
          <div className="col-12">
            <div className="[grid-column:1/9]">
              {/* Plain and true. The line here used to be "The firm is five
                  years old. The leak in your business is older", which asserts
                  something about a reader the firm has never met, and reaches
                  for a flourish this page does not need. The homepage carries
                  the argument; this close only has to point at the next step. */}
              <h2 className="t-display-1 mb-16">
                Every engagement begins
                <br className="hidden sm:inline" />
                with the same two weeks.
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
