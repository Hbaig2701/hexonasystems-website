import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PostBody } from '@/components/insights/PostBody';
import { JsonLd, blogPostingLd, breadcrumbLd } from '@/lib/jsonld';
import { PRINCIPAL } from '@/content/firm';
import { postBySlug, postWordCount, publishedPosts, readingMinutes } from '@/content/insights';
import { Breadcrumbs, delay } from '@/components/hx/Blocks';
import { LatticeCanvas } from '@/components/hx/LatticeCanvas';
import { Tilt } from '@/components/hx/Interactive';

export function generateStaticParams() {
  return publishedPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post || !post.published) return { title: 'Not found' };
  return {
    title: post.metaTitle ?? post.title,
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
  if (!post || !post.published) notFound();
  const others = publishedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);
  const published = new Date(post.datePublished + 'T00:00:00Z').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Articles', path: '/insights' },
    { name: post.title, path: `/insights/${post.slug}` },
  ];

  return (
    <div className="hx">
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
      <JsonLd data={breadcrumbLd(trail)} />

      <header className="hx-hero">
        <LatticeCanvas className="hx-hero-canvas" />
        <div className="hx-wrap pb-16 pt-12">
          <div className="mx-auto max-w-[48rem]">
            <Breadcrumbs trail={trail} />
            <p className="hx-eyebrow m-0 mb-6" data-enter="up">
              {post.category} · <time dateTime={post.datePublished}>{published}</time> · {readingMinutes(post)} min read
            </p>
            <h1 className="hx-h1 m-0" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)', ...delay(80) }} data-enter="up">
              {post.title}
            </h1>
            <p className="m-0 mt-5 text-[15px]" style={{ color: 'var(--hx-ink-3)', ...delay(140) }} data-enter="up">
              By {PRINCIPAL.name}
            </p>
            {/* The answer: first prose on the page, above the first heading. */}
            <p
              className="m-0 mt-8 rounded-2xl p-6 text-[19px] leading-relaxed"
              style={{ background: 'var(--hx-cyan-soft)', borderLeft: '4px solid var(--hx-cyan)', color: 'var(--hx-ink)', ...delay(200) }}
              data-enter="up"
            >
              {post.answer}
            </p>
          </div>
        </div>
      </header>

      <article className="hx-wrap pb-24">
        <div className="mx-auto max-w-[48rem]">
          <PostBody blocks={post.body} />
        </div>
      </article>

      {others.length > 0 && (
        <section aria-labelledby="more" style={{ background: 'var(--hx-cyan-soft)' }}>
          <div className="hx-wrap py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="more" className="hx-h2 m-0" data-enter="up">
                Also worth reading
              </h2>
              <Link href="/insights" className="hx-link">
                All articles <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {others.map((o, i) => (
                <div key={o.slug} data-enter="up" style={delay(i * 90)}>
                  <Tilt href={`/insights/${o.slug}`} max={4} className="hx-card flex h-full flex-col gap-3 no-underline" style={{ background: '#FFFFFF', color: 'var(--hx-ink)', boxShadow: 'var(--hx-shadow-1)' }}>
                    <span className="hx-kicker">{o.category}</span>
                    <span className="hx-serif text-[22px] leading-snug">{o.title}</span>
                    <span className="mt-auto pt-2 text-[15px] font-medium" style={{ color: 'var(--hx-teal)' }}>
                      Read <span aria-hidden="true">→</span>
                    </span>
                  </Tilt>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
