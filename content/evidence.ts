/**
 * content/evidence.ts — the case study library, and the §5 gate above it.
 *
 * ── TWO CLASSES, AND THEY ARE NOT THE SAME THING ──────────────────────────
 *
 * The INDUSTRIES note below used to pose a fork: either these verticals hold
 * ENGAGEMENT RECORDS and §5 holds and most shelves stay bare, or they hold a
 * separate class of case study with its own stated bar, kept visibly apart.
 * That fork is now resolved, because ten real case studies arrived and not one
 * of them could be an engagement record.
 *
 *   ENGAGEMENT RECORD (`EngagementRecord`, `RECORDS`) — the strict class. A
 *   $3M-$15M client, annualised leakage found, annualised recovery MEASURED
 *   and smaller than what was found, a payback window, a named verification
 *   system, written consent. Still empty. Still §5. Do not relax it.
 *
 *   CASE STUDY (`CaseStudy`, `CASE_STUDIES`) — implementation work. What was
 *   leaking, what got built, what changed, and how that was measured. It makes
 *   no revenue claim about the client, because no source document carries one.
 *
 * This is consistent with what the site already says rather than a retreat
 * from it. LEAKAGE_SCALE states plainly that the 500-plus businesses audited
 * span every size and that most of them are smaller than the operating range
 * the diagnostic is sold into. These case studies are that population. The
 * diagnostic is still sold at $3M-$15M and an engagement record still means
 * one specific thing.
 *
 * ⚠️ WHAT IS ABSENT HERE, AND WHY IT WAS NOT INVENTED:
 *
 *   revenue, headcount  — no source document states either, for any of the
 *                         ten. Not one. So the field does not exist on
 *                         CaseStudy and the column is not on the table.
 *   payback             — needs the fee paid, which the documents do not give.
 *   client names        — three documents name the client. Consent to publish
 *                         is not established, so every record here is
 *                         anonymised. Set `clientName` on any one where the
 *                         client has agreed in writing, and the page uses it.
 *
 * ⚠️ `basis` IS LOAD-BEARING. Three of these ten shipped and have not been
 * measured yet; their own source documents say so in as many words. They
 * publish as `projected`, which the table states in place of a result and which
 * the record page states four separate times. Never move one to `measured`
 * without the post-implementation figures.
 */

export interface CaseStudy {
  slug: string;
  index: string;
  /** Which library shelf it sits on. Must be an INDUSTRIES id. */
  industry: IndustryId;
  /** Specific enough to be recognised. "Regional HVAC contracting", not "B2B". */
  sector: string;
  region?: string;

  /**
   * 'measured'  — figures come from a named system, after implementation.
   * 'projected' — the build shipped and nothing has been measured against it
   *               yet. Every forward-looking figure is modelled, and the page
   *               says so rather than letting the reader assume otherwise.
   */
  basis: 'measured' | 'projected';

  /** The one figure that leads the page. */
  headline: { figure: string; label: string };
  /**
   * What was being lost, as the source document quantified it. This is the
   * table cell, so it can be a phrase: "8 to 12 hours a week chasing paperwork".
   */
  found?: string;
  /**
   * ⚠️ THE SAME LEAK, COMPACT. The record page sets this at display size in a
   * figure block, where a phrase wraps to five lines and destroys the block.
   * Keep it to a figure and a unit. Set it whenever `found` is set.
   */
  foundFigure?: string;
  /** What came back. Only ever set on a 'measured' study. */
  result?: string;
  /** The window the result was measured over, where the document states one. */
  window?: string;

  /** The finding, as one sentence. Becomes the H1. */
  title: string;
  situation: string[];
  /** `figure` is optional: some leaks in these documents are real but unpriced. */
  whatWeFound: { leak: string; figure?: string }[];
  whatWeBuilt: string[];
  /** Genuine before-and-after pairs only. Deltas without a baseline go in `outcomes`. */
  whatChanged?: { metric: string; before: string; after: string }[];
  outcomes: string[];
  /**
   * How it was measured, in which system, over what period — and, just as
   * importantly, which figures were NOT measured. Never omit, never soften.
   * This paragraph is what separates a case study from a testimonial.
   */
  verification: string;
  /** Set only where the client has approved being named. Anonymised otherwise. */
  clientName?: string;
  /**
   * ⚠️ THE <title>, AND IT HAS A HARD BUDGET. The layout appends
   * " · Hexona Systems" (17 characters) and search truncates the whole thing
   * around 60, so keep this at 45 or under. It carries the sector and the
   * outcome, because "solar case study" is the query and `title` below is a
   * full sentence that blew the budget on its own.
   */
  metaTitle?: string;
}

/**
 * The strict class. See the header. Every field is required and §5 governs it.
 */
export interface EngagementRecord {
  slug: string;
  index: string;
  industry: IndustryId;
  sector: string;
  region: string;
  year: string;
  /** Formatted, e.g. "$34M". Must be ≥ $3M. */
  revenue: string;
  headcount: string;
  /** Annualised leakage identified during the diagnostic. */
  found: string;
  /** Annualised recovery measured after implementation. Always less than found. */
  sealed: string;
  payback: string;
  title: string;
  situation: string[];
  whatWeFound: { leak: string; annualised: string }[];
  whatWeBuilt: string[];
  whatChanged: { metric: string; before: string; after: string }[];
  /** How it was measured, over what period, in which system. Never omit. */
  verification: string;
  consentOnFile: boolean;
}

/**
 * THE LIBRARY SHELVES.
 *
 * ⚠️ "Home Services & C..." was truncated in the source and guessed as
 * Construction. Four of the ten case studies now sit on it, all of them
 * construction, plumbing, roofing or solar, so the guess held. Correct it here
 * if it is still wrong and every reference follows.
 *
 * `agencies` currently holds nothing and is therefore never offered as a
 * filter. That is deliberate, not a bug: see populatedIndustries().
 */
export const INDUSTRIES = [
  { id: 'home-services', label: 'Home Services & Construction' },
  { id: 'agencies', label: 'Agencies' },
  { id: 'hospitality', label: 'Restaurant & Hospitality' },
  { id: 'coaching', label: 'Coaching & Consultants' },
  { id: 'health', label: 'MedSpa & Health' },
  { id: 'automotive', label: 'Automotive' },
] as const;

export type IndustryId = (typeof INDUSTRIES)[number]['id'];

export function industryLabel(id: string): string | undefined {
  return INDUSTRIES.find((i) => i.id === id)?.label;
}

/* ===========================================================================
   HOW TO ADD A CASE STUDY

   Copy an entry below, fill it in, save. Everything downstream is automatic:
   the row appears on /evidence, its shelf joins the industry filter, the
   filter appears at all once two shelves hold something, /evidence/<slug>
   becomes a full page, and the sitemap picks it up.

   `industry` must be one of the INDUSTRIES ids: home-services, agencies,
   hospitality, coaching, health, automotive. TypeScript rejects anything else,
   which is deliberate: a typo would silently create an invisible record.

   THE ONLY HARD RULES, AND THEY ARE THE POINT OF THE PAGE:
     · `verification` names the system and the period, and names anything in
       the record that was estimated rather than measured.
     · `basis: 'projected'` for anything not yet measured. It is not a weaker
       version of 'measured', it is a different claim.
     · Never state a figure the source document does not contain.
   ======================================================================== */

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'solar-dormant-database',
    metaTitle: 'Solar: $24,500 from a dormant database',
    index: '01',
    industry: 'home-services',
    sector: 'Residential solar installation',
    region: 'Multi-state, United States',
    basis: 'measured',
    headline: { figure: '$24,500', label: 'Net profit recovered' },
    found: '4,000+ dormant leads',
    foundFigure: '4,000+',
    result: '$24,500 net profit',
    window: 'Under three weeks',

    title: 'Four thousand homeowners had raised their hand and nobody had gone back to them.',

    situation: [
      'A regional solar installation company selling to residential homeowners across several states. Over the years it had accumulated more than four thousand leads: homeowners who had shown clear interest in going solar and never completed the purchase.',
      'The sales team was pointed at new inbound enquiries and paid traffic, so the older segment went untouched. The records held little more than a name, a phone number and a state, with no segmentation, and re-engaging them by hand would have taken dozens of hours a week. Fresh leads won that trade every time, so the list sat there for years while the company carried on paying to acquire new ones.',
    ],

    whatWeFound: [
      { leak: 'Prior enquiries sitting behind no follow-up system at all', figure: '4,000+ contacts' },
      { leak: 'New leads being bought while a high-intent list went unworked' },
      { leak: 'No workflow separating qualified homeowners from cold contacts' },
    ],

    whatWeBuilt: [
      'A reactivation workflow that imported the dormant list and sent a tailored wake-up message built to draw a reply within minutes',
      'An agent that took over from the first reply and handled the three objections that came up most: whether the homeowner still qualified, whether a rebate was still available, and what it would cost',
      'Qualification folded into that same conversation, covering interest, location, home ownership, credit readiness and timeline',
      'Automatic booking into the existing calendar, with pre-call instructions and reminders to protect the show rate',
      'A sequenced follow-up for people who did not reply, and a long-term nurture track for anyone not ready yet',
    ],

    whatChanged: [{ metric: 'Cost per sale', before: '$206 industry average', after: '$90' }],

    outcomes: [
      '832 dormant contacts re-engaged, at a 21% reply rate',
      '38 appointments booked in under three weeks',
      'Over $28,000 in gross margin, and $24,500 in net profit',
      'No manual outreach from the sales team at any point in the campaign',
    ],

    verification:
      'Replies, appointments and closed revenue were counted in the client GoHighLevel instance across the three weeks the campaign ran. The $206 comparison is a published solar industry average for cost per sale, not a figure measured in this engagement.',
  },

  {
    slug: 'coffee-loyalty-programme',
    metaTitle: 'Coffee retail: $312,000 from loyalty',
    index: '02',
    industry: 'hospitality',
    sector: 'Multi-location speciality coffee retail',
    region: 'Phoenix, Arizona',
    basis: 'measured',
    headline: { figure: '$312,000', label: 'Revenue attributed to the programme' },
    found: '3 in 4 first-time customers never returning',
    foundFigure: '3 in 4',
    result: '$312,000 attributed revenue',
    window: 'Eight months',

    title: 'Three quarters of first-time customers never came back, and nobody knew who any of them were.',

    situation: [
      'Eight speciality coffee locations across Phoenix, known for their roasts and their room, with a genuinely loyal following and a retention problem underneath it. The loyalty scheme was a paper punch card.',
      'Around a third of those cards were lost inside thirty days, which meant a steady stream of replacement requests and disputes for staff to manage. Because nothing was recorded anywhere, the business had no idea who its best customers were, when anyone had last come in, or how to reach someone who had quietly stopped visiting.',
    ],

    whatWeFound: [
      { leak: 'Loyalty cards lost within thirty days', figure: '~30%' },
      { leak: 'First-time customers who never returned', figure: '3 in 4' },
      { leak: 'Customer records held anywhere in the business', figure: 'None' },
      { leak: 'Staff time lost to manual punch tracking and lost-card disputes' },
    ],

    whatWeBuilt: [
      'QR stations at every register for a ten-second signup, with the card delivered by text and no app to download, and 1,200 existing paper balances imported so nobody lost their progress',
      'A points structure simple enough to explain at the counter: a point per dollar, a $5 reward at a hundred points, and three tiers above that',
      'A free birthday drink with double points for the week, and referral bonuses on Tuesdays',
      'Automated re-engagement after fourteen days away, personalised on what that customer actually buys, plus morning reminders for regulars and promotions triggered by the weather',
      'A dashboard covering member activity, revenue per member against non-member, popular items by segment, and performance by location',
      'Staff trained on the whole system in under an hour',
    ],

    whatChanged: [
      { metric: 'Retention rate', before: '27%', after: '68%' },
      { metric: 'Average visit frequency', before: '2.3 per month', after: '6.7 per month' },
      { metric: 'Average transaction', before: '$6.80', after: '$9.20' },
      { metric: 'First to second visit conversion', before: '27%', after: '71%' },
      { metric: 'Thirty-day return rate', before: '34%', after: '82%' },
      { metric: 'Ninety-day active rate', before: '19%', after: '64%' },
      { metric: 'Active members', before: '0', after: '8,432' },
    ],

    outcomes: [
      '$312,000 in revenue attributed to the programme, a 524% return including all setup and running costs',
      'Members spending 2.7 times what non-members spent across the year',
      'Lost-card complaints down 90%, and three hours a week back from manual tracking',
      '47% of members made a successful referral',
      'Two new locations opened, funded by the increase in per-store revenue',
    ],

    /* The source document's subtitle says six months while its results section
       says eight. Confirmed by the founder as eight. Do not change it back. */
    verification:
      'Membership, visit frequency, transaction value and attributed revenue were measured in the loyalty platform over the eight months after launch, against the paper card period that preceded it.',
  },

  {
    slug: 'home-improvement-sales-workflow',
    metaTitle: 'Home improvement: $45,000+ a month added',
    index: '03',
    industry: 'home-services',
    sector: 'Roofing, kitchen and bath remodelling, exterior renovation',
    basis: 'measured',
    headline: { figure: '$45,000+', label: 'Added monthly revenue' },
    found: '$3,600 a month in admin labour',
    foundFigure: '$3,600/mo',
    result: '$45,000+ added monthly revenue',

    title: "Eighteen hours a week of a sales team's time went on paperwork instead of selling.",

    situation: [
      'A mid-sized construction and home services company doing roofing, kitchen and bath remodelling and exterior renovation, with a small in-house sales team fielding a high volume of inbound leads from web forms, paid ads and phone calls.',
      'Turning one of those leads into a booked job meant capturing it, qualifying it by hand, chasing to schedule a site visit, preparing a quote as a PDF, and then tracking every follow-up in a spreadsheet. Growth was constrained by admin rather than by demand.',
    ],

    whatWeFound: [
      { leak: 'Repetitive admin across follow-up, quoting and appointment coordination', figure: '18 hrs per week' },
      { leak: 'That time at a $50 blended hourly cost across reps and admin staff', figure: '$3,600 per month' },
      { leak: 'Follow-up depending on somebody remembering, with nothing holding leads that went quiet' },
    ],

    whatWeBuilt: [
      'One CRM fed by every lead source: website, paid search and referral forms',
      'A qualifying form with conditional logic sorting on project type, location and timeline, routing high-intent leads straight to a rep for callback and everything else into nurture',
      'Instant text and email replies carrying a pre-filled calendar link for a site visit or virtual estimate, with three-day and seven-day reminders firing automatically if nothing happened',
      'Quote templates by service that generate a branded PDF after the site visit, emailed with accept and decline buttons built into it',
      'A visible pipeline running from qualified through site visit booked, quote sent, follow-up needed and closed won, with a daily task summary for each rep',
      'A long-term re-engagement sequence for unconverted leads carrying testimonials, before-and-after images and time-limited offers',
    ],

    whatChanged: [
      { metric: 'Sales team admin time', before: '18 hrs per week', after: '3.5 hrs per week' },
      { metric: 'Lead to quote delivered', before: '3 days', after: 'Under 24 hours' },
    ],

    outcomes: [
      'Lead conversion up 22%',
      'Over $45,000 in additional monthly revenue across roofing and remodelling',
      'Over $3,000 a month saved in labour cost',
      'Three times the lead volume handled without another hire',
    ],

    verification:
      'Admin hours, conversion rate and closed revenue were tracked in the client CRM after the workflow went live. The source document does not state the measurement window. Note that the $45,000 monthly figure is additional closed revenue and is not comparable with the $3,600 monthly cost above it, which covers admin labour only.',
  },

  {
    slug: 'construction-project-pipeline',
    metaTitle: 'Construction: project delays cut 41%',
    index: '04',
    industry: 'home-services',
    sector: 'Residential and commercial renovation contracting',
    basis: 'measured',
    headline: { figure: '41%', label: 'Reduction in project delays' },
    found: '8 to 12 hours a week chasing paperwork',
    foundFigure: '8–12 hrs/wk',
    result: '41% fewer project delays',

    title: 'Every approval in the business waited on somebody remembering to chase it.',

    situation: [
      'A mid-sized construction company running residential and commercial renovation projects, handling dozens at a time from estimate through subcontractor agreements, approvals, scheduling and execution.',
      'All of it was tracked across spreadsheets, paper forms, email threads and text messages. There was no central pipeline, so nobody could see where a client had got to, which forms were outstanding, or which projects needed attention that day. Contract and document approvals were handled by hand, which meant missed signatures and stalled jobs.',
    ],

    whatWeFound: [
      { leak: 'Staff chasing clients for forms, signatures and missing contract details', figure: '8–12 hrs per week' },
      { leak: 'Creating, updating and searching contracts and documents by hand', figure: '20–30 min per file' },
      { leak: 'Estimates moving slowly enough that faster competitors took the work' },
    ],

    whatWeBuilt: [
      'A seventeen-stage pipeline covering the full lifecycle, from new lead through client form requested, estimate in progress, estimate sent, estimate approved, installation booked and project completed, with every stage advancing itself from workflow activity',
      'Automatic intake that requests the required forms the moment a lead arrives and reminds the client until they are submitted, moving the lead forward as soon as they are',
      'Their paper templates rebuilt as digital proposal, estimate and contract templates',
      'Approval automations for working on contract, contract signed and project completed, each one triggering the next step, assigning the tasks and notifying the right department',
      'Automated text and email follow-up on estimates and pending approvals, with long-term nurture for anything declined or postponed',
      'Reporting dashboards giving the owner live visibility on revenue, bottlenecks and job progress',
    ],

    outcomes: [
      'Project delays down 41%',
      'Estimate-to-approval speed up 44%',
      'Close rate up 18%',
      'Document errors down by more than 90%',
      'Administrative follow-up down by more than eleven hours a week',
      'Document and contract preparation time cut by 70%',
      'The company scaled to 27 or more active projects without adding admin staff',
    ],

    verification:
      'Pipeline stage timings, approval speed and close rate were measured in the client GoHighLevel instance against the equivalent period before the build. The source document also reports $68,000 to $85,000 of annual revenue recovered from delays and untracked leads; that is a client estimate rather than a figure measured in a system, and it is not published as a result here.',
  },

  {
    slug: 'tire-shop-missed-calls',
    metaTitle: 'Tire shop: $50,000+ of missed calls back',
    index: '05',
    industry: 'automotive',
    sector: 'Tire and seasonal automotive service',
    region: 'Toronto',
    basis: 'measured',
    headline: { figure: '$50,000+', label: 'Revenue recovered' },
    found: '$40,000 to $50,000 a month',
    foundFigure: '$40K–$50K/mo',
    result: '$50,000+ recovered',

    title: 'Six hundred calls a month went to voicemail in a shop where everyone was already busy.',

    situation: [
      'A high-traffic tire shop specialising in seasonal changes and repairs, at its busiest through the winter tire season. There was no full-time receptionist, the team was small, and the owner was working in the shop rather than sitting by the phone.',
      'More than two thousand calls came in every month, and customers reached out on Facebook, Instagram and email as well. With no system behind any of those channels, enquiries either went unanswered or were answered too late to matter.',
    ],

    whatWeFound: [
      { leak: 'Missed calls a month, 270 of them first-time callers, at a $500 average customer value and a 30% close rate', figure: '600+' },
      { leak: 'Revenue lost to those missed calls', figure: '$40K–$50K per month' },
      { leak: 'Social media enquiries going cold while competitors answered first' },
      { leak: 'Staff time spent calling missed leads back by hand', figure: '10+ hrs per week' },
    ],

    whatWeBuilt: [
      'A missed-call assistant that replied by text within seconds of a dropped call and then held a real conversation, asking what the caller needed and steering toward a booking rather than firing off a generic apology',
      'Facebook and Instagram chatbots trained on the questions the shop actually got: pricing, availability, and which services it offered',
      'Automatic tagging and assignment of any lead that needed a person, so nothing sat unread in an inbox',
      'Drafted email replies within minutes of an enquiry arriving',
      'Self-scheduling through a booking link, with automated reminders and confirmations to hold down no-shows',
      'One dashboard covering calls, texts, emails and social messages together',
    ],

    outcomes: [
      '40% of missed leads re-engaged',
      'Booked appointments up 50%',
      'Over $50,000 in recovered revenue',
      'Conversion rates twice what they had been, because leads were answered immediately instead of hours or days later',
      'Ten or more hours a week of manual lead chasing eliminated, and round-the-clock coverage without another hire',
    ],

    verification:
      'Bookings and recovered revenue were counted in the shop systems after the assistant went live. The $40,000 to $50,000 monthly leak is the shop’s own arithmetic from its call logs: 270 first-time missed callers a month at a $500 average customer value and a 30% close rate. The source document does not state the window the $50,000 recovery was measured over, so it is published as the client reported it rather than as an annualised figure.',
  },

  {
    slug: 'coaching-lead-scoring',
    metaTitle: 'Coaching: 34x return on lead scoring',
    index: '06',
    industry: 'coaching',
    sector: 'High-ticket dating and relationship coaching',
    basis: 'measured',
    headline: { figure: '34x', label: 'Return on the automation build' },
    found: '15+ hours a week filtering leads by hand',
    foundFigure: '15+ hrs/wk',
    result: '34x return on the build',

    title: 'Thousands of leads arrived every month and nobody could tell which ones could afford to buy.',

    situation: [
      'A dating and relationship coach with millions of followers across Instagram, YouTube and TikTok, selling coaching programmes that start at $10,000.',
      'That audience produced thousands of inbound leads a month, and the overwhelming majority were unqualified, unresponsive or simply not ready. With no structured qualification in front of them, a small sales team spent its days on calls with people who were never going to commit, while genuinely high-intent prospects waited days for a reply and drifted away.',
    ],

    whatWeFound: [
      { leak: 'Sales team filtering leads by hand', figure: '15+ hrs per week' },
      { leak: 'Every missed high-intent lead, against a $10,000 entry price', figure: 'Five figures each' },
      { leak: 'Ad spend running into leads nobody was filtering or nurturing' },
      { leak: 'High-value prospects waiting days for a first response' },
    ],

    whatWeBuilt: [
      'A scoring model reading lead form responses and rating each one on financial readiness, commitment level, urgency, and prior experience with coaching',
      'Automatic segmentation into three tiers: hot leads to an agent for immediate qualification and booking, warm leads into nurture, cold leads into long-term follow-up',
      'Agents engaging the high-scoring leads in real conversations over text, WhatsApp and email, handling objections and sharing testimonials, and booking a human closer only once the lead met the criteria',
      'One CRM holding all lead data, conversations and history',
      'Personalised automated follow-up for unresponsive leads, and trigger-based sequences holding warm leads in',
    ],

    outcomes: [
      '34x return on the automation build',
      'Lead-to-close rate doubled, because only serious buyers reached a human closer',
      '20% more leads nurtured and re-engaged that would otherwise have been lost',
      'Sales team workload down 60%',
      'Conversion up 40% on response time alone, with hot leads engaged within minutes',
      'Fifteen or more hours a week of manual filtering eliminated',
      'Five times the lead volume handled without adding staff',
    ],

    verification:
      'Close rates, response times and team workload were tracked in the client GoHighLevel instance against the period before the build. The 34x figure is the return on the automation investment as the client calculated it; the build cost behind it is not published here, so that multiple cannot be reconstructed from this page.',
  },

  {
    slug: 'basketball-coaching-funnel',
    metaTitle: 'Athlete coaching: $100,000+ added a year',
    index: '07',
    industry: 'coaching',
    sector: 'Online basketball training and athlete mentorship',
    basis: 'measured',
    headline: { figure: '$100,000+', label: 'Added annualised revenue' },
    found: 'A qualification form losing roughly 90% of pre-sold prospects',
    foundFigure: '13.7% completion',
    result: '$100,000+ added annually',
    window: 'May to June 2025',

    title: 'Nine in ten qualified prospects abandoned the form standing between them and a booking.',

    situation: [
      'An online basketball training programme that has taken more than a hundred athletes toward their goals, many of them into Division 1 programmes, on a ninety-day system backed by testimonials from professional players and parents.',
      'Demand was not the problem. Managing direct messages by hand consumed hours a day, closing a client took two to four calls, and prospects fell out at several points along the way. The worst of it sat right at the end: a qualification form with a 13.7% completion rate, where nearly nine in ten prospects who had already been sold walked away at the final step.',
    ],

    whatWeFound: [
      { leak: 'Qualification form abandoned by prospects who were already sold', figure: '13.7% completion' },
      { leak: 'Direct message management handled by hand', figure: 'Hours daily' },
      { leak: 'Calls required to close a single client', figure: '2–4' },
    ],

    whatWeBuilt: [
      'A quiz funnel sorting prospects into three tiers by current skill level, with a conversational bot nurturing each tier differently',
      'A complete rebuild of the qualification form: fewer questions without losing the criteria, a flow designed to cut friction, faster-loading images, and repositioning it after the nurture sequence rather than before it',
      'Tier-specific routing, sending developing players to a free drills ebook and a community with weekly calls, giving rising players personal feedback on their strengths and gaps, and fast-tracking elite prospects straight to booking',
      'Automatic parent handling: the bot works out that a prospect is under eighteen and asks for a parent to join the call before it will release a booking link',
      'A message buffer that holds fire when somebody sends several messages in a burst, so the bot answers the whole thought rather than the first fragment of it',
      'Post-call email generation with an approval step, so the coach reviews each one, a twenty-minute delay so it reads as written rather than sent, and automatic classification of whether the call was with a prospect or an existing client',
      'Nurture sequences rebuilt around the testimonials, the coach’s own story, and messaging written for parents rather than players',
    ],

    /* ⚠️ THE ABSOLUTE MONTHLY REVENUE IS WITHHELD ON PURPOSE, AND IT IS THE
       ONE FIGURE IN THIS LIBRARY THAT WAS DELIBERATELY TAKEN OUT.
       The source document gives it as $14,000 rising to $30,000 a month. No
       other case study here states a client's revenue, because no other source
       document contains one, and publishing this one would put a business at
       roughly $200K a year on a site that sells a diagnostic at $3M to $15M.
       The uplift survives without the base: the delta and the growth rate are
       both below, and the annualised figure is derived from them in
       `verification`. Do not restore the row to "strengthen" the table. */
    whatChanged: [
      { metric: 'Qualification form completion', before: '13.7%', after: '30.0%' },
      { metric: 'Close rate', before: '5–10%', after: '15%' },
      { metric: 'Community members', before: '0', after: '200+' },
    ],

    outcomes: [
      'Monthly revenue doubled, an increase of more than $16,000 a month',
      '167 qualified calls booked in thirty days, every one of them from the automation',
      'The calendar filled three weeks out at six calls a day',
      'The bot was switched off after twenty-one days because the business could not absorb any more demand',
      'Stricter disqualification now sits in front of the form, which means the doubling understates the gain: only the strongest prospects reach it at all',
    ],

    verification:
      'Form completion was measured in the client Typeform analytics, comparing May 2025 against June 2025 either side of the rebuild on 6 June. Call volume, close rate and revenue come from the client booking calendar and their own reporting over the same period. The community figure covers the two to three weeks following launch. The annual figure is derived rather than measured: the measured uplift is more than $16,000 in the month observed, which annualises to more than $192,000. It is published as $100,000+ because annualising a single month overstates what one month can carry, and because the programme was capacity-capped and paused at twenty-one days. The conservative figure is the one this page will stand behind.',
  },

  {
    slug: 'plumbing-field-service-platform',
    metaTitle: 'Plumbing: $280,800 of operational waste',
    index: '08',
    industry: 'home-services',
    sector: 'Plumbing and field services',
    basis: 'projected',
    headline: { figure: '$280,800', label: 'Annual operational waste identified' },
    found: '$23,400 a month, around $280,800 a year',
    foundFigure: '$23,400/mo',

    title: 'The scheduler spent three to four hours a day building a week the software should have built itself.',

    situation: [
      'A fast-growing plumbing company running multiple engineers, dozens of service calls a day and thousands of customer records. As it scaled, the existing CRM and the manual workflows around it became the constraint on the whole business.',
      'Day-to-day operations ran on spreadsheets, manual scheduling, fragmented communication and job notes written out by hand. The CRM did not match how the company actually worked, so roughly 70% of its features went unused while the ones they needed were missing entirely.',
    ],

    whatWeFound: [
      { leak: 'Scheduling done by hand by the PA', figure: '3–4 hrs per day' },
      { leak: 'Timesheet verification and correction', figure: '10+ hrs per week' },
      { leak: 'Engineers on manual reporting and phone-based admin', figure: '5+ hrs per week' },
      { leak: 'Management reconciling timesheets and locating missing data', figure: '10 hrs per month' },
      { leak: 'Total quantified operational waste', figure: '$23,400 per month' },
    ],

    whatWeBuilt: [
      'A custom admin dashboard with drag-and-drop scheduling, real-time job assignment against engineer availability, and status that advances itself as an engineer moves through a job',
      'GPS-verified timesheets through geofenced clock-in and clock-out, an exception interface for the anomalies, and one-click payroll export',
      'An internal assistant handling invoice generation, quote creation, job reports, troubleshooting guidance and real-time lookups such as what was charged last time',
      'Hands-free voice reporting for engineers, so completion notes, parts used, customer notes and invoice items are spoken, structured and saved without anyone typing',
      'Messaging over WhatsApp with an intent router behind it: booking requests create jobs, status questions answer themselves, complaints escalate to a manager',
      'A plumbing-specific CRM built around their workflow, with unlimited engineers, no per-user pricing, and full ownership of the software and the data',
      'Reporting covering a live engineer map, job pipeline, profitability, engineer performance, revenue forecasting, customer lifetime value and first-time fix rates',
      'A two-week parallel run against the old system, daily backups, a staged rollout and full staff training',
    ],

    whatChanged: [
      { metric: 'Building the weekly schedule', before: '2 hours', after: '15 minutes' },
      { metric: 'Timesheet accuracy without manual review', before: 'Required 10+ hrs/week of checking', after: '95%' },
    ],

    outcomes: [
      'Up to thirty hours a week projected to come out of scheduling, reporting, admin and communication',
      'An 80% projected reduction in administrative workload across office and field staff',
      'An estimated $7,500 a month in revenue protected from missed appointments and communication gaps',
      'Reporting five times faster through voice, with around 70% of routine queries expected to be handled by the assistant',
    ],

    verification:
      'The $23,400 monthly waste figure was quantified before the build, from scheduling time, timesheet corrections, lost jobs and engineer downtime. Everything under outcomes is a projection rather than a measurement: the platform shipped, staff adoption is reported as fast, and long-term data is still being collected. Nothing here has yet been measured against a post-implementation period.',
  },

  {
    slug: 'medspa-booking-system',
    metaTitle: 'Medspa: a $4,000 to $6,000 monthly leak',
    index: '09',
    industry: 'health',
    sector: 'Medical spa and aesthetic treatments',
    basis: 'projected',
    headline: { figure: '$4,000–$6,000', label: 'Monthly revenue leak identified' },
    found: '$4,000 to $6,000 a month',
    foundFigure: '$4K–$6K/mo',

    title: 'Nearly a quarter of the bookings arrived after hours, and two thirds of those callers never rang back.',

    situation: [
      'A growing medspa offering a wide range of treatments, with steady demand and an outdated booking system underneath it. The pressure was to lift revenue, cut admin and deliver the experience clients now expect as standard, and the booking tool was working against all three at once.',
      'The operational side was just as expensive as the missed revenue. Managing rooms, service requirements and couples appointments was a daily puzzle, staff schedule changes broke the system routinely, and therapists were carrying admin work they had not signed up for.',
    ],

    whatWeFound: [
      { leak: 'Missed calls and after-hours enquiries', figure: '$4,000–$6,000 per month' },
      { leak: 'Bookings attempted after hours, two thirds of whom never called back', figure: '23% of bookings' },
      { leak: 'Each appointment slot left idle', figure: '$150' },
      { leak: 'Scheduling by hand', figure: '3+ hrs per day' },
      { leak: 'Manual confirmation calls', figure: '2 hrs per day' },
      { leak: 'Fixing each double booking', figure: '45 min' },
      { leak: 'Replacing one burned-out employee', figure: 'Up to $8,000' },
    ],

    whatWeBuilt: [
      'A booking concierge available around the clock, so a midnight enquiry becomes a booking rather than a missed call in the morning',
      'Room assignment that matches service to room automatically, and staff matching that only offers therapists qualified and available for that treatment',
      'Multi-service and couples booking in a single flow, with buffer time applied between appointments without anyone remembering to',
      'Deposit processing to secure bookings, and a waitlist that fills a cancellation within minutes',
      'Gap filling that finds and sells profitable empty slots, dynamic pricing for peak times, package management and a membership portal',
      'Digital intake forms carrying medical history, preferences and waivers, with e-signature capture',
      'Review generation after each visit, birthday and anniversary offers, dormant client re-engagement and referral tracking',
      'Multi-location support and an analytics dashboard',
    ],

    outcomes: [
      'The $4,000 to $6,000 monthly leak is expected to close, with return on the build expected inside thirty days',
      'Fifteen to twenty hours of weekly admin expected to come out of the operation',
      'The client reports the transition as smoother and more comprehensive than expected',
    ],

    verification:
      'The leakage figures were quantified from the medspa booking and call records before the build. Nothing after it has been measured. The system is live and the client feedback is positive, but official performance data is still being collected, so every forward-looking figure on this page is a projection rather than a result.',
  },

  {
    slug: 'wellness-centre-launch-systems',
    metaTitle: 'Wellness centre: launch systems in 3 weeks',
    index: '10',
    industry: 'health',
    sector: 'Wellness and recovery centre',
    basis: 'projected',
    headline: { figure: 'Three weeks', label: 'From no digital presence to live' },
    /* No dollar figure, because the business had not opened and there was
       nothing yet to lose. What was found is the absence itself, and the table
       says that rather than leaving the row blank in both value columns.
       `foundFigure` stays unset on purpose: the record page then leads on
       Delivered rather than on Found, which is the honest emphasis here. */
    found: 'No booking, CRM or nurture at launch',

    title: 'A business that had not opened yet was already going to lose money at the front desk.',

    situation: [
      'A new wellness recovery centre preparing to launch, with strong services and facilities and no digital presence at all: no website, no online booking, and every process manual.',
      'Reservations and confirmations would have needed reception staff to handle. A token-based membership scheme was going to be tracked by hand. There was no CRM behind any of it, nothing to turn an enquiry into a member, and no way to upsell or re-engage anyone. The founders wanted this solved before opening rather than discovered afterwards, on a budget under $5,000 and without committing to heavy ongoing subscriptions.',
    ],

    whatWeFound: [
      { leak: 'Reservations and confirmations requiring reception staff to handle by hand' },
      { leak: 'Token-based memberships tracked manually' },
      { leak: 'No CRM for lead tracking, and no nurture turning enquiries into members' },
      { leak: 'No mechanism to upsell or re-engage a client once they had visited' },
    ],

    whatWeBuilt: [
      'A mobile-responsive site with an integrated booking widget and payment processing, live in the first week',
      'A booking workflow covering service selection, real-time availability, automated confirmations by text and email, and staff notifications',
      'A CRM holding booking history, segmentation and lead scoring',
      'A token membership system handling purchase, allocation, usage tracking and renewal alerts through a member self-service portal',
      'Nurture campaigns covering a welcome series, educational content, membership upsells and re-engagement',
      'Appointment reminders and campaigns aimed at retention and utilisation',
      'A dashboard reporting bookings, revenue and engagement in real time',
    ],

    outcomes: [
      'Live in three weeks: site, booking and payments in week one, membership and nurture in week two, testing and go-live in week three',
      'Four to six hours of client time in total across those three weeks',
      'Delivered under the $5,000 budget, with the client owning the systems outright',
    ],

    verification:
      'This is published as a build record rather than a results record. The centre had not opened when the system went live, so there is no before period to measure against and no post-implementation data yet. The source document quotes a projected $108,000 annual benefit across reception savings, after-hours booking capture, conversion and retention; that figure is modelled from industry averages rather than measured in this business, and it is deliberately not published as a result here.',
  },
];

/**
 * The strict class, still empty. §5 holds: a $3M-$15M client, annualised
 * leakage found, annualised recovery MEASURED and smaller than what was found,
 * a payback window, a named verification system, and written consent.
 *
 * When the first one exists, /evidence puts it ABOVE the case studies under
 * its own heading, with its own column definitions, because found and sealed
 * mean something narrower there than anything on this page.
 */
export const RECORDS: EngagementRecord[] = [];

export const hasRecords = () => RECORDS.length > 0;
export const hasCaseStudies = () => CASE_STUDIES.length > 0;

/** Case studies on one shelf, or all of them when the id is unknown or absent. */
export function caseStudiesByIndustry(id?: string): CaseStudy[] {
  if (!id || !industryLabel(id)) return CASE_STUDIES;
  return CASE_STUDIES.filter((c) => c.industry === id);
}

/**
 * The measured ones. The homepage carries these and not the rest, because it
 * has no room for the qualifier the others need.
 *
 * There was a `projected()` beside this. It went dead the moment the two
 * tables on /evidence became one, since the not-yet-measured are now selected
 * per row rather than as a group. Removed rather than left as a live-looking
 * export nobody calls.
 */
export const measured = (list: CaseStudy[]) => list.filter((c) => c.basis === 'measured');

/** Records on one shelf, or all of them when the id is unknown or absent. */
export function recordsByIndustry(id?: string): EngagementRecord[] {
  if (!id || !industryLabel(id)) return RECORDS;
  return RECORDS.filter((r) => r.industry === id);
}

/** Shelves that actually hold something. Empty shelves are never offered as a
 *  filter: a button that leads to nothing reads as a fault rather than as an
 *  absence. `agencies` holds nothing today and so never renders. */
export function populatedIndustries() {
  return INDUSTRIES.filter(
    (i) => CASE_STUDIES.some((c) => c.industry === i.id) || RECORDS.some((r) => r.industry === i.id),
  );
}

/** Everything with a page under /evidence, for the sitemap and for linking. */
export function allPublished(): { slug: string }[] {
  return [...CASE_STUDIES.map((c) => ({ slug: c.slug })), ...RECORDS.map((r) => ({ slug: r.slug }))];
}

/**
 * §5's interim page. Shown wherever a table would go while there is nothing to
 * put in it. With CASE_STUDIES populated this no longer renders on /evidence,
 * but it stays: the homepage still falls back to it, and if the library is ever
 * emptied the page must not simply show a blank.
 */
export const INTERIM_NOTICE = {
  /** ⚠️ [ASSET NEEDED] e.g. "March 2027". `body` used to end with the dangling
   *  clause "First records publish", so with no month set the page stated
   *  "First records publish." at visitors, which is not a sentence. The date
   *  now lives in its own sentence, omitted entirely when the month is unset. */
  month: '',
  body: 'Engagement records publish once the measurement period closes and the client approves the redacted version.',
  /** Rendered only when `month` is set. */
  firstPublish: (month: string) => `The first of them publish in ${month}.`,
  reassurance:
    'In the interim: the diagnostic is fixed-fee and fully credited, and the report will tell you if the leakage is immaterial. That is the whole risk you are taking.',
} as const;

/**
 * Published beneath the case study table. §4 section 3: an undefined column is
 * an unfalsifiable claim, and that binds hardest on the page a sceptical
 * reader checks first.
 */
export const CASE_COLUMN_DEFINITIONS = [
  {
    term: 'Found',
    definition:
      'What the business was losing before the build, quantified as the client measured it and over the period each record states.',
  },
  {
    term: 'Result',
    definition:
      'What was measured after implementation, in the system named at the foot of each record. A row reading "final results in progress" is a system that has shipped and whose measurement period has not closed; its page carries no result figure and names every forward-looking number as a projection. Where a figure was estimated rather than measured, the record says so beside it.',
  },
  {
    term: 'Window',
    definition:
      'The period the result was measured over. Where a source document does not state one, the record says that rather than implying a window it cannot support.',
  },
];

/**
 * §4 section 3, for the strict class. These three columns are the entire
 * argument of an engagement record, so they travel with it wherever it prints.
 */
export const COLUMN_DEFINITIONS = [
  { term: 'Found', definition: 'Annualised leakage identified during the diagnostic.' },
  {
    term: 'Sealed',
    definition:
      'Annualised recovery measured after implementation, over the period stated in each record. It is always smaller than what was found.',
  },
  {
    term: 'Payback',
    definition:
      'Weeks for measured recovery to equal total fees paid, diagnostic plus implementation.',
  },
];

export const RECORD_PREAMBLE =
  'We withhold client names by agreement, and the figures are exactly as they were measured.';

/**
 * The case study preamble. It does three jobs in two sentences: it explains the
 * anonymity, it states that the figures are unaltered, and it tells the reader
 * what a missing result means before they meet one. That last clause is the one
 * that earns the page.
 *
 * The not-yet-measured studies used to sit in a second table under their own
 * heading. They now sit in the one table and carry the qualifier in their own
 * Result cell, which is a stronger position for it: a reader scanning the
 * column meets it on the row itself rather than having to notice which table
 * they are in.
 */
export const CASE_PREAMBLE =
  'Client names are withheld by agreement and the figures are exactly as they were measured. Where a system has shipped and the measurement period has not closed, the record says so in place of a result rather than offering a projection as one.';


/**
 * §4 section 2 — THE PATTERN. The scale figures.
 *
 * ⚠️ READ THIS BEFORE CHANGING EITHER NUMBER.
 *
 * These two figures get divided, so they have to survive it.
 *
 * The figure was $6B, which is $12M per business across 500. Against the old
 * $10M-$100M range that was a stretch; against $3M-$15M it is impossible,
 * because you cannot find $12M of unrealised revenue inside a $3M company.
 *
 * $100M+ is worked back from the population instead of down from a boast. The
 * site's own record examples imply leakage found at 4 to 5% of revenue. Five
 * hundred businesses, most of them under $3M, at 6 to 8% gives $45M to $120M;
 * $100M+ sits at the top of that band, which is where a headline claim
 * belongs. It divides to $200,000 per business, which is 6.7% of a $3M
 * company's revenue and a credible rate for an unoptimised operation.
 *
 * It is also the better sentence. $200,000 found against a $5,000 diagnostic
 * is 40x, and a reader can map $200,000 onto their own business. Nobody could
 * map $6B onto anything.
 *
 * What makes the pair survive scrutiny is the two things stated with them:
 *
 *   1. THE POPULATION. The 500 are not all $3M-$15M companies. Most sit well
 *      below the diagnostic's ICP. Saying so costs nothing and removes the
 *      implication that $12M is a typical finding at our own ICP.
 *   2. THE MEASURE. "Unrealized revenue" is cumulative across every audit and
 *      across the whole period, and it is not annualised. FOUND and SEALED in
 *      an engagement record mean something narrower and stricter. Two different
 *      measures with the same smell is precisely how a page loses a reader, so
 *      both are defined in plain words on the page itself.
 *
 * This is the same rule §4 applies to record columns: an undefined column is an
 * unfalsifiable claim. It binds harder here, because these are the largest
 * numbers on the site.
 */
export const LEAKAGE_SCALE = {
  /** The window the 500 and the $100M were accumulated over. Without it
   *  "cumulative" is not actually a measurement, which is the same objection
   *  this page raises against every undefined column. Confirmed by the founder
   *  as 2022 to 2026. */
  period: '2022 to 2026',

  audited: {
    figure: '500+',
    label: 'Businesses audited',
    definition:
      'Businesses taken through the full process, from systems access to written findings. Across every size, most of them smaller than the operating range this diagnostic is sold into.',
  },

  unrealized: {
    figure: '$100M+',
    label: 'Unrealized revenue identified',
    definition:
      'Demand those businesses had already paid to acquire and did not convert, totalled at the point it was lost. Cumulative across every audit and the whole period. Not annualised, and not a claim about what any single business would find.',
  },
} as const;

export const hasScalePeriod = () => LEAKAGE_SCALE.period.length > 0;

/**
 * §5's publication bar, as the page states it.
 *
 * This is the EngagementRecord interface written out in plain words. It is the
 * strongest thing /evidence can say while RECORDS is empty, because it is true
 * today: the requirements are not aspirations, they are the fields a record
 * cannot be constructed without, and the page is empty precisely because the
 * bar has not been cleared rather than because nothing has been done.
 *
 * Keep this list and the interface in step. If a field is relaxed there, the
 * claim here becomes false.
 */
export const PUBLICATION_STANDARD = [
  {
    term: 'Scale',
    detail:
      'The engagement was at $3M to $15M in revenue, the range this firm operates in. A smaller company rounded up would discredit every record beside it.',
  },
  {
    term: 'A named sector',
    detail: 'Specific enough to be recognised. "Specialty industrial distribution", not "B2B".',
  },
  {
    term: 'Found',
    detail: 'Annualised leakage identified during the diagnostic.',
  },
  {
    term: 'Sealed',
    detail:
      'Annualised recovery actually measured after implementation, and always less than what was found. A complete seal is not credible and would read as fabrication.',
  },
  {
    term: 'A measurement window',
    detail: 'The period the recovery was measured over, stated rather than implied.',
  },
  {
    term: 'A verification method',
    detail:
      'The system the figure was measured in and the metric it was measured as, both named. A number without them is a claim.',
  },
  {
    term: 'Written consent',
    detail:
      'The client has approved the anonymised version exactly as it is published here.',
  },
];
