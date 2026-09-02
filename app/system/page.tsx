import type { Metadata } from 'next';
import { PageFrame } from '@/components/layout/PageFrame';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { DataPanel } from '@/components/ui/DataPanel';
import { AssetPlaceholder } from '@/components/ui/AssetPlaceholder';
import { ArchitectureDiagram } from '@/components/system/ArchitectureDiagram';
import { ImplementationTimeline } from '@/components/system/ImplementationTimeline';
import { INTEGRATIONS } from '@/content/claims';

/**
 * /system — THE HEXONA ENGINE. §7.2.
 * For the buyer who is convinced by the homepage and now needs to understand
 * what they'd actually be buying.
 */

export const metadata: Metadata = {
  title: 'The Hexona Engine',
  description:
    'One platform running the four functions that currently live in twelve tools. The architecture, the capabilities, the integrations, and a week-by-week implementation timeline.',
  alternates: { canonical: '/system' },
};

const DEEP_DIVES = [
  {
    id: 'embedded-ai',
    index: '02',
    title: 'Embedded Artificial Intelligence',
    what: 'Market and proprietary LLMs deployed inside your operations, not beside them. Appointment-setting agents that answer in seconds, generative campaign systems, and support that resolves instead of deflecting.',
    replaces:
      'Manual inbox triage, callback lists, after-hours voicemail, first-tier support queues, and the "someone will get back to you" reply.',
    example:
      'An inbound inquiry at 9:40pm is answered in under two minutes, qualified against your own criteria, and booked into the calendar before anyone opens a laptop.',
    result: 'Childcare operator: 24–48 hour response time → 2 minutes.',
  },
  {
    id: 'integrated-stack',
    index: '03',
    title: 'Integrated Tech Stack',
    what: 'One platform absorbing the functions currently spread across a dozen subscriptions. Fewer logins, fewer handoffs, one source of truth.',
    replaces:
      'Overlapping CRM, scheduling, email, SMS, pipeline, reporting and forms tools, plus the connectors holding them together.',
    example:
      'A lead, its source, every touch, the booked call and the resulting invoice are one record, not five records that have to be reconciled.',
    result: 'A software bill that goes down instead of up.',
  },
  {
    id: 'bespoke-development',
    index: '04',
    title: 'Bespoke Development',
    what: 'Nothing here is a template. Your operation gets mapped, the gaps get identified, and what’s built is built for how you actually work.',
    replaces:
      'Off-the-shelf workflows that assume a business you don’t run, and the workarounds your team invented to survive them.',
    example:
      'Routing rules that follow your actual territory, capacity and escalation logic, not a vendor’s idea of a sales team.',
    result: 'Implemented without downtime.',
  },
  {
    id: 'consulting',
    index: '05',
    title: 'Expert Consulting',
    what: 'Over 40 years of combined automation and software experience, applied before a line of code is written.',
    replaces:
      'The discovery call that goes straight to a tool recommendation, and the six-month build that automates the wrong thing well.',
    example:
      'Mapping where revenue moves and where it stalls, then pricing each gap, so priorities get set by dollars rather than by opinion.',
    result: 'The build is the easy part. Knowing what to build is the work.',
  },
];

export default function SystemPage() {
  return (
    <PageFrame>
      <section className="relative overflow-hidden pb-16 pt-24 md:pt-32">
        <div className="glow-hero" aria-hidden="true" />
        <div className="page-shell relative">
          <SectionHeading
            eyebrow="The engine"
            as="h1"
            size="display-1"
            sub="One platform, running the four functions that currently live in twelve tools."
          >
            The engine underneath
          </SectionHeading>
        </div>
      </section>

      {/* --- The architecture diagram — the single most important element on
              this page (§7.2 item 2). SVG, not an image. --- */}
      <section className="section-pad pt-0">
        <div className="page-shell">
          <SectionHeading
            eyebrow="The architecture"
            index="01"
            sub="Five layers. Every one of them already exists in your business. The difference is whether they were designed together or accumulated one subscription at a time."
            className="mb-16"
          >
            What you would actually be buying
          </SectionHeading>
          <ArchitectureDiagram />
        </div>
      </section>

      {/* --- Four capability deep-dives, one full section each --- */}
      {DEEP_DIVES.map((dive) => (
        <section key={dive.id} id={dive.id} className="section-pad scroll-mt-24 pt-0">
          <div className="page-shell">
            <SectionHeading
              eyebrow="Capability"
              index={dive.index}
              size="display-3"
              className="mb-16"
            >
              {dive.title}
            </SectionHeading>
            <div className="grid-12 gap-y-10">
              <div className="[grid-column:1/7]">
                <Reveal>
                  <p className="type-body max-w-[54ch] text-secondary">{dive.what}</p>
                </Reveal>
              </div>
              <div className="flex flex-col gap-5 [grid-column:8/13]">
                <Reveal index={1}>
                  <DataPanel header="What it replaces">
                    <p className="text-small text-secondary">{dive.replaces}</p>
                  </DataPanel>
                </Reveal>
                <Reveal index={2}>
                  <DataPanel header="In practice">
                    <p className="text-small text-secondary">{dive.example}</p>
                  </DataPanel>
                </Reveal>
                <Reveal index={3}>
                  <DataPanel header="Result">
                    <p className="text-small text-primary">{dive.result}</p>
                  </DataPanel>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* --- Integrations --- */}
      <section className="section-pad pt-0">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Integrations"
            index="06"
            sub="Hexona sits on top of what exists and bridges it through Make, Zapier and direct API integration. Most clients consolidate over time because they want to, not because they were forced to on day one."
            className="mb-16"
          >
            Runs on top of what you already have
          </SectionHeading>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {INTEGRATIONS.map((integration, i) => (
              <Reveal key={integration.name} index={i}>
                <div className="rounded-md border border-hairline bg-surface px-5 py-4">
                  <p className="type-label text-secondary">{integration.name}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <AssetPlaceholder
              label="Authoritative integration list"
              detail="§7.2 item 4 · the complete, real list of everything Hexona connects to. Made searchable and filterable once it exceeds 20 entries. §11 item 5: display permission and the exact relationship (integration / partner / customer) must be confirmed for each."
            />
          </Reveal>
        </div>
      </section>

      {/* --- Security & reliability --- */}
      <section className="section-pad pt-0">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Security"
            index="07"
            sub="Where your data lives, who can reach it, and what happens when something fails."
            className="mb-16"
          >
            Security &amp; reliability
          </SectionHeading>
          <Reveal>
            <AssetPlaceholder
              label="Security and data-handling summary"
              detail="§7.2 item 5 · data handling, uptime, and where data lives. Enterprise-adjacent buyers look for this and its absence is disqualifying. This section ships with real content or it does not ship."
            />
          </Reveal>
        </div>
      </section>

      {/* --- Implementation timeline — removes the biggest unstated fear --- */}
      <section className="section-pad pt-0">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Implementation"
            index="08"
            sub="The fear nobody says out loud is the open-ended project. Here is what each week actually contains."
            className="mb-16"
          >
            Six to ten weeks, and you can see every one of them
          </SectionHeading>
          <ImplementationTimeline />
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="page-shell">
          <Reveal>
            <h2 className="type-display-2 mb-8 max-w-[20ch]">
              Start with what it&apos;s costing you.
            </h2>
            <div className="flex flex-wrap gap-4">
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
  );
}
