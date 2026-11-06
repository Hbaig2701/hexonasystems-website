// Rewritten Nov 6, 2026 from the v2 post of the same slug, for owners of
// service businesses. Kept: the five places leakage hides, and the idea that
// it never shows up in normal reports. Cut: the old diagnostic offer, the
// "found/sealed" jargon, and the unsourced 500-audit and $100M figures.
// Research figures from SmartCompany's quote of the 2011 HBR study (opened);
// HBR's own page is paywalled past the title. Case figures from content/evidence.ts.
// Target: "what is revenue leakage", "revenue leakage", "lost leads".

import type { Article } from '../types';

const article: Article = {
  slug: 'what-is-revenue-leakage',
  category: 'value',
  kind: 'Guide',
  title: 'What is revenue leakage? Where a service business loses money it already paid for',
  seoTitle: 'What Is Revenue Leakage?',
  description:
    'Revenue leakage is demand you paid for and then lost: the unanswered call, the quote nobody chased. Where it hides in a service business and how to measure it.',
  datePublished: '2026-09-23',
  dateModified: '2026-11-06',
  lastChecked: '2026-11-06',
  cover: { style: 'stat', value: '23%', label: 'of US companies never answered a web enquiry in an HBR audit of 2,241 firms' },
  coverAlt: 'A large 23% with the note that 23% of US companies never answered a web enquiry in an HBR audit of 2,241 firms.',
  intro: [
    'Revenue leakage is money a business already paid to attract and then lost after the customer reached out: the call that went to voicemail, the quote nobody followed up, the maintenance plan nobody renewed. In a service business it is usually the cheapest revenue there is, because the marketing has already been paid for.',
    'It is also the hardest to see. A caller who hangs up and rings the next company leaves no record, no complaint and no bad review. The marketing report says the ads worked, the sales report says the team closed what it got, and nobody reports on the people who never got through.',
  ],
  tldr: [
    'Revenue leakage is demand you paid for and lost through slow or missing follow-up, not through price or quality.',
    'It hides in five places: slow replies, unwatched channels, no second follow-up, wrong hand-offs and missed renewals.',
    'Your normal reports can’t show it, because a lead that was never captured leaves no record.',
    'Measure it with your own numbers: how fast you reply, how often you follow up, and how each affects what closes.',
  ],
  sections: [
    {
      id: 'definition',
      heading: 'What counts as revenue leakage?',
      paragraphs: [
        'A customer found you, decided to reach out, and spent their time doing it. Everything up to that point cost you money: the ads, the website, the Google profile, the truck wrap. Leakage is what happens after that, when the business fails to answer or fails to follow through.',
        'It is different from losing a job on price or losing to a competitor with better reviews. Those are sales and marketing problems. Leakage is an operations problem: the work depended on somebody remembering to do it, and nobody did.',
      ],
      callout:
        'A quick test: if the fix is "answer faster" or "follow up again" rather than "sell better" or "advertise more", it is leakage.',
    },
    {
      id: 'why-invisible',
      heading: 'Why doesn’t it show up in my reports?',
      paragraphs: [
        'Because every report starts from a record, and leakage is the absence of one. Your CRM or field-service software counts the jobs it received. It can’t count the call that rang out at 7 p.m. while the crew was finishing a job, or the web form that landed in an inbox nobody checks anymore.',
        'So the usual conclusion is that the market got harder or the ads stopped working. Most of the time the demand is still arriving. It just isn’t being caught.',
      ],
    },
    {
      id: 'five-places',
      heading: 'Where does a service business leak revenue?',
      paragraphs: ['In almost every business we look at, it sits in the same five places.'],
      table: {
        caption: 'The five common leaks in a service business and what each looks like day to day.',
        columns: [
          { key: 'leak', label: 'Leak' },
          { key: 'looks', label: 'What it looks like' },
          { key: 'fix', label: 'What fixes it' },
        ],
        rows: [
          { leak: 'Slow replies', looks: 'Calls go to voicemail on a job; web forms get answered the next day', fix: 'Answer every call and reply to every form within minutes, 24/7' },
          { leak: 'Unwatched channels', looks: 'A second phone line, Facebook messages, a chat widget nobody opens', fix: 'Route every channel into one place someone (or something) watches' },
          { leak: 'No second follow-up', looks: 'One quote email goes out, the customer goes quiet, nothing happens', fix: 'Automatic follow-up until the customer says yes or no' },
          { leak: 'Wrong hand-offs', looks: 'The lead reached the office but not the estimator or the right location', fix: 'Clear routing rules and a record of who owns each lead' },
          { leak: 'Missed renewals', looks: 'Maintenance plans and repeat customers lapse because nobody reminded them', fix: 'Renewal reminders and win-back messages on a schedule' },
        ],
      },
    },
    {
      id: 'research',
      heading: 'How common is it?',
      paragraphs: [
        'More common than most owners expect. In a study published in Harvard Business Review in March 2011, researchers sent a test enquiry through the websites of 2,241 US companies and timed the replies. 37% answered within an hour, 16% within one to 24 hours, 24% took longer than a day, and 23% never answered at all. Among the companies that did reply within 30 days, the average wait was 42 hours.',
        'The same researchers looked separately at 1.25 million leads across 42 US companies. Firms that tried to reach a lead within an hour were nearly seven times as likely to have a real conversation with a decision maker as firms that waited even one hour longer. The full breakdown is in /blog/speed-to-lead.',
      ],
      figure: {
        kind: 'bars',
        caption: 'how 2,241 US companies answered a test web enquiry (HBR, March 2011)',
        items: [
          { label: 'Within an hour', value: 37, display: '37%' },
          { label: '1 to 24 hours', value: 16, display: '16%' },
          { label: 'More than 24 hours', value: 24, display: '24%' },
          { label: 'Never', value: 23, display: '23%' },
        ],
      },
    },
    {
      id: 'measure',
      heading: 'How do you measure revenue leakage?',
      paragraphs: [
        'With your own numbers, not an industry benchmark. The method is simple and a little tedious:',
      ],
      steps: [
        { title: 'List every way customers reach you', detail: 'Main line, second line, web forms, Google Business Profile messages, Facebook, Instagram, email. The ones you forget are usually the ones leaking.' },
        { title: 'Time the first real reply', detail: 'For last month’s enquiries, note when a person (not an autoresponder) first answered. Your phone system’s call log and your form inbox have the timestamps.' },
        { title: 'Count the gaps', detail: 'How many calls were missed and never called back? How many quotes got one email and nothing else? How many past customers didn’t come back?' },
        { title: 'Price it with your own close rate', detail: 'Missed enquiries times your normal close rate times your average job value. Be conservative: not every missed caller was going to buy.' },
      ],
      callout:
        'Write the baseline down before you change anything. Once the new process is running, the old numbers are gone, and you won’t be able to show what changed.',
    },
    {
      id: 'example',
      heading: 'What does fixing it look like in practice?',
      paragraphs: [
        'One tire shop we worked with was sending more than 600 calls a month to voicemail during the winter rush. The shop’s own arithmetic put the loss at $40,000 to $50,000 a month. After a missed-call assistant, social chatbots and self-booking went in, 40% of missed leads were re-engaged, booked appointments rose 50%, and the shop recovered more than $50,000 (/evidence/tire-shop-missed-calls).',
        'A solar installer had more than 4,000 homeowners who had shown interest and never bought, and nobody had gone back to them. A reactivation campaign re-engaged 832 of them and produced $24,500 in net profit in under three weeks (/evidence/solar-dormant-database).',
        'Both are the same fix: work that depended on someone remembering now runs on its own. That is the job of an AI employee, starting with /ai-employees/ai-receptionist for calls and /ai-employees/ai-sales-follow-up for follow-up.',
      ],
    },
    {
      id: 'value',
      heading: 'Why does leakage matter when you sell the business?',
      paragraphs: [
        'A buyer pays for earnings and for how reliable those earnings look. Leakage hurts both. It lowers the revenue you could be booking, and it shows the business depends on people remembering things, which is a risk a buyer prices in.',
        'Closing it raises the first number and lowers the second risk, which is why it is usually the first thing we fix. The order we work in is in /blog/which-revenue-leaks-to-close-first. If you want help finding yours, /book.',
      ],
    },
  ],
  faq: [
    {
      question: 'What is revenue leakage in simple terms?',
      answer:
        'Revenue leakage is money a business already paid to attract and then lost after the customer reached out, because nobody answered, nobody followed up, or nobody reminded them to renew. It is an operations problem, not a pricing or marketing problem.',
    },
    {
      question: 'What causes revenue leakage in a service business?',
      answer:
        'The most common causes are missed and slow calls, enquiries in channels nobody watches, quotes with no second follow-up, leads handed to the wrong person or location, and maintenance plans or repeat customers that lapse without a reminder.',
    },
    {
      question: 'How do I know if my business is leaking revenue?',
      answer:
        'Check last month’s call log for missed calls that were never returned, time how long web forms waited for a reply, and count quotes that got one email and nothing more. If any of those numbers surprise you, you are leaking.',
    },
    {
      question: 'Is revenue leakage the same as lost sales?',
      answer:
        'No. A lost sale is a customer who heard your offer and chose someone else. Leakage is a customer who never got a proper answer or follow-up, so they never had the chance to choose you.',
    },
    {
      question: 'How do you stop revenue leakage?',
      answer:
        'Make the steps that depend on someone remembering run automatically: answer every call and form within minutes, follow up quotes until you get a yes or no, route every channel to one place, and send renewal reminders on a schedule.',
    },
    {
      question: 'Does fixing leakage increase what my business is worth?',
      answer:
        'It usually does. Recovered revenue lifts earnings, and a business whose follow-up runs on systems instead of on the owner looks less risky to a buyer, which supports a better multiple.',
    },
  ],
  sources: [
    {
      label: 'Harvard Business Review, The Short Life of Online Sales Leads (March 2011)',
      url: 'https://hbr.org/2011/03/the-short-life-of-online-sales-leads',
      note: 'The original article by Oldroyd, McElheran and Elkington. Opened Nov 6, 2026; only the title and summary are public, the text is paywalled.',
    },
    {
      label: 'SmartCompany, Are you letting online leads go cold?',
      url: 'https://www.smartcompany.com.au/marketing/20110704-are-you-letting-online-leads-go-cold/',
      note: 'Quotes the HBR study’s figures: 2,241 companies, 37%, 16%, 24%, 23%, the 42-hour average and the 1.25 million lead analysis. Read Nov 6, 2026.',
    },
    {
      label: 'Hexona case study: tire shop missed calls',
      url: 'https://www.hexonasystems.com/evidence/tire-shop-missed-calls',
      note: 'Client figures measured in the shop’s own systems. Read Nov 6, 2026.',
    },
    {
      label: 'Hexona case study: solar dormant database',
      url: 'https://www.hexonasystems.com/evidence/solar-dormant-database',
      note: 'Client figures measured in the client’s GoHighLevel account. Read Nov 6, 2026.',
    },
  ],
  related: ['which-revenue-leaks-to-close-first', 'speed-to-lead', 'missed-call-text-back'],
  queries: ['what is revenue leakage', 'revenue leakage', 'lost leads small business', 'missed calls lost revenue'],
};

export default article;
