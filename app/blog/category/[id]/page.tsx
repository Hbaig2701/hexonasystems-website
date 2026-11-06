import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CATEGORIES, articlesIn } from '@/content/blog';
import type { CategoryId } from '@/content/blog/types';
import { JsonLd, breadcrumbLd } from '@/lib/jsonld';
import { PageHero } from '@/components/hx/PageHero';
import { CtaPair } from '@/components/hx/Blocks';
import { ArticleCard } from '@/components/blog/ArticleView';
import { CategoryNav } from '@/components/blog/CategoryNav';

/** A category index only exists once it has an article. */
export function generateStaticParams() {
  return CATEGORIES.filter((c) => articlesIn(c.id).length > 0).map((c) => ({ id: c.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const c = CATEGORIES.find((x) => x.id === id);
  if (!c) return {};
  return { title: `${c.label}: Hexona Blog`, description: c.blurb, alternates: { canonical: `/blog/category/${c.id}` } };
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = CATEGORIES.find((x) => x.id === id);
  if (!c) notFound();
  const list = articlesIn(c.id as CategoryId);
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: c.label, path: `/blog/category/${c.id}` },
  ];
  return (
    <div className="hx">
      <JsonLd data={breadcrumbLd(trail)} />
      <PageHero trail={trail} eyebrow="Blog" title={c.label} answer={c.blurb}>
        <CtaPair />
      </PageHero>
      <section aria-label={c.label} className="hx-wrap pb-28">
        <CategoryNav active={c.id} />
        <div className="grid gap-6 md:grid-cols-3">
          {list.map((a, i) => (
            <ArticleCard key={a.slug} article={a} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
