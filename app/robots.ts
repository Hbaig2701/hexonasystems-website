import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /styleguide is internal; /audit/results contains a visitor's own
      // business figures and has no business in an index.
      disallow: ['/styleguide', '/audit/results', '/api/'],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
