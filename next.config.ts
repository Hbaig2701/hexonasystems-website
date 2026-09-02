import type { NextConfig } from 'next';

/**
 * §7.3 REDIRECTS — REQUIRED.
 *
 * The current /ai-appointment-setting and /missed-lead-capture URLs return 404
 * and must not continue to. Every currently-live URL either carries over or
 * redirects; anything else is a lost bookmark.
 *
 * ⚠️ LAUNCH GATE: crawl the live site before cutover and confirm this table is
 * exhaustive (§14, Phase 5). The e-commerce slug in particular needs its exact
 * current form verified — it is a guess until someone checks.
 */
// `statusCode: 301` rather than `permanent: true`, which would emit 308.
// §7.3 specifies 301 and these are marketing URLs where 301 is the code every
// crawler, proxy and bookmark handler has understood for twenty years.
const REDIRECTS = [
  { source: '/ai-appointment-setting', destination: '/work/missed-lead-capture', statusCode: 301 },
  { source: '/missed-lead-capture', destination: '/work/missed-lead-capture', statusCode: 301 },
  // /work/ecommerce-automation does not exist until real metrics do (§7.3), so
  // this points at the index rather than a 404.
  { source: '/e-commerce-automation', destination: '/work', statusCode: 301 },
  { source: '/ecommerce-automation', destination: '/work', statusCode: 301 },
  { source: '/solutions', destination: '/system', statusCode: 301 },
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
