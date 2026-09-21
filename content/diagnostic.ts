import { DIAGNOSTIC, FIRM } from './firm';

/**
 * content/diagnostic.ts — everything /diagnostic states.
 *
 * ⚠️ EVERY CTA ON THE SITE LANDS ON THAT PAGE. Thirteen links point at it, so
 * it has to close on its own rather than assume the visitor read the homepage.
 * Facts already committed elsewhere are imported or restated verbatim here and
 * MUST NOT drift: the fee, the credit, and above all the clock, which reads
 * a two week intensive ANCHORED TO SYSTEMS ACCESS everywhere it appears.
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
      'A sequenced build plan with a cost and a timeline against each phase. We write it so that somebody else could execute it without us, because a roadmap you cannot take elsewhere is a hostage rather than a plan.',
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
      'Four to six conversations, thirty minutes each, across sales, operations and service. We are looking for the gap between what the system records and what people actually do.',
  },
  {
    step: 'Quantification',
    detail:
      'Each leak is priced against your own numbers, annualised, and ranked. Anything we cannot measure in a system you own does not go in the report.',
  },
  {
    step: 'Readout',
    detail:
      'The report lands, then the ninety minutes. Two weeks from access, end to end.',
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
    detail: 'Four to six people for thirty minutes each. No preparation required of them.',
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
  { term: 'Fee', value: DIAGNOSTIC.priceFormatted },
  { term: 'Credit', value: 'Credited in full against implementation, if you proceed' },
  { term: 'Duration', value: DIAGNOSTIC.duration },
  { term: 'Delivered by', value: DIAGNOSTIC.delivery },
  { term: 'Afterward', value: 'You are under no obligation, and the report is yours either way' },
  {
    term: 'If there is nothing to find',
    value: 'The report says so in its first paragraph and we tell you not to hire us',
  },
];

/* --------------------------------------------------------------------------
   AFTER THE DIAGNOSTIC

   The build was load-bearing across the whole site and described nowhere. The
   hero says "seal it", the fee is credited against implementation in eleven
   places, and SEALED is defined as recovery measured AFTER implementation. A
   reader was being asked to buy the first half of a transaction whose second
   half had no stated shape.

   That cost lands on the DIAGNOSTIC, not on the build: a report is only worth
   $5,000 if the follow-on is viable, and "credited against implementation" is
   an empty promise to somebody who cannot tell whether implementation is
   $40,000 or $400,000. Publishing a range is worth more than protecting it.
   -------------------------------------------------------------------------- */

export const IMPLEMENTATION = {
  body: [
    'There is no obligation. The report and the roadmap are yours whether you build with us, build it yourself, or hand the whole thing to somebody else.',
    'If you do proceed, the roadmap prices each phase before that phase begins and the diagnostic fee comes off the first one. You approve phases one at a time and are never asked to commit to a total, because until the diagnostic is finished neither of us knows what the total is.',
    'Recovery is then measured after each phase, in the same system the leak was found in and against the same baseline. That measurement is what produces a sealed figure, and it is why a sealed figure is always smaller than what was found.',
  ],
  terms: [
    { term: 'Pricing', value: 'Fixed price per phase, agreed before the phase begins' },
    { term: 'Typical total', value: '$25,000 to $75,000 across all phases' },
    { term: 'Diagnostic fee', value: 'Credited in full against the first phase' },
    {
      term: 'Commitment',
      value: 'You commit one phase at a time, and never beyond the phase you have approved',
    },
  ],
};

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

/* ==========================================================================
   /implementation — the build.
   ========================================================================= */

/**
 * WHAT GETS BUILT.
 *
 * The founder's own description ended "we'll build whatever needs to get
 * done", which is true and is the weakest possible way to say it. On a site
 * that promises fixed scope in six places, open-endedness reads as a warning
 * rather than as flexibility, and to an operating partner a firm that builds
 * anything is a generalist, which is worth less than a specialist.
 *
 * So the framing is inverted: the work is always the same KIND of work,
 * closing the specific gaps the diagnostic priced, and only its form varies.
 * That is what turns a list of six capabilities into a coherent practice
 * instead of a menu.
 */
export const BUILDS = [
  {
    term: 'Process automation',
    detail:
      'Lead capture, routing, conversion and follow-up. The most common build, because the most common leaks live here: work that depends on a person remembering to do it.',
  },
  {
    term: 'CRM',
    detail:
      'Rebuilt or replaced, where the system of record is itself the reason the leak exists. A CRM nobody trusts gets worked around, and the workarounds are where revenue disappears.',
  },
  {
    term: 'Custom software',
    detail:
      'Dashboards and internal tools, up to enterprise scale, where nothing off the shelf fits the way the business actually runs.',
  },
  {
    term: 'Reporting',
    detail:
      'So the figure the diagnostic produced stays visible after we leave. A leak that was closed and is not watched reopens.',
  },
  {
    term: 'Communication and routing',
    detail:
      'Getting the right thing to the right person without a human deciding each time. Most response-time leakage is a routing problem wearing a staffing problem costume.',
  },
  {
    term: 'Operational structure',
    detail:
      'Ownership and workflow around the systems. A tool nobody owns leaks again within a quarter, which is the most expensive way to learn this.',
  },
];

/**
 * WHO BUILDS IT.
 *
 * ⚠️ TWO THINGS FROM THE FOUNDER'S DESCRIPTION ARE DELIBERATELY ABSENT.
 *
 * "At the most affordable rates." This firm sells a $5,000 diagnostic and
 * $25k-$75k builds to operating partners at $10M-$100M companies. To that
 * buyer cheap is not an attraction, it is a risk signal, and a claim about
 * your own affordability invites a comparison you do not want. Price is
 * already stated plainly; it does not need an adjective defending it.
 *
 * "FANG companies" as a category, and the rocket-ship line. Amazon is named
 * because it is specific and checkable. The acronym is neither.
 */
export const BUILD_TEAM = {
  body: [
    'The builds are delivered by engineers who came from Amazon and comparable engineering organisations, and by founders who built and ran their own companies before joining this one.',
    'None of them bills by the hour. Phases are priced before they start, so the incentive is to finish rather than to extend, and the people who scoped the work are the people who do it.',
  ],
};
