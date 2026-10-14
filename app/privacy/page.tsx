import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';
import { JsonLd, breadcrumbLd } from '@/lib/jsonld';
import { PRIVACY } from '@/content/legal';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'What personal information Hexona Systems collects through hexonasystems.com, and what it does with it.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy' },
        ])}
      />
      <LegalPage doc={PRIVACY} />
    </>
  );
}
