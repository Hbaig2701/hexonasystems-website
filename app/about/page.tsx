import type { Metadata } from 'next';
import { PageFrame } from '@/components/layout/PageFrame';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { AssetPlaceholder } from '@/components/ui/AssetPlaceholder';
import { HeadlineStats } from '@/components/sections/HeadlineStats';
import { Team } from '@/components/sections/Team';
import { Values } from '@/components/sections/Values';
import { Comparison } from '@/components/sections/Comparison';
import { Record } from '@/components/sections/Record';
import { JsonLd, organizationLd } from '@/lib/jsonld';
import { COMPANY, CONTINENTS, OPERATING_SINCE } from '@/content/claims';

/**
 * /about — §7.4, restructured to the reference design's About page:
 *
 *   A Tale of Inevitability      → hero
 *   How Hexona Came to Be        → origin + three headline stats
 *   The Architects Behind…       → team grid
 *   Objective Dominance          → values
 *   What makes us stand out      → comparison table
 *   The Record                   → awards ledger
 *   The company, factually       → diligence block
 */

export const metadata: Metadata = {
  title: 'About',
  description:
    'Hexona Systems was built by an operator who spent years watching capable companies lose money not to competitors, but to their own seams. The origin, the team, the beliefs, and the record.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={organizationLd()} />

      <PageFrame>
        {/* --- Hero --- */}
        <section className="relative overflow-hidden pb-24 pt-24 md:pt-32">
          <div className="glow-hero" aria-hidden="true" />
          <div className="page-shell relative">
            <SectionHeading eyebrow="About us" as="h1" size="display-1" sub="Change invites innovation, which invites change.">
              A Tale of Inevitability
            </SectionHeading>
          </div>
        </section>

        {/* --- How Hexona Came to Be --- */}
        <section className="section-pad pt-8">
          <div className="page-shell">
            <SectionHeading
              eyebrow="Who we are"
              index="01"
              sub={`Hexona is a modern AI automation company. Hamza had been automating for local businesses since ${OPERATING_SINCE.value}, before ChatGPT made it a category.`}
              className="mb-16"
            >
              How Hexona Came to Be
            </SectionHeading>

            <HeadlineStats />
          </div>
        </section>

        {/* --- The origin. Light editorial surface (§7.4 item 2). --- */}
        <section className="bg-light-base py-24 md:py-36">
          <div className="page-shell">
            <SectionHeading
              eyebrow="The origin"
              index="02"
              tone="light"
              sub="Three countries before university, one email in 2022, and a pattern that became impossible to unsee."
              className="mb-20"
            >
              An operator who learned to build
            </SectionHeading>

            <div className="grid-12 gap-y-12">
              <div className="[grid-column:1/5]">
                <Reveal>
                  <AssetPlaceholder
                    tone="light"
                    label="Founder portrait"
                    detail="Environmental, high resolution, real workspace, professionally shot. Not a white-background headshot. Not AI-generated. Not stock."
                    className="aspect-[4/5]"
                  />
                </Reveal>
              </div>

              <div className="[grid-column:6/13]">
                <div className="flex flex-col gap-7 text-[1.15rem] leading-[1.65] text-light-secondary">
                  <Reveal>
                    <p className="max-w-[62ch]">
                      Karachi, then Bahrain, then Dubai. Three countries before university, which is
                      its own kind of education. You learn early that the rules of a place are
                      arrangements, not facts, and that arrangements can be redesigned.
                    </p>
                  </Reveal>
                  <Reveal index={1}>
                    <p className="max-w-[62ch]">
                      McGill followed in 2017, self-funded through sales and tutoring. Selling
                      teaches something a degree does not: that most of what looks like a demand
                      problem is a response problem, and that the gap between an inquiry and an
                      answer is where the money actually moves.
                    </p>
                  </Reveal>
                  <Reveal index={2}>
                    <p className="max-w-[62ch]">
                      In 2022 he was laid off by email. The lesson he took from it wasn&apos;t about
                      that job. It was that a system he didn&apos;t control could remove him from it
                      in a single sentence. So he started building systems.
                    </p>
                  </Reveal>
                  <Reveal index={3}>
                    <p className="max-w-[62ch]">
                      He was early to ChatGPT, publishing real business applications while most
                      people were still asking it to write poems. The audience that came from that
                      became one of the largest AI automation communities in the world, and it
                      turned into a second business, teaching people to build what he was building.
                    </p>
                  </Reveal>
                  <Reveal index={4}>
                    <p className="max-w-[62ch]">
                      Hexona came from the same instinct. Years of looking inside companies made one
                      pattern impossible to unsee: capable operations losing money not to
                      competitors, but to their own seams. Nothing was broken. Revenue just quietly
                      stopped arriving.
                    </p>
                  </Reveal>
                  <Reveal index={5}>
                    <p className="max-w-[62ch] text-light-primary">
                      He is not a technologist who found business. He&apos;s an operator who learned
                      to build.
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Team />
        <Values />
        <Comparison />
        <Record id="the-record" index="05" />

        {/* --- The company, factually --- */}
        <section className="section-pad pt-0">
          <div className="page-shell">
            <SectionHeading
              eyebrow="Diligence"
              index="06"
              sub="Buyers checking us out look for this, and it takes twenty lines."
              className="mb-16"
            >
              The company, factually
            </SectionHeading>

            <Reveal>
              <dl className="mx-auto grid max-w-[760px] grid-cols-1 border-t border-hairline sm:grid-cols-2">
                <Fact label="Founded" value={COMPANY.founded} />
                <Fact label="Headquarters" value={COMPANY.address} />
                <Fact label="Continents served" value={CONTINENTS.value} pending />
                <Fact label="Sweet spot" value={COMPANY.sweetSpot} />
                <Fact label="Contact" value={COMPANY.email} />
                <Fact label="Team size" value="ASSET PENDING" pending />
              </dl>
            </Reveal>
          </div>
        </section>

        <section className="pb-8">
          <div className="page-shell text-center">
            <Reveal>
              <h2 className="type-display-2 mx-auto mb-8 max-w-[20ch]">
                See what your seams are costing you.
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="/audit" variant="primary" size="large" arrow>
                  Run the Revenue Leak Audit
                </Button>
                <Button href="/book" variant="secondary" size="large">
                  Book a systems review
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </PageFrame>
    </>
  );
}

function Fact({ label, value, pending }: { label: string; value: string; pending?: boolean }) {
  return (
    <div className="border-b border-hairline py-5 pr-6">
      <dt className="type-micro mb-2 text-quaternary">{label}</dt>
      <dd
        className={
          pending && value === 'ASSET PENDING'
            ? 'type-label text-leak'
            : 'text-small text-primary'
        }
      >
        {value}
        {pending && value !== 'ASSET PENDING' && (
          <span className="type-micro ml-2 text-leak">⚠️ §12</span>
        )}
      </dd>
    </div>
  );
}
