import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Accordion } from '@/components/ui/Accordion';

/**
 * SECTION 11 — OBJECTIONS. §7.1 S11.
 *
 * The last answer is a DELIBERATE DISQUALIFIER. Including one is a strong trust
 * signal and it improves lead quality.
 *
 * Built on native <details>/<summary> so every answer is readable with JS off
 * (§14) — and so this section is also the FAQPage JSON-LD source (§10.5).
 */

export const OBJECTIONS = [
  {
    question: 'How long until this is running?',
    answer:
      'Scope determines it, but a defined implementation typically runs six to ten weeks. A recent Ontario manufacturing coordination build was eight. If someone quotes you two weeks, they’re selling you a template.',
  },
  {
    question: 'We already use HubSpot / Salesforce / a dozen other tools. Do we throw them out?',
    answer:
      'No. Hexona sits on top of what exists and bridges it through Make, Zapier and direct API integration. Over time most clients consolidate because they want to, not because they were forced to on day one.',
  },
  {
    question: 'What does it cost?',
    answer:
      'This is a bespoke implementation, scoped and priced per engagement. There is no tier list and no self-serve plan, because there is no version of this that you configure yourself. We won’t publish a number that would be wrong for most of the businesses reading it, and the model on this page will tell you what the problem is worth solving before you ever discuss what solving it costs.',
  },
  {
    question: 'What if AI just replaces our team?',
    answer:
      'The roles automation displaces are the ones that exist to move information between systems that don’t talk to each other. The roles it doesn’t touch are the ones that require judgment. Most companies find the second group gets more valuable, not less, and we’d rather plan that with you deliberately than have you discover it reactively.',
  },
  {
    question: 'Why should we trust the number your audit produced?',
    answer:
      'Because we show the arithmetic. Every assumption in the model is visible and adjustable. If you think a figure is wrong, change it, and the output changes with it. It’s a model, not a magic trick.',
  },
  {
    question: 'Are we big enough for this?',
    answer:
      'We work with operations already past $10M. Below that the upside rarely justifies an implementation at this level, and we will tell you so on the call rather than sell you something you don’t need yet. That is not a sales tactic. A build priced for an eight-figure operation does not pay back on a seven-figure one.',
  },
];

export function Objections() {
  return (
    <section className="section-pad">
      <div className="page-shell">
        <SectionHeading
          eyebrow="Straight answers"
          index="10"
          sub="Including the one that disqualifies some of the people reading it."
          className="mb-16"
        >
          The questions you were going to ask anyway
        </SectionHeading>

        <div className="grid-12">
          <div className="[grid-column:2/12]">
            <Reveal>
              <Accordion items={OBJECTIONS} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
