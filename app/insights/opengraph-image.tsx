import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const alt = 'Insights from Hexona Systems on revenue leakage';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({ eyebrow: 'Insights', title: 'Written to the question, not to the keyword.', note: 'hexonasystems.com' });
}
