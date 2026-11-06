import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const alt = 'Articles from Hexona Systems for owners';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({ eyebrow: 'Articles', title: 'Straight answers for owners.', note: 'hexonasystems.com' });
}
