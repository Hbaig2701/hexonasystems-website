// Target: "missed call text back" (390/mo US, DataforSEO Nov 6, 2026), "how to stop
// missing calls", "missed calls small business". Owner-facing rewrite of Hamza's
// GoHighLevel tutorial (hamzaautomates.com/gohighlevel/tutorials/missed-call-text-back,
// Oct 31, 2026), which has the HighLevel menu paths and per-text rates. Tire shop
// figures quoted exactly from content/evidence.ts (tire-shop-missed-calls).

import type { Article } from '../types';

const article: Article = {
  slug: 'missed-call-text-back',
  category: 'playbooks',
  kind: 'Playbook',
  title: 'Missed call text back: how it works and what to send',
  seoTitle: 'Missed Call Text Back: How It Works',
  description:
    'Missed call text back sends an automatic text when you can’t pick up, so the caller talks to you instead of the next business. Setup, rules and templates.',
  datePublished: '2026-11-06',
  dateModified: '2026-11-06',
  lastChecked: '2026-11-06',
  cover: {
    style: 'chat',
    messages: [
      { from: 'ai', text: 'Sorry we missed you, we\'re out on a job. Repair or a quote?' },
      { from: 'them', text: 'Repair. Water heater is leaking.' },
      { from: 'ai', text: 'Got it. I can get someone there at 3. Does that work?' },
    ],
  },
  coverAlt:
    'A text exchange where a business texts a missed caller back, the caller says their water heater is leaking, and the business offers a 3 o’clock visit.',
  intro: [
    'Missed call text back is an automatic text that goes to anyone whose call you didn’t answer, usually within a minute, asking what they need. It keeps the caller talking to you instead of dialing the next business on Google, and for most service businesses it is the cheapest fix there is for lost calls.',
    'It is the first leak I point out to any local business. The owner is on a roof, under a sink or with a client, the phone rings out, and the caller has already moved on by the time anyone checks voicemail. Below is how it works, what you need to switch it on legally, the texts we actually send, and when it is time to move up to an AI that answers the call itself.',
  ],
  tldr: [
    'When a call isn’t answered, busy or goes to voicemail, a text goes out about a minute later asking what the caller needs.',
    'In the US you need your texting number registered for A2P 10DLC before you send business texts from a local number.',
    'Short, plain texts work best: who you are, sorry we missed you, what do you need. One message, no links, no emojis.',
    'The text gets the reply. Someone (or an AI) has to answer that reply fast, or you lose them anyway.',
    'If you miss more than a handful of calls a day, an AI that answers the call live is usually the better fix.',
  ],
  sections: [
    {
      id: 'how-it-works',
      heading: 'How does missed call text back work?',
      paragraphs: [
        'Your calls ring through a phone system that knows when a call wasn’t picked up. When it sees a missed call (no answer, busy, or sent to voicemail), it waits a short moment and sends a text from your business number to the caller.',
        'The good versions do a little more: a different message after hours, a tag on the contact so you can see it in your CRM, an alert to the owner or front desk, and a note so the same person doesn’t get three texts for three calls in a row.',
      ],
      figure: {
        kind: 'steps',
        caption: 'what happens in the first two minutes after a missed call',
        items: ['Call rings out', 'System logs it as missed', 'Waits about a minute', 'Sends the text', 'Alerts your team', 'Reply gets answered'],
      },
    },
    {
      id: 'why-it-matters',
      heading: 'How much do missed calls actually cost a small business?',
      paragraphs: [
        'You can work it out from your own call log in ten minutes. Count the missed calls from numbers that aren’t already customers, multiply by how often a new caller turns into a job, then by what a job is worth.',
        'That is exactly the math one of our clients, a busy tire shop in Toronto, did on its own logs: 270 first-time missed callers a month, a $500 average customer value and a 30% close rate, which came to $40,000 to $50,000 a month walking out the door. There was no full-time receptionist and the owner was working in the shop, so in winter tire season, the busiest time of year, nobody was sitting by the phone.',
        'The core of what we built was a missed call text back that replied within seconds and kept the conversation going toward a booking, alongside Facebook and Instagram chat, tagging of leads that needed a person, and a booking link with reminders. Once it went live, 40% of missed leads re-engaged, booked appointments went up 50% and over $50,000 in revenue was recovered. Those results are for the whole build, not the text alone. The full write-up, including how it was measured, is in /evidence/tire-shop-missed-calls.',
      ],
      figure: {
        kind: 'stats',
        caption: 'the tire shop’s own numbers, before and after',
        items: [
          { value: '600+', label: 'missed calls a month before the build' },
          { value: '$50,000+', label: 'revenue recovered' },
          { value: '50%', label: 'more booked appointments' },
        ],
      },
    },
    {
      id: 'a2p',
      heading: 'Do you need A2P 10DLC registration to text back missed calls?',
      paragraphs: [
        'Yes, if you text US customers from a normal 10 digit local number, which is what nearly every missed call setup does. US carriers require business texting on local numbers to be registered through The Campaign Registry, which verifies brands and campaigns before they are allowed to send. You don’t register with it directly; your phone provider submits it for you. Unregistered business texts get filtered or blocked.',
        'Registration has two parts. The **brand** is your business, with its legal name and tax ID exactly as on file. The **campaign** is what you send and how people agree to get it, with sample messages. Put your missed call text in as a sample. Have a live website with a privacy policy before you start, because reviewers check it.',
        'Toll-free numbers go through a separate toll-free verification instead. Either way, plan for a few days to a couple of weeks before texts flow reliably, and don’t switch the automation on until registration is approved. The full process is in /blog/a2p-10dlc-explained.',
      ],
      callout:
        'This is general information, not legal advice. Texting rules change, so check your phone provider’s current requirements before you go live.',
    },
    {
      id: 'templates',
      heading: 'What should a missed call text say? Templates to copy',
      paragraphs: [
        'These are examples. Change the wording to sound like your business, keep each one under 160 characters so it sends as a single text, and skip emojis (one emoji cuts the limit to 70 characters).',
      ],
      table: {
        caption: 'Example missed call text back messages by situation. Swap in your business name.',
        columns: [
          { key: 'when', label: 'Situation' },
          { key: 'text', label: 'Example text' },
        ],
        rows: [
          { when: 'During business hours', text: 'Hi, it\'s [Business]. Sorry we missed your call, we\'re with a customer. What can we help with? Reply here and we\'ll get right back to you.' },
          { when: 'After hours', text: 'Hi, it\'s [Business]. We\'re closed but we saw your call. What do you need? Reply here and we\'ll text you first thing in the morning.' },
          { when: 'Trades, on a job site', text: 'Hi from [Business], sorry we missed you, we\'re out on a job. Is this for a repair or a quote? Reply here and we\'ll get you booked.' },
          { when: 'Med spa or clinic', text: 'Hi, it\'s [Business]. Sorry we couldn\'t pick up, we\'re with a client. Are you looking to book, or do you have a question? Just reply here.' },
          { when: 'Property management', text: 'Hi, this is [Company]. We missed your call. Is this about a current unit or a vacancy? If it\'s an emergency like a leak, reply EMERGENCY.' },
          { when: 'Second call in a few minutes', text: 'Saw you tried us again. Still tied up for a few minutes. Text what you need and we\'ll sort it out.' },
        ],
      },
      callout:
        'Wait about a minute before the text goes out. An instant reply reads like a robot; a minute later reads like someone saw the call and grabbed their phone.',
    },
    {
      id: 'setup',
      heading: 'How do you set up missed call text back?',
      steps: [
        { title: 'Get a number that can text', detail: 'Your calls need to ring through a phone system that can also send texts, so it can see when a call is missed. You can usually keep your existing number by forwarding it.' },
        { title: 'Register for A2P 10DLC', detail: 'Brand plus campaign, with the missed call message as a sample. Wait for approval before sending.' },
        { title: 'Set when a call counts as missed', detail: 'HighLevel recommends a ring time of 10 to 20 seconds. Too short and your staff never get a chance to pick up.' },
        { title: 'Write two messages', detail: 'One for business hours, one for after hours. Use the templates above as a start.' },
        { title: 'Stop repeat texts', detail: 'Add a rule so the same caller doesn’t get a new text every time they redial within a few minutes.' },
        { title: 'Decide who answers the reply', detail: 'Alert the owner or front desk, or hand the conversation to an AI that can answer questions and book. This is the step most setups skip.' },
        { title: 'Test it', detail: 'Call from a phone that isn’t on the account, let it ring out, and check the text arrives and the alert fires. Then test after hours.' },
      ],
      paragraphs: [
        'If you use GoHighLevel, Hamza’s step-by-step build with the exact menu paths and current per-text rates is at https://hamzaautomates.com/gohighlevel/tutorials/missed-call-text-back.',
      ],
    },
    {
      id: 'cost',
      heading: 'How much does it cost to run?',
      paragraphs: [
        'The texts themselves cost pennies. On HighLevel’s phone system, as of Oct 31, 2026, a US or Canadian text was $0.00747 per segment plus a carrier fee of $0.0035 to $0.005, so 100 missed call texts a month comes to roughly $1.10 to $1.25 before replies. A2P registration adds a one-time fee ($22.50 for HighLevel’s low volume and sole proprietor options) and a monthly campaign fee.',
        'The real cost is the time it takes someone to answer the replies. That is what decides whether you should text back at all or have the call answered.',
      ],
    },
    {
      id: 'when-to-upgrade',
      heading: 'When should you switch to an AI that answers the call?',
      paragraphs: [
        'A text back is a patch. It works when you miss a few calls a day and someone can reply within minutes. It stops working when the volume grows, when callers have emergencies, or when the replies sit unread until the evening.',
        'At that point, have the call answered live. An AI receptionist picks up, asks what the caller needs, books the job into your calendar and hands real emergencies to a person. We build and run those, and you can see what ours does at /ai-employees/ai-receptionist. If you are in the trades, /industries/home-services covers the setup for plumbing and HVAC.',
      ],
      table: {
        caption: 'Text back vs an AI that answers the call, for a service business.',
        columns: [
          { key: 'what', label: '' },
          { key: 'text', label: 'Missed call text back' },
          { key: 'voice', label: 'AI that answers the call' },
        ],
        rows: [
          { what: 'Best for', text: 'A few missed calls a day', voice: 'Busy lines, after hours, emergencies' },
          { what: 'Caller experience', text: 'Gets a text, has to reply', voice: 'Talks to someone right away' },
          { what: 'Books the job', text: 'Only if someone answers the reply', voice: 'Yes, during the call' },
          { what: 'Running cost', text: 'Pennies per text', voice: 'Per minute of talk time, plus setup' },
        ],
      },
    },
  ],
  faq: [
    {
      question: 'What is missed call text back?',
      answer:
        'Missed call text back is an automation that sends a text to anyone whose call you didn’t answer, usually within a minute. It asks what they need so the conversation continues by text instead of the caller trying another business.',
    },
    {
      question: 'Is missed call text back legal?',
      answer:
        'Generally yes, because you are replying to someone who just called you. In the US the number sending the text must be registered for A2P 10DLC, and you must honor anyone who replies STOP. This is general information, not legal advice.',
    },
    {
      question: 'Does missed call text back work after hours?',
      answer:
        'Yes, and that is where it earns its keep. Set a separate after-hours message that says you are closed and when you will reply, or hand the reply to an AI that can book the appointment at night.',
    },
    {
      question: 'Can I keep my business phone number?',
      answer:
        'Usually yes. Most setups forward your existing number to a phone system that can detect missed calls and send texts, so customers keep calling the number they already know.',
    },
    {
      question: 'How fast should the text go out?',
      answer:
        'About a minute after the missed call. Instant replies read as automated, and waiting longer than a few minutes gives the caller time to call a competitor.',
    },
    {
      question: 'Is a missed call text better than voicemail?',
      answer:
        'For most callers, yes. Many people hang up instead of leaving a voicemail, and a text gives them an easy way to tell you what they need without calling again.',
    },
  ],
  sources: [
    {
      label: 'Hexona case study: tire shop missed calls',
      url: 'https://www.hexonasystems.com/evidence/tire-shop-missed-calls',
      note: 'Missed call volume, the shop’s own leak calculation and recovered revenue, quoted as published. Checked Nov 6, 2026.',
    },
    {
      label: 'Hamza Baig, Missed call text back in GoHighLevel',
      url: 'https://hamzaautomates.com/gohighlevel/tutorials/missed-call-text-back',
      note: 'Setup steps, ring timeout, message templates, HighLevel per-text rates and A2P fees as checked Oct 31, 2026. Read Nov 6, 2026.',
    },
    {
      label: 'The Campaign Registry',
      url: 'https://www.campaignregistry.com/',
      note: 'The registry that verifies A2P 10DLC brands and campaigns; brands register through their messaging provider, not directly. Read Nov 6, 2026.',
    },
  ],
  related: ['speed-to-lead', 'after-hours-answering-service', 'a2p-10dlc-explained'],
  queries: ['missed call text back', 'how to stop missing calls', 'missed calls small business', 'missed call text back templates'],
};

export default article;
