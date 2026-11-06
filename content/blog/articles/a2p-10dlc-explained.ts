// Target: "a2p 10dlc" (880/mo US, DataforSEO Nov 6, 2026), "tcpa text message
// rules", "sms marketing compliance". Nov 6, 2026 check: Twilio's fee article
// (support.twilio.com and help.twilio.com) would not load for us (403 / script
// only), so the Twilio fee table is attributed to that article as indexed and
// cross-checked against HighLevel's fee page, which we did read. Brand limits
// from Twilio's A2P 10DLC docs page; error 30034 from Twilio's error page.
// TCPA revocation rules from 47 CFR 64.1200 (Cornell LII) and FCC order DA 26-12
// (Jan 6, 2026). Florida hours from Fla. Stat. 501.616(6). General information,
// not legal advice.

import type { Article } from '../types';

const article: Article = {
  slug: 'a2p-10dlc-explained',
  category: 'guides',
  kind: 'Guide',
  title: 'A2P 10DLC explained: what business owners need before texting customers',
  seoTitle: 'A2P 10DLC Explained for Business Owners',
  description:
    'Why your business texts get blocked, how A2P 10DLC registration works, what it costs in 2026, and the consent and quiet-hours rules to follow before you text.',
  datePublished: '2026-11-06',
  dateModified: '2026-11-06',
  lastChecked: '2026-11-06',
  cover: {
    style: 'chat',
    messages: [
      { from: 'ai', text: 'Hi Dana, your furnace tune-up is tomorrow at 9. Reply C to confirm. Reply STOP to opt out.' },
      { from: 'them', text: 'C' },
      { from: 'ai', text: 'Confirmed. See you at 9!' },
    ],
  },
  coverAlt:
    'A compliant appointment reminder text with confirm and STOP instructions, a customer replying C, and a confirmation message.',
  intro: [
    'A2P 10DLC is the registration US carriers require before a business can send texts from software to customers on a regular 10-digit local number. If your business texts from a CRM, a booking system or an AI receptionist and has not registered a brand and a campaign, carriers will filter or block those texts, often without telling you.',
    'Registering is mostly paperwork: your legal business details, a description of what you text, sample messages and proof that customers agreed to receive them. It costs a few dollars to start and a few dollars a month. Below is what it is, what it costs as of November 2026, why registrations get rejected, and the consent rules that apply once you are approved.',
    'This is general information, not legal advice. Texting rules change, so check with your provider and a lawyer before a big campaign.',
  ],
  tldr: [
    'A2P 10DLC = registering your business (the brand) and what you text (the campaign) so carriers deliver texts from your local number.',
    'Unregistered texts from software get filtered or blocked. A missed-call text that never arrives is worse than no text.',
    'Typical costs through Twilio: $4.50 to $46 one time for the brand, $15 to vet each campaign, and $1.50 to $10 a month per campaign.',
    'Most rejections come from a mismatch: wrong brand type, an opt-in form that doesn’t match the campaign, or a website without a privacy policy.',
    'Approval is only half of it. You still need consent, a working STOP, and sending hours that respect federal and state rules.',
  ],
  sections: [
    {
      id: 'what-is-it',
      heading: 'What is A2P 10DLC?',
      paragraphs: [
        '**A2P** means application to person: a text sent by software (your CRM, scheduling tool or AI receptionist) to a real person’s phone. **10DLC** means a 10-digit long code, which is a normal local phone number rather than a short code like 55555.',
        'US carriers decided years ago that businesses texting from local numbers had to register who they are and what they send, through a central database called The Campaign Registry. Your texting provider (Twilio, or a platform like HighLevel that runs on it) is the form you fill in. The carriers approve or reject.',
        'Two things get registered:',
      ],
      bullets: [
        '**The brand:** your business. Legal name, tax ID, address, website, a contact person.',
        '**The campaign:** what you text and why. Appointment reminders, missed-call replies, review requests, promotions. It includes a description, sample messages and how customers opt in.',
      ],
      figure: {
        kind: 'steps',
        caption: 'the A2P 10DLC registration path',
        items: ['Register brand', 'Brand approved', 'Register campaign', 'Campaign approved', 'Link your number', 'Texts deliver'],
      },
    },
    {
      id: 'why-blocked',
      heading: 'Why are my business texts not being delivered?',
      paragraphs: [
        'If your number is not linked to an approved campaign, carriers treat your texts as unregistered traffic. On Twilio-based systems the failure shows up as error 30034, which Twilio describes as a message blocked because the sending number is not tied to an approved A2P 10DLC campaign. The customer just never gets the text, and your team assumes they ignored it.',
        'This is a common reason automations "don’t work". A missed-call text-back that never arrives, appointment reminders that silently fail, review requests that go nowhere. Before you blame the software, check the number shows as registered and approved.',
        'Toll-free numbers don’t use A2P 10DLC; they go through a separate toll-free verification. If you are setting up a text-back for missed calls, read /blog/missed-call-text-back with this in mind: the registration has to be approved before the first text goes out.',
      ],
    },
    {
      id: 'sole-prop-vs-ein',
      heading: 'Should I register as a sole proprietor or with an EIN?',
      paragraphs: [
        'This one decision causes more rejections than anything else, so get it right the first time.',
      ],
      table: {
        caption: 'Brand types for A2P 10DLC, from Twilio’s A2P 10DLC docs and HighLevel’s brand registration guide, read Nov 6, 2026.',
        columns: [
          { key: 'type', label: 'Brand type' },
          { key: 'who', label: 'Who it is for' },
          { key: 'limits', label: 'Limits' },
        ],
        rows: [
          { type: 'Sole Proprietor', who: 'People with no EIN or tax ID, one employee', limits: 'One campaign and one number, about 3,000 message segments a day across US carriers' },
          { type: 'Low Volume Standard', who: 'Any business with an EIN (LLC, corporation, partnership)', limits: 'About 6,000 message segments a day across US carriers; fits most local businesses' },
          { type: 'Standard (full vetting)', who: 'Businesses with an EIN sending more volume', limits: 'From 2,000 a day to T-Mobile up to unlimited, set by a Trust Score from secondary vetting' },
        ],
      },
      callout:
        'If your business has an EIN, it is a Standard brand, even a one-person LLC. An LLC registered as a sole proprietor will keep getting rejected, and resubmitting won’t fix it. Use the exact legal name on your IRS letter, letter for letter.',
    },
    {
      id: 'cost',
      heading: 'How much does A2P 10DLC registration cost?',
      paragraphs: [
        'Not much. These are Twilio’s pass-through fees as listed in its pricing article. Platforms built on Twilio usually bundle them; HighLevel’s fee page, read Nov 6, 2026, lists a one-time $22.50 for sole proprietor or low volume standard and $64 for high volume standard (brand, campaign vetting and fast track together), plus the monthly campaign fee: $1.50 for low volume mixed, $2 for sole proprietor and $10 for standard use cases.',
      ],
      table: {
        caption: 'A2P 10DLC fees through Twilio, as listed in Twilio’s pricing article (the live page did not load for us on Nov 6, 2026; the monthly fees match HighLevel’s fee page read that day). Fees can change; confirm before you submit.',
        columns: [
          { key: 'fee', label: 'Fee' },
          { key: 'amount', label: 'Amount' },
          { key: 'when', label: 'When' },
        ],
        rows: [
          { fee: 'Brand registration, Sole Proprietor or Low Volume Standard', amount: '$4.50', when: 'One time' },
          { fee: 'Brand registration, Standard (with secondary vetting)', amount: '$46', when: 'One time' },
          { fee: 'Campaign vetting', amount: '$15', when: 'Each campaign you submit, non-refundable' },
          { fee: 'Campaign fee, Low Volume Mixed', amount: '$1.50', when: 'Monthly' },
          { fee: 'Campaign fee, Sole Proprietor', amount: '$2', when: 'Monthly' },
          { fee: 'Campaign fee, Standard', amount: '$10', when: 'Monthly' },
        ],
      },
    },
    {
      id: 'approval',
      heading: 'How do I get my A2P campaign approved the first time?',
      paragraphs: [
        'Carriers check that everything points to the same real business and that customers clearly agreed to your texts. Have this ready before you start:',
      ],
      steps: [
        { title: 'Your exact legal details', detail: 'Legal name and EIN exactly as on your IRS letter, a street address (not a P.O. box), and a contact person with a mobile number and an email they check.' },
        { title: 'A live website that matches', detail: 'It shows your business name and contact details, with a Privacy Policy and Terms page linked in the footer.' },
        { title: 'An opt-in that matches the campaign', detail: 'A checkbox on your form, not pre-ticked, that names your business, says what you will text, that message frequency varies, that message and data rates may apply, and how to reply STOP and HELP.' },
        { title: 'A privacy policy that says you don’t share numbers', detail: 'Carriers reject policies that mention selling or sharing leads. It should say mobile information is not shared with third parties for marketing.' },
        { title: 'Sample messages that look like your real texts', detail: 'Include your business name and the opt-out line. "Hi Dana, it’s Northside Heating, your tune-up is tomorrow at 9. Reply STOP to opt out."' },
        { title: 'Link the number after approval', detail: 'Approval does nothing until your phone number is attached to the approved campaign. Don’t switch on texting automations until it is.' },
      ],
      callout:
        'A brand-new EIN can slow you down. HighLevel’s brand guide (updated Sep 29, 2026) says EINs issued within the last 15 days may be rejected, because the verification systems may not have the new number yet. If you just formed the LLC, expect a wait.',
    },
    {
      id: 'consent-rules',
      heading: 'What are the TCPA rules for business text messages?',
      paragraphs: [
        'A2P registration is the carriers’ rule. The Telephone Consumer Protection Act (TCPA) is the law, and it applies on top. The basics for a service business:',
      ],
      bullets: [
        '**Get consent before you text.** Replying to someone who texted you first is generally fine. Marketing texts (promotions, offers) need clear written consent, which is what that opt-in checkbox is for.',
        '**Honor opt-outs fast.** Since April 11, 2025 the FCC’s rules say customers can revoke consent "using any reasonable method", and a reply of stop, quit, end, revoke, opt out, cancel or unsubscribe always counts. You have no more than 10 business days to process it, and you can send one confirmation text with no marketing in it.',
        '**The "stop one means stop all" rule is delayed.** The FCC’s rule that one opt-out covers every kind of message from your business was pushed to January 31, 2027 by an FCC order on January 6, 2026, while the FCC considers changing it. Watch for updates.',
        '**Respect sending hours.** Federal rules limit telephone solicitations to 8 a.m. to 9 p.m. in the customer’s time zone. Florida is stricter for sales calls: 8 a.m. to 8 p.m., and no more than three on the same subject in 24 hours. Florida’s hours rule is written for phone calls and doesn’t mention texts, so the safe move is to keep marketing texts to the same window.',
        '**Keep proof.** Save when and how each customer opted in. If a dispute comes up, the record is your defense.',
      ],
      callout:
        'Transactional texts (appointment confirmations, "we’re on our way", invoice reminders for a job the customer booked) are treated differently from marketing. Keep the two clearly separate in your opt-in wording and your campaigns.',
    },
    {
      id: 'ai-texting',
      heading: 'Does an AI receptionist that texts customers need A2P registration?',
      paragraphs: [
        'Yes. If the AI sends texts from a local number, the number needs to be on an approved campaign like any other software. That includes missed-call text-backs, booking confirmations and follow-ups.',
        'When we set up an /ai-employees/ai-receptionist or /ai-employees/ai-sales-follow-up for a client, registration is one of the first jobs, because nothing else works if the texts don’t arrive. The missed-call assistant in /evidence/tire-shop-missed-calls replied by text within seconds of a dropped call. That only works on a registered number.',
        'If you would rather not deal with the forms, the brand details and the policy pages yourself, /book.',
      ],
    },
  ],
  faq: [
    {
      question: 'What is A2P 10DLC in simple terms?',
      answer:
        'It is the registration US carriers require before a business can send texts from software on a regular local phone number. You register your business (the brand) and what you text (the campaign), and the carriers approve it.',
    },
    {
      question: 'Do I need A2P 10DLC to text my customers?',
      answer:
        'If you text from software such as a CRM, booking tool or AI receptionist on a local US number, yes. Unregistered texts are filtered or blocked by carriers. Texting by hand from your own personal phone is not A2P.',
    },
    {
      question: 'How much does A2P 10DLC cost?',
      answer:
        'Through Twilio as of November 2026: $4.50 one time for a sole proprietor or low volume brand, or $46 for a fully vetted Standard brand, plus $15 to vet each campaign and $1.50 to $10 a month per campaign. Platforms often bundle these.',
    },
    {
      question: 'How long does A2P approval take?',
      answer:
        'It varies. Campaigns go through manual vetting, and a brand that needs secondary vetting or has an EIN issued in the last 15 days can take longer. Don’t switch on texting automations until the number is linked to an approved campaign.',
    },
    {
      question: 'Why was my A2P campaign rejected?',
      answer:
        'The most common reasons are the wrong brand type (an LLC registered as a sole proprietor), an opt-in form that doesn’t match the campaign description, and a website missing its privacy policy or terms. Fix every listed reason before resubmitting.',
    },
    {
      question: 'What hours can a business send text messages?',
      answer:
        'Federal rules limit telephone solicitations to 8 a.m. to 9 p.m. in the customer’s local time. Some states are stricter, such as Florida at 8 a.m. to 8 p.m. for sales calls. Appointment and service texts the customer asked for are treated differently from marketing.',
    },
  ],
  sources: [
    {
      label: 'Twilio, Pricing and Fees for A2P 10DLC Service',
      url: 'https://support.twilio.com/hc/en-us/articles/1260803965530-Pricing-and-Fees-for-A2P-10DLC-Service',
      note: 'Brand, vetting and monthly campaign fees. The page returned 403 (and the help.twilio.com copy loads only with scripts) when we tried on Nov 6, 2026, so the figures are as listed for this article in search results, not read on the page.',
    },
    {
      label: 'Twilio Docs, What is A2P 10DLC?',
      url: 'https://www.twilio.com/docs/messaging/compliance/a2p-10dlc',
      note: 'Brand types, campaigns per brand and daily message limits. Read Nov 6, 2026.',
    },
    {
      label: 'Twilio Docs, Error 30034',
      url: 'https://www.twilio.com/docs/api/errors/30034',
      note: 'Messages blocked from numbers not on an approved campaign; sole proprietor campaigns allow one number. Read Nov 6, 2026.',
    },
    {
      label: 'HighLevel, A2P 10DLC messaging fees',
      url: 'https://help.gohighlevel.com/support/solutions/articles/155000005200',
      note: 'One-time and monthly A2P fees on HighLevel (page modified Sep 24, 2026). Read Nov 6, 2026.',
    },
    {
      label: 'HighLevel, Registering your A2P brand',
      url: 'https://help.gohighlevel.com/support/solutions/articles/155000008140-registering-your-a2p-brand',
      note: 'Sole proprietor vs Standard brand, exact legal name, EINs under 15 days old. Read Nov 6, 2026.',
    },
    {
      label: 'Hamza Baig, How to get A2P 10DLC approved in GoHighLevel',
      url: 'https://hamzaautomates.com/gohighlevel/tutorials/gohighlevel-a2p-10dlc-registration',
      note: 'Rejection causes, opt-in and privacy policy requirements, from HighLevel’s help docs read Oct 31, 2026. Read Nov 6, 2026.',
    },
    {
      label: '47 CFR 64.1200 (Cornell Legal Information Institute)',
      url: 'https://www.law.cornell.edu/cfr/text/47/64.1200',
      note: 'Revocation by any reasonable method, the opt-out words, the 10 business day limit, the one confirmation text and the 8 a.m. to 9 p.m. window. Read Nov 6, 2026.',
    },
    {
      label: 'FCC, Order DA 26-12 (Jan 6, 2026)',
      url: 'https://docs.fcc.gov/public/attachments/DA-26-12A1.pdf',
      note: 'Extends the revoke-all waiver to Jan 31, 2027; confirms the other revocation rules took effect Apr 11, 2025. Read Nov 6, 2026.',
    },
    {
      label: 'Privacy World, FCC extends waiver of TCPA consent rule providing stop one means stop all',
      url: 'https://www.privacyworld.blog/2026/01/fcc-extends-waiver-of-tcpa-consent-rule-providing-stop-one-means-stop-all/',
      note: 'Summary of the Jan 2026 FCC order delaying the Revoke All rule to Jan 31, 2027. Read Nov 6, 2026.',
    },
    {
      label: 'Florida Statutes 501.616 (Florida Senate)',
      url: 'https://www.flsenate.gov/Laws/Statutes/2025/501.616',
      note: 'Subsection (6): no commercial telephone solicitation calls before 8 a.m. or after 8 p.m., and no more than three in 24 hours on the same subject. Read Nov 6, 2026.',
    },
    {
      label: 'Jones Day, Florida makes significant changes to telemarketing laws',
      url: 'https://www.jonesday.com/en/insights/2021/07/florida-makes-significant-changes-to-telemarketing-laws',
      note: 'The July 1, 2021 amendments, and texts included in the definition of a telephonic sales call. Read Nov 6, 2026.',
    },
  ],
  related: ['missed-call-text-back', 'appointment-reminder-texts', 'two-party-consent-states'],
  queries: ['a2p 10dlc', 'a2p 10dlc registration', 'tcpa text message rules', 'sms marketing compliance', 'business texts not delivered', 'error 30034'],
};

export default article;
