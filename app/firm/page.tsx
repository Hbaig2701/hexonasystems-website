import type { Metadata } from 'next';
import { Surface } from '@/components/ui/Surface';
import { Lattice } from '@/components/ui/Lattice';
import { SectionMarker } from '@/components/layout/SectionMarker';
import { FigureBlock } from '@/components/ui/FigureBlock';
import { Button, TextLink } from '@/components/ui/Button';
import { AWARDS, COMMITMENTS, DIAGNOSTIC, ORIGIN, TEAM } from '@/content/firm';

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
  description:
    'Hexona has been putting automation inside operating companies since 2021, two years before general-purpose language models arrived. Who runs the firm, and what it holds to.',
  alternates: { canonical: '/firm' },
};

export default function FirmPage() {
  return (
    <>
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
              <p className="t-lead max-w-[56ch] text-fg-2">
                Hexona has paved the way for AI automation agencies since establishing in{' '}
                {ORIGIN.since}, long before this AI era began.
              </p>
            </div>
          </div>
        </div>
      </Surface>

      {/* --- 01 Origin. PAPER, the fixed point. ---------------------------- */}
      <Surface surface="paper">
        <div className="shell">
          <SectionMarker index="01" label="Origin" className="mb-14" />
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
          <SectionMarker index="02" label="Who does the work" className="mb-14" />
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
          <SectionMarker index="03" label="What we hold to" className="mb-14" />
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
        </div>
      </Surface>

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
