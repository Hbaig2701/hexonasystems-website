import type { Metadata } from 'next';
import { Surface } from '@/components/ui/Surface';
import { Lattice } from '@/components/ui/Lattice';
import { SectionMarker } from '@/components/layout/SectionMarker';
import { TextLink } from '@/components/ui/Button';
import { JsonLd, breadcrumbLd } from '@/lib/jsonld';
import { DIAGNOSTIC } from '@/content/firm';
import { COMMISSION } from '@/content/commission';
import { CommissionForm } from './CommissionForm';

/**
 * /commission — the intake form, and the end of the funnel.
 *
 * Every "Commission a diagnostic" button on the site now lands here. They used
 * to land on /diagnostic, which is the offer and not an action, and the one on
 * /diagnostic itself was a mailto: a $5,000 sale whose final step was hoping
 * the visitor had a mail client configured.
 *
 * ⚠️ NOINDEX. This is a form, not a page anyone should arrive at from search.
 * The offer is /diagnostic and that is the page that should rank; a form
 * competing with it in results would split the query and land people at nine
 * questions before they know what they are buying. It stays out of the sitemap
 * for the same reason.
 *
 * What sits beside the form is not filler. It is the three things that happen
 * after submit, because the single largest reason a form like this is abandoned
 * is not knowing what the button actually does.
 */

export const metadata: Metadata = {
  title: 'Commission a diagnostic',
  description: `Intake for the Leakage Diagnostic. ${DIAGNOSTIC.priceFormatted}, credited in full against implementation.`,
  alternates: { canonical: '/commission' },
  robots: { index: false, follow: true },
};

export default function CommissionPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'The Leakage Diagnostic', path: '/diagnostic' },
          { name: 'Commission', path: '/commission' },
        ])}
      />

      <Surface surface="void" rule={false} as="header" className="hex-stage">
        <Lattice />
        <div className="shell">
          <div className="col-12">
            <div className="[grid-column:1/9]">
              <p className="t-label mb-14 text-fg-3">
                <span className="text-brand">Hexona Systems</span>
                <span className="px-1.5 text-brand opacity-50">·</span> {COMMISSION.eyebrow}
              </p>
              <h1 className="t-display-1 mb-12 max-w-[20ch]">{COMMISSION.heading}</h1>
              <p className="t-lead max-w-[62ch] text-fg-2">{COMMISSION.lede}</p>
            </div>
          </div>
        </div>
      </Surface>

      <Surface surface="paper">
        <div className="shell">
          <SectionMarker as="h2" index="01" label="The form" className="mb-14" />
          <div className="col-12 gap-y-16">
            <div className="[grid-column:1/8]">
              <CommissionForm />
            </div>

            {/* What the button does. See the note at the top of this file. */}
            <div className="faq-aside [grid-column:9/13]">
              <h2 className="t-display-2 mb-8">What happens next.</h2>
              <dl className="m-0 border-t border-line">
                {COMMISSION.next.map((n) => (
                  <div key={n.term} className="border-b border-line py-6">
                    <dt className="t-body mb-2 text-fg">{n.term}</dt>
                    <dd className="t-small m-0 text-fg-2">{n.detail}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8">
                <TextLink href="/diagnostic">Read what the diagnostic is first</TextLink>
              </p>
            </div>
          </div>
        </div>
      </Surface>
    </>
  );
}
