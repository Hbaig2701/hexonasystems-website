// Target: "speed to lead" (880/mo US), "speed to lead statistics" (110), "lead
// response time statistics" (DataforSEO Nov 6, 2026). Research: Oldroyd,
// McElheran & Elkington, "The Short Life of Online Sales Leads", HBR, March 2011
// (bibliographic record at BYU ScholarsArchive; figures as reported by
// SmartCompany, Jul 4, 2011), and the Lead Response Management study by James
// Oldroyd with InsideSales (summary PDF hosted by Mortech). The viral "21x" and
// "100x" figures are described here exactly as the study frames them (5 vs 30
// minutes), not as the common "5 vs 10 minutes" misquote. Case figures from
// content/evidence.ts.

import type { Article } from '../types';

const article: Article = {
  slug: 'speed-to-lead',
  category: 'playbooks',
  kind: 'Guide',
  title: 'Speed to lead: how fast you need to answer a new lead',
  seoTitle: 'Speed to Lead: How Fast to Answer a Lead',
  description:
    'Answer a new lead within five minutes, and within the hour at worst. What the research found, which stats are misquoted, and how to respond fast after hours.',
  datePublished: '2026-11-06',
  dateModified: '2026-11-06',
  lastChecked: '2026-11-06',
  cover: { style: 'stat', value: '5 min', label: 'the window to answer a new lead while they’re still looking' },
  coverAlt: 'A cover showing "5 min" in large type with the caption "the window to answer a new lead while they’re still looking".',
  intro: [
    'Answer a new lead within five minutes if you can, and within the hour at the very latest. The research behind that is old but consistent: in a 2011 Harvard Business Review study of 2,241 US companies, firms that responded within an hour were nearly seven times as likely to qualify the lead as firms that waited even one hour longer.',
    'Speed to lead just means the time between a customer reaching out (a form, a call, a message) and your first real response. For a service business it decides who gets the job, because the person asking for a quote is usually asking two or three of your competitors at the same time.',
  ],
  tldr: [
    'Aim for under five minutes for a first response, and never more than an hour.',
    'In the HBR study, 23% of companies never responded to a web lead at all.',
    'The famous "21 times" figure compares 5 minutes with 30 minutes, not 5 with 10.',
    'An instant text plus a call attempt covers most leads. After hours needs automation or an answering service.',
    'Measure your own response time from your CRM before you buy anything.',
  ],
  sections: [
    {
      id: 'what-is-speed-to-lead',
      heading: 'What is speed to lead?',
      paragraphs: [
        'Speed to lead is how long it takes your business to reply to a new enquiry. The clock starts when the form is submitted, the call is missed or the message lands, and stops at the first human (or useful automated) response. An auto-reply that says "thanks, we’ll be in touch" doesn’t stop the clock, because it doesn’t answer anything.',
        'For a contractor, a med spa or a property manager, it is the cheapest lead you will ever get: you already paid for it with your ads, your Google profile or your referrals. Losing it to a slow reply is how money quietly goes missing. We wrote more about that kind of loss in /blog/what-is-revenue-leakage.',
      ],
    },
    {
      id: 'research',
      heading: 'What does the research say about lead response time?',
      paragraphs: [
        'Two studies get quoted for almost every speed to lead claim. Both trace back to James Oldroyd, who was at MIT and later BYU.',
        '**Harvard Business Review, 2011.** Oldroyd, Kristina McElheran and David Elkington sent test web leads to 2,241 US companies and timed the replies. About 37% responded within an hour, 16% within 1 to 24 hours, 24% took longer than a day, and 23% never responded. Companies that contacted a lead within an hour were nearly seven times as likely to qualify it as those that waited an hour longer, and more than 60 times as likely as those that waited 24 hours or more.',
        '**The Lead Response Management study** (Oldroyd with InsideSales.com, presented in 2007) analysed call attempts on more than 15,000 leads across several companies. Its summary reports that the odds of reaching a lead fell about 100 times between calling at 5 minutes and calling at 30 minutes, and the odds of qualifying the lead fell about 21 times over the same gap.',
      ],
      figure: {
        kind: 'bars',
        caption: 'how 2,241 US companies responded to a web lead (HBR, 2011)',
        items: [
          { label: 'Within an hour', value: 37, display: '37%' },
          { label: 'Within 1 to 24 hours', value: 16, display: '16%' },
          { label: 'More than 24 hours', value: 24, display: '24%' },
          { label: 'Never responded', value: 23, display: '23%' },
        ],
      },
      callout:
        'Both studies are more than a decade old and looked at web leads and sales calls, not specifically at plumbers or med spas. We use them for the direction (faster wins, by a lot) rather than as a promise of a specific multiple.',
    },
    {
      id: 'misquotes',
      heading: 'Which speed to lead statistics are misquoted?',
      paragraphs: [
        'A lot of vendor pages repeat numbers that drifted from the originals. The common ones:',
      ],
      table: {
        caption: 'Popular speed to lead claims next to what the source actually compared.',
        columns: [
          { key: 'claim', label: 'What you often read' },
          { key: 'actual', label: 'What the source compared' },
        ],
        rows: [
          { claim: '"21x more likely to convert if you call within 5 minutes vs 10"', actual: 'The Lead Response Management study compared 5 minutes with 30 minutes, and the 21x was about qualifying the lead, not closing a sale.' },
          { claim: '"Harvard found you’re 100x more likely to close"', actual: 'The 100x is from the Lead Response Management study, about the odds of making contact, comparing 5 and 30 minutes.' },
          { claim: '"7x more likely to convert within an hour"', actual: 'HBR’s figure was about qualifying the lead (having a meaningful conversation with a decision maker), within an hour versus an hour later.' },
        ],
      },
    },
    {
      id: 'how-fast',
      heading: 'How fast should a service business respond to a lead?',
      paragraphs: [
        'Our rule of thumb for the businesses we work with:',
      ],
      bullets: [
        '**Under 1 minute:** an acknowledgement text that asks a real question ("Is this for a repair or a quote?"), so the lead is in a conversation with you.',
        '**Under 5 minutes:** a call attempt or a booking offer, during business hours.',
        '**After hours:** a reply that either books them or tells them exactly when you will call. A booking beats a promise.',
        '**Old leads that went quiet:** a follow-up sequence over days and weeks, which we cover in /blog/database-reactivation.',
      ],
    },
    {
      id: 'setup',
      heading: 'How do you respond to every lead in under five minutes?',
      paragraphs: [
        'Nobody answers every lead in five minutes by trying harder. You do it by taking the first response off people. This is the setup we use most:',
      ],
      steps: [
        { title: 'Put every lead source in one place', detail: 'Web forms, Google Business Profile messages, Facebook and Instagram, paid ads and phone calls should all land in one CRM, not five inboxes.' },
        { title: 'Send an instant text that asks a question', detail: 'Within a minute, from your registered business number. A question gets a reply; a "thanks for reaching out" doesn’t.' },
        { title: 'Route the hot ones to a person', detail: 'High-intent leads (emergency, ready to book, big job) ping whoever is on call. Everyone else goes into an automated conversation.' },
        { title: 'Let an AI keep the conversation going', detail: 'It answers questions, qualifies the job and books the appointment, then hands off with a summary.' },
        { title: 'Cover nights and weekends', detail: 'That is when most leads get lost. Either an AI answers or your after-hours message books them into the next morning.' },
        { title: 'Follow up the ones who go quiet', detail: 'Day 1, day 3, day 7. Most closes happen after the first reply, not on it.' },
      ],
    },
    {
      id: 'example',
      heading: 'What does faster response look like in a real business?',
      paragraphs: [
        'A roofing and remodelling company we worked with was taking about three days to get a quote out after a lead came in, with 18 hours a week of the sales team’s time going on admin. After we automated the first reply, scheduling and quoting, lead-to-quote time dropped to under 24 hours, admin dropped to 3.5 hours a week and lead conversion rose 22%. The details are in /evidence/home-improvement-sales-workflow.',
        'The AI employee that does this job is our sales follow-up agent: /ai-employees/ai-sales-follow-up. For calls specifically, /ai-employees/ai-receptionist answers live.',
      ],
    },
    {
      id: 'measure',
      heading: 'How do you measure your own speed to lead?',
      paragraphs: [
        'Pull the last 50 leads from your CRM or inbox and note two times for each: when the lead came in and when someone first replied with something useful. Then check three numbers: the median response time, the share answered within an hour, and the share never answered.',
        'Or test yourself the way the HBR researchers did: fill in your own website form at 8 p.m. on a Thursday and see when you hear back. If you want a broader look at what a slow response costs your business value, take /score.',
      ],
    },
  ],
  faq: [
    {
      question: 'What is a good lead response time?',
      answer:
        'Under five minutes for the first response, and under an hour at worst. Research by James Oldroyd and colleagues found the odds of reaching and qualifying a lead drop sharply within the first hour.',
    },
    {
      question: 'Is the 5 minute rule for leads real?',
      answer:
        'Yes, it comes from the Lead Response Management study, which found the odds of contacting a lead fell about 100 times between 5 and 30 minutes. It compared 5 with 30 minutes, not 5 with 10 as it is often quoted.',
    },
    {
      question: 'What percentage of companies never respond to leads?',
      answer:
        'In the 2011 Harvard Business Review study of 2,241 US companies, 23% never responded to a web lead at all, and 24% took longer than 24 hours.',
    },
    {
      question: 'Does an automatic reply count as responding to a lead?',
      answer:
        'Only if it moves the conversation forward. A text that asks what the customer needs or offers a booking counts. A generic "thanks, we’ll be in touch" doesn’t, because the lead still has no answer.',
    },
    {
      question: 'How do I respond to leads fast after hours?',
      answer:
        'Use an automated text that asks a question and offers to book, or an AI receptionist that answers calls and books appointments overnight, with emergencies passed to whoever is on call.',
    },
    {
      question: 'Does speed to lead matter for service businesses or just sales teams?',
      answer:
        'It matters more for service businesses, because customers asking for a repair or a quote usually contact two or three companies at once and book whoever answers first.',
    },
  ],
  sources: [
    {
      label: 'Oldroyd, McElheran and Elkington, The Short Life of Online Sales Leads (record)',
      url: 'https://scholarsarchive.byu.edu/facpub/9711',
      note: 'Bibliographic record of the Harvard Business Review article, vol. 89, 2011. Read Nov 6, 2026.',
    },
    {
      label: 'SmartCompany, Are you letting online leads go cold?',
      url: 'https://www.smartcompany.com.au/marketing/20110704-are-you-letting-online-leads-go-cold/',
      note: 'Report of the HBR study’s sample and response-time breakdown, Jul 4, 2011. Read Nov 6, 2026.',
    },
    {
      label: 'Lead Response Management study summary (Oldroyd, InsideSales)',
      url: 'https://www.mortech.com/hs-fs/hub/25649/file-13535879-pdf/docs/mit_study.pdf',
      note: 'Source of the 5 versus 30 minute contact and qualification odds. Read Nov 6, 2026.',
    },
    {
      label: 'Hexona case study: home improvement sales workflow',
      url: 'https://www.hexonasystems.com/evidence/home-improvement-sales-workflow',
      note: 'Lead-to-quote time, admin hours and conversion, quoted as published. Checked Nov 6, 2026.',
    },
  ],
  related: ['missed-call-text-back', 'database-reactivation', 'what-is-revenue-leakage'],
  queries: ['speed to lead', 'speed to lead statistics', 'lead response time statistics', 'how fast to respond to leads', '5 minute rule leads'],
};

export default article;
