// Target: "how to make my business run without me", "owner dependent business",
// "reduce owner dependence", "how to step back from my business". The 10 drivers
// are from content/drivers.ts (shared with The Automation Institute's score).
// Value Builder System's eight drivers page lists the names only (incl. "Hub and
// Spoke" and "The Switzerland Structure"); what those mean is from Built to Sell's
// own post (Switzerland Structure) and a Value Builder adviser (Hub and Spoke =
// how well the company could thrive without you). The old claim that the drivers
// are "built on surveys of business owners" was not on any page we opened and was
// cut. BizBuySell's 2.61x is confirmed via Business Exits (BizBuySell returned 403).
// Case figures from content/evidence.ts, quoted as published.

import type { Article } from '../types';

const article: Article = {
  slug: 'how-to-make-your-business-run-without-you',
  category: 'value',
  kind: 'Playbook',
  title: 'How to make your business run without you (and why buyers pay for it)',
  seoTitle: 'How to Make Your Business Run Without You',
  description:
    'A step-by-step way to make a service business less dependent on its owner: map what only you do, write it down, hand it off to people and AI, then test it.',
  datePublished: '2026-11-06',
  dateModified: '2026-11-06',
  lastChecked: '2026-11-06',
  cover: { style: 'button', text: 'Out of office: 2 weeks', caption: 'The test every buyer is really running' },
  coverAlt: 'A large button reading "Out of office: 2 weeks" with a pointer on it, captioned as the test every buyer is really running.',
  intro: [
    'To make your business run without you, list every task and decision that only you handle, write down how each one is done, then hand them off one at a time to a person or to software, starting with the ones that eat the most hours. Then prove it works by stepping away for two weeks and fixing whatever breaks.',
    'Buyers care about this more than almost anything else. A business that needs its owner is really a job, and nobody pays much for a job they would have to do themselves. A business that runs on systems is an asset, and assets get a higher multiple.',
    'I have spent the last few years building the systems that take this work off owners. This is the order we do it in.',
  ],
  tldr: [
    'Owner dependence is one of the biggest risks a buyer prices into a small service business.',
    'Start by tracking a normal week and listing everything that stops when you stop.',
    'Hand off the repetitive work first (calls, follow-up, scheduling, invoices), then the judgement calls, with rules.',
    'Run the two-week test: take time away, keep a list of every time someone needed you, and fix those first.',
    'Buyers will check this in diligence by asking who holds the customer relationships, the quotes and the passwords.',
  ],
  sections: [
    {
      id: 'why-it-matters',
      heading: 'Why does an owner-dependent business sell for less?',
      paragraphs: [
        'A buyer is paying today for profit they hope to collect over the next several years. If that profit depends on your relationships, your quotes and your phone, it walks out the door with you at closing. So the buyer either pays less, asks you to stay on for years, or ties part of the price to future results.',
        'John Warrillow’s Value Builder System scores companies on eight drivers of value. One of them, which it calls "Hub and Spoke", is how well the company could do without its owner. Others include recurring revenue and what it calls the "Switzerland Structure": not relying too heavily on any one customer, employee or supplier. The 10 drivers we look at with clients put it in the same place: less owner dependence counts double.',
        'BizBuySell reports an average multiple of 2.61x cash flow on small businesses sold in 2025. It doesn’t split that number by how much a business leans on its owner, but the multiple is a price on risk, and an owner who holds everything together is one of the first risks a buyer looks for. More on the math in /blog/what-is-my-business-worth.',
      ],
    },
    {
      id: 'map',
      heading: 'Step 1: what does only you do?',
      paragraphs: [
        'For one normal week, keep a running note on your phone. Every time you do something, write it down with roughly how long it took. Don’t judge it yet, just capture it.',
        'At the end of the week, sort each item into one of four buckets. Most owners are surprised how much of the list is in the first two.',
      ],
      table: {
        caption: 'Sort a week of your time into four buckets.',
        columns: [
          { key: 'bucket', label: 'Bucket' },
          { key: 'examples', label: 'Typical examples' },
          { key: 'who', label: 'Who should own it' },
        ],
        rows: [
          { bucket: 'Repetitive', examples: 'Answering calls, confirming appointments, sending reminders, chasing invoices', who: 'Software or AI employees' },
          { bucket: 'Rule-based', examples: 'Scheduling crews, sending quotes from a price list, ordering stock', who: 'A person or AI with written rules' },
          { bucket: 'Judgement', examples: 'Pricing a complex job, hiring, handling an angry customer', who: 'A trained manager, with your rules written down' },
          { bucket: 'Only you', examples: 'Strategy, key partnerships, final approval on big spend', who: 'You, for now' },
        ],
      },
    },
    {
      id: 'document',
      heading: 'Step 2: how do you get the work out of your head?',
      paragraphs: [
        'You don’t need a 200-page manual. You need short, current instructions for the jobs that come up every week. The easiest way to write them is to not write them: record yourself doing the task on your phone or your screen, talking through what you’re doing and why, then have it turned into a checklist.',
        'Start with the jobs on the repetitive and rule-based lists. For each one, capture what triggers it, the steps, where it lives (which software, which login), what "done" looks like and when to ask for help.',
      ],
      callout:
        'A process nobody follows is not a process. Ask the person who will do the job to walk through your checklist once while you watch, and fix wherever they get stuck.',
    },
    {
      id: 'hand-off',
      heading: 'Step 3: what should you hand off first?',
      paragraphs: [
        'Hand off by hours, not by importance. The repetitive work eats the most time and is the easiest to hand over without risk, so it goes first.',
        'This is where AI employees fit. An AI receptionist can answer every call and book the job (/ai-employees/ai-receptionist). An office admin agent can send the forms and chase signatures (/ai-employees/ai-office-admin). A collections agent can follow up every unpaid invoice on a schedule. None of them get tired of the boring part, which is why the boring part is where they belong.',
        'One renovation contractor we worked with automated forms, approvals and estimate follow-up and scaled to 27 or more active projects without adding admin staff, with project delays down 41% (/evidence/construction-project-pipeline). That is what lower owner dependence looks like on paper.',
      ],
      steps: [
        { title: 'Calls and messages', detail: 'Someone, or something, other than you answers every call, text and web form, books the job and logs it.' },
        { title: 'Follow-up', detail: 'New leads get a reply in minutes and every estimate gets followed up on a schedule, whether you remember or not.' },
        { title: 'Scheduling and dispatch', detail: 'The schedule is built and changed by someone else, using rules you wrote.' },
        { title: 'Invoices and collections', detail: 'Invoices go out on completion and reminders go out automatically.' },
        { title: 'Quotes and pricing', detail: 'A price book and quoting rules let a trained person quote standard jobs without calling you.' },
      ],
    },
    {
      id: 'relationships',
      heading: 'How do you hand off customer relationships?',
      paragraphs: [
        'This is the hard one, and buyers know it. If your best customers only ever talk to you, introduce them to the person who will look after them, and let that person handle the next few jobs while you stay in the background.',
        'Put every customer, every conversation and every quote in one CRM instead of your phone and your memory. A buyer will ask where the customer list lives. "In my head" is an expensive answer.',
      ],
    },
    {
      id: 'test',
      heading: 'Step 4: how do you know it works without you?',
      paragraphs: [
        'Take two weeks away. Not "away but answering the phone". Tell the team you are unavailable except for real emergencies, and ask them to keep a list of every time they needed you.',
        'That list is your next to-do list. Every item on it is either a missing process, a missing permission or a decision you never wrote rules for. Fix those, then do it again. The question we ask owners on a consult is the same one in a single line: could the business run for three months without you? If the honest answer is no, /book.',
      ],
      figure: {
        kind: 'steps',
        caption: 'the loop that makes a business run without its owner',
        items: ['Track a week', 'Sort into buckets', 'Write it down', 'Hand it off', 'Step away', 'Fix what broke'],
      },
    },
    {
      id: 'diligence',
      heading: 'What will a buyer check in diligence?',
      paragraphs: ['Expect questions like these, and have the answers before anyone asks:'],
      bullets: [
        'Who answers the phone, quotes the jobs and handles complaints when you are not there?',
        'Which customers deal only with you, and what share of revenue do they make up?',
        'Where are the processes written down, and does the team actually follow them?',
        'Who has the passwords, the supplier accounts and the licenses?',
        'If you left tomorrow, which employees would be hardest to replace?',
      ],
    },
  ],
  faq: [
    {
      question: 'What is an owner-dependent business?',
      answer:
        'An owner-dependent business is one that cannot keep making money without its owner, because the owner holds the customer relationships, does the quoting or selling, makes most decisions or is the only one who knows how key tasks are done. Buyers see it as risk and usually pay less for it.',
    },
    {
      question: 'How do I start stepping back from my business?',
      answer:
        'Track a normal week, list every task only you handle, and sort them into repetitive, rule-based, judgement and only-you work. Write down how the repetitive and rule-based tasks are done, hand them off one at a time, then step away for two weeks and fix whatever needed you.',
    },
    {
      question: 'How long does it take to make a business run without the owner?',
      answer:
        'It depends on how much runs through you today. Handing off calls, follow-up, scheduling and invoicing can happen within a few months. Handing off customer relationships and judgement calls usually takes longer, because people need time to build trust with your customers.',
    },
    {
      question: 'Can AI help reduce owner dependence?',
      answer:
        'Yes, for the repetitive work. AI employees can answer calls and book jobs, follow up leads and estimates, send forms and reminders, and chase invoices. That frees the owner and the team for the judgement work, which still needs people and written rules.',
    },
    {
      question: 'Do buyers really pay more for a business that runs without its owner?',
      answer:
        'Buyers price risk, and an owner who holds the business together is one of the biggest risks they see. The Value Builder System counts how well a company does without its owner as one of its eight drivers of company value. Owner-dependent sellers can also be asked to stay on after the sale or to take part of the price as an earnout.',
    },
  ],
  sources: [
    {
      label: 'Value Builder System, Key drivers of company value',
      url: 'https://valuebuildersystem.com/eight-drivers',
      note: 'The names of the eight drivers, including Hub and Spoke, Recurring Revenue and The Switzerland Structure. Read Nov 6, 2026.',
    },
    {
      label: 'Built to Sell, Eight key drivers of company value: The Switzerland Structure',
      url: 'https://builttosell.com/?p=1661',
      note: 'What the Switzerland Structure measures: reliance on a single customer, employee or supplier (Nov 30, 2020). Read Nov 6, 2026.',
    },
    {
      label: 'ActionCOACH, If your business is becoming too reliant on you',
      url: 'https://actioncoach.co.uk/2018/11/07/is-your-business-too-reliant-on-you/',
      note: 'A Value Builder adviser describing Hub and Spoke as a measure of how well a company could thrive without its owner (Nov 7, 2018). Read Nov 6, 2026.',
    },
    {
      label: 'Business Exits, BizBuySell’s 2025 market recap',
      url: 'https://businessexits.com/bizbuysells-2025-market-recap-what-the-data-shows-for-business-sellers/',
      note: 'Average cash flow multiple of 2.61x for small businesses sold on BizBuySell in 2025. BizBuySell’s own page refused our automated reader on Nov 6, 2026. Read Nov 6, 2026.',
    },
    {
      label: 'Hexona case study: renovation contractor',
      url: 'https://www.hexonasystems.com/evidence/construction-project-pipeline',
      note: 'Project delays down 41% and 27 or more active projects without adding admin staff, measured in the client’s CRM. Checked Nov 6, 2026.',
    },
  ],
  related: ['what-is-my-business-worth', 'ai-agent-examples', 'hvac-business-valuation'],
  queries: ['how to make my business run without me', 'owner dependent business', 'reduce owner dependence', 'how to step back from my business'],
};

export default article;
