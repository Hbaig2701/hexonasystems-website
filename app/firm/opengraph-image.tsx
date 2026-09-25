import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const alt = 'About Hexona Systems, a Toronto operational diligence firm';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({ eyebrow: 'The firm', title: 'We were doing this before there was a name for it.', note: 'Toronto, since 2021' });
}
