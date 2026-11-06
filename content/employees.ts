/**
 * content/employees.ts — the AI employees Hexona builds and runs.
 *
 * Each one is tied to one of the drivers of enterprise value, because that is
 * the firm's filter: we only build what moves a number a buyer pays for.
 *
 * A role with a `page` gets its own page at /ai-employees/<slug>. A role
 * without one still shows on the homepage and the hub, unlinked, until its
 * page is written.
 *
 * Every figure quoted here comes from a case in content/evidence.ts and links
 * to it. Nothing here is a projection.
 */

import type { Faq } from './faqs';

export type IconName = 'phone' | 'bolt' | 'route' | 'doc' | 'cash' | 'heart';

export interface ProofPoint {
  figure: string;
  label: string;
  sector: string;
  /** Slug in content/evidence.ts. */
  caseSlug: string;
}

export interface Demo {
  title: string;
  icon: IconName;
  messages: { from: 'caller' | 'ai'; text: string }[];
  outcome: string;
}

export interface EmployeePage {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** The answer, first, in one or two sentences an assistant can quote. */
  answer: string;
  intro: string;
  /** Illustrative exchange shown in the hero. An example, labelled as one. */
  demo?: Demo;
  does: { title: string; text: string }[];
  problems: string[];
  proof: ProofPoint[];
  steps: { title: string; text: string }[];
  comparison?: {
    caption: string;
    columns: [string, string, string];
    rows: { label: string; values: [string, string, string] }[];
  };
  faqs: Faq[];
  /** Industry slugs from content/industries.ts. */
  industries: string[];
}

export interface Employee {
  slug: string;
  name: string;
  short: string;
  /** The driver of enterprise value it moves. */
  driver: string;
  icon: IconName;
  page?: EmployeePage;
}

export const EMPLOYEES: Employee[] = [
  {
    slug: 'ai-receptionist',
    name: 'AI Receptionist',
    short: 'Answers every call, day or night, and books the job straight into your calendar.',
    driver: 'Growth',
    icon: 'phone',
    page: {
      metaTitle: 'AI Receptionist for Service Businesses',
      metaDescription:
        'An AI receptionist that answers every call 24/7, texts back missed callers, books jobs into your calendar and hands urgent calls to your team. Built and run for you by Hexona.',
      h1: 'An AI receptionist that never lets a call go to voicemail.',
      answer:
        'An AI receptionist answers every call and message 24/7, texts back anyone who hangs up, books the job into your calendar and passes urgent calls to a person. Hexona builds it into your phone line and CRM, then runs and tunes it for you.',
      intro:
        'Most service businesses do not have a lead problem. They have an answering problem. The phone rings while everyone is on a job, the caller hangs up, and they ring the next company on the list. Every one of those calls was paid for by your marketing.',
      demo: {
        title: 'Incoming call · 9:42 PM',
        icon: 'phone',
        messages: [
          { from: 'caller', text: 'Hi, our furnace just stopped working and it’s freezing in here.' },
          { from: 'ai', text: 'Sorry to hear that. I can get a technician to you. Is anyone in the home elderly or unwell?' },
          { from: 'caller', text: 'No, just us. Can someone come tomorrow morning?' },
          { from: 'ai', text: 'I have 8:00 AM open. What’s the address? I’ll text you a confirmation.' },
        ],
        outcome: 'Booked: Tue 8:00 AM · Logged in CRM',
      },
      does: [
        { title: 'Answers every call, 24/7', text: 'Nights, weekends and the lunch rush. Callers get a natural conversation, not a phone tree.' },
        { title: 'Texts back missed callers in seconds', text: 'If a call drops, a text goes out straight away and carries on the conversation until the job is booked.' },
        { title: 'Books jobs into your calendar', text: 'It checks real availability and books the appointment, then sends the confirmation and the reminders.' },
        { title: 'Qualifies before it books', text: 'It asks your questions first: service, location, urgency, budget. Your team only spends time on real work.' },
        { title: 'Hands urgent calls to a person', text: 'Emergencies and high-value jobs are transferred to whoever is on call, with a summary of what the caller said.' },
        { title: 'Logs everything in your CRM', text: 'Every call, text and booking is recorded against the customer, so nothing lives in somebody’s head.' },
      ],
      problems: [
        'Calls go to voicemail while the team is on a job',
        'After-hours enquiries wait until morning, and most never call back',
        'Somebody spends hours a week calling missed leads back by hand',
        'Website chat, Facebook and Instagram messages sit unread',
      ],
      proof: [
        { figure: '$50,000+', label: 'recovered from calls that used to go to voicemail, with booked appointments up 50%', sector: 'Tire and auto service', caseSlug: 'tire-shop-missed-calls' },
        { figure: '23%', label: 'of bookings were arriving after hours, and two thirds of those callers never rang back. That is the leak this system was built to close', sector: 'Med spa', caseSlug: 'medspa-booking-system' },
      ],
      steps: [
        { title: 'Map your calls', text: 'We listen to how calls come in today, what callers ask, and what counts as a good booking for you.' },
        { title: 'Build and connect', text: 'We write the scripts, connect your phone line, calendar and CRM, and set the rules for when a person takes over.' },
        { title: 'Test, then go live', text: 'We run test calls until it handles your real questions properly, then switch it on.' },
        { title: 'Run and report', text: 'We review conversations, keep improving it, and send you the numbers: calls answered, jobs booked, revenue recovered.' },
      ],
      comparison: {
        caption: 'AI receptionist compared with the alternatives',
        columns: ['Hexona AI Receptionist', 'Human answering service', 'Self-serve AI receptionist app'],
        rows: [
          { label: 'Answers 24/7', values: ['Yes', 'Usually, at extra cost', 'Yes'] },
          { label: 'Books into your calendar', values: ['Yes, with your rules', 'Often takes a message', 'Sometimes, if you set it up'] },
          { label: 'Connected to your CRM and follow-up', values: ['Built in', 'Rarely', 'You connect it yourself'] },
          { label: 'Who sets it up and tunes it', values: ['We do', 'They script it', 'You do'] },
          { label: 'Reports the revenue it recovered', values: ['Every month', 'Call counts only', 'Call counts only'] },
        ],
      },
      faqs: [
        {
          question: 'Will callers know they are talking to an AI?',
          answer: 'It sounds natural, but we recommend it says it is an AI assistant at the start of the call. Callers care far more about getting an answer and a booking than about who gives it, and being upfront avoids any awkwardness.',
        },
        {
          question: 'What happens with an emergency or a difficult call?',
          answer: 'You decide the rules. Emergencies, angry customers and high-value jobs can be transferred to a person straight away, with a short summary of the call sent to their phone so they do not have to ask the caller to repeat themselves.',
        },
        {
          question: 'Can it book into the calendar and CRM we already use?',
          answer: 'In most cases, yes. We connect it to the calendar, CRM or field-service software you already run, so bookings land where your team already looks. If a system has no way to connect, we tell you before we start.',
        },
        {
          question: 'Do I have to change my phone number?',
          answer: 'No. Calls are forwarded from your existing number, either all the time or only when nobody picks up, so customers keep calling the number they already know.',
        },
        {
          question: 'How is this different from a $49 a month AI receptionist app?',
          answer: 'An app gives you the tool and leaves the setup, scripts, integrations and tuning to you. We build it into your business, connect it to your follow-up and CRM, run it, and report what it recovered. You are buying the result, not a login.',
        },
        {
          question: 'Is it legal to record and transcribe calls?',
          answer: 'Yes, with the right notice. Some US states, including California, Florida, Pennsylvania and Washington, require everyone on a call to consent to recording, so the assistant announces it at the start of the call. We set that up for the states you operate in.',
        },
      ],
      industries: ['construction', 'home-services', 'med-spas', 'property-management'],
    },
  },
  {
    slug: 'ai-sales-follow-up',
    name: 'AI Sales Follow-Up',
    short: 'Replies to new leads in under a minute and brings old estimates back to life.',
    driver: 'Growth',
    icon: 'bolt',
  },
  {
    slug: 'ai-dispatcher',
    name: 'AI Dispatcher',
    short: 'Builds the schedule, routes the crews and handles the reschedules.',
    driver: 'Margin',
    icon: 'route',
  },
  {
    slug: 'ai-office-admin',
    name: 'AI Office Admin',
    short: 'Quotes, paperwork and approvals, done without anyone chasing them.',
    driver: 'Output per employee',
    icon: 'doc',
  },
  {
    slug: 'ai-collections',
    name: 'AI Collections',
    short: 'Chases invoices and deposits politely, every time, so cash comes in faster.',
    driver: 'Cash flow',
    icon: 'cash',
  },
  {
    slug: 'ai-retention',
    name: 'AI Retention',
    short: 'Wins back past customers, offers plans and asks happy ones for reviews.',
    driver: 'Recurring revenue',
    icon: 'heart',
  },
];

export const employeesWithPages = () => EMPLOYEES.filter((e) => e.page);
export const getEmployee = (slug: string) => EMPLOYEES.find((e) => e.slug === slug);
