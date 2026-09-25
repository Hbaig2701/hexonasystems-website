import { SITE, absolute } from './site';
import {
  DIAGNOSTIC,
  ENTITY_SENTENCE,
  FIRM,
  ORIGIN,
  PRINCIPAL,
  TEAM,
  verifiedProfileUrls,
} from '@/content/firm';
import { IMPLEMENTATION } from '@/content/diagnostic';

/**
 * STRUCTURED DATA — AI SEO Developer Guide, Ticket 2.
 *
 * v2 shipped with none. Not a thin version — none: no Organization, no Person,
 * no Service, no FAQPage, nothing. So an assistant asked about this firm has to
 * infer the entity from marketing prose, and the prose is deliberately written
 * for a reader who already knows the category. It infers wrong.
 *
 * THE POINT OF THIS FILE IS THE `@id` GRAPH, NOT THE INDIVIDUAL BLOCKS.
 * Schema scattered across pages with no identifiers describes N unrelated
 * things. The same schema with a stable `@id` on the Organization, referenced by
 * every Service, Person, Article and BlogPosting, describes ONE entity with N
 * properties. That difference is the entire reason to do this.
 *
 * Three identifiers, and everything hangs off them:
 *
 *   ORG_ID        https://hexonasystems.com/#organization
 *   WEBSITE_ID    https://hexonasystems.com/#website
 *   PRINCIPAL_ID  https://hexonasystems.com/#hamza-baig
 *
 * ⚠️ THIS FILE INHERITS §5 AND §10. The site's governing rule is that a figure
 * you cannot source gets deleted rather than softened, and that an unfalsifiable
 * claim is worse than an absent one. Structured data is the worst possible place
 * to break that rule, because an assistant repeats it verbatim and with more
 * confidence than the page had. So:
 *
 *   · Every optional field routes through `prune()`. An unsupplied value
 *     produces an ABSENT property, never a placeholder one. A missing
 *     postalCode is valid schema; "[postal code]" is a live error on the
 *     homepage and a garbage fact in somebody's index.
 *   · No `aggregateRating`, no `review`, no `award` — the awards in firm.ts are
 *     unlinked and `CREDENTIALS[1].verified` is false. An unverifiable award in
 *     schema is the §1.3 problem with a machine-readable wrapper.
 *   · `Offer` on the diagnostic carries a real price, because $5,000 is
 *     published on the page. Implementation carries a range, because the range
 *     is published. Neither invents anything.
 */

/** Drops keys whose value is empty, so an unsupplied asset is simply absent. */
function prune<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      if (v === undefined || v === null || v === '') return false;
      if (Array.isArray(v) && v.length === 0) return false;
      return true;
    }),
  ) as T;
}

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;
export const PRINCIPAL_ID = `${SITE.url}/#hamza-baig`;

/** Every other block points here rather than restating the organization. */
export const orgRef = { '@id': ORG_ID };

/**
 * Ticket 2a — Organization + ProfessionalService.
 *
 * Dual-typed. `Organization` is what entity resolution keys on; the
 * `ProfessionalService` half is a LocalBusiness subtype, which is what makes the
 * Toronto address and the service area eligible to be read as a real place of
 * business rather than as decoration on a corporate record.
 *
 * `ProfessionalService` is the accurate subtype for a diligence firm. Bare
 * `LocalBusiness` is broader than the truth and buys nothing extra.
 */
export function organizationLd() {
  return prune({
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: FIRM.name,
    alternateName: 'Hexona',
    url: SITE.url,
    /* Google uses this for the knowledge panel and the brand mark beside a
       result. The asset already existed in public/; the schema simply never
       pointed at it. */
    logo: absolute('/hexona-mark.svg'),
    image: absolute('/hexona-mark.svg'),
    slogan: FIRM.positioning,
    // Word for word the sentence a visitor reads on the homepage and on /firm.
    description: ENTITY_SENTENCE,
    foundingDate: ORIGIN.since,
    founder: { '@id': PRINCIPAL_ID },
    numberOfEmployees: { '@type': 'QuantitativeValue', value: TEAM.length },
    address: prune({
      '@type': 'PostalAddress',
      streetAddress: '18 Harbour Street',
      addressLocality: 'Toronto',
      addressRegion: 'ON',
      addressCountry: 'CA',
      // ⚠️ [ASSET NEEDED] postalCode. Absent rather than bracketed — see above.
    }),
    // Renders only once FIRM.phone is set, exactly as the footer line does.
    telephone: FIRM.phone,
    email: FIRM.email,
    areaServed: [
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'United States' },
    ],
    knowsAbout: [
      'Revenue leakage',
      'Operational diligence',
      'Process automation',
      'CRM implementation',
      'Lead response time',
      'Revenue operations',
    ],
    // Ticket 9. Empty until profiles exist — see PROFILES in content/firm.ts.
    /* ⚠️ THE ORGANISATION'S OWN PROFILES, NOT THE PRINCIPAL'S. A personal
       LinkedIn on an Organization node claims the firm and the person are the
       same entity, which is the opposite of what the Person node below is
       there to express. This was invisible while PROFILES was empty and became
       wrong the moment it was filled in. */
    sameAs: verifiedProfileUrls().filter((u) => !u.includes('/in/')),
  });
}

/**
 * The principal as a first-class Person node, linked both ways to the firm.
 *
 * Worth more here than on most sites. This firm's argument is that one person
 * has stood inside a thousand operations and knows which failure to look for
 * first — so "who is Hamza Baig" and "who runs Hexona" resolving to the same
 * graph node is not housekeeping, it is the credential.
 */
export function principalLd() {
  return prune({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PRINCIPAL_ID,
    name: PRINCIPAL.name,
    jobTitle: PRINCIPAL.role,
    worksFor: orgRef,
    // The first bio line is the plain declarative one; the rest argue.
    description: PRINCIPAL.bio[0],
    image: absolute(PRINCIPAL.portrait.src),
    // Only the principal's own profiles, never the firm's.
    sameAs: verifiedProfileUrls().filter((u) => u.includes('/in/')),
  });
}

export function webSiteLd() {
  return prune({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: FIRM.name,
    url: SITE.url,
    publisher: orgRef,
    inLanguage: 'en-CA',
  });
}

/**
 * Ticket 2b — Service, one per thing the firm sells.
 *
 * `provider` is a REFERENCE, not a copy. That reference is the edge joining the
 * service to the firm in the graph; inlining the organization here would produce
 * a second, competing description of the same company.
 */
export function diagnosticServiceLd() {
  return prune({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': absolute('/diagnostic') + '#service',
    name: DIAGNOSTIC.name,
    serviceType: 'Revenue leakage diagnostic',
    provider: orgRef,
    url: absolute('/diagnostic'),
    description:
      'A fixed-fee diagnostic that traces every path a lead can take through an operation, prices each leak against the company’s own numbers, and ranks them by recoverable dollars. Delivered as a written report, a ninety-minute readout, and a sequenced build plan.',
    areaServed: [
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'United States' },
    ],
    audience: {
      '@type': 'BusinessAudience',
      name: `Operating companies, ${FIRM.operatingRange}`,
    },
    // $5,000 is published on the page, so it is publishable here. The term
    // length is the honest one: ten business days FROM SYSTEMS ACCESS, which is
    // the anchor content/firm.ts insists on everywhere.
    offers: {
      '@type': 'Offer',
      price: String(DIAGNOSTIC.price),
      priceCurrency: DIAGNOSTIC.currency,
      availability: 'https://schema.org/InStock',
      description: `${DIAGNOSTIC.duration}. Credited in full against implementation, if you proceed.`,
    },
  });
}

export function implementationServiceLd() {
  const typical = IMPLEMENTATION.terms.find((t) => t.term === 'Typical total')?.value ?? '';
  return prune({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': absolute('/implementation') + '#service',
    name: 'Implementation',
    serviceType: 'Process automation and systems implementation',
    provider: orgRef,
    url: absolute('/implementation'),
    description:
      'Closing the leaks the diagnostic priced, in the order the report ranks them: process automation, CRM rebuilds, custom software, reporting, routing and the operational ownership around them. Fixed price per phase, and recovery measured after each phase in the system the leak was found in.',
    areaServed: [
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'United States' },
    ],
    // A range, not a price, because a range is what the page publishes. An
    // invented point price here would contradict the one honest thing the
    // pricing says: nobody knows the total before the diagnostic.
    offers: prune({
      '@type': 'Offer',
      priceCurrency: DIAGNOSTIC.currency,
      description: typical ? `${typical} across all phases, priced one phase at a time.` : '',
    }),
  });
}

/**
 * Ticket 2c — FAQPage.
 *
 * ⚠️ THE HARD RULE: the answer text here must match the visible answer on the
 * page WORD FOR WORD. Schema that does not match visible content is a manual
 * action risk with Google and is discarded outright by LLM crawlers.
 *
 * Enforced structurally rather than by discipline: every caller passes the SAME
 * array it renders, from content/faqs.ts. Never hand this function a
 * hand-written copy of the visible text.
 */
export function faqPageLd(items: { question: string; answer: string }[], url?: string) {
  return prune({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(url ? { '@id': absolute(url) + '#faq', url: absolute(url) } : {}),
    isPartOf: { '@id': WEBSITE_ID },
    publisher: orgRef,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  });
}

/**
 * Engagement records on /evidence.
 *
 * `Article` rather than `CaseStudy`, which schema.org does not define. The
 * record's own verification sentence goes in `description` because it is the
 * part §5 refuses to publish without, and it is the part a reader — or a model
 * quoting one — most needs travelling with the figures.
 */
export function recordLd(opts: {
  slug: string;
  title: string;
  description: string;
  /** Optional: a case study document does not always state one. `prune` drops
   *  datePublished entirely rather than emitting "undefined-01-01". */
  year?: string;
}) {
  const url = absolute(`/evidence/${opts.slug}`);
  return prune({
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': url + '#record',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: opts.title,
    description: opts.description,
    url,
    datePublished: opts.year ? `${opts.year}-01-01` : undefined,
    isPartOf: { '@id': WEBSITE_ID },
    publisher: orgRef,
    author: orgRef,
    about: orgRef,
  });
}

/**
 * Ticket 6 — BlogPosting, one per /insights post.
 *
 * `about` pointing at ORG_ID is not decoration. A post that declares the entity
 * it is about, using the same `@id` the homepage uses, is what turns a blog from
 * a pile of pages into corroborating evidence for one entity.
 */
export function blogPostingLd(opts: {
  headline: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  wordCount?: number;
}) {
  const url = absolute(`/insights/${opts.slug}`);
  return prune({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url + '#post',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: opts.headline,
    description: opts.description,
    url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    wordCount: opts.wordCount,
    inLanguage: 'en-CA',
    isPartOf: { '@id': WEBSITE_ID },
    publisher: orgRef,
    // The principal writes them and the firm publishes them. Both are true and
    // the distinction is the one a reader would draw.
    author: { '@id': PRINCIPAL_ID },
    about: orgRef,
  });
}

/**
 * Breadcrumbs. Cheap, and it is how a crawler learns the site's shape without
 * inferring hierarchy from the nav.
 */
export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };
}

/** Renders a JSON-LD script tag. Server components only. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
