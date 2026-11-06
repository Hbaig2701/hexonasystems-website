import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { FromTheBlog, HowItWorks, Industries, ResultsBand, Results, Team, Value } from '@/components/home/Sections';
import { JsonLd, breadcrumbLd } from '@/lib/jsonld';

/**
 * THE HOMEPAGE — v3.
 *
 * Broad on purpose: "AI that increases enterprise value" covers anything the
 * firm builds. The traffic arrives through the role, industry and article
 * pages underneath; this page's job is to make the filter clear and get the
 * consult booked.
 *
 * Order: hero → results band → the AI team → the value filter → how it works
 * → case studies → industries → closing call to action (in the footer).
 */

export const metadata: Metadata = {
  title: { absolute: 'Hexona Systems: AI that increases enterprise value' },
  // The entity sentence (358 characters) still renders in the hero and the
  // Organization schema; the meta description is its own 160-character line so
  // search results don't truncate it and it doesn't duplicate /firm.
  description:
    'Hexona Systems builds and runs AI employees for service businesses in the US and Canada: AI receptionists, sales follow-up, dispatch and back office.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <div className="hx">
      {/* Organization, WebSite and Person are emitted site-wide in the layout. */}
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }])} />
      <Hero />
      <ResultsBand />
      <Team />
      <Value />
      <HowItWorks />
      <Results />
      <Industries />
      <FromTheBlog />
    </div>
  );
}
