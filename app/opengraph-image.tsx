import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const alt = 'Hexona Systems: operational diligence and revenue leakage diagnostics';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({ eyebrow: 'Operational diligence', title: 'The most expensive revenue is the revenue you already bought and never collected.', note: '$5,000 diagnostic' });
}
