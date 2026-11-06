import type { Metadata } from 'next';
import { JsonLd, breadcrumbLd, orgRef, PRINCIPAL_ID, WEBSITE_ID } from '@/lib/jsonld';
import { SITE, absolute } from '@/lib/site';
import { publishedPosts, readingMinutes } from '@/content/insights';
import { PageHero } from '@/components/hx/PageHero';
import { Tilt } from '@/components/hx/Interactive';
import { CtaPair, delay } from '@/components/hx/Blocks';

/**
 * /insights — Articles. The URL is kept because the posts under it are
 * indexed. Every post answers its title question in the first hundred words.
 */

const DESCRIPTION =
  'Straight answers for owners on AI employees, revenue you are losing, and what makes a business worth more. Each one answers its question in the first hundred words.';

export const metadata: Metadata = {
  title: 'Articles',
  description: DESCRIPTION,
  alternates: { canonical: '/insights' },
};

export default function InsightsPage() {
  const posts = publishedPosts();
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Articles', path: '/insights' },
  ];
  const blogLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE.url}/insights#blog`,
    name: 'Hexona Articles',
    url: absolute('/insights'),
    description: DESCRIPTION,
    publisher: orgRef,
    author: { '@id': PRINCIPAL_ID },
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'en-US',
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      '@id': absolute(`/insights/${post.slug}`) + '#post',
      headline: post.title,
      url: absolute(`/insights/${post.slug}`),
      datePublished: post.datePublished,
    })),
  };

  const [lead, ...rest] = posts;

  return (
    <div className="hx">
      <JsonLd data={blogLd} />
      <JsonLd data={breadcrumbLd(trail)} />

      <PageHero
        trail={trail}
        eyebrow="Articles"
        title={
          <>
            Straight answers for <span className="hx-mark">owners.</span>
          </>
        }
        answer="Plain-English answers on AI employees, the revenue a business is quietly losing, and what makes it worth more. Each article answers its question in the first hundred words."
      >
        <CtaPair />
      </PageHero>

      <section aria-label="All articles" className="hx-wrap pb-28">
        {lead && (
          <div data-enter="up">
            <Tilt
              href={`/insights/${lead.slug}`}
              max={2}
              className="hx-card grid gap-8 no-underline md:grid-cols-[1.2fr_0.8fr]"
              style={{ background: 'var(--hx-teal)', color: '#FFFFFF', padding: 40 }}
            >
              <span>
                <span className="hx-kicker" style={{ color: 'var(--hx-cyan-light)' }}>
                  {lead.category} · {readingMinutes(lead)} min read
                </span>
                <span className="hx-serif mt-4 block text-[clamp(1.75rem,3vw,2.5rem)] leading-tight">{lead.title}</span>
              </span>
              <span className="flex flex-col justify-between gap-6">
                <span className="text-[17px] leading-relaxed" style={{ color: 'var(--hx-on-teal)' }}>
                  {lead.description}
                </span>
                <span className="font-medium" style={{ color: 'var(--hx-cyan-light)' }}>
                  Read the article <span aria-hidden="true">→</span>
                </span>
              </span>
            </Tilt>
          </div>
        )}

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <div key={post.slug} data-enter="up" style={delay((i % 3) * 90)}>
              <Tilt
                href={`/insights/${post.slug}`}
                max={4}
                className="hx-card flex h-full flex-col gap-3 no-underline"
                style={{ background: i % 2 ? 'var(--hx-mist)' : 'var(--hx-cyan-soft)', color: 'var(--hx-ink)' }}
              >
                <span className="hx-kicker">
                  {post.category} · {readingMinutes(post)} min read
                </span>
                <span className="hx-serif text-[24px] leading-snug">{post.title}</span>
                <span className="text-[15px] leading-relaxed" style={{ color: 'var(--hx-ink-2)' }}>
                  {post.description}
                </span>
                <span className="mt-auto pt-3 text-[15px] font-medium" style={{ color: 'var(--hx-teal)' }}>
                  Read <span aria-hidden="true">→</span>
                </span>
              </Tilt>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
