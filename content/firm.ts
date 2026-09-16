/**
 * content/firm.ts — facts about the firm, in one place.
 *
 * v1's discipline carried over: no statistic or standing claim is hardcoded in
 * a component. §3b makes a claims pass a build phase, and §10 says a statistic
 * you cannot source gets deleted or rewritten as an expectation.
 */

export const FIRM = {
  name: 'Hexona Systems',
  positioning: 'Operational diligence and revenue recovery.',
  address: '18 Harbour Street, Toronto, ON',
  email: 'hello@hexonasystems.com',
  /** ⚠️ [ASSET NEEDED] Public phone. The footer line hides itself until set. */
  phone: '' as string,
  principal: 'Hamza Baig',
  operatingRange: '$10M–$100M revenue',
  engagementBasis: 'Fixed scope, fixed fee, credited',
} as const;

export const DIAGNOSTIC = {
  name: 'Leakage Diagnostic',
  price: 5000,
  priceFormatted: '$5,000',
  currency: 'USD',
  /**
   * §4 warning: state the clock the same way everywhere. TEN BUSINESS DAYS FROM
   * SYSTEMS ACCESS, never from purchase. Between purchase and access sit
   * kickoff scheduling and credential provisioning, realistically five to ten
   * more days. Implying delivery ten days after payment reads as a
   * bait-and-switch the first time it slips, and it will slip.
   */
  duration: '10 business days from systems access',
  durationShort: 'Ten business days',

  /**
   * Who is actually in the client's systems. This belongs in the ENGAGEMENT
   * scope, not in the principal's biography: a buyer granting ten days of
   * access to a CRM asks it here, at the point of committing, and the answer
   * is a term of the engagement rather than a fact about anyone's career.
   *
   * It also stops §3 implying a one-person firm. The principal section is
   * first person and stays that way because he leads every engagement, which
   * is precisely what makes the personal voice honest there.
   */
  delivery: 'Led by the principal, with one or two operators. Same people from access to readout',
} as const;

/**
 * §4 section 2 — CREDENTIALS. Third-party, verifiable, linked.
 *
 * ⚠️ §1.3: two is the honest count and two is enough. Do NOT pad this to five
 * rows with facts about the offer; that is the same inflation in a different
 * costume. Do NOT add syndicated press logos: Yahoo Finance, Digital Journal
 * and Digital Media Net are press-release distribution, and a PE operating
 * partner recognises the format on sight. One real credential beats four that
 * invite scrutiny. McGill belongs on /firm as a fact about the principal, not
 * here as a credential of the firm.
 */
export interface Credential {
  year: string;
  title: string;
  detail: string;
  href?: string;
  verified: boolean;
}

/**
 * §4 section 2 — OPERATING TRACK RECORD.
 *
 * What the principal has actually run, at what scale, and what changed. For a
 * PE operating partner this outranks any award: awards say somebody liked you,
 * a track record says you have stood inside a company this size and moved a
 * number. It is also the one form of standing that does not need a third party
 * to attest to it, which matters when the awards are unlinked.
 *
 * ⚠️ EMPTY BY DESIGN, AND GATED. The section renders this block only when it
 * has entries, exactly as §5 gates the engagement record. Do not seed it with
 * plausible-sounding history to fill the space: a fabricated operating record
 * is the same offence as a fabricated engagement record, and it is the first
 * thing a reference call would expose.
 *
 * `company` may be a description rather than a name where the work is covered
 * by an NDA. "B2B logistics, $40M revenue" is verifiable in a reference call;
 * an invented name is not.
 */
export interface TrackRecordEntry {
  /** Inclusive, e.g. "2019-2023". */
  period: string;
  /** Named, or described with enough scale to be meaningful. */
  company: string;
  role: string;
  /** What was done and what moved. One sentence, and it should carry a number. */
  outcome: string;
}

export const TRACK_RECORD: TrackRecordEntry[] = [];

export function hasTrackRecord(): boolean {
  return TRACK_RECORD.length > 0;
}

export const CREDENTIALS: Credential[] = [
  {
    year: '2024',
    title: 'Platinum SaaSPreneur Award',
    detail: 'Top 0.01% of SaaS firms worldwide',
    href: '',
    verified: true,
  },
  {
    year: '2026',
    title: 'AI & Middle Management',
    detail: 'Published operational guidance',
    href: '',
    verified: false,
  },
];

/** §4 section 2 — HOW WE WORK. Plain facts, no link. Never mixed with the above. */
export const ENGAGEMENT_TERMS = [
  { term: 'Operating range', value: FIRM.operatingRange },
  { term: 'Engagement basis', value: FIRM.engagementBasis },
  { term: 'Principal', value: FIRM.principal },
];

/**
 * The trusted-by band.
 *
 * The heading is "Trusted by teams AT", and that preposition is doing real
 * work: it claims people at these organisations, not the organisations as
 * clients of the firm. Keep it. Dropping the "teams at" turns seven careful
 * statements into seven claims that a reference call could contradict.
 *
 * ⚠️ LOGOS PENDING. Each entry gets an optional `logo` once the files land:
 * put an SVG in public/logos/ and set the path. The band renders the name as
 * type until then, which is why the type treatment has to hold up on its own
 * rather than being a placeholder for an image.
 */
export interface TrustedOrg {
  name: string;
  /** Path under /public once supplied, e.g. "/logos/gohighlevel.svg". */
  logo?: string;
}

export const TRUSTED_BY: TrustedOrg[] = [
  { name: 'Cardone Ventures' },
  { name: 'GoHighLevel' },
  { name: 'School of Hard Knocks' },
  { name: 'Tai Lopez' },
  { name: "Moody's Analytics" },
  { name: 'Poppy AI' },
  { name: 'Skool' },
];

/**
 * §4 — THE PRINCIPAL.
 *
 * Translated out of the founder's own telling, which was written for video and
 * opened with "who am I, and why should you even listen to me?". That question
 * is right and the section answers it; asking it out loud on a page selling
 * operational diligence is not, because it concedes the doubt before answering
 * it. The page states the facts and lets them do the work.
 *
 * WHAT IS DELIBERATELY NOT HERE, and why. This is the block a PE operating
 * partner reads hardest after the record, so each omission is a judgement, not
 * an oversight.
 *
 *   Yahoo Finance / NBC. content/firm.ts already carries a standing warning
 *   about syndicated press: these are paid distribution formats and an
 *   operating partner recognises them on sight. Citing them costs more
 *   credibility than it buys. They belong on /firm, listed plainly, or nowhere.
 *
 *   "Zero to seven figures." True, and it invites exactly one comparison: the
 *   firm is one to two orders of magnitude smaller than the companies it sells
 *   into. That is normal for a specialist and damaging to volunteer.
 *
 *   Named clients. Tai Lopez, Joel Kaplan and GoHighLevel are already in the
 *   trusted-by band, where "teams at" makes the claim precisely. Repeating
 *   them here as personal associations weakens the careful version.
 *
 * WHAT CARRIES, and why it is framed the way it is. A thousand engagements
 * reads as small fast work if left as a volume boast, and that is the same
 * arithmetic trap as $6B over 500 businesses. Framed as pattern recognition it
 * becomes the strongest sentence on the page, because it is the direct reason
 * a ten-day diagnostic can work at all.
 */
export const PRINCIPAL = {
  name: FIRM.principal,
  role: 'Principal',

  /** Cropped from the supplied frame to chest-up and re-encoded: the original
   *  was a wide, relaxed sitting shot at 1.8MB of PNG, which read founder-brand
   *  rather than diligence firm and weighed more than the rest of the page. */
  portrait: { src: '/principal.jpg', width: 776, height: 970 },

  bio: [
    'I have spent five years building Hexona Systems, and I was putting automation into operating companies before ChatGPT existed.',
    'A thousand client engagements have run through the firm since. That number is the reason the diagnostic works rather than a claim about volume: the same short list of failures turns up in almost every company, and I have seen each of them often enough now to know which one to look for first.',
    'I also run one of the largest AI automation communities in the world, at over 45,000 members. Several of the operators I trained there now do this work inside companies considerably larger than my own.',
  ],

  /** Both are checkable, which is the only reason they are figures and not
   *  sentences. The engagements are a superset of the 500 audits in §1; if
   *  either number moves, check they still agree. */
  figures: [
    { label: 'Client engagements', figure: '1,000+' },
    { label: 'Community members trained', figure: '45,000+' },
  ],
} as const;

/* ===========================================================================
   /firm — the About page.
   ======================================================================== */

/**
 * ORIGIN. The old About page opened "A Tale of Inevitability" over "Change
 * invites innovation which invites change", which is the register v1 was
 * written in and v2 deliberately is not. The fact underneath it is genuinely
 * strong and needs no styling: the firm predates the tools. That is a date,
 * and a date cannot be argued with.
 */
export const ORIGIN = {
  since: '2021',
  body: [
    'Hexona began in 2021, automating operations for local businesses. The work was unglamorous and the tools were primitive, and that turned out to be the advantage. By the time general-purpose language models arrived, the firm had already spent two years watching where operational money goes missing.',
    'Most firms in this market started after that moment and built their practice around the tools. Hexona started before it and built the practice around the failures. The tools have changed several times since. The failures have not changed once.',
  ],
  figures: [
    { label: 'Operating since', figure: '2021' },
    { label: 'Businesses served', figure: '1,500+' },
    { label: 'Operators trained', figure: '45,000+' },
  ],
};

/**
 * THE TEAM. The homepage names only the principal, by the founder's decision;
 * this is where the rest of the firm lives.
 *
 * Roles are stated as they are, not inflated. "Founder & CEO" became principal
 * to match the language the homepage and the engagement terms already use: a
 * six-person firm with a CEO reads as a title, a six-person firm with a
 * principal reads as a practice.
 */
export const TEAM = [
  { name: 'Hamza Baig', role: 'Founder and principal' },
  { name: 'Ayman Abdullah', role: 'Chief technology officer, lead developer' },
  { name: 'Emaan Ali', role: 'Head of operations' },
  { name: 'Shake Dewan', role: 'Head of AI' },
  { name: 'Brandon Gebka', role: 'Director of business development' },
  { name: 'Spencer Brickman', role: 'Head of partnerships' },
];

/**
 * COMMITMENTS. The old page called this "Objective Dominance" and listed
 * Integrity & Trust, Empowering Business Growth and Putting Customers First,
 * which is what every agency site in the world lists.
 *
 * A value nobody could disagree with is not a value, it is decoration. Each of
 * these is instead a commitment a client could hold the firm to, which is the
 * only kind worth publishing on a page about diligence.
 *
 * The heading here first read "Four promises you can catch us breaking". It
 * was too clever twice over: the reader has to stop and parse it, and it
 * plants the idea that the firm expects to break them. Say the plain thing.
 * Every one is already true elsewhere on the site, which is the test: if a
 * commitment here is not enforced by the engagement terms, it does not belong.
 */
export const COMMITMENTS = [
  {
    term: 'We tell you when there is nothing to find',
    detail:
      'If the leakage is immaterial, the report says so in its first paragraph and we tell you not to hire us.',
  },
  {
    term: 'Every figure names its source',
    detail:
      'Each number is published with the system it was measured in and the period it covers. A figure without both is a claim, not a measurement.',
  },
  {
    term: 'Fixed scope, fixed fee',
    detail:
      'The fee is agreed before work begins and credited in full against implementation. Scope does not move once access is granted.',
  },
  {
    term: 'The same people from access to readout',
    detail:
      'The team that takes your systems access is the team that presents the findings. Nobody is handed to a junior after signing.',
  },
];

/**
 * AWARDS. These live HERE and not on the homepage. §1.3's reasoning stands:
 * a credential nobody can check is weaker than no credential at all on a page
 * whose argument is rigour, and the homepage is where that argument is made.
 * On the firm page they are biography rather than proof, which is a lower bar.
 *
 * ⚠️ Supply `href` for each and the verification link appears. Until then the
 * page says nothing about it to visitors and nags in development only.
 */
export const AWARDS = [
  { year: '2024', title: 'Platinum SaaSPreneur Award', href: '' },
  { year: '2025', title: 'Diamond SaaSPreneur Award', href: '' },
];
