import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const alt = 'Hexona Systems: AI that increases enterprise value';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({ eyebrow: 'Done-for-you AI implementation', title: 'AI that increases enterprise value.', note: 'AI employees for service businesses' });
}
