// Target: "what is an ai agent" (22,200/mo US, DataforSEO Nov 6, 2026), "ai agent
// examples" (1,600), "ai agents for small business" (210), "what is an ai employee".
// Definitions from Anthropic's "Building effective agents" (Dec 19, 2024) and
// OpenAI's "A practical guide to building agents" (2025). Business examples are
// Hexona's own case studies in content/evidence.ts, quoted as published.

import type { Article } from '../types';

const article: Article = {
  slug: 'what-is-an-ai-agent',
  category: 'guides',
  kind: 'Guide',
  title: 'What is an AI agent? A plain-English guide for service business owners',
  seoTitle: 'What Is an AI Agent? A Plain-English Guide',
  description:
    'An AI agent is software that takes a goal, decides the steps and uses your tools to finish the job. What that means for a service business, with real examples.',
  datePublished: '2026-11-06',
  dateModified: '2026-11-06',
  lastChecked: '2026-11-06',
  cover: {
    style: 'chat',
    messages: [
      { from: 'them', text: 'Can someone look at my AC today?' },
      { from: 'ai', text: 'I have 2:30 open. Booked you in and texted the tech your address.' },
    ],
  },
  coverAlt: 'A text exchange where a customer asks for an AC repair and an AI agent books a 2:30 visit and texts the technician.',
  intro: [
    'An AI agent is software that is given a goal, decides the steps to reach it, and uses your tools (phone, calendar, CRM, inbox) to finish the job without someone telling it each move. A chatbot answers a question; an agent answers the question, books the appointment, updates the customer record and sends the confirmation.',
    'That difference is the whole point for a service business. Most of the money a plumber, a med spa or a property manager loses goes missing between steps: the call nobody returned, the estimate nobody chased, the invoice nobody followed up. Agents are good at exactly that kind of step-to-step work.',
    'I have been building automation for businesses since 2021, before anyone called it agents. Below is what the word actually means, what agents can and can’t do today, and how to tell a real one from a chatbot with a new label.',
  ],
  tldr: [
    'An AI agent takes a goal, chooses its own steps and uses real tools to complete the task. A chatbot only talks.',
    'In a service business, agents answer calls, book jobs, follow up leads and estimates, chase invoices and ask for reviews.',
    'The useful ones are narrow: one job, clear rules, a person to hand off to. "Do everything" agents still break.',
    'Before you buy one, ask what systems it can write to, what it does when it is unsure, and what numbers it reports.',
  ],
  sections: [
    {
      id: 'definition',
      heading: 'What is an AI agent, in plain English?',
      paragraphs: [
        'Think of the difference between a receptionist who can only read from a script and one who can actually open the calendar and book you in. The second one is an agent.',
        'The AI companies draw the line the same way. Anthropic, which makes Claude, separates **workflows**, where the steps are fixed in advance by a developer, from **agents**, where the AI models "dynamically direct their own processes and tool usage". OpenAI describes agents as systems that "independently accomplish tasks on your behalf". Both definitions come down to three parts:',
      ],
      bullets: [
        '**A goal.** "Book this caller into the next available slot", not "reply to this message".',
        '**Tools.** Access to the systems where the work happens: your phone line, calendar, CRM, field-service software, payment links.',
        '**Judgement inside limits.** It decides the next step from what just happened (the caller wants Tuesday, Tuesday is full, offer Wednesday), within rules you set.',
      ],
      figure: {
        kind: 'steps',
        caption: 'how an agent handles one inbound call',
        items: ['Call comes in', 'Asks what is needed', 'Checks the calendar', 'Books the job', 'Updates the CRM', 'Texts confirmation'],
      },
    },
    {
      id: 'vs-chatbot',
      heading: 'AI agent vs chatbot vs automation: what is the difference?',
      paragraphs: [
        'These three get used as if they mean the same thing. They don’t, and the difference decides what you are paying for.',
      ],
      table: {
        caption: 'Chatbot, automation and AI agent compared, by what each can actually do in a service business.',
        columns: [
          { key: 'what', label: '' },
          { key: 'chatbot', label: 'Chatbot' },
          { key: 'automation', label: 'Classic automation' },
          { key: 'agent', label: 'AI agent' },
        ],
        rows: [
          { what: 'Understands a messy question', chatbot: 'Yes', automation: 'No', agent: 'Yes' },
          { what: 'Takes action in your systems', chatbot: 'Rarely', automation: 'Yes, fixed steps only', agent: 'Yes, chooses the steps' },
          { what: 'Handles the unexpected', chatbot: 'Talks around it', automation: 'Breaks or stops', agent: 'Adapts, or hands off to a person' },
          { what: 'Example', chatbot: 'Website widget that answers FAQs', automation: '"If form submitted, send email 1"', agent: 'Answers a call, books the job, texts the tech' },
        ],
      },
      callout:
        'Rule of thumb: if it can’t change anything in your calendar, CRM or inbox, it is a chatbot, whatever the sales page calls it.',
    },
    {
      id: 'examples',
      heading: 'What do AI agents actually do in a service business?',
      paragraphs: [
        'The agents that work today each do one job. These are the ones we build most, and the numbers are from our own clients, measured in their systems.',
      ],
      bullets: [
        '**Answering calls and texts.** A tire shop was sending more than 600 calls a month to voicemail. A missed-call assistant that texted back within seconds and booked appointments recovered over $50,000 and lifted booked appointments 50% (/evidence/tire-shop-missed-calls).',
        '**Following up leads and old estimates.** A solar installer had more than 4,000 homeowners who had shown interest and never bought, and nobody had gone back to them. Re-engaging them produced $24,500 in net profit (/evidence/solar-dormant-database). More examples like this are in /blog/ai-agent-examples.',
        '**Moving paperwork.** A renovation contractor automated forms, signatures and approvals and cut project delays 41%, with estimates approved 44% faster (/evidence/construction-project-pipeline).',
        '**Bringing customers back.** A multi-location coffee chain lifted retention from 27% to 68% with automated, personalised win-backs (/evidence/coffee-loyalty-programme).',
      ],
    },
    {
      id: 'ai-employee',
      heading: 'Is an AI employee the same thing as an AI agent?',
      paragraphs: [
        'Mostly, yes. "AI employee" is the business name for an agent with one job description: a receptionist, a dispatcher, a collections clerk. We use the term because owners hire for roles, not for technology.',
        'The useful way to think about it is the same as hiring. A good AI employee has a clear job, access to the tools for that job, rules about what it is allowed to decide, and someone it reports to. You can see the roles we build at /ai-employees, starting with /ai-employees/ai-receptionist.',
      ],
    },
    {
      id: 'limits',
      heading: 'What can’t AI agents do yet?',
      paragraphs: [
        'Plenty, and anyone who says otherwise is selling. As of November 2026, these are the limits we design around:',
      ],
      bullets: [
        '**Judgement calls with real money on the line.** Pricing a complicated job, approving a refund, deciding whether a leak is an emergency. Agents collect the details and hand these to a person.',
        '**Systems with no way in.** If your software has no integration or API, the agent can’t write to it. Some older field-service and practice-management tools are like this.',
        '**Vague jobs.** "Handle my marketing" fails. "Text every unpaid invoice on day 3, 7 and 14 and stop when it is paid" works.',
        '**Running without supervision on day one.** Every agent we launch is tested on real calls and reviewed weekly at first. They get better because someone reads the conversations.',
      ],
    },
    {
      id: 'before-you-buy',
      heading: 'How do you tell a real AI agent from a chatbot with a new label?',
      paragraphs: ['Ask these before you pay anyone, including us:'],
      steps: [
        { title: 'What can it write to?', detail: 'Name the systems. "It connects to your calendar and CRM" should come with the names of yours.' },
        { title: 'What happens when it is unsure?', detail: 'A good agent hands off to a person with a summary. A bad one guesses or loops.' },
        { title: 'Who watches it?', detail: 'Someone should review conversations and fix mistakes, especially in the first month.' },
        { title: 'What does it report?', detail: 'Calls answered, jobs booked, invoices collected. If the only metric is "conversations", be careful.' },
        { title: 'Who owns the data and the setup?', detail: 'If you leave, your contacts, recordings and workflows should stay with your business.' },
      ],
    },
    {
      id: 'value',
      heading: 'Why does this matter for what your business is worth?',
      paragraphs: [
        'Buyers pay more for a business that runs on systems instead of on its owner. An agent that answers every call, follows up every estimate and chases every invoice turns work that lives in someone’s head into something a new owner can take over on day one.',
        'That is the filter we use at Hexona: we only build agents that capture revenue you are losing, cut the cost of delivering the work, or make the business depend less on you. If you want to see where yours stands, /book.',
      ],
    },
  ],
  faq: [
    {
      question: 'What is an AI agent in simple terms?',
      answer:
        'An AI agent is software that is given a goal and finishes it by choosing its own steps and using your tools, such as your phone, calendar and CRM. A chatbot only replies; an agent replies and then does the work, like booking the appointment.',
    },
    {
      question: 'What is the difference between an AI agent and a chatbot?',
      answer:
        'A chatbot answers questions. An AI agent can also take action in your systems: book a job, update a customer record, send a payment link. If it can’t change anything in your calendar, CRM or inbox, it is a chatbot.',
    },
    {
      question: 'What are examples of AI agents for a small service business?',
      answer:
        'The common ones are an AI receptionist that answers calls and books jobs, a follow-up agent that texts new leads and old estimates, a dispatcher that schedules crews, a collections agent that chases unpaid invoices, and a retention agent that asks for reviews and wins back past customers.',
    },
    {
      question: 'Do AI agents replace employees?',
      answer:
        'In service businesses they mostly take work off people rather than replace them: the after-hours calls, the follow-up texts, the paperwork chasing. One renovation contractor we worked with scaled to 27 or more active projects without adding admin staff.',
    },
    {
      question: 'Are AI agents safe to give access to my business systems?',
      answer:
        'They are as safe as the limits you set. Give an agent access only to the systems its job needs, define what it may decide on its own, require a hand-off to a person for anything involving refunds, pricing or emergencies, and review its conversations regularly.',
    },
    {
      question: 'How much does an AI agent cost for a small business?',
      answer:
        'It depends on the job and on whether you set it up yourself or have it built and run for you. Usage costs such as phone minutes and texts are usually small next to the setup and management. We give a fixed scope and price after a free consult.',
    },
  ],
  sources: [
    {
      label: 'Anthropic, Building effective agents',
      url: 'https://www.anthropic.com/engineering/building-effective-agents',
      note: 'Definition of workflows vs agents, published Dec 19, 2024. Read Nov 6, 2026.',
    },
    {
      label: 'OpenAI, A practical guide to building agents',
      url: 'https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf',
      note: 'Definition: "Agents are systems that independently accomplish tasks on your behalf." Read Nov 6, 2026.',
    },
    {
      label: 'Hexona case studies',
      url: 'https://www.hexonasystems.com/evidence',
      note: 'Client figures quoted exactly as published, measured in each client’s own systems. Read Nov 6, 2026.',
    },
  ],
  related: ['ai-agent-examples', 'ai-receptionist-cost', 'how-to-make-your-business-run-without-you'],
  queries: ['what is an ai agent', 'ai agent examples', 'ai agents for small business', 'what is an ai employee', 'ai agent vs chatbot'],
};

export default article;
