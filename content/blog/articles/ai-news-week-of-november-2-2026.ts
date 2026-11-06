// Weekly AI news roundup, week of Nov 2, 2026. Re-checked Nov 6, 2026. Primary
// sources where they loaded: OpenAI docs and pricing, FCC 26-67 and FCC 24-17,
// Google help and status pages, Angi and LegalZoom releases (via Yahoo Finance).
// Pages that blocked us (X posts, Search Engine Land, GlobeNewswire, ir.angi.com)
// are attributed as "reported by" and their notes say not read. Excluded for lack of a primary
// source: Google Business Home beta details (only trade coverage found), Google
// Ads in AI Mode expanding to Canada (no Google post found), Meta Muse Voice
// (consumer product, not relevant to owners).
// Target: "ai news for small business", "google ai mode home services",
// "openai phone calls api", "tcpa rule change november 2026".

import type { Article } from '../types';

const article: Article = {
  slug: 'ai-news-week-of-november-2-2026',
  category: 'news',
  kind: 'News',
  title: 'AI news for service businesses: week of November 2, 2026',
  seoTitle: 'AI News for Service Businesses: Nov 2, 2026',
  description:
    'Google AI Mode now books home service jobs, OpenAI opened AI phone calls to every developer, and new FCC texting rules start Nov 25. What it means for owners.',
  datePublished: '2026-11-06',
  dateModified: '2026-11-06',
  lastChecked: '2026-11-06',
  cover: {
    style: 'chat',
    messages: [
      { from: 'them', text: 'Find me a plumber who can come today.' },
      { from: 'ai', text: 'Here are 3 near you. Book with one now?' },
    ],
  },
  coverAlt:
    'A search conversation where someone asks for a plumber today and Google AI Mode offers three nearby plumbers with a booking option.',
  intro: [
    'The biggest AI story for service businesses this week: on November 4, Google started showing booking and quote links for home services inside AI Mode in the US, through Angi, Thumbtack, Housecall Pro and Jobber, with ServiceTitan coming. The same day OpenAI announced outbound phone calling as generally available for its GPT-Live voice AI, and the FCC’s new rules on opt-outs for calls and texts take effect November 25.',
    'Below is each item with the source, what it means for an owner, and whether you need to do anything. Six items this week. We only include things that change how a service business gets found, answers the phone, texts customers or gets paid.',
  ],
  tldr: [
    'Google AI Mode now links straight to booking and quote requests for US home service pros through four partner platforms. Check that your profile on the one you use is complete.',
    'OpenAI announced outbound calling for GPT-Live as generally available on Nov 4, so AI phone agents that dial out just got easier to build. The calling rules did not get any looser.',
    'New FCC rules on how customers opt out of calls and texts take effect Nov 25, 2026. If you send reminders or payment texts, review your opt-out handling.',
    'No Google ranking update this week. The last spam update finished Oct 8.',
  ],
  sections: [
    {
      id: 'summary',
      heading: 'What changed this week, at a glance',
      table: {
        caption: 'AI news for service businesses, Oct 30 to Nov 6, 2026. Dates are the announcement dates.',
        columns: [
          { key: 'item', label: 'What shipped' },
          { key: 'date', label: 'Date' },
          { key: 'who', label: 'Who it affects' },
          { key: 'act', label: 'Do anything?' },
        ],
        rows: [
          { item: 'Booking and quote links for home services in Google AI Mode (US)', date: 'Nov 4', who: 'Plumbers, HVAC, electricians, contractors, cleaners', act: 'Yes. Complete your Angi, Thumbtack, Housecall Pro or Jobber profile.' },
          { item: 'OpenAI GPT-Live outbound phone calls generally available', date: 'Nov 4', who: 'Anyone using or buying an AI phone agent', act: 'No action, but expect more outbound calling tools.' },
          { item: 'FCC opt-out rules for calls and texts take effect', date: 'Nov 25 (adopted Sep 30, released Oct 1)', who: 'Anyone sending reminders, payment or marketing texts', act: 'Yes. Check how opt-outs are handled before Nov 25.' },
          { item: 'WhatsApp buttons spotted on Google local results', date: 'Reported Oct 7', who: 'Any business with a Google Business Profile', act: 'Optional. Add a text option if you can answer it fast.' },
          { item: 'LegalZoom AI Assistant for small business owners', date: 'Oct 29', who: 'Owners handling contracts and filings', act: 'No. Worth a look if you use LegalZoom already.' },
          { item: 'Google Search ranking: no new update', date: 'As of Nov 5', who: 'Anyone watching their traffic', act: 'No.' },
        ],
      },
    },
    {
      id: 'ai-mode-booking',
      heading: 'Google AI Mode now links to booking and quotes for home services',
      paragraphs: [
        '**What shipped.** On November 4, Robby Stein, a vice president of product at Google Search, announced on X that AI Mode now has direct links to book home services in the US, through Angi, Thumbtack, Housecall Pro and Jobber, with ServiceTitan "coming soon" (https://x.com/rmstein/status/2118027605018632408). Google has not published a blog post on it that we could find, so the details here are as reported by Search Engine Journal (https://www.searchenginejournal.com/google-ai-mode-home-services-booking-quote-links/595871/). Angi’s own release says a homeowner who picks an Angi pro in AI Mode is sent to that pro’s Angi profile to request a quote (https://finance.yahoo.com/technology/ai/articles/angi-leads-home-services-ai-170000739.html). Search Engine Journal reports that Jobber is taking these requests now for eligible US customers with no lead fees, and that Housecall Pro says its integration is coming soon.',
        '**What it means.** Someone can now ask Google’s AI for a plumber and get sent straight to a booking or quote page without visiting the plumber’s website. Google has not said how it chooses which pros to show, and Angi’s release doesn’t say whether its usual lead fees apply to requests that start in AI Mode.',
        '**Do anything?** Yes, if you are a home service business. Make sure your profile on whichever of these platforms you already use is complete and your booking settings are on. Then make sure whatever comes in gets answered fast, because a booking link sends the customer to whoever replies first. We wrote a longer take on this in /blog/google-ai-mode-home-services-booking-links.',
      ],
    },
    {
      id: 'openai-outbound-calls',
      heading: 'OpenAI opened outbound phone calls for its voice AI',
      paragraphs: [
        '**What shipped.** On November 4, OpenAI president Greg Brockman announced on X that outbound calling for GPT-Live, OpenAI’s live voice model, was now generally available (https://x.com/gdb/status/2118204795219489172), as reported by TokenPost. OpenAI’s Telephony and SIP guide now says outbound SIP calling is available to all organizations through the Live API, using your own SIP trunk provider (https://developers.openai.com/api/docs/guides/voice-sip). OpenAI’s pricing page lists gpt-live-1 at $0.05 a minute, billed per second, with model and tool use billed separately; your phone carrier charges on top.',
        '**What it means.** AI agents that place calls (appointment reminders, estimate follow-ups, "your tech is on the way") get simpler to build. You will see more vendors offering outbound AI calling soon. Inbound answering, which is what most service businesses need first, was already possible.',
        '**Do anything?** Not this week. One warning before anyone sells you outbound AI calls: the FCC ruled in February 2024 that AI-generated voices count as "artificial" voices under the TCPA, so the same consent rules apply as for robocalls (https://docs.fcc.gov/public/attachments/FCC-24-17A1.pdf). Calling your own customers about their own appointment is very different from cold calling a list. If you want the inbound side set up first, see /ai-employees/ai-receptionist.',
      ],
    },
    {
      id: 'fcc-opt-out',
      heading: 'New FCC opt-out rules for calls and texts start November 25',
      paragraphs: [
        '**What shipped.** The FCC adopted an order (FCC 26-67) on September 30, 2026, released October 1, that changes how businesses must honor opt-outs from automated calls and texts (https://docs.fcc.gov/public/attachments/FCC-26-67A1.pdf). The order takes effect 30 days after Federal Register publication, and law firm alerts put that at November 25, 2026 (https://www.womblebonddickinson.com/us/node/21530). Under the change, when a customer opts out of an informational message, like a payment reminder, you can treat that as applying to that category of messages only, instead of to everything you send. Opting out of marketing still stops all marketing from you. Businesses can also make one or more of three approved methods (a key-press or voice opt-out on the call, standard words like STOP by text, or a website or phone number) the only way to opt out, if they clearly disclose it on the call or in the text.',
        '**What it means.** A customer who replies STOP to an appointment reminder may still be able to get a payment reminder, as long as your system tracks opt-outs by message type. Many small business texting tools treat any STOP as a stop to everything, which is the safe default and still allowed.',
        '**Do anything?** Check how your texting tool handles opt-outs before November 25. If it can’t separate message types, leave it treating STOP as a full stop. This is general information, not legal advice; your carrier registration rules still apply on top of the FCC’s (see /blog/a2p-10dlc-explained).',
      ],
    },
    {
      id: 'whatsapp-button',
      heading: 'Google is showing WhatsApp and text buttons on local results',
      paragraphs: [
        '**What shipped.** Google is showing WhatsApp buttons in the local panel in Search for some businesses, next to the usual call, directions and website buttons or in place of a chat option, as Search Engine Roundtable reported on October 7 (https://seroundtable.com/google-local-panel-whatsapp-button-42230.html). Google has not announced it. Google’s help page says verified profiles can add a WhatsApp or text option under Edit profile, then Contact, then Chat, in select regions, and that if both are added, only the text option is shown (https://support.google.com/business/answer/15013580).',
        '**What it means.** More customers will message instead of call. That is good if someone answers and bad if the texts sit unread until Monday.',
        '**Do anything?** Optional. Add a text option only if your team or an AI assistant can reply within minutes, including after hours. An unanswered text button does more damage than no button.',
      ],
    },
    {
      id: 'legalzoom',
      heading: 'LegalZoom launched an AI assistant for small business owners',
      paragraphs: [
        '**What shipped.** On October 29, LegalZoom introduced an AI Assistant it calls "a personalized, AI-powered business partner" that answers owners’ questions using their own business details and connects them to an attorney when needed. LegalZoom says it is free inside a LegalZoom account (https://finance.yahoo.com/small-business/articles/legalzoom-introduces-ai-assistant-ai-120000003.html).',
        '**What it means.** Paperwork help (contracts, filings, compliance reminders) is moving into the tools owners already pay for. It won’t replace your lawyer or accountant.',
        '**Do anything?** No, unless you already use LegalZoom, in which case it costs nothing to try.',
      ],
    },
    {
      id: 'search-quiet',
      heading: 'No new Google ranking update this week',
      paragraphs: [
        'Google’s Search Status Dashboard listed no incidents as of November 5. The most recent ranking update was the September 2026 spam update, which started September 24 and ran for about 13 and a half days, to around October 8 (https://status.search.google.com/summary). If your website traffic moved this week, the cause is probably something else: seasonality, a site change, or more searches being answered inside AI Mode.',
        'That last one is the trend under every item above. More of the path from "I need a plumber" to a booked job now happens inside Google and AI assistants, so the businesses that answer fastest and keep their profiles complete get the work. If you want to know where your business is leaking leads today, /book.',
      ],
    },
  ],
  faq: [
    {
      question: 'Can customers book a home service pro directly from Google AI Mode?',
      answer:
        'In the US, yes, starting November 4, 2026. AI Mode shows booking and quote links for home services through partner platforms: Angi, Thumbtack, Housecall Pro and Jobber, with ServiceTitan coming soon. The customer is sent to the pro’s profile or booking page on that platform.',
    },
    {
      question: 'How do I get my business into Google AI Mode booking links?',
      answer:
        'Google has not published how it chooses which pros to show. The practical step is to keep a complete, active profile with booking turned on in whichever partner platform you already use, and to keep your Google Business Profile accurate.',
    },
    {
      question: 'Can AI make outbound phone calls for my business now?',
      answer:
        'Yes. OpenAI announced outbound calling as generally available for its GPT-Live voice model on November 4, 2026, and other vendors already offered it. The FCC treats AI-generated voices as artificial voices under the TCPA, so you need the same consent you would need for a robocall.',
    },
    {
      question: 'When do the new FCC opt-out rules for texts take effect?',
      answer:
        'November 25, 2026, according to law firm alerts on its Federal Register publication. The FCC adopted the order on September 30, 2026. It lets businesses treat an opt-out from an informational message as applying to that category of messages only, and lets them choose from three approved opt-out methods as the only ones, if they disclose them clearly.',
    },
    {
      question: 'Should I add a WhatsApp or text button to my Google Business Profile?',
      answer:
        'Only if someone can answer within minutes, including evenings and weekends. Google may show the button in place of other actions, and a message that sits unanswered loses the customer just like a missed call.',
    },
    {
      question: 'Was there a Google algorithm update in early November 2026?',
      answer:
        'No. Google’s Search Status Dashboard showed no incidents as of November 5, 2026. The most recent ranking update was the September 2026 spam update, which started September 24 and finished around October 8, 2026.',
    },
  ],
  sources: [
    {
      label: 'Angi, Angi Leads Home Services into AI Search with Google',
      url: 'https://finance.yahoo.com/technology/ai/articles/angi-leads-home-services-ai-170000739.html',
      note: 'Press release (GlobeNewswire), Nov 4, 2026, on Yahoo Finance. Read Nov 6, 2026. The copy on ir.angi.com returned 403.',
    },
    {
      label: 'Robby Stein (Google Search) on X',
      url: 'https://x.com/rmstein/status/2118027605018632408',
      note: 'The Nov 4, 2026 announcement. X would not load for us; wording and partner list as quoted by Search Engine Journal and Search Engine Roundtable.',
    },
    {
      label: 'Search Engine Journal, Google adds home service booking and quote links to AI Mode',
      url: 'https://www.searchenginejournal.com/google-ai-mode-home-services-booking-quote-links/595871/',
      note: 'Nov 4, 2026 report: partner list, US only, Jobber and Housecall Pro terms. Read Nov 6, 2026.',
    },
    {
      label: 'Housecall Pro, Integrates with AI Mode in Google Search',
      url: 'https://www.globenewswire.com/news-release/2026/11/04/3395680/0/en/housecall-pro-integrates-with-ai-mode-in-google-search-to-turn-home-service-searches-into-booked-jobs.html',
      note: 'Press release, Nov 4, 2026. Returned 403 on Nov 6, 2026, not read; its terms are as reported by Search Engine Journal.',
    },
    {
      label: 'Greg Brockman (OpenAI) on X',
      url: 'https://x.com/gdb/status/2118204795219489172',
      note: 'Nov 4, 2026 post promoting GPT-Live outbound telephony to GA. X would not load for us; date and wording as reported by TokenPost (https://www.tokenpost.com/news/technology/49921), read Nov 6, 2026.',
    },
    {
      label: 'OpenAI, Telephony and SIP guide',
      url: 'https://developers.openai.com/api/docs/guides/voice-sip',
      note: 'Outbound SIP calling available to all organizations through the Live API. Read Nov 6, 2026.',
    },
    {
      label: 'OpenAI API pricing',
      url: 'https://developers.openai.com/api/docs/pricing',
      note: 'gpt-live-1 at $0.05 a minute, billed per second. Read Nov 6, 2026.',
    },
    {
      label: 'FCC, Report and Order FCC 26-67 (adopted Sep 30, 2026)',
      url: 'https://docs.fcc.gov/public/attachments/FCC-26-67A1.pdf',
      note: 'Category-specific opt-outs for informational calls and texts, and the three exclusive opt-out methods. Read Nov 6, 2026.',
    },
    {
      label: 'FCC, Declaratory Ruling on AI-generated voices (FCC 24-17)',
      url: 'https://docs.fcc.gov/public/attachments/FCC-24-17A1.pdf',
      note: 'AI voices are artificial voices under the TCPA; adopted Feb 2, released Feb 8, 2024. Read Nov 6, 2026.',
    },
    {
      label: 'Womble Bond Dickinson, Clock starts on FCC TCPA revocation order',
      url: 'https://www.womblebonddickinson.com/us/node/21530',
      note: 'Oct 28, 2026 alert: effective date Nov 25, 2026 and comment deadlines. Read Nov 6, 2026.',
    },
    {
      label: 'Google Business Profile Help, Chat with customers from your Business Profile',
      url: 'https://support.google.com/business/answer/15013580',
      note: 'WhatsApp and text chat options, select regions, text shown if both are added. Read Nov 6, 2026.',
    },
    {
      label: 'Search Engine Roundtable, Google local panel gains WhatsApp button',
      url: 'https://seroundtable.com/google-local-panel-whatsapp-button-42230.html',
      note: 'Oct 7, 2026 report of WhatsApp buttons in local panels. Read Nov 6, 2026.',
    },
    {
      label: 'Google Search Status Dashboard',
      url: 'https://status.search.google.com/summary',
      note: 'No incidents as of Nov 5, 2026; September 2026 spam update start date and duration. Read Nov 6, 2026.',
    },
    {
      label: 'LegalZoom AI Assistant announcement',
      url: 'https://finance.yahoo.com/small-business/articles/legalzoom-introduces-ai-assistant-ai-120000003.html',
      note: 'Press release (Business Wire) on Yahoo Finance, Oct 29, 2026. Read Nov 6, 2026.',
    },
  ],
  related: ['google-ai-mode-home-services-booking-links', 'how-to-get-recommended-by-chatgpt', 'a2p-10dlc-explained'],
  queries: ['ai news for small business', 'google ai mode home services', 'openai outbound phone calls', 'tcpa opt out rule november 2026', 'google business profile whatsapp button'],
};

export default article;
