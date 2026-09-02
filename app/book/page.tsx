import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageFrame } from '@/components/layout/PageFrame';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { BookingFlow } from '@/components/book/BookingFlow';

/**
 * /book — §7.6.
 * NOT a bare calendar embed. Three qualifying questions first, then the
 * calendar. Answers pass through to the CRM so Hamza walks into the call
 * already knowing the shape of the business.
 */

export const metadata: Metadata = {
  title: 'Book a systems review',
  description:
    'Thirty minutes. We map your gaps live. If there isn’t enough leakage to justify a build, we’ll say so.',
  alternates: { canonical: '/book' },
};

export default function BookPage() {
  return (
    <PageFrame footerCta={false}>
      <div className="page-shell pb-24 pt-24 md:pt-32">
        <SectionHeading
          eyebrow="Book a call"
          as="h1"
          size="display-2"
          sub="Three questions first, so the call starts where it should. If there isn't enough leakage to justify a build, we'll say so."
          className="mb-20"
        >
          Thirty minutes. We map your gaps live.
        </SectionHeading>

        <Suspense fallback={<div className="min-h-[420px]" />}>
          <BookingFlow />
        </Suspense>
      </div>
    </PageFrame>
  );
}
