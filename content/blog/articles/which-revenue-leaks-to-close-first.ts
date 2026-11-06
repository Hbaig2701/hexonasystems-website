// Rewritten Nov 6, 2026 from the v2 post of the same slug, for owners of
// service businesses. Kept: rank by recoverable dollars over effort, the
// four-question test, and the "feels urgent but isn't" list. Cut: the old
// diagnostic offer, the found/sealed jargon and the operating-partner framing.
// Research figures from the InsideSales/MIT LRM PDF and SmartCompany's quote
// of the 2011 HBR study, both opened. Case figures from content/evidence.ts.
// Target: "which leaks to fix first", "where to start with automation".

import type { Article } from '../types';

const article: Article = {
  slug: 'which-revenue-leaks-to-close-first',
  category: 'playbooks',
  kind: 'Guide',
  title: 'Which revenue leaks should a service business fix first?',
  seoTitle: 'Which Revenue Leaks to Fix First',
  description:
    'Fix the leak with the most money to win back for the least effort, not the biggest. A four-question test and the order most service businesses should use.',
  datePublished: '2026-09-23',
  dateModified: '2026-11-06',
  lastChecked: '2026-11-06',
  cover: { style: 'type', text: 'Fix the cheapest leak first.' },
  coverAlt: 'The words "Fix the cheapest leak first." in large type beside the article title.',
  intro: [
    'Fix the leak that wins back the most money for the least effort first, which is usually missed calls and slow replies, then quote follow-up. The biggest leak on paper is often not the best place to start, because it takes the longest to fix and the longest to prove.',
    'A good first fix pays for itself in weeks, runs without the owner watching it, and gives you a clean before-and-after number. That number is what makes the second and third fixes an easy decision.',
  ],
  tldr: [
    'Rank leaks by money you can realistically win back divided by the effort to fix them, not by size alone.',
    'A leak is ready to fix when you can measure it, write the rules down, it happens often, and the process is stable.',
    'For most service businesses the order is: missed calls, quote follow-up, old leads, renewals, quote speed, then invoices.',
    'Skip projects that feel urgent but don’t move revenue, like new dashboards, until the leaks are closed.',
  ],
  sections: [
    {
      id: 'rank',
      heading: 'How should I rank the leaks in my business?',
      paragraphs: [
        'By recoverable dollars divided by effort. Recoverable means what you can realistically win back, not the whole leak: if 100 calls a month go unanswered, some of those callers were never going to book. Effort means the time and disruption to fix it, including how many people have to change how they work.',
        'A small leak that takes a week to close and shows results in a month beats a large one that needs six months and three departments. The fast win also gives you the proof and the cash for the next one.',
      ],
    },
    {
      id: 'four-questions',
      heading: 'How do I know a leak is ready to fix?',
      paragraphs: ['Ask four questions. If the answer to all four is yes, it is a good candidate.'],
      table: {
        caption: 'The four-question test for whether a leak is ready to fix now.',
        columns: [
          { key: 'question', label: 'Question' },
          { key: 'why', label: 'Why it matters' },
        ],
        rows: [
          { question: 'Can I measure it before and after in a system I own?', why: 'Without a baseline you can’t prove the fix worked, and the next decision gets harder' },
          { question: 'Can I write down the rules?', why: 'If you can explain when to reply, what to say and when to hand off, an AI employee can follow it' },
          { question: 'Does it happen often?', why: 'A leak that happens 200 times a month pays back fast; one that happens twice a year doesn’t' },
          { question: 'Is the process stable?', why: 'If you are about to change your pricing, software or team, fix the leak after the change' },
        ],
      },
    },
    {
      id: 'order',
      heading: 'What order works for most service businesses?',
      paragraphs: [
        'Every business is different, but this order holds for most of the trades, clinics and local service companies we work with:',
      ],
      table: {
        caption: 'A typical order for closing leaks in a service business, with effort and how fast results show.',
        columns: [
          { key: 'leak', label: 'Leak' },
          { key: 'effort', label: 'Effort' },
          { key: 'payback', label: 'How fast it shows' },
          { key: 'who', label: 'Who handles it' },
        ],
        rows: [
          { leak: '1. Missed calls and slow replies', effort: 'Low', payback: 'Days to weeks', who: 'AI receptionist' },
          { leak: '2. Quotes with no follow-up', effort: 'Low', payback: 'Weeks', who: 'AI sales follow-up' },
          { leak: '3. Old leads and past customers', effort: 'Low', payback: 'Weeks', who: 'Reactivation campaign' },
          { leak: '4. Lapsed maintenance plans and renewals', effort: 'Medium', payback: 'One season', who: 'AI retention' },
          { leak: '5. Slow quote turnaround', effort: 'Medium', payback: 'One to two months', who: 'AI office admin' },
          { leak: '6. Late invoices and unpaid balances', effort: 'Medium', payback: 'One to two months', who: 'AI collections' },
        ],
      },
    },
    {
      id: 'why-calls-first',
      heading: 'Why start with missed calls and slow replies?',
      paragraphs: [
        'They happen every day, they are easy to measure from your call log, and the research on response time is consistent. In the Lead Response Management study, the odds of reaching a lead dropped more than tenfold within the first hour. In an HBR audit of 2,241 US companies, only 37% answered a web enquiry within an hour.',
        'A tire shop we worked with was sending more than 600 calls a month to voicemail. After the fix, booked appointments rose 50% and the shop recovered more than $50,000 (/evidence/tire-shop-missed-calls). That is the kind of fast, clean result that funds the rest. The tool for it is /ai-employees/ai-receptionist.',
      ],
    },
    {
      id: 'old-leads',
      heading: 'Why are old leads so high on the list?',
      paragraphs: [
        'Because the money is already sitting in your CRM. Every homeowner who asked for a quote and went quiet, and every customer who hasn’t booked in two years, already knows your name. Reaching them costs a few text messages.',
        'A solar installer had more than 4,000 dormant leads. A reactivation campaign re-engaged 832 of them and booked 38 appointments in under three weeks, with no manual outreach from the sales team (/evidence/solar-dormant-database). The method is in /blog/database-reactivation.',
      ],
    },
    {
      id: 'not-urgent',
      heading: 'What feels urgent but can wait?',
      bullets: [
        'New reporting dashboards. Useful, but they show you the leak; they don’t close it.',
        'Switching CRM or field-service software. Do it if you must, but close leaks on the current system first, or after the switch settles.',
        'Rebuilding the website. A faster site helps, but not if the calls it produces still go to voicemail.',
        'Complex one-off processes that happen a few times a year. They are hard to automate and pay back slowly.',
      ],
    },
    {
      id: 'owner-time',
      heading: 'Does the order change if I want to step back from the business?',
      paragraphs: [
        'A little. If your goal is to stop being the person who answers the phone and chases quotes, put the leaks that land on you personally first, even if they are slightly smaller. Each one you hand off frees hours and makes the business easier to sell. More on that in /blog/how-to-make-your-business-run-without-you.',
        'If you want help ranking yours, /book.',
      ],
    },
  ],
  faq: [
    {
      question: 'What should a service business automate first?',
      answer:
        'For most service businesses, answering missed calls and replying to web forms within minutes comes first, followed by automatic follow-up on quotes. Both happen daily, are easy to measure and show results within weeks.',
    },
    {
      question: 'Should I fix the biggest leak first?',
      answer:
        'Not always. Rank leaks by how much you can realistically win back divided by the effort to fix them. A smaller leak that closes in a week and proves itself in a month usually beats a large one that takes six months.',
    },
    {
      question: 'How do I know a process is ready for an AI employee?',
      answer:
        'You can measure it before and after, you can write down the rules for handling it, it happens often enough to matter, and you are not about to change it. If all four are true, it is ready.',
    },
    {
      question: 'Are old leads really worth chasing?',
      answer:
        'Usually, yes. They already know your business, and reaching them costs very little. A solar installer we worked with re-engaged 832 dormant contacts and booked 38 appointments in under three weeks.',
    },
    {
      question: 'When should I fix invoicing and collections?',
      answer:
        'After the leaks at the front of the business are closed. Late invoices matter for cash flow, but winning more of the jobs you already paid to attract usually moves revenue faster.',
    },
    {
      question: 'Can I fix several leaks at once?',
      answer:
        'You can, but it makes it harder to tell which change worked. Fixing one at a time, with a baseline for each, gives you clean numbers and makes the next decision easier.',
    },
  ],
  sources: [
    {
      label: 'InsideSales and MIT, Lead Response Management study (PDF)',
      url: 'https://www.mortech.com/hs-fs/hub/25649/file-13535879-pdf/docs/mit_study.pdf',
      note: 'Source of the finding that the odds of contacting a lead decrease by over 10 times in the first hour. Read Nov 6, 2026.',
    },
    {
      label: 'SmartCompany, Are you letting online leads go cold?',
      url: 'https://www.smartcompany.com.au/marketing/20110704-are-you-letting-online-leads-go-cold/',
      note: 'Quotes the 2011 HBR audit of 2,241 US companies, of which 37% answered a web enquiry within an hour. Read Nov 6, 2026.',
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
  related: ['what-is-revenue-leakage', 'database-reactivation', 'missed-call-text-back'],
  queries: ['what to automate first in a service business', 'which leaks to fix first', 'where to start with ai in small business'],
};

export default article;
