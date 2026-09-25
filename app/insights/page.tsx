import type { Metadata } from 'next';
import Link from 'next/link';
import { Surface } from '@/components/ui/Surface';
import { Lattice } from '@/components/ui/Lattice';
import { SectionMarker } from '@/components/layout/SectionMarker';
import { Button, TextLink } from '@/components/ui/Button';
import { JsonLd, breadcrumbLd, orgRef, PRINCIPAL_ID, WEBSITE_ID } from '@/lib/jsonld';
import { SITE, absolute } from '@/lib/site';
import { DIAGNOSTIC } from '@/content/firm';
import { publishedPosts, readingMinutes } from '@/content/insights';

/**
 * /insights — AI SEO Developer Guide, Ticket 6.
 *
 * The Wix site had a /blog URL with nothing behind it; v2 did not have the URL.
 * /blog and /blog/:slug 301 here, so the guide's acceptance criterion is met.
 *
 * TEXT, NOT CARDS. Each row leads with the question and then prints the whole
 * answer. A reader can get what they came for without a click, which is the
 * correct trade on a site whose argument is that it does not waste anyone's time
 * — and it is also what an extractive model reads, since the index page is
 * frequently the one that gets fetched.
 */

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Straight answers on revenue leakage, operational diligence and what it costs to close a leak. Each one answers its question in the first hundred words.',
  alternates: { canonical: '/insights' },
};

export default function InsightsPage() {
  const posts = publishedPosts();

  const blogLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE.url}/insights#blog`,
    name: 'Hexona Insights',
    url: absolute('/insights'),
    description:
      'Straight answers on revenue leakage, operational diligence and what it costs to close a leak.',
    publisher: orgRef,
    author: { '@id': PRINCIPAL_ID },
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'en-CA',
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      '@id': absolute(`/insights/${post.slug}`) + '#post',
      headline: post.title,
      url: absolute(`/insights/${post.slug}`),
      datePublished: post.datePublished,
    })),
  };

  return (
    <>
      <JsonLd data={blogLd} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/insights' },
        ])}
      />

      {/* --- Opening ------------------------------------------------------- */}
      <Surface surface="void" rule={false} as="header" className="hex-stage">
        <Lattice />
        <div className="shell">
          <div className="col-12">
            <div className="[grid-column:1/9]">
              <p className="t-label mb-14 text-fg-3">
                <span className="text-brand">Hexona Systems</span>
                <span className="px-1.5 text-brand opacity-50">·</span> Insights
              </p>
              <h1 className="t-display-1 mb-12">
                Written to the question,
                <br className="hidden sm:inline" />
                not to the keyword.
              </h1>
              <p className="t-lead max-w-[58ch] text-fg-2">
                Each one answers what it asks in the first hundred words, shows its arithmetic, and
                says plainly where a figure depends on your own numbers rather than inventing an
                average.
              </p>
            </div>
          </div>
        </div>
      </Surface>

      {/* --- The index ----------------------------------------------------- */}
      <Surface surface="paper">
        <div className="shell">
          <SectionMarker index="01" label="All insights" className="mb-14" />

          {posts.length === 0 ? (
            <p className="t-body text-fg-2">Nothing published yet.</p>
          ) : (
            <div className="border-t border-line">
              {posts.map((post, i) => (
                <article
                  key={post.slug}
                  className="border-b border-line py-9"
                  data-enter
                  style={{ ['--enter-delay' as string]: `${Math.min(i, 6) * 50}ms` }}
                >
                  <div className="col-12 gap-y-4">
                    <p className="t-label [grid-column:1/3] text-fg-3">
                      <span className="text-brand">{String(i + 1).padStart(2, '0')}</span>
                      <span className="px-1.5 text-brand opacity-50">·</span>
                      {post.category}
                    </p>
                    <div className="[grid-column:3/13]">
                      <h2 className="t-display-2 mb-4 max-w-[34ch]">
                        <Link href={`/insights/${post.slug}`} className="link">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="t-small mb-3 max-w-[70ch] text-fg-2">{post.answer}</p>
                      <p className="t-label text-fg-3">{readingMinutes(post)} min read</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </Surface>

      {/* --- Close --------------------------------------------------------- */}
      <Surface surface="void" className="hex-stage">
        <Lattice />
        <div className="shell">
          <div className="col-12">
            <div className="[grid-column:1/9]">
              <h2 className="t-display-1 mb-16">
                Or have it measured
                <br className="hidden sm:inline" />
                in your own systems.
              </h2>
              <div className="flex flex-col items-start gap-8">
                <Button href="/commission">
                  Commission a diagnostic <span aria-hidden="true">→</span>{' '}
                  {DIAGNOSTIC.priceFormatted}
                </Button>
                <TextLink href="/diagnostic#discuss">Discuss it first</TextLink>
              </div>
            </div>
          </div>
        </div>
      </Surface>
    </>
  );
}
