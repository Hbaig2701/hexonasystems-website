/**
 * content/claims.ts — THE SINGLE SOURCE OF TRUTH FOR EVERY STATISTIC.
 * Spec §12 (Claims Verification Table) + §10.2.
 *
 * RULE: No statistic may be hardcoded anywhere else in the codebase. Every
 * figure on every page imports from here. This makes a correction a one-line
 * change instead of a site-wide audit.
 *
 * Launch gate (§14, Phase 6): every claim below must have `status: 'verified'`
 * before production. Run `npm run claims:check` to list what is outstanding.
 */

export type ClaimStatus = 'verified' | 'pending';

export interface Claim {
  /** The value as it should be rendered, verbatim. */
  value: string;
  /** Numeric form where an odometer needs to roll to it. */
  numeric?: number;
  /** Short label rendered beneath the figure. */
  label: string;
  /** Source annotation — what separates a credible number from decoration. */
  annotation: string;
  status: ClaimStatus;
  /** Conflicting versions found during research (§12). For Hamza's review. */
  conflict?: string;
}

/* ---------------------------------------------------------------------------
 * VERIFIED — consistent across every source. Use freely.
 * ------------------------------------------------------------------------ */

export const SAASPRENEUR: Claim = {
  value: '0.01%',
  label: 'SaaSPreneur percentile',
  annotation: 'Platinum tier, 2024',
  status: 'verified',
};

/**
 * The daycare case. Consistent across sources and the single most persuasive
 * object on the site (§1.3, §7.1 S5).
 */
export const DAYCARE = {
  inquiriesPerDay: 30,
  responseBefore: '24–48 hr',
  responseAfter: '2 min',
  leadDropReduction: '40%',
  registrationLift: '15%',
  revenueRecovered: 80_000,
  revenueRecoveredFormatted: '$80,000',
  status: 'verified' as ClaimStatus,
};

/* ---------------------------------------------------------------------------
 * PENDING VERIFICATION — §12. Each carries the conflict that must be resolved.
 * The recommended value from §12 is pre-filled so the site is coherent today;
 * Hamza confirms or corrects the value, then flips status to 'verified'.
 * ------------------------------------------------------------------------ */

export const BUSINESSES_POWERED: Claim = {
  value: '1,500+',
  numeric: 1500,
  label: 'Businesses',
  annotation: "Benefited from Hexona's software, services or systems over the past four years",
  status: 'pending',
  conflict:
    '"1,000+ agencies and businesses" (spec §12) vs "10K business partners" (portfolio) vs "1500+ Businesses" (Framer design) vs "1000+ Clients Supported" (Framer comparison table). FOUR versions. Currently rendering the Framer figure. Clarify powered / partners / clients / supported, then lock one.',
};

/** New in the Framer design. No prior version to conflict with — needs sourcing. */
export const VALUE_GENERATED: Claim = {
  value: '$20,000,000+',
  numeric: 20_000_000,
  label: 'Generated or saved',
  annotation: 'As a result of the systems Hexona has implemented',
  status: 'pending',
  conflict:
    'Appears only in the Framer design. This is the largest single number on the site and the one a sophisticated buyer will most want substantiated. Confirm the basis (generated, saved, or both) and over what period.',
};

export const MRR: Claim = {
  value: '$100K+',
  numeric: 100,
  label: 'Monthly recurring revenue',
  annotation: 'Platform + licensing, 2026',
  status: 'pending',
  conflict: 'Appears in press releases only, never on the site. §12 recommends publishing.',
};

export const BUILDERS_TRAINED: Claim = {
  value: '40,000+',
  numeric: 40000,
  label: 'Builders trained',
  annotation: 'Automation Institute, worldwide',
  status: 'pending',
  conflict: '15,000 (incubator page) / 40,000+ (press) / 47,000 (portfolio). §12 recommends 40,000+ if defensible.',
};

export const CONTINENTS: Claim = {
  value: '6',
  numeric: 6,
  label: 'Continents',
  annotation: 'Active client operations',
  status: 'pending',
  conflict: '22 countries / "five or more countries" / six continents. §12 recommends "six continents".',
};

export const COMBINED_YEARS: Claim = {
  value: '40+',
  numeric: 40,
  label: 'Combined years',
  annotation: 'Automation and software engineering',
  status: 'pending',
  conflict: 'Confirm which team this represents.',
};

export const SOCIAL_FOLLOWING: Claim = {
  value: '200,000+',
  numeric: 200000,
  label: 'Audience',
  annotation: 'Across platforms, 2026',
  status: 'pending',
  conflict: '100,000+ / 109,000 IG / 200,000+ / 250,000+. §12 recommends "200,000+ across platforms (2026)", dated.',
};

export const AWARDS_COUNT: Claim = {
  value: '6',
  numeric: 6,
  label: 'Awards',
  annotation: 'Received in recognition of achievement so far',
  status: 'pending',
  conflict:
    '"5 industry awards" (current site, one named) vs "6 Awards" (Framer design). The ledger below names TWO. §7.1 S8: name them all or reduce the count to what can be evidenced. An unevidenced count is worse than a smaller true one. Naming six in THE RECORD resolves this.',
};

/** New in the Framer design: a second SaaSPreneur tier. */
export const SAASPRENEUR_DIAMOND: Claim = {
  value: 'Diamond',
  label: 'SaaSPreneur tier',
  annotation: 'Diamond, 2025',
  status: 'pending',
  conflict:
    'The Framer design cites both Platinum (2024) and Diamond (2025); the spec §12 knows only Platinum 2024. Confirm the Diamond award and its date, because it is the hero news badge, so it is the first claim anyone reads.',
};

/** Framer comparison table. */
export const DEVELOPER_NETWORK: Claim = {
  value: '40+',
  numeric: 40,
  label: 'Developer network',
  annotation: 'And growing',
  status: 'pending',
  conflict: 'Appears only in the Framer comparison table. Confirm.',
};

export const OPERATING_SINCE: Claim = {
  value: '2021',
  numeric: 2021,
  label: 'Building since',
  annotation: 'Before ChatGPT',
  status: 'pending',
  conflict:
    'The Framer design says Hamza has been automating for local businesses "since 2021"; the spec dates the company to 2022 (post-layoff). Both can be true (personal practice from 2021, company from 2022) but the site must say which is which.',
};

export const PROJECTS_COMPLETED: Claim = {
  value: '500+',
  numeric: 500,
  label: 'Projects completed',
  annotation: 'Implementation engagements',
  status: 'pending',
  conflict: 'Homepage only. Confirm and keep, or cut. Currently NOT rendered anywhere.',
};

/* ---------------------------------------------------------------------------
 * THE HOMEPAGE STATS GRID — §7.1 S6, "For the Numerically Inclined".
 * Six figures, 3×2, each with a source annotation.
 * ------------------------------------------------------------------------ */

export const NUMBERS_GRID: Claim[] = [
  VALUE_GENERATED,
  BUSINESSES_POWERED,
  AWARDS_COUNT,
  CONTINENTS,
  COMBINED_YEARS,
  SAASPRENEUR,
];

/**
 * The three headline stat cards, from the Framer design's About page.
 * Rendered large, with an icon, above the fold on /about.
 */
export const HEADLINE_STATS: Claim[] = [BUSINESSES_POWERED, VALUE_GENERATED, AWARDS_COUNT];

/**
 * "As Featured On" — §7.1 and the Framer design's press bar.
 * ⚠️ These are publications that have covered Hexona, NOT partners or clients.
 * §11 item 5: the relationship must be labelled precisely, because press
 * coverage, partnership and customership are legally different claims.
 */
export const PRESS: { name: string; href?: string; status: ClaimStatus }[] = [
  { name: 'Yahoo Finance', status: 'pending' },
  { name: 'Digital Journal', status: 'pending' },
  { name: 'Digital Media Net', status: 'pending' },
  { name: 'Brainz Magazine', status: 'pending' },
  { name: 'GoHighLevel', status: 'pending' },
];

/* ---------------------------------------------------------------------------
 * THE RECORD — §7.1 S8. Credentials in a formal register, not badge images.
 * ------------------------------------------------------------------------ */

export interface RecordRow {
  year: string;
  title: string;
  detail: string;
  href?: string;
  status: ClaimStatus;
}

export const RECORD: RecordRow[] = [
  {
    year: '2025',
    title: 'Diamond SaaSPreneur Award',
    detail: 'The tier above Platinum',
    status: 'pending',
  },
  {
    year: '2024',
    title: 'Platinum SaaSPreneur Award',
    detail: 'Top 0.01% of SaaS agencies worldwide',
    status: 'verified',
  },
  {
    year: '2026',
    title: 'Published: AI & Middle Management',
    detail: 'Industry guidance, Toronto',
    status: 'pending',
  },
  {
    year: '2026',
    title: 'Executive Contributor',
    detail: 'Brainz Magazine',
    status: 'pending',
  },
  {
    year: '···',
    title: 'Featured in',
    detail: 'Yahoo Finance · Digital Journal · Digital Media Net',
    status: 'pending',
  },
];

/* ---------------------------------------------------------------------------
 * INTEGRATIONS — §7.1 S4 integration bar.
 * ⚠️ §11 item 5: partner logo permissions must be confirmed, and the
 * relationship labelled precisely (integration vs partner vs client — these
 * are legally different claims). Everything below is labelled "integration",
 * the narrowest and most defensible framing.
 * ------------------------------------------------------------------------ */

export const INTEGRATIONS: { name: string; status: ClaimStatus }[] = [
  { name: 'Make', status: 'pending' },
  { name: 'Zapier', status: 'pending' },
  { name: 'OpenAI', status: 'pending' },
  { name: 'Snowflake', status: 'pending' },
  { name: "Moody's Analytics", status: 'pending' },
  { name: 'Younite', status: 'pending' },
  { name: 'Pabbly', status: 'pending' },
];

/* ---------------------------------------------------------------------------
 * COMPANY FACTS — §7.4 item 6. Buyers doing diligence look for this.
 * ------------------------------------------------------------------------ */

export const COMPANY = {
  name: 'Hexona Systems',
  address: '18 Harbour Street, Toronto, ON',
  city: 'Toronto, ON',
  email: 'hello@hexonasystems.com',
  phone: '' as string, // [ASSET NEEDED] — public phone number. Renders only once set.
  founded: '2022',
  crm: 'app.hexonasystems.com',
  sweetSpot: '$10M+ in revenue',
  /** Below this we say so on the call rather than sell a build. */
  revenueFloor: '$10M',
} as const;

/* ---------------------------------------------------------------------------
 * LAUNCH GATE HELPER
 * ------------------------------------------------------------------------ */

/**
 * Claims the site actually publishes. The launch gate (§12) only checks these.
 *
 * BUILDERS_TRAINED, SOCIAL_FOLLOWING and MRR are deliberately absent. They
 * argue audience size and community scale, which is the Automation Institute's
 * pitch, not this site's. A buyer running a $10M+ operation does not care how
 * many people were taught to start an agency, and saying it invites them to
 * wonder whether they are the customer or the case study. The constants are
 * kept above so the Institute can use them elsewhere.
 */
export const ALL_CLAIMS: Record<string, Claim> = {
  BUSINESSES_POWERED,
  VALUE_GENERATED,
  CONTINENTS,
  COMBINED_YEARS,
  AWARDS_COUNT,
  SAASPRENEUR_DIAMOND,
  DEVELOPER_NETWORK,
  OPERATING_SINCE,
  PROJECTS_COMPLETED,
  SAASPRENEUR,
};

export function pendingClaims(): string[] {
  return Object.entries(ALL_CLAIMS)
    .filter(([, c]) => c.status === 'pending')
    .map(([k, c]) => `${k}: "${c.value}" · ${c.conflict ?? 'needs confirmation'}`);
}
