import type { Metadata } from 'next';
import { PageFrame } from '@/components/layout/PageFrame';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { AuditSection } from '@/components/audit/AuditSection';

export const metadata: Metadata = {
  title: 'The Revenue Leak Audit',
  description:
    'Four questions, under a minute. See what slow response and unanswered leads cost your business every year, with the arithmetic shown and no email required to see the number.',
  alternates: { canonical: '/audit' },
  openGraph: {
    title: 'The Revenue Leak Audit · Hexona Systems',
    description:
      'Four questions, under a minute. What is the gap costing you annually?',
    images: [{ url: '/api/og', width: 1200, height: 630 }],
  },
};

export default function AuditPage() {
  return (
    <PageFrame>
      <div className="page-shell pb-24 pt-24 md:pt-32">
        <SectionHeading
          eyebrow="The Revenue Leak Audit"
          as="h1"
          size="display-1"
          sub="Four questions about how your business handles inbound. In under a minute you'll see what the gap costs you annually. And you don't have to give us anything to find out."
          className="mb-20"
        >
          Put a number on it
        </SectionHeading>

        <AuditSection />
      </div>
    </PageFrame>
  );
}
