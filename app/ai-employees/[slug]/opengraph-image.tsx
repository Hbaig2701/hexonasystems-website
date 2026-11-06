import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';
import { employeesWithPages, getEmployee } from '@/content/employees';

export const alt = 'Hexona Systems AI employee';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return employeesWithPages().map((e) => ({ slug: e.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getEmployee(slug);
  return ogImage({
    eyebrow: e ? `AI Employee · Moves ${e.driver}` : 'AI Employees',
    title: e?.page?.h1 ?? 'AI employees that make your business worth more.',
    note: 'Built and run by Hexona',
  });
}
