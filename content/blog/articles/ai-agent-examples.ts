// Target: "ai agent examples" (1,600/mo US), "ai agents for small business"
// (210), "ai agent use cases". DataforSEO Nov 6, 2026.
// Client figures are quoted exactly from content/evidence.ts. For projected
// cases (medspa-booking-system, plumbing-field-service-platform) only what was
// found before the build is quoted. The coaching case is labelled as coaching.

import type { Article } from '../types';

const article: Article = {
  slug: 'ai-agent-examples',
  category: 'guides',
  kind: 'Guide',
  title: 'AI agent examples: 12 jobs AI agents already do in service businesses',
  seoTitle: 'AI Agent Examples: 12 Jobs They Do Today',
  description:
    '12 real AI agent examples from trades, med spas, property management, auto shops and hospitality: what each does, what it connects to and where it falls short.',
  datePublished: '2026-11-06',
  dateModified: '2026-11-06',
  lastChecked: '2026-11-06',
  cover: { style: 'stat', value: '12', label: 'jobs AI agents already do in service businesses' },
  coverAlt: 'The number 12 in large type with the label "jobs AI agents already do in service businesses".',
  intro: [
    'The most common AI agent examples in service businesses are an AI receptionist that answers and books calls, a follow-up agent that texts new leads and old estimates, a dispatcher that builds the schedule, a collections agent that chases invoices, and a retention agent that asks for reviews and wins customers back. Each one does a single job inside your existing phone, calendar and CRM, and hands anything tricky to a person.',
    'If you are not sure what makes something an agent rather than a chatbot, start with /blog/what-is-an-ai-agent. This page is the practical list: twelve jobs we see working right now, what each needs connected, and the honest limit on each.',
  ],
  tldr: [
    'Good agents do one job with clear rules: answer, follow up, schedule, chase, remind or win back.',
    'Each needs access to the system where the work happens: phone line, calendar, CRM, field-service or payment software.',
    'Every example has a limit. Pricing, refunds, medical questions and emergencies go to a person.',
    'Start with the job that leaks the most money today, usually missed calls or slow follow-up.',
  ],
  sections: [
    {
      id: 'at-a-glance',
      heading: 'Which AI agents are service businesses using right now?',
      paragraphs: ['Here are all twelve on one page. Each is explained below with a real example where we have one.'],
      table: {
        caption: 'Twelve AI agent examples for service businesses, with what each connects to and its main limit.',
        columns: [
          { key: 'job', label: 'Agent' },
          { key: 'who', label: 'Where it fits' },
          { key: 'connects', label: 'Needs access to' },
          { key: 'limit', label: 'Where it stops' },
        ],
        rows: [
          { job: '1. After-hours receptionist', who: 'HVAC, plumbing, electrical', connects: 'Phone line, calendar, on-call phone', limit: 'Diagnosing the problem' },
          { job: '2. Missed-call text back', who: 'Auto shops, trades, salons', connects: 'Phone system, SMS, CRM', limit: 'Callers who refuse to text' },
          { job: '3. Booking concierge', who: 'Med spas, clinics', connects: 'Booking software, deposits, intake forms', limit: 'Clinical questions' },
          { job: '4. Speed-to-lead responder', who: 'Roofing, remodeling, solar', connects: 'Web forms, ads, CRM, calendar', limit: 'Pricing a custom job' },
          { job: '5. Old lead reactivation', who: 'Any business with a lead list', connects: 'CRM, SMS', limit: 'Stale or opted-out contacts' },
          { job: '6. Lead qualifier', who: 'High-ticket services', connects: 'Forms, CRM, calendar', limit: 'The actual sales conversation' },
          { job: '7. Dispatcher and scheduler', who: 'Field service teams', connects: 'Field-service software, crew calendars', limit: 'Judgement on job priority' },
          { job: '8. Paperwork and approvals', who: 'Contractors, renovators', connects: 'Proposals, e-signature, CRM pipeline', limit: 'Change-order negotiation' },
          { job: '9. Maintenance request intake', who: 'Property managers', connects: 'Property software, on-call phone', limit: 'Deciding liability' },
          { job: '10. Invoice follow-up', who: 'Any business that bills after the job', connects: 'Accounting or invoicing, SMS, email', limit: 'Disputes and payment plans' },
          { job: '11. Review requests', who: 'Every local business', connects: 'CRM, SMS, Google Business Profile link', limit: 'Replying to bad reviews' },
          { job: '12. Win-back and loyalty', who: 'Restaurants, cafes, recurring services', connects: 'Point of sale or CRM, SMS', limit: 'Offers you haven’t approved' },
        ],
      },
    },
    {
      id: 'front-desk',
      heading: 'What do front-desk AI agents do?',
      paragraphs: [
        '**1. After-hours receptionist (HVAC, plumbing, electrical).** Answers every call at night and on weekends, asks what is wrong, books routine jobs into tomorrow’s schedule and transfers real emergencies to the on-call tech with a short summary. Needs your phone line, calendar and the on-call number. Limit: it collects symptoms, it does not diagnose. See /blog/after-hours-answering-service for how to set the emergency rules.',
        '**2. Missed-call text back (auto shops, trades, salons).** When a call goes unanswered, it texts the caller within seconds, asks what they need and steers toward a booking. One tire shop was sending more than 600 calls a month to voicemail. A missed-call assistant, plus chatbots on its social pages, recovered over $50,000 and lifted booked appointments 50% (/evidence/tire-shop-missed-calls). Limit: a few callers won’t reply to a text, so it should still flag them for a callback.',
        '**3. Booking concierge (med spas, clinics).** Books treatments around the clock, matches the service to a qualified provider and room, takes a deposit and sends intake forms. A med spa we built one for had found that 23% of its bookings were attempted after hours, and two thirds of those callers never rang back (/evidence/medspa-booking-system). Its results are still being measured. Limit: any clinical question goes to a provider.',
      ],
    },
    {
      id: 'sales',
      heading: 'What do AI agents do for sales and follow-up?',
      paragraphs: [
        '**4. Speed-to-lead responder (roofing, remodeling, solar).** Replies to every web form and ad lead within seconds by text and email, asks a few qualifying questions and sends a booking link for the site visit, with reminders if nothing happens. A roofing and remodeling company running this kind of instant reply plus quote follow-up added over $45,000 in monthly revenue and cut sales admin from 18 to 3.5 hours a week (/evidence/home-improvement-sales-workflow). Limit: it books the visit, it doesn’t price a custom job.',
        '**5. Old lead reactivation (any business with a list).** Messages people who asked for a quote months or years ago and never bought, then holds the conversation when they reply. A solar installer had more than four thousand homeowners nobody had gone back to. Re-engaging them got 832 replies at a 21% reply rate and $24,500 in net profit (/evidence/solar-dormant-database). Limit: only message people who gave you permission, and stop the moment someone opts out.',
        '**6. Lead qualifier (high-ticket services).** Reads form answers, scores each lead and sends the best ones straight to a person while the rest go into follow-up. Our clearest example is from coaching, not a service trade: a high-ticket coach with thousands of leads a month saw a 34x return on the build (/evidence/coaching-lead-scoring). The same idea works for any business where a salesperson’s time is the bottleneck. Limit: the closing conversation stays human.',
      ],
    },
    {
      id: 'operations',
      heading: 'What do AI agents do in operations?',
      paragraphs: [
        '**7. Dispatcher and scheduler (field service teams).** Builds the week from job requests, crew skills and locations, and handles the reschedules. A plumbing and field services company we worked with had its scheduler spending three to four hours a day building the week by hand (/evidence/plumbing-field-service-platform). The new system is live and its results are still being measured. Limit: a person still decides which job jumps the queue.',
        '**8. Paperwork and approvals (contractors, renovators).** Sends the forms, collects signatures and moves each job to the next stage on its own. A renovation contractor cut project delays 41% and got estimates approved 44% faster (/evidence/construction-project-pipeline). Limit: change orders and negotiations need a person.',
        '**9. Maintenance request intake (property managers).** Takes tenant requests by phone, text or form at any hour, asks for photos, creates the work order and wakes the on-call person only for real emergencies like active leaks or no heat. More on /industries/property-management. Limit: it doesn’t decide who pays for the repair.',
      ],
    },
    {
      id: 'money-retention',
      heading: 'What do AI agents do for cash flow and repeat business?',
      paragraphs: [
        '**10. Invoice follow-up (any business that bills after the job).** Sends polite reminders on a schedule you set, with a payment link, and stops the moment the invoice is paid. Limit: disputes and payment plans go to you. See /ai-employees/ai-collections.',
        '**11. Review requests (every local business).** Texts happy customers a direct link to your Google review page after the job, and routes unhappy replies to you before they turn into a one-star review. Limit: replying to a bad review should come from a person.',
        '**12. Win-back and loyalty (restaurants, cafes, recurring services).** Notices when a regular stops coming and sends a personal nudge based on what they usually buy. A coffee chain with eight locations lifted customer retention from 27% to 68% with automated re-engagement after fourteen days away (/evidence/coffee-loyalty-programme). Limit: it only sends offers you have approved.',
      ],
    },
    {
      id: 'what-they-need',
      heading: 'What does an AI agent need to work in your business?',
      paragraphs: ['Every example above needs the same four things. Most failed projects we get called in to fix are missing one of them.'],
      steps: [
        { title: 'One clear job', detail: '"Text every missed caller within a minute and book them" works. "Handle my customers" doesn’t.' },
        { title: 'Access to the right system', detail: 'The phone line, calendar, CRM or invoicing tool where the work actually happens. If your software has no way to connect, the agent can only take messages.' },
        { title: 'Rules and a hand-off', detail: 'What it can decide alone, and who it passes the call or message to when it can’t.' },
        { title: 'Someone reading the results', detail: 'Weekly review of conversations in the first month, and a monthly number you care about: calls answered, jobs booked, invoices paid.' },
      ],
    },
    {
      id: 'where-to-start',
      heading: 'Which AI agent should a service business start with?',
      paragraphs: [
        'Start with whatever leaks the most money today. For most trades and clinics that is the phone: missed calls and after-hours calls. For businesses with a big quote list it is follow-up. For businesses that bill after the job it is often unpaid invoices.',
        'A simple way to find it: call your own business at 9 p.m., fill out your own website form, and look at how many estimates from last quarter got a second follow-up. Whichever one embarrasses you most is your first agent. Our filter at Hexona is the same one a buyer of your business would use: capture revenue you are losing, cut the cost of delivering the work, or make the business depend less on you. Take /score to see which of those is weakest, or /book and we will work it out with you.',
      ],
    },
  ],
  faq: [
    {
      question: 'What are some examples of AI agents for small businesses?',
      answer:
        'Common examples are an AI receptionist that answers and books calls, a missed-call text back, a speed-to-lead responder for web leads, an old lead reactivation agent, a dispatcher that builds the schedule, an invoice follow-up agent, a review request agent and a win-back agent for lapsed customers.',
    },
    {
      question: 'What is the most useful AI agent for a service business?',
      answer:
        'For most trades and clinics it is the one that answers the phone, because missed and after-hours calls are where the most revenue is lost. For businesses with a long list of old quotes, a follow-up or reactivation agent often pays back faster.',
    },
    {
      question: 'Do AI agents replace staff?',
      answer:
        'In service businesses they mostly take repetitive work off people: after-hours calls, follow-up texts, scheduling and paperwork chasing. One renovation contractor we worked with grew to more than 27 active projects without adding admin staff.',
    },
    {
      question: 'What does an AI agent need to connect to?',
      answer:
        'It needs the system where its job happens: a phone line for a receptionist, a calendar for booking, a CRM for follow-up, field-service software for dispatch, or your invoicing tool for collections. Without that access it can only take messages.',
    },
    {
      question: 'What can’t AI agents do yet?',
      answer:
        'They should not price complex jobs, approve refunds, give medical advice, negotiate disputes or decide which emergency comes first. Good setups collect the details and hand those decisions to a person with a short summary.',
    },
    {
      question: 'Is an AI chatbot the same as an AI agent?',
      answer:
        'No. A chatbot answers questions. An AI agent also takes action in your systems, like booking the appointment, updating the customer record or sending a payment link.',
    },
  ],
  sources: [
    { label: 'Anthropic, Building effective agents', url: 'https://www.anthropic.com/engineering/building-effective-agents', note: 'Definition of agents vs fixed workflows, published Dec 19, 2024. Read Nov 6, 2026.' },
    { label: 'OpenAI, A practical guide to building agents', url: 'https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf', note: 'Agents as systems that complete tasks on your behalf, and when to use them. Read Nov 6, 2026.' },
    { label: 'Hexona case studies', url: 'https://www.hexonasystems.com/evidence', note: 'Client figures quoted exactly as published, measured in each client’s own systems or labelled as found before the build. Checked Nov 6, 2026.' },
  ],
  related: ['what-is-an-ai-agent', 'ai-receptionist-cost', 'database-reactivation'],
  queries: ['ai agent examples', 'ai agents for small business', 'ai agent use cases', 'examples of ai agents in business'],
};

export default article;
