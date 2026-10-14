import { FIRM } from './firm';

/**
 * TERMS AND PRIVACY.
 *
 * Written against what the site actually does, not a template. If any of the
 * following changes, the privacy policy is now wrong and must change with it:
 *
 *   - The intake form at /commission is the only place personal information is
 *     collected. Its fields are in lib/lead.ts.
 *   - Submissions go to GoHighLevel (the CRM), with the submitter's IP address.
 *     The IP is also used for rate limiting (Upstash).
 *   - The site is hosted on Vercel.
 *   - No analytics, tracking pixels or advertising cookies are loaded.
 *     `posthog-js` and `@vercel/analytics` are installed but not wired up;
 *     wiring either one up means adding a section here first.
 *
 * Client engagements are governed by their own signed agreement, not by these
 * pages, and both pages say so.
 */

export type LegalDoc = {
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

const UPDATED = 'October 14, 2026';
const CONTACT = `${FIRM.name}, ${FIRM.address}, Canada. ${FIRM.email}.`;

export const TERMS: LegalDoc = {
  title: 'Terms of Service',
  updated: UPDATED,
  intro: `These terms govern your use of hexonasystems.com. By using the site you agree to them. If you do not agree, please do not use the site.`,
  sections: [
    {
      heading: 'Who we are',
      body: [
        `The site is operated by ${FIRM.name} ("Hexona", "we", "us"), based in Toronto, Ontario, Canada.`,
      ],
    },
    {
      heading: 'Engagements are contracted separately',
      body: [
        'Nothing on this site is an offer capable of acceptance. Prices, scopes and timelines described here are a general description of our services. Any diagnostic or implementation engagement is governed by a separate written agreement signed by both parties, and where that agreement conflicts with anything on this site, the agreement governs.',
        'Submitting the intake form does not create an engagement or any obligation on either side.',
      ],
    },
    {
      heading: 'Information on this site',
      body: [
        'Articles, figures, case material and other content on this site are provided for general information. They are not legal, financial, accounting or tax advice, and they are not a substitute for an assessment of your own business. We work to keep the content accurate but make no warranty that it is complete, current or suitable for any particular purpose.',
      ],
    },
    {
      heading: 'Acceptable use',
      body: [
        'You agree not to use the site in a way that is unlawful, that interferes with its operation or security, or that submits false, misleading or automated information through its forms. We may block access from any source we reasonably believe is doing so.',
      ],
    },
    {
      heading: 'Intellectual property',
      body: [
        `The content, design, text, graphics and the ${FIRM.name} name and marks are owned by or licensed to us. You may view and share pages for your own non-commercial reference. You may not reproduce, republish or create derivative works from the site's content without our written permission, other than brief quotation with attribution.`,
        'Names and logos of other companies that appear on the site belong to their respective owners.',
      ],
    },
    {
      heading: 'Third-party links',
      body: [
        'The site may link to websites we do not control. We are not responsible for their content or practices.',
      ],
    },
    {
      heading: 'Disclaimer and limitation of liability',
      body: [
        'The site is provided "as is" and "as available", without warranties of any kind, to the fullest extent permitted by law.',
        `To the fullest extent permitted by law, ${FIRM.name} will not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits, revenue or data, arising from your use of or inability to use the site. Nothing in these terms limits liability that cannot be limited under applicable law.`,
      ],
    },
    {
      heading: 'Governing law',
      body: [
        'These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable there. The courts of Ontario have exclusive jurisdiction over any dispute arising from them.',
      ],
    },
    {
      heading: 'Changes',
      body: [
        'We may update these terms from time to time. The date at the top of this page shows when they last changed, and continued use of the site after a change means you accept the updated terms.',
      ],
    },
    {
      heading: 'Contact',
      body: [CONTACT],
    },
  ],
};

export const PRIVACY: LegalDoc = {
  title: 'Privacy Policy',
  updated: UPDATED,
  intro: `This policy explains what personal information ${FIRM.name} collects through hexonasystems.com, why, and what we do with it. We handle personal information in accordance with Canada's Personal Information Protection and Electronic Documents Act (PIPEDA).`,
  sections: [
    {
      heading: 'What we collect',
      body: [
        'We only collect personal information when you submit the intake form. That form asks for your name, email address, phone number, company name and website, approximate revenue and headcount, the systems your business runs on, why you are enquiring, and your preferred timing.',
        'When you submit the form we also record your IP address and the time of submission.',
        'Simply browsing the site does not require you to give us any personal information.',
      ],
    },
    {
      heading: 'Cookies and tracking',
      body: [
        'The site does not use advertising cookies, tracking pixels or third-party analytics. Our hosting provider keeps standard server logs, such as IP addresses and requested pages, for security and operational purposes.',
      ],
    },
    {
      heading: 'How we use it',
      body: [
        'We use the information you submit to assess whether we can help, to respond to your enquiry, to schedule and prepare for a conversation, and to keep a record of our correspondence with you.',
        'We use your IP address to prevent spam and abuse of the form.',
        'We do not sell, rent or trade personal information, and we do not use it for purposes unrelated to your enquiry without your consent. We will not add you to a marketing list without your consent, and you can withdraw that consent at any time.',
      ],
    },
    {
      heading: 'Who we share it with',
      body: [
        'We use a small number of service providers to operate the site and our business: Vercel, which hosts the site; GoHighLevel, the customer relationship management system that receives form submissions; and Upstash, which processes IP addresses for rate limiting. They process information on our behalf and only for these purposes.',
        'These providers may store and process information outside Canada, including in the United States, where it may be accessible to authorities under local law.',
        'We may also disclose information where required by law.',
      ],
    },
    {
      heading: 'Client engagements',
      body: [
        'Information and system access you provide during a paid engagement is governed by the confidentiality and data-handling terms of that engagement agreement, not by this policy.',
      ],
    },
    {
      heading: 'How long we keep it',
      body: [
        'We keep enquiry information for as long as it is needed to respond to you and maintain a record of our relationship, and then delete or anonymise it. You can ask us to delete it sooner.',
      ],
    },
    {
      heading: 'How we protect it',
      body: [
        'Information is transmitted over encrypted connections and stored with providers that maintain industry-standard security. Access is limited to the people who need it to respond to you. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
      ],
    },
    {
      heading: 'Your rights',
      body: [
        `You can ask to see the personal information we hold about you, to correct it, or to withdraw your consent and have it deleted. Email ${FIRM.email} and we will respond within 30 days.`,
        'If you are not satisfied with our response, you can contact the Office of the Privacy Commissioner of Canada.',
      ],
    },
    {
      heading: 'Changes',
      body: [
        'We may update this policy from time to time. The date at the top of this page shows when it last changed.',
      ],
    },
    {
      heading: 'Contact',
      body: [`Questions about this policy or your information can go to our privacy contact, ${FIRM.principal}: ${CONTACT}`],
    },
  ],
};
