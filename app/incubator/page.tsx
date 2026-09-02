import type { Metadata } from 'next';
import { PageFrame } from '@/components/layout/PageFrame';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DataPanel } from '@/components/ui/DataPanel';
import { AssetPlaceholder } from '@/components/ui/AssetPlaceholder';
import { Icon } from '@/components/ui/Icon';
import { BUILDERS_TRAINED, CONTINENTS, SOCIAL_FOLLOWING } from '@/content/claims';

/**
 * /incubator — THE AUTOMATION INSTITUTE. §7.5.
 *
 * A WARMER, HIGHER-ENERGY VARIANT of the design system — same tokens, but
 * permitted more accent, more density, and social-proof-forward layout. It's a
 * different buyer with a different temperature. It must still be recognisably
 * the same site.
 */

export const metadata: Metadata = {
  title: 'The Automation Institute',
  description:
    'Learn to build the systems businesses can’t operate without. Builders train on the same engine Hexona runs on. Agencies license it. Individuals learn it.',
  alternates: { canonical: '/incubator' },
};

const FOR_YOU = [
  'You want to start or scale an automation agency and would rather learn the engine than rebuild one.',
  'You can sell, or you are willing to learn. The build is teachable; the willingness to pick up the phone is not.',
  'You want a system to deploy on day one rather than a course to finish.',
];

const NOT_FOR_YOU = [
  'You are looking for passive income. This is an operating business and it behaves like one.',
  'You want a certificate rather than clients.',
  'You expect the first sale inside a week. Most take longer, and anyone promising otherwise is selling you the promise.',
];

export default function IncubatorPage() {
  return (
    <PageFrame>
      {/* --- Hero --- */}
      <div className="relative overflow-hidden border-b border-hairline">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 20% 0%, var(--accent-wash), transparent 70%)',
          }}
        />
        <div className="page-shell relative pb-24 pt-24 md:pt-32">
          <SectionHeading
            eyebrow="The Automation Institute"
            as="h1"
            size="display-1"
            sub={`${BUILDERS_TRAINED.value} builders have trained on the Hexona engine. Agencies license it. Individuals learn it.`}
            className="mb-11"
          >
            Learn to build the systems businesses can&apos;t operate without
          </SectionHeading>

          <div className="flex flex-col items-center">
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="#apply" variant="primary" size="large" arrow>
                  Apply to the Institute
                </Button>
                <Button href="#licensing" variant="secondary" size="large">
                  License the engine
                </Button>
              </div>
          </div>
        </div>
      </div>

      {/* --- Live community proof --- */}
      <section id="community" className="scroll-mt-24 border-b border-hairline py-16">
        <div className="page-shell">
          <div className="grid gap-8 sm:grid-cols-3">
            <Stat claim={BUILDERS_TRAINED.value} label="Builders trained" pending />
            <Stat claim={CONTINENTS.value} label="Continents" pending />
            <Stat claim={SOCIAL_FOLLOWING.value} label="Audience across platforms" pending />
          </div>
          <p className="type-micro mt-8 max-w-[62ch] text-quaternary">
            ⚠️ [ASSET NEEDED · §7.5 item 2] Verified current community numbers: active members,
            countries, monthly new builders. Every figure here is locked in{' '}
            <code className="text-accent">content/claims.ts</code> and pending §12 verification.
          </p>
        </div>
      </section>

      {/* --- What you get --- */}
      <section className="section-pad">
        <div className="page-shell">
          <SectionHeading
            eyebrow="What you get"
            index="01"
            sub="The current page lists nothing concrete, which is the single biggest reason it converts poorly. This section must be specific: module by module, deliverable by deliverable."
            className="mb-16"
          >
            Modules, not motivation.
          </SectionHeading>
          <Reveal>
            <AssetPlaceholder
              label="Curriculum modules"
              detail="[ASSET NEEDED · §7.5 item 3, §11 item 10] The actual module list: what each covers, what a builder can do after it, and what they ship. Specificity is the whole conversion mechanism here."
            />
          </Reveal>
        </div>
      </section>

      {/* --- The licensing model --- */}
      <section id="licensing" className="section-pad scroll-mt-24 pt-0">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Licensing"
            index="02"
            sub="A genuine differentiator, and currently invisible on the live site."
            className="mb-16"
          >
            Agencies don&apos;t need to build an engine
          </SectionHeading>
          <div className="grid-12 gap-y-10">
            <div className="[grid-column:1/7]">
              <Reveal>
                <p className="type-body max-w-[54ch] text-secondary">
                  A third-party agency licenses the Hexona engine and deploys it under their own
                  name, for their own clients. The platform, the automations and the AI layer come
                  ready; the relationship and the pricing stay theirs.
                </p>
              </Reveal>
            </div>
            <div className="flex flex-col gap-5 [grid-column:8/13]">
              <Reveal index={1}>
                <DataPanel header="What the licensee gets">
                  <p className="text-small text-secondary">
                    The platform, the automation library, the AI agents, and the implementation
                    playbook that goes with them.
                  </p>
                </DataPanel>
              </Reveal>
              <Reveal index={2}>
                <DataPanel header="What stays theirs">
                  <p className="text-small text-secondary">
                    Their brand, their client relationships, their pricing, their margin.
                  </p>
                </DataPanel>
              </Reveal>
              <Reveal index={3}>
                <DataPanel header="Commercials">
                  <p className="text-small text-leak">
                    ASSET PENDING · licence terms and bands (§11 item 14).
                  </p>
                </DataPanel>
              </Reveal>
            </div>
          </div>
          <Reveal className="mt-8">
            <p className="type-micro max-w-[62ch] text-quaternary">
              This is a genuine differentiator and it is currently invisible on the live site (§7.5
              item 4).
            </p>
          </Reveal>
        </div>
      </section>

      {/* --- Success stories --- */}
      <section className="section-pad pt-0">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Success stories"
            index="03"
            sub="In their own words, as text a search engine and a screen reader can both read."
            className="mb-16"
          >
            Builders who shipped
          </SectionHeading>
          <Reveal>
            <AssetPlaceholder
              label="13 testimonials, transcribed to text"
              detail="[ASSET NEEDED · §7.5 item 5, §11 item 7] The existing 13 testimonial images must exist as real HTML text, with permission to attribute. Keep the screenshot as supporting evidence, but words inside an image are invisible to search engines, to screen readers, and to anyone skimming."
            />
          </Reveal>
        </div>
      </section>

      {/* --- Who this is for / who it isn't --- */}
      <section className="section-pad pt-0">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Fit"
            index="04"
            sub="An explicit disqualifier list raises lead quality and costs nothing but honesty."
            className="mb-16"
          >
            Who this is for, and who it isn&apos;t
          </SectionHeading>
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal>
              <Card className="h-full p-8">
                <p className="type-label mb-6 text-sealed">This is for you if</p>
                <ul className="flex flex-col gap-4">
                  {FOR_YOU.map((line) => (
                    <li key={line} className="text-small flex gap-3 text-secondary">
                      <span className="mt-0.5 shrink-0 text-sealed">
                        <Icon name="check" />
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
            <Reveal index={1}>
              <Card className="h-full p-8">
                <p className="type-label mb-6 text-leak">It isn&apos;t, if</p>
                <ul className="flex flex-col gap-4">
                  {NOT_FOR_YOU.map((line) => (
                    <li key={line} className="text-small flex gap-3 text-secondary">
                      <span className="mt-0.5 shrink-0 text-leak">
                        <Icon name="cross" />
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </div>
          <Reveal className="mt-6">
            <p className="type-micro max-w-[62ch] text-quaternary">
              An explicit disqualifier list raises lead quality and costs nothing but honesty.
            </p>
          </Reveal>
        </div>
      </section>

      {/* --- Pricing / the path to it --- */}
      <section id="apply" className="section-pad scroll-mt-24 pt-0">
        <div className="page-shell">
          <SectionHeading
            eyebrow="The path in"
            index="05"
            sub="Applications open monthly and go through the community."
            className="mb-16"
          >
            How to start
          </SectionHeading>
          <Reveal>
            <AssetPlaceholder
              label="Pricing, or the approved language for declining to publish it"
              detail='[ASSET NEEDED · §7.5 item 7, §11 item 14] Even "applications open monthly, investment discussed on the call" beats silence. Silence reads as expensive and evasive at the same time.'
            />
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="type-display-3 mb-6 max-w-[22ch]">
              Applications go through the community.
            </h2>
            <Button href="/book" variant="primary" size="large" arrow>
              Start an application
            </Button>
            <p className="type-micro mt-4 max-w-[52ch] text-quaternary">
              ⚠️ Point this at the live Skool application URL before launch (§7.5 item 8).
            </p>
          </Reveal>
        </div>
      </section>
    </PageFrame>
  );
}

function Stat({ claim, label, pending }: { claim: string; label: string; pending?: boolean }) {
  return (
    <div>
      <p className="type-figure mb-3 text-[clamp(2.2rem,4vw,3rem)] text-accent">{claim}</p>
      <p className="type-label text-secondary">{label}</p>
      {pending && <p className="type-micro mt-2 text-leak">⚠️ Pending verification · §12</p>}
    </div>
  );
}
