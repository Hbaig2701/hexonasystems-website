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
   * /blog        Blog                  →  served at /blog again (v3)
   * /get-started Get Started           →  /diagnostic
   * /programs    Programs              →  /firm
   * /general-1   A.I Appointment Setting  →  /implementation
   * /copy-of-a-i-appointment-setting  Missed Lead Capture  →  /diagnostic
   * /copy-of-missed-lead-capture      E-Commerce Automation →  /implementation
   * /copy-of-about                    Case Studies          →  /evidence
   * /challenge-page/<uuid> ×3         Online Programs       →  /firm
   * -------------------------------------------------------------------- */
  { source: '/about', destination: '/firm', statusCode: 301 },
  { source: '/solutions', destination: '/ai-employees', statusCode: 301 },
  { source: '/get-started', destination: '/book', statusCode: 301 },

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
  { source: '/general-1', destination: '/ai-employees', statusCode: 301 },

  // "Missed Lead Capture" is the symptom this firm now sells the diagnosis of,
  // so it goes to /diagnostic rather than to a build page. Someone arriving on
  // that URL has the problem, not yet the solution.
  {
    source: '/copy-of-a-i-appointment-setting',
    destination: '/book',
    statusCode: 301,
  },
  { source: '/copy-of-missed-lead-capture', destination: '/ai-employees', statusCode: 301 },
  { source: '/copy-of-about', destination: '/evidence', statusCode: 301 },

  /* --- v1 Next.js routes, all deleted by v2 ----------------------------- *
   * v1 was deployed, so these have preview URLs in the wild and were linked
   * from the v1 build. They cost two lines each and prevent a 404.
   * -------------------------------------------------------------------- */
  { source: '/system', destination: '/ai-employees', statusCode: 301 },
  { source: '/work', destination: '/evidence', statusCode: 301 },
  { source: '/work/:slug', destination: '/evidence', statusCode: 301 },
  { source: '/audit', destination: '/book', statusCode: 301 },
  { source: '/audit/results', destination: '/book', statusCode: 301 },
  { source: '/pricing', destination: '/book', statusCode: 301 },

  /* --- Slugs the Wix rename in Guide Ticket 1 would create -------------- *
   * If that rename happens on Wix before the DNS cutover, these URLs exist and
   * get indexed. Covering them makes the cutover safe in either order.
   * -------------------------------------------------------------------- */
  { source: '/case-studies', destination: '/evidence', statusCode: 301 },
  { source: '/case-studies/:slug', destination: '/evidence', statusCode: 301 },

  /* --- v3 (AI employees) ------------------------------------------------ *
   * /book is now the free-consult page, so it is no longer redirected. The
   * old intake form moves there with it.
   * -------------------------------------------------------------------- */
  { source: '/commission', destination: '/book', statusCode: 301 },
  // The diagnostic and implementation offer is retired; its pages and the
  // articles written about the product itself go to their nearest v3 page.
  { source: '/diagnostic', destination: '/ai-employees', statusCode: 301 },
  { source: '/implementation', destination: '/ai-employees', statusCode: 301 },
  { source: '/insights/how-much-does-a-leakage-diagnostic-cost', destination: '/book', statusCode: 301 },
  { source: '/insights/how-long-does-a-leakage-diagnostic-take', destination: '/book', statusCode: 301 },
  { source: '/insights/what-access-does-a-diagnostic-need', destination: '/book', statusCode: 301 },
  { source: '/insights/what-if-a-diagnostic-finds-nothing', destination: '/book', statusCode: 301 },
  { source: '/insights/operational-diligence-vs-management-consulting', destination: '/firm', statusCode: 301 },
  // v3: the articles section moved from /insights to /blog. The specific
  // retired posts above match first; everything else keeps its slug.
  { source: '/insights', destination: '/blog', statusCode: 301 },
  { source: '/insights/:slug', destination: '/blog/:slug', statusCode: 301 },

  /* --- Plausible inbound links that never existed as pages -------------- */
  { source: '/ai-appointment-setting', destination: '/ai-employees', statusCode: 301 },
  { source: '/missed-lead-capture', destination: '/book', statusCode: 301 },
  { source: '/e-commerce-automation', destination: '/ai-employees', statusCode: 301 },
  { source: '/ecommerce-automation', destination: '/ai-employees', statusCode: 301 },
  // The software's sign-in lives on the app subdomain; most inbound links and
  // "hexona login" searches expect it here (Tropika action plan, Nov 2026).
  { source: '/login', destination: 'https://app.hexonasystems.com/', statusCode: 301 },
  { source: '/contact', destination: '/book', statusCode: 301 },
  // The default Vercel host served a full duplicate of the site. Exact host
  // only, so preview deployments (…-git-….vercel.app) keep working.
  {
    source: '/:path*',
    has: [{ type: 'host' as const, value: 'hexonasystems-website.vercel.app' }],
    destination: 'https://www.hexonasystems.com/:path*',
    statusCode: 301,
  },
];

const nextConfig: NextConfig = {
  experimental: {
    // Inline the (small, Tailwind) stylesheet into each page's <head>. Two
    // reasons: no render-blocking CSS request on first load, and Microsoft
    // Clarity replays keep their styling after a redeploy. Clarity re-fetches
    // a recording's <link> stylesheet at replay time, and each deploy renames
    // it, so every session recorded before a deploy replayed unstyled.
    inlineCss: true,
  },
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
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
