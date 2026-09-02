import type { Metadata } from 'next';
import { LegalPage, LegalSection } from '@/components/layout/LegalPage';
import { COMPANY } from '@/content/claims';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms of use for hexonasystems.com and the Revenue Leak Audit.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms" updated="Pending counsel review" reviewed={false}>
      <LegalSection heading="Scope">
        <p>
          These terms cover use of hexonasystems.com and the tools on it, including the Revenue Leak
          Audit. They do not cover any implementation or licence agreement, which is contracted
          separately.
        </p>
      </LegalSection>

      <LegalSection heading="The audit is a model, not a valuation">
        <p>
          The Revenue Leak Audit produces an estimate from four inputs you supply and two assumptions
          you can see and change. It is a directional model intended to size a problem, not an
          appraisal, an audit in the accounting sense, or a forecast. Decisions with financial
          consequences should not rest on it alone.
        </p>
        <p>
          We show the arithmetic precisely so the estimate can be checked rather than trusted. If an
          assumption looks wrong for your business, change it, and the output changes with it.
        </p>
      </LegalSection>

      <LegalSection heading="Accuracy of what you enter">
        <p>
          The output is only as good as the inputs. We do not verify the figures you enter and we
          make no representation about the result they produce.
        </p>
      </LegalSection>

      <LegalSection heading="Shared results links">
        <p>
          A results link encodes the figures you entered. Anyone holding the link can see them.
          Treat it as you would any other document containing your business numbers.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          ⚠️ DRAFTING NOTE: state ownership of site content, the Hexona marks, and the engine, and
          what a visitor may and may not do with material from this site.
        </p>
      </LegalSection>

      <LegalSection heading="Liability">
        <p>
          ⚠️ DRAFTING NOTE: limitation of liability, warranty disclaimer, and the interaction with
          Ontario consumer-protection law. This section must be written by counsel.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          ⚠️ DRAFTING NOTE: confirm Ontario, Canada, and the dispute-resolution mechanism.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          {COMPANY.name}, {COMPANY.address} ·{' '}
          <a href={`mailto:${COMPANY.email}`} className="text-accent underline">
            {COMPANY.email}
          </a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
