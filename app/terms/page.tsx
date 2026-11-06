import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';
import { JsonLd, breadcrumbLd } from '@/lib/jsonld';
import { TERMS } from '@/content/legal';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms that apply when you use hexonasystems.com, read its articles or send us a consult request. Client work is covered by its own signed agreement.',
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
