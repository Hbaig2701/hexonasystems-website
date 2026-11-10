// Launch article: OpenAI's "Businesses in ChatGPT" beta (Nov 10, 2026):
// Business Hub, Insights, Business Agents. Nov 10, 2026 check: openai.com (the
// announcement, product page, policies) and help.openai.com returned 403, and
// OpenAI's X posts 402, so OpenAI's wording is cited as quoted by Search Engine
// Roundtable (hands-on verification), Reuters, Digiday (interview with Benji
// Shomair, VP of monetization) and The Next Web. CellCog (a vendor) is used
// only for two direct OpenAI quotes. Not stated anywhere we could open: a list
// of eligible service categories, booking links, photos, Google Business
// Profile involvement. Said so in the text.
// Target: "claim your business on chatgpt", "chatgpt business hub",
// "businesses in chatgpt", "chatgpt business profile", "chatgpt business agent".

import type { Article } from '../types';

const article: Article = {
  slug: 'how-to-claim-your-business-on-chatgpt',
  category: 'guides',
  kind: 'Guide',
  title: 'How to claim your business on ChatGPT (Business Hub, step by step)',
  seoTitle: 'How to Claim Your Business on ChatGPT',
  description:
    'OpenAI launched Businesses in ChatGPT on Nov 10, 2026. How to claim and verify your business in Business Hub, what Insights show, and what local firms get.',
  datePublished: '2026-11-10',
  dateModified: '2026-11-10',
  lastChecked: '2026-11-10',
  cover: { style: 'button', text: 'Claim your business', caption: 'ChatGPT Business Hub, live Nov 10, 2026' },
  coverAlt: 'A large button reading "Claim your business" with a pointer on it, captioned "ChatGPT Business Hub, live Nov 10, 2026".',
  intro: [
    'To claim your business on ChatGPT, sign in at chatgpt.com/business-hub, find your business, and verify it with a call or text to your main business number or a DNS record on your website. OpenAI launched it on November 10, 2026 as a beta called Businesses in ChatGPT, it is free for now, and a claimed profile gets a blue check and an Insights report on how often ChatGPT mentions you.',
    'I would claim yours this week, before anyone else tries to. Below is what launched, how to verify, what you get as a local service business (and what you don’t yet), and the mistakes that will block you.',
  ],
  tldr: [
    'Launched Nov 10, 2026 in beta: Business Hub (claim and manage your profile), Insights (mentions, views and website clicks) and Business Agents (a chat assistant for your business).',
    'Verify by a call or text to your main business number, or a DNS record. Shopify stores can connect their store instead.',
    'Free for now. OpenAI says claiming does not guarantee higher placement, and it does not show you the prompts people typed.',
    'Business Agents start with US e-commerce and online service businesses. Local service businesses can claim a profile and see Insights, but the agent is not open to them yet.',
  ],
  sections: [
    {
      id: 'what-launched',
      heading: 'What did OpenAI launch?',
      paragraphs: [
        'On November 10, 2026 OpenAI introduced Businesses in ChatGPT in beta, describing it as “a new way to connect with the 1.2 billion people who use ChatGPT each week” and “a new way to provide information to ChatGPT”, as quoted by Search Engine Roundtable. It has three parts. Four days earlier it had only been spotted in testing, which we covered in /blog/chatgpt-business-hub.',
      ],
      table: {
        caption: 'Businesses in ChatGPT at launch, Nov 10, 2026. From OpenAI as quoted by Reuters, Digiday, Search Engine Roundtable and The Next Web.',
        columns: [
          { key: 'part', label: 'Part' },
          { key: 'what', label: 'What it does' },
          { key: 'who', label: 'Who can use it' },
        ],
        rows: [
          { part: 'Business Hub', what: 'Claim and verify your business, update key details, add product feeds; claimed profiles get a blue check', who: 'Eligible businesses with a website, where ChatGPT is available' },
          { part: 'Insights', what: 'Mentions, views and website clicks, plus common themes in conversations where your site is cited', who: 'Claimed businesses, once there is enough activity to report' },
          { part: 'Business Agents', what: 'A chat assistant built by OpenAI from your instructions that customers can choose to talk to inside ChatGPT', who: 'Eligible US e-commerce and online service businesses first' },
          { part: 'Sponsored agents', what: 'The same agent, promoted as the destination for ChatGPT ads and labelled as sponsored', who: 'Advertisers' },
        ],
      },
    },
    {
      id: 'how-to-claim',
      heading: 'How do I claim my business on ChatGPT?',
      steps: [
        { title: 'Sign in with an account the business keeps', detail: 'Go to chatgpt.com/business-hub. Use a ChatGPT account on a company email you will still control if an employee or agency leaves, not someone’s personal login.' },
        { title: 'Find your business', detail: 'Search for your business name. ChatGPT may already hold a profile built from information on the web; claiming it is how you take it over.' },
        { title: 'Verify ownership', detail: 'Choose a call or text to your main business number, or DNS verification, where your web person adds a record to your domain. Shopify merchants can connect their store instead. Search Engine Roundtable’s editor verified by DNS on launch day.' },
        { title: 'Check every detail it shows', detail: 'Business name, website, phone, hours, services and the area you cover. Make them match your website and Google Business Profile word for word, because ChatGPT will repeat what it holds.' },
        { title: 'Turn on what you’re eligible for', detail: 'Product feeds if you sell products. The Business Agent if you are a US online business and it is offered to you. Everyone else: check back, OpenAI says more categories and markets are coming.' },
        { title: 'Come back for Insights', detail: 'OpenAI only shows numbers once there is enough activity to report, so an empty dashboard in week one is normal. Check monthly.' },
      ],
      callout:
        'Verification by phone means someone, or something, has to answer your main number. If that line goes to a voicemail nobody checks, use the text option or DNS, and then fix the voicemail problem anyway: it is costing you jobs too (/ai-employees/ai-receptionist).',
    },
    {
      id: 'eligibility',
      heading: 'Can a local service business claim a ChatGPT profile?',
      paragraphs: [
        'Partly, and it is worth doing now. OpenAI says eligibility “depends on factors including industry, location, and our verification and integrity checks” and that “not every business can create or claim a profile”, as quoted from its product and policy pages. Its Insights already define a mention for local businesses (when ChatGPT shows a result for that location), according to an OpenAI spokesperson speaking to Digiday, so local businesses are clearly in scope for profiles and Insights.',
        'The Business Agent is a different story. Reuters reports it is rolling out first to eligible e-commerce and online service businesses in the US. A plumber, HVAC company, med spa or property manager should expect a profile and Insights now and an agent later. OpenAI has not published a list of eligible categories, so the only way to know for your business is to try claiming it.',
      ],
    },
    {
      id: 'insights',
      heading: 'What do ChatGPT Insights show?',
      bullets: [
        '**Mentions.** For a local business, a mention is counted when ChatGPT shows a result for your location. For an online business, when ChatGPT references your website. Just naming your brand doesn’t count, per OpenAI via Digiday.',
        '**Views and website clicks.** Clicks are clicks, not completed visits or purchases.',
        '**Discovery topics.** Common themes across conversations where your website is cited, which tells you what people were asking about when ChatGPT pointed them to you.',
        '**What you don’t get.** The actual prompts or chats, and any share of voice against competitors. OpenAI says it does not share users’ conversations or Business Agent chats with businesses.',
        '**Thresholds.** Numbers appear only above certain activity levels, and low counts may be withheld for privacy.',
      ],
    },
    {
      id: 'ranking',
      heading: 'Will claiming my business make ChatGPT recommend it more?',
      paragraphs: [
        'Not directly. OpenAI’s line is that claiming does not guarantee higher placement or sales, and Benji Shomair, OpenAI’s VP of monetization, told Digiday that taking part “should not have an impact on how frequently it appears”, because the core product has to “maintain objectivity”. He did say the information can help ChatGPT surface a business in more relevant conversations.',
        'That matches what I would expect. Claiming fixes accuracy: right hours, right number, right services. Being recommended still comes from what ChatGPT can read about you on the open web, your own site, consistent listings and reviews that name the job. The full checklist for that is in /blog/how-to-get-recommended-by-chatgpt.',
      ],
    },
    {
      id: 'agents',
      heading: 'What can a ChatGPT Business Agent do?',
      paragraphs: [
        'A customer who finds a business in ChatGPT can choose to start a conversation with it, for example to compare two options. OpenAI builds the agent from the business’s instructions and product information; Shomair told Digiday “we aren’t allowing folks to bring their own agents”. For now buyers are sent to the business’s own website to finish, according to The Next Web.',
        'The rules are strict, and sensible: the agent has to say it is AI representing the business, keep prices accurate and avoid pressure tactics, and purchases or sharing personal information need the customer’s explicit approval. The chat is labelled and kept separate from ChatGPT’s own answers.',
        'For service businesses the useful part is what comes after the chat. An agent that answers a question and sends the customer to a website that nobody answers until Monday has not booked a job. Whatever channel the lead comes from, the business that replies and books first usually wins it (/blog/speed-to-lead).',
      ],
    },
    {
      id: 'risks',
      heading: 'Is there any risk in not claiming it?',
      paragraphs: [
        'Two. First, accuracy: ChatGPT may already show a profile built from other sources, and OpenAI does not verify every detail, so wrong hours or an old phone number can sit there until you claim it. Second, someone else trying first. Search Engine Roundtable’s editor wrote on launch day that he is “honestly nervous about people hijacking businesses on here”. Verification by your phone number or domain makes that hard, but the simplest protection is to be the verified owner already.',
        'It costs nothing for now (Shomair called it “free for now” and did not rule out paid options later), and it takes about fifteen minutes. There is no good reason to wait.',
      ],
    },
  ],
  faq: [
    {
      question: 'How do I claim my business on ChatGPT?',
      answer:
        'Sign in at chatgpt.com/business-hub, search for your business, and verify ownership with a call or text to your main business number or a DNS record on your website. Shopify merchants can connect their store. Once verified, your profile gets a blue check and you can update its details.',
    },
    {
      question: 'Is ChatGPT Business Hub free?',
      answer:
        'Yes, for now. OpenAI’s VP of monetization told Digiday on November 10, 2026 that Business Hub and Business Agents are free for now, and did not rule out paid options later. Sponsored agents in ChatGPT ads are paid.',
    },
    {
      question: 'Can local service businesses use Businesses in ChatGPT?',
      answer:
        'They can claim a profile and get Insights where they are eligible; OpenAI defines a mention for local businesses as ChatGPT showing a result for that location. Business Agents are rolling out first to US e-commerce and online service businesses, so most local service businesses will not have an agent yet.',
    },
    {
      question: 'Does claiming my business help it rank higher in ChatGPT?',
      answer:
        'No. OpenAI says claiming does not guarantee higher placement or sales, and that taking part should not change how often a business appears. It keeps your information accurate, which can help ChatGPT match you to the right conversations.',
    },
    {
      question: 'Can I see what people asked ChatGPT about my business?',
      answer:
        'No. Insights show mentions, views, website clicks and common discovery themes, but not individual prompts or chats, and not how you compare with competitors. OpenAI says it does not share users’ conversations or Business Agent chats with businesses.',
    },
    {
      question: 'Do I need a Shopify store to claim my business on ChatGPT?',
      answer:
        'No. Shopify merchants can verify by connecting their store, but other businesses can verify with a call or text to their main business number or with DNS verification on their website domain.',
    },
    {
      question: 'Why is my ChatGPT Insights dashboard empty?',
      answer:
        'Insights only show numbers when there is enough activity above OpenAI’s thresholds, and low counts may be withheld for privacy. A new or small business may see nothing at first. Check again monthly.',
    },
    {
      question: 'What is a ChatGPT Business Agent?',
      answer:
        'A chat assistant OpenAI builds from a business’s instructions and product information, which ChatGPT users can choose to talk to. It must say it is AI, keep prices accurate and get the customer’s approval before purchases or sharing personal data. It launched first for eligible US e-commerce and online service businesses.',
    },
  ],
  sources: [
    {
      label: 'OpenAI, Introducing businesses in ChatGPT',
      url: 'https://openai.com/index/introducing-businesses-chatgpt/',
      note: 'The Nov 10, 2026 announcement. openai.com returned 403 to us; OpenAI’s wording is cited as quoted by the sources below.',
    },
    {
      label: 'Search Engine Roundtable, ChatGPT Business Hub',
      url: 'https://www.seroundtable.com/chatgpt-business-hub-42505.html',
      note: 'Nov 10, 2026: OpenAI’s announcement quotes, the 1.2 billion weekly users line, chatgpt.com/business-hub, verification by call, text or DNS from the author’s own walkthrough, discovery topics. Read Nov 10, 2026.',
    },
    {
      label: 'Reuters, OpenAI lets businesses claim ChatGPT profiles, adds AI agents for US e-commerce firms',
      url: 'https://www.investing.com/news/stock-market-news/openai-lets-businesses-claim-chatgpt-profiles-adds-ai-agents-for-us-ecommerce-firms-5016475',
      note: 'Nov 10, 2026: Business Hub, product feeds, mentions, views and clicks, thresholds, agents for US e-commerce and online services first, Shopify, sponsored agents, no sharing of chats. Read Nov 10, 2026.',
    },
    {
      label: 'Digiday, OpenAI’s new business agents give brands a free way into the conversation',
      url: 'https://digiday.com/marketing/openais-new-business-agents-give-brands-a-free-way-into-the-conversation-its-also-selling-as-an-ad/',
      note: 'Nov 10, 2026 interview with Benji Shomair, VP of monetization: free for now, no ranking effect, no bring-your-own agents, mention and click definitions, no prompts or share of voice. Read Nov 10, 2026.',
    },
    {
      label: 'The Next Web, OpenAI launches Businesses in ChatGPT',
      url: 'https://thenextweb.com/news/openai-businesses-in-chatgpt-business-agents',
      note: 'Nov 10, 2026: blue check, agent rules (say it is AI, accurate prices, no pressure tactics, approval for purchases and personal data), checkout on the brand’s site. Read Nov 10, 2026.',
    },
    {
      label: 'CellCog, Businesses in ChatGPT',
      url: 'https://cellcog.ai/blog/businesses-in-chatgpt/',
      note: 'Nov 10, 2026, a vendor in this space. Used only for its direct quotes of OpenAI’s product and policy pages on eligibility and placement. Read Nov 10, 2026.',
    },
  ],
  related: ['chatgpt-business-hub', 'how-to-get-recommended-by-chatgpt', 'google-ai-mode-home-services-booking-links'],
  cta: {
    title: 'Want help getting ranked on ChatGPT?',
    text: 'Book a free consult and we will help you claim your ChatGPT profile, get your business ranked in ChatGPT and Google AI Mode, and make sure every enquiry they send gets answered and booked, day or night.',
  },
  queries: ['claim your business on chatgpt', 'chatgpt business hub', 'businesses in chatgpt', 'chatgpt business profile', 'chatgpt business agent', 'chatgpt insights for business'],
};

export default article;
