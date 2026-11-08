// Fast take on the reported ChatGPT "Business Hub" / "Claim your business" tool
// (Search Engine Roundtable, Nov 6, 2026, from Juozas Kaziukėnas's LinkedIn
// post). Nov 8, 2026 check: OpenAI has not commented; openai.com, help.openai.com,
// ads.openai.com and Search Engine Land returned 403, so OpenAI's own ad and
// usage posts are cited through Reuters and Search Engine Journal. Opened:
// SER, the LinkedIn post (screenshot not visible logged out), OpenAI's crawler
// docs, chatgpt.com/merchants, SER on Sponsored Agents, Angi's Sep 16 release,
// Reuters via The Star, SEJ on Ads Manager, The Keyword on 900M weekly users.
// Target: "chatgpt business hub", "claim your business on chatgpt",
// "chatgpt business profile", "how to get my business on chatgpt".

import type { Article } from '../types';

const article: Article = {
  slug: 'chatgpt-business-hub',
  category: 'news',
  kind: 'Analysis',
  title: 'ChatGPT is building a “claim your business” hub. What should a service business do now?',
  seoTitle: 'ChatGPT Business Hub: What Owners Should Do',
  description:
    'OpenAI is reportedly building a ChatGPT Business Hub to claim your business and track mentions. What is confirmed, and what service owners can do now.',
  datePublished: '2026-11-08',
  dateModified: '2026-11-08',
  lastChecked: '2026-11-08',
  cover: { style: 'button', text: 'Claim your business', caption: 'Spotted inside ChatGPT, Nov 2026' },
  coverAlt: 'A large button reading "Claim your business" with a pointer on it, captioned "Spotted inside ChatGPT, Nov 2026".',
  intro: [
    'OpenAI is reportedly building a Business Hub inside ChatGPT where a business can claim its listing, keep its details up to date and see how often ChatGPT mentions it, with daily counts of appearances and clicks to its website. It was spotted by e-commerce analyst Juozas Kaziukėnas and reported by Search Engine Roundtable on November 6, 2026. OpenAI has not announced it, and the only verification method reported so far is connecting a Shopify store.',
    'So there is nothing to sign up for yet. There is still plenty a contractor, clinic or property manager can do this week to be the business ChatGPT names when someone asks for one. Here is what is confirmed, what is not, and what I would do.',
  ],
  tldr: [
    'Reported, not announced: a ChatGPT Business Hub to claim your business, update its info, and see daily mentions and clicks. OpenAI has not commented.',
    'The only reported way to verify ownership is connecting a Shopify store. Nothing has been said about service businesses without one.',
    'Confirmed today: ChatGPT search uses OpenAI’s OAI-SearchBot crawler, and a site that blocks it will not be shown in ChatGPT search answers.',
    'ChatGPT ads are self-serve for US advertisers, and Angi is piloting paid “sponsored agents” for home services. Paying is already an option. Earning the free mention is the part to work on.',
  ],
  sections: [
    {
      id: 'what-was-spotted',
      heading: 'What exactly was spotted?',
      paragraphs: [
        'Juozas Kaziukėnas, who tracks e-commerce platforms, posted on LinkedIn that ChatGPT is building an analytics tool to “track how often your business is mentioned in ChatGPT conversations”. By his description it counts two things, the number of times a business appeared in ChatGPT responses and the number of clicks on links to its website, tracked daily and shown as a chart. He says it is “part of a larger Business Hub feature”, that he saw its first steps as early as August, and that a banner he saw suggests it is getting close to launch.',
        'Search Engine Roundtable’s report lists three things the hub would let a business do: see how it shows up, add its latest products and keep its business info current, and let a “business agent” answer customer questions “with context you control”. Kaziukėnas also says what it will not show: the prompts people typed, any user data, or how you compare with competitors.',
      ],
      table: {
        caption: 'The reported ChatGPT Business Hub, as described by Juozas Kaziukėnas and Search Engine Roundtable on Nov 6, 2026. Not confirmed by OpenAI.',
        columns: [
          { key: 'feature', label: 'Reported feature' },
          { key: 'detail', label: 'What it would do' },
          { key: 'status', label: 'Status' },
        ],
        rows: [
          { feature: 'Claim your business', detail: 'Verify you own the business. Only reported method: connecting a Shopify store', status: 'Reported, unconfirmed' },
          { feature: 'Mentions and clicks', detail: 'Daily count of appearances in ChatGPT answers and clicks to your site', status: 'Reported, in testing since August' },
          { feature: 'Business info and products', detail: 'Add products and keep business details up to date', status: 'Reported, unconfirmed' },
          { feature: 'Business agent', detail: 'An agent that answers customer questions with context you control', status: 'Reported, unconfirmed' },
          { feature: 'Prompts and competitors', detail: 'Not included: no prompt data, user data or rankings', status: 'Reported' },
        ],
      },
    },
    {
      id: 'confirmed',
      heading: 'Has OpenAI confirmed it?',
      paragraphs: [
        'No. As of November 8, 2026 there is no OpenAI announcement, help page or launch date, and every report we found traces back to the same LinkedIn post. Treat the details as a preview that can change. In particular, nothing has been said about how a plumber or a med spa without a Shopify store would verify, which is the question that matters most for readers here.',
        'What OpenAI has confirmed is the plumbing around it, and that is where the useful work is today.',
      ],
    },
    {
      id: 'how-businesses-show-up',
      heading: 'How does a business get into ChatGPT answers today?',
      paragraphs: [
        'There are four routes, and only one of them is free and open to every service business.',
      ],
      table: {
        caption: 'Ways a business can appear in ChatGPT as of Nov 8, 2026, from OpenAI’s own pages or OpenAI as quoted by Reuters and Search Engine Journal.',
        columns: [
          { key: 'route', label: 'Route' },
          { key: 'how', label: 'How it works' },
          { key: 'fit', label: 'Fits a service business?' },
        ],
        rows: [
          { route: 'ChatGPT search (organic)', how: 'OpenAI’s OAI-SearchBot crawls your site; sites that block it are not shown in ChatGPT search answers', fit: 'Yes. Free, and the one to get right first' },
          { route: 'Shopping', how: 'Product catalogs; Shopify and Etsy stores are already integrated, others apply and wait. No fees', fit: 'Only if you sell products' },
          { route: 'Ads', how: 'Self-serve Ads Manager for US advertisers since May 2026; ads show on the Free and Go plans', fit: 'Yes, if you pay' },
          { route: 'Sponsored agents', how: 'A business-branded agent people can chat with after clicking an ad; limited US test since September 2026, Angi is a pilot partner', fit: 'Indirectly, through a marketplace like Angi' },
        ],
      },
      callout:
        'Check your robots.txt today. If it blocks OAI-SearchBot, ChatGPT search will not show your site in its answers. OpenAI says changes take about 24 hours to apply.',
    },
    {
      id: 'why-it-matters',
      heading: 'Why does this matter for a contractor or a clinic?',
      paragraphs: [
        'ChatGPT had 900 million weekly users in February 2026, according to OpenAI as reported at the time, and it already answers questions like “who should I call for a furnace repair near me”. Until now a business had no way to see whether it was being named. A mentions-and-clicks report would change that, the same way Google Search Console did for Google.',
        'It also shows where OpenAI is heading: claimed profiles, verified info and an agent that talks to customers for the business. Google is on the same road. Since November 4, Google AI Mode in the US can send a homeowner straight to booking a pro through Angi, Thumbtack, Housecall Pro and Jobber (/blog/google-ai-mode-home-services-booking-links). In both, the customer is one tap from a competitor, so the business that answers first wins the job.',
      ],
    },
    {
      id: 'what-to-do',
      heading: 'What should a service business do this week?',
      steps: [
        { title: 'Make sure ChatGPT can read your site', detail: 'Ask whoever runs your website to check robots.txt allows OAI-SearchBot. Blocking GPTBot (training) is a separate choice and does not affect ChatGPT search.' },
        { title: 'Put the facts on your own pages', detail: 'Services, towns you cover, hours, prices or price ranges where you can, licences and insurance, and how to book. AI answers repeat what they can read; a page that says “call for details” gives them nothing.' },
        { title: 'Keep your details identical everywhere', detail: 'Same business name, phone, address and hours on your site, Google Business Profile, Bing Places and any marketplace profile. If ChatGPT lets you claim a listing, matching details are the easiest way to prove it is you.' },
        { title: 'Earn reviews that name the job', detail: 'A review that says “they replaced our water heater the same day” tells an AI what you do and where. Ask for them after every completed job.' },
        { title: 'Tag ChatGPT traffic', detail: 'ChatGPT adds utm_source=chatgpt.com to links it sends, so it shows as its own source in Google Analytics. Check it monthly so you know if this channel is real for you before anyone sells you a dashboard.' },
        { title: 'Answer every enquiry in minutes', detail: 'Whether the customer comes from ChatGPT, AI Mode or a phone call, the first business to reply usually gets the job. If nights and weekends go to voicemail, fix that first (/ai-employees/ai-receptionist).' },
      ],
    },
    {
      id: 'pay-or-earn',
      heading: 'Should I pay for ChatGPT ads instead?',
      paragraphs: [
        'Not first. Ads in ChatGPT are real (Reuters reported on October 21, 2026 that they now run in 89 countries, with more than 100,000 advertisers), but they only show to people on the Free and Go plans, and a paid click into a slow inbox is wasted money. The free mention compounds: the same website facts, consistent listings and job-specific reviews help you in ChatGPT, Google AI Mode and plain Google at once.',
        'For a step-by-step version of the organic side, see /blog/how-to-get-recommended-by-chatgpt. If you run a home service business, /industries/home-services covers how we set up the reply-and-booking side. When the Business Hub opens to service businesses, I will update this page with how to claim it.',
      ],
    },
  ],
  faq: [
    {
      question: 'What is the ChatGPT Business Hub?',
      answer:
        'It is a feature OpenAI is reportedly building that would let a business claim its presence in ChatGPT, update its info and products, see daily counts of how often it appears in ChatGPT answers and how many clicks it gets, and set up a business agent to answer customer questions. It was reported on November 6, 2026 and has not been announced by OpenAI.',
    },
    {
      question: 'Can I claim my business on ChatGPT yet?',
      answer:
        'Not as of November 8, 2026. There is no public sign-up. The only verification method reported so far is connecting a Shopify store, and OpenAI has not said how businesses without one would verify.',
    },
    {
      question: 'How do I get my business mentioned in ChatGPT?',
      answer:
        'Make sure your website allows OpenAI’s OAI-SearchBot crawler, put your services, service area, hours and booking details on your own pages, keep your name, phone and address identical across Google, Bing and other listings, and collect reviews that mention the specific jobs you do.',
    },
    {
      question: 'Will the ChatGPT Business Hub show which prompts mention my business?',
      answer:
        'According to the person who spotted it, no. It reportedly shows how often your business appeared and how many clicks it got, but not the prompts people typed, user data or competitor rankings.',
    },
    {
      question: 'Is the ChatGPT Business Hub the same as ChatGPT ads?',
      answer:
        'It appears to be separate. Search Engine Roundtable describes it as designed for organic ChatGPT answers. Ads are a paid product with a self-serve Ads Manager for US advertisers, shown on the Free and Go plans.',
    },
    {
      question: 'How do I see traffic from ChatGPT in Google Analytics?',
      answer:
        'Links that ChatGPT sends carry utm_source=chatgpt.com, so ChatGPT shows up as its own source in Google Analytics traffic reports. Check it monthly to see whether visits and enquiries are growing.',
    },
    {
      question: 'Does blocking GPTBot keep my business out of ChatGPT?',
      answer:
        'No. GPTBot is OpenAI’s training crawler. ChatGPT search uses OAI-SearchBot, and OpenAI says sites that block OAI-SearchBot will not be shown in ChatGPT search answers, though they can still appear as navigational links.',
    },
  ],
  sources: [
    {
      label: 'Search Engine Roundtable, OpenAI Working On ChatGPT Tools For Business For Analytics & Citations',
      url: 'https://www.seroundtable.com/chatgpt-tools-for-business-42476.html',
      note: 'Nov 6, 2026 report by Barry Schwartz: the three reported features, Shopify verification, separate from ads. Read Nov 8, 2026.',
    },
    {
      label: 'Juozas Kaziukėnas on LinkedIn',
      url: 'https://www.linkedin.com/posts/juozas_chatgpt-is-building-an-analytics-tool-to-share-7524436371613118464-E3Zf/',
      note: 'The original post: mentions and clicks tracked daily, part of a Business Hub, first seen in August, no prompt or competitor data. Read Nov 8, 2026; the screenshot did not load for us.',
    },
    {
      label: 'OpenAI, Overview of OpenAI Crawlers',
      url: 'https://developers.openai.com/api/docs/bots',
      note: 'OAI-SearchBot vs GPTBot, sites that block OAI-SearchBot not shown in ChatGPT search answers, about 24 hours for robots.txt changes. Read Nov 8, 2026.',
    },
    {
      label: 'OpenAI, Power product discovery in ChatGPT (merchants)',
      url: 'https://chatgpt.com/merchants',
      note: 'Shopping live in the US, Shopify and Etsy catalogs integrated, no fees, purchases completed on merchant sites. Read Nov 8, 2026.',
    },
    {
      label: 'Search Engine Journal, OpenAI launches self-serve Ads Manager for ChatGPT',
      url: 'https://www.searchenginejournal.com/openai-launches-self-serve-ads-manager-for-chatgpt/573971/',
      note: 'May 5, 2026: beta self-serve Ads Manager, US advertisers can register. Read Nov 8, 2026.',
    },
    {
      label: 'Reuters via The Star, OpenAI expands ChatGPT ads to 26 more countries',
      url: 'https://www.thestar.com.my/tech/tech-news/2026/10/21/openai-expands-chatgpt-ads-to-26-more-countries-in-bid-to-boost-revenue',
      note: 'Oct 21, 2026: 89 countries, Free and Go plans only, more than 100,000 advertisers, sponsored agents tested with select US advertisers. Read Nov 8, 2026.',
    },
    {
      label: 'Angi, Angi among first brands to pilot sponsored agents in ChatGPT',
      url: 'https://www.financialcontent.com/article/gnwcq-2026-9-16-angi-among-first-brands-to-pilot-sponsored-agents-in-chatgpt',
      note: 'Sep 16, 2026 release: Angi in OpenAI’s Sponsored Agent pilot for home services conversations. Read Nov 8, 2026.',
    },
    {
      label: 'The State of AI, OpenAI building a Search Console for ChatGPT',
      url: 'https://www.thestateofai.com/news/openai-chatgpt-search-console-businesses',
      note: 'Nov 6, 2026: OpenAI has not commented and there is no launch date; ChatGPT links carry utm_source=chatgpt.com. Read Nov 8, 2026.',
    },
    {
      label: 'The Keyword, ChatGPT hits 900 million weekly active users',
      url: 'https://www.thekeyword.co/news/chatgpt-hits-900-million-weekly-active-users',
      note: 'Mar 2, 2026 report of OpenAI’s 900 million weekly users figure; OpenAI’s own post did not load for us. Read Nov 8, 2026.',
    },
  ],
  related: ['how-to-get-recommended-by-chatgpt', 'google-ai-mode-home-services-booking-links', 'speed-to-lead'],
  cta: {
    title: 'Want help getting ranked on ChatGPT?',
    text: 'Book a free consult and we will help you get ranked in ChatGPT and Google AI Mode. We check how your business shows up today, work on what is holding it back, and make sure every enquiry they send gets answered and booked, day or night.',
  },
  queries: ['chatgpt business hub', 'claim your business on chatgpt', 'chatgpt business profile', 'how to get my business on chatgpt', 'chatgpt search console'],
};

export default article;
