import type { Metadata } from 'next';
import { PageFrame } from '@/components/layout/PageFrame';
import { LatticeField } from '@/components/lattice/LatticeField';
import { Hero } from '@/components/sections/Hero';
import { FeaturedOn } from '@/components/sections/FeaturedOn';
import { Diagnosis } from '@/components/sections/Diagnosis';
import { Cost } from '@/components/sections/Cost';
import { System } from '@/components/sections/System';
import { Proof } from '@/components/sections/Proof';
import { Method } from '@/components/sections/Method';
import { Numbers } from '@/components/sections/Numbers';
import { Record } from '@/components/sections/Record';
import { Testimonials } from '@/components/sections/Testimonials';
import { Founder } from '@/components/sections/Founder';
import { Objections, OBJECTIONS } from '@/components/sections/Objections';
import { Close } from '@/components/sections/Close';
import { JsonLd, faqPageLd, organizationLd, webSiteLd } from '@/lib/jsonld';

/**
 * THE HOMEPAGE — §7.1.
 *
 * A 12-section narrative arc. Read the section names in order — they tell a
 * story:
 *
 *   Fracture → Diagnosis → Cost → System → Proof → Numbers
 *   → Method → Numbers → Record → Testimonials → Founder → Objections → Close
 *
 * The lattice (§5) runs behind all of it as one continuous spine, scrubbed to
 * scroll across the full height of #narrative, so scrolling feels like
 * progressing through one idea rather than clicking through six stitched
 * templates.
 */

export const metadata: Metadata = {
  title: 'Hexona Systems: Seal the gaps where your revenue leaks',
  description:
    'Every unanswered lead, every manual handoff, every reply that took a day instead of a minute is a gap where revenue escapes. Hexona builds the operating system that seals them. Run the Revenue Leak Audit and see what yours is costing you.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Your revenue isn’t lost. It’s leaking.',
    description:
      'Hexona builds the operating system that seals the gaps where revenue escapes. Find your leak in under a minute.',
    url: '/',
    images: [{ url: '/api/og', width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationLd()} />
      <JsonLd data={webSiteLd()} />
      <JsonLd data={faqPageLd(OBJECTIONS)} />

      {/* Canvas instance 1 of exactly 2 permitted on this page (§5.2). */}
      <LatticeField narrativeId="narrative" />

      <PageFrame footerCta={false}>
        <div id="narrative">
          <Hero />
          <FeaturedOn />
          <Diagnosis />
          <Cost />
          <System />
          <Proof />
          <Method />
          <Numbers />
          <Record />
          <Testimonials />
          <Founder />
          <Objections />
          <Close />
        </div>
      </PageFrame>
    </>
  );
}
