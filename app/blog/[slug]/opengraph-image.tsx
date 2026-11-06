import { ARTICLES, getArticle } from '@/content/blog';
import { COVER_SIZE, coverImage } from '@/lib/cover';

export const alt = 'Hexona blog article cover';
export const size = COVER_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  return coverImage({
    title: a?.title ?? 'The Hexona blog',
    kind: a?.kind ?? 'Blog',
    cover: a?.cover ?? { style: 'type', text: 'AI for service businesses' },
  });
}
