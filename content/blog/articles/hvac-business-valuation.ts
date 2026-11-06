// Target: "hvac business valuation" (110/mo US, DataforSEO Nov 6, 2026), "how much is
// my hvac business worth", "how to sell an hvac business". Deal multiples from
// Capstone Partners' HVAC Services M&A Update (July 2026) and PKF O'Connor Davies'
// US HVAC M&A Industry Update (Summer 2026); small business multiples from
// BizBuySell. Plumbing case is basis 'projected': only the waste found is quoted.

import type { Article } from '../types';

const article: Article = {
  slug: 'hvac-business-valuation',
  category: 'value',
  kind: 'Guide',
  title: 'HVAC business valuation: what drives the multiple in 2026',
  seoTitle: 'HVAC Business Valuation: What Drives It',
  description:
    'How HVAC companies are valued in 2026: what private equity is paying, why small shops sell for far less, and the five things that move an HVAC multiple most.',
  datePublished: '2026-11-06',
  dateModified: '2026-11-06',
  lastChecked: '2026-11-06',
  cover: {
    style: 'versus',
    left: 'Sells for less',
    right: 'Sells for more',
    rows: [
      ['Owner runs dispatch', 'Dispatch runs itself'],
      ['No service plans', 'Large plan base'],
      ['Books done at tax time', 'Monthly close'],
      ['Two techs hold it together', 'Trained, documented team'],
    ],
  },
  coverAlt: 'A two-column comparison of HVAC companies that sell for less and for more: owner-run dispatch versus dispatch that runs itself, no service plans versus a large plan base, and similar contrasts.',
  intro: [
    'Most HVAC businesses are valued as a multiple of earnings: smaller owner-run shops on seller’s discretionary earnings (SDE), larger ones on EBITDA. Capstone Partners puts the average for HVAC services deals at 9.5x EBITDA from 2024 to mid-2026, but that is the top of the market; a small residential shop that depends on its owner sells for a fraction of that.',
    'The gap between those two numbers is the opportunity. Private equity has been buying HVAC companies for years because the work is steady and a lot of it recurs. The shops that get the strong offers are the ones that look like they will keep running after the founder leaves.',
    'This is a guide to how buyers think, not a valuation of your company. For a real number, talk to a broker or a valuation professional who knows HVAC.',
  ],
  tldr: [
    'Capstone Partners reports HVAC services deals averaged 9.5x EV/EBITDA from 2024 to year to date 2026, down from 13.3x in 2021 to 2023.',
    'PKF O’Connor Davies puts the range at roughly 6x to 8x EBITDA, and higher for companies with real scale.',
    'Small owner-run shops trade on SDE at far lower multiples. The BizBuySell all-industry average is 2.58x cash flow.',
    'The biggest levers: a maintenance agreement base, a commercial service mix, technician retention, owner independence and clean books.',
  ],
  sections: [
    {
      id: 'market',
      heading: 'What are HVAC businesses selling for in 2026?',
      paragraphs: [
        'There are really two HVAC markets, and mixing them up is how owners end up disappointed.',
        'The first is the deal market that gets reported: companies large enough for private equity platforms and big strategic buyers. Capstone Partners’ July 2026 HVAC services update reports average multiples of 2.0x revenue and 9.5x EBITDA across 2024 to year to date 2026, down from 13.3x EBITDA in the 2021 to 2023 run. PKF O’Connor Davies’ summer 2026 update describes a range of roughly 6x to 8x EBITDA, and more for businesses with critical scale.',
        'The second is the Main Street market: one to ten trucks, owner on the tools or on the phone, priced on SDE and often bought by an individual with an SBA loan. Those businesses trade far lower. BizBuySell’s average across all industries is 2.58x cash flow for sales from Q3 2021 through Q2 2026.',
      ],
      table: {
        caption: 'The two HVAC markets, from the sources below (read Nov 6, 2026).',
        columns: [
          { key: 'market', label: 'Market' },
          { key: 'buyer', label: 'Typical buyer' },
          { key: 'earnings', label: 'Priced on' },
          { key: 'multiple', label: 'Reported multiples' },
        ],
        rows: [
          { market: 'Larger HVAC services companies', buyer: 'Private equity platforms, large strategics', earnings: 'EBITDA', multiple: '9.5x average, 2024 to YTD 2026 (Capstone); about 6x to 8x and up (PKF O’Connor Davies)' },
          { market: 'Owner-run residential shops', buyer: 'Individual buyers, local competitors, add-on buyers', earnings: 'SDE', multiple: 'BizBuySell all-industry average 2.58x cash flow' },
        ],
      },
      callout:
        'The reported deal multiples come from companies big enough to publicize their sales. They are a ceiling for what is possible with scale and systems, not a quote for a five-truck shop.',
    },
    {
      id: 'why-pe',
      heading: 'Why is private equity buying so many HVAC companies?',
      paragraphs: [
        'Because the work does not go away. Systems break in every season, equipment has to be replaced, and a lot of homeowners and building owners pay every year for maintenance. To an investor that looks like dependable cash flow in a market full of small owners who are getting close to retirement.',
        'Capstone counts 92 announced or completed HVAC services deals in its latest period, with total volume down 4.2% year over year, and financial sponsors holding steadier than strategic buyers. The buying has cooled from the peak, which is why multiples came down, but it hasn’t stopped.',
        'For an owner, the practical point is that the buyers paying the most are paying for systems and recurring revenue. Trucks and a phone number are the cheap part.',
      ],
    },
    {
      id: 'drivers',
      heading: 'What drives an HVAC company’s multiple?',
      paragraphs: [
        'Two HVAC companies with the same profit can get very different offers. These are the five things that explain most of the gap.',
      ],
      steps: [
        { title: 'Maintenance agreement base', detail: 'A large book of active service plans is the closest thing HVAC has to subscription revenue. It also feeds repair and replacement work. Buyers will ask how many plans you have, the renewal rate and how many renew automatically.' },
        { title: 'Service mix', detail: 'Steady service and maintenance work is valued above lumpy new construction. Commercial service contracts are valued for their stability; heavy dependence on one builder or one property manager is a risk.' },
        { title: 'Technician retention', detail: 'Techs are the scarce resource. A team that stays, with documented training and clear pay plans, is worth more than one that turns over every season.' },
        { title: 'Owner independence', detail: 'If you dispatch, quote every replacement and take the after-hours calls, a buyer is pricing what happens when you stop. The full playbook is in /blog/how-to-make-your-business-run-without-you.' },
        { title: 'Clean, monthly books', detail: 'Job costing by service line, monthly financials closed on time, and add-backs you can document. Messy books lower offers and slow deals down.' },
      ],
    },
    {
      id: 'leaks',
      heading: 'Where do HVAC companies lose value without noticing?',
      paragraphs: [
        'In our work, the same leaks show up in almost every service business, and they hit HVAC hard because demand spikes with the weather.',
      ],
      bullets: [
        '**Missed calls in peak season.** The first hot week of summer, the phones ring while every tech is on a job. A missed call is usually a lost job. An AI receptionist answers every call, triages emergencies and books the visit (/ai-employees/ai-receptionist).',
        '**Scheduling by hand.** At one plumbing and field service company we worked with, the scheduler spent 3 to 4 hours a day building a week that software should have built, part of $23,400 a month in operational waste found before the build (/evidence/plumbing-field-service-platform).',
        '**Service plans that lapse.** Plans that renew only when someone remembers to call. Automated renewals and reminders protect the base buyers pay for.',
        '**Replacement estimates nobody follows up.** A high-ticket quote that goes quiet is revenue you already spent money to create.',
      ],
    },
    {
      id: 'prepare',
      heading: 'How should you prepare an HVAC business for sale?',
      paragraphs: [
        'Start two to three years out if you can, because the things that raise the multiple take time to show up in your numbers.',
      ],
      bullets: [
        'Grow the maintenance plan base and make renewals automatic.',
        'Take yourself out of dispatch, quoting and after-hours calls, and write down the rules you use.',
        'Close the books every month, with job costing you can defend.',
        'Put every customer, plan and job history in one system, not in your phone.',
        'Fix the leaks above, so the earnings a buyer sees are the earnings the business can actually produce.',
      ],
      callout:
        'Not sure where to start? Take the Enterprise Value Score at /score. It rates your business on the 10 drivers buyers look at and shows your two biggest gaps.',
    },
    {
      id: 'help',
      heading: 'Where does Hexona fit?',
      paragraphs: [
        'We don’t value or broker businesses. We build and run the AI employees that fix the leaks above: answering every call, following up every estimate, keeping service plans renewing and taking scheduling off the owner’s plate. You can see how that works for HVAC and plumbing companies at /industries/home-services, or /book to talk through your numbers.',
      ],
    },
  ],
  faq: [
    {
      question: 'How much is my HVAC business worth?',
      answer:
        'Most HVAC businesses are worth a multiple of their earnings. Larger companies sold to private equity have averaged around 9.5x EBITDA from 2024 to mid-2026, according to Capstone Partners, while small owner-run shops trade on seller’s discretionary earnings at much lower multiples. A broker or valuation professional can give you a real number.',
    },
    {
      question: 'What multiple do HVAC companies sell for?',
      answer:
        'Reported multiples for HVAC services deals averaged 9.5x EV/EBITDA from 2024 to year to date 2026, down from 13.3x in 2021 to 2023 (Capstone Partners, July 2026). PKF O’Connor Davies describes roughly 6x to 8x EBITDA, higher with scale. Smaller shops priced on SDE sell for much less.',
    },
    {
      question: 'Do maintenance agreements increase the value of an HVAC company?',
      answer:
        'Yes. A base of active, auto-renewing maintenance plans gives a buyer revenue that shows up next year without a new sale, plus a steady source of repair and replacement work. Buyers will ask for the number of plans, the renewal rate and how many renew automatically.',
    },
    {
      question: 'Who buys HVAC companies?',
      answer:
        'Private equity-backed platforms and large strategic buyers acquire established HVAC companies, often as add-ons to a regional platform. Smaller shops are more often bought by individuals, local competitors or managers inside the business, frequently with SBA financing.',
    },
    {
      question: 'How do I sell my HVAC business for more?',
      answer:
        'Make the earnings look safe: grow and automate your maintenance plan base, take yourself out of dispatch and quoting, keep good techs, close your books monthly and stop the leaks like missed calls and lapsed plans. Start two to three years before you plan to sell.',
    },
    {
      question: 'Is the Enterprise Value Score a valuation of my HVAC company?',
      answer:
        'No. It scores your business out of 100 on the 10 drivers buyers look at and shows your two biggest gaps. It tells you what to fix, not what the business would sell for.',
    },
  ],
  sources: [
    {
      label: 'Capstone Partners, HVAC Services M&A Update (July 2026)',
      url: 'https://www.capstonepartners.com/insights/article-hvac-services-ma-update/',
      note: '2.0x EV/revenue and 9.5x EV/EBITDA average for 2024 to YTD 2026, down from 13.3x in 2021 to 2023; 92 transactions, volume down 4.2% year over year. Read Nov 6, 2026.',
    },
    {
      label: 'PKF O’Connor Davies, US HVAC M&A Industry Update (Summer 2026)',
      url: 'https://www.pkfod.com/insights/u-s-hvac-ma-industry-update-summer-2026/',
      note: 'Range of roughly 6x to 8x EBITDA and greater for businesses with critical scale. Read Nov 6, 2026.',
    },
    {
      label: 'BizBuySell, Business valuation multiples by industry',
      url: 'https://www.bizbuysell.com/learning-center/industry-valuation-multiples/',
      note: 'All-sector average of 2.58x cash flow for sales from Q3 2021 through Q2 2026. Read Nov 6, 2026.',
    },
    {
      label: 'Hexona case study: plumbing and field services',
      url: 'https://www.hexonasystems.com/evidence/plumbing-field-service-platform',
      note: 'Waste quantified before the build ($23,400 a month, including 3 to 4 hours a day of scheduling). Results still being measured. Checked Nov 6, 2026.',
    },
  ],
  related: ['hvac-maintenance-agreements', 'what-is-my-business-worth', 'how-to-make-your-business-run-without-you'],
  queries: ['hvac business valuation', 'how much is my hvac business worth', 'how to sell an hvac business', 'hvac company valuation multiples'],
};

export default article;
