import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';

export const alt = 'The Leakage Diagnostic from Hexona Systems';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({ eyebrow: 'The Leakage Diagnostic', title: 'Two weeks. Every leak quantified, with the system it was measured in named beside it.', note: '$5,000, credited against the build' });
}
