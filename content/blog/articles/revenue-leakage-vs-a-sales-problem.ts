// Rewritten Nov 6, 2026 from the v2 post of the same slug, for owners of
// service businesses. Kept: the one-hour split test, the single-contact count
// and the lead-source confound. Cut: the old diagnostic offer, the $15,000 to
// $75,000 implementation range and the operating-partner framing.
// Research figures from SmartCompany's quote of the 2011 HBR study and the
// InsideSales/MIT Lead Response Management PDF, both opened.
// Target: "not enough leads or lost leads", "is it a sales problem".

import type { Article } from '../types';

const article: Article = {
  slug: 'revenue-leakage-vs-a-sales-problem',
  category: 'playbooks',
  kind: 'Playbook',
  title: 'Not enough leads, or leads lost on the way in? A one-hour test for owners',
  seoTitle: 'Revenue Leakage or a Sales Problem?',
  description:
    'Before you buy more ads or blame your sales team, split last quarter’s leads by how fast you replied. If fast replies close far better, it is leakage.',
  datePublished: '2026-09-23',
  dateModified: '2026-11-06',
  lastChecked: '2026-11-06',
  cover: {
    style: 'versus',
    left: 'Sales problem',
    right: 'Leakage problem',
    rows: [
      ['Fast and slow replies close about the same', 'Fast replies close far better than slow ones'],
      ['Leads get a reply and still say no', 'Many leads get one contact, then nothing'],
      ['Fix: offer, price, pitch', 'Fix: answer faster, follow up longer'],
    ],
  },
  coverAlt: 'Two columns comparing a sales problem with a leakage problem: what the close rates show and what fixes each.',
  intro: [
    'If enquiries answered within an hour close far better than enquiries answered later, you have a leakage problem, not a sales problem. You can check this in an afternoon with last quarter’s leads and the timestamps already in your phone system and inbox.',
    'It matters because the two problems have opposite fixes. A sales problem needs a better offer, a better price or a better closer. A leakage problem needs faster replies and longer follow-up, and spending more on ads only pours more leads into the same gap.',
  ],
  tldr: [
    'Split last quarter’s enquiries into those answered within an hour and those answered later, then compare close rates.',
    'A big gap between the two means you are losing leads on the way in, not losing them in the sales conversation.',
    'Count how many enquiries got exactly one contact; that number is usually the cheapest money in the business.',
    'Compare leads from the same source, or a slow channel can make the result look worse than it is.',
  ],
  sections: [
    {
      id: 'two-problems',
      heading: 'What is the difference between leakage and a sales problem?',
      paragraphs: [
        'A sales problem shows up after a real conversation: the customer heard the price, saw the quote, and chose someone else or chose nothing. Leakage shows up before that conversation ever happens: the call went to voicemail, the form waited until tomorrow, the quote went out once and nobody chased it.',
        'Owners tend to read both as "the leads aren’t good" or "the team isn’t closing." The test below separates them using numbers you already have.',
      ],
    },
    {
      id: 'why-speed',
      heading: 'Why is reply speed the test?',
      paragraphs: [
        'Because it is the clearest sign of leakage in the research. In an audit published in Harvard Business Review in 2011, only 37% of 2,241 US companies answered a web enquiry within an hour, and 23% never answered at all. A separate analysis of 1.25 million leads found firms that tried to reach a lead within an hour were nearly seven times as likely to qualify it as firms that waited even an hour longer, and more than 60 times as likely as firms that waited a day or more.',
        'The Lead Response Management study, run by InsideSales with MIT’s James Oldroyd, put it more sharply: the odds of reaching a lead called within five minutes were 100 times better than one called after 30 minutes.',
      ],
      figure: {
        kind: 'stats',
        caption: 'what slow replies cost, from two lead-response studies',
        items: [
          { value: '7x', label: 'more likely to qualify a lead when contacted within an hour vs an hour later (HBR, 2011)' },
          { value: '60x', label: 'more likely than firms that waited 24 hours or longer (HBR, 2011)' },
          { value: '100x', label: 'better odds of reaching a lead called in 5 minutes vs 30 (LRM study)' },
        ],
      },
    },
    {
      id: 'run-the-test',
      heading: 'How do I run the one-hour test?',
      steps: [
        { title: 'Pull last quarter’s enquiries', detail: 'Every call, form, text and message from the last three months, with the time each arrived. Your phone system, website form inbox and CRM have this.' },
        { title: 'Note the first real reply', detail: 'When did a person first answer or call back? An autoresponder doesn’t count. A missed call that was never returned counts as no reply.' },
        { title: 'Split at one hour', detail: 'Put each enquiry in one of two groups: answered within an hour, or answered later (including never).' },
        { title: 'Compare close rates', detail: 'What share of each group became a booked job? If the fast group closes clearly better, you are looking at leakage.' },
        { title: 'Count single-contact leads', detail: 'How many enquiries got one reply and then nothing, even though they never said no? That list is your first follow-up campaign.' },
      ],
    },
    {
      id: 'confound',
      heading: 'What can make the test misleading?',
      paragraphs: [
        'Lead source. Referrals often close well no matter how fast you reply, and some paid leads close badly no matter how fast you reply. If your fast group happens to be mostly referrals and your slow group mostly cold web forms, the gap will look bigger than it is.',
        'So split by source first, then run the one-hour comparison inside each source. If the gap holds inside the same source, it is real.',
      ],
      callout:
        'If you only have a few dozen leads a quarter, the numbers will be noisy. Use six months, or treat the result as a direction rather than a verdict.',
    },
    {
      id: 'reading',
      heading: 'How do I read the result?',
      table: {
        caption: 'What the one-hour test tells you and what to do next.',
        columns: [
          { key: 'result', label: 'What you see' },
          { key: 'means', label: 'What it means' },
          { key: 'next', label: 'What to do' },
        ],
        rows: [
          { result: 'Fast replies close much better', means: 'Leads are being lost on the way in', next: 'Answer every call and form within minutes, around the clock' },
          { result: 'Many leads got one contact only', means: 'Follow-up stops too early', next: 'Follow up until the customer says yes or no' },
          { result: 'Fast and slow close about the same', means: 'Speed isn’t your constraint', next: 'Look at price, offer, reviews and the sales conversation' },
          { result: 'Few leads in either group', means: 'You have a demand problem', next: 'Marketing comes first; fix leakage as volume grows' },
        ],
      },
    },
    {
      id: 'more-ads',
      heading: 'Why won’t more ad spend fix it?',
      paragraphs: [
        'If the gap is real, every extra lead you buy goes through the same slow phone line and the same one-email follow-up. You pay more per booked job, and the share you lose stays the same.',
        'Fix the capture first. A missed call that gets a text back in seconds (/blog/missed-call-text-back) and quotes that get followed up automatically (/ai-employees/ai-sales-follow-up) make every lead you already pay for worth more. Then extra ad spend works harder.',
      ],
    },
    {
      id: 'next',
      heading: 'What if I don’t have clean timestamps?',
      paragraphs: [
        'Most owners don’t, and that is a finding in itself. Start tracking now: log when each enquiry arrives and when someone first replies. Two or three weeks is enough to see a pattern.',
        'In the meantime, the leads that already went cold are still worth a try. A solar installer we worked with re-engaged 832 old contacts and booked 38 appointments in under three weeks (/evidence/solar-dormant-database). How that works is in /blog/database-reactivation.',
      ],
    },
  ],
  faq: [
    {
      question: 'How do I know if I have a sales problem or a lead problem?',
      answer:
        'Split last quarter’s enquiries by whether they got a real reply within an hour, then compare close rates. If the fast group closes clearly better, you are losing leads on the way in. If both close about the same, look at your offer and sales conversation.',
    },
    {
      question: 'What is a good lead response time for a service business?',
      answer:
        'Within five minutes for calls and forms, if you can. The Lead Response Management study found the odds of reaching a lead called within five minutes were 100 times better than one called after 30 minutes.',
    },
    {
      question: 'Should I spend more on ads if my leads aren’t closing?',
      answer:
        'Not until you have run the one-hour test. If slow replies are losing leads, more ad spend sends more leads into the same gap and raises your cost per booked job.',
    },
    {
      question: 'Does an autoresponder count as a reply?',
      answer:
        'No. An automatic “we got your message” email doesn’t answer the customer’s question or book the job. Count the first reply that moves the conversation forward, from a person or an AI that can actually answer and book.',
    },
    {
      question: 'How many follow-ups should a lead get?',
      answer:
        'More than one. Keep following up until the customer says yes or no, spaced over days and weeks. Leads that got one contact and then silence are usually the easiest revenue to recover.',
    },
    {
      question: 'What if my team says they always call back quickly?',
      answer:
        'Check the timestamps rather than relying on memory. Missed calls during jobs, after hours and on weekends are easy to forget, and the call log will show exactly when each one was returned.',
    },
  ],
  sources: [
    {
      label: 'SmartCompany, Are you letting online leads go cold?',
      url: 'https://www.smartcompany.com.au/marketing/20110704-are-you-letting-online-leads-go-cold/',
      note: 'Quotes the 2011 HBR study: 2,241 companies audited, 37% replied within an hour, 23% never; the 1.25 million lead analysis with the seven-times and 60-times findings. Read Nov 6, 2026.',
    },
    {
      label: 'InsideSales and MIT, Lead Response Management study (PDF)',
      url: 'https://www.mortech.com/hs-fs/hub/25649/file-13535879-pdf/docs/mit_study.pdf',
      note: 'Source of the 100-times contact odds for five minutes vs 30 minutes, and the 21-times qualification odds. Read Nov 6, 2026.',
    },
    {
      label: 'Harvard Business Review, The Short Life of Online Sales Leads (March 2011)',
      url: 'https://hbr.org/2011/03/the-short-life-of-online-sales-leads',
      note: 'The original article. Opened Nov 6, 2026; only the title and summary are public, the text is paywalled.',
    },
  ],
  related: ['what-is-revenue-leakage', 'speed-to-lead', 'database-reactivation'],
  queries: ['sales problem or lead problem', 'leads not converting', 'lead response time', 'why are my leads not closing'],
};

export default article;
