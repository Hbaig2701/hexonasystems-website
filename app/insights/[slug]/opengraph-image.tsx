import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';
import { publishedPosts } from '@/content/insights';

export const alt = 'Hexona Systems article';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/* See the note in app/evidence/[slug]/opengraph-image.tsx: the page's
   generateStaticParams does not carry over to the image route. */
export function generateStaticParams() {
  return publishedPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = publishedPosts().find((p) => p.slug === slug);
  return ogImage({
    eyebrow: 'Article',
    title: post?.title ?? 'Straight answers for owners.',
    note: 'hexonasystems.com',
  });
}
