import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { allPublished } from '@/content/evidence';
import { publishedPosts } from '@/content/insights';

/**
 * sitemap.xml — AI SEO Developer Guide, Ticket 3 and Ticket 6.
 *
 * v2 shipped without this file too, so there was no sitemap for robots.txt to
 * point at.
 *
 * ONLY ROUTES THAT EXIST. The case study and post lists are derived from the
 * content modules rather than typed out, so an unpublished record cannot leak
 * into the sitemap and a published post cannot be forgotten. That matters more
 * here than usual: RECORDS is empty by design under §5, and a sitemap listing
 * /evidence/<slug> for a record that does not exist yet would advertise 404s to
 * every crawler that reads it. `allPublished()` covers both classes, so adding
 * either one is enough and neither can be forgotten here.
 *
 * ⚠️ /method, /terms and /privacy are DELIBERATELY ABSENT. The header and footer
 * link to all three and none of them exists — see the note in
 * SEO-IMPLEMENTATION.md. They go in here when the pages do, not before.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '/', priority: 1 },
    { path: '/diagnostic', priority: 0.9 },
    { path: '/implementation', priority: 0.8 },
    { path: '/evidence', priority: 0.7 },
    { path: '/insights', priority: 0.7 },
    { path: '/firm', priority: 0.6 },
  ];

  return [
    ...routes.map((route) => ({
      url: `${SITE.url}${route.path}`,
      lastModified: new Date(),
      priority: route.priority,
    })),
    ...allPublished().map((entry) => ({
      url: `${SITE.url}/evidence/${entry.slug}`,
      lastModified: new Date(),
      priority: 0.6,
    })),
    ...publishedPosts().map((post) => ({
      url: `${SITE.url}/insights/${post.slug}`,
      // A real date from the post itself. `new Date()` on every build tells
      // crawlers everything changed on every deploy, which trains them to
      // ignore the field entirely.
      lastModified: new Date(`${post.dateModified ?? post.datePublished}T00:00:00Z`),
      priority: 0.5,
    })),
  ];
}
