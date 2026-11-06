// Target: "hvac maintenance agreement" (1,300/mo US, DataforSEO Nov 6, 2026),
// "hvac service agreement", "hvac membership program", "recurring revenue
// service business".
// Published plan prices read Nov 6, 2026: Housecall Pro's HVAC service plan
// template ($175 a year or $16 a month, 2 visits); Champion Air's ChampionCare
// page ($23 a month for the first system, one AC and one heating tune-up, 15%
// off repairs, $0 diagnostic fees; a promotions page showed $19, so the page
// price is used and the discrepancy noted); One Hour Heating & Air Conditioning
// Las Vegas Club Membership ($19.99 a month per system, two tune-ups, 15% off
// repairs, 10% off indoor air quality products, 5% off equipment, priority
// service). ENERGY STAR's maintenance checklist for the spring/fall contractor
// check. Relay's HVAC valuation guide for the "single biggest driver" quote.
// No valuation premium percentage is quoted: the figures circulating online
// (often attributed to a ServiceTitan report) could not be verified.

import type { Article } from '../types';

const article: Article = {
  slug: 'hvac-maintenance-agreements',
  category: 'value',
  kind: 'Guide',
  title: 'HVAC maintenance agreements: how to price, sell and renew them',
  seoTitle: 'HVAC Maintenance Agreements: Price & Renew',
  description:
    'HVAC maintenance plans we found run $16 to $23 a month for two tune-ups and repair discounts. How to price, sell and auto-renew them, and why buyers value them.',
  datePublished: '2026-11-06',
  dateModified: '2026-11-06',
  lastChecked: '2026-11-06',
  cover: { style: 'stat', value: '$16 to $23', label: 'a month for two tune-ups, in published HVAC plans (Nov 2026)' },
  coverAlt: 'The figure $16 to $23 a month in large type, labelled as the range for two tune-ups in published HVAC maintenance plans.',
  intro: [
    'An HVAC maintenance agreement is a yearly plan where a homeowner pays a set fee, usually monthly, for two tune-ups (one for cooling, one for heating) plus perks like priority service and a repair discount. The published plans we looked at on Nov 6, 2026 ran from about $16 to $23 a month per system, or $175 a year paid upfront.',
    'For the HVAC company, the agreement is worth far more than the fee. It fills the shoulder seasons with booked work, turns one-off callers into customers who call you first, and builds the recurring revenue that buyers pay a premium for. The hard part isn’t selling the first year. It is the renewals and the visit scheduling, which is exactly where most programs quietly leak.',
  ],
  tldr: [
    'A typical plan: two tune-ups a year, priority scheduling, 10% to 15% off repairs, no or reduced diagnostic fees.',
    'Published prices we found: $16 a month or $175 a year (Housecall Pro’s template), $19.99 a month (One Hour, Las Vegas), $23 a month (Champion Air, Phoenix area).',
    'Sell it on every service call and every install, and make monthly payment the default.',
    'Most plans are lost at renewal and at visit booking. Automate both.',
    'Valuation guides treat maintenance agreements as one of the biggest drivers of an HVAC company’s sale price.',
  ],
  sections: [
    {
      id: 'what-is-it',
      heading: 'What is an HVAC maintenance agreement?',
      paragraphs: [
        'It is a service contract for preventive maintenance. The customer pays a fixed annual or monthly fee, and you commit to inspecting and tuning up their system on a schedule, usually before the cooling season and before the heating season. Companies call them maintenance agreements, service agreements, comfort clubs or memberships; they are the same thing.',
        'ENERGY STAR’s maintenance checklist recommends a contractor check of the cooling system each spring and the heating system each fall, which is why two visits a year is the standard design.',
      ],
    },
    {
      id: 'inclusions',
      heading: 'What should an HVAC maintenance plan include?',
      paragraphs: ['Across the published plans we read, the core is very consistent:'],
      bullets: [
        '**Two precision tune-ups a year**, cooling in spring and heating in fall, with a written checklist.',
        '**Priority scheduling**, so members get seen first in a heat wave or cold snap.',
        '**A repair discount**, most often 15% on repairs.',
        '**Waived or reduced diagnostic fees** on member service calls.',
        '**Smaller extras**, such as discounts on indoor air quality products or on replacement equipment.',
      ],
      callout:
        'Keep the plan simple enough that a tech can explain it in 30 seconds at the kitchen table. Three tiers is the most that homeowners will compare.',
    },
    {
      id: 'price',
      heading: 'How much do HVAC maintenance agreements cost?',
      paragraphs: [
        'Prices depend on your market, how many systems the home has and what you bundle. Here is what three published plans showed when we checked on Nov 6, 2026:',
      ],
      table: {
        caption: 'Published HVAC maintenance plan prices, read Nov 6, 2026. Prices change; check each page before quoting.',
        columns: [
          { key: 'plan', label: 'Plan' },
          { key: 'price', label: 'Price' },
          { key: 'includes', label: 'What it includes' },
        ],
        rows: [
          { plan: 'Housecall Pro HVAC service plan template', price: '$175 a year or $16 a month', includes: 'Two visits a year. A template contractors can adapt, not a live company plan.' },
          { plan: 'One Hour Heating & Air Conditioning, Las Vegas Club Membership', price: '$19.99 a month per system', includes: 'Two tune-ups and safety inspections, 15% off repairs, 10% off indoor air quality products, 5% off equipment, priority service' },
          { plan: 'Champion Air, ChampionCare (Phoenix area)', price: '$23 a month, first system', includes: 'One AC and one heating tune-up a year, 15% off repairs, $0 diagnostic fees, priority scheduling. A separate promotions page showed $19 a month.' },
        ],
      },
    },
    {
      id: 'how-to-price',
      heading: 'How do you price your own maintenance agreement?',
      paragraphs: [
        'Work backwards from the cost of delivering it, not from what the competitor down the road charges.',
      ],
      steps: [
        { title: 'Cost the two visits', detail: 'Tech time including drive time, materials like filters and coil cleaner, and the admin to book them.' },
        { title: 'Cost the discounts', detail: 'Estimate what 15% off repairs and waived diagnostic fees will cost you across a typical member’s year.' },
        { title: 'Add your margin', detail: 'The plan should make money on its own. The repair and replacement work it leads to is the upside, not the subsidy.' },
        { title: 'Default to monthly', detail: 'A monthly payment on a card feels small and renews without a decision. Offer an annual price as the option, not the default.' },
        { title: 'Price per system', detail: 'A home with two systems costs you two visits’ worth of time. Charge for it.' },
      ],
    },
    {
      id: 'selling',
      heading: 'How do you sell more maintenance agreements?',
      paragraphs: [
        'The best time to sell a plan is when the customer has just seen you fix something. Every service call and every install should end with the offer, framed around what they just went through: "If you were on the plan, today’s diagnostic would have been free and you’d have skipped the queue."',
        'Then follow up the ones who said "maybe". A text the next day with a one-tap sign-up link converts far better than a brochure on the counter. That follow-up is what our /ai-employees/ai-sales-follow-up does, alongside quotes and estimates.',
      ],
      bullets: [
        'Offer it at the end of every service call and every replacement, in the tech’s own words.',
        'Make the sign-up a link on their phone, not a paper form.',
        'Follow up "maybe" answers within a day, then once more a week later.',
        'Run a pre-season campaign to past customers who aren’t members yet.',
      ],
    },
    {
      id: 'renewals',
      heading: 'Why do maintenance agreements fail to renew?',
      paragraphs: [
        'Plans are usually lost in two quiet places. The visits never get booked, so the customer feels they paid for nothing. And the renewal arrives as a surprise charge or an expired card nobody chases.',
        'Both are follow-up problems, not sales problems, and both are easy to automate:',
      ],
      figure: {
        kind: 'steps',
        caption: 'the maintenance agreement year, automated',
        items: ['Sign-up link', 'Spring visit booked', 'Fall visit booked', 'Renewal reminder', 'Card updated', 'Renewed'],
      },
      bullets: [
        '**Book the visits for them.** Text members a few weeks before each season with two times to choose from. Our /ai-employees/ai-dispatcher fits the visits around the regular schedule.',
        '**Remind before the renewal.** A friendly text 30 days out listing what they got this year (two tune-ups, the repair discount they used) makes the renewal an easy yes.',
        '**Chase failed payments.** Expired cards are the most common cause of accidental cancellations. A text with a secure link to update the card fixes most of them.',
        '**Win back the lapsed.** Members who didn’t renew are your warmest list for the next pre-season campaign. That is the job of our /ai-employees/ai-retention.',
      ],
    },
    {
      id: 'value',
      heading: 'Why do buyers pay more for HVAC companies with maintenance agreements?',
      paragraphs: [
        'Because a maintenance agreement is revenue that is likely to come back next year without new marketing. Buyers price risk, and a documented base of customers who already pay you every month is the least risky revenue an HVAC company has. Relay’s HVAC valuation guide calls maintenance agreements "the single biggest driver" of where a business lands in its valuation range.',
        'You will see specific premiums quoted online, often attributed to industry reports. We couldn’t verify those figures against their original sources, so we’re not repeating them. What is consistent across broker and buyer guides is the direction: more recurring revenue, with good renewal rates and clean records, supports a higher multiple.',
        'That is why recurring revenue is one of the ten drivers in /score. If you want to see the other places an HVAC company loses money it already earned, /blog/what-is-revenue-leakage covers them.',
      ],
    },
    {
      id: 'next-step',
      heading: 'Where to start',
      paragraphs: [
        'If you don’t have a plan yet, write one simple tier, price it per system, default to monthly, and offer it on every call for a month. If you already have a few hundred members, look at your renewal rate and how many paid visits were never booked. That is usually the fastest money in the business.',
        'We set up the booking, renewal and win-back side for home service companies (/industries/home-services). If you want to talk it through, /book.',
      ],
    },
  ],
  faq: [
    {
      question: 'How much should an HVAC maintenance agreement cost?',
      answer:
        'Published plans we checked on Nov 6, 2026 ranged from $16 to $23 a month per system, or $175 a year paid upfront, for two tune-ups plus perks. Price your own plan from the cost of delivering the two visits and the discounts, plus a margin.',
    },
    {
      question: 'What is included in an HVAC maintenance plan?',
      answer:
        'Usually two tune-ups a year (cooling in spring, heating in fall), priority scheduling, a repair discount (often 15%), waived or reduced diagnostic fees, and sometimes discounts on air quality products or new equipment.',
    },
    {
      question: 'How often should an HVAC system be serviced?',
      answer:
        'ENERGY STAR’s maintenance checklist recommends a contractor check of the cooling system each spring and the heating system each fall, which is why most maintenance plans include two visits a year.',
    },
    {
      question: 'Should HVAC maintenance plans be monthly or annual?',
      answer:
        'Monthly is usually the better default. A small monthly charge feels easier to say yes to and renews without the customer having to make a new decision. Offer an annual price as an option.',
    },
    {
      question: 'How do I get more maintenance agreement renewals?',
      answer:
        'Book the seasonal visits for members so they feel the value, send a renewal reminder about 30 days out that lists what they used, chase failed card payments quickly, and run a win-back campaign to lapsed members before each season.',
    },
    {
      question: 'Do maintenance agreements increase the value of an HVAC business?',
      answer:
        'Yes. Buyers treat maintenance agreements as recurring revenue that lowers risk, and HVAC valuation guides describe them as one of the biggest drivers of the sale price, especially with strong renewal rates and clean records.',
    },
  ],
  sources: [
    {
      label: 'Housecall Pro, Service Plan Template for HVAC',
      url: 'https://help.housecallpro.com/en/articles/2463437-service-plan-template-for-hvac',
      note: 'Template plan: two visits, $175 a year or $16 a month. Read Nov 6, 2026.',
    },
    {
      label: 'One Hour Heating & Air Conditioning Las Vegas, Club Membership',
      url: 'https://www.onehourheatandair.com/las-vegas/about-us/club-membership/',
      note: '$19.99 a month per system and plan inclusions. Read Nov 6, 2026.',
    },
    {
      label: 'Champion Air, ChampionCare Maintenance Plan',
      url: 'https://www.championair.com/championcare',
      note: '$23 a month for the first system and plan inclusions; a promotions page showed $19. Read Nov 6, 2026.',
    },
    {
      label: 'ENERGY STAR, Maintenance checklist',
      url: 'https://www.energystar.gov/saveathome/heating-cooling/maintenance-checklist',
      note: 'Spring cooling and fall heating contractor checks. Read Nov 6, 2026.',
    },
    {
      label: 'Relay, HVAC business for sale valuation guide',
      url: 'https://relayfi.com/blog/hvac-business-for-sale-valuation-guide/',
      note: 'Maintenance agreements as the biggest driver of valuation range. Read Nov 6, 2026.',
    },
  ],
  related: ['hvac-business-valuation', 'appointment-reminder-texts', 'what-is-my-business-worth'],
  queries: ['hvac maintenance agreement', 'hvac service agreement', 'hvac membership program', 'hvac maintenance plan cost', 'recurring revenue service business'],
};

export default article;
