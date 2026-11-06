// Fast take on Google AI Mode's home services booking and quote links (Nov 4, 2026).
// Nov 6, 2026 check: the primary announcement is Robby Stein's X post (X would
// not load); Search Engine Land, ir.angi.com and GlobeNewswire returned 403. Read:
// Search Engine Journal and Search Engine Roundtable reports, Angi's release on
// Yahoo Finance, Google's Jul 16, 2025 business calling post. Housecall Pro and
// Jobber terms are attributed to Search Engine Journal. Google's own selection
// criteria were not published; said so.
// Target: "google ai mode home services", "google ai mode booking",
// "how to show up in google ai mode", "ai mode local business".

import type { Article } from '../types';

const article: Article = {
  slug: 'google-ai-mode-home-services-booking-links',
  category: 'news',
  kind: 'Analysis',
  title: 'Google AI Mode now books home service jobs. What should a contractor do?',
  seoTitle: 'Google AI Mode Now Books Home Service Jobs',
  description:
    'Since Nov 4, 2026, Google AI Mode links US home service searches to booking and quotes via Angi, Thumbtack, Housecall Pro and Jobber. What owners should do now.',
  datePublished: '2026-11-06',
  dateModified: '2026-11-06',
  lastChecked: '2026-11-06',
  cover: { style: 'button', text: 'Book this pro', caption: 'Inside Google AI Mode, Nov 2026' },
  coverAlt: 'A large button reading "Book this pro" with a pointer on it, captioned "Inside Google AI Mode, Nov 2026".',
  intro: [
    'Since November 4, 2026, Google AI Mode in the US can send someone searching for a plumber, electrician or cleaner straight to a booking or quote request, through Angi, Thumbtack, Housecall Pro and Jobber, with ServiceTitan coming soon. If you run a home service business, complete your profile on the platform you already use and answer every request within minutes.',
    'Here is what was announced, what is still unknown, and what I would do if I owned a three-truck HVAC company today.',
  ],
  tldr: [
    'Announced Nov 4, 2026, US only: AI Mode shows booking and quote links for home services through Angi, Thumbtack, Housecall Pro and Jobber. ServiceTitan is "coming soon".',
    'Google has not said how it picks which pros appear, and it is not clear whether marketplace lead fees apply to these requests.',
    'You can’t opt into AI Mode directly. You show up through a partner profile, so that profile now matters more.',
    'Speed decides who gets the job. A booking link sends the customer to whoever confirms first.',
  ],
  sections: [
    {
      id: 'what-changed',
      heading: 'What exactly did Google change?',
      paragraphs: [
        'AI Mode is the chat-style search tab Google has been rolling out. Until now it could recommend businesses but the customer still had to click through, call or fill out a form somewhere. On November 4, Robby Stein, a vice president of product at Google Search, announced in a post on X that AI Mode now has direct links to book home services in the US through partners, as reported by Search Engine Journal and Search Engine Roundtable. We could not find a Google blog post or help page about it.',
        'Angi’s own release says a homeowner who selects an Angi pro surfaced in AI Mode goes to that pro’s Angi profile to learn more and request a quote. According to Search Engine Journal, Jobber says eligible US customers can take these requests now with no lead fees, if they have an active paid plan and a connected Google Business Profile at the same address, and Housecall Pro says its integration is coming soon to eligible US customers with no lead fees. Thumbtack was named by Google but had not announced its own plans as of November 4.',
      ],
      table: {
        caption: 'Partners named for AI Mode home services links, as announced Nov 4, 2026. Jobber, Housecall Pro and Thumbtack status as reported by Search Engine Journal.',
        columns: [
          { key: 'partner', label: 'Partner' },
          { key: 'type', label: 'What it is' },
          { key: 'status', label: 'Status as announced' },
        ],
        rows: [
          { partner: 'Angi', type: 'Marketplace', status: 'Live: links to the pro’s Angi profile to request a quote' },
          { partner: 'Thumbtack', type: 'Marketplace', status: 'Named by Google; no Thumbtack announcement as of Nov 4' },
          { partner: 'Housecall Pro', type: 'Field-service software', status: 'Coming soon to eligible US customers, no lead fees' },
          { partner: 'Jobber', type: 'Field-service software', status: 'Live for eligible US customers on a paid plan, no lead fees' },
          { partner: 'ServiceTitan', type: 'Field-service software', status: 'Coming soon' },
        ],
      },
    },
    {
      id: 'unknowns',
      heading: 'What don’t we know yet?',
      bullets: [
        '**How Google chooses.** Neither Google nor the partners have said how AI Mode picks or ranks the pros it shows. Reviews, availability and profile completeness are reasonable guesses, but they are guesses.',
        '**Who pays.** Angi normally charges pros for leads. Its announcement doesn’t say whether a quote request that starts in AI Mode is billed the same way.',
        '**Rollout.** Housecall Pro and ServiceTitan are described as coming soon, and Jobber limits it to eligible paid customers, so not every pro on these platforms will appear yet.',
        '**Outside the US.** The announcement is US only. Canadian businesses should not expect this yet.',
      ],
    },
    {
      id: 'what-to-do',
      heading: 'What should a home service business do this month?',
      steps: [
        { title: 'Pick the platform you already use', detail: 'If you run Jobber or Housecall Pro, start there. If you buy leads on Angi or Thumbtack, start there. Don’t sign up for all four to chase this.' },
        { title: 'Complete the profile', detail: 'Services, service area, hours, photos, license and insurance details, and booking or quote requests switched on. A half-filled profile is the easiest thing for any ranking system to skip.' },
        { title: 'Keep your Google Business Profile accurate', detail: 'Same name, phone, hours and categories as the partner profile. Mismatched details make it harder for any system to trust that the two are the same business.' },
        { title: 'Answer fast, every time', detail: 'A booking link sends the customer to whoever confirms first. If requests sit until morning, set up an instant reply and booking, by a person or an AI receptionist (/ai-employees/ai-receptionist).' },
        { title: 'Track where jobs come from', detail: 'Tag bookings that came through the partner so you can see in 60 days whether AI Mode is sending you real work, and what it costs per job.' },
      ],
    },
    {
      id: 'speed',
      heading: 'Why does answering speed matter more now?',
      paragraphs: [
        'When search was ten blue links, a homeowner might call three companies and wait. In AI Mode the customer is one tap from booking, and the AI is already offering alternatives. Whoever confirms first gets the job.',
        'We see the same thing in our own work. A Toronto tire shop was missing more than 600 calls a month. After we put in a missed-call assistant that replied by text within seconds, along with chatbots and self-booking, the shop reported over $50,000 in recovered revenue and booked appointments up 50% (/evidence/tire-shop-missed-calls). For the numbers on reply speed in general, see /blog/speed-to-lead. AI Mode doesn’t change that lesson. It makes it more expensive to ignore.',
      ],
      callout:
        'If you can’t answer a request within 5 minutes during business hours and by morning after hours, fix that before you spend anything on visibility. More leads into a slow inbox just means more lost jobs.',
    },
    {
      id: 'bigger-picture',
      heading: 'Is this the start of AI booking for every local business?',
      paragraphs: [
        'Probably, but slowly. In July 2025 Google started rolling out AI that calls local businesses on a searcher’s behalf to check prices and availability in the US, and says businesses stay in control through their Business Profile settings. Booking links for home services are the next step. Med spas, auto shops and restaurants already have booking platforms of their own, and it would be surprising if Google stopped at home services.',
        'The businesses that win this aren’t the ones with the cleverest AI. They are the ones with complete profiles, real reviews and someone (or something) answering every request. That is also what makes a business worth more when you sell it. If you want to see where yours stands, take /score, or read our AI receptionist page for home services at /industries/home-services.',
      ],
    },
  ],
  faq: [
    {
      question: 'What is Google AI Mode home services booking?',
      answer:
        'Since November 4, 2026, Google AI Mode in the US can show booking and quote links when someone searches for a home service pro. The links go through partner platforms (Angi, Thumbtack, Housecall Pro and Jobber, with ServiceTitan coming soon), where the customer books or requests a quote.',
    },
    {
      question: 'How do I get my business to show up in Google AI Mode booking links?',
      answer:
        'Google has not published its criteria. The practical step is a complete, active profile with booking or quote requests switched on in one of the partner platforms you already use, plus an accurate Google Business Profile that matches it.',
    },
    {
      question: 'Does Google charge for AI Mode booking links?',
      answer:
        'Google has not announced a fee to pros. Jobber and Housecall Pro say there are no lead fees, as reported by Search Engine Journal. Angi normally charges for leads and has not said whether requests that start in AI Mode are billed the same way, so check with your platform.',
    },
    {
      question: 'Is Google AI Mode booking available in Canada?',
      answer:
        'Not as of November 6, 2026. The home services booking and quote links were announced for the US only.',
    },
    {
      question: 'Do I need to use Angi or Thumbtack to appear in AI Mode?',
      answer:
        'You need to be on one of the partner platforms to get the booking or quote link. That can be a marketplace (Angi, Thumbtack) or field-service software (Housecall Pro, Jobber, and ServiceTitan once it is added).',
    },
    {
      question: 'What happens if I don’t respond quickly to an AI Mode booking request?',
      answer:
        'The customer is one tap from a competitor in the same answer. Slow replies cost the job, which is why an instant reply and booking, by a person or an AI receptionist, matters more than visibility.',
    },
  ],
  sources: [
    {
      label: 'Robby Stein (Google Search) on X',
      url: 'https://x.com/rmstein/status/2118027605018632408',
      note: 'The Nov 4, 2026 announcement. X would not load for us; wording and partner list as quoted by the two reports below.',
    },
    {
      label: 'Search Engine Journal, Google adds home service booking and quote links to AI Mode',
      url: 'https://www.searchenginejournal.com/google-ai-mode-home-services-booking-quote-links/595871/',
      note: 'Nov 4, 2026 report: partner list, US only, Jobber and Housecall Pro terms, Thumbtack status, open questions. Read Nov 6, 2026.',
    },
    {
      label: 'Search Engine Roundtable, Google AI Mode with home services booking integration',
      url: 'https://www.seroundtable.com/google-ai-mode-home-services-booking-42459.html',
      note: 'Nov 5, 2026 report quoting Stein’s post. Read Nov 6, 2026.',
    },
    {
      label: 'Angi, Angi Leads Home Services into AI Search with Google',
      url: 'https://finance.yahoo.com/technology/ai/articles/angi-leads-home-services-ai-170000739.html',
      note: 'Press release (GlobeNewswire), Nov 4, 2026, on Yahoo Finance, describing how Angi pros appear in AI Mode. Read Nov 6, 2026.',
    },
    {
      label: 'Housecall Pro, Integrates with AI Mode in Google Search',
      url: 'https://www.globenewswire.com/news-release/2026/11/04/3395680/0/en/housecall-pro-integrates-with-ai-mode-in-google-search-to-turn-home-service-searches-into-booked-jobs.html',
      note: 'Press release, Nov 4, 2026. Returned 403 on Nov 6, 2026, not read; terms as reported by Search Engine Journal.',
    },
    {
      label: 'Google, New AI features in Google Search: call a business',
      url: 'https://blog.google/products-and-platforms/products/search/deep-search-business-calling-google-search/',
      note: 'Jul 16, 2025 post: AI calling local businesses for pricing and availability, rolling out in the US, businesses in control via Business Profile settings. Read Nov 6, 2026.',
    },
  ],
  related: ['how-to-get-recommended-by-chatgpt', 'ai-news-week-of-november-2-2026', 'speed-to-lead'],
  queries: ['google ai mode home services', 'google ai mode booking links', 'how to show up in google ai mode', 'ai mode local business', 'angi google ai mode'],
};

export default article;
