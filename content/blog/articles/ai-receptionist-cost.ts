// Target: "ai receptionist cost", "ai receptionist pricing", "how much does an ai
// receptionist cost", "ai answering service cost", "answering service cost",
// "virtual receptionist cost" (DataforSEO, US, Nov 6, 2026).
// Prices from each vendor's own pricing page or FAQ as shown in search on
// Nov 6, 2026. GoHighLevel rates from its help docs (AI Products Pricing,
// updated Oct 29, 2026; Phone System Pricing, updated Oct 12, 2026; A2P pricing,
// updated Sep 24, 2026), read Oct 31, 2026 for hamzaautomates.com/gohighlevel.
// Left out: Dialzara's Business Pro price (not visible on its own page) and any
// vendor figure that only appeared on third-party sites.

import type { Article } from '../types';

const article: Article = {
  slug: 'ai-receptionist-cost',
  category: 'costs',
  kind: 'Guide',
  title: 'How much does an AI receptionist cost in 2026?',
  seoTitle: 'AI Receptionist Cost in 2026: Real Prices',
  description:
    'An AI receptionist costs $29 to $500 a month on self-serve plans as of Nov 2026, or cents a minute on usage. Real vendor prices and the costs nobody lists.',
  datePublished: '2026-11-06',
  dateModified: '2026-11-06',
  lastChecked: '2026-11-06',
  cover: { style: 'stat', value: '$29-$500', label: 'a month for most self-serve AI receptionist plans (Nov 2026)' },
  coverAlt: 'A large figure reading $29-$500 with the label "a month for most self-serve AI receptionist plans".',
  intro: [
    'Most self-serve AI receptionist plans cost between $29 and $500 a month as of November 2026, and usage-based voice AI runs about $0.10 to $0.20 a minute plus phone charges. A human answering service covering the same calls usually costs several times more: Ruby starts at $250 a month for 50 minutes.',
    'The sticker price is the smaller part of the bill, though. What decides whether an AI receptionist pays for itself is setup, texting fees, connecting it to your calendar and CRM, and whether anyone actually reads the calls and fixes what it gets wrong.',
    'Missed calls are the first leak I point out to any local business. Someone calls, nobody picks up, and they call the next business on Google until somebody answers. So the right question is less "what does it cost" and more "what does it cost compared with the calls I am losing now".',
  ],
  tldr: [
    'Self-serve AI receptionist plans: about $29 to $500 a month as of Nov 2026, priced per minute, per call or per unique caller.',
    'Usage pricing on platforms like GoHighLevel: $0.10 to $0.20 a minute for voice AI, plus phone minutes and a platform subscription.',
    'Human answering services cost more: Ruby is $250 a month for 50 minutes and $1,725 for 500 minutes.',
    'Budget for the hidden parts too: texting registration (A2P), calendar and CRM connections, and someone to review calls.',
    'Done-for-you costs more upfront than an app, and makes sense when the calls you miss are worth more than the build.',
  ],
  sections: [
    {
      id: 'prices',
      heading: 'What do AI receptionists cost? Real prices as of November 2026',
      paragraphs: [
        'These are the published prices on each company’s own pricing page or FAQ, checked on November 6, 2026. They change often, so treat this as a snapshot and check the source before you sign up.',
      ],
      table: {
        caption: 'Published AI receptionist and answering service prices, checked Nov 6, 2026. Ruby is a human service, included for comparison.',
        columns: [
          { key: 'vendor', label: 'Service' },
          { key: 'how', label: 'How it charges' },
          { key: 'price', label: 'Published price' },
        ],
        rows: [
          { vendor: 'Dialzara', how: 'Minutes per month', price: '$29 for 60 min, $199 for 500 min, $349 for 1,000 min. Overage $0.35 to $0.48 a minute. No setup fee, 7-day trial.' },
          { vendor: 'Goodcall', how: 'Unique callers per month', price: '$79 for 100 callers, $129 for 500, $299 for 2,000. Extra callers 15¢ to 79¢ each. No setup fee, month to month.' },
          { vendor: 'Smith.ai AI Receptionist', how: 'Per call', price: 'Free for 25 calls ($3.00 a call after), Pro $150 a month at $2.00 a call, Enterprise $500 a month at $1.67 a call. Human backup included.' },
          { vendor: 'GoHighLevel Voice AI', how: 'Per minute, usage', price: '$0.10 to $0.20 a minute plus phone charges (inbound about $0.012 a minute), on top of a HighLevel subscription.' },
          { vendor: 'Ruby (live humans)', how: 'Receptionist minutes', price: '$250 for 50 min, $395 for 100, $720 for 200, $1,725 for 500.' },
        ],
      },
      callout:
        'Pricing units matter more than the headline number. A per-minute plan punishes long calls, a per-call plan punishes lots of short ones, and a per-caller plan is kind to customers who call back three times about the same job.',
    },
    {
      id: 'example-month',
      heading: 'What would 150 calls a month cost?',
      paragraphs: [
        'Here is one worked example so the units make sense. Say a plumbing company gets 150 calls a month that need answering and they average 3 minutes each, so 450 minutes. Those numbers are an assumption for illustration; check your own phone logs.',
      ],
      figure: {
        kind: 'bars',
        caption: 'monthly cost for 150 calls averaging 3 minutes (450 minutes), on published prices as of Nov 6, 2026',
        items: [
          { label: 'GoHighLevel Voice AI, usage only', value: 95, display: 'about $50-$95 + subscription' },
          { label: 'Goodcall Growth (up to 500 callers)', value: 129, display: '$129' },
          { label: 'Dialzara Business Plus (500 min)', value: 199, display: '$199' },
          { label: 'Ruby, 500 live minutes', value: 1725, display: '$1,725' },
        ],
      },
      callout:
        'The usage figure leaves out the HighLevel subscription and the build, and Goodcall assumes most of the 150 calls come from different callers. The gap that does not move is the one between AI and live humans.',
    },
    {
      id: 'hidden-costs',
      heading: 'What costs are not on the pricing page?',
      paragraphs: [
        'This is where most owners get surprised. The monthly plan is the easy part.',
      ],
      bullets: [
        '**Texting registration.** If the receptionist texts customers (confirmations, missed-call text back), US carriers require A2P 10DLC registration. On GoHighLevel that is $22.50 one time for a low-volume brand and $1.50 to $10.50 a month per campaign, per its help docs as of Oct 2026. Other platforms charge similar carrier fees.',
        '**Texts themselves.** Fractions of a cent to about a cent and a quarter per text segment on usage platforms. Small, but it adds up with reminders.',
        '**Connecting your calendar and CRM.** Some plans include common calendars. Field-service software, practice management systems and custom CRMs often need an integration someone has to build and maintain.',
        '**Call recording and transcripts.** Often included on self-serve plans. On usage platforms they are billed per minute, and stored recordings can carry a small monthly fee.',
        '**Your time, or someone’s.** Writing the scripts, testing calls, reading transcripts and fixing wrong answers. In the first month this is a few hours a week. Skip it and the receptionist keeps making the same mistake.',
      ],
    },
    {
      id: 'diy-or-done-for-you',
      heading: 'Should you set it up yourself or pay someone to build it?',
      paragraphs: [
        'If your calls are simple (hours, prices, book a slot) and you are comfortable in software, a self-serve plan is fine. You will spend an afternoon setting it up and a few hours a month tuning it.',
        'Done-for-you costs more upfront and makes sense when the receptionist has to work inside the rest of your business: book into your field-service software, trigger follow-up when a quote goes out, alert the on-call tech for emergencies, and report jobs booked rather than "conversations". That is what we build at Hexona. Our AI Receptionist is set up around your call types, connected to your tools and run for you, and we give a fixed price after a free consult, because the right scope depends on your systems. Details are on /ai-employees/ai-receptionist.',
      ],
      table: {
        caption: 'Self-serve app vs done-for-you, in plain terms.',
        columns: [
          { key: 'what', label: '' },
          { key: 'diy', label: 'Self-serve app' },
          { key: 'dfy', label: 'Done-for-you' },
        ],
        rows: [
          { what: 'Monthly price', diy: '$29 to $500', dfy: 'Higher, quoted per business' },
          { what: 'Who writes the scripts', diy: 'You', dfy: 'The provider, with you' },
          { what: 'Calendar and CRM', diy: 'Common ones, you connect them', dfy: 'Built to your systems' },
          { what: 'Who reviews calls and fixes mistakes', diy: 'You', dfy: 'The provider' },
          { what: 'What it reports', diy: 'Calls and minutes', dfy: 'Jobs booked and revenue recovered' },
        ],
      },
    },
    {
      id: 'is-it-worth-it',
      heading: 'Is an AI receptionist worth the money?',
      paragraphs: [
        'Run your own numbers: missed calls a month, times the share that would have booked, times your average job. If that number is bigger than the monthly cost, it pays.',
        'One of our clients, a tire shop with no full-time receptionist, had more than 600 calls a month going to voicemail. The shop’s own arithmetic put the leak at $40,000 to $50,000 a month. After a missed-call assistant that texted back within seconds and booked appointments, booked appointments rose 50% and more than $50,000 was recovered. The full write-up, including how it was measured, is in /evidence/tire-shop-missed-calls.',
        'It is not worth it if you get a handful of calls a week and someone always answers. Then the money is better spent somewhere else, and a good provider should tell you that. If you are not sure where your leaks are, /blog/which-revenue-leaks-to-close-first walks through how to rank them.',
      ],
    },
    {
      id: 'questions-to-ask',
      heading: 'What should you ask before you sign up?',
      steps: [
        { title: 'How is a call counted?', detail: 'Per minute, per call or per unique caller, and whether spam and wrong numbers are charged.' },
        { title: 'What happens on overage?', detail: 'Does it keep answering at a higher rate, or stop? A receptionist that stops answering at month end is worse than none.' },
        { title: 'Can it book into my calendar?', detail: 'Name your actual software and ask to see it working.' },
        { title: 'Who handles texting registration?', detail: 'If it sends texts, someone has to register A2P. Ask who does it and what it costs.' },
        { title: 'Can I get a person when I need one?', detail: 'Emergencies and upset customers should reach a human, with a summary of the call.' },
      ],
    },
  ],
  faq: [
    {
      question: 'How much does an AI receptionist cost per month?',
      answer:
        'Most self-serve AI receptionist plans cost $29 to $500 a month as of November 2026. Dialzara starts at $29 for 60 minutes, Goodcall at $79 for 100 unique callers, and Smith.ai offers a free tier for 25 calls with paid plans from $150 a month.',
    },
    {
      question: 'Is an AI receptionist cheaper than an answering service?',
      answer:
        'Usually, yes. A human answering service like Ruby starts at $250 a month for 50 minutes, while AI plans with hundreds of minutes start around $129 to $199. Human services are still better for complex or emotional calls, which is why many businesses use both.',
    },
    {
      question: 'How much does AI voice cost per minute?',
      answer:
        'On usage-based platforms, voice AI runs about $0.10 to $0.20 a minute as of late 2026, plus phone charges of around a cent a minute. GoHighLevel, for example, lists $0.10 to $0.20 a minute for speech-to-speech voice AI on top of its subscription.',
    },
    {
      question: 'Are there setup fees for an AI receptionist?',
      answer:
        'Most self-serve plans have no setup fee, including Dialzara, Goodcall and Smith.ai as of November 2026. Done-for-you providers charge for the build because they write the scripts, connect your systems and test the calls before going live.',
    },
    {
      question: 'What hidden costs come with an AI receptionist?',
      answer:
        'The common ones are A2P 10DLC registration if it sends texts, per-text and per-minute phone charges on usage plans, integrations with field-service or practice software, and the time someone spends reviewing calls and fixing wrong answers.',
    },
    {
      question: 'How do I know if an AI receptionist will pay for itself?',
      answer:
        'Multiply your missed calls a month by the share that would have booked and by your average job value. If that is more than the monthly cost, it pays. Your phone system or carrier can usually show missed and after-hours calls for the last 90 days.',
    },
  ],
  sources: [
    { label: 'Dialzara pricing', url: 'https://dialzara.com/pricing/', note: 'Plan minutes, prices, overage rates, trial and setup fees. Read Nov 6, 2026.' },
    { label: 'Goodcall FAQ', url: 'https://www.goodcall.com/faq', note: 'Starter, Growth and Scale prices, per-customer billing and overage. Read Nov 6, 2026.' },
    { label: 'Smith.ai AI Receptionist', url: 'https://smith.ai/ai-receptionist', note: 'Free, Pro and Enterprise plans, per-call rates, human escalation. Read Nov 6, 2026.' },
    { label: 'Ruby plans and pricing', url: 'https://www.ruby.com/plans-and-pricing/', note: 'Receptionist minute plans from $250 a month. Read Nov 6, 2026.' },
    {
      label: 'HighLevel AI Products Pricing',
      url: 'https://help.gohighlevel.com/support/solutions/articles/155000006652',
      note: 'Voice AI per-minute rates (updated Oct 29, 2026), with phone rates from the Phone System Pricing guide (updated Oct 12, 2026) and A2P fees (updated Sep 24, 2026). Read Oct 31, 2026.',
    },
  ],
  related: ['ai-receptionist-vs-answering-service', 'ai-receptionist-vs-hiring-a-receptionist', 'what-is-an-ai-agent'],
  queries: ['ai receptionist cost', 'ai receptionist pricing', 'how much does an ai receptionist cost', 'ai answering service cost', 'answering service cost', 'virtual receptionist cost'],
};

export default article;
