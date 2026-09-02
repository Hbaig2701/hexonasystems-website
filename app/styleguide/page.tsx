import type { Metadata } from 'next';
import { PageFrame } from '@/components/layout/PageFrame';
import { SectionEyebrow } from '@/components/layout/SectionEyebrow';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Card } from '@/components/ui/Card';
import { DataPanel, DataRow } from '@/components/ui/DataPanel';
import { Accordion } from '@/components/ui/Accordion';
import { StyleguideInteractive } from './interactive';
import { Numerals } from './numerals';
import { pendingClaims } from '@/content/claims';

/**
 * /styleguide — Phase 1 deliverable (§10.2, §14).
 * noindex. Keep it: it is how every future component gets reviewed.
 */

export const metadata: Metadata = {
  title: 'Styleguide',
  robots: { index: false, follow: false },
};

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
    <section className="border-t border-hairline py-16 first:border-t-0">
      <SectionEyebrow index={index} label={label} className="mb-10" />
      {children}
    </section>
  );
}

function Swatch({ name, varName, note }: { name: string; varName: string; note?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 w-full rounded-md border border-hairline"
        style={{ background: `var(${varName})` }}
      />
      <div>
        <p className="type-micro text-secondary">{name}</p>
        <p className="type-micro text-quaternary">{varName}</p>
        {note && <p className="type-micro text-quaternary">{note}</p>}
      </div>
    </div>
  );
}

export default function StyleguidePage() {
  const pending = pendingClaims();

  return (
    <PageFrame footerCta={false}>
      <div className="page-shell py-20">
        <header className="mb-8">
          <p className="type-label mb-4 text-accent">Internal · noindex</p>
          <h1 className="type-display-2 mb-4">Styleguide</h1>
          <p className="type-lead max-w-[60ch] text-secondary">
            Every component in every state. Phase 1 acceptance surface, and the review surface for
            everything built after it.
          </p>
        </header>

        <Block index="01" label="Color · canvas & structure">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
            <Swatch name="Void" varName="--void" note="hero background only" />
            <Swatch name="Base" varName="--base" note="default page background" />
            <Swatch name="Surface" varName="--surface" note="cards, panels" />
            <Swatch name="Surface raised" varName="--surface-raised" note="hover, elevated" />
            <Swatch name="Surface inset" varName="--surface-inset" note="inputs, wells" />
            <Swatch name="Hairline" varName="--hairline" />
            <Swatch name="Hairline bright" varName="--hairline-bright" />
            <Swatch name="Grid line" varName="--grid-line" />
          </div>
        </Block>

        <Block index="02" label="Color · type & accent">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
            <Swatch name="Text primary" varName="--text-primary" note="18.1:1" />
            <Swatch name="Text secondary" varName="--text-secondary" note="9.0:1" />
            <Swatch name="Text tertiary" varName="--text-tertiary" note="6.2:1" />
            <Swatch name="Text quaternary" varName="--text-quaternary" note="4.8:1 · AA floor" />
            <Swatch name="Text decorative" varName="--text-decorative" note="NON-TEXT ONLY" />
            <Swatch name="Accent" varName="--accent" note="the only brand color" />
            <Swatch name="Accent bright" varName="--accent-bright" />
            <Swatch name="Accent deep" varName="--accent-deep" />
            <Swatch name="Signal leak" varName="--signal-leak" note="data viz only" />
            <Swatch name="Signal sealed" varName="--signal-sealed" note="data viz only" />
          </div>

          <div className="mt-10 rounded-md border border-hairline bg-surface p-6">
            <p className="type-label mb-4 text-tertiary">Contrast, rendered</p>
            <div className="flex flex-col gap-2">
              <p className="text-primary">Primary · 18.1:1 on base</p>
              <p className="text-secondary">Secondary · 9.0:1 on base</p>
              <p className="text-tertiary">Tertiary · 6.2:1 on base</p>
              <p className="text-quaternary">Quaternary · 4.8:1 on base. Do not darken.</p>
              <p className="text-decorative">
                Decorative · 1.9:1. Never used for characters a user must read; this line exists
                only to show why.
              </p>
            </div>
          </div>
        </Block>

        <Block index="03" label="Light editorial surface">
          <div className="rounded-md bg-light-base p-10">
            <SectionEyebrow index="08" label="The founder" tone="light" className="mb-8" />
            <h2 className="type-display-3 mb-4 text-light-primary">
              The one section that inverts.
            </h2>
            <p className="type-body mb-6 max-w-[60ch] text-light-secondary">
              After eight sections of dark instrumentation, an editorial light section lands like a
              held breath. Cyan text on this ground uses{' '}
              <span className="text-light-accent">--light-accent (#0A5A6B)</span> at 6.9:1. The
              brand cyan reaches only 1.5:1 here and is unreadable.
            </p>
            <p className="type-micro text-light-tertiary">
              --light-tertiary · 5.3:1 on this ground, 4.9:1 on light cards
            </p>
          </div>
        </Block>

        <Block index="04" label="Typography">
          <div className="flex flex-col gap-10">
            <div>
              <p className="type-micro mb-3 text-quaternary">
                type-display-1 · Geist 500 · -0.035em · 0.94
              </p>
              <p className="type-display-1">Your revenue isn&apos;t lost.</p>
            </div>
            <div>
              <p className="type-micro mb-3 text-quaternary">
                type-display-2 · Geist 500 · -0.028em · 1.02
              </p>
              <p className="type-display-2">Growth doesn&apos;t break companies.</p>
            </div>
            <div>
              <p className="type-micro mb-3 text-quaternary">type-display-3</p>
              <p className="type-display-3">One system. Every department. No seams.</p>
            </div>
            <div>
              <p className="type-micro mb-3 text-quaternary">type-lead · max-width 56ch</p>
              <p className="type-lead max-w-[56ch] text-secondary">
                Every unanswered lead. Every manual handoff. Every reply that took a day instead of
                a minute.
              </p>
            </div>
            <div>
              <p className="type-micro mb-3 text-quaternary">type-body · 68ch</p>
              <p className="type-body max-w-[68ch] text-secondary">
                You added a channel. Then a tool to manage the channel. Then someone to manage the
                tool. Now a lead comes in through one system, gets logged in a second, assigned in a
                third, and followed up from a fourth.
              </p>
            </div>
            <div className="flex flex-wrap items-baseline gap-8">
              <div>
                <p className="type-micro mb-3 text-quaternary">type-label</p>
                <p className="type-label text-secondary">Revenue leakage</p>
              </div>
              <div>
                <p className="type-micro mb-3 text-quaternary">type-micro</p>
                <p className="type-micro text-quaternary">Agencies and operating companies</p>
              </div>
              <div>
                <p className="type-micro mb-3 text-quaternary">type-figure · tabular</p>
                <p className="type-figure text-[40px] text-accent">$415,800</p>
              </div>
            </div>
          </div>
        </Block>

        <Block index="05" label="Section eyebrow · the typographic signature">
          <div className="flex flex-col gap-8">
            <SectionEyebrow index="01" label="The diagnosis" />
            <SectionEyebrow index="05" label="For the numerically inclined" />
            <SectionEyebrow label="Unnumbered · bookend sections carry no index" />
            <SectionEyebrow index="02" label="With hex motif (interior pages, §5.5)" hexMotif />
          </div>
        </Block>

        <Block index="06" label="Buttons">
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="primary" arrow>
                Primary with arrow
              </Button>
              <Button variant="primary" size="large" arrow>
                Book a systems review
              </Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="secondary">Secondary</Button>
              <Button variant="secondary" arrow>
                Find your leak
              </Button>
              <Button variant="secondary" disabled>
                Disabled
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-8">
              <Button variant="ghost" arrow>
                Read the full breakdown
              </Button>
              <Button variant="ghost" arrow href="/work">
                As a link
              </Button>
            </div>
          </div>
        </Block>

        <Block index="07" label="Cards · the signature cyan top-edge hover">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-7">
              <p className="type-micro mb-4 text-accent">01</p>
              <h3 className="mb-3 text-[19px] font-medium">Embedded Artificial Intelligence</h3>
              <p className="text-small text-secondary">
                Hover me. A 1px cyan line grows along the top edge from left to right in 320ms.
                Every card type on this site uses it.
              </p>
            </Card>
            <Card href="/work" className="p-7">
              <p className="type-micro mb-4 text-accent">02</p>
              <h3 className="mb-3 text-[19px] font-medium">As a link</h3>
              <p className="text-small text-secondary">
                Same component, wrapping a route. Focus it with the keyboard. The top edge responds
                to focus as well as hover.
              </p>
            </Card>
          </div>
        </Block>

        <Block index="08" label="Data panel">
          <div className="grid gap-6 lg:grid-cols-2">
            <DataPanel header="Case 01 · Childcare · Ontario" headerRight="2026">
              <p className="type-figure mb-2 text-[44px] text-accent">$80,000</p>
              <p className="type-label text-tertiary">Annual revenue recovered</p>
            </DataPanel>

            <DataPanel header="How we got there">
              <DataRow label="Inquiries per month" value="200.00" />
              <DataRow label="Reached within 5 minutes" value="50.00" />
              <DataRow label="Reached slowly" value="150.00" />
              <DataRow label="Lost to delay" value="16.50" tone="leak" rule />
              <DataRow label="Recoverable per month" value="11.55" tone="sealed" />
              <DataRow label="Annual" value="$415,800" emphasis tone="accent" rule />
            </DataPanel>
          </div>
        </Block>

        <Block index="09" label="Accordion · native details/summary, JS-enhanced">
          <Accordion
            items={[
              {
                question: 'How long until this is running?',
                answer:
                  'Scope determines it, but a defined implementation typically runs six to ten weeks.',
              },
              {
                question: 'What does it cost?',
                answer:
                  'Implementation is scoped per engagement, with ongoing platform access on a monthly licence.',
              },
              {
                question: 'Does it work with JavaScript disabled?',
                answer:
                  'Yes. These are real <details> elements. Turn JS off and every answer still opens.',
              },
            ]}
          />
        </Block>

        <StyleguideInteractive />

        <Block index="12" label="Section cadence · pill + centred heading">
          <div className="flex flex-col gap-16">
            <SectionHeading
              eyebrow="Our team"
              index="09"
              sub="One line of context. Keep it to one line. It is a caption, not a paragraph."
            >
              The Architects Behind the Engine
            </SectionHeading>

            <SectionHeading eyebrow="No index" sub="Bookend sections carry no index (§4.3).">
              Take Your First Step to Liberation
            </SectionHeading>

            <SectionHeading
              eyebrow="Left aligned"
              index="04"
              align="left"
              size="display-3"
              sub="The same component, left-aligned, for pages that want a document rhythm."
            >
              Recognition, on the record.
            </SectionHeading>

            <div className="rounded-md bg-light-base p-10">
              <SectionHeading
                eyebrow="Light surface"
                index="02"
                tone="light"
                size="display-3"
                sub="Every accent on this ground uses --light-accent, never the brand cyan."
              >
                An operator who learned to build
              </SectionHeading>
            </div>
          </div>
        </Block>

        <Block index="13" label="Glow · the four permitted placements">
          <div className="grid gap-5 md:grid-cols-2">
            <div
              data-glow="on"
              className="glow-card rounded-md border border-hairline bg-surface p-7"
            >
              <p className="type-label mb-3 text-accent">glow-card</p>
              <p className="text-small text-secondary">
                Corner bloom, always on. Used on values, stats and testimonials. Set{' '}
                <code>--glow-x</code> to move which corner it blooms from.
              </p>
            </div>

            <div className="glow-card rounded-md border border-hairline bg-surface p-7">
              <p className="type-label mb-3 text-accent">glow-card (hover)</p>
              <p className="text-small text-secondary">
                Same component without <code>data-glow</code>. The bloom is the hover reward
                instead of the resting state.
              </p>
            </div>

            <div className="glow-block rounded-md border border-hairline bg-surface p-10 text-center md:col-span-2">
              <p className="type-label mb-3 text-accent">glow-block</p>
              <p className="text-small mx-auto max-w-[52ch] text-secondary">
                Two blooms from opposite corners. The closing CTA and the footer CTA use this, and
                nothing else does. It is the shape that says &ldquo;this is the offer&rdquo;.
              </p>
            </div>
          </div>

          <p className="type-micro mt-6 max-w-[70ch] text-quaternary">
            Glow is gradient-only and never sits behind body copy. Every contrast pair in
            scripts/check-contrast.mjs is measured against the flat surface underneath, so a bloom
            can never push text below the AA floor.
          </p>
        </Block>

        <Block index="14" label="Icons · drawn, never emoji or a library glyph">
          <div className="flex flex-wrap gap-4">
            {(
              [
                'award',
                'scoreboard',
                'amplifier',
                'seam',
                'businesses',
                'value',
                'check',
                'cross',
              ] as const
            ).map((name) => (
              <div
                key={name}
                className="flex w-28 flex-col items-center gap-3 rounded-md border border-hairline bg-surface p-4"
              >
                <span className="text-accent">
                  <Icon name={name} />
                </span>
                <span className="type-micro text-quaternary">{name}</span>
              </div>
            ))}
          </div>
        </Block>

        <Block index="15" label="Numerals · pick the figure face">
          <Numerals />
        </Block>

        <Block index="16" label="Claims register · §12 launch gate">
          <p className="type-body mb-6 max-w-[68ch] text-secondary">
            Every statistic on this site imports from <code className="text-accent">content/claims.ts</code>.
            Nothing below may ship to production while it is still pending.
          </p>
          {pending.length === 0 ? (
            <p className="text-sealed">All claims verified.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {pending.map((line) => (
                <li
                  key={line}
                  className="rounded-md border border-hairline bg-surface p-4 text-small text-secondary"
                >
                  <span className="text-leak">PENDING</span> · {line}
                </li>
              ))}
            </ul>
          )}
        </Block>
      </div>
    </PageFrame>
  );
}
