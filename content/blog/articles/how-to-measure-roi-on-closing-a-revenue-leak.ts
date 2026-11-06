// Rewritten Nov 6, 2026 from the v2 post of the same slug, for owners of
// service businesses. Kept: capture the baseline before the build and store it
// outside the systems being changed; recovered is smaller than the leak;
// payback in weeks; metrics that hold up vs "hours saved". Cut: the old
// diagnostic offer and its $5,000 fee, the $3.0M worked example, and the
// found/sealed jargon. Payback definition from CFI (opened). Case figures
// quoted exactly from content/evidence.ts.
// Target: "how to measure roi of automation", "ai roi small business".

import type { Article } from '../types';

const article: Article = {
  slug: 'how-to-measure-roi-on-closing-a-revenue-leak',
  category: 'value',
  kind: 'Guide',
  title: 'How to measure the return on fixing a revenue leak',
  seoTitle: 'How to Measure ROI on Fixing a Leak',
  description:
    'Write your numbers down before anything changes, measure them again after, and count payback in weeks. Which metrics hold up, and which don’t.',
  datePublished: '2026-09-23',
  dateModified: '2026-11-06',
  lastChecked: '2026-11-06',
  cover: {
    style: 'versus',
    left: 'Before',
    right: 'After',
    rows: [
      ['Sales team admin: 18 hrs per week', '3.5 hrs per week'],
      ['Lead to quote delivered: 3 days', 'Under 24 hours'],
    ],
  },
  coverAlt: 'A before-and-after table from a home improvement client: admin time from 18 to 3.5 hours a week, quotes from 3 days to under 24 hours.',
  intro: [
    'To measure the return on fixing a revenue leak, record your numbers before anything changes, measure the same numbers afterwards in your own systems, and compare the extra profit with what the fix costs to run. The result should be a payback period in weeks and a dollar figure you could show your accountant.',
    'Most owners skip the first step and regret it. Once the new process is running, the old numbers are overwritten, and the honest answer to “did it work?” becomes a guess.',
  ],
  tldr: [
    'Capture a baseline before the build: enquiry volume, reply speed, close rate by reply speed, job value and follow-up gaps.',
    'Store the baseline somewhere the new system can’t touch, like a dated spreadsheet or PDF export.',
    'What you win back is always smaller than the leak you measured; plan on that.',
    'Report payback in weeks and dollars recovered per year, with the system and dates they came from. Hours saved alone is weak.',
  ],
  sections: [
    {
      id: 'baseline',
      heading: 'What should I write down before anything changes?',
      paragraphs: ['Five numbers, for the last three months if you have them:'],
      bullets: [
        '**Enquiry volume by channel.** Calls, forms, texts and messages, each counted separately.',
        '**Time to first real reply.** From the call log and form inbox, not from memory.',
        '**Close rate by reply speed.** Enquiries answered within an hour versus later, and what share of each became a job.',
        '**Average job value.** Use first-year value for customers on a plan or contract.',
        '**Follow-up gaps.** The share of quotes or enquiries that got one contact and nothing more.',
      ],
      callout:
        'Export the numbers to a dated spreadsheet or PDF and keep it outside the CRM and phone system you are about to change. A new setup often rewrites old records.',
    },
    {
      id: 'after',
      heading: 'How do I measure the result?',
      paragraphs: [
        'Measure the same five numbers, the same way, over a comparable period. If the before period was a busy season, compare it with the same season, not a quiet month.',
        'Then turn the change into dollars: extra jobs booked times average job value gives recovered revenue. Multiply that by the margin you keep on an extra job, and subtract what the fix costs to run each month. That is the profit the fix adds. How to value that profit is in /blog/how-to-price-a-revenue-leak-in-ebitda.',
      ],
    },
    {
      id: 'smaller',
      heading: 'Why is the recovered amount smaller than the leak?',
      paragraphs: [
        'Because not every lost lead was a sale waiting to happen. Some missed callers were shopping around, some were outside your area, some would have said no. A fix wins back a share of the leak, never all of it.',
        'One tire shop we worked with estimated its own leak at $40,000 to $50,000 a month from its call logs. The fix re-engaged 40% of missed leads and recovered more than $50,000 (/evidence/tire-shop-missed-calls). That is a strong result, and it is still far less than a year of the leak. Plan with the smaller number and you won’t be disappointed.',
      ],
    },
    {
      id: 'payback',
      heading: 'How do I work out payback?',
      paragraphs: [
        'Payback is how long it takes for a business to get back what it put into something. For a leak fix, divide the setup cost by the extra monthly profit it produces, after the monthly running cost. If the answer is in weeks, the fix is easy to justify. If it is in years, it was probably the wrong leak to fix first (see /blog/which-revenue-leaks-to-close-first).',
      ],
      table: {
        caption: 'An illustrative payback calculation with round numbers. It is not a client result and not a price quote.',
        columns: [
          { key: 'line', label: 'Line' },
          { key: 'value', label: 'Value' },
        ],
        rows: [
          { line: 'Extra jobs booked per month', value: '6' },
          { line: 'Average job value', value: '$1,500' },
          { line: 'Recovered revenue per month', value: '$9,000' },
          { line: 'Margin kept on an extra job', value: '40%, so $3,600' },
          { line: 'Monthly running cost of the fix', value: '$1,200' },
          { line: 'Extra monthly profit', value: '$2,400' },
          { line: 'Setup cost', value: '$6,000' },
          { line: 'Payback', value: 'About 11 weeks' },
        ],
      },
    },
    {
      id: 'metrics',
      heading: 'Which metrics hold up, and which don’t?',
      table: {
        caption: 'Metrics that hold up when you show them to an accountant or buyer, and ones that don’t.',
        columns: [
          { key: 'metric', label: 'Metric' },
          { key: 'verdict', label: 'Holds up?' },
          { key: 'why', label: 'Why' },
        ],
        rows: [
          { metric: 'Time to first reply', verdict: 'Yes', why: 'Timestamped in the phone system and inbox' },
          { metric: 'Close rate by reply speed', verdict: 'Yes', why: 'Ties speed directly to booked jobs' },
          { metric: 'Revenue per enquiry', verdict: 'Yes', why: 'Captures both more jobs and better jobs' },
          { metric: 'Dollars recovered per year, with system and dates', verdict: 'Yes', why: 'Anyone can check it against the source' },
          { metric: 'Payback in weeks', verdict: 'Yes', why: 'Simple, and hard to argue with' },
          { metric: 'Hours saved', verdict: 'Weak on its own', why: 'Only worth money if the hours go to paid work or a salary you no longer pay' },
          { metric: 'Messages sent', verdict: 'No', why: 'Activity, not results' },
        ],
      },
    },
    {
      id: 'hours',
      heading: 'Is time saved worth counting at all?',
      paragraphs: [
        'Yes, if you can say where the time went. A home improvement company we worked with cut sales team admin from 18 hours a week to 3.5 and got quotes out in under 24 hours instead of 3 days. The time mattered because it went back into selling, and the business reported over $45,000 in additional monthly revenue (/evidence/home-improvement-sales-workflow).',
        'If the saved hours just disappear into the week, count them as a quality-of-life win for you and the team, not as return. For an owner who wants to step back, those hours are often the real prize; /ai-employees/ai-office-admin is where most of them come from.',
      ],
    },
  ],
  faq: [
    {
      question: 'How do you measure ROI on automation in a small business?',
      answer:
        'Record your enquiry volume, reply speed, close rate and job value before the change, measure the same numbers after in the same systems, and compare the extra profit with the monthly running cost. Express the result as payback in weeks.',
    },
    {
      question: 'What is a good payback period for an AI employee?',
      answer:
        'For a fix aimed at missed calls or quote follow-up, weeks rather than months. If the payback on a fix runs to years, it is usually the wrong leak to start with.',
    },
    {
      question: 'Why does the recovered revenue come in lower than the leak?',
      answer:
        'Not every lost lead would have booked. Some were price shopping, some were out of area, some would have said no. A fix wins back a share of the leak, so plan with the smaller figure.',
    },
    {
      question: 'Should I count hours saved as return?',
      answer:
        'Only if the hours go somewhere that earns money, like more sales calls, or replace a wage you no longer pay. Otherwise they are a real benefit, but not a dollar return.',
    },
    {
      question: 'How long should I measure before and after?',
      answer:
        'Three months before is ideal, and at least a month after, compared with the same season. A busy month against a quiet one will make any change look better or worse than it is.',
    },
    {
      question: 'Where should I keep the baseline numbers?',
      answer:
        'Outside the systems you are changing: a dated spreadsheet or PDF export saved somewhere safe. New software and new workflows often overwrite the old records you would need to compare against.',
    },
  ],
  sources: [
    {
      label: 'Corporate Finance Institute, Payback Period',
      url: 'https://corporatefinanceinstitute.com/resources/valuation/payback-period/',
      note: 'Defines the payback period as how long it takes for a business to recoup an investment. Read Nov 6, 2026.',
    },
    {
      label: 'Hexona case study: home improvement sales workflow',
      url: 'https://www.hexonasystems.com/evidence/home-improvement-sales-workflow',
      note: 'Admin hours, quote speed and revenue tracked in the client CRM after the workflow went live. Read Nov 6, 2026.',
    },
    {
      label: 'Hexona case study: tire shop missed calls',
      url: 'https://www.hexonasystems.com/evidence/tire-shop-missed-calls',
      note: 'The $40,000 to $50,000 monthly leak is the shop’s own estimate; the recovery was counted in its systems. Read Nov 6, 2026.',
    },
  ],
  related: ['how-to-price-a-revenue-leak-in-ebitda', 'which-revenue-leaks-to-close-first', 'ai-receptionist-cost'],
  queries: ['how to measure roi of automation', 'ai roi small business', 'payback period automation', 'measure revenue recovered'],
};

export default article;
