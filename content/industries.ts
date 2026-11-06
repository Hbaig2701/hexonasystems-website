/**
 * content/industries.ts — the industries Hexona builds AI employees for.
 *
 * An industry with a `page` gets /industries/<slug>. The rest are listed, and
 * link, once their page is written. Proof points quote content/evidence.ts.
 */

import type { Faq } from './faqs';
import type { Demo, ProofPoint } from './employees';

export interface IndustryPage {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  answer: string;
  intro: string;
  demo?: Demo;
  problems: { title: string; text: string }[];
  /** Which AI employees fit, in order, with the reason for this industry. */
  team: { slug: string; why: string }[];
  proof: ProofPoint[];
  faqs: Faq[];
}

export interface Industry {
  slug: string;
  name: string;
  page?: IndustryPage;
}

export const INDUSTRY_LIST: Industry[] = [
  {
    slug: 'construction',
    name: 'Construction and contractors',
    page: {
      metaTitle: 'AI for Construction Companies and Contractors',
      metaDescription:
        'AI employees for construction companies and contractors: answer every enquiry, follow up every estimate, and automate approvals and paperwork. Built and run by Hexona.',
      h1: 'AI employees for construction companies and contractors.',
      answer:
        'Construction companies use AI employees to answer every enquiry while the team is on site, follow up every estimate until it is signed, and move approvals and paperwork without anyone chasing them. Hexona builds them into the systems you already use and runs them for you.',
      intro:
        'Contractors rarely lose work because they are bad at the job. They lose it in the office: the call nobody picked up, the estimate nobody followed up, the contract waiting on a signature for a week. Those are exactly the jobs AI does well.',
      demo: {
        title: 'Estimate follow-up · Day 3',
        icon: 'bolt',
        messages: [
          { from: 'ai', text: 'Hi Sarah, just checking you got the kitchen estimate we sent Monday. Any questions I can answer?' },
          { from: 'caller', text: 'We did. Is the start date flexible? We’re away the first week of May.' },
          { from: 'ai', text: 'Yes. We can start May 12th instead. Want me to send the contract with that date?' },
          { from: 'caller', text: 'Perfect, please do.' },
        ],
        outcome: 'Contract sent for signature · Project manager notified',
      },
      problems: [
        { title: 'Calls missed on site', text: 'The phone rings while everyone is on a roof or in a basement. The caller rings the next contractor.' },
        { title: 'Estimates that go quiet', text: 'A quote goes out and nobody follows up. The homeowner signs with whoever called back first.' },
        { title: 'Approvals that stall', text: 'Forms, signatures and change orders wait on somebody remembering to chase them, and the job slips.' },
        { title: 'Admin that eats the week', text: 'Sales and project staff spend hours on paperwork instead of selling and running jobs.' },
      ],
      team: [
        { slug: 'ai-receptionist', why: 'Answers every enquiry while the crew is on site, qualifies the job and books the site visit.' },
        { slug: 'ai-sales-follow-up', why: 'Follows up every estimate by text and email until it is signed, and revives the old ones.' },
        { slug: 'ai-office-admin', why: 'Sends the forms, collects signatures and moves each job to the next stage automatically.' },
        { slug: 'ai-dispatcher', why: 'Keeps crews and subcontractors scheduled, and handles the reschedules.' },
      ],
      proof: [
        { figure: '41%', label: 'fewer project delays, with estimate-to-approval 44% faster and close rate up 18%', sector: 'Renovation contractor', caseSlug: 'construction-project-pipeline' },
        { figure: '$45,000+', label: 'added monthly revenue, with sales admin cut from 18 to 3.5 hours a week', sector: 'Roofing and remodelling', caseSlug: 'home-improvement-sales-workflow' },
        { figure: '$24,500', label: 'net profit recovered from a database of homeowners nobody had followed up', sector: 'Residential solar', caseSlug: 'solar-dormant-database' },
      ],
      faqs: [
        {
          question: 'Will it work with the software we already use?',
          answer: 'Usually, yes. We connect to the CRM, estimating, calendar and phone systems you already run, so your team keeps working where it works now. If something has no way to connect, we tell you before we start rather than after.',
        },
        {
          question: 'Our jobs are complicated. Can AI really answer customer questions?',
          answer: 'It answers the questions that come up every day: what you do, where you work, availability, and what happens next. Anything that needs judgement, such as pricing a complex job, is handed to a person with the details already collected.',
        },
        {
          question: 'Does this replace my office staff?',
          answer: 'No. It takes the chasing, copying and calling back off them, so the same team can run more jobs. One renovation contractor we worked with grew to more than 27 active projects without adding admin staff.',
        },
        {
          question: 'How does this increase what my company is worth?',
          answer: 'Buyers pay more for a contractor whose pipeline, follow-up and paperwork run on systems rather than on the owner. Faster approvals and a higher close rate lift earnings, and a business that runs without you earns a better multiple.',
        },
        {
          question: 'How long does it take to set up?',
          answer: 'It depends on how many systems are involved. We map it on the free consult and give you a fixed scope and timeline before any work starts.',
        },
      ],
    },
  },
  { slug: 'home-services', name: 'Plumbing, HVAC and home services' },
  { slug: 'med-spas', name: 'Med spas and clinics' },
  { slug: 'property-management', name: 'Property management' },
  { slug: 'automotive', name: 'Automotive' },
  { slug: 'hospitality', name: 'Hospitality' },
];

export const industriesWithPages = () => INDUSTRY_LIST.filter((i) => i.page);
export const getIndustry = (slug: string) => INDUSTRY_LIST.find((i) => i.slug === slug);
