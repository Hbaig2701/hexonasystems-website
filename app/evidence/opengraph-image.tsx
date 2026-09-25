import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const alt = 'Hexona Systems case studies across six industries';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({ eyebrow: 'Case studies', title: 'A series of transformed organisations.', note: 'Ten records, six industries' });
}
