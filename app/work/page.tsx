import type { Metadata } from 'next';
import { PageFrame } from '@/components/layout/PageFrame';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { WorkIndex } from '@/components/work/WorkIndex';
import { publishedCases } from '@/content/cases';

/**
 * /work — CASE STUDIES INDEX. §7.3.
 *
 * Filterable by industry. Each card: a mono industry tag, the headline metric
 * at display size, a one-line problem statement, hover reveals the full result
 * set. TEXT, NOT IMAGES — the current site's image-based testimonials are
 * invisible to search and to skimmers.
 */

export const metadata: Metadata = {
  title: 'Case studies',
  description:
    'What sealing the gap actually did. Response time, lead drop-off and recovered revenue, measured and shown with the arithmetic.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  const cases = publishedCases();

  return (
    <PageFrame>
      <div className="page-shell pb-24 pt-24 md:pt-32">
        <div className="relative mb-20">
          <div className="glow-hero" aria-hidden="true" />
          <SectionHeading
            eyebrow="Case studies"
            as="h1"
            size="display-1"
            sub="Relive the impact Hexona has made. Every case is measured against revenue, not hours saved. Where a number isn't confirmed yet, it says so rather than rounding into something vague."
            className="relative"
          >
            Learn from History
          </SectionHeading>
        </div>

        <Reveal>
          <WorkIndex cases={cases} />
        </Reveal>
      </div>
    </PageFrame>
  );
}
