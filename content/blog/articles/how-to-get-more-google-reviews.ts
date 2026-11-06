// Target: "how to get more google reviews" (480/mo US, DataforSEO Nov 6, 2026),
// "google review automation" (70), "automated review requests" (40).
// Rules from Google's Maps "Prohibited & restricted content" policy (fake
// engagement), Google Business Profile help on review links and QR codes, and
// the FTC's Trade Regulation Rule on the Use of Consumer Reviews and
// Testimonials (16 CFR Part 465; FTC release Aug 14, 2024, published Aug 22,
// 2024, effective 60 days later on Oct 21, 2024). Nov 6, 2026 check: Google's
// policy page now carries the staff-quota and specific-content clauses PPC Land
// reported on Apr 17, 2026. The Federal Register page redirected to a bot check,
// so the FTC source is now the FTC's own release plus Cornell LII. Example texts
// use straight apostrophes so they stay in GSM encoding. Hamza's own figures (his
// Google profile score going from 8 to 14 out of 16, AI review replies) are from
// his video 8E-YWx1T61U and his hub article google-review-automation.js. Hexona's
// 74 reviews at 4.8 is from PROFILES in content/firm.ts.

import type { Article } from '../types';

const article: Article = {
  slug: 'how-to-get-more-google-reviews',
  category: 'playbooks',
  kind: 'Playbook',
  title: 'How to get more Google reviews without begging (or breaking Google’s rules)',
  seoTitle: 'How to Get More Google Reviews (2026)',
  description:
    'Ask every customer right after the job with one link, then follow up once or twice. Timing, text templates by industry and the rules Google and the FTC enforce.',
  datePublished: '2026-11-06',
  dateModified: '2026-11-06',
  lastChecked: '2026-11-06',
  cover: {
    style: 'chat',
    messages: [
      { from: 'ai', text: 'Thanks for having us out today, Dana. Mind leaving a quick review? It helps a lot.' },
      { from: 'them', text: 'Done! Mike was great.' },
    ],
  },
  coverAlt: 'A text exchange where a business thanks a customer after a job and asks for a review, and the customer replies that it is done.',
  intro: [
    'To get more Google reviews, ask every customer, within a few hours of the job, with a direct link to your review form, and send one or two reminders until they click. Most businesses with few reviews aren’t doing anything wrong in the work; they just never ask consistently.',
    'The catch is that the obvious shortcuts are banned. Google removes reviews that came from selective asking or rewards, and in the US the FTC can fine businesses for buying or suppressing reviews. Below is the system that works inside the rules: when to ask, what to send, how to automate it, how to reply, and what to measure.',
  ],
  tldr: [
    'Ask every customer the same way, right after the job or visit. Selective asking ("only send the link to happy people") breaks Google’s policy.',
    'Use Google’s own review link or QR code from your Business Profile. One tap to the form beats "search for us on Google".',
    'Send the first text within a few hours, then one or two reminders that stop as soon as they click.',
    'No discounts, draws or freebies for reviews, and no hiding the bad ones. Both are banned by Google, and buying or suppressing reviews is banned by the FTC.',
    'Reply to every review, good and bad. It shows the next customer you are paying attention.',
  ],
  sections: [
    {
      id: 'why-few-reviews',
      heading: 'Why do some businesses get far more Google reviews than others?',
      paragraphs: [
        'It is rarely the quality of the work. The plumber with 600 reviews and the plumber with 12 often do the same job. The difference is that one of them asks every customer, every time, and makes it a one-tap job.',
        'Asking by hand doesn’t survive a busy week. The tech forgets, the front desk forgets, the owner means to send a batch on Friday and doesn’t. That is why review requests are one of the first things we automate for a client: the request goes out because the job was marked done, not because somebody remembered.',
        'Hamza runs the same system for Hexona. As of November 2026 our own Google profile sits at 74 reviews and a 4.8 rating, and AI drafts the replies to new reviews as they come in.',
      ],
    },
    {
      id: 'when-to-ask',
      heading: 'When is the best time to ask for a Google review?',
      paragraphs: [
        'Ask while the customer still remembers your name. For most service businesses that means the same day, triggered by the thing that proves the job is done.',
      ],
      table: {
        caption: 'When to send the first review request, by type of business. These are our starting points, not rules from Google.',
        columns: [
          { key: 'business', label: 'Business' },
          { key: 'trigger', label: 'Send it when' },
          { key: 'timing', label: 'First request' },
        ],
        rows: [
          { business: 'Plumbing, HVAC, electrical', trigger: 'The job is marked complete or the invoice is paid', timing: '1 to 3 hours after' },
          { business: 'Med spa, clinic', trigger: 'The appointment is marked showed', timing: 'Same evening (results may need a day)' },
          { business: 'Auto shop', trigger: 'The car is picked up', timing: '1 to 2 hours after' },
          { business: 'Restaurant, café', trigger: 'A loyalty visit or online order is completed', timing: 'Within the hour' },
          { business: 'Property management', trigger: 'A maintenance ticket is closed or a lease is signed', timing: 'Same day' },
          { business: 'Contractor, remodeler', trigger: 'Final walkthrough or final payment', timing: 'Same day, then again at 30 days' },
        ],
      },
      callout:
        'Use the job, not the mood, as the trigger. Filtering who gets the link by a satisfaction score or a "happy customer" tag is exactly the selective asking Google bans.',
    },
    {
      id: 'link-and-qr',
      heading: 'How do I get my Google review link and QR code?',
      paragraphs: [
        'Google gives every business on Business Profile a direct link and a QR code to its review form. According to Google’s help page (read Nov 6, 2026), you open your Business Profile, select Read Reviews, then choose "Get more reviews". Copy the link rather than typing it, and right-click the QR code to save the image. Google says review QR codes can only be generated in a computer browser, not on a phone.',
        'Then put it everywhere a happy customer already is:',
      ],
      bullets: [
        'In the review request text and email (the main one).',
        'On the invoice, receipt and job completion email.',
        'On a card the tech leaves on the counter, or a sign at the front desk or service counter.',
        'At the end of a chat or text conversation that solved a problem.',
      ],
    },
    {
      id: 'templates',
      heading: 'What should a review request text say?',
      paragraphs: [
        'Short, personal, one link. Use the customer’s name and the service they had. Don’t ask for "5 stars" and don’t tell them what to write. Type plain straight apostrophes in your texts: Twilio notes a single curly quote switches a text to an encoding with only 70 characters per message, so it can cost you extra segments. These are examples to adapt, not scripts to copy word for word:',
      ],
      table: {
        caption: 'Example review request texts by industry. Replace [link] with your Google review link.',
        columns: [
          { key: 'industry', label: 'Industry' },
          { key: 'first', label: 'First request' },
          { key: 'reminder', label: 'Reminder (2 to 3 days later, only if not clicked)' },
        ],
        rows: [
          {
            industry: 'HVAC, plumbing',
            first: 'Hi Dana, thanks for having us out today to fix the water heater. If you have a minute, a quick Google review helps other homeowners find us: [link]',
            reminder: 'Hi Dana, just a gentle nudge on that review if you get a second: [link]. Thanks again for choosing us.',
          },
          {
            industry: 'Med spa',
            first: 'Hi Priya, it was lovely seeing you today. If you have a moment, we\'d really appreciate a Google review: [link]',
            reminder: 'Hi Priya, hope you\'re happy with your results. Here\'s the review link again if you get a chance: [link]',
          },
          {
            industry: 'Auto shop',
            first: 'Hi Marcus, your Civic is all set. Thanks for trusting us with it. Would you leave us a quick Google review? [link]',
            reminder: 'Hi Marcus, here\'s that review link if you have a minute: [link]. Drive safe.',
          },
          {
            industry: 'Property management',
            first: 'Hi Jordan, the maintenance request at Unit 4B is closed. If the team took good care of you, a Google review helps us a lot: [link]',
            reminder: 'Hi Jordan, here\'s the review link again if you get a chance: [link]',
          },
        ],
      },
      callout:
        'Google’s policy now also bans asking staff to collect a set number of reviews, or reviews with specific content such as a staff member’s name. PPC Land reported the change on April 17, 2026, and it is on Google’s policy page as of Nov 6, 2026. Ask for an honest review, not a mention.',
    },
    {
      id: 'automate',
      heading: 'How do you automate Google review requests?',
      paragraphs: [
        'You need three things connected: the system that knows a job is done (your CRM, field-service software or booking tool), a texting and email sender, and your review link. When the job is marked complete, the request goes out; when the customer clicks, the reminders stop.',
      ],
      steps: [
        { title: 'Pick the trigger', detail: 'Job complete, invoice paid, appointment showed, or car picked up. Whatever proves the service happened.' },
        { title: 'Send the first request', detail: 'Text first, because it gets read. Add an email an hour later for customers who prefer it.' },
        { title: 'Follow up once or twice', detail: 'Two to three days apart, and only to people who haven’t clicked. Stop at two reminders.' },
        { title: 'Make sure you have permission to text', detail: 'Only text customers who gave you their number for updates about their service, and honor STOP replies immediately.' },
        { title: 'Reply to what comes in', detail: 'Every review, within a day or two. AI can draft replies, but a person should approve anything about a complaint.' },
      ],
    },
    {
      id: 'replying',
      heading: 'How should you reply to Google reviews, especially bad ones?',
      paragraphs: [
        'Reply to all of them. A short thank-you to a 5-star review takes ten seconds and shows the next person reading that someone is home.',
        'For a bad review, don’t argue in public and don’t promise anything you haven’t checked. Apologize for the experience, say you want to fix it, and give a direct way to reach a manager. Then actually call them. A complaint handled well often reads better than a wall of perfect scores.',
        'Hamza uses AI to reply to Hexona’s reviews, with one rule we set for every client too: anything negative waits for a human. AI is good at warm thank-yous and bad at deciding whether to offer a refund.',
      ],
    },
    {
      id: 'rules',
      heading: 'What are the rules for asking for Google reviews?',
      paragraphs: [
        'This is the part that gets reviews wiped, so it is worth being precise. Google’s Maps content policy treats these as fake engagement, and it removes the reviews and can restrict the profile:',
      ],
      bullets: [
        '**Selective asking (review gating).** Merchants must not selectively ask for positive reviews or discourage negative ones. A "were you happy?" step that sends only the happy people to Google breaks this.',
        '**Incentives.** No discounts, free services, gift cards or prize draws in exchange for a review, and nothing in exchange for changing or removing a negative one.',
        '**Reviews from inside the business.** Google bans content based on a conflict of interest, including current or former employment, so owners and staff reviewing their own business are out.',
        '**Staff quotas and scripted content.** Asking staff to collect a certain number of reviews, or reviews that say something specific, is listed as rating manipulation.',
      ],
    },
    {
      id: 'ftc',
      heading: 'What does the FTC fake reviews rule mean for a small business?',
      paragraphs: [
        'In the US, the FTC’s Trade Regulation Rule on the Use of Consumer Reviews and Testimonials (16 CFR Part 465) has been in effect since October 21, 2024. It bans fake reviews, paying or rewarding people for reviews that say something positive (or negative), undisclosed reviews from insiders, company-controlled "review" sites posing as independent, and review suppression. Suppression includes groundless legal threats, physical threats or intimidation to stop a negative review, and implying your review section shows all or most reviews when negative ones were suppressed. The FTC can seek civil penalties from businesses that knowingly break it.',
        'For a service business the practical version is simple: ask everyone, reward nobody, hide nothing, and never threaten a customer over a review. This is general information, not legal advice; if you are unsure about a specific practice, ask a lawyer.',
      ],
    },
    {
      id: 'measure',
      heading: 'What should you measure?',
      paragraphs: ['Four numbers tell you whether the system is working:'],
      figure: {
        kind: 'steps',
        caption: 'the review funnel to track each month',
        items: ['Requests sent', 'Links clicked', 'Reviews left', 'Replies posted'],
      },
      bullets: [
        '**Requests sent vs jobs completed.** Should be close to 100%. If it isn’t, the trigger is broken or someone is skipping it.',
        '**Click rate on the link.** If it is low, the message is too long or arrives too late.',
        '**New reviews per month.** Google says more reviews and positive ratings can help local ranking, and AI assistants quote them too (/blog/how-to-get-recommended-by-chatgpt).',
        '**Reply rate.** Every review answered, within a couple of days.',
      ],
    },
    {
      id: 'done-for-you',
      heading: 'Should you set this up yourself or have it built?',
      paragraphs: [
        'If you run one location and already have software that sends texts when a job closes, you can set this up in an afternoon. Where it gets harder is connecting the job system to the texting, handling reminders and opt-outs properly, and replying to every review without it eating your evenings.',
        'That is the job of an /ai-employees/ai-retention: review requests, replies, win-backs and repeat business, run for you. It is usually part of a bigger setup for a home services company (/industries/home-services) or a med spa (/industries/med-spas). If you want to see whether it would pay back for you, /book.',
      ],
    },
  ],
  faq: [
    {
      question: 'How do I get more Google reviews fast?',
      answer:
        'Ask every customer the same day the job is done, with a direct link to your Google review form, and send one or two reminders to anyone who hasn’t clicked. Automating the request off a job-complete or invoice-paid trigger is what makes it consistent.',
    },
    {
      question: 'Can I offer a discount for a Google review?',
      answer:
        'No. Google’s policy bans incentives such as payment, discounts and free goods or services in exchange for any review, and in the US the FTC’s 2024 rule bans rewarding reviews that express a particular sentiment. Reviews obtained that way can be removed.',
    },
    {
      question: 'Is it allowed to only ask happy customers for reviews?',
      answer:
        'No. Google prohibits selectively soliciting positive reviews or discouraging negative ones. Send the same request with the same link to every customer who received the service.',
    },
    {
      question: 'Where do I find my Google review link?',
      answer:
        'On a computer, open your Business Profile, select Read Reviews and choose "Get more reviews". Copy the link and save the QR code from there; Google says the QR code can only be generated in a computer browser.',
    },
    {
      question: 'Should I reply to every Google review?',
      answer:
        'Yes. A short thank-you for good reviews and a calm, specific reply to bad ones shows future customers you are paying attention. Take complaints offline with a direct contact and follow up.',
    },
    {
      question: 'How many reminders should I send for a review request?',
      answer:
        'One or two, two to three days apart, and only to people who haven’t clicked the link yet. More than that starts to feel like nagging and can cause opt-outs.',
    },
  ],
  sources: [
    {
      label: 'Google Maps, Prohibited & restricted content (fake engagement)',
      url: 'https://support.google.com/contributionpolicy/answer/7400114',
      note: 'Rules on selective solicitation, incentives, conflicts of interest, and staff review quotas and specific content. Read Nov 6, 2026.',
    },
    {
      label: 'Google Business Profile Help, Create a Google link or QR code to request reviews',
      url: 'https://support.google.com/business/answer/16816815',
      note: 'Where to find the review link and QR code, desktop only. Read Nov 6, 2026.',
    },
    {
      label: 'Google Business Profile Help, Tips to get more Google reviews',
      url: 'https://support.google.com/business/answer/7035772',
      note: 'Asking customers through a Google link or QR code, and replying to reviews. Read Nov 6, 2026.',
    },
    {
      label: 'Google Business Profile Help, Tips to improve your local ranking on Google',
      url: 'https://support.google.com/business/answer/7091',
      note: 'More reviews and positive ratings can help local ranking. Read Nov 6, 2026.',
    },
    {
      label: 'FTC, Federal Trade Commission announces final rule banning fake reviews and testimonials',
      url: 'https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials',
      note: 'Aug 14, 2024 release listing the banned practices; effective 60 days after Federal Register publication (Aug 22, 2024), which is Oct 21, 2024. Read Nov 6, 2026.',
    },
    {
      label: '16 CFR Part 465 (Cornell Legal Information Institute)',
      url: 'https://www.law.cornell.edu/cfr/text/16/part-465',
      note: 'Section list of the rule (89 FR 68077, Aug 22, 2024). Read Nov 6, 2026. The Federal Register page redirected to a bot check and was not read.',
    },
    {
      label: 'PPC Land, Google tightens Maps review policy: staff names and quotas now banned',
      url: 'https://ppc.land/google-tightens-maps-review-policy-staff-names-and-quotas-now-banned/',
      note: 'Report on the April 2026 policy update, published Apr 17, 2026. Read Nov 6, 2026.',
    },
    {
      label: 'Twilio Docs, What is UCS-2 character encoding?',
      url: 'https://www.twilio.com/docs/glossary/what-is-ucs-2-character-encoding',
      note: 'Any non GSM-7 character, such as a smart quote, switches a text to UCS-2. Read Nov 6, 2026.',
    },
  ],
  related: ['how-to-get-recommended-by-chatgpt', 'appointment-reminder-texts', 'missed-call-text-back'],
  queries: ['how to get more google reviews', 'google review automation', 'automated review requests', 'how to ask for google reviews', 'google review link'],
};

export default article;
