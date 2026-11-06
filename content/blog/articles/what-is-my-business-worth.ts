// Target: "what is my business worth" (1,300/mo US, DataforSEO Nov 6, 2026), "how to
// value a small business" (390), "business valuation multiples" (110), "sde
// multiple" (140), "ebitda multiple small business". Market data from BizBuySell
// (2025 year in review; industry multiples page covering Q3 2021 to Q2 2026). Both
// BizBuySell pages returned HTTP 403 to our reader on Nov 6, 2026, so the figures
// were confirmed on Business Exits' recap (2.61x average, $158,950 median cash flow)
// and Hyperresearch's guide (2.58x average of price/SDE, Q3 2021 to Q2 2026). The
// "up 1%" change could not be confirmed and was cut. IBBA / M&A Source Market Pulse
// Q2 2026 highlights PDF for segment definitions and multiples (the full results
// page is password protected). Hexona figures from content/evidence.ts.

import type { Article } from '../types';

const article: Article = {
  slug: 'what-is-my-business-worth',
  category: 'value',
  kind: 'Guide',
  title: 'What is my business worth? How buyers value a service business',
  seoTitle: 'What Is My Business Worth? A Buyer\u2019s View',
  description:
    'Small service businesses sell for a multiple of their cash flow. How SDE and EBITDA multiples work, what the market pays in 2026, and what moves your number.',
  datePublished: '2026-11-06',
  dateModified: '2026-11-06',
  lastChecked: '2026-11-06',
  cover: { style: 'stat', value: '2.61x', label: 'Average cash flow multiple on small businesses sold in 2025 (BizBuySell)' },
  coverAlt: 'A large figure reading 2.61x, labelled as the average cash flow multiple on small businesses sold in 2025 according to BizBuySell.',
  intro: [
    'Your business is worth roughly what a buyer will pay for its cash flow: a yearly earnings figure (SDE for smaller businesses, EBITDA for larger ones) multiplied by a number that reflects how risky and transferable that cash flow looks. On BizBuySell, small businesses sold in 2025 went for an average of 2.61 times their cash flow.',
    'That average hides a wide range. Two plumbing companies with the same profit can sell for very different prices, because the buyer is paying for next year’s earnings, and some businesses make next year look a lot safer than others.',
    'This guide covers how the math works, what the market is paying as of November 2026, and the things that push your multiple up or down. It is not a valuation. For a number you can take to a bank or a buyer, talk to a business broker or a credentialed valuation professional.',
  ],
  tldr: [
    'Value is an earnings figure times a multiple. Smaller businesses are priced on SDE, larger ones on EBITDA.',
    'BizBuySell reports an average cash flow multiple of 2.61x for small businesses sold in 2025, with median cash flow of $158,950.',
    'Businesses priced on EBITDA (usually above about $2M in value) tend to get higher multiples than Main Street businesses priced on SDE.',
    'The multiple moves with risk: owner dependence, customer concentration, recurring revenue, clean books and growth.',
    'You can raise the multiple before you ever sell, and the same changes make the business easier to run today.',
  ],
  sections: [
    {
      id: 'formula',
      heading: 'How do buyers work out what a business is worth?',
      paragraphs: [
        'Almost every small business sale starts with one formula: **earnings times a multiple**. The earnings tell the buyer how much cash the business throws off. The multiple tells you how many years of that cash they are willing to pay for up front.',
        'Buyers also look at assets (trucks, equipment, inventory) and sometimes revenue, but for a service business with steady profit, the earnings multiple is what sets the price. Everything else gets argued about around it.',
        'So there are only two levers: make the earnings bigger, or make them look safer so the multiple goes up. Most owners only ever work on the first one.',
      ],
      figure: {
        kind: 'steps',
        caption: 'how a buyer gets from your books to a price',
        items: ['Adjusted earnings (SDE or EBITDA)', 'Times a multiple', 'Plus or minus assets and debt', 'Offer price'],
      },
    },
    {
      id: 'sde-vs-ebitda',
      heading: 'What is the difference between SDE and EBITDA?',
      paragraphs: [
        '**SDE (seller’s discretionary earnings)** is profit before taxes, interest, depreciation and amortization, with the owner’s own salary and personal perks added back. It answers: how much does this business pay one owner-operator who runs it full time? Buyers use it for Main Street businesses, where the new owner is usually going to work in the business.',
        '**EBITDA** also adds back interest, taxes, depreciation and amortization, but it treats a market-rate salary for the manager as a real cost. It answers: how much does this business earn if someone is paid to run it? Private equity and larger buyers use it because they are not planning to run the trucks themselves.',
        'The IBBA and M&A Source, two US associations of business brokers and M&A advisors, draw the line at deal size in their Market Pulse survey: they call businesses valued up to $2M "Main Street" and $2M to $50M the "lower middle market". Main Street deals are mostly priced on SDE, larger ones mostly on EBITDA.',
      ],
      table: {
        caption: 'SDE vs EBITDA at a glance.',
        columns: [
          { key: 'item', label: '' },
          { key: 'sde', label: 'SDE' },
          { key: 'ebitda', label: 'EBITDA' },
        ],
        rows: [
          { item: 'Owner’s salary', sde: 'Added back', ebitda: 'Replaced with a market-rate manager salary' },
          { item: 'Typical buyer', sde: 'An owner-operator, often with an SBA loan', ebitda: 'Private equity, a larger competitor, a roll-up' },
          { item: 'Typical deal size', sde: 'Up to about $2M in value', ebitda: 'About $2M and up' },
          { item: 'Multiples', sde: 'Lower', ebitda: 'Higher, because the earnings do not depend on one person' },
        ],
      },
      callout:
        'The same business gives a bigger SDE figure than EBITDA figure, and a lower multiple on SDE. Never compare an SDE multiple with an EBITDA multiple as if they were the same thing.',
    },
    {
      id: 'market',
      heading: 'What multiples are small businesses selling for in 2026?',
      paragraphs: [
        'BizBuySell, one of the biggest online marketplaces for buying and selling small businesses, publishes what businesses reported through it actually sold for. Its 2025 year in review reports an average cash flow multiple of 2.61x and median cash flow of $158,950 for businesses that sold. Note the mix: the multiple is an average, the cash flow figure is a median.',
        'Its industry multiples page, which uses sales from Q3 2021 through Q2 2026, puts the average across all sectors at 2.58x cash flow (sale price divided by SDE, which BizBuySell calls cash flow). Those are mostly Main Street businesses.',
        'The broker associations see the same split by size. In the IBBA and M&A Source Market Pulse for Q2 2026, Main Street businesses sold for about 2x SDE under $500,000 in value, rising to about 3x SDE between $1M and $2M. Above $2M, where the survey switches to EBITDA, multiples were about 4x for $2M to $5M and about 5.8x for $5M to $50M.',
        'Larger, systemized businesses priced on EBITDA trade higher still. In HVAC services, for example, Capstone Partners’ July 2026 update puts the average at 9.5x EBITDA for 2024 to year to date 2026. That is a different market: companies big enough for their deals to be reported, often bought by private equity. We break that one down in /blog/hvac-business-valuation.',
      ],
      figure: {
        kind: 'stats',
        caption: 'what small business buyers paid, BizBuySell figures as reported by Business Exits and Hyperresearch (read Nov 6, 2026)',
        items: [
          { value: '2.61x', label: 'Average cash flow multiple, businesses sold in 2025' },
          { value: '$158,950', label: 'Median cash flow of businesses sold in 2025' },
          { value: '2.58x', label: 'All-sector average, sales from Q3 2021 to Q2 2026' },
        ],
      },
      callout:
        'Averages are a starting point, not your number. A buyer pays for your specific risk, and that is where the multiple is won or lost.',
    },
    {
      id: 'what-moves-it',
      heading: 'What makes one business worth more than another with the same profit?',
      paragraphs: [
        'The multiple is a price on risk. Buyers ask one question over and over: if I buy this, will the earnings still be there in two years without the person who built them? These are the things that answer it.',
      ],
      table: {
        caption: 'What pushes a service business multiple up or down.',
        columns: [
          { key: 'driver', label: 'Driver' },
          { key: 'lower', label: 'Pulls the multiple down' },
          { key: 'higher', label: 'Pushes it up' },
        ],
        rows: [
          { driver: 'Owner dependence', lower: 'Every quote, sale and big decision goes through you', higher: 'The business runs for weeks without you' },
          { driver: 'Recurring revenue', lower: 'Every month starts from zero', higher: 'Maintenance plans, contracts, memberships renew on their own' },
          { driver: 'Customer concentration', lower: 'One or two customers are a big share of revenue', higher: 'Revenue spread across many customers' },
          { driver: 'Clean books', lower: 'Numbers pulled together when someone asks', higher: 'Monthly financials ready on time, every month' },
          { driver: 'Key people', lower: 'One tech or office manager holds it all together', higher: 'Documented processes, anyone can be trained in' },
          { driver: 'Growth', lower: 'Flat or falling, no clear source of new work', higher: 'Steady growth from leads and customers you already have' },
        ],
      },
    },
    {
      id: 'example',
      heading: 'What does a higher multiple look like in dollars?',
      paragraphs: [
        'Take two home service businesses that each produce $300,000 of SDE. The first runs through the owner: he quotes every job, answers the phone at night and keeps the customer list in his head. The second has documented processes, a maintenance plan base and someone else managing the schedule.',
        'If the first sells near the BizBuySell average of about 2.6x, that is roughly $780,000. If the second earns even half a turn more, 3.1x, that is about $930,000. Same profit, same trucks, about $150,000 apart, purely on how safe the earnings look. These are illustrations of how the math works, not quotes for your business.',
      ],
      figure: {
        kind: 'bars',
        caption: 'the same $300,000 of SDE at different multiples (illustration)',
        items: [
          { label: 'At 2.6x', value: 780000, display: '$780,000' },
          { label: 'At 3.1x', value: 930000, display: '$930,000' },
          { label: 'At 3.6x', value: 1080000, display: '$1,080,000' },
        ],
      },
    },
    {
      id: 'raise-it',
      heading: 'How can you raise what your business is worth before you sell?',
      paragraphs: [
        'Most of the things buyers pay for are also the things that make the business easier to own right now. Start with the ones that show up in your numbers fastest.',
      ],
      steps: [
        { title: 'Stop losing revenue you already paid for', detail: 'Missed calls, slow replies and old estimates nobody followed up. A tire shop we worked with recovered over $50,000 after we set up instant text replies to missed calls, social media chat and online booking (/evidence/tire-shop-missed-calls).' },
        { title: 'Build a recurring base', detail: 'Maintenance plans, service agreements and memberships. Buyers value revenue that shows up next year without a new sale. A coffee chain we worked with took retention from 27% to 68% with a text-based loyalty programme that included automated win-backs (/evidence/coffee-loyalty-programme).' },
        { title: 'Get the work out of your head', detail: 'Write down how jobs are quoted, scheduled and closed out. Hand the repetitive parts to people or to /ai-employees, so the business does not stop when you do. The full playbook is in /blog/how-to-make-your-business-run-without-you.' },
        { title: 'Close the books every month', detail: 'Clean monthly financials are the first thing a buyer’s accountant asks for, and the fastest way to lose a buyer’s trust is numbers that change every time you send them.' },
        { title: 'Measure where you stand', detail: 'Take the Enterprise Value Score at /score. It rates you on the 10 things buyers look at and shows your two biggest gaps in about five minutes.' },
      ],
    },
    {
      id: 'valuation',
      heading: 'When do you need a formal valuation?',
      paragraphs: [
        'If you are selling, bringing in a partner, buying someone out, planning an estate or applying for an SBA-backed loan, you need a real valuation from a business broker or a credentialed appraiser, not an online calculator and not a blog post. They will look at your actual books, your market and recent comparable sales.',
        'Where we fit is the work before that: making the business worth more by the time someone puts a number on it. If you want to talk through which changes would move your multiple first, /book.',
      ],
    },
  ],
  faq: [
    {
      question: 'How do I calculate what my small business is worth?',
      answer:
        'Start with a year of adjusted earnings, usually seller’s discretionary earnings (SDE) for a smaller business, then multiply by a multiple that reflects risk. BizBuySell reports an average of 2.61x cash flow for small businesses sold in 2025. Your multiple will be higher or lower depending on owner dependence, recurring revenue and how clean your books are.',
    },
    {
      question: 'What is a good SDE multiple for a small business?',
      answer:
        'Across all industries, BizBuySell puts the average at 2.58x cash flow for sales from Q3 2021 through Q2 2026. Businesses with recurring revenue, documented processes and an owner who is not essential to daily operations tend to sell above the average; owner-dependent businesses tend to sell below it.',
    },
    {
      question: 'What is the difference between SDE and EBITDA?',
      answer:
        'SDE adds the owner’s salary and perks back to profit, so it shows what the business pays one owner-operator. EBITDA treats a market-rate manager salary as a cost, so it shows what the business earns if someone is paid to run it. Smaller businesses are usually priced on SDE, larger ones on EBITDA.',
    },
    {
      question: 'Why would a buyer pay a higher multiple for my business?',
      answer:
        'Because the earnings look safer. Recurring revenue, many small customers instead of a few big ones, clean monthly financials, documented processes and an owner who is not needed day to day all reduce the buyer’s risk, and buyers pay more for lower risk.',
    },
    {
      question: 'Is an online business valuation calculator accurate?',
      answer:
        'It can give you a rough range, but it can’t see the things that move your multiple, such as how dependent the business is on you or how much revenue renews on its own. For a number you can rely on, use a business broker or a credentialed valuation professional.',
    },
    {
      question: 'Is the Enterprise Value Score a valuation?',
      answer:
        'No. The Enterprise Value Score rates your business out of 100 on the 10 drivers buyers look at and shows your two biggest gaps. It tells you what to fix first, not what the business would sell for.',
    },
  ],
  sources: [
    {
      label: 'BizBuySell, 2025 Year in Review',
      url: 'https://www.bizbuysell.com/blog/2025-year-in-review/',
      note: 'Primary source for the 2025 figures. The page refused our automated reader (HTTP 403) on Nov 6, 2026; figures confirmed via the Business Exits recap below.',
    },
    {
      label: 'Business Exits, BizBuySell’s 2025 market recap',
      url: 'https://businessexits.com/bizbuysells-2025-market-recap-what-the-data-shows-for-business-sellers/',
      note: 'Average cash flow multiple of 2.61x and median cash flow of $158,950 for businesses sold on BizBuySell in 2025. Read Nov 6, 2026.',
    },
    {
      label: 'BizBuySell, Business valuation multiples by industry',
      url: 'https://www.bizbuysell.com/learning-center/industry-valuation-multiples/',
      note: 'Primary source for the 2.58x all-sector average. Refused our automated reader (HTTP 403) on Nov 6, 2026; figure confirmed via the Hyperresearch guide below.',
    },
    {
      label: 'Hyperresearch, Small business valuation multiples by industry (2026)',
      url: 'https://hyperresearch.ai/guides/small-business-valuation-multiples',
      note: 'BizBuySell’s five-year all-sector average of 2.58x (sale price over SDE), Q3 2021 to Q2 2026. Read Nov 6, 2026.',
    },
    {
      label: 'IBBA and M&A Source, Market Pulse Q2 2026 highlights',
      url: 'https://www.ibba.org/wp-content/uploads/2026/08/mp-highlights-q2-2026.pdf',
      note: 'Main Street (under $2M) and lower middle market ($2M to $50M) segments, and Q2 2026 multiples by size: SDE under $2M, EBITDA above. Read Nov 6, 2026.',
    },
    {
      label: 'Capstone Partners, HVAC Services M&A Update (July 2026)',
      url: 'https://www.capstonepartners.com/insights/article-hvac-services-ma-update/',
      note: 'Average of 9.5x EV/EBITDA for HVAC services from 2024 to year to date 2026 (dated Jul 27, 2026; the sample behind the average is not stated). Read Nov 6, 2026.',
    },
  ],
  related: ['how-to-make-your-business-run-without-you', 'hvac-business-valuation', 'hvac-maintenance-agreements'],
  queries: ['what is my business worth', 'how to value a small business', 'business valuation multiples', 'sde multiple', 'ebitda multiple small business'],
};

export default article;
