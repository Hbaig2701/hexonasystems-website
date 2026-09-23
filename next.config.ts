import type { NextConfig } from 'next';

/**
 * REDIRECTS — AI SEO Developer Guide, Ticket 1.
 *
 * ⚠️ THIS TABLE WAS BROKEN AND SHIPPED. Every entry below the line was written
 * for v1 and pointed at /work/* and /system. v2 deleted both routes, so five
 * live redirects were 301-ing visitors and crawlers into 404s. A redirect to a
 * dead route is strictly worse than no redirect: it launders a 404 through a
 * signal that says "this moved, follow me", and a crawler that follows it drops
 * the original URL from its index and gains nothing.
 *
 * ✅ REBUILT FROM A LIVE CRAWL. The old-URL half is not guesswork. It comes from
 * the live Wix sitemaps, fetched 2026-09-05:
 *
 *     https://www.hexonasystems.com/pages-sitemap.xml
 *     https://www.hexonasystems.com/online-programs-sitemap.xml
 *
 * Two corrections to the guide, which was written against a stale reading:
 *
 *   1. It says /programs "is linked in the footer but has no matching page".
 *      It returns 200 and serves a real Programs page.
 *   2. It misses /copy-of-about entirely, which serves the Case Studies page.
 *      That is a FOURTH unedited default slug, not three. Following the guide as
 *      written would have left it 404ing at cutover.
 *
 * ⚠️ RE-CRAWL BEFORE CUTOVER. This was exhaustive on 2026-09-05. If the Wix site
 * gains a page before the DNS switch, add it here and to scripts/check-seo.mjs
 * together — that script asserts every URL below is still covered.
 */
// `statusCode: 301` rather than `permanent: true`, which would emit 308. These
// are marketing URLs, and 301 is the code every crawler, proxy and bookmark
// handler has understood for twenty years.
const REDIRECTS = [
  /* --- Live Wix URLs, verified 2026-09-05 ------------------------------- *
   * /            Home                     carries over
   * /about       About                 →  /firm
   * /incubator   Incubator             →  /firm
   * /solutions   Solutions             →  /implementation
   * /blog        Blog                  →  /insights
   * /get-started Get Started           →  /diagnostic
   * /programs    Programs              →  /firm
   * /general-1   A.I Appointment Setting  →  /implementation
   * /copy-of-a-i-appointment-setting  Missed Lead Capture  →  /diagnostic
   * /copy-of-missed-lead-capture      E-Commerce Automation →  /implementation
   * /copy-of-about                    Case Studies          →  /evidence
   * /challenge-page/<uuid> ×3         Online Programs       →  /firm
   * -------------------------------------------------------------------- */
  { source: '/about', destination: '/firm', statusCode: 301 },
  { source: '/solutions', destination: '/implementation', statusCode: 301 },
  { source: '/blog', destination: '/insights', statusCode: 301 },
  { source: '/blog/:slug', destination: '/insights/:slug', statusCode: 301 },
  { source: '/get-started', destination: '/diagnostic', statusCode: 301 },

  // The Automation Institute moves to a separate property under §1.2, so both
  // of its old URLs land on /firm, which is where the community and the
  // operators-trained figure now live. Repoint these the day that property
  // exists — they are the only inbound links it will start with.
  { source: '/incubator', destination: '/firm', statusCode: 301 },
  { source: '/programs', destination: '/firm', statusCode: 301 },
  { source: '/challenge-page/:id', destination: '/firm', statusCode: 301 },

  // /general-1 serves "A.I Appointment Setting" — a capability page. v2's
  // capability page is /implementation, where lead capture, routing and
  // follow-up are the first BUILDS entry.
  { source: '/general-1', destination: '/implementation', statusCode: 301 },

  // "Missed Lead Capture" is the symptom this firm now sells the diagnosis of,
  // so it goes to /diagnostic rather than to a build page. Someone arriving on
  // that URL has the problem, not yet the solution.
  {
    source: '/copy-of-a-i-appointment-setting',
    destination: '/diagnostic',
    statusCode: 301,
  },
  { source: '/copy-of-missed-lead-capture', destination: '/implementation', statusCode: 301 },
  { source: '/copy-of-about', destination: '/evidence', statusCode: 301 },

  /* --- v1 Next.js routes, all deleted by v2 ----------------------------- *
   * v1 was deployed, so these have preview URLs in the wild and were linked
   * from the v1 build. They cost two lines each and prevent a 404.
   * -------------------------------------------------------------------- */
  { source: '/system', destination: '/implementation', statusCode: 301 },
  { source: '/work', destination: '/evidence', statusCode: 301 },
  { source: '/work/:slug', destination: '/evidence', statusCode: 301 },
  { source: '/audit', destination: '/diagnostic', statusCode: 301 },
  { source: '/audit/results', destination: '/diagnostic', statusCode: 301 },
  { source: '/book', destination: '/diagnostic', statusCode: 301 },
  { source: '/pricing', destination: '/diagnostic', statusCode: 301 },

  /* --- Slugs the Wix rename in Guide Ticket 1 would create -------------- *
   * If that rename happens on Wix before the DNS cutover, these URLs exist and
   * get indexed. Covering them makes the cutover safe in either order.
   * -------------------------------------------------------------------- */
  { source: '/case-studies', destination: '/evidence', statusCode: 301 },
  { source: '/case-studies/:slug', destination: '/evidence', statusCode: 301 },

  /* --- Plausible inbound links that never existed as pages -------------- */
  { source: '/ai-appointment-setting', destination: '/implementation', statusCode: 301 },
  { source: '/missed-lead-capture', destination: '/diagnostic', statusCode: 301 },
  { source: '/e-commerce-automation', destination: '/implementation', statusCode: 301 },
  { source: '/ecommerce-automation', destination: '/implementation', statusCode: 301 },
];

const nextConfig: NextConfig = {
  async redirects() {
    return REDIRECTS;
  },

  images: {
    // §10.3 — AVIF with WebP fallback.
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
