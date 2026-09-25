import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';
import { CASE_STUDIES, RECORDS } from '@/content/evidence';

export const alt = 'Hexona Systems case study';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/**
 * One card per case study. The title IS the finding, which is the whole reason
 * these pages are worth sharing, so the card carries it rather than the sector.
 *
 * ⚠️ A PROJECTED STUDY MUST NOT SHOW A RESULT HERE EITHER. The note carries
 * "Final results in progress" instead of a figure, for the same reason the
 * table cell and the record page do. A card is the most decontextualised
 * surface the site has: it travels into a Slack channel with nothing around it.
 */
/* Without this the card is a ƒ route: rendered on demand, which means a
   function invocation every time a crawler or a Slack unfurl asks for it.
   The page's own generateStaticParams does not carry over, because the image
   is a separate route. */
export function generateStaticParams() {
  return [
    ...CASE_STUDIES.map((c) => ({ slug: c.slug })),
    ...RECORDS.map((r) => ({ slug: r.slug })),
  ];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((c) => c.slug === slug);
  const record = RECORDS.find((r) => r.slug === slug);

  if (study) {
    return ogImage({
      eyebrow: study.sector,
      title: study.title,
      note:
        study.basis === 'measured'
          ? `${study.headline.figure} · ${study.headline.label.toLowerCase()}`
          : 'Final results in progress',
    });
  }
  if (record) {
    return ogImage({
      eyebrow: record.sector,
      title: record.title,
      note: `${record.sealed} sealed`,
    });
  }
  return ogImage({ eyebrow: 'Case studies', title: 'A series of transformed organisations.' });
}
