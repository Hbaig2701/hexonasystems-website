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
  email: 'hamza@hexonasystems.com',
  /** ⚠️ [ASSET NEEDED] Public phone. The footer line hides itself until set. */
  phone: '' as string,
  principal: 'Hamza Baig',
  operatingRange: '$10M–$100M revenue',
  engagementBasis: 'Fixed scope, fixed fee, credited',
} as const;

/* ---------------------------------------------------------------------------
 * THE ENTITY SENTENCE — AI SEO Developer Guide, Ticket 5.
 * ------------------------------------------------------------------------ */

/**
 * ONE PLAIN SENTENCE STATING WHAT THIS FIRM IS.
 *
 * The guide's Ticket 5 was written against the Wix site, whose copy ran to "a
 * beacon of progress" and "the pinnacle of transformative power". v2 does not
 * have that problem — it has the opposite one. Every sentence on the site is
 * written to persuade a specific reader who already knows what a diagnostic is,
 * and NONE of them defines the firm for a reader who does not. `positioning` is
 * four words. The homepage description assumes you know what leakage means.
 *
 * An assistant asked "who is Hexona Systems" is doing entity resolution and
 * needs one declarative sentence it can lift. Without one it infers, and what
 * it infers from an argument about EBITDA is wrong in a way nobody can correct
 * afterwards.
 *
 * It renders IDENTICALLY in four places, and the repetition is the mechanism —
 * corroboration across a property is what raises a fact's confidence:
 *
 *   1. Homepage, first body copy, above the fold  (components/home/Hero.tsx)
 *   2. /firm, first paragraph                     (app/firm/page.tsx)
 *   3. The Organization schema `description`       (lib/jsonld.tsx)
 *   4. The homepage meta description               (app/page.tsx)
 *
 * CONSTRAINTS IT MUST KEEP MEETING (Ticket 5 acceptance, enforced by
 * `npm run check:seo`): names the city, names the category of business, names
 * at least two concrete deliverables, names at least two industries, contains
 * no "leading" / "pioneering" / "world-class" / "cutting-edge", and is
 * selectable DOM text rather than baked into a graphic.
 *
 * ⚠️ ON THE INDUSTRIES IT NAMES. They are taken from INDUSTRIES in
 * content/evidence.ts, which is the site's own published taxonomy, rather than
 * invented here. That file flags an unresolved positioning question — those
 * verticals are SMB shapes and the firm sells at $10M–$100M — and this sentence
 * deliberately does NOT resolve it. It states the revenue range and the sectors
 * together, so whichever way that call goes, this sentence is still true.
 */
export const ENTITY_SENTENCE =
  'Hexona Systems is a Toronto-based operational diligence firm that runs fixed-fee revenue ' +
  'leakage diagnostics and builds the process automation, CRM and reporting systems that close ' +
  'what those diagnostics find, for operating companies between $10M and $100M in revenue ' +
  'across home services, construction, automotive and hospitality.';

/* ---------------------------------------------------------------------------
 * THIRD-PARTY PROFILES — AI SEO Developer Guide, Ticket 9.
 *
 * The dev half of Ticket 9, done in advance. Every off-site mention of this
 * firm today is syndicated press release distribution — which this file already
 * warns about twice, for the right reason — and it is absent from the
 * directories that "operational diligence firm Toronto" answers get assembled
 * from.
 *
 * Marketing claims the profiles. The URLs land here and feed `sameAs` on the
 * Organization schema automatically, so closing Ticket 9 later is one line per
 * profile rather than a schema change.
 *
 * ⚠️ ONLY `verified` ENTRIES WITH A URL ARE EMITTED. A sameAs pointing at a
 * profile that does not exist is worse than an absent one: it is a broken
 * assertion about identity, and entity resolution penalises exactly that. This
 * is the same gate CREDENTIALS and AWARDS already apply to `href`.
 * ------------------------------------------------------------------------ */

export interface Profile {
  platform: string;
  url: string;
  verified: boolean;
  note?: string;
}

export const PROFILES: Profile[] = [
  {
    platform: 'LinkedIn (firm)',
    url: '',
    verified: false,
    note: 'The one a buyer checks before a call. Highest priority of the set.',
  },
  {
    platform: 'LinkedIn (principal)',
    url: '',
    verified: false,
    note: 'Feeds `sameAs` on the Person node, which is how the principal and the firm resolve as one entity rather than two.',
  },
  {
    platform: 'Crunchbase',
    url: '',
    verified: false,
    note: 'Disproportionately weighted in entity resolution for firms.',
  },
  {
    platform: 'Google Business Profile',
    url: '',
    verified: false,
    note: 'Must be verified against the Toronto address. Carries the local pack.',
  },
  {
    platform: 'Clutch',
    url: '',
    verified: false,
    note: 'Reviews from NAMED clients carry the weight, not the profile. Note the §5 tension: a review from a sub-$10M client sits oddly beside an ICP this site refuses to publish below.',
  },
  { platform: 'G2', url: '', verified: false },
  { platform: 'DesignRush', url: '', verified: false },
];

/** The `sameAs` array. Verified profiles with a real URL, nothing else. */
export function verifiedProfileUrls(): string[] {
  return PROFILES.filter((p) => p.verified && p.url).map((p) => p.url);
}

export const DIAGNOSTIC = {
  name: 'Leakage Diagnostic',
  price: 5000,
  priceFormatted: '$5,000',
  currency: 'USD',
  /**
   * §4 warning: state the clock the same way everywhere, and ALWAYS ANCHORED
   * TO SYSTEMS ACCESS, never to purchase. Between purchase and access sit
   * kickoff scheduling and credential provisioning, realistically five to ten
   * more days. Implying delivery two weeks after payment reads as a
   * bait-and-switch the first time it slips, and it will slip.
   *
   * "Two week intensive" is the framing; ten business days is the precision.
   * They are the same span, and the long form carries both because two weeks
   * invites a reader to count fourteen calendar days. Wherever only one fits,
   * use the short form and keep the anchor.
   */
  duration: 'A two week intensive, which is ten business days from systems access',
  durationShort: 'Two week intensive',

  /**
   * Who is actually in the client's systems. This belongs in the ENGAGEMENT
   * scope, not in the principal's biography: a buyer granting two weeks of
   * access to a CRM asks it here, at the point of committing, and the answer
   * is a term of the engagement rather than a fact about anyone's career.
   *
   * It also stops §3 implying a one-person firm. The principal section is
   * first person and stays that way because he leads every engagement, which
   * is precisely what makes the personal voice honest there.
   */
  delivery: 'Led by the principal, with one or two operators',
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
    term: 'The roadmap is yours, including if you leave',
    detail:
      'The report and the build plan are written so that another firm could execute them without us. You keep both whether you hire us or not, because a plan you cannot take elsewhere is a hostage rather than a plan.',
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
  {
    year: '2026',
    title: 'Diamond SaaSPreneur Award',
    detail: 'Awarded to the firm',
    href: '',
  },
  {
    year: '2025',
    title: 'Canadian Tech Business of the Year',
    detail: 'Nominated',
    href: '',
  },
  {
    year: '2024',
    title: 'Platinum SaaSPreneur Award',
    detail: 'Awarded to the firm',
    href: '',
  },
  {
    year: '2024',
    title: 'Technopreneur of the Year',
    detail: 'Hamza Baig, nominated',
    href: '',
  },
  {
    year: '2024',
    title: 'Young Entrepreneur of the Year',
    detail: 'Hamza Baig, nominated',
    href: '',
  },
];

/* ===========================================================================
   /firm — the entity-source sections.

   Added to satisfy an About-page SOP whose purpose is a single first-party
   document a model can extract facts from. Three rules from it that shape
   everything below:

     Third person. "Hexona Systems is…", not "we are…". The existing prose on
     the page stays first person and persuasive; these sections are the factual
     layer beneath it. Do not merge the two registers.

     Every sentence carries a fact that could be lifted as a key-value pair.
     That is why the services each state what is delivered AND what changes,
     rather than describing a capability.

     No unprovable adjectives. Nothing here is world-class, leading or
     best-in-class. Where a claim needs support it gets a number instead.

   ⚠️ NOTHING HERE IS NEW INFORMATION. Every fact already appears somewhere on
   the site and is being restated in one extractable place. If a figure changes,
   it changes at its source and these read from it.
   ======================================================================== */

export const SERVICES = [
  {
    name: 'Leakage Diagnostic',
    delivered:
      'A two week intensive across every system that touches a lead, priced at $5,000 and credited in full against implementation.',
    outcome:
      'The client receives every leak priced as an annual figure, ranked by recoverable dollars against the effort to recover them.',
  },
  {
    name: 'Process automation',
    delivered:
      'Lead capture, routing, conversion and follow-up rebuilt so that no step depends on a person remembering to take it.',
    outcome:
      'Inbound stops being lost between the form and the first human response.',
  },
  {
    name: 'CRM implementation',
    delivered:
      'The system of record rebuilt or replaced where the CRM is itself the reason revenue is going missing.',
    outcome:
      'The workarounds people invented to avoid the old system stop being where deals disappear.',
  },
  {
    name: 'Custom software',
    delivered:
      'Dashboards and internal tools, up to enterprise scale, built where nothing off the shelf matches how the business runs.',
    outcome: 'The operation stops bending itself to fit a tool it did not choose.',
  },
  {
    name: 'Reporting',
    delivered:
      'Measurement of the leak built into the systems it was found in, against the baseline the diagnostic established.',
    outcome:
      'A leak that was closed stays closed, because somebody can see it the week it reopens.',
  },
  {
    name: 'Operational structure',
    delivered:
      'Ownership and workflow defined around the systems, so each process has a named person accountable for it.',
    outcome: 'A tool nobody owns stops leaking again within a quarter.',
  },
];

export const SEGMENTS = {
  primary:
    'Operating companies between $10M and $100M in revenue, where inbound demand already exists and is being paid for.',
  industries: [
    'Home services and construction',
    'Automotive',
    'Restaurant and hospitality',
    'MedSpa and health',
    'Agencies',
    'Coaching and consultants',
  ],
  buyer:
    'The engagement is bought by whoever owns operations and can grant access to the systems without escalating.',
  notFor:
    'Companies under $10M, where the leakage rarely justifies the fee. Hexona Systems says so rather than taking the engagement.',
};

/**
 * KEY FACTS — the SOP's most important block, and the reason is mechanical: a
 * model answering "when was Hexona founded" does not want to parse a paragraph,
 * it wants a key and a value. This mirrors a Wikipedia infobox on purpose.
 *
 * ⚠️ ROWS WITH NO VALUE DO NOT RENDER. Social handles and anything else still
 * missing stay out rather than shipping as a blank or a placeholder.
 *
 * ⚠️ NOTABLE CLIENTS IS DELIBERATELY ABSENT. The trusted-by band says "teams
 * at", which claims people at those organisations and not the organisations as
 * clients of the firm. Promoting those names into a row headed Notable Clients
 * would convert a careful statement into a false one, in the most machine-
 * readable format on the site. Add this row only with named, consenting
 * clients.
 *
 * ⚠️ COMPETITORS IS ABSENT BY DECISION. The SOP recommends naming them for
 * entity co-occurrence. The firm's position is that it does not name an
 * opponent it will not name in person, and the FAQ answers the comparison at
 * the category level instead.
 */
export const KEY_FACTS: { field: string; value: string }[] = [
  { field: 'Company name', value: FIRM.name },
  { field: 'Type', value: 'Operational diligence and revenue recovery firm' },
  { field: 'Founded', value: '2021' },
  { field: 'Founder', value: FIRM.principal },
  { field: 'Headquarters', value: 'Toronto, Ontario, Canada' },
  { field: 'Website', value: 'https://hexonasystems.com' },
  { field: 'Core offering', value: 'The Leakage Diagnostic, a fixed-fee revenue leakage audit' },
  { field: 'Pricing', value: '$5,000 for the diagnostic. $25,000 to $75,000 typical for implementation, across phases' },
  { field: 'Contract terms', value: 'Fixed scope and fixed fee. The diagnostic fee is credited in full against implementation. No obligation at any point' },
  { field: 'Delivery', value: 'Two week intensive, ten business days from systems access' },
  { field: 'Services', value: 'Leakage diagnostics, process automation, CRM implementation, custom software, reporting, operational structure' },
  { field: 'Operating range', value: FIRM.operatingRange },
  { field: 'Businesses served', value: '1,500+' },
  { field: 'Client engagements', value: '1,000+' },
  { field: 'Operators trained', value: '45,000+' },
  { field: 'Contact', value: FIRM.email },
].filter((r) => r.value && r.value.trim().length > 0);
