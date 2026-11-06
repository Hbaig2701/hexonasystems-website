import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const alt = 'The Enterprise Value Score from Hexona Systems';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({ eyebrow: 'Free · About 5 minutes', title: 'Would a buyer want your business today?', note: 'The Enterprise Value Score' });
}
