import type { EngagementRecord } from './evidence';

/**
 * ⚠️⚠️ SAMPLE DATA. NOT REAL ENGAGEMENTS. DELETE BEFORE LAUNCH. ⚠️⚠️
 *
 * These exist for ONE reason: the library, its industry shelves and the record
 * pages cannot be reviewed while RECORDS is empty, because the filter hides
 * itself when there is nothing to filter. They are here so the design can be
 * judged, and for no other purpose.
 *
 * Every slug is prefixed `sample-` so a stray link is obvious, and the guard
 * below makes it impossible to deploy them: a build on Vercel throws before it
 * can produce a page. Local builds are unaffected, so `npm run verify` still
 * works while these are in place.
 *
 * TO REMOVE: delete this file and the one import line in content/evidence.ts.
 * Nothing else refers to it.
 *
 * §5 is not suspended by any of this. A real record still has to clear all
 * seven requirements on /evidence, and these clear none of them: no client has
 * consented to them, because no client exists.
 */

if (process.env.VERCEL) {
  throw new Error(
    'content/evidence.samples.ts is still imported. These are placeholder engagement records ' +
      'and must never be published. Delete the file and its import in content/evidence.ts.',
  );
}

export const SAMPLE_RECORDS: EngagementRecord[] = [
  {
    slug: 'sample-automotive-retail',
    index: 'SAMPLE',
    industry: 'automotive',
    sector: 'Multi-site automotive retail',
    region: 'Ontario',
    year: '2026',
    revenue: '$41M',
    headcount: '180 staff, 6 locations',
    found: '$1.9M',
    sealed: '$1.1M',
    payback: '7 weeks',
    title: 'Six locations, one phone queue, and nobody owned the overflow.',
    situation: [
      'Sample text. A six-site dealer group routed all inbound calls to a shared queue that overflowed to voicemail after four rings.',
      'Sample text. Nobody was accountable for the overflow box, and the CRM recorded an abandoned call and a returned call identically.',
    ],
    whatWeFound: [
      { leak: 'Inbound calls abandoned before answer', annualised: '$1.1M' },
      { leak: 'Test drive requests never assigned', annualised: '$520K' },
      { leak: 'Service quotes not followed up', annualised: '$280K' },
    ],
    whatWeBuilt: [
      'Sample text. Routing rules with a named owner per location and per hour.',
      'Sample text. An overflow queue that escalates rather than terminating in voicemail.',
      'Sample text. A daily report of unassigned inbound, sent to the general manager.',
    ],
    whatChanged: [
      { metric: 'Calls answered under 60s', before: '54%', after: '91%' },
      { metric: 'Unassigned inbound per week', before: '210', after: '18' },
    ],
    verification:
      'Sample text. Measured in the client CRM and telephony platform over the twelve weeks following go-live, against the same twelve weeks of the prior year.',
    consentOnFile: true,
  },
  {
    slug: 'sample-hvac-contracting',
    index: 'SAMPLE',
    industry: 'home-services',
    sector: 'Regional HVAC contracting',
    region: 'Texas',
    year: '2026',
    revenue: '$23M',
    headcount: '140 staff',
    found: '$880K',
    sealed: '$510K',
    payback: '11 weeks',
    title: 'The follow-up sequence stopped on day four because its author left.',
    situation: [
      'Sample text. Quotes above a threshold received a five-touch follow-up sequence. Below it, they received one email.',
      'Sample text. The threshold had been set three years earlier and never revisited as average job value rose past it.',
    ],
    whatWeFound: [
      { leak: 'Quotes under threshold, single touch', annualised: '$540K' },
      { leak: 'Seasonal maintenance not reactivated', annualised: '$340K' },
    ],
    whatWeBuilt: [
      'Sample text. A follow-up sequence keyed to job value rather than a fixed threshold.',
      'Sample text. Reactivation triggered from service history rather than a manual list.',
    ],
    whatChanged: [
      { metric: 'Quote-to-close rate', before: '19%', after: '27%' },
      { metric: 'Reactivated maintenance contracts', before: '61', after: '184' },
    ],
    verification:
      'Sample text. Measured in the client field service platform over one full seasonal cycle, against the equivalent cycle in the prior year.',
    consentOnFile: true,
  },
  {
    slug: 'sample-medspa-group',
    index: 'SAMPLE',
    industry: 'health',
    sector: 'MedSpa group, nine locations',
    region: 'Florida',
    year: '2026',
    revenue: '$16M',
    headcount: '95 staff',
    found: '$640K',
    sealed: '$390K',
    payback: '9 weeks',
    title: 'Consultations were booked, confirmed, and then quietly not rebooked.',
    situation: [
      'Sample text. Consultations converted well. What failed was the rebooking of the treatment course afterwards, which depended on whichever practitioner remembered.',
    ],
    whatWeFound: [
      { leak: 'Courses not rebooked after consultation', annualised: '$410K' },
      { leak: 'No-shows never re-contacted', annualised: '$230K' },
    ],
    whatWeBuilt: [
      'Sample text. Rebooking prompted at point of consultation rather than afterwards.',
      'Sample text. Automated no-show recovery within two hours of the missed slot.',
    ],
    whatChanged: [
      { metric: 'Course rebooking rate', before: '43%', after: '68%' },
      { metric: 'No-shows recovered', before: '8%', after: '34%' },
    ],
    verification:
      'Sample text. Measured in the client booking system over sixteen weeks following go-live, against the preceding sixteen weeks.',
    consentOnFile: true,
  },
];
