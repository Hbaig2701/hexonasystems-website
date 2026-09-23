import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

/**
 * robots.txt — AI SEO Developer Guide, Ticket 3.
 *
 * v2 shipped without this file, so the site served no robots.txt at all. That is
 * not neutral: with no Sitemap directive, discovery falls back entirely to
 * crawling internal links, and this site is six pages with no external inbound
 * links yet.
 *
 * ONE PERMISSIVE WILDCARD, DELIBERATELY. Per-agent groups are the common and
 * expensive mistake here: the moment one exists, a bot matching it stops reading
 * the wildcard group entirely, so every Disallow below is silently dropped for
 * that agent. A single `User-agent: *` group is both more permissive and much
 * harder to get wrong.
 *
 * AI CRAWLERS — all of the following are covered by the wildcard and MUST NOT be
 * given a Disallow rule. Blocking any of them removes this firm from the model
 * that answers "operational diligence firm in Toronto", which is the whole point
 * of the exercise:
 *
 *   GPTBot             OpenAI training + browsing
 *   OAI-SearchBot      ChatGPT search index
 *   ChatGPT-User       ChatGPT live fetch
 *   ClaudeBot          Anthropic crawler
 *   Claude-User        Claude live fetch
 *   PerplexityBot      Perplexity index
 *   Google-Extended    Gemini / AI Overviews
 *   Applebot-Extended  Apple Intelligence
 *   CCBot              Common Crawl, which feeds many models
 *
 * VERIFIED ON THE LIVE WIX SITE, 2026-09-05: hexonasystems.com/robots.txt
 * disallows only `*?lightbox=` and PetalBot. Not one agent above is blocked
 * today, so the cutover is like-for-like on AI access rather than a change that
 * needs watching.
 *
 * `npm run check:seo` fails if any agent above appears in executable code here.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The internal component library. Nothing else is excluded, because
      // nothing else on this site is anything other than the argument.
      disallow: ['/styleguide'],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
