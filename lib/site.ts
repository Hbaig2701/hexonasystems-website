/**
 * ⚠️ THIS MUST BE THE HOST THE SITE ACTUALLY SERVES, INCLUDING THE www.
 *
 * It was `https://hexonasystems.com` and the site serves `www`, with Vercel
 * 308-ing the apex across. `NEXT_PUBLIC_SITE_URL` is not set in the Vercel
 * project, so the fallback was what shipped — and this one constant feeds
 * `metadataBase`, every canonical, every og:url, every sitemap entry, the
 * Sitemap line in robots.txt, and every `@id` in the structured-data graph.
 *
 * So every one of those pointed at a host that immediately redirects. The
 * Semrush audit of 2026-09-26 caught the visible half of it — "25 incorrect
 * pages found in sitemap.xml", all of them Issue Type: Redirect — but the
 * sitemap was the least of it. A canonical tag naming a redirecting host asks
 * every crawler to resolve the site's identity for itself, and splits the
 * signals between two hosts while it decides.
 *
 * The default is now the real host rather than the env var, deliberately: the
 * env var was already absent once, silently, in production. Setting
 * NEXT_PUBLIC_SITE_URL in Vercel still overrides this for previews and for a
 * future domain change, but nothing depends on it being remembered.
 *
 * IF THE PRIMARY DOMAIN EVER CHANGES — apex instead of www, or a new domain —
 * change it here and in scripts/check-seo.mjs, which asserts the two agree.
 */
export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.hexonasystems.com',
  name: 'Hexona Systems',
  locale: 'en_CA',
} as const;

/** Absolute URL helper — OG images and JSON-LD both need one. */
export function absolute(path: string): string {
  return new URL(path, SITE.url).toString();
}
