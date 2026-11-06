// Rewritten Nov 6, 2026 from the v2 post of the same slug, for owners of
// service businesses. Kept: apply the margin on an extra job (not blended gross
// or net margin), subtract the run cost, then apply the multiple; capacity
// matters. Cut: the $3.0M leak at a $40M business, the old diagnostic offer,
// operational-diligence and operating-partner framing. Definitions from CFI
// and Wikipedia; HVAC multiples from Capstone Partners (all opened).
// Target: "how does revenue affect business valuation", "ebitda leak".

import type { Article } from '../types';

const article: Article = {
  slug: 'how-to-price-a-revenue-leak-in-ebitda',
  category: 'value',
  kind: 'Guide',
  title: 'How to price a revenue leak in EBITDA, and in what your business is worth',
  seoTitle: 'How to Price a Revenue Leak in EBITDA',
  description:
    'Take the revenue a leak costs you, keep only the margin on an extra job, subtract what the fix costs to run, then apply your multiple. A worked example.',
  datePublished: '2026-09-23',
  dateModified: '2026-11-06',
  lastChecked: '2026-11-06',
  cover: { style: 'stat', value: '9.5x', label: 'average EV/EBITDA for HVAC services deals, 2024 to 2026 (Capstone Partners)' },
  coverAlt: 'A large 9.5x with the note that HVAC services deals averaged 9.5 times EBITDA from 2024 to 2026, per Capstone Partners.',
  intro: [
    'To price a revenue leak in EBITDA, take the revenue you can realistically win back, multiply it by the margin you keep on an extra job, and subtract what the fix costs to run each year. Multiply that by the earnings multiple a buyer would pay for your business, and you have what the leak is costing you in sale value.',
    'The step most people get wrong is the margin. An extra job doesn’t carry your overall profit margin, because the rent, the software and the office are already paid for; it carries the margin left after the costs that rise with each job.',
  ],
  tldr: [
    'EBITDA impact = recovered revenue × margin on an extra job − yearly cost of the fix.',
    'Use the margin left after costs that rise with each job (materials, labour, commission), not your overall profit margin.',
    'Value impact = EBITDA impact × the multiple a buyer would pay for a business like yours.',
    'It only works if you have the crew or capacity to do the extra jobs; otherwise the leak isn’t really recoverable yet.',
  ],
  sections: [
    {
      id: 'ebitda',
      heading: 'What is EBITDA, and why does a buyer care?',
      paragraphs: [
        'EBITDA is earnings before interest, taxes, depreciation and amortization. It measures what the business earns from its operations alone, before financing and accounting choices, which is why buyers use it to compare businesses and why most offers are quoted as a multiple of it.',
        'For smaller businesses, brokers often use seller’s discretionary earnings (SDE) instead, which adds back the owner’s own pay. The method below works the same either way. How the multiples themselves are set is in /blog/what-is-my-business-worth.',
      ],
    },
    {
      id: 'margin',
      heading: 'Which margin should I use?',
      paragraphs: [
        'The margin on an extra job, often called contribution margin. It is the price of the job minus the costs that rise with it: materials, the technician’s time, fuel, card fees, any commission. Costs that stay the same however many jobs you do, like rent, insurance and office salaries, are left out.',
        'This is usually higher than your overall net margin and lower than your gross margin if your gross margin hides some per-job costs. Using net margin undervalues the leak; using revenue overvalues it badly.',
      ],
      callout:
        'A real example of the gap: a solar reactivation campaign we ran produced over $28,000 in gross margin and $24,500 in net profit (/evidence/solar-dormant-database). The revenue figure was bigger still. Always say which number you mean.',
    },
    {
      id: 'worked-example',
      heading: 'What does the calculation look like?',
      paragraphs: [
        'Here is an illustration with round numbers for a home services business. It is not a client result.',
      ],
      table: {
        caption: 'An illustrative chain from recovered revenue to EBITDA to value, with round numbers. It is not a client result and not a price quote.',
        columns: [
          { key: 'step', label: 'Step' },
          { key: 'value', label: 'Value' },
        ],
        rows: [
          { step: 'Revenue you can realistically win back per year', value: '$120,000' },
          { step: 'Margin on an extra job', value: '35%' },
          { step: 'Extra profit before the fix', value: '$42,000' },
          { step: 'Yearly cost of the fix', value: '$12,000' },
          { step: 'EBITDA impact', value: '$30,000' },
          { step: 'Value at a 4x multiple', value: '$120,000' },
          { step: 'Value at a 9.5x multiple', value: '$285,000' },
        ],
      },
    },
    {
      id: 'multiple',
      heading: 'What multiple should I use?',
      paragraphs: [
        'The one a buyer would pay for a business like yours, which depends on size, sector, how much of the revenue recurs and how much the business depends on you. There is no single right number, and a broker or M&A adviser who sees your books will give you a better one than any article.',
        'As one dated reference point: Capstone Partners reported that HVAC services deals averaged 9.5x EV/EBITDA between 2024 and 2026, down from 13.3x in 2021 to 2023. Those are mostly larger deals; owner-run businesses usually sell for less. More on HVAC specifically is in /blog/hvac-business-valuation.',
      ],
    },
    {
      id: 'capacity',
      heading: 'What if my crews are already fully booked?',
      paragraphs: [
        'Then the leak isn’t fully recoverable yet, and the maths above overstates it. Winning back a call you can’t schedule just moves the disappointment from the phone to the calendar.',
        'Two things help. Recovered leads can fill slow weeks and off-season gaps, which is often where the real gain is. And recovered demand lets you raise prices or be choosier about jobs, which lifts the margin on the work you already do. Either way, check your utilisation before you count the full figure.',
      ],
    },
    {
      id: 'beyond',
      heading: 'Does fixing a leak raise the multiple, too?',
      paragraphs: [
        'It can. Buyers pay more for earnings they trust will continue. A business where calls are answered, quotes are chased and renewals go out on a schedule, whoever is on holiday, is less dependent on the owner and on any one employee. That is a risk a buyer otherwise prices in.',
        'So the full gain from a leak fix is the extra EBITDA times the multiple, plus whatever the multiple itself improves. That second part is harder to put a number on, which is why we only count the first. For home services specifically, see /industries/home-services.',
      ],
    },
  ],
  faq: [
    {
      question: 'How do I convert lost revenue into EBITDA?',
      answer:
        'Multiply the revenue you can realistically win back by the margin on an extra job, after the costs that rise with each job, then subtract what the fix costs to run each year. The result is the change in EBITDA.',
    },
    {
      question: 'Should I use gross margin or net margin?',
      answer:
        'Neither, strictly. Use contribution margin: the price of an extra job minus the costs that rise with it. Fixed costs like rent and office salaries don’t change when you win one more job, so they shouldn’t be subtracted.',
    },
    {
      question: 'What EBITDA multiple do service businesses sell for?',
      answer:
        'It varies widely by size and sector. Capstone Partners reported HVAC services deals averaging 9.5x EV/EBITDA between 2024 and 2026, but those are mostly larger deals, and owner-run businesses usually sell for less.',
    },
    {
      question: 'Does more revenue always increase what my business is worth?',
      answer:
        'Only if it turns into earnings. Revenue that costs as much to deliver as it brings in adds nothing to EBITDA. Revenue won back from leads you already paid for usually carries a good margin, which is why leak fixes tend to move value.',
    },
    {
      question: 'What if I don’t have the capacity for more jobs?',
      answer:
        'Then count only the jobs you could actually schedule, such as filling slow weeks. Extra demand can also support higher prices, which raises the margin on the work you already do.',
    },
    {
      question: 'Is SDE different from EBITDA for this calculation?',
      answer:
        'The method is the same. SDE adds back the owner’s pay and perks, so the base number is larger, but the extra profit from a leak fix adds to SDE and EBITDA in the same way.',
    },
  ],
  sources: [
    {
      label: 'Corporate Finance Institute, What is EBITDA?',
      url: 'https://corporatefinanceinstitute.com/resources/valuation/what-is-ebitda/',
      note: 'Defines EBITDA as a measure of a company’s ability to generate earnings from its operations alone, and its use in EV/EBITDA valuation. Read Nov 6, 2026.',
    },
    {
      label: 'Wikipedia, Contribution margin',
      url: 'https://en.wikipedia.org/wiki/Contribution_margin',
      note: 'Explains how contribution separates variable costs from fixed costs, unlike gross margin. Read Nov 6, 2026.',
    },
    {
      label: 'Capstone Partners, HVAC Services M&A Update',
      url: 'https://www.capstonepartners.com/insights/article-hvac-services-ma-update/',
      note: 'Reports average HVAC services multiples of 9.5x EV/EBITDA for 2024 to YTD 2026, down from 13.3x in 2021 to 2023. Read Nov 6, 2026.',
    },
    {
      label: 'Hexona case study: solar dormant database',
      url: 'https://www.hexonasystems.com/evidence/solar-dormant-database',
      note: 'Gross margin and net profit counted in the client’s GoHighLevel account. Read Nov 6, 2026.',
    },
  ],
  related: ['what-is-my-business-worth', 'hvac-business-valuation', 'how-to-measure-roi-on-closing-a-revenue-leak'],
  queries: ['how to price a revenue leak', 'lost revenue ebitda', 'how does revenue affect business valuation', 'contribution margin ebitda'],
};

export default article;
