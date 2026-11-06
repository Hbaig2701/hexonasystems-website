import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { allPublished } from '@/content/evidence';
import { ARTICLES, CATEGORIES, articlesIn } from '@/content/blog';
import { employeesWithPages } from '@/content/employees';
import { industriesWithPages } from '@/content/industries';

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
 * ⚠️ /method is DELIBERATELY ABSENT: the route does not exist — see the note
 * in SEO-IMPLEMENTATION.md. It goes in here when the page does, not before.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '/', priority: 1 },
    { path: '/ai-employees', priority: 0.9 },
    { path: '/industries', priority: 0.8 },
    { path: '/book', priority: 0.8 },
    ...employeesWithPages().map((e) => ({ path: `/ai-employees/${e.slug}`, priority: 0.9 })),
    ...industriesWithPages().map((i) => ({ path: `/industries/${i.slug}`, priority: 0.8 })),
    { path: '/evidence', priority: 0.7 },
    { path: '/blog', priority: 0.8 },
    ...CATEGORIES.filter((c) => articlesIn(c.id).length > 0).map((c) => ({ path: `/blog/category/${c.id}`, priority: 0.5 })),
    { path: '/firm', priority: 0.6 },
    { path: '/terms', priority: 0.2 },
    { path: '/privacy', priority: 0.2 },
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
    ...ARTICLES.map((a) => ({
      url: `${SITE.url}/blog/${a.slug}`,
      lastModified: new Date(`${a.dateModified}T00:00:00Z`),
      priority: a.category === 'news' ? 0.6 : 0.7,
      images: [`${SITE.url}/blog/${a.slug}/opengraph-image`],
    })),
  ];
}
