import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ARTICLES, categoryLabel, getArticle, wordCount } from '@/content/blog';
import { JsonLd, blogPostingLd, breadcrumbLd, faqPageLd } from '@/lib/jsonld';
import { ArticleView } from '@/components/blog/ArticleView';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.seoTitle ?? a.title,
    description: a.description,
    alternates: { canonical: `/blog/${a.slug}`, types: { 'application/rss+xml': '/blog/feed.xml' } },
    authors: [{ name: 'Hamza Baig', url: '/firm' }],
    openGraph: {
      type: 'article',
      title: a.title,
      description: a.description,
      url: `/blog/${a.slug}`,
      publishedTime: a.datePublished,
      modifiedTime: a.dateModified,
      authors: ['Hamza Baig'],
      section: categoryLabel(a.category),
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const path = `/blog/${a.slug}`;
  return (
    <>
      <JsonLd
        data={blogPostingLd({
          headline: a.title,
          description: a.description,
          slug: a.slug,
          datePublished: a.datePublished,
          dateModified: a.dateModified,
          wordCount: wordCount(a),
          section: categoryLabel(a.category),
          news: a.category === 'news',
          keywords: a.queries,
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: a.title, path },
        ])}
      />
      {a.faq.length > 0 && <JsonLd data={faqPageLd(a.faq, path)} />}
      <ArticleView article={a} />
    </>
  );
}
