import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { publishedCases } from '@/content/cases';

/**
 * §10.5 — sitemap.
 * Only routes that exist. /insights ships in Phase 7 and is deliberately absent
 * until then; nothing in Phases 1–6 may reference a route that does not exist.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '/', priority: 1 },
    { path: '/audit', priority: 0.9 },
    { path: '/system', priority: 0.8 },
    { path: '/work', priority: 0.8 },
    { path: '/about', priority: 0.7 },
    { path: '/book', priority: 0.6 },
    { path: '/privacy', priority: 0.2 },
    { path: '/terms', priority: 0.2 },
  ];

  return [
    ...routes.map((route) => ({
      url: `${SITE.url}${route.path}`,
      lastModified: new Date(),
      priority: route.priority,
    })),
    ...publishedCases().map((study) => ({
      url: `${SITE.url}/work/${study.slug}`,
      lastModified: new Date(),
      priority: 0.7,
    })),
  ];
}
