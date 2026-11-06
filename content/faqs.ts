
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
 * ⚠️ STILL MISSING, BUT NO LONGER BLOCKED: the confidentiality and
 * systems-access questions.
 *
 * These were left out because CONFIDENTIALITY in content/diagnostic.ts was
 * empty on purpose — an invented security posture is worse than an absent one,
 * and a specific false one is actionable. That reasoning applied with more
 * force in an FAQ, which is the surface an assistant is most likely to quote
 * verbatim to someone who never visits the page.
 *
 * THAT CHANGED ON 2026-09-24. Confidentiality terms are now published and
 * live on /diagnostic. The facts exist, so the questions can be answered here,
 * and they remain the highest-value FAQ this page could carry: the real
 * transaction is not the fee, it is handing over credentials to the system a
 * company's revenue runs through, and a buyer's legal function asks before
 * anyone signs anything.
 *
 * Whoever writes them: answer from CONFIDENTIALITY, word for word. Do not
 * paraphrase a commitment into something broader than what the firm actually
 * agreed to, and do not answer a question the terms do not cover — notably
 * data residency and sub-processors, which CONFIDENTIALITY_QUESTIONS asks and
 * the published terms still do not address.
 */

export interface Faq {
  question: string;
  answer: string;
}

/* ---------------------------------------------------------------------------
 * /diagnostic
 * ------------------------------------------------------------------------ */


/* ---------------------------------------------------------------------------
 * /implementation
 * ------------------------------------------------------------------------ */


/* ---------------------------------------------------------------------------
 * /evidence
 *
 * These answer the questions a reader has while looking at an empty record
 * table, which is the honest situation today. Pretending otherwise would be the
 * §5 failure in FAQ form.
 * ------------------------------------------------------------------------ */

export const EVIDENCE_FAQS: Faq[] = [
  {
    question: 'How were these results measured?',
    answer:
      'Each figure was measured in the client’s own systems, such as their CRM, booking platform or phone logs, against the period before the build. Every case study names the system it was measured in, and where a figure was the client’s own estimate rather than a measurement, the page says so beside the number.',
  },
  {
    question: 'Why do some case studies say final results are in progress?',
    answer:
      'Because the system is built and live but the measurement period has not closed. Those pages show what the business was losing before the build and carry no result figure. Any forward-looking number on them is labelled a projection, never presented as an outcome.',
  },
  {
    question: 'Why are the client names withheld?',
    answer:
      'Most owners do not want competitors to see their numbers, so case studies are anonymised by default and name the sector instead. Where a client agrees in writing to be named, the page names them.',
  },
  {
    question: 'Will I get the same results?',
    answer:
      'Not necessarily, and nobody can honestly promise that. The results depend on how much money your business is losing in the places an AI employee fixes. That is what the free consult is for: we look at your numbers first and tell you what is realistic before you spend anything.',
  },
  {
    question: 'Can we speak to a client as a reference?',
    answer:
      'Reference conversations are arranged case by case with the client’s permission. If a reference in your industry matters to your decision, ask on the consult and we will tell you plainly whether we can arrange one.',
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
      'Hexona Systems is a Toronto-based AI implementation firm that builds and runs AI employees for service businesses across the United States and Canada. It was founded in 2022 by Hamza Baig, has served more than 1,500 businesses, and more than 1,000 agencies run on its AI and systems.',
  },
  {
    question: 'What is an AI employee?',
    answer:
      'An AI employee is software that does one job in a business end to end, such as answering calls, following up leads, scheduling crews or chasing invoices. Hexona Systems builds each one into the tools a business already uses, runs it, and reports the numbers it moved.',
  },
  {
    question: 'How much does Hexona Systems cost?',
    answer:
      'Every engagement starts with a free one-hour consult. After it, Hexona Systems gives a fixed scope and a fixed price for the AI employees that would make the biggest difference, before any work starts. There is no obligation to go ahead.',
  },
  {
    question: 'How is Hexona Systems different from an AI receptionist app or an automation agency?',
    answer:
      'An app gives you a tool and leaves the setup to you, and most agencies build what you ask for. Hexona Systems only builds AI employees that increase what a business is worth, connects them to the systems the business already runs, operates them, and reports the before-and-after numbers every month.',
  },
  {
    question: 'Who founded Hexona Systems?',
    answer:
      'Hamza Baig founded Hexona Systems in 2022 and leads it. He was putting automation into operating businesses before general-purpose language models existed, and he also runs an AI automation community of more than 45,000 members.',
  },
  {
    question: 'Which industries does Hexona Systems work with?',
    answer:
      'Mainly service businesses: construction and contractors, plumbing, HVAC and home services, med spas and clinics, property management, automotive and hospitality. The same problems, such as missed calls, slow follow-up and admin overload, show up across all of them.',
  },
];
