import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Surface } from '@/components/ui/Surface';
import { Lattice } from '@/components/ui/Lattice';
import { SectionMarker } from '@/components/layout/SectionMarker';
import { Button, TextLink } from '@/components/ui/Button';
import { PostBody } from '@/components/insights/PostBody';
import { JsonLd, blogPostingLd, breadcrumbLd } from '@/lib/jsonld';
import { DIAGNOSTIC, PRINCIPAL } from '@/content/firm';
import { POSTS, postBySlug, postWordCount, publishedPosts, readingMinutes } from '@/content/insights';

/**
 * /insights/[slug] — AI SEO Developer Guide, Ticket 6.
 *
 * THE STANDFIRST IS THE POINT. `post.answer` renders above everything, in lead
 * type, before the first heading. Ticket 6 requires each post to answer its title
 * question within the first hundred words, and holding the answer in its own
 * field enforces that structurally instead of trusting a writer to remember:
 * it cannot drift down the page as the post gets edited, and
 * `npm run check:seo` fails the build if it is missing, over 100 words, or if the
 * post is under 800 words.
 *
 * It is also the passage an extractive model will quote. A post that spends three
 * paragraphs clearing its throat gets quoted saying nothing.
 */

export function generateStaticParams() {
  return POSTS.filter((p) => p.published).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return { title: 'Not found' };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: `/insights/${post.slug}`,
      publishedTime: post.datePublished,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const others = publishedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const published = new Date(post.datePublished + 'T00:00:00Z').toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <>
      <JsonLd
        data={blogPostingLd({
          headline: post.title,
          description: post.description,
          slug: post.slug,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          wordCount: postWordCount(post),
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/insights' },
          { name: post.title, path: `/insights/${post.slug}` },
        ])}
      />

      {/* --- Opening ------------------------------------------------------- */}
      <Surface surface="void" rule={false} as="header" className="hex-stage">
        <Lattice />
        <div className="shell">
          <div className="col-12">
            <div className="[grid-column:1/10]">
              <p className="t-label mb-14 text-fg-3">
                <span className="text-brand">{post.category}</span>
                <span className="px-1.5 text-brand opacity-50">·</span>
                <time dateTime={post.datePublished}>{published}</time>
                <span className="px-1.5 text-brand opacity-50">·</span>
                {readingMinutes(post)} min read
              </p>
              <h1 className="t-display-1 mb-12 max-w-[26ch]">{post.title}</h1>
              {/* The answer. First prose on the page, above the first heading. */}
              <p className="t-lead max-w-[64ch] border-l border-brand pl-6 text-fg">
                {post.answer}
              </p>
            </div>
          </div>
        </div>
      </Surface>

      {/* --- The body ------------------------------------------------------ */}
      <Surface surface="paper" as="article">
        <div className="shell">
          <div className="col-12">
            <div className="[grid-column:1/10]">
              <PostBody blocks={post.body} />
            </div>
          </div>
        </div>
      </Surface>

      {/* --- Also worth reading -------------------------------------------- */}
      {others.length > 0 && (
        <Surface surface="void" className="hex-stage">
          <Lattice />
          <div className="shell">
            <SectionMarker index="02" label="Also worth reading" className="mb-14" />
            <div className="col-12">
              <div className="[grid-column:1/10] border-t border-line">
                {others.map((other) => (
                  <p key={other.slug} className="t-body border-b border-line py-5">
                    <Link href={`/insights/${other.slug}`} className="link">
                      {other.title}
                    </Link>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Surface>
      )}

      {/* --- Close --------------------------------------------------------- */}
      <Surface surface="paper">
        <div className="shell">
          <div className="col-12">
            <div className="[grid-column:1/9]">
              <h2 className="t-display-1 mb-8">
                Reading about it is
                <br className="hidden sm:inline" />
                cheaper than measuring it.
              </h2>
              <p className="t-body mb-16 max-w-[56ch] text-fg-2">
                Not by much, and only once. {PRINCIPAL.name} leads every engagement, and the report
                will tell you in its first paragraph if the leakage is immaterial.
              </p>
              <div className="flex flex-col items-start gap-8">
                <Button href="/commission">
                  Commission a diagnostic <span aria-hidden="true">→</span>{' '}
                  {DIAGNOSTIC.priceFormatted}
                </Button>
                <TextLink href="/insights">All insights</TextLink>
              </div>
            </div>
          </div>
        </div>
      </Surface>
    </>
  );
}
