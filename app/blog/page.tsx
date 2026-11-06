import type { Metadata } from 'next';
import { ARTICLES } from '@/content/blog';
import { CategoryNav } from '@/components/blog/CategoryNav';
import { JsonLd, breadcrumbLd, orgRef, PRINCIPAL_ID, WEBSITE_ID } from '@/lib/jsonld';
import { absolute } from '@/lib/site';
import { PageHero } from '@/components/hx/PageHero';
import { CtaPair } from '@/components/hx/Blocks';
import { ArticleCard } from '@/components/blog/ArticleView';

const DESCRIPTION =
  'Straight answers for owners of service businesses: what AI receptionists and automation cost, how to stop losing leads, what makes a business worth more, and the AI news that matters this week.';

export const metadata: Metadata = {
  title: 'Blog: AI for Service Businesses',
  description: DESCRIPTION,
  alternates: { canonical: '/blog', types: { 'application/rss+xml': '/blog/feed.xml' } },
};

export default function BlogPage() {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
  ];
  const ld = {
    '@context': 'https://schema.org',
    '@type': ['Blog', 'CollectionPage'],
    '@id': absolute('/blog') + '#blog',
    name: 'The Hexona blog',
    url: absolute('/blog'),
    description: DESCRIPTION,
    publisher: orgRef,
    author: { '@id': PRINCIPAL_ID },
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'en-US',
    blogPost: ARTICLES.slice(0, 30).map((a) => ({
      '@type': 'BlogPosting',
      '@id': absolute(`/blog/${a.slug}`) + '#post',
      headline: a.title,
      url: absolute(`/blog/${a.slug}`),
      datePublished: a.datePublished,
    })),
  };
  const [lead, ...rest] = ARTICLES;

  return (
    <div className="hx">
      <JsonLd data={ld} />
      <JsonLd data={breadcrumbLd(trail)} />
      <PageHero
        trail={trail}
        eyebrow="Blog"
        title={
          <>
            Straight answers for <span className="hx-mark">owners.</span>
          </>
        }
        answer="What AI receptionists and automation really cost, how to stop losing leads you already paid for, what makes a service business worth more, and the AI news that matters this week. Every article answers its question in the first two sentences."
      >
        <CtaPair secondary={{ label: 'Get your Value Score', href: '/score' }} />
      </PageHero>

      <section aria-label="Articles" className="hx-wrap pb-28">
        <CategoryNav />
        <div className="grid gap-6 md:grid-cols-3">
          {lead && <ArticleCard article={lead} index={0} featured />}
          {rest.map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={i + 1} />
          ))}
        </div>
        <p className="m-0 mt-10 text-[15px]" style={{ color: 'var(--hx-ink-3)' }}>
          Follow along with the <a href="/blog/feed.xml" className="hx-link">RSS feed</a>.
        </p>
      </section>
    </div>
  );
}
