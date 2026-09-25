import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const alt = 'Implementation: Hexona Systems builds what the diagnostic found';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({ eyebrow: 'Implementation', title: 'Finding it is the cheap part. Sealing it is the work.', note: '$15,000 to $75,000' });
}
