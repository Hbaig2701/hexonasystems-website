import { ARTICLES, categoryLabel } from '@/content/blog';
import { SITE, absolute } from '@/lib/site';

export const dynamic = 'force-static';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** RSS 2.0 for the blog, newest first. Linked from every blog page's <head>. */
export function GET() {
  const items = ARTICLES.slice(0, 50)
    .map((a) => {
      const url = absolute(`/blog/${a.slug}`);
      return `    <item>
      <title>${esc(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(a.description)}</description>
      <category>${esc(categoryLabel(a.category))}</category>
      <pubDate>${new Date(a.datePublished + 'T12:00:00Z').toUTCString()}</pubDate>
      <dc:creator>Hamza Baig</dc:creator>
      <enclosure url="${absolute(`/blog/${a.slug}/opengraph-image`)}" type="image/png" length="0" />
    </item>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Hexona blog</title>
    <link>${absolute('/blog')}</link>
    <atom:link href="${absolute('/blog/feed.xml')}" rel="self" type="application/rss+xml" />
    <description>AI for service businesses: costs, playbooks, business value and this week's AI news.</description>
    <language>en-us</language>
    <copyright>Hexona Systems</copyright>
    <lastBuildDate>${new Date((ARTICLES[0]?.dateModified ?? '2026-11-06') + 'T12:00:00Z').toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'X-Site': SITE.name } });
}
