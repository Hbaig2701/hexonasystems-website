import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';
import { JsonLd, breadcrumbLd } from '@/lib/jsonld';
import { TERMS } from '@/content/legal';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of use for hexonasystems.com.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Terms of Service', path: '/terms' },
        ])}
      />
      <LegalPage doc={TERMS} />
    </>
  );
}
