import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';
import { getIndustry, industriesWithPages } from '@/content/industries';

export const alt = 'Hexona Systems AI employees by industry';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return industriesWithPages().map((i) => ({ slug: i.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  return ogImage({
    eyebrow: ind ? `Industries · ${ind.name}` : 'Industries',
    title: ind?.page?.h1 ?? 'Built for service businesses.',
    note: 'Built and run by Hexona',
  });
}
