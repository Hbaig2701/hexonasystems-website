import type { Metadata } from 'next';
import { LegalPage, LegalSection } from '@/components/layout/LegalPage';
import { COMPANY } from '@/content/claims';

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'What the Revenue Leak Audit collects, why, where it goes, how long it is kept, and how to have it deleted.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy" updated="Pending counsel review" reviewed={false}>
      <LegalSection heading="Who we are">
        <p>
          {COMPANY.name}, {COMPANY.address}. Questions about this policy or about data we hold go to{' '}
          <a href={`mailto:${COMPANY.email}`} className="text-accent underline">
            {COMPANY.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="What the Revenue Leak Audit collects, and why">
        <p>
          The audit asks four questions about how your business handles inbound: monthly inquiry
          volume, the share answered within five minutes, the share of conversations that become
          customers, and an average first-year customer value. It also records the two model
          constants, whether you left them at our defaults or adjusted them.
        </p>
        <p>
          You can run the audit and see your figure without giving us anything. Those four answers
          stay in your browser, in the page URL and in session storage, until you choose to
          request the full breakdown.
        </p>
        <p>
          When you request the breakdown, we collect your name, work email, company name and,
          optionally, a phone number, and we store your audit answers against that contact record.
        </p>
      </LegalSection>

      <LegalSection heading="Where audit data is stored">
        <p>
          Audit inputs and the resulting figures are stored as fields on your contact record in our
          CRM, alongside the page you came from and any campaign parameters in the link you followed.
          This is how a salesperson arrives at a call already knowing the shape of your business.
        </p>
      </LegalSection>

      <LegalSection heading="Legal basis and consent (CASL)">
        <p>
          The breakdown email is transactional: you asked for a document and we send it. Marketing
          email is separate and requires your express consent, which is why the consent box on the
          form is unchecked by default and why nothing happens if you leave it that way.
        </p>
        <p>
          You can withdraw consent at any time using the unsubscribe link in any marketing message,
          or by writing to us.
        </p>
      </LegalSection>

      <LegalSection heading="Retention">
        <p>
          ⚠️ DRAFTING NOTE: state a specific retention period for audit records and for contact
          records, and the trigger that starts the clock. A policy that says &ldquo;as long as
          necessary&rdquo; is not a retention period.
        </p>
      </LegalSection>

      <LegalSection heading="Third-party processors">
        <p>
          We use the following processors, each of which may handle personal data on our behalf:
        </p>
        <ul className="flex list-disc flex-col gap-2 pl-5">
          <li>Vercel: website hosting and delivery</li>
          <li>GoHighLevel: CRM, pipeline, scheduling and email delivery</li>
          <li>Make.com: moving form submissions into the CRM</li>
          <li>PostHog: product analytics on the audit funnel</li>
          <li>
            ⚠️ DRAFTING NOTE: name the email provider explicitly, and any other processor added
            after this draft. §7.7 requires each to be named.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Cookies and analytics">
        <p>
          Analytics beyond first-party measurement only runs after you accept it. Until then,
          analytics state is held in memory for the current page view and is not written to a cookie
          or to local storage.
        </p>
      </LegalSection>

      <LegalSection heading="Access, correction and deletion">
        <p>
          Write to{' '}
          <a href={`mailto:${COMPANY.email}`} className="text-accent underline">
            {COMPANY.email}
          </a>{' '}
          to ask what we hold about you, to correct it, or to have it deleted. We will confirm the
          request and act on it.
        </p>
        <p>
          ⚠️ DRAFTING NOTE: state the response window, and the identity-verification step if any.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
