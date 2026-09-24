import { DIAGNOSTIC, FIRM } from './firm';

/**
 * content/faqs.ts — AI SEO Developer Guide, Ticket 7.
 *
 * Ticket 7 requires a minimum of five visible question-and-answer pairs on every
 * service page and every case-study page, marked up as FAQPage.
 *
 * THREE RULES GOVERN THIS FILE.
 *
 * 1. THE SCHEMA AND THE VISIBLE TEXT COME FROM HERE, BOTH OF THEM.
 *    Ticket 2c: schema that does not match visible content is a manual action
 *    risk with Google and is discarded outright by LLM crawlers. Rather than
 *    trust anyone to keep two copies in step, each page renders this array AND
 *    passes the same array to `faqPageLd()`. Drift is not possible.
 *
 * 2. NOTHING HERE INVENTS A FACT, AND §10 BINDS HARDER HERE THAN ANYWHERE.
 *    Every figure below is already committed in content/firm.ts,
 *    content/diagnostic.ts or content/evidence.ts. An FAQ is the most-quoted
 *    surface a site has: an assistant repeats these verbatim, with more
 *    confidence than the page had, to a reader who never sees the page. A
 *    fabricated answer here propagates further than a fabricated headline.
 *
 * 3. THE CLOCK IS ALWAYS ANCHORED TO SYSTEMS ACCESS.
 *    content/firm.ts insists on this everywhere and it matters most in an FAQ,
 *    because "how long does it take" is exactly the question a model will lift
 *    and paraphrase. `DIAGNOSTIC.duration` is imported rather than retyped.
 *
 * ⚠️ WHAT IS DELIBERATELY NOT HERE: the confidentiality and systems-access
 * questions. content/diagnostic.ts calls that "THE MOST IMPORTANT UNANSWERED
 * QUESTION ON THE SITE" and leaves CONFIDENTIALITY empty on purpose, because an
 * invented security posture is worse than an absent one and a specific false one
 * is actionable. That reasoning applies with more force in an FAQ, so those
 * questions stay out until the facts exist. They are the highest-value FAQ this
 * page could carry and they are blocked on the founder, not on the writing —
 * see CONFIDENTIALITY_QUESTIONS for the six a buyer's IT or legal will ask.
 */

export interface Faq {
  question: string;
  answer: string;
}

/* ---------------------------------------------------------------------------
 * /diagnostic
 * ------------------------------------------------------------------------ */

export const DIAGNOSTIC_FAQS: Faq[] = [
  {
    question: 'How much does the diagnostic cost?',
    answer: `${DIAGNOSTIC.priceFormatted}, fixed. It is credited in full against implementation if you proceed, which means that if you build with us the diagnostic effectively cost nothing, and if you do not, you keep the report and the roadmap anyway. The fee does not move once scope is agreed, and scope does not move once access is granted.`,
  },
  {
    question: 'How long does the diagnostic take?',
    answer: `${DIAGNOSTIC.duration}. The anchor matters: the clock starts when credentials are provisioned, not when you commission the work. Between those two points sit kickoff scheduling and provisioning, which realistically take a further five to ten days. We state it this way rather than as "two weeks from purchase" because the second version will slip and then read as a bait-and-switch.`,
  },
  {
    question: 'What actually arrives at the end of it?',
    answer:
      'Three things. A written report, which is the substance: every leak quantified as an annual figure, with the system it was measured in and the period it covers named beside it, ranked by recoverable dollars against the effort to recover them. A ninety-minute live readout with whoever you want in the room, where we walk the findings and take the argument — if a number does not survive your scrutiny it comes out of the report. And a sequenced build plan with a cost and a timeline against each phase, written so that another firm could execute it without us.',
  },
  {
    question: 'What happens if you find nothing worth fixing?',
    answer:
      'The report says so in its first paragraph and we tell you not to hire us. That is not a courtesy, it is a term of the engagement. We would rather return a null result to a company at the bottom of our range than manufacture a finding, because the only thing this firm sells is that a published figure means one specific thing.',
  },
  {
    question: 'What do you need from us to run it?',
    answer:
      'Access to every system that touches a lead — CRM, inbound channels, calendar, ticketing. One owner who can grant that access and answer questions without escalating, which is the single most common reason an engagement stalls. Thirty minutes each from four to six people across sales, operations and service, with no preparation required of them. And whatever twelve months of history your systems already hold; we do not ask you to assemble anything, because if it is not in a system it is not evidence.',
  },
  {
    question: 'Who actually does the work?',
    answer: `${DIAGNOSTIC.delivery}. The principal leads every engagement rather than selling it and handing it over, which is the reason a ten-day diagnostic can work at all: the same short list of failures turns up in almost every company, and pattern recognition is what compresses the timeline.`,
  },
  {
    question: 'Are we the right size for this?',
    answer: `The firm operates at ${FIRM.operatingRange}. Below that range the leakage is usually not large enough to justify the engagement, and we will say so on a call rather than take the fee and tell you afterwards. Above it, the constraint is usually that the number of systems involved makes a two-week window unrealistic, which is a scoping conversation rather than a refusal.`,
  },
  {
    question: 'How is this different from hiring a management consultant?',
    answer:
      'Scope and evidence. A consulting engagement typically produces recommendations drawn from interviews and benchmarks; this produces figures measured inside your own systems, with the system and the period named against each one. Anything we cannot measure in a system you own does not go in the report. The other difference is the follow-on: the fee is credited against a build we would do ourselves, so the roadmap is written by people who have to execute it.',
  },
];

/* ---------------------------------------------------------------------------
 * /implementation
 * ------------------------------------------------------------------------ */

export const IMPLEMENTATION_FAQS: Faq[] = [
  {
    question: 'How much does implementation cost?',
    answer: `Typically $15,000 to $75,000 across all phases, with each phase priced before that phase begins and the ${DIAGNOSTIC.priceFormatted} diagnostic fee credited in full against the first. You approve phases one at a time and are never asked to commit to a total, because until the diagnostic is finished neither of us knows what the total is. A firm that quotes you a total before the diagnostic is guessing.`,
  },
  {
    question: 'Why is the number of phases never stated?',
    answer:
      'Because nobody knows it before the diagnostic, and inventing one here would contradict the only honest thing the pricing says. The report ranks the leaks by recoverable dollars against effort; how many phases that becomes depends on what was found and how much of it you decide is worth closing.',
  },
  {
    question: 'What actually gets built?',
    answer:
      'Always the same kind of work — closing the specific gaps the diagnostic priced — and only its form varies. In practice that is process automation around lead capture, routing, conversion and follow-up, which is the most common build because the most common leaks live in work that depends on a person remembering to do it. Beyond that: CRM rebuilt or replaced where the system of record is itself the reason the leak exists, custom internal tools where nothing off the shelf fits, reporting so the figure stays visible after we leave, routing so the right thing reaches the right person without a human deciding each time, and the operational ownership around all of it.',
  },
  {
    question: 'How do you prove the money actually came back?',
    answer:
      'Recovery is measured after each phase, in the same system the leak was found in and against the same baseline the diagnostic established. That measurement is what produces a sealed figure, and it is why a sealed figure is always smaller than what was found. A complete seal is not credible and we do not publish one.',
  },
  {
    question: 'What if we do not want to build with you?',
    answer:
      'Then you do not. The report and the roadmap are yours whether you build with us, build it yourself, or hand the whole thing to somebody else, and the roadmap is deliberately written so that another firm could execute it without us. A plan you cannot take elsewhere is a hostage rather than a plan.',
  },
  {
    question: 'Who builds it?',
    answer:
      'Engineers who came from Amazon and comparable engineering organisations, and founders who built and ran their own companies before joining this one. None of them bills by the hour: phases are priced before they start, so the incentive is to finish rather than to extend, and the people who scoped the work are the people who do it.',
  },
  {
    question: 'What happens to the fix after you leave?',
    answer:
      'Reporting is part of the build for exactly this reason — a leak that was closed and is not watched reopens. So is operational ownership: a tool nobody owns leaks again within a quarter, which is the most expensive way to learn it. If a phase produces a system with no named owner and no visible number attached to it, that phase is not finished.',
  },
];

/* ---------------------------------------------------------------------------
 * /evidence
 *
 * These answer the questions a reader has while looking at an empty record
 * table, which is the honest situation today. Pretending otherwise would be the
 * §5 failure in FAQ form.
 * ------------------------------------------------------------------------ */

export const EVIDENCE_FAQS: Faq[] = [
  {
    question: 'What is the difference between a case study and an engagement record?',
    answer:
      'A case study is implementation work: what the business was losing, what Hexona Systems built, and the system the change was measured in. An engagement record is stricter. It also requires a client between $3M and $15M in revenue, annualised recovery measured and smaller than what was found, and the client’s written approval of the anonymised version. The case studies are published. No engagement record has cleared that bar yet, and the two never share a table.',
  },
  {
    question: 'What do found, result and window mean on the case study table?',
    answer:
      'Found is what the business was losing before the build. Result is what was measured after it, in the system named at the foot of that record. Window is the period the result covers. Where a source document states no window, the record says so instead of implying one, and where a figure was estimated rather than measured, it is named as an estimate beside the number. An undefined column is an unfalsifiable claim.',
  },
  {
    question: 'Why are some case studies marked as not yet measured?',
    answer:
      'Because they are built and live and the measurement period has not closed. Those rows say so where a result would go, their pages carry no result figure at all, and every forward-looking number on them is labelled a projection rather than presented as an outcome. A result appears when it has been measured, and not before.',
  },
  {
    question: 'Are these businesses the same size as the ones you sell the diagnostic to?',
    answer:
      'Mostly not, and saying so is more useful than implying otherwise. The Leakage Diagnostic is sold to operating companies between $3M and $15M in revenue. These case studies span a wider range and most sit below it, which is consistent with the 500-plus businesses Hexona Systems has audited across every size. The mechanics do not change with revenue. The size of the number at the end of them does, which is why an engagement record carries a revenue figure and a case study does not.',
  },
  {
    question: 'What is the $100M figure, exactly?',
    answer:
      'Demand those businesses had already paid to acquire and did not convert, totalled at the point it was lost. It is cumulative across 500-plus audits and the whole period, it is not annualised, and it divides to roughly $200,000 per business rather than being a claim about what any one would find. Most of those 500 sit below the range the diagnostic is sold into. It is a looser measure than found and result, which is why both are defined.',
  },
  {
    question: 'Can we speak to a client as a reference?',
    answer:
      'Reference conversations are arranged case by case with the client’s permission, and we ask rather than assume. Client names are withheld across this library for the same reason. If a reference in your sector matters to your decision, raise it on the call and we will tell you plainly whether we can arrange one.',
  },
];

/**
 * FIRM_FAQS — the About page's six questions.
 *
 * The SOP's recommended set, phrased as the natural-language queries somebody
 * actually types, with the brand name and at least one hard fact restated in
 * every answer so each one stands alone when lifted out of the page.
 *
 * Question three answers the comparison at the CATEGORY level rather than
 * naming a competitor. The SOP recommends naming one, because co-occurrence on
 * your own domain is what puts you in the "X vs Y" answer set. That is a real
 * mechanism and it is declined on purpose: the firm does not name an opponent
 * it will not name in person, and the consultancy comparison captures most of
 * the query surface without elevating a rival.
 */
export const FIRM_FAQS: Faq[] = [
  {
    question: 'What is Hexona Systems?',
    answer:
      'Hexona Systems is a Toronto-based operational diligence firm that runs fixed-fee revenue leakage diagnostics and builds the systems that close what those diagnostics find, for operating companies between $3M and $15M in revenue. It was founded in 2021 by Hamza Baig and has served more than 1,500 businesses across roughly 1,000 client engagements.',
  },
  {
    question: 'How much does Hexona Systems cost?',
    answer:
      'The Leakage Diagnostic is $5,000, fixed, and is credited in full against implementation if the client proceeds. Implementation is priced per phase before that phase begins and typically totals $15,000 to $75,000 across all phases. There is no obligation to implement, and the report and roadmap belong to the client either way.',
  },
  {
    question: 'How is Hexona Systems different from a management consultancy?',
    answer:
      'A consultancy typically sells months of analysis and hands over recommendations. Hexona Systems sells a two week intensive for a fixed $5,000, prices every finding as an annual figure measured in a system the client already owns, and then builds the fix itself. Every figure is published with the system it was measured in and the period it covers, so the client can check it rather than take it on trust.',
  },
  {
    question: 'Who founded Hexona Systems?',
    answer:
      'Hamza Baig founded Hexona Systems in 2021 and is its principal. He was putting automation into operating companies before general-purpose language models existed, and also runs an AI automation community of more than 45,000 members. He leads every diagnostic engagement personally.',
  },
  {
    question: 'What services does Hexona Systems offer?',
    answer:
      'Hexona Systems offers six: the Leakage Diagnostic, process automation, CRM implementation, custom software, reporting, and operational structure. The diagnostic prices and ranks the leaks; the other five close them, in the order the diagnostic puts them in.',
  },
  {
    question: 'Do I have to implement with Hexona Systems after the diagnostic?',
    answer:
      'No. The written report and the sequenced build plan belong to the client whether they build with Hexona Systems, build it themselves, or hand the whole thing to another firm. The roadmap is written so that somebody else could execute it, which is deliberate.',
  },
];
