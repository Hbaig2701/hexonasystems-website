/**
 * content/industries.ts — the industries Hexona builds AI employees for.
 *
 * An industry with a `page` gets /industries/<slug>. The rest are listed, and
 * link, once their page is written. Proof points quote content/evidence.ts.
 */

import type { Faq } from './faqs';
import type { Demo, ProofPoint } from './employees';

export interface IndustryPage {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  answer: string;
  intro: string;
  demo?: Demo;
  problems: { title: string; text: string }[];
  /** Which AI employees fit, in order, with the reason for this industry. */
  team: { slug: string; why: string }[];
  proof: ProofPoint[];
  /** Heading for the proof section. Set it when the proof comes from another industry. */
  proofTitle?: string;
  faqs: Faq[];
}

export interface Industry {
  slug: string;
  name: string;
  page?: IndustryPage;
}

export const INDUSTRY_LIST: Industry[] = [
  {
    slug: 'construction',
    name: 'Construction and contractors',
    page: {
      metaTitle: 'AI for Construction Companies',
      metaDescription:
        'AI employees for construction companies and contractors: answer every enquiry, follow up every estimate, and automate approvals and paperwork. Built and run by Hexona.',
      h1: 'AI employees for construction companies and contractors.',
      answer:
        'Construction companies use AI employees to answer every enquiry while the team is on site, follow up every estimate until it is signed, and move approvals and paperwork without anyone chasing them. Hexona builds them into the systems you already use and runs them for you.',
      intro:
        'Contractors rarely lose work because they are bad at the job. They lose it in the office: the call nobody picked up, the estimate nobody followed up, the contract waiting on a signature for a week. Those are exactly the jobs AI does well.',
      demo: {
        title: 'Estimate follow-up · Day 3',
        icon: 'bolt',
        messages: [
          { from: 'ai', text: 'Hi Sarah, just checking you got the kitchen estimate we sent Monday. Any questions I can answer?' },
          { from: 'caller', text: 'We did. Is the start date flexible? We’re away the first week of May.' },
          { from: 'ai', text: 'Yes. We can start May 12th instead. Want me to send the contract with that date?' },
          { from: 'caller', text: 'Perfect, please do.' },
        ],
        outcome: 'Contract sent for signature · Project manager notified',
      },
      problems: [
        { title: 'Calls missed on site', text: 'The phone rings while everyone is on a roof or in a basement. The caller rings the next contractor.' },
        { title: 'Estimates that go quiet', text: 'A quote goes out and nobody follows up. The homeowner signs with whoever called back first.' },
        { title: 'Approvals that stall', text: 'Forms, signatures and change orders wait on somebody remembering to chase them, and the job slips.' },
        { title: 'Admin that eats the week', text: 'Sales and project staff spend hours on paperwork instead of selling and running jobs.' },
      ],
      team: [
        { slug: 'ai-receptionist', why: 'Answers every enquiry while the crew is on site, qualifies the job and books the site visit.' },
        { slug: 'ai-sales-follow-up', why: 'Follows up every estimate by text and email until it is signed, and revives the old ones.' },
        { slug: 'ai-office-admin', why: 'Sends the forms, collects signatures and moves each job to the next stage automatically.' },
        { slug: 'ai-dispatcher', why: 'Keeps crews and subcontractors scheduled, and handles the reschedules.' },
      ],
      proof: [
        { figure: '41%', label: 'fewer project delays, with estimate-to-approval 44% faster and close rate up 18%', sector: 'Renovation contractor', caseSlug: 'construction-project-pipeline' },
        { figure: '$45,000+', label: 'added monthly revenue, with sales admin cut from 18 to 3.5 hours a week', sector: 'Roofing and remodelling', caseSlug: 'home-improvement-sales-workflow' },
        { figure: '$24,500', label: 'net profit recovered from a database of homeowners nobody had followed up', sector: 'Residential solar', caseSlug: 'solar-dormant-database' },
      ],
      faqs: [
        {
          question: 'Will it work with the software we already use?',
          answer: 'Usually, yes. We connect to the CRM, estimating, calendar and phone systems you already run, so your team keeps working where it works now. If something has no way to connect, we tell you before we start rather than after.',
        },
        {
          question: 'Our jobs are complicated. Can AI really answer customer questions?',
          answer: 'It answers the questions that come up every day: what you do, where you work, availability, and what happens next. Anything that needs judgement, such as pricing a complex job, is handed to a person with the details already collected.',
        },
        {
          question: 'Does this replace my office staff?',
          answer: 'No. It takes the chasing, copying and calling back off them, so the same team can run more jobs. One renovation contractor we worked with grew to more than 27 active projects without adding admin staff.',
        },
        {
          question: 'How does this increase what my company is worth?',
          answer: 'Buyers pay more for a contractor whose pipeline, follow-up and paperwork run on systems rather than on the owner. Faster approvals and a higher close rate lift earnings, and a business that runs without you earns a better multiple.',
        },
        {
          question: 'How long does it take to set up?',
          answer: 'It depends on how many systems are involved. We map it on the free consult and give you a fixed scope and timeline before any work starts.',
        },
      ],
    },
  },
  {
    slug: 'home-services',
    name: 'Plumbing, HVAC and home services',
    page: {
      metaTitle: 'AI Receptionist for Plumbers and HVAC',
      metaDescription:
        'An AI receptionist and answering service for plumbers, HVAC and home service companies: answers every call 24/7, books the job and dispatches the right tech.',
      h1: 'AI employees for plumbing, HVAC and home service companies.',
      answer:
        'Plumbing, HVAC and home service companies use AI employees to answer every call 24/7, book jobs straight into the schedule, and handle the scheduling, follow-up and invoicing the office never has time for. Hexona builds them into the software you already run and runs them for you.',
      intro:
        'In home services the job usually goes to whoever answers first. The no-heat call at 10 PM, the burst pipe on a Sunday, the water heater quote on a Tuesday afternoon while every tech is out. Miss it and the customer is booking with the next company on Google before you see the voicemail.',
      demo: {
        title: 'Incoming call · 10:17 PM',
        icon: 'phone',
        messages: [
          { from: 'caller', text: 'Our heat’s out and we’ve got a newborn in the house. Can anyone come tonight?' },
          { from: 'ai', text: 'I’m sorry, that’s urgent. I’m paging our on-call tech now. Is the thermostat showing anything, or completely blank?' },
          { from: 'caller', text: 'Completely blank. The furnace isn’t making any sound.' },
          { from: 'ai', text: 'Thanks. Mike is on call and can be there in about 40 minutes. I’ll text you his name and photo.' },
        ],
        outcome: 'Emergency dispatched · On-call tech notified',
      },
      problems: [
        { title: 'Calls missed on the job', text: 'Techs are under sinks and on rooftops. The office is on another line. The caller rings the next plumber.' },
        { title: 'After-hours emergencies', text: 'Nights and weekends go to voicemail or an answering service that only takes a message.' },
        { title: 'Scheduling by hand', text: 'Someone spends hours a day building and rebuilding the schedule every time a job runs over.' },
        { title: 'Quotes and invoices that sit', text: 'Estimates go out and nobody follows up. Invoices go out and nobody chases them.' },
      ],
      team: [
        { slug: 'ai-receptionist', why: 'Answers every call and text 24/7, separates emergencies from routine work, and books the job into your schedule.' },
        { slug: 'ai-dispatcher', why: 'Matches each job to the right tech and handles the reschedules when a job runs long.' },
        { slug: 'ai-sales-follow-up', why: 'Follows up every replacement quote and maintenance plan offer until the customer says yes or no.' },
        { slug: 'ai-collections', why: 'Chases unpaid invoices by text and email so the office doesn’t have to.' },
      ],
      proof: [
        { figure: '$280,800', label: 'a year of operational waste identified at a plumbing company, including 3–4 hours a day of scheduling done by hand. That is what the system was built to remove', sector: 'Plumbing and field services', caseSlug: 'plumbing-field-service-platform' },
        { figure: '$45,000+', label: 'added monthly revenue, with sales admin cut from 18 to 3.5 hours a week', sector: 'Roofing and remodeling', caseSlug: 'home-improvement-sales-workflow' },
        { figure: '$24,500', label: 'net profit recovered from a database of homeowners nobody had followed up', sector: 'Residential solar', caseSlug: 'solar-dormant-database' },
      ],
      faqs: [
        {
          question: 'Is an AI receptionist better than an after-hours answering service?',
          answer: 'A traditional answering service takes a message and someone calls back in the morning. An AI receptionist books the job, dispatches emergencies to whoever is on call, and texts the customer a confirmation, at any hour. It also logs every call in your CRM so nothing depends on reading a message pad.',
        },
        {
          question: 'Can it tell an emergency from a routine call?',
          answer: 'Yes. You set the rules: no heat in winter, active leaks, no hot water, or anything else you treat as urgent. Those calls go straight to your on-call tech with a summary. Routine work is booked into the next available slot.',
        },
        {
          question: 'Will it work with ServiceTitan, Housecall Pro or Jobber?',
          answer: 'In most cases we connect to the field-service software you already use, so bookings land in the same schedule your dispatchers see. If your system has no way to connect, we tell you on the free consult before any work starts.',
        },
        {
          question: 'What does it say when someone asks for a price?',
          answer: 'Whatever you tell it to. Most companies share a service call fee or a price range and leave exact quotes to the tech on site. It never makes up a price you have not approved.',
        },
        {
          question: 'How does this make my company worth more?',
          answer: 'Buyers of home service companies pay for booked revenue and for a business that does not depend on the owner answering the phone. Capturing calls you currently miss lifts earnings, and running dispatch, follow-up and collections on systems rather than people makes the business easier to hand over.',
        },
      ],
    },
  },
  {
    slug: 'med-spas',
    name: 'Med spas and clinics',
    page: {
      metaTitle: 'AI Receptionist for Med Spas and Clinics',
      metaDescription:
        'An AI receptionist for med spas and clinics: books treatments 24/7, captures after-hours enquiries, takes deposits and fills cancellations. Built and run by Hexona.',
      h1: 'AI employees for med spas and clinics.',
      answer:
        'Med spas and clinics use AI employees to book treatments around the clock, capture the enquiries that arrive after the front desk goes home, and keep clients coming back for their next appointment. Hexona builds them into your booking system and runs them for you.',
      intro:
        'A lot of med spa clients decide to book late in the evening, on their phone, after the front desk has gone home. If nobody answers, most of them never call back. Meanwhile the team spends its day on confirmation calls, rebooking and chasing no-shows instead of looking after the clients in front of them.',
      demo: {
        title: 'Website chat · 11:08 PM',
        icon: 'phone',
        messages: [
          { from: 'caller', text: 'Hi, do you have anything for Botox this Saturday?' },
          { from: 'ai', text: 'We do. Dr. Patel has 10:30 AM or 1:15 PM on Saturday. Is this your first visit with us?' },
          { from: 'caller', text: 'Yes, first time. 10:30 works.' },
          { from: 'ai', text: 'Booked. I’ve sent your intake form and a link to place the deposit that holds your spot.' },
        ],
        outcome: 'Booked: Sat 10:30 AM · Intake form sent',
      },
      problems: [
        { title: 'After-hours enquiries lost', text: 'Clients book when they have time, which is often late at night. Nobody is there to answer.' },
        { title: 'Front desk on the phone all day', text: 'Confirmation calls, reschedules and the same questions about pricing and downtime, over and over.' },
        { title: 'Empty slots and no-shows', text: 'A cancellation at short notice means an idle room and a provider with nothing to do.' },
        { title: 'Clients who never rebook', text: 'Treatments that need a follow-up visit don’t get one, because nobody reached out at the right time.' },
      ],
      team: [
        { slug: 'ai-receptionist', why: 'Answers calls, texts and website chat 24/7, answers common treatment questions and books the right provider.' },
        { slug: 'ai-retention', why: 'Reminds clients when their next treatment is due, offers memberships and asks happy clients for reviews.' },
        { slug: 'ai-office-admin', why: 'Sends intake forms and consents, collects deposits and fills cancellations from the waitlist.' },
      ],
      proof: [
        { figure: '23%', label: 'of bookings at one med spa were arriving after hours, and two thirds of those callers never rang back. That is the leak this system was built to close', sector: 'Med spa', caseSlug: 'medspa-booking-system' },
        { figure: 'Three weeks', label: 'from no website, booking or CRM to live online booking, payments, memberships and nurture, under a $5,000 budget', sector: 'Wellness and recovery centre', caseSlug: 'wellness-centre-launch-systems' },
      ],
      faqs: [
        {
          question: 'Can an AI receptionist answer questions about treatments?',
          answer: 'It answers the everyday questions you approve: what a treatment involves, typical downtime, how to prepare, and pricing if you publish it. Anything medical, such as whether a treatment is right for someone, is passed to your team.',
        },
        {
          question: 'Does it work with our booking software?',
          answer: 'In most cases, yes. We connect it to the booking system you already use so appointments, providers and rooms stay in one place. If your system has no way to connect, we tell you before we start.',
        },
        {
          question: 'Can it take deposits to cut down on no-shows?',
          answer: 'Yes. It can send a secure deposit link when it books, send reminders before the appointment, and offer a cancelled slot to clients on your waitlist.',
        },
        {
          question: 'What about patient privacy?',
          answer: 'We keep what the assistant collects to what your booking needs, and set it up so medical details go into your own systems rather than into chat logs. If your clinic is covered by HIPAA, tell us on the free consult so we choose tools that fit those rules.',
        },
        {
          question: 'How does this increase what my med spa is worth?',
          answer: 'Buyers pay more for recurring revenue and for a clinic that keeps its calendar full without the owner managing it. Capturing after-hours bookings lifts revenue, and automated rebooking and memberships turn one-off clients into predictable repeat business.',
        },
      ],
    },
  },
  {
    slug: 'property-management',
    name: 'Property management',
    page: {
      metaTitle: 'AI Answering Service for Property Managers',
      metaDescription:
        'An AI answering service for property management: answers tenant calls 24/7, logs maintenance requests, escalates emergencies and books showings. Built and run by Hexona.',
      h1: 'AI employees for property management companies.',
      answer:
        'Property management companies use AI employees to answer tenant and owner calls 24/7, log maintenance requests, send real emergencies to the on-call team, and book showings for vacant units. Hexona builds them into your property management software and runs them for you.',
      intro:
        'Tenants don’t only have problems between nine and five. A leak at 11 PM, a lockout on Saturday, a prospect who wants to see the unit tonight. Most property managers cover this with an after-hours answering service that takes messages, or a manager who never really gets a night off. Neither scales as the portfolio grows.',
      demo: {
        title: 'Tenant call · 11:04 PM',
        icon: 'phone',
        messages: [
          { from: 'caller', text: 'Water is coming through the ceiling in my bathroom. Unit 4B at Maple Court.' },
          { from: 'ai', text: 'Thanks for calling right away. Can you turn off the water valve under the sink? I’m alerting the on-call maintenance tech now.' },
          { from: 'caller', text: 'Okay, it’s off. It’s still dripping a bit.' },
          { from: 'ai', text: 'Got it. Carlos is on his way and will text you when he’s 10 minutes out. I’ve also let the unit above know.' },
        ],
        outcome: 'Emergency work order created · On-call tech dispatched',
      },
      problems: [
        { title: 'After-hours tenant calls', text: 'Leaks, lockouts and no-heat calls arrive at night and on weekends, and someone has to decide what’s an emergency.' },
        { title: 'Maintenance requests by phone', text: 'Requests come in by call, text and email, and details get lost before a work order exists.' },
        { title: 'Vacant units waiting on showings', text: 'Prospects enquire in the evening and hear back the next day, after they’ve booked a viewing elsewhere.' },
        { title: 'Rent and renewal chasing', text: 'Late rent reminders, renewal notices and owner updates eat the week.' },
      ],
      team: [
        { slug: 'ai-receptionist', why: 'Answers tenant, owner and prospect calls 24/7, logs maintenance requests and escalates genuine emergencies to your on-call team.' },
        { slug: 'ai-dispatcher', why: 'Turns requests into work orders, assigns the right vendor or tech, and keeps tenants updated on arrival times.' },
        { slug: 'ai-sales-follow-up', why: 'Replies to rental enquiries in minutes, answers questions about the unit and books showings.' },
        { slug: 'ai-collections', why: 'Sends rent reminders and follows up late payments politely and consistently, before you have to.' },
      ],
      proof: [
        { figure: '$50,000+', label: 'recovered by answering calls that used to go to voicemail. A different industry with the same problem: calls arriving when nobody is free to pick up', sector: 'Tire and auto service', caseSlug: 'tire-shop-missed-calls' },
      ],
      proofTitle: 'The same problem, solved in another industry.',
      faqs: [
        {
          question: 'Is an AI answering service a good fit for property management?',
          answer: 'Yes, because most calls follow a pattern: maintenance requests, emergencies, showing requests and rent questions. An AI answering service handles those consistently at any hour, creates the work order or booking, and only wakes a person up for a genuine emergency.',
        },
        {
          question: 'How does it decide what counts as an emergency?',
          answer: 'You set the rules. Typical emergencies are active water leaks, no heat in winter, gas smells, lockouts and anything involving safety. Those go straight to your on-call team with a summary. Everything else becomes a work order for the next business day.',
        },
        {
          question: 'Does it work with AppFolio, Buildium or Yardi?',
          answer: 'In most cases we connect to the property management software you already use, so work orders and tenant records stay in one place. Where a system has no way to connect, we set up a clean handoff and tell you before we start.',
        },
        {
          question: 'Can it book showings for vacant units?',
          answer: 'Yes. It answers questions about the unit, checks the prospect against your basic criteria, and books a showing or a self-guided tour slot into your calendar, then sends reminders so fewer people no-show.',
        },
        {
          question: 'How does this make my property management company worth more?',
          answer: 'Management companies are valued on recurring fee income and on how well they keep owners and tenants. Faster responses help retain management contracts, faster leasing cuts vacancy, and a business that runs after hours without the owner on call is far easier to sell.',
        },
      ],
    },
  },
  {
    slug: 'automotive',
    name: 'Automotive',
    page: {
      metaTitle: 'AI Receptionist for Auto Repair Shops',
      metaDescription:
        'An AI receptionist for auto repair and tire shops: answers every call, texts back missed callers, quotes common services and books bays. Built and run by Hexona.',
      h1: 'AI employees for auto repair and tire shops.',
      answer:
        'Auto repair and tire shops use AI employees to answer every call while the team is in the bays, text back anyone who hangs up, and book appointments straight into the shop schedule. Hexona builds them into your shop software and runs them for you.',
      intro:
        'In a busy shop nobody has a free hand for the phone. Calls ring out during the morning rush and all through tire season, and every one of those callers is asking for a price and a time. If they don’t get one from you, they get one from the shop down the road.',
      demo: {
        title: 'Missed call text-back · 8:12 AM',
        icon: 'phone',
        messages: [
          { from: 'ai', text: 'Hi, this is Northside Tire. Sorry we missed your call. How can we help?' },
          { from: 'caller', text: 'Need my winter tires put on. Any time this week?' },
          { from: 'ai', text: 'Yes. Thursday 9:00 AM or Friday 2:30 PM. Are your tires stored with us or are you bringing them?' },
          { from: 'caller', text: 'Stored with you. Thursday please.' },
        ],
        outcome: 'Booked: Thu 9:00 AM · Tires pulled from storage',
      },
      problems: [
        { title: 'Calls ringing out in the bays', text: 'The team is under cars. The phone rings out and the customer calls someone else.' },
        { title: 'Seasonal rushes', text: 'Tire season doubles the calls overnight, and the shop can’t hire a receptionist for six weeks.' },
        { title: 'Messages nobody answers', text: 'Facebook, Instagram and email enquiries sit until someone gets a free minute, which is usually too late.' },
        { title: 'Customers who don’t come back', text: 'Nobody reminds them about their next oil change, tire swap or inspection.' },
      ],
      team: [
        { slug: 'ai-receptionist', why: 'Answers calls and texts back missed callers in seconds, answers common pricing questions and books the bay.' },
        { slug: 'ai-retention', why: 'Reminds customers when their next service or seasonal swap is due, and asks happy customers for reviews.' },
        { slug: 'ai-sales-follow-up', why: 'Follows up on estimates for bigger repairs the customer didn’t approve on the spot.' },
      ],
      proof: [
        { figure: '$50,000+', label: 'recovered from calls that used to go to voicemail, with booked appointments up 50% and 40% of missed leads re-engaged', sector: 'Tire and auto service', caseSlug: 'tire-shop-missed-calls' },
      ],
      faqs: [
        {
          question: 'Can an AI receptionist quote prices for repairs?',
          answer: 'It can quote the prices you approve for common work, such as tire changes, oil changes and inspections. For diagnostic work it books the customer in for an inspection rather than guessing at a number.',
        },
        {
          question: 'What happens when a call is missed?',
          answer: 'A text goes out within seconds asking how the shop can help, and carries on the conversation until the customer is booked. In one tire shop, that approach re-engaged 40% of missed leads.',
        },
        {
          question: 'Will it work with our shop management software?',
          answer: 'In most cases we connect it to the shop software or calendar you already use, so bookings appear where your service advisors look. If there is no way to connect, we tell you before we start.',
        },
        {
          question: 'Can it handle Facebook and Instagram messages too?',
          answer: 'Yes. The same assistant can answer messages on Facebook, Instagram, your website chat and email, so every enquiry is answered quickly and logged in one place.',
        },
        {
          question: 'How does this increase what my shop is worth?',
          answer: 'Buyers look at revenue, repeat customers and how much of the business depends on the owner. Capturing missed calls lifts revenue, service reminders build repeat business, and a front desk that runs on systems makes the shop easier to hand over.',
        },
      ],
    },
  },
  {
    slug: 'hospitality',
    name: 'Hospitality',
    page: {
      metaTitle: 'AI for Restaurants, Cafés and Hospitality',
      metaDescription:
        'AI employees for restaurants, cafés and hospitality: answer calls, take reservations, run loyalty and win back regulars who stop coming. Built and run by Hexona.',
      h1: 'AI employees for restaurants, cafés and hospitality.',
      answer:
        'Restaurants, cafés and hospitality businesses use AI employees to answer calls and take reservations during the rush, run loyalty programs, and win back customers who have quietly stopped coming in. Hexona builds them into your point of sale and booking tools and runs them for you.',
      intro:
        'Most hospitality businesses don’t know who their customers are. Someone comes in once, has a good time and never returns, and nobody notices. The phone rings during service when nobody can answer it. Getting a first-time guest to come back a second time is where most of the money is, and it’s the part almost nobody manages.',
      demo: {
        title: 'Win-back text · 14 days since last visit',
        icon: 'heart',
        messages: [
          { from: 'ai', text: 'Hi Jess, we’ve missed you at the Roosevelt location. Your usual oat latte is on us this week.' },
          { from: 'caller', text: 'Oh nice, thanks! I’ve been working from home. Is it any day?' },
          { from: 'ai', text: 'Any day through Sunday. Just show this text at the counter. You’re also 20 points from your next reward.' },
          { from: 'caller', text: 'Perfect, see you Thursday.' },
        ],
        outcome: 'Offer redeemed Thu · Visit logged to loyalty',
      },
      problems: [
        { title: 'First-time guests who never return', text: 'Most new customers come once. Nobody knows who they were, so nobody can invite them back.' },
        { title: 'Calls during service', text: 'Reservation and order calls ring out when every hand is busy on the floor.' },
        { title: 'Paper loyalty cards', text: 'Cards get lost, staff spend time on disputes, and the business learns nothing about its regulars.' },
        { title: 'No reason to come back', text: 'Without birthdays, offers or reminders, regulars drift away without anyone noticing.' },
      ],
      team: [
        { slug: 'ai-retention', why: 'Runs your loyalty program, notices when a regular stops coming in, and sends a personal offer to bring them back.' },
        { slug: 'ai-receptionist', why: 'Answers calls during service, takes reservations and answers questions about hours, menus and parking.' },
        { slug: 'ai-sales-follow-up', why: 'Follows up on catering, events and private booking enquiries until they are confirmed.' },
      ],
      proof: [
        { figure: '27% → 68%', label: 'customer retention across eight locations, with $312,000 in revenue attributed to the loyalty program', sector: 'Specialty coffee, multi-location', caseSlug: 'coffee-loyalty-programme' },
      ],
      faqs: [
        {
          question: 'Can AI take restaurant reservations by phone?',
          answer: 'Yes. It answers the call, checks availability in your reservation system, books the table and sends a confirmation by text. Large parties and special requests can be passed to a manager with the details already collected.',
        },
        {
          question: 'Do customers have to download an app for loyalty?',
          answer: 'No. In the coffee chain we worked with, customers joined in about ten seconds by scanning a QR code at the register, and received their card by text. Nobody had to download anything.',
        },
        {
          question: 'How does the win-back work?',
          answer: 'The system knows when each customer last visited and what they usually order. When a regular hasn’t been in for a set number of days, it sends a personal offer by text. You choose the timing and the offers.',
        },
        {
          question: 'Will it work with our point of sale?',
          answer: 'In most cases we connect to the point-of-sale and booking tools you already use, so visits and spend are recorded automatically. If something has no way to connect, we tell you before we start.',
        },
        {
          question: 'How does this make my business worth more?',
          answer: 'Buyers pay more for revenue that repeats. Turning one-time guests into regulars, and having the customer data to prove it, makes earnings more predictable. One coffee chain we worked with opened two new locations funded by the increase in per-store revenue.',
        },
      ],
    },
  },
];

export const industriesWithPages = () => INDUSTRY_LIST.filter((i) => i.page);
export const getIndustry = (slug: string) => INDUSTRY_LIST.find((i) => i.slug === slug);
