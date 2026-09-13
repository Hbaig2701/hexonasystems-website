/**
 * content/cases.ts — the case studies, §7.3.
 *
 * LAUNCH SET: three. `childcare-response-time` is the flagship and the only one
 * with complete data today. `manufacturing-coordination` has a confirmed
 * eight-week timeline and nothing else. `missed-lead-capture` has nothing
 * confirmed yet and is also the 301 target for two currently-dead URLs.
 *
 * ⚠️ §7.1 S5 BUILD NOTE: "If a real number isn't available for one, cut the card
 * entirely rather than shipping a vague one. Three specific cases beat six
 * vague ones by a wide margin."
 *
 * So nothing in here is invented. A case with `metricsPending: true` renders a
 * visibly-labelled placeholder where its headline metric goes — never a number
 * that looks real. Set `published: false` to cut a case outright; the homepage
 * grid and the /work index both handle 2–3 items without a layout gap.
 */

export interface CaseMetric {
  label: string;
  before: string;
  after: string;
  /** Tone for the "after" figure in the before/after sweep (Moment 5). */
  direction: 'up' | 'down';
}

export interface CaseStudy {
  slug: string;
  /** CASE 0X · INDUSTRY · REGION · YEAR */
  index: string;
  industry: string;
  region: string;
  year: string;
  /** H1: the result, as a sentence. */
  title: string;
  /** One-line problem statement for the index card. */
  problem: string;
  /** The single headline metric on the card. Null while metrics are pending. */
  headline: { value: string; label: string } | null;
  metricsPending: boolean;
  published: boolean;
  featured: boolean;

  atAGlance: { label: string; value: string }[];
  situation: string[];
  whereItLeaked: string[];
  whatWeBuilt: string[];
  metrics: CaseMetric[];
  /** The recovered-revenue figure, rendered at display size. */
  outcome: { value: string; label: string } | null;
  /** ⚠️ [ASSET NEEDED per case] — direct client quote. */
  quote: { text: string; attribution: string } | null;
}

const PENDING = 'ASSET PENDING';

export const CASES: CaseStudy[] = [
  {
    slug: 'childcare-response-time',
    index: 'CASE 01',
    industry: 'Education / Childcare',
    region: 'Ontario',
    year: '2026',
    title: 'Thirty inquiries a day, answered in a day and a half.',
    problem: 'The marketing was working. The response wasn’t.',
    headline: { value: '$80,000', label: 'Annual revenue recovered' },
    metricsPending: false,
    published: true,
    featured: true,

    atAGlance: [
      { label: 'Industry', value: 'Childcare / early education' },
      { label: 'Company size', value: 'Multi-site operator' },
      { label: 'Timeline', value: 'Implementation, then measured' },
      { label: 'Systems replaced', value: 'Manual inbox triage and callback lists' },
    ],

    situation: [
      'A childcare operator was receiving 30 inquiries daily and taking 24 to 48 hours to respond. By the time a reply went out, most parents had already enrolled somewhere else.',
      'Nothing about the marketing was broken. Demand was arriving in volume, on schedule, from channels that were working. The failure was entirely on the other side of the inquiry.',
    ],

    whereItLeaked: [
      'Inquiries arrived across several channels and were triaged by hand, by staff whose first job was running the centres.',
      'A parent deciding on childcare is comparing two or three options in the same afternoon. A 24-hour reply is not a slow reply. It is an absent one.',
      'No follow-up was scheduled behind a first response, so an unanswered reply ended the conversation.',
    ],

    whatWeBuilt: [
      'One intake path. Every inquiry (form, phone, email) lands in a single queue with the same routing rules.',
      'An appointment-setting agent that answers in under two minutes, at any hour, qualifies against the operator’s own criteria, and books tours straight into the calendar.',
      'Automated follow-up behind every first response, so a conversation that stalls gets picked back up instead of closing itself.',
    ],

    metrics: [
      { label: 'Response time', before: '24–48 hr', after: '2 min', direction: 'down' },
      { label: 'Lead drop-off', before: 'High', after: '−40%', direction: 'down' },
      { label: 'Registrations', before: 'Baseline', after: '+15%', direction: 'up' },
    ],

    outcome: { value: '$80,000', label: 'Additional annual revenue' },
    quote: null, // ⚠️ [ASSET NEEDED] — direct client quote, with permission to attribute.
  },

  {
    slug: 'manufacturing-coordination',
    index: 'CASE 02',
    industry: 'Manufacturing',
    region: 'Ontario',
    year: '2026',
    title: 'An eight-week coordination build.',
    problem: 'Confirmed eight-week implementation. Outcome metrics pending.',
    headline: null,
    metricsPending: true,
    published: true,
    featured: false,

    atAGlance: [
      { label: 'Industry', value: 'Manufacturing' },
      { label: 'Company size', value: PENDING },
      { label: 'Timeline', value: '8 weeks' },
      { label: 'Systems replaced', value: PENDING },
    ],

    situation: [],
    whereItLeaked: [],
    whatWeBuilt: [],
    metrics: [],
    outcome: null,
    quote: null,
  },

  {
    slug: 'missed-lead-capture',
    index: 'CASE 03',
    industry: 'Multi-industry',
    region: 'Canada',
    year: '2026',
    title: 'Missed lead capture.',
    problem: 'Case data pending.',
    headline: null,
    metricsPending: true,
    published: true,
    featured: false,

    atAGlance: [
      { label: 'Industry', value: PENDING },
      { label: 'Company size', value: PENDING },
      { label: 'Timeline', value: PENDING },
      { label: 'Systems replaced', value: PENDING },
    ],

    situation: [],
    whereItLeaked: [],
    whatWeBuilt: [],
    metrics: [],
    outcome: null,
    quote: null,
  },

  /**
   * ⚠️ THE FLAGSHIP SLOT. Hamza is supplying this one.
   *
   * The site now claims it makes deca-million operations millions more. The
   * childcare case proves the mechanism but not the scale: a buyer running
   * $30M reads $80,000 and concludes they are not the customer. One real
   * implementation at a $10M+ client with a seven-figure result would carry
   * the entire positioning on its own, and nothing else on the page does that
   * job as well.
   *
   * To publish: fill in the fields below, set published and featured to true,
   * and set featured to false on childcare-response-time.
   *
   * Anonymised is fine and often better: "A $40M logistics operator" reads as
   * discretion rather than evasion.
   */
  {
    slug: 'enterprise-flagship',
    index: 'CASE 00',
    industry: 'ASSET PENDING',
    region: 'ASSET PENDING',
    year: '2026',
    title: 'ASSET PENDING — the seven-figure implementation.',
    problem: 'The deca-million case study that anchors the whole positioning.',
    headline: null,
    metricsPending: true,
    published: false,
    featured: false,

    atAGlance: [],
    situation: [],
    whereItLeaked: [],
    whatWeBuilt: [],
    metrics: [],
    outcome: null,
    quote: null,
  },

  /**
   * POST-LAUNCH, only if real metrics exist (§3.1). An empty fourth card is
   * worse than three strong ones, so this one does not render at all.
   */
  {
    slug: 'ecommerce-automation',
    index: 'CASE 04',
    industry: 'E-commerce',
    region: 'Canada',
    year: '2026',
    title: 'E-commerce automation.',
    problem: 'Ships only once real metrics exist.',
    headline: null,
    metricsPending: true,
    published: false,
    featured: false,

    atAGlance: [],
    situation: [],
    whereItLeaked: [],
    whatWeBuilt: [],
    metrics: [],
    outcome: null,
    quote: null,
  },
];

export const publishedCases = () => CASES.filter((c) => c.published);
export const featuredCase = () => CASES.find((c) => c.featured && c.published) ?? null;
export const supportingCases = () => CASES.filter((c) => c.published && !c.featured);
export const caseBySlug = (slug: string) => CASES.find((c) => c.slug === slug && c.published);
