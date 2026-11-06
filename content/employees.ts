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
        'An AI receptionist that answers every call 24/7, texts back missed callers, books jobs into your calendar and hands urgent calls to your team. Run by Hexona.',
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
    page: {
      metaTitle: 'AI Sales Follow-Up and Appointment Setter',
      metaDescription:
        'An AI sales agent that replies to every lead in under a minute, follows up until they book, and reactivates old leads and estimates. Built and run by Hexona.',
      h1: 'Every lead answered in a minute. Every estimate followed up until it closes.',
      answer:
        'AI Sales Follow-Up is an AI sales agent that replies to every new lead within a minute, qualifies them, books the appointment, and keeps following up by text and email until they buy or say no. Hexona also points it at your old leads and estimates, so revenue you already paid for comes back.',
      intro:
        'The business that replies first usually wins the job. But your team is busy doing the work, so new leads wait hours for a reply and quotes go out with nobody chasing them. Meanwhile there are years of old enquiries sitting in your CRM that nobody has called since.',
      demo: {
        title: 'New web lead · 2 minutes ago',
        icon: 'bolt',
        messages: [
          { from: 'ai', text: 'Hi Mark, thanks for asking about a new roof. Is it the whole roof, or a repair after the storm?' },
          { from: 'caller', text: 'Whole roof probably. It’s 20 years old and leaking in two spots.' },
          { from: 'ai', text: 'Got it. We can do a free inspection Thursday at 10 or Friday at 2. Which works better?' },
          { from: 'caller', text: 'Friday at 2.' },
        ],
        outcome: 'Inspection booked: Fri 2:00 PM · Rep notified',
      },
      does: [
        { title: 'Replies in under a minute', text: 'Every web form, ad lead and missed call gets a personal reply within seconds, day or night.' },
        { title: 'Qualifies the lead', text: 'It asks your questions, such as job type, location, budget and timeline, and only passes real buyers to your team.' },
        { title: 'Books the appointment', text: 'It offers real times from your calendar and books the site visit, estimate or sales call.' },
        { title: 'Follows up every estimate', text: 'Quotes get polite, persistent follow-up by text and email until the customer signs or says no.' },
        { title: 'Reactivates old leads', text: 'It works through past enquiries and lost estimates, and books the ones who are ready now.' },
        { title: 'Hands warm buyers to a person', text: 'When a lead is ready to talk money, your closer gets them with the full conversation attached.' },
      ],
      problems: [
        'New leads wait hours, or days, for a first reply',
        'Quotes go out and nobody follows up',
        'Years of old leads sit in the CRM, untouched',
        'Your best salespeople spend their day on people who were never going to buy',
      ],
      proof: [
        { figure: '$24,500', label: 'net profit from 4,000+ dormant solar leads, with 38 appointments booked in under three weeks and no manual outreach', sector: 'Residential solar', caseSlug: 'solar-dormant-database' },
        { figure: '34x', label: 'return on the build, with lead-to-close doubled because only serious buyers reached a human closer', sector: 'High-ticket coaching', caseSlug: 'coaching-lead-scoring' },
        { figure: '$45,000+', label: 'added monthly revenue once every lead got an instant reply and automatic follow-up', sector: 'Roofing and remodelling', caseSlug: 'home-improvement-sales-workflow' },
      ],
      steps: [
        { title: 'Map your sales process', text: 'We look at where leads come from, what you ask them, and what a qualified lead looks like for you.' },
        { title: 'Write and connect', text: 'We write the messages in your voice and connect your lead sources, calendar and CRM.' },
        { title: 'Test, then go live', text: 'We run test leads through every path, then switch it on for new leads and your old database.' },
        { title: 'Run and report', text: 'We read the conversations, tune the messages, and report replies, bookings and closed revenue every month.' },
      ],
      comparison: {
        caption: 'AI Sales Follow-Up compared with the alternatives',
        columns: ['Hexona AI Sales Follow-Up', 'Hiring another sales rep', 'CRM email sequences'],
        rows: [
          { label: 'Replies to new leads in under a minute', values: ['Every lead, 24/7', 'During working hours', 'Generic auto-reply'] },
          { label: 'Holds a real two-way conversation', values: ['Yes', 'Yes', 'No'] },
          { label: 'Works your old leads and estimates', values: ['Yes, all of them', 'When there is time', 'Only if someone builds it'] },
          { label: 'Books into your calendar', values: ['Yes', 'Yes', 'Sends a link'] },
          { label: 'Who sets it up and improves it', values: ['We do', 'You train them', 'You do'] },
        ],
      },
      faqs: [
        {
          question: 'What is an AI SDR or AI appointment setter?',
          answer: 'It is software that does the first part of the sales job: replying to new leads, asking qualifying questions, following up and booking appointments. A person still closes. The AI makes sure every lead gets a fast reply and nobody falls through the cracks.',
        },
        {
          question: 'Why does speed to lead matter so much?',
          answer: 'A lead is most interested in the minutes after they ask. If you reply hours later, they have often already called someone else. Replying within a minute, every time, is one of the cheapest ways to win more of the leads you already pay for.',
        },
        {
          question: 'Can it follow up on our old leads and lost estimates?',
          answer: 'Yes, and it is often where the fastest money is. One solar company had more than 4,000 old leads nobody had contacted. The reactivation campaign booked 38 appointments in under three weeks and produced $24,500 in net profit, with no manual outreach from the sales team.',
        },
        {
          question: 'Will it sound like a robot or annoy my customers?',
          answer: 'We write every message in your voice, keep it short and personal, and stop as soon as someone says no or asks a person to call. You approve the messages before anything goes live.',
        },
        {
          question: 'Does it replace my sales team?',
          answer: 'No. It takes the chasing and filtering off them, so they spend their time on people who are ready to buy. Most teams handle far more leads without adding headcount.',
        },
        {
          question: 'How does better follow-up increase what my business is worth?',
          answer: 'A buyer values a business on its earnings and how dependable they are. Turning more of your existing leads into jobs raises earnings without raising marketing spend, and a sales process that runs on a system, not on one great salesperson, makes those earnings more dependable.',
        },
      ],
      industries: ['construction', 'home-services', 'med-spas', 'property-management', 'automotive'],
    },
  },
  {
    slug: 'ai-dispatcher',
    name: 'AI Dispatcher',
    short: 'Builds the schedule, routes the crews and handles the reschedules.',
    driver: 'Margin',
    icon: 'route',
    page: {
      metaTitle: 'AI Dispatcher and Scheduling Assistant',
      metaDescription:
        'An AI dispatcher that builds the schedule, matches jobs to the right tech, handles reschedules and keeps customers updated. Built and run for you by Hexona.',
      h1: 'An AI dispatcher that builds tomorrow’s schedule while you sleep.',
      answer:
        'An AI dispatcher builds the schedule, assigns each job to the right available technician, reshuffles the day when something changes, and texts customers updates automatically. Hexona connects it to your field-service software and runs it, so your office stops spending hours on the calendar.',
      intro:
        'In most field-service businesses, one person holds the schedule in their head. They spend hours a day building it, then the rest of the day rebuilding it every time a job runs long, a tech calls in sick or a customer cancels. When that person is away, the day falls apart.',
      demo: {
        title: 'Schedule change · 7:15 AM',
        icon: 'route',
        messages: [
          { from: 'caller', text: 'It’s Dan. Truck won’t start, I’ll be about two hours late.' },
          { from: 'ai', text: 'Thanks Dan. I’ve moved your 8 AM to Luis, who’s 10 minutes away, and pushed your 10:30 to 12:30.' },
          { from: 'ai', text: 'Hi Mrs. Patel, your technician is now arriving at 12:30 instead of 10:30. Reply 1 to confirm or 2 to pick another time.' },
          { from: 'caller', text: '1' },
        ],
        outcome: 'Schedule updated · 2 customers notified · Office copied',
      },
      does: [
        { title: 'Builds the schedule', text: 'It assigns jobs by skill, location, availability and job length, so the day is planned before anyone gets in.' },
        { title: 'Routes the crews', text: 'Jobs are grouped by area to cut drive time between stops.' },
        { title: 'Handles the changes', text: 'Sick calls, overruns and cancellations get reshuffled in minutes, not over an hour on the phone.' },
        { title: 'Keeps customers informed', text: 'Confirmations, reminders and “on the way” texts go out automatically, so fewer people are not home.' },
        { title: 'Fills gaps', text: 'When a slot opens, it offers it to customers on the waitlist or with flexible jobs.' },
        { title: 'Flags problems early', text: 'Double bookings, missing parts notes and jobs at risk of running late are raised before they become complaints.' },
      ],
      problems: [
        'Someone spends hours a day building and rebuilding the schedule',
        'Crews drive back and forth across town between jobs',
        'Customers are not home because nobody reminded them',
        'The schedule lives in one person’s head',
      ],
      proof: [
        { figure: '3–4 hrs', label: 'a day was going on building the schedule by hand, part of $23,400 a month in operational waste this platform was built to remove', sector: 'Plumbing and field services', caseSlug: 'plumbing-field-service-platform' },
      ],
      steps: [
        { title: 'Map how you schedule', text: 'We learn your job types, durations, skills, service areas and the rules your dispatcher follows today.' },
        { title: 'Connect your software', text: 'We connect it to your field-service or calendar software, phones and customer texting.' },
        { title: 'Run side by side', text: 'It drafts the schedule alongside your dispatcher until both agree, then takes over the routine work.' },
        { title: 'Run and report', text: 'We track jobs per tech, drive time and no-shows, and keep improving the rules.' },
      ],
      comparison: {
        caption: 'AI dispatcher compared with the alternatives',
        columns: ['Hexona AI Dispatcher', 'A full-time dispatcher', 'Scheduling software alone'],
        rows: [
          { label: 'Builds the daily schedule', values: ['Automatically', 'By hand', 'You drag and drop'] },
          { label: 'Reshuffles when the day changes', values: ['In minutes', 'Over the phone', 'You do it'] },
          { label: 'Texts customers updates', values: ['Automatically', 'When there is time', 'Basic reminders'] },
          { label: 'Works when someone is off sick', values: ['Always', 'Needs cover', 'Needs someone to run it'] },
          { label: 'Who sets it up and improves it', values: ['We do', 'You train them', 'You do'] },
        ],
      },
      faqs: [
        {
          question: 'What is an AI dispatcher?',
          answer: 'It is software that does the dispatcher’s routine work: assigning jobs to the right technician, planning routes, rescheduling when the day changes, and keeping customers updated. Your team still makes the judgement calls. The AI does the shuffling.',
        },
        {
          question: 'Will it work with ServiceTitan, Jobber or Housecall Pro?',
          answer: 'We connect to the field-service and calendar software you already use wherever it allows it. If your system cannot connect, we tell you on the free consult before any work starts.',
        },
        {
          question: 'Do I still need a dispatcher?',
          answer: 'Usually you keep the person and lose the busywork. They stop spending hours a day building the board and spend that time on customers, problem jobs and growing the team.',
        },
        {
          question: 'What happens with an emergency job?',
          answer: 'You set the rules. Emergencies can jump the queue, go to whoever is closest, or go straight to a person for a decision, and the affected customers are notified automatically.',
        },
        {
          question: 'How does an AI dispatcher increase what my business is worth?',
          answer: 'More jobs per technician and less office time per job raise your margin. And a schedule that runs on a system instead of living in one person’s head removes a key-person risk that buyers mark the price down for.',
        },
      ],
      industries: ['home-services', 'construction', 'property-management', 'automotive'],
    },
  },
  {
    slug: 'ai-office-admin',
    name: 'AI Office Admin',
    short: 'Quotes, paperwork and approvals, done without anyone chasing them.',
    driver: 'Output per employee',
    icon: 'doc',
    page: {
      metaTitle: 'AI Office Admin: Paperwork Automation',
      metaDescription:
        'An AI office admin that builds quotes, sends forms, collects signatures and moves every job to the next step, so your team stops chasing paperwork. Built by Hexona.',
      h1: 'The paperwork gets done. Nobody has to chase it.',
      answer:
        'AI Office Admin takes over the paperwork between a lead and a finished job: it builds quotes from your templates, sends forms and contracts, chases signatures, and moves each job to the next stage automatically. Hexona builds it around how your office already works and runs it for you.',
      intro:
        'Every job has a trail of admin behind it: the quote, the intake form, the contract, the change order, the approval. None of it is hard. It just depends on somebody remembering to send it, and then remembering to chase it. That is where days disappear and jobs stall.',
      demo: {
        title: 'Job #2187 · Site visit done',
        icon: 'doc',
        messages: [
          { from: 'caller', text: 'Site visit done. Bathroom remodel, standard tile package, client wants a walk-in shower.' },
          { from: 'ai', text: 'Quote built from the bathroom template with the walk-in shower option: $18,400. Send it to the client now?' },
          { from: 'caller', text: 'Yes, send it.' },
          { from: 'ai', text: 'Sent with accept and decline buttons. I’ll follow up in 2 days and send the contract the moment they accept.' },
        ],
        outcome: 'Quote sent · Follow-up scheduled · Pipeline updated',
      },
      does: [
        { title: 'Builds quotes fast', text: 'Quotes are generated from your own templates and price lists, branded, and sent the same day as the visit.' },
        { title: 'Sends and collects forms', text: 'Intake forms, waivers and contracts go out automatically, with reminders until they come back.' },
        { title: 'Chases signatures and approvals', text: 'Contracts, change orders and sign-offs are followed up without anyone remembering to.' },
        { title: 'Moves jobs forward', text: 'When a step is done, the next one starts: tasks assigned, the right person notified.' },
        { title: 'Keeps records tidy', text: 'Documents, notes and status land in your CRM against the right customer, every time.' },
        { title: 'Gives the owner a live view', text: 'A dashboard shows every job’s stage, what is stuck and what is waiting on whom.' },
      ],
      problems: [
        'Quotes take days to go out after the site visit',
        'Jobs stall waiting on a form or a signature',
        'Staff spend hours a week chasing paperwork',
        'Nobody can see where every job is without asking around',
      ],
      proof: [
        { figure: '41%', label: 'fewer project delays, with estimate-to-approval 44% faster and admin follow-up down by more than eleven hours a week', sector: 'Renovation contractor', caseSlug: 'construction-project-pipeline' },
        { figure: '18 → 3.5 hrs', label: 'of weekly sales admin, with quotes going out in under 24 hours instead of 3 days', sector: 'Roofing and remodelling', caseSlug: 'home-improvement-sales-workflow' },
      ],
      steps: [
        { title: 'Map your paperwork', text: 'We list every document, form and approval in a job, and who chases each one today.' },
        { title: 'Rebuild your templates', text: 'Your quotes, forms and contracts become digital templates with e-signature built in.' },
        { title: 'Automate the handoffs', text: 'Each completed step triggers the next: the document, the reminder, the task, the notification.' },
        { title: 'Run and report', text: 'We watch for stuck jobs, keep the templates current and report the time saved.' },
      ],
      faqs: [
        {
          question: 'Can AI really write our quotes?',
          answer: 'It builds them from your own templates, price lists and the notes from the site visit, the same way your office does today, just faster. Anything unusual can be sent to a person to check before it goes out.',
        },
        {
          question: 'Does it work with our CRM and e-signature tools?',
          answer: 'We connect to the CRM, accounting and document tools you already use wherever they allow it, or set up simple ones if you do not have them. You keep ownership of all of it.',
        },
        {
          question: 'Will this replace our office staff?',
          answer: 'No. It removes the chasing and copying, so the same team can handle far more jobs. One renovation contractor grew to more than 27 active projects without adding admin staff.',
        },
        {
          question: 'What if a client has questions about a quote?',
          answer: 'Questions about the quote go to the right person on your team, with the full history attached. The AI handles reminders and routine replies, not negotiations.',
        },
        {
          question: 'How does automating admin increase what my business is worth?',
          answer: 'Buyers look at output per employee and at how much of the business runs on documented systems. When paperwork runs itself, each person handles more work, margins improve, and the business no longer depends on one office manager who knows where everything is.',
        },
      ],
      industries: ['construction', 'home-services', 'property-management', 'med-spas'],
    },
  },
  {
    slug: 'ai-collections',
    name: 'AI Collections',
    short: 'Chases invoices and deposits politely, every time, so cash comes in faster.',
    driver: 'Cash flow',
    icon: 'cash',
    page: {
      metaTitle: 'AI Collections: Invoice Follow-Up',
      metaDescription:
        'An AI collections assistant that sends invoices, reminds customers before and after due dates, collects deposits and escalates overdue accounts. Built by Hexona.',
      h1: 'Get paid faster, without the awkward phone calls.',
      answer:
        'AI Collections follows up every invoice and deposit automatically: friendly reminders before the due date, polite chasers after it, a payment link in every message, and escalation to a person when an account is seriously overdue. Hexona connects it to your invoicing software and runs it for you.',
      intro:
        'Most late payments are not bad customers. They are busy customers who forgot, and an office too busy to remind them. Chasing money is uncomfortable, so it gets put off, and the cash you have already earned sits in other people’s bank accounts.',
      demo: {
        title: 'Invoice #4410 · 3 days overdue',
        icon: 'cash',
        messages: [
          { from: 'ai', text: 'Hi Jen, a quick reminder that invoice #4410 for $1,250 was due on Monday. You can pay here in a minute: [link]' },
          { from: 'caller', text: 'Sorry! Can I split it into two payments?' },
          { from: 'ai', text: 'Of course. I can set up $625 today and $625 on the 15th. Want me to send that plan?' },
          { from: 'caller', text: 'Yes please.' },
        ],
        outcome: 'Payment plan sent · First $625 paid · Books updated',
      },
      does: [
        { title: 'Sends invoices on time', text: 'Invoices go out the moment a job is complete, not when someone gets to the paperwork.' },
        { title: 'Reminds before the due date', text: 'A friendly heads-up with a payment link, so paying on time is the easy option.' },
        { title: 'Chases politely after it', text: 'A sequence of firm, courteous follow-ups by text and email, in your tone.' },
        { title: 'Collects deposits', text: 'Deposits are requested and confirmed before work is booked, so you are not funding the job.' },
        { title: 'Offers payment plans', text: 'Within limits you set, it can offer a split payment instead of letting an invoice go cold.' },
        { title: 'Escalates when needed', text: 'Seriously overdue accounts go to a person with the full history, so you only make the calls that matter.' },
      ],
      problems: [
        'Invoices go out days or weeks after the job',
        'Nobody has time to chase overdue payments',
        'Deposits are not collected before work starts',
        'You find out cash is tight when payroll is due',
      ],
      proof: [],
      steps: [
        { title: 'Review your receivables', text: 'We look at how you invoice today, how long customers take to pay, and where money gets stuck.' },
        { title: 'Set your rules', text: 'You decide the tone, timing, deposit amounts, payment plan limits and when a person steps in.' },
        { title: 'Connect your invoicing', text: 'We connect it to your accounting or invoicing software and payment links.' },
        { title: 'Run and report', text: 'We track days to get paid and overdue balances, and report the cash it brought in each month.' },
      ],
      faqs: [
        {
          question: 'Will automated payment reminders upset my customers?',
          answer: 'Not when they are written well. Most customers appreciate a friendly reminder with a link to pay. You approve the tone and timing, and anyone who replies with a question or a problem is handed to a person.',
        },
        {
          question: 'Does it work with QuickBooks or Xero?',
          answer: 'We connect to the accounting and invoicing software you already use wherever it allows it, so reminders stop the moment an invoice is marked paid.',
        },
        {
          question: 'Can it collect deposits before a job is booked?',
          answer: 'Yes. It can request a deposit as part of booking and only confirm the appointment once it is paid, using rules you set for each type of job.',
        },
        {
          question: 'Is this a debt collection agency?',
          answer: 'No. It is your own polite, consistent follow-up on your own invoices, sent in your business’s name. Accounts that need formal collection are flagged to you to decide what to do.',
        },
        {
          question: 'How does faster collection increase what my business is worth?',
          answer: 'Buyers look closely at cash flow and working capital. A business that gets paid quickly and predictably needs less cash tied up to run, which makes it less risky to buy and easier to finance.',
        },
      ],
      industries: ['construction', 'home-services', 'property-management', 'automotive', 'med-spas'],
    },
  },
  {
    slug: 'ai-retention',
    name: 'AI Retention',
    short: 'Wins back past customers, offers plans and asks happy ones for reviews.',
    driver: 'Recurring revenue',
    icon: 'heart',
    page: {
      metaTitle: 'AI Retention: Win-Backs and Reviews',
      metaDescription:
        'An AI retention assistant that wins back lapsed customers, sells maintenance plans and memberships, books repeat visits and asks for reviews. Built by Hexona.',
      h1: 'Turn one-time customers into regulars.',
      answer:
        'AI Retention keeps past customers coming back: it reminds them when the next service is due, wins back the ones who have gone quiet, offers maintenance plans and memberships, and asks happy customers for reviews and referrals. Hexona builds it on your customer list and runs it for you.',
      intro:
        'Winning a new customer costs far more than keeping one you already have. But after the job is done, most businesses never speak to the customer again until they happen to call back, if they ever do. Every one of them is revenue you have already earned the right to.',
      demo: {
        title: 'Win-back text · 90 days since last visit',
        icon: 'heart',
        messages: [
          { from: 'ai', text: 'Hi Chris, it’s been about 3 months since your last service with us. Your car is due for an oil change and tire rotation. Want me to book you in?' },
          { from: 'caller', text: 'Yeah, can you do Saturday morning?' },
          { from: 'ai', text: 'Saturday at 9:00 is open. Members save 15% on every visit. Want me to add a membership too?' },
          { from: 'caller', text: 'Sure, why not.' },
        ],
        outcome: 'Booked: Sat 9:00 AM · Membership started',
      },
      does: [
        { title: 'Books the next visit', text: 'Customers are reminded when the next service, treatment or check-up is due, with a time ready to book.' },
        { title: 'Wins back lapsed customers', text: 'Anyone who has gone quiet gets a personal message based on what they bought before.' },
        { title: 'Sells plans and memberships', text: 'Maintenance plans, memberships and packages are offered at the right moment, then renewed automatically.' },
        { title: 'Asks for reviews', text: 'Happy customers are asked for a review right after the job, when they are most likely to leave one.' },
        { title: 'Catches unhappy customers', text: 'Anyone who signals a problem goes to a person straight away, before it becomes a bad review.' },
        { title: 'Runs referrals', text: 'Customers who love you get an easy way to refer friends, with rewards tracked automatically.' },
      ],
      problems: [
        'Customers buy once and you never hear from them again',
        'Nobody reminds customers when they are due for the next service',
        'Your happiest customers never leave a review',
        'Revenue starts from zero every month',
      ],
      proof: [
        { figure: '27% → 68%', label: 'customer retention, with $312,000 in revenue attributed to the programme over eight months', sector: 'Speciality coffee, multi-location', caseSlug: 'coffee-loyalty-programme' },
      ],
      steps: [
        { title: 'Look at your customer list', text: 'We find who has lapsed, who is due, and who your best customers are.' },
        { title: 'Design the offers', text: 'We set up reminders, win-back messages, plans or memberships and review requests that fit your business.' },
        { title: 'Connect and launch', text: 'We connect your CRM, booking and payment tools, and start with the customers most likely to come back.' },
        { title: 'Run and report', text: 'We report repeat visits, plan sign-ups, reviews and revenue from returning customers every month.' },
      ],
      faqs: [
        {
          question: 'How do I get past customers to come back?',
          answer: 'Remind them at the right time with something useful: a service that is due, a seasonal check-up, or an offer based on what they bought before. Doing that consistently for every customer is the hard part, and it is exactly what the AI handles.',
        },
        {
          question: 'Can it sell maintenance plans or memberships?',
          answer: 'Yes. It can offer plans at the moments customers are most likely to say yes, such as right after a good job or when a service is due, then handle renewals and reminders automatically.',
        },
        {
          question: 'How does it get more Google reviews?',
          answer: 'It asks every customer shortly after the job, with a direct link, which is when they are most likely to leave one. Customers who signal a problem are sent to a person first, so you can fix it before it turns into a bad review.',
        },
        {
          question: 'Will customers find it pushy?',
          answer: 'Not if the messages are useful and well timed. We keep them short and personal, limit how often anyone is contacted, and stop immediately when someone opts out.',
        },
        {
          question: 'How does recurring revenue increase what my business is worth?',
          answer: 'Recurring revenue is one of the things buyers pay the most for, because it is predictable. A business with a growing base of plan members and repeat customers usually sells for a higher multiple than one that starts from zero every month.',
        },
      ],
      industries: ['home-services', 'med-spas', 'automotive', 'hospitality'],
    },
  },
];

export const employeesWithPages = () => EMPLOYEES.filter((e) => e.page);
export const getEmployee = (slug: string) => EMPLOYEES.find((e) => e.slug === slug);
