// Target: "how to show up in chatgpt" (50/mo), "how to get recommended by
// chatgpt" (20), "chatgpt local business recommendations", "google ai mode local
// business". Volumes are small on Google but this is the question owners ask
// ChatGPT itself. Sources: OpenAI's crawler docs (OAI-SearchBot), Google Search
// Central "AI features and your website" and its May 2025 AI search post, Search
// Engine Land on how ChatGPT runs local searches (Bing-based), Bing Places. The
// approach mirrors what Hexona did on its own site (llms.txt, IndexNow, entity
// sentence, crawler access), which is true of hexonasystems.com.

import type { Article } from '../types';

const article: Article = {
  slug: 'how-to-get-recommended-by-chatgpt',
  category: 'guides',
  kind: 'Guide',
  title: 'How to get your business recommended by ChatGPT and Google’s AI answers',
  seoTitle: 'How to Get Recommended by ChatGPT',
  description:
    'Where ChatGPT and Google’s AI answers get local business recommendations, and the eight things a service business can do this month to show up in them.',
  datePublished: '2026-11-06',
  dateModified: '2026-11-06',
  lastChecked: '2026-11-06',
  cover: {
    style: 'chat',
    messages: [
      { from: 'them', text: 'Who’s a good plumber near me that answers on weekends?' },
      { from: 'ai', text: 'A few options with strong reviews and weekend hours: ...' },
    ],
  },
  coverAlt:
    'A chat where someone asks an AI assistant for a plumber near them who answers on weekends, and the assistant starts listing local options.',
  intro: [
    'ChatGPT recommends local businesses mostly from web search results (largely Bing) and business listings, and Google’s AI Overviews and AI Mode draw on Google’s own index and Business Profiles. So the way to get recommended is the same work that gets you found in search, done properly: complete and consistent listings, real reviews, a website that answers questions plainly, and nothing blocking the crawlers.',
    'Nobody can guarantee you a spot in an AI answer, and anyone selling that is selling smoke. But owners are asking ChatGPT "who’s a good HVAC company near me" right now, and most local businesses make it easy for the AI to skip them. Below is where the answers come from and what to fix, in order.',
  ],
  tldr: [
    'ChatGPT search leans on Bing results and business listings; Google’s AI answers use Google’s index and Business Profiles.',
    'Claim and complete Google Business Profile and Bing Places, with the same name, address, phone and hours everywhere.',
    'Make sure your website lets OAI-SearchBot, Bingbot and Googlebot in. A blocked site can’t be cited.',
    'Write pages that answer real customer questions in the first two sentences: prices, areas, hours, what happens on a call-out.',
    'Reviews matter twice: they rank you, and assistants quote what customers say.',
  ],
  sections: [
    {
      id: 'where-answers-come-from',
      heading: 'Where does ChatGPT get its local business recommendations?',
      paragraphs: [
        'When you ask ChatGPT for a business near you, it searches the web and then writes an answer from what it found. Search Engine Land’s testing found ChatGPT runs a Bing search for local queries, takes the top results and organizes them with its own logic. Other analyses have found Google and Yelp place data in ChatGPT’s local results too, so treat it as several sources rather than one.',
        'OpenAI also runs its own crawler for ChatGPT search, called **OAI-SearchBot**. OpenAI’s documentation says sites that block it will not be shown in ChatGPT search answers, apart from plain navigational links.',
        'Google is more direct. Its Search Central documentation says there are no extra requirements to appear in AI Overviews or AI Mode: a page needs to be indexed and eligible to show with a snippet. It also says you don’t need special AI files or special schema to qualify.',
      ],
      table: {
        caption: 'Where the main AI assistants get local business information, from the sources listed below, checked Nov 6, 2026.',
        columns: [
          { key: 'assistant', label: 'Assistant' },
          { key: 'source', label: 'Main sources' },
          { key: 'fix', label: 'What to fix first' },
        ],
        rows: [
          { assistant: 'ChatGPT search', source: 'Bing results, its own OAI-SearchBot crawler, listings data', fix: 'Bing Places, crawler access, clear website pages' },
          { assistant: 'Google AI Overviews and AI Mode', source: 'Google’s index and Google Business Profile', fix: 'Business Profile, reviews, indexed pages' },
          { assistant: 'Microsoft Copilot', source: 'Bing', fix: 'Bing Places and Bing Webmaster Tools' },
        ],
      },
    },
    {
      id: 'listings',
      heading: 'Step 1: Are your business listings complete and consistent?',
      paragraphs: [
        'This is the cheapest fix with the biggest effect. Claim your Google Business Profile and Bing Places for Business, and fill in everything: categories, services, service areas, hours (including after-hours and weekends), photos and a description that says plainly what you do and where.',
        'Then check the basics match everywhere: your website, Yelp, Facebook, Angi or Houzz if you use them, and industry directories. Same business name, same address, same phone number, same hours. When sources disagree, an assistant has less reason to trust any of them.',
      ],
      callout:
        'A quick test: ask ChatGPT and Google "what are the hours and phone number for [your business]". If the answer is wrong, a listing somewhere is wrong.',
    },
    {
      id: 'crawlers',
      heading: 'Step 2: Can the AI crawlers actually get into your website?',
      paragraphs: [
        'Some website setups block AI crawlers by default, especially sites behind Cloudflare with "block AI bots" switched on, or old robots.txt files that block everything unfamiliar. If OAI-SearchBot can’t read your site, ChatGPT can’t cite it.',
        'Ask whoever runs your website to confirm that Googlebot, Bingbot and OAI-SearchBot are allowed in robots.txt and not blocked by a firewall. OpenAI notes that changes to robots.txt can take about 24 hours to be picked up.',
        'Then submit your site to Bing Webmaster Tools as well as Google Search Console. Bing is the one most owners forget, and it feeds ChatGPT and Copilot. If your site supports IndexNow, it can tell Bing about new or updated pages within hours instead of waiting to be crawled. We do all three on our own site.',
      ],
    },
    {
      id: 'answer-pages',
      heading: 'Step 3: Does your website answer the questions customers ask?',
      paragraphs: [
        'AI assistants quote pages that answer a question directly. Most service business websites say "quality service you can trust" and little else. Write pages that answer what people actually ask before they call:',
      ],
      bullets: [
        'What does a [service] cost in [city]? Give a range and what changes it.',
        'Which areas do you cover, and do you charge for travel?',
        'Do you answer nights and weekends? What happens if I call at 10 p.m.?',
        'How fast can you come out? What happens on the first visit?',
        'Are you licensed and insured? Which brands do you service?',
      ],
    },
    {
      id: 'structure',
      heading: 'Step 4: Is the answer in the first two sentences?',
      paragraphs: [
        'Put the answer first, then the detail. A sentence like "A water heater replacement in [your city] usually costs [your range] installed, depending on tank size and venting", with your real numbers, is quotable. Three paragraphs about your family values before the price is not.',
        'Use headings phrased as questions, tables for prices and comparisons, and a short FAQ on service pages. Google says structured data is not required for AI features, but LocalBusiness and FAQ markup still help search engines read your hours, area and answers correctly.',
        'Put one plain sentence about what your business is near the top of your homepage and About page: who you are, what you do, where, and for whom. Ours is on /firm. Assistants doing "who is this business" lookups lean on exactly that kind of sentence.',
      ],
    },
    {
      id: 'reviews',
      heading: 'Step 5: How much do reviews matter for AI recommendations?',
      paragraphs: [
        'A lot. Reviews feed local rankings on Google and Bing, and assistants often summarize what reviewers say ("customers mention fast response on weekends"). The words in your reviews become the words in the recommendation.',
        'The fix is a steady flow of recent reviews, not a burst. Ask every happy customer, the same day, with a direct link. That is one of the jobs our /ai-employees/ai-retention handles automatically after each completed job.',
      ],
    },
    {
      id: 'answer-the-phone',
      heading: 'Step 6: What happens when the AI sends someone your way?',
      paragraphs: [
        'Getting recommended is wasted if nobody answers. Someone who asked ChatGPT for a weekend plumber is calling on a weekend. If that call goes to voicemail, they call the next name on the list.',
        'This is where most of the money is. The tire shop in /evidence/tire-shop-missed-calls was missing more than 600 calls a month; answering them recovered over $50,000. An /ai-employees/ai-receptionist makes sure the customers AI search sends you actually get booked.',
      ],
    },
    {
      id: 'what-not-to-buy',
      heading: 'What should you not pay for?',
      bullets: [
        '**Guaranteed ChatGPT rankings.** Nobody controls what an assistant says. You can improve the odds; you can’t buy a spot.',
        '**Mass-produced city pages.** Hundreds of near-identical "plumber in [town]" pages are what Google calls scaled content abuse, and they can drag the whole site down.',
        '**Fake reviews.** Platforms remove them, they put your listing at risk, and they tell an assistant nothing true about you.',
        '**Special AI files as a magic fix.** Google says you don’t need them for its AI features. They don’t hurt, but they don’t replace the steps above.',
      ],
      callout:
        'Want to see how your business shows up today and where the leaks are? /score covers the systems side, and /book gets you a free consult.',
    },
  ],
  faq: [
    {
      question: 'How do I get my business recommended by ChatGPT?',
      answer:
        'Make your business easy to find and verify: claim and complete Bing Places and Google Business Profile, keep your name, address, phone and hours identical everywhere, let OAI-SearchBot and Bingbot crawl your site, answer customer questions plainly on your website, and build a steady flow of reviews.',
    },
    {
      question: 'Where does ChatGPT get information about local businesses?',
      answer:
        'Mostly from web search results, largely Bing, plus business listings data and pages crawled by OpenAI’s OAI-SearchBot. Testing by Search Engine Land found ChatGPT runs a Bing search for local queries and organizes the top results.',
    },
    {
      question: 'Can I pay to be recommended by ChatGPT?',
      answer:
        'No. There is no paid placement in ChatGPT’s answers as of November 2026, and nobody can guarantee a recommendation. Be wary of anyone selling guaranteed AI rankings.',
    },
    {
      question: 'Do I need special schema or an llms.txt file for Google AI Overviews?',
      answer:
        'Google says no. Pages qualify for AI Overviews and AI Mode if they are indexed and eligible to show with a snippet. Structured data still helps search engines read your details correctly, but it is not a requirement.',
    },
    {
      question: 'Does Bing matter if everyone uses Google?',
      answer:
        'Yes, for AI answers. ChatGPT search and Microsoft Copilot lean on Bing, so a complete Bing Places listing and a site submitted to Bing Webmaster Tools matter more than they used to.',
    },
    {
      question: 'How long does it take to show up in AI answers?',
      answer:
        'Listing and crawler fixes can be picked up in days to weeks. Content and reviews build over months. Check by asking the assistants your customers’ actual questions every few weeks.',
    },
  ],
  sources: [
    {
      label: 'OpenAI, Overview of OpenAI crawlers',
      url: 'https://developers.openai.com/api/docs/bots',
      note: 'What OAI-SearchBot does, how blocking it affects ChatGPT search, and the 24-hour robots.txt delay. Read Nov 6, 2026.',
    },
    {
      label: 'Google Search Central, AI features and your website',
      url: 'https://developers.google.com/search/docs/appearance/ai-features',
      note: 'Eligibility for AI Overviews and AI Mode, no special files or schema required. Read Nov 6, 2026.',
    },
    {
      label: 'Google Search Central Blog, Top ways to ensure your content performs well in Google’s AI experiences on Search',
      url: 'https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search',
      note: 'Google’s guidance on content for AI search, May 2025. Read Nov 6, 2026.',
    },
    {
      label: 'Search Engine Land, How does ChatGPT conduct local searches?',
      url: 'https://searchengineland.com/how-does-chatgpt-conduct-local-searches-454894',
      note: 'Testing showing ChatGPT runs Bing searches for local queries. Read Nov 6, 2026.',
    },
  ],
  related: ['how-to-get-more-google-reviews', 'google-ai-mode-home-services-booking-links', 'what-is-an-ai-agent'],
  queries: [
    'how to get recommended by chatgpt',
    'how to show up in chatgpt',
    'chatgpt local business recommendations',
    'google ai mode local business',
    'ai overviews small business',
    'how to rank in ai search',
  ],
};

export default article;
