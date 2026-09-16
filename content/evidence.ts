/**
 * content/evidence.ts — engagement records, and the §5 gate that governs them.
 *
 * ⚠️ §5 IS BLOCKING. The site claims a $10M–$100M ICP. Every record must be an
 * engagement at that scale. A visitor who finds a sub-$1M case dismisses the
 * entire property in thirty seconds, and that is unrecoverable.
 *
 * REQUIRED PER RECORD, NO EXCEPTIONS:
 *   sector — specific. "Specialty industrial distribution", not "B2B".
 *   revenue — ≥ $10M
 *   headcount
 *   found — annualised leakage identified
 *   sealed — annualised recovery measured. MUST be less than found; a 100%
 *            seal is not credible and reads as fabrication.
 *   period — over what window the recovery was measured
 *   verification — the named system and metric it was measured in
 *   consent — written client approval of the anonymised version as published
 *
 * If you have one that clears this bar, publish one. §5: one verified $34M
 * engagement with a named measurement method outperforms six vague ones.
 *
 * If you have none at this scale, DO NOT ROUND A $4M COMPANY UP. Leave this
 * array empty and the site ships the interim notice below, which §5 argues is
 * stronger than a padded page and, unlike a caught exaggeration, is
 * recoverable.
 */

export interface EngagementRecord {
  slug: string;
  index: string;
  /** Which library shelf it sits on. Must be an INDUSTRIES id. */
  industry: IndustryId;
  sector: string;
  region: string;
  year: string;
  /** Formatted, e.g. "$34M". Must be ≥ $10M. */
  revenue: string;
  headcount: string;
  /** Annualised leakage identified during the diagnostic. */
  found: string;
  /** Annualised recovery measured after implementation. Always less than found. */
  sealed: string;
  payback: string;
  /** The finding, as one sentence. Becomes the H1. */
  title: string;
  situation: string[];
  whatWeFound: { leak: string; annualised: string }[];
  whatWeBuilt: string[];
  whatChanged: { metric: string; before: string; after: string }[];
  /** How it was measured, over what period, in which system. Never omit. */
  verification: string;
  consentOnFile: boolean;
}

/**
 * THE LIBRARY SHELVES.
 *
 * ⚠️ TWO THINGS TO SETTLE, and both are the founder's call rather than mine.
 *
 * 1. "Home Services & C..." was truncated in the source. Guessed as
 *    Construction. Correct it here and every reference follows.
 *
 * 2. These verticals are SMB shapes. The site sells to operating companies at
 *    $10M-$100M, and §5 refuses any record below that. Most restaurants,
 *    medspas and coaching practices are an order of magnitude under it, so
 *    either the library fills with work that contradicts the stated ICP, or
 *    most of these shelves stay empty. Deciding which is a positioning call,
 *    not a code change: EITHER these are engagement records and §5 holds and
 *    some shelves stay bare, OR they are a separate class of case study with
 *    its own stated bar, kept visibly apart from the engagement record. What
 *    cannot happen is mixing the two under one heading, because the whole
 *    argument of /evidence is that a published figure means one specific
 *    thing.
 */
export const INDUSTRIES = [
  { id: 'home-services', label: 'Home Services & Construction' },
  { id: 'agencies', label: 'Agencies' },
  { id: 'hospitality', label: 'Restaurant & Hospitality' },
  { id: 'coaching', label: 'Coaching & Consultants' },
  { id: 'health', label: 'MedSpa & Health' },
  { id: 'automotive', label: 'Automotive' },
] as const;

export type IndustryId = (typeof INDUSTRIES)[number]['id'];

export function industryLabel(id: string): string | undefined {
  return INDUSTRIES.find((i) => i.id === id)?.label;
}

/** Records on one shelf, or all of them when the id is unknown or absent. */
export function recordsByIndustry(id?: string): EngagementRecord[] {
  if (!id || !industryLabel(id)) return RECORDS;
  return RECORDS.filter((r) => r.industry === id);
}

/** Shelves that actually hold something. Empty shelves are never offered as a
 *  filter: a button that leads to nothing is worse than no button. */
export function populatedIndustries() {
  return INDUSTRIES.filter((i) => RECORDS.some((r) => r.industry === i.id));
}

/* ⚠️ TEMPORARY. Delete this import and the spread below, and delete
   content/evidence.samples.ts, before launch. They are placeholder records so
   the library and its shelves can be reviewed; a Vercel build throws rather
   than publishing them. */
import { SAMPLE_RECORDS } from './evidence.samples';

/**
 * Empty until §5 is satisfied. Add records here and /evidence switches from the
 * interim notice to the record table automatically.
 */
export const RECORDS: EngagementRecord[] = [...SAMPLE_RECORDS];

export const hasRecords = () => RECORDS.length > 0;

/**
 * §5's interim page, verbatim. Shown wherever a record table would go while
 * RECORDS is empty. `month` is the only thing to fill in.
 */
export const INTERIM_NOTICE = {
  /** ⚠️ [ASSET NEEDED] e.g. "March 2027". The sentence closes cleanly without
   *  it, so an unset month simply omits the date rather than printing a
   *  placeholder at a visitor. */
  month: '',
  body: 'Engagement records publish once the measurement period closes and the client approves the redacted version. First records publish',
  reassurance:
    'In the interim: the diagnostic is fixed-fee and fully credited, and the report will tell you if the leakage is immaterial. That is the whole risk you are taking.',
} as const;

/**
 * §4 section 3 — published beneath every record table. An undefined column is
 * an unfalsifiable claim.
 */
export const COLUMN_DEFINITIONS = [
  { term: 'Found', definition: 'Annualised leakage identified during the diagnostic.' },
  {
    term: 'Sealed',
    definition:
      'Annualised recovery measured after implementation, over the period stated in each record. Always less than FOUND.',
  },
  {
    term: 'Payback',
    definition:
      'Weeks for measured recovery to equal total fees paid, diagnostic plus implementation.',
  },
];

export const RECORD_PREAMBLE = 'Client names withheld by agreement. Figures unaltered.';

/**
 * §4 section 2 — THE PATTERN. The scale figures.
 *
 * ⚠️ READ THIS BEFORE CHANGING EITHER NUMBER.
 *
 * These two figures get divided. $6B over 500 businesses is $12M each, and the
 * site sells to companies doing $10M-$100M, so taken naively the claim says we
 * routinely find more unrealized revenue than a company at the bottom of our
 * range earns in a year. An operating partner does that division on sight, and
 * the page does not recover from it.
 *
 * What makes the pair survive scrutiny is the two things stated with them:
 *
 *   1. THE POPULATION. The 500 are not all $10M-$100M companies. Most sit well
 *      below the diagnostic's ICP. Saying so costs nothing and removes the
 *      implication that $12M is a typical finding at our own ICP.
 *   2. THE MEASURE. "Unrealized revenue" is cumulative across every audit and
 *      across the whole period, and it is not annualised. FOUND and SEALED in
 *      an engagement record mean something narrower and stricter. Two different
 *      measures with the same smell is precisely how a page loses a reader, so
 *      both are defined in plain words on the page itself.
 *
 * This is the same rule §4 applies to record columns: an undefined column is an
 * unfalsifiable claim. It binds harder here, because these are the largest
 * numbers on the site.
 */
export const LEAKAGE_SCALE = {
  /** ⚠️ [ASSET NEEDED] The window the 500 and the $6B were accumulated over,
   *  e.g. "2019-2026". Without it "cumulative" is not actually a measurement,
   *  and the section says so in dev until it is filled in. */
  period: '',

  audited: {
    figure: '500+',
    label: 'Businesses audited',
    definition:
      'Businesses taken through the full process, from systems access to written findings. Across every size, most of them smaller than the operating range this diagnostic is sold into.',
  },

  unrealized: {
    figure: '$6B+',
    label: 'Unrealized revenue identified',
    definition:
      'Demand those businesses had already paid to acquire and did not convert, totalled at the point it was lost. Cumulative across every audit and the whole period. Not annualised, and not a claim about what any single business would find.',
  },
} as const;

export const hasScalePeriod = () => LEAKAGE_SCALE.period.length > 0;

/**
 * §5's publication bar, as the page states it.
 *
 * This is the EngagementRecord interface written out in plain words. It is the
 * strongest thing /evidence can say while RECORDS is empty, because it is true
 * today: the requirements are not aspirations, they are the fields a record
 * cannot be constructed without, and the page is empty precisely because the
 * bar has not been cleared rather than because nothing has been done.
 *
 * Keep this list and the interface in step. If a field is relaxed there, the
 * claim here becomes false.
 */
export const PUBLICATION_STANDARD = [
  {
    term: 'Scale',
    detail:
      'The engagement was at $10M to $100M in revenue, the range this firm operates in. A smaller company rounded up would discredit every record beside it.',
  },
  {
    term: 'A named sector',
    detail: 'Specific enough to be recognised. "Specialty industrial distribution", not "B2B".',
  },
  {
    term: 'Found',
    detail: 'Annualised leakage identified during the diagnostic.',
  },
  {
    term: 'Sealed',
    detail:
      'Annualised recovery actually measured after implementation, and always less than what was found. A complete seal is not credible and would read as fabrication.',
  },
  {
    term: 'A measurement window',
    detail: 'The period the recovery was measured over, stated rather than implied.',
  },
  {
    term: 'A verification method',
    detail:
      'The system the figure was measured in and the metric it was measured as, both named. A number without them is a claim.',
  },
  {
    term: 'Written consent',
    detail:
      'The client has approved the anonymised version exactly as it is published here.',
  },
];
