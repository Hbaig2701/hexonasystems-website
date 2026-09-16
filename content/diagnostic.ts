import { DIAGNOSTIC, FIRM } from './firm';

/**
 * content/diagnostic.ts — everything /diagnostic states.
 *
 * ⚠️ EVERY CTA ON THE SITE LANDS ON THAT PAGE. Thirteen links point at it, so
 * it has to close on its own rather than assume the visitor read the homepage.
 * Facts already committed elsewhere are imported or restated verbatim here and
 * MUST NOT drift: the fee, the credit, and above all the clock, which reads
 * ten business days FROM SYSTEMS ACCESS everywhere it appears.
 */

/* --------------------------------------------------------------------------
   WHAT ARRIVES
   -------------------------------------------------------------------------- */

export const DELIVERABLES = [
  {
    term: 'The report',
    detail:
      'Written, and the substance of the engagement. Every leak found is quantified as an annual figure, with the system it was measured in and the period it covers named beside it. Ranked by recoverable dollars against the effort to recover them, so the order to work in is the order it is written in.',
  },
  {
    term: 'The readout',
    detail:
      'Ninety minutes, live, with whoever you want in the room. We walk the findings and take the argument. If a number does not survive your scrutiny it comes out of the report.',
  },
  {
    term: 'The roadmap',
    detail:
      'A sequenced build plan with a cost and a timeline against each phase. It is written so that you can hand it to somebody else and they can execute it. That is deliberate.',
  },
];

/* --------------------------------------------------------------------------
   HOW IT RUNS

   Sequence, not a schedule. The order is inherent to the work and can be
   stated with confidence; a day-by-day timetable would be a commitment nobody
   has agreed to, and the first time it slipped it would read as the same
   bait-and-switch the §4 clock warning exists to prevent.
   -------------------------------------------------------------------------- */

export const SEQUENCE = [
  {
    step: 'Access',
    detail:
      'You provision credentials and the clock starts. Not before: between commissioning and access sit kickoff scheduling and provisioning, which realistically take a further five to ten days.',
  },
  {
    step: 'Instrumentation',
    detail:
      'We trace every path a lead can take through your systems and find where each one stops. Most of the work happens here and most of it is not visible to you.',
  },
  {
    step: 'Interviews',
    detail:
      'Four to six conversations, forty-five minutes each, across sales, operations and service. We are looking for the gap between what the system records and what people actually do.',
  },
  {
    step: 'Quantification',
    detail:
      'Each leak is priced against your own numbers, annualised, and ranked. Anything we cannot measure in a system you own does not go in the report.',
  },
  {
    step: 'Readout',
    detail:
      'The report lands, then the ninety minutes. Ten business days from access, end to end.',
  },
];

/* --------------------------------------------------------------------------
   WHAT IS REQUIRED OF YOU

   Stated in full so a buyer can judge feasibility BEFORE paying rather than
   discover it at kickoff. A diagnostic that stalls because nobody could grant
   access is worse for the firm than one that was never commissioned.
   -------------------------------------------------------------------------- */

export const REQUIREMENTS = [
  {
    term: 'Systems access',
    detail: 'CRM, inbound channels, calendar, ticketing, and any other system that touches a lead.',
  },
  {
    term: 'An owner',
    detail:
      'One person who can grant that access and answer questions without escalating. This is the single most common reason an engagement stalls.',
  },
  {
    term: 'Time from your people',
    detail: 'Four to six people for forty-five minutes each. No preparation required of them.',
  },
  {
    term: 'Twelve months of history',
    detail:
      'Whatever your systems already hold. We do not ask you to assemble anything; if it is not in a system, it is not evidence.',
  },
];

/* --------------------------------------------------------------------------
   TERMS
   -------------------------------------------------------------------------- */

export const TERMS = [
  { term: 'Fee', value: `${DIAGNOSTIC.priceFormatted}, fixed` },
  { term: 'Credit', value: 'Credited in full against implementation, if you proceed' },
  { term: 'Duration', value: DIAGNOSTIC.duration },
  { term: 'Delivered by', value: DIAGNOSTIC.delivery },
  { term: 'Afterward', value: 'No obligation. The report is yours either way' },
  {
    term: 'If there is nothing to find',
    value: 'The report says so in its first paragraph and we tell you not to hire us',
  },
];

/* --------------------------------------------------------------------------
   CONFIDENTIALITY AND ACCESS

   ⚠️ THE MOST IMPORTANT UNANSWERED QUESTION ON THE SITE, AND IT IS EMPTY.
   The transaction is not really $5,000; it is handing a firm you have not met
   the keys to the system your revenue runs through. An operating partner at a
   $40M company will not clear that internally on the strength of good copy
   about the report, and no other section compensates for this one missing.
   §5's gate applies for the same reason it applies to engagement records: an
   invented security posture is worse than an absent one, and unlike a vague
   claim, a specific false one is actionable.
   Fill every field and the section appears. Until then it renders nothing to
   visitors and nags in development.
   -------------------------------------------------------------------------- */

export interface ConfidentialityTerm {
  term: string;
  detail: string;
}

export const CONFIDENTIALITY: ConfidentialityTerm[] = [];

export const hasConfidentiality = () => CONFIDENTIALITY.length > 0;

/** What the section needs, as the questions a buyer's IT or legal will ask. */
export const CONFIDENTIALITY_QUESTIONS = [
  'Is there an NDA, is it mutual, and who signs it?',
  'Is access read-only wherever the system supports it?',
  'Who inside the firm sees the data, and is it only the engagement team?',
  'What happens to the credentials at readout: revoked by you, or returned?',
  'Is anything retained afterwards, and if so what, where, and for how long?',
  'Are subcontractors or offshore staff involved at any point?',
];

/* --------------------------------------------------------------------------
   TALKING FIRST

   The "Discuss it first" link has existed in four places since launch and has
   never had a destination. Until a booking link exists it resolves to email,
   which is worse than a calendar and far better than an anchor to nothing.
   -------------------------------------------------------------------------- */

export const DISCUSS = {
  /** ⚠️ [ASSET NEEDED] A scheduling URL. Falls back to email while empty. */
  bookingUrl: '',
  email: FIRM.email,
  body: 'Thirty minutes, with the principal, and no deck. Bring the part of the operation you already suspect. If it is not worth commissioning we will say so on the call rather than in a report you paid for.',
};
