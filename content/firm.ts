/**
 * content/firm.ts — facts about the firm, in one place.
 *
 * v1's discipline carried over: no statistic or standing claim is hardcoded in
 * a component. §3b makes a claims pass a build phase, and §10 says a statistic
 * you cannot source gets deleted or rewritten as an expectation.
 */

export const FIRM = {
  name: 'Hexona Systems',
  positioning: 'AI employees that increase enterprise value.',
  address: '18 Harbour Street, Toronto, ON',
  email: 'hamza@hexonasystems.com',
  /** ⚠️ [ASSET NEEDED] Public phone. The footer line hides itself until set. */
  phone: '' as string,
  principal: 'Hamza Baig',
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
 * verticals are SMB shapes and the firm sells at $3M–$15M — and this sentence
 * deliberately does NOT resolve it. It states the revenue range and the sectors
 * together, so whichever way that call goes, this sentence is still true.
 */
export const ENTITY_SENTENCE =
  'Hexona Systems is a Toronto-based AI implementation firm that builds and runs AI employees, ' +
  'including AI receptionists, sales follow-up, dispatch and back-office automation, for service ' +
  'businesses across the United States and Canada in construction, home services, med spas and ' +
  'property management, and only builds the systems that increase enterprise value.';

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
    platform: 'Google Business Profile',
    /**
     * The cid form, not the share.google link and not a search URL with a
     * kgmid. A share link carries the sharer's locale and tracking parameters;
     * a kgmid search URL is a result page, not a profile. The cid is the
     * listing's own stable identifier — verified against the fid in Business
     * Profile Manager.
     */
    url: 'https://maps.google.com/?cid=3329588286767817884',
    verified: true,
    note: 'Claimed and verified. 74 reviews at 4.8. Carries the local pack and Maps results.',
  },
  {
    platform: 'LinkedIn (firm)',
    url: 'https://www.linkedin.com/company/hexona-systems',
    verified: true,
    note: 'The one a buyer checks before a call. Feeds `sameAs` on Organization.',
  },
  {
    platform: 'LinkedIn (principal)',
    url: 'https://www.linkedin.com/in/hamzautomates',
    verified: true,
    note: 'Feeds `sameAs` on the Person node, which is how the principal and the firm resolve as one entity rather than two.',
  },
];

/* Crunchbase, Google Business Profile, Clutch, G2 and DesignRush were listed
   here as empty placeholders. None exists, and an entry with no URL emits
   nothing, so they were five rows of intent pretending to be configuration.
   Add one back the day the profile is actually live. */


/** The `sameAs` array. Verified profiles with a real URL, nothing else. */
export function verifiedProfileUrls(): string[] {
  return PROFILES.filter((p) => p.verified && p.url).map((p) => p.url);
}

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
  /** Path under /public. Absent means the band sets the name as type instead. */
  logo?: string;
  /** Intrinsic pixel size of that file, so next/image reserves the right box. */
  width?: number;
  height?: number;
  /**
   * ⚠️ OPTICAL, NOT MATHEMATICAL, AND IT IS NOT OPTIONAL POLISH.
   *
   * Every logo here is normalised to the same BOUNDING BOX height, which is the
   * wrong thing to equalise. A single word like "skool" fills its box with
   * letterforms, while a stacked lockup like Cardone Ventures spends most of
   * its box on two lines and a gap, so at identical heights the wordmark shouts
   * and the lockup whispers. This multiplies the row height per logo so the
   * lettering reads at a consistent size instead of the boxes matching.
   *
   * Tuned by eye against a render, which is the only way to tune it.
   */
  scale?: number;
}

export const TRUSTED_BY: TrustedOrg[] = [
  {
    name: 'Cardone Ventures',
    logo: '/logos/cardone-ventures.png',
    width: 435,
    height: 112, scale: 1.18,
  },
  {
    name: 'GoHighLevel',
    logo: '/logos/gohighlevel.png',
    width: 494,
    height: 112, scale: 0.95,
  },
  {
    name: 'School of Hard Knocks',
    logo: '/logos/school-of-hard-knocks.png',
    width: 224,
    height: 224,
    /* The only round mark in the band, and a circle needs far more height than
       a wordmark to carry the same optical weight: at a matched 28px it is a
       28px dot beside 130px wordmarks. See TrustedOrg.scale. */
    scale: 1.62,
  },
  {
    name: 'Tai Lopez',
    logo: '/logos/tai-lopez.png',
    width: 502,
    height: 112, scale: 1.18,
  },
  {
    name: 'Poppy AI',
    logo: '/logos/poppy-ai.png',
    width: 422,
    height: 112, scale: 1.0,
  },
  {
    name: 'Skool',
    logo: '/logos/skool.png',
    width: 344,
    height: 112, scale: 0.8,
  },
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
 * arithmetic trap as the scale figures in §1. Framed as pattern recognition it
 * becomes the strongest sentence on the page, because it is the direct reason
 * a ten-day diagnostic can work at all.
 */
export const PRINCIPAL = {
  name: FIRM.principal,
  role: 'Principal',

  bio: [
    'I have spent four years building Hexona Systems, and I was putting automation into operating companies before ChatGPT existed.',
    'More than 1,500 businesses have been served through the firm since, and more than 1,000 agencies run on Hexona\'s AI and systems. Those numbers matter for one reason, not for bragging: the same short list of failures turns up in almost every business, and I have seen each of them often enough now to know which one to fix first.',
    'I also run one of the largest AI automation communities in the world, at over 45,000 members. Several of the operators I trained there now do this work inside companies considerably larger than my own.',
  ],

  /** The brand figures. One set, used everywhere (see BRAND FIGURES in
   *  LAUNCH-CHECKLIST.md): 45,000+ community members, 1,500+ businesses
   *  served, 1,000+ agencies, founded 2022. */
  figures: [
    { label: 'Businesses served', figure: '1,500+' },
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
  since: '2022',
  body: [
    'Hexona began in 2022, automating operations for local businesses. The work was unglamorous and the tools were primitive, and that turned out to be the advantage. By the time general-purpose language models reached ordinary businesses, the firm had already spent years watching where operational money goes missing.',
    'Most firms in this market started after that moment and built their practice around the tools. Hexona started before it and built the practice around the failures. The tools have changed several times since. The failures have not changed once.',
  ],
  figures: [
    { label: 'Founded', figure: '2022' },
    { label: 'Businesses served', figure: '1,500+' },
    { label: 'Community members trained', figure: '45,000+' },
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
    term: 'We only build what moves your value',
    detail:
      'If an AI employee will not capture revenue, cut cost or make the business less dependent on you, we will not sell it to you.',
  },
  {
    term: 'Every figure names its source',
    detail:
      'Results are reported from your own systems, against the period before the build. A number without a source is a claim, not a measurement.',
  },
  {
    term: 'Fixed scope, fixed price',
    detail:
      'You get the scope and the price before any work starts, and they do not move once we begin.',
  },
  {
    term: 'You own what we build',
    detail:
      'The accounts, the data and the workflows are yours. If you ever leave, everything we built stays with your business.',
  },
]

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
  { field: 'Type', value: 'AI implementation firm' },
  { field: 'Founded', value: '2022' },
  { field: 'Founder', value: FIRM.principal },
  { field: 'Headquarters', value: 'Toronto, Ontario, Canada' },
  { field: 'Market served', value: 'United States and Canada' },
  { field: 'Website', value: 'https://www.hexonasystems.com' },
  { field: 'Core offering', value: 'AI employees, built and run for service businesses' },
  { field: 'AI employees', value: 'AI receptionist, sales follow-up, dispatcher, office admin, collections, retention' },
  { field: 'How engagements start', value: 'A free one-hour consult, then a fixed scope and fixed price' },
  { field: 'Businesses served', value: '1,500+' },
  { field: 'Agencies running on Hexona', value: '1,000+' },
  { field: 'Community members trained', value: '45,000+' },
  { field: 'Contact', value: FIRM.email },
].filter((r) => r.value && r.value.trim().length > 0);

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
    /* Deliberately unlinked. It is not a GoHighLevel award, so the GoHighLevel
       awards page would have been a false attribution on the one page whose
       whole job is standing. An unlinked award is weaker than a linked one and
       far better than a wrong one. The renderer handles an empty href. */
    href: '',
  },
  {
    year: '2024',
    title: 'Platinum SaaSPreneur Award',
    detail: 'Awarded to the firm',
    href: 'https://awards.gohighlevel.com/',
  },
  {
    year: '2024',
    title: 'Technopreneur of the Year',
    detail: 'Hamza Baig, nominated',
    href: 'https://awards.gohighlevel.com/',
  },
  {
    year: '2024',
    title: 'Young Entrepreneur of the Year',
    detail: 'Hamza Baig, nominated',
    href: 'https://awards.gohighlevel.com/',
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
