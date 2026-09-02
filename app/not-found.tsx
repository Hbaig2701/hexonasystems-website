import type { Metadata } from 'next';
import Link from 'next/link';
import { PageFrame } from '@/components/layout/PageFrame';
import { SectionEyebrow } from '@/components/layout/SectionEyebrow';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Not found',
  robots: { index: false, follow: true },
};

/**
 * 404. The old site's case-study links resolved here and it signalled neglect
 * on exactly the pages meant to build trust (§1.4). Every known dead URL now
 * 301s (§7.3) — this page exists for the unknown ones, and it points somewhere
 * useful rather than apologising.
 */
export default function NotFound() {
  return (
    <PageFrame>
      <div className="page-shell section-pad">
        <SectionEyebrow index="404" label="No such page" className="mb-14" />

        <h1 className="type-display-2 mb-8 max-w-[18ch]">
          That page isn&apos;t here.
        </h1>
        <p className="type-lead mb-12 max-w-[52ch] text-secondary">
          A seam, appropriately enough. Here are the three places worth going instead.
        </p>

        <div className="flex flex-wrap gap-4">
          <Button href="/audit" variant="primary" arrow>
            Run the Revenue Leak Audit
          </Button>
          <Button href="/work" variant="secondary">
            Case studies
          </Button>
          <Link
            href="/"
            className="type-label self-center text-tertiary transition-colors hover:text-primary"
          >
            Home →
          </Link>
        </div>
      </div>
    </PageFrame>
  );
}
