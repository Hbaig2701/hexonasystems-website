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
