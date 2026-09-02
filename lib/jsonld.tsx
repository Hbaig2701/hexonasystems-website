import { SITE, absolute } from './site';
import { COMPANY } from '@/content/claims';

/** §10.5 — Organization, WebSite and FAQPage JSON-LD; Article on case studies. */

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.name,
    url: SITE.url,
    email: COMPANY.email,
    ...(COMPANY.phone ? { telephone: COMPANY.phone } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: '18 Harbour Street',
      addressLocality: 'Toronto',
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
    founder: { '@type': 'Person', name: 'Hamza Baig' },
    foundingDate: COMPANY.founded,
    description:
      'Hexona Systems builds the centralized operating system that runs marketing, sales, fulfillment and finance from one place, with AI embedded across functions.',
  };
}

export function webSiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: COMPANY.name,
    url: SITE.url,
  };
}

export function faqPageLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function articleLd(opts: {
  headline: string;
  description: string;
  slug: string;
  datePublished: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: absolute(`/work/${opts.slug}`),
    datePublished: opts.datePublished,
    publisher: { '@type': 'Organization', name: COMPANY.name, url: SITE.url },
    author: { '@type': 'Organization', name: COMPANY.name },
  };
}

/** Renders a JSON-LD script tag. Server components only. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
