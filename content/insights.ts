/**
 * content/insights.ts — AI SEO Developer Guide, Ticket 6.
 *
 * THE BLOG. Ticket 6 calls it "the largest single gap", and on this property it
 * is larger than it was when that was written: the Wix site had a /blog URL with
 * nothing behind it, and v2 does not have the URL either. Every question a buyer
 * asks gets answered on somebody else's page.
 *
 * ROUTE: /insights, with /blog and /blog/:slug 301'd to it in next.config.ts, so
 * the guide's acceptance criterion — /blog resolves rather than 404s — is met.
 *
 * ⚠️ THE TEN TOPICS ARE NOT THE GUIDE'S TEN, AND THAT IS DELIBERATE.
 *
 * The guide lists "How much does an AI appointment setter cost?", "AI
 * receptionist vs. answering service: which is right for a small business?", and
 * eight more in that shape. Those were written against the Wix site, which sold
 * appointment setters to childcare operators and medspas. v2 sells operational
 * diligence to operating companies at $10M–$100M and prices findings in EBITDA.
 *
 * Publishing the guide's list verbatim would have done real damage rather than
 * nothing. "Which is right for a small business" beside a stated $10M–$100M
 * operating range is the §5 failure in article form: the same reader who
 * dismisses a property over a sub-$1M engagement record dismisses it over a blog
 * written for somebody a tenth his size. The guide's INTENT — answer the question
 * a buyer actually types, in plain language, and be quotable — carries entirely.
 * Its audience assumption does not.
 *
 * HOW THESE ARE WRITTEN, per Ticket 6's content rules, which are good ones:
 *   · to the QUESTION, not the keyword.
 *   · the direct answer arrives in the first two to four sentences, inside 100
 *     words. An extractive model quotes the opening passage; a post that warms up
 *     for three paragraphs gets quoted saying nothing.
 *   · at least one real number in every post.
 *   · at least 800 words.
 * `npm run check:seo` enforces the last three mechanically, plus the title shape.
 *
 * ⚠️ WHERE THE NUMBERS COME FROM. Every figure about this firm already exists in
 * content/firm.ts, content/diagnostic.ts or content/evidence.ts — the $5,000 fee,
 * the $25k–$75k range, the two weeks anchored to systems access, the 500 audits
 * and the $6B, and the found/sealed/payback definitions. NOTHING ABOUT THE FIRM
 * IS INVENTED HERE, and §10 applies: where a post would need a market statistic
 * nobody has measured — EBITDA multiples, industry conversion benchmarks,
 * competitor fees — it does not assert one. It works from arithmetic with its
 * assumptions stated and adjustable in the text, or it says plainly that the
 * number depends on the reader's own figures.
 *
 * That constraint is not caution. This site's entire argument is that a published
 * figure means one specific thing, and an FAQ-shaped article is the surface an
 * assistant is most likely to quote verbatim to someone who never visits.
 */

export interface PostBlock {
  t: 'p' | 'h2' | 'ul' | 'ol' | 'note';
  /** For 'p', 'h2' and 'note'. */
  text?: string;
  /** For 'ul' and 'ol'. */
  items?: string[];
}

export interface Post {
  slug: string;
  /** The question, as somebody would type it. The H1 and the <title>. */
  title: string;
  /** Meta description. */
  description: string;
  /**
   * THE DIRECT ANSWER. Rendered as the standfirst, above everything else, and it
   * is the first prose on the page. It is a separate field precisely so it cannot
   * drift down the page as a post gets edited.
   */
  answer: string;
  category: string;
  datePublished: string;
  dateModified?: string;
  published: boolean;
  body: PostBlock[];
  /** ⚠️ Notes for whoever strengthens this post with real firm data. */
  todo?: string;
}

/* ------------------------------------------------------------------------ */

export function postWordCount(post: Post): number {
  const text = [
    post.answer,
    ...post.body.flatMap((b) => (b.items ? b.items : [b.text ?? ''])),
  ].join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}

export function readingMinutes(post: Post): number {
  return Math.max(1, Math.round(postWordCount(post) / 225));
}

export const publishedPosts = (): Post[] =>
  POSTS.filter((p) => p.published).sort((a, b) => b.datePublished.localeCompare(a.datePublished));

export const postBySlug = (slug: string): Post | undefined =>
  POSTS.find((p) => p.slug === slug && p.published);

/* ------------------------------------------------------------------------ */

export const POSTS: Post[] = [
  /* --------------------------------------------------------------------- */
  {
    slug: 'what-is-revenue-leakage',
    title: 'What is revenue leakage, and how is it measured?',
    description:
      'Demand a company already paid to acquire and failed to convert. Where it hides, why it is invisible in every report you already run, and the arithmetic for pricing it.',
    answer:
      'Revenue leakage is demand a company already paid to acquire and then fails to convert for operational rather than commercial reasons: the enquiry that waited two days for a reply, the quote never followed up, the renewal nobody owned. It is measured by tracing every path a lead can take through the systems of record, finding where each stops, and pricing what stopped against the company’s own conversion rates and deal values. It is invisible in ordinary reporting because a lead that was never captured generates no record, and a record that does not exist cannot appear in one.',
    category: 'Diagnosis',
    datePublished: '2026-09-23',
    published: true,
    body: [
      { t: 'h2', text: 'Why it survives in well-run companies' },
      {
        t: 'p',
        text:
          'This is the part that surprises operating partners, and it should not. Leakage is not a symptom of incompetence. It is a symptom of growth: systems accumulate one subscription at a time, each one solving a real problem, and the gaps appear between them rather than inside any of them. Nothing is broken. Every individual process works. Revenue simply stops arriving at a rate nobody can point to.',
      },
      {
        t: 'p',
        text:
          'And nothing in the reporting stack is designed to surface it. Marketing reports on cost per lead and will tell you, accurately, that the channels are performing. Sales reports on conversion of the pipeline it received. Neither reports on the population that never became a pipeline record, because that population leaves no trace. There is no angry customer, no bad review, no line item, no ticket. The usual conclusion is that the market got harder.',
      },
      { t: 'h2', text: 'The five places it actually sits' },
      {
        t: 'ol',
        items: [
          'Response latency. The enquiry that arrived and was answered thirty hours later, by which point the decision had been made elsewhere. This is the largest single category in most companies and the one most often misdiagnosed as a staffing problem when it is a routing problem.',
          'Unmonitored channels. The inbox one person watched before they changed roles. The second phone line. The marketplace message queue. The chat widget nobody has opened in months. Each was deliberately created and each has since become invisible.',
          'Absent follow-up. A first reply went out, the prospect did not respond, and nothing was scheduled behind it. A conversation that stalls closes itself, silently, and the CRM records it as an open opportunity indefinitely.',
          'Failed routing and handoff. It arrived, it was answered, and it went to the wrong person, the wrong territory or the wrong location. The loss happens in the handoff, which is the one part of the process no system owns.',
          'Renewal and expansion drift. Existing revenue that lapses because the trigger was a person remembering rather than a system firing. Usually the cheapest leak to close and the last one anyone looks at.',
        ],
      },
      {
        t: 'p',
        text:
          'The common structure is worth naming: in every one of the five, the failure is work that depends on a person remembering to do it. That is the single most reliable predictor of where a leak will be found, and it is why the diagnostic looks at handoffs before it looks at anything else.',
      },
      { t: 'h2', text: 'How it gets measured, and the bar a figure has to clear' },
      {
        t: 'p',
        text:
          'A leakage figure is only worth having if it can survive an operating partner doing arithmetic on it in front of you. That means three things have to travel with every number: the system it was measured in, the period it covers, and the conversion assumption applied to it. A figure without all three is a claim rather than a measurement, and it will be discounted to zero by the first person who asks where it came from.',
      },
      {
        t: 'p',
        text:
          'The method is unglamorous. Trace every inbound path through the systems of record. Timestamp each enquiry against its first genuine human response — not the autoresponder. Split the population at whatever latency threshold is meaningful in that market, and compare conversion between the fast group and the slow group using the company’s own historical rates. Then apply the company’s own average deal value, and annualise.',
      },
      {
        t: 'p',
        text:
          'Two disciplines make the difference between a defensible figure and a sales number. The first: anything that cannot be measured in a system the company owns does not go in the report at all. Interview evidence is used to find where to look, never as the source of a figure. The second: a recoverability haircut, stated explicitly. Not every lost enquiry was ever winnable, and a model that implies otherwise is claiming a 100% seal, which nobody believes.',
      },
      { t: 'h2', text: 'The arithmetic, shown' },
      {
        t: 'p',
        text:
          'Take a company doing $40M with a services mix, receiving 600 qualified enquiries a month, reaching about 35% of them inside an hour, closing 22% of the conversations it actually has, with an average first-year contract value of $9,000. Every one of those four inputs comes from the company’s own systems.',
      },
      {
        t: 'ul',
        items: [
          '210 enquiries reached fast, closing at 22% — about 46 deals a month.',
          '390 reached slowly. Apply a conversion penalty to the slow group taken from that company’s own historical split rather than from a benchmark — say those close at 10% — and that is 39 deals.',
          'Current total: roughly 85 deals a month. The ceiling, if every enquiry were reached inside the hour at the same rate, is 132.',
          'The gap is about 47 deals. Apply a stated recoverability haircut — not all of them were winnable — of 60%, and you are left with 28 deals a month.',
          'At $9,000 each, that is roughly $252,000 a month, or about $3.0M annualised.',
        ],
      },
      {
        t: 'note',
        text:
          'Every assumption in that chain is visible and every one of them is arguable. That is the point. A figure that survives a hostile adjustment of its own inputs — halve the recoverability and it is still over $1.5M — is worth more than a larger figure that collapses the first time somebody pushes on it.',
      },
      { t: 'h2', text: 'Leakage is not the same as a growth problem' },
      {
        t: 'p',
        text:
          'The distinction decides where the money should go, so it is worth being precise. A growth problem means demand is insufficient: the answer is marketing, pricing or product. A leakage problem means demand is sufficient and is being lost after arrival: the answer is operational. The two feel identical from the top of a P&L and they have nothing in common as interventions.',
      },
      {
        t: 'p',
        text:
          'The test is quick. Compare conversion between your fast-response population and your slow-response population, using your own data. If the fast group converts materially better and the slow group is large, you have a leakage problem and additional marketing spend will be partially wasted — you will be paying to acquire demand that will leak out through the same gaps. If the two groups convert about the same, latency is not your constraint and the money belongs in demand generation.',
      },
      {
        t: 'p',
        text:
          'Across more than 500 businesses taken through this process, the cumulative unrealized revenue identified exceeds $6B. That figure is not annualised, it is totalled at the point the demand was lost, and most of those businesses sit well below the $10M to $100M range this firm now works in — so it is a statement about how common the pattern is, not a forecast of what any single company will find. What any single company will find is a question only its own systems can answer.',
      },
    ],
  },

  /* --------------------------------------------------------------------- */
  {
    slug: 'how-much-does-a-leakage-diagnostic-cost',
    title: 'How much does a revenue leakage diagnostic cost?',
    description:
      'A fixed $5,000, credited in full against implementation. What that buys, why it is fixed rather than scoped, and what to compare it against before committing.',
    answer:
      'This firm charges a fixed $5,000 for a leakage diagnostic, credited in full against implementation if you proceed. So if you build, the diagnostic effectively cost nothing; if you do not, you keep the report and the roadmap anyway. The figure to compare it against is not other firms’ fees — it is the annualised leakage the diagnostic is looking for, which at a company doing $10M to $100M is routinely two orders of magnitude larger than the fee. That asymmetry is the only reason a fixed price works at all.',
    category: 'Cost',
    datePublished: '2026-09-23',
    published: true,
    body: [
      { t: 'h2', text: 'Why it is fixed rather than scoped' },
      {
        t: 'p',
        text:
          'Diligence work is normally quoted, and quoting it creates a problem the buyer pays for. A scoped fee has to be estimated before anyone has seen the systems, which means it is padded for the case where the systems are a mess. Then the scope moves, because it always does, and the conversation shifts from what was found to what was billed.',
      },
      {
        t: 'p',
        text:
          'A fixed fee removes that entirely. The number is agreed before work begins and does not move once access is granted. The cost of a messy estate lands on the firm rather than on the client, which is the correct place for it: the firm is the party that can judge, from a thousand prior engagements, how messy an estate of a given shape usually is.',
      },
      {
        t: 'p',
        text:
          'It also means the commercial conversation happens once, at the start, and never again during delivery. For a two-week engagement that matters more than it sounds.',
      },
      { t: 'h2', text: 'What the fee actually buys' },
      {
        t: 'ul',
        items: [
          'A written report. The substance of the engagement. Every leak quantified as an annual figure, with the system it was measured in and the period it covers named beside it, ranked by recoverable dollars against the effort to recover them — so the order to work in is the order it is written in.',
          'A ninety-minute live readout, with whoever you want in the room. The findings get walked and the argument gets taken. If a number does not survive your scrutiny it comes out of the report.',
          'A sequenced build plan, with a cost and a timeline against each phase, written so that another firm could execute it without us.',
        ],
      },
      {
        t: 'p',
        text:
          'That third item is the one worth pausing on, because it is where most diagnostic products quietly fail. A roadmap that only its author can execute is not a roadmap, it is a dependency. The test is whether a competent third party could pick it up cold and price it — and if they could, you have retained the option to shop the build, which is the whole reason the report is worth paying for separately.',
      },
      { t: 'h2', text: 'The credit, and what it does to the incentives' },
      {
        t: 'p',
        text:
          'The $5,000 is credited in full against the first phase of implementation. It is worth being clear-eyed about what that does and does not mean.',
      },
      {
        t: 'p',
        text:
          'What it does: it removes the objection that a diagnostic is a paid sales call. If the firm builds, it has earned nothing from the report itself. What it also does, honestly, is create an incentive to find something worth building. The counterweight has to be structural rather than a promise, which is why the term that matters most is the other one — if the leakage is immaterial, the report says so in its first paragraph and the firm tells you not to hire it. A firm that will not put that in writing has a credit with no counterweight.',
      },
      {
        t: 'p',
        text:
          'The second structural counterweight is that implementation is priced per phase, before each phase begins, with no commitment to a total. A firm that wanted to inflate findings would want a large committed total, not a phase-by-phase approval it has to re-earn.',
      },
      { t: 'h2', text: 'What implementation costs, since the credit is meaningless without it' },
      {
        t: 'p',
        text:
          '$25,000 to $75,000 across all phases is the typical range. Publishing that range matters more than protecting it: "credited against implementation" is an empty promise to somebody who cannot tell whether implementation is $40,000 or $400,000, and the uncertainty lands on the diagnostic rather than on the build. A $5,000 report is only worth commissioning if the follow-on is viable.',
      },
      {
        t: 'p',
        text:
          'The number of phases is never stated in advance, and that is not evasion. Nobody knows it before the diagnostic. What is fixed is the mechanism: each phase is priced before it begins, you approve one at a time, and you are never asked to commit beyond the phase in front of you.',
      },
      { t: 'h2', text: 'The comparison that actually decides it' },
      {
        t: 'p',
        text:
          'Cost is the wrong first question, and asking it first is how companies buy the cheapest option and then abandon it. The right first question is what the leakage is worth, because that sets the ceiling on what finding it can rationally be worth.',
      },
      {
        t: 'p',
        text:
          'Run the comparison on your own figures before you speak to anyone. Take last quarter’s inbound enquiries, split them by whether they received a genuine human response inside an hour, and compare conversion between the two groups. Multiply the difference by your own average first-year value and annualise it. You now have a rough order of magnitude, built from your own data, and you can decide whether a $5,000 fixed fee to have it measured properly is a serious decision or an obvious one.',
      },
      {
        t: 'note',
        text:
          'If that rough arithmetic produces a small number, the honest conclusion is not yet — and it is worth saying that a firm which agrees with you on that is more useful than one which does not. Below roughly $10M in revenue the leakage in most operations is not large enough to justify the engagement.',
      },
      { t: 'h2', text: 'What to ask before commissioning any diagnostic' },
      {
        t: 'ul',
        items: [
          'Does every figure in the report name the system it was measured in and the period it covers? If not, you are buying interview notes with numbers attached.',
          'What happens if you find nothing material? Get the answer in writing. It is the single best predictor of whether the findings will be honest.',
          'Can another firm execute your roadmap? If not, the fee is higher than quoted, because it includes a lock-in you were not told about.',
          'Who is actually in our systems, by name and role? A diagnostic sold by a principal and delivered by a junior team is a different product.',
          'What access do you need, what will you be able to write to, and what happens to the credentials afterwards? Any firm that has not thought this through has not done many of these.',
          'Is the fee credited, and against what exactly? "Credited against future work" is not the same as credited in full against the first phase.',
        ],
      },
    ],
  },
  /* --------------------------------------------------------------------- */
  {
    slug: 'how-long-does-a-leakage-diagnostic-take',
    title: 'How long does a revenue leakage diagnostic take?',
    description:
      'Two weeks — ten business days from systems access, not from purchase. What each stage contains, and the two things that cause almost every overrun.',
    answer:
      'Ten business days from systems access. The anchor is the important half of that sentence: between commissioning and access sit kickoff scheduling and credential provisioning, which realistically add a further five to ten days, so two weeks from purchase is not the same claim and should never be made. Most of the ten days goes on instrumentation — tracing every path a lead can take through the systems and finding where each one stops — and almost none of it is visible to the client while it happens.',
    category: 'Engagement',
    datePublished: '2026-09-23',
    published: true,
    todo:
      '⚠️ Stronger with the real distribution: median and range of actual elapsed time from access to readout across engagements to date, and the median provisioning delay. Both are knowable from the firm’s own records and neither is published anywhere yet.',
    body: [
      { t: 'h2', text: 'Why the clock is anchored to access and not to purchase' },
      {
        t: 'p',
        text:
          'Because the version anchored to purchase will slip, and the first time it does it reads as a bait-and-switch rather than as a scheduling reality. The firm does not control how long it takes a client to get a security review done, find the person who administers the ticketing system, or schedule a kickoff across four calendars. It does control what happens once credentials exist.',
      },
      {
        t: 'p',
        text:
          'So the commitment is made about the part that is controllable, and the uncontrollable part is stated as an estimate: five to ten days between commissioning and access, in most cases. A buyer who plans on twenty-five calendar days end to end will rarely be disappointed. A buyer who was told fourteen and got twenty-five has been misled, even if nobody intended it.',
      },
      {
        t: 'p',
        text:
          'This also means there is one thing a client can do to compress the timeline that is worth more than everything else combined, and it is covered at the end.',
      },
      { t: 'h2', text: 'What the ten days contain' },
      {
        t: 'p',
        text:
          'It is a sequence rather than a schedule, and the distinction is deliberate. The order is inherent to the work and can be stated with confidence. A day-by-day timetable would be a commitment nobody agreed to, and the first time it slipped it would cost exactly the credibility the access anchor exists to protect.',
      },
      {
        t: 'ol',
        items: [
          'Access. Credentials are provisioned and the clock starts. Nothing before this point counts against the ten days.',
          'Instrumentation. Every path a lead can take through the systems gets traced, and the point where each one stops gets found. This is where most of the work happens and most of it is invisible from the client side, which is worth knowing in advance so the quiet week does not read as inactivity.',
          'Interviews. Four to six conversations, thirty minutes each, across sales, operations and service. No preparation is asked of anyone. The object is the gap between what the system records and what people actually do, and that gap is only ever found by talking to the people doing it.',
          'Quantification. Each leak is priced against the company’s own numbers, annualised, and ranked by recoverable dollars against the effort to recover. Anything that cannot be measured in a system the company owns does not go in the report.',
          'Readout. The report lands, then ninety minutes live with whoever the client wants in the room. Two weeks from access, end to end.',
        ],
      },
      { t: 'h2', text: 'Why ten days is enough, when diligence normally takes longer' },
      {
        t: 'p',
        text:
          'This is the fair objection, and the answer is pattern recognition rather than speed. A thousand client engagements have run through this firm since 2021. The same short list of operational failures turns up in almost every company, which means the work is not open-ended discovery — it is checking a known list against a specific estate, in a known order, starting with the failure that is most often the largest.',
      },
      {
        t: 'p',
        text:
          'A diagnostic that started from first principles every time would take a quarter and would produce a worse answer, because it would spend its budget on breadth rather than on measuring the three things that matter in that particular company. The narrowness is the product.',
      },
      {
        t: 'p',
        text:
          'What ten days is not enough for is anything requiring a measurement window. Response latency and conversion-by-latency are visible in twelve months of history that already exists. A recovery figure is not — that only becomes real after implementation, measured in the same system against the same baseline, which is why found and sealed are different words with different definitions.',
      },
      { t: 'h2', text: 'The two things that cause almost every overrun' },
      {
        t: 'p',
        text:
          'The first is access, and it is not close. Credentials, API keys, admin rights on a system nobody currently owns, a third-party vendor who takes eleven days to answer an integration request. This delays more engagements than any analytical problem and it is almost entirely preventable by starting the requests the day the engagement is commissioned rather than the day before kickoff.',
      },
      {
        t: 'p',
        text:
          'The second is the absence of a single owner. One person who can grant access and answer questions without escalating is a stated requirement of the engagement, and where that person does not exist the work stalls in a way no amount of effort on the firm’s side fixes. An engagement sponsored by a committee spends its first week finding out who decides.',
      },
      {
        t: 'note',
        text:
          'Neither of these is a technical problem, which is why neither is solved by working faster. Both are resolved by one person making a decision, and that person is usually busy.',
      },
      { t: 'h2', text: 'What a client can do before kickoff to compress it' },
      {
        t: 'ul',
        items: [
          'Name the owner first, before anything else. Not the team — the person, with the authority to grant access without going upward.',
          'List every system that touches a lead, and name who administers each one. Start the access requests immediately, in parallel, rather than as each is needed.',
          'Get the security review started on day one if one is required. This is the single longest pole in most mid-market engagements and it is entirely parallelisable.',
          'Book the four to six interview slots in advance. Thirty minutes each, across sales, operations and service. Half of scheduling friction is calendars, not willingness.',
          'Do not assemble anything. Twelve months of whatever the systems already hold is the input. Time spent preparing a data pack is time the firm would rather you spent finding the admin credentials, and a hand-assembled export is less trustworthy than the raw system anyway.',
        ],
      },
      { t: 'h2', text: 'What a shorter quote usually means' },
      {
        t: 'p',
        text:
          'A three-day diagnostic is a workshop. That can be genuinely useful — a structured conversation with an experienced operator often surfaces the obvious leak — but it produces hypotheses rather than figures, because there is no time to measure anything in a system. If what you need is a number you can put in front of a board, a workshop will not produce one.',
      },
      {
        t: 'p',
        text:
          'Conversely, a twelve-week engagement at this scope is usually being staffed rather than scoped: the timeline is a function of how many people are being kept billable, not of how long the work takes. The tell is whether the fee is fixed. A fixed fee makes a long timeline expensive for the firm, which is the alignment you want.',
      },
    ],
  },

  /* --------------------------------------------------------------------- */
  {
    slug: 'revenue-leakage-vs-a-sales-problem',
    title: 'Revenue leakage vs. a sales problem: which one do you have?',
    description:
      'They look identical from the top of a P&L and have nothing in common as interventions. A test you can run on your own data this week.',
    answer:
      'You have a leakage problem if demand is arriving and being lost after arrival for operational reasons, and a sales problem if the demand converting poorly is demand your team actually spoke to. The test separates them in an afternoon: split last quarter’s enquiries by whether they got a genuine human response inside an hour, then compare conversion between the two groups. If the fast group converts materially better and the slow group is large, the constraint is operational and hiring more salespeople will not fix it. If both groups convert about the same, the constraint is commercial.',
    category: 'Diagnosis',
    datePublished: '2026-09-23',
    published: true,
    body: [
      { t: 'h2', text: 'Why the two get confused' },
      {
        t: 'p',
        text:
          'Because they present identically. Revenue is below plan, the pipeline looks thin, and the conversion rate in the CRM is disappointing. Every one of those symptoms is consistent with both diagnoses, and the CRM cannot distinguish between them — it reports on the opportunities it received, and the entire question is about the population it did not.',
      },
      {
        t: 'p',
        text:
          'So the default diagnosis wins by convention rather than by evidence, and the default diagnosis is a sales problem. It is the one with an obvious intervention, an owner, and a vocabulary everyone already shares. The interventions that follow — more reps, more training, a new comp plan, more pipeline — are all expensive, all slow to evaluate, and all useless against a latency problem.',
      },
      { t: 'h2', text: 'The test, in detail' },
      {
        t: 'p',
        text:
          'It needs one quarter of history and no new instrumentation. The point is to compare like with like, so the work is mostly in defining the populations honestly.',
      },
      {
        t: 'ol',
        items: [
          'Pull every inbound enquiry from last quarter, from every channel. Every channel is doing real work in that sentence: the ones you forget are usually the ones leaking.',
          'For each, timestamp the first GENUINE human response. Not the autoresponder, not the system-generated acknowledgement, not the SDR sequence step one. If a person did not engage, it does not count.',
          'Split the population at one hour. The threshold is arbitrary and that is fine; use whatever is meaningful in your market, and use the same threshold for both groups.',
          'Compare close rate between the two groups, using your own outcomes rather than any benchmark.',
          'Separately, count the enquiries that received exactly one contact and no second. This number is usually the surprise, and it is a different leak from latency.',
        ],
      },
      {
        t: 'p',
        text:
          'Now read the result. A large gap with a large slow group is leakage. A small gap is a sales problem — your team is reaching people and not closing them, and that is a commercial issue. A large gap with a tiny slow group is a leakage problem that is already mostly solved and not where your money should go next.',
      },
      {
        t: 'note',
        text:
          'One confound to control for: if your fast-response population is fast because it is inherently higher-intent — inbound demo requests answered immediately, versus cold content downloads that sit — then you are comparing two different populations, not two response speeds. Segment by source first, then run the split inside each source.',
      },
      { t: 'h2', text: 'What each diagnosis actually costs to act on' },
      {
        t: 'p',
        text:
          'This is where the distinction pays for itself. A sales intervention is a hiring and enablement programme: months to staff, a quarter or more before the signal is readable, and the cost is ongoing headcount. A leakage intervention is a build: weeks, a signal visible in the first week for latency and within one sales cycle for conversion, and the cost is largely one-time. Implementation at this scale typically runs $25,000 to $75,000 across all phases.',
      },
      {
        t: 'p',
        text:
          'Getting the diagnosis wrong in the expensive direction — treating leakage as a sales problem — means adding headcount to a funnel that will lose a similar proportion of whatever the new reps generate. The new demand leaks through the same gaps. That is the specific failure mode worth avoiding, because it is self-concealing: revenue does go up, so the intervention looks like it worked, and the leak is now proportionally larger in absolute dollars.',
      },
      { t: 'h2', text: 'Why additional marketing spend is the worse mistake' },
      {
        t: 'p',
        text:
          'Same logic, sharper. If 65% of your enquiries are not reached inside an hour, then buying more enquiries buys a population of which roughly 65% will be handled the same way. You are paying acquisition cost on demand you have a structural reason to believe you will not convert.',
      },
      {
        t: 'p',
        text:
          'This is the argument for sequencing rather than for choosing. Close the gap, then buy the demand, and the same media budget produces more revenue than it did before without the budget changing. Doing it the other way round works too, eventually, and it costs the difference.',
      },
      { t: 'h2', text: 'The cases where it genuinely is a sales problem' },
      {
        t: 'ul',
        items: [
          'Conversion is flat across response speeds and your slow population is small. The operational path is clean and the problem is downstream.',
          'Deals are reaching late stage and dying there. Late-stage loss is a commercial and competitive problem, not a latency one.',
          'Win rates differ sharply between reps on comparable territories. That is a people and enablement signal and no amount of routing fixes it.',
          'Your average deal value is falling while volume holds. That is pricing and positioning.',
        ],
      },
      { t: 'h2', text: 'And the cases where it is both' },
      {
        t: 'p',
        text:
          'Frequently, and the sequencing still matters. Where both are true, the leakage side is usually the one to do first for a reason that has nothing to do with which is larger: it is measurable faster and it is cheaper to reverse if you are wrong. A build that closed a gap can be evaluated against a baseline within a quarter. A hiring programme cannot be evaluated inside a year, and it cannot be unwound cheaply.',
      },
      {
        t: 'p',
        text:
          'The broader reason to run the test at all is that it converts an argument into an arithmetic problem. Whether you have a sales problem is a question people hold opinions about; whether your slow-response population converts worse than your fast one is a question your own systems have already answered.',
      },
    ],
  },
  /* --------------------------------------------------------------------- */
  {
    slug: 'operational-diligence-vs-management-consulting',
    title: 'Operational diligence vs. management consulting: what is the difference?',
    description:
      'One produces recommendations from interviews and benchmarks. The other produces figures measured inside your own systems. Where each is the right instrument.',
    answer:
      'The difference is what a deliverable is allowed to contain. Management consulting produces recommendations supported by interviews, benchmarks and analysis; operational diligence of this kind produces figures measured inside your own systems, with the system and the period named against each one, and excludes anything it cannot measure there. That exclusion is the whole distinction. It makes the output narrower, considerably cheaper — a fixed $5,000 rather than a scoped engagement — and testable, because every number in it can be re-derived by somebody who does not trust you.',
    category: 'Comparison',
    datePublished: '2026-09-23',
    published: true,
    body: [
      { t: 'h2', text: 'The rule that separates them' },
      {
        t: 'p',
        text:
          'Anything that cannot be measured in a system the client owns does not go in the report. That single rule produces almost every other difference between the two, so it is worth sitting with before comparing anything else.',
      },
      {
        t: 'p',
        text:
          'It rules out benchmark comparisons, because a benchmark is a fact about other companies. It rules out figures derived from interviews, because an interview is evidence about where to look rather than evidence of magnitude. It rules out market sizing, strategic options and organisational design, all of which are legitimate work and none of which can be measured in a CRM. What it leaves is a narrow class of finding: demand that entered a system, did not convert, and can be priced against that company’s own rates.',
      },
      {
        t: 'p',
        text:
          'Interviews still happen — four to six of them, thirty minutes each, across sales, operations and service. Their purpose is specific: to find the gap between what the system records and what people actually do. That gap tells you where to go and measure. It never becomes a number on its own.',
      },
      { t: 'h2', text: 'What each one is actually good at' },
      {
        t: 'p',
        text:
          'Management consulting is the right instrument when the question is what to do. Which markets, which products, what the operating model should look like, whether to build or buy, how to structure the organisation after an acquisition. These are judgement questions where the value is in framing and experience, and no amount of system access answers them.',
      },
      {
        t: 'p',
        text:
          'Operational diligence of this kind is the right instrument when the question is where the money is going and how much. It is a measurement exercise with a narrow scope and a specific output, and it is deliberately not strategic. Nobody should commission it expecting a view on their market.',
      },
      {
        t: 'p',
        text:
          'The failure mode in both directions is buying one and expecting the other. A strategy engagement will not hand you a defensible leakage figure. A leakage diagnostic will not tell you whether to enter Texas.',
      },
      { t: 'h2', text: 'Cost, and why the gap is so large' },
      {
        t: 'p',
        text:
          'A fixed $5,000, credited in full against implementation, against a scoped consulting engagement that is normally a multiple of that. The gap is not a discount and it is not a comment on anyone’s value. It is a function of three structural things.',
      },
      {
        t: 'ul',
        items: [
          'Scope. Ten business days from systems access, on a known list of failure modes, in a known order. Narrowness is what makes a fixed price possible at all.',
          'Pattern recognition instead of discovery. A thousand engagements since 2021 means the work is checking a known list against a specific estate rather than starting from first principles, which is what a consulting engagement must do because its questions are genuinely open.',
          'The follow-on. The fee is credited against a build the same firm would do. The diagnostic does not have to carry the firm’s margin on its own, which a standalone advisory product does.',
        ],
      },
      {
        t: 'p',
        text:
          'That third point cuts both ways and should be named rather than glossed. A credited fee creates an incentive to find something buildable. The counterweight has to be structural: if the leakage is immaterial the report says so in its first paragraph and the firm says do not hire us, and implementation is approved one phase at a time rather than as a committed total. A firm with the credit and neither counterweight has a sales funnel with a report attached.',
      },
      { t: 'h2', text: 'How to tell which one you are being sold' },
      {
        t: 'ol',
        items: [
          'Ask whether every figure in the deliverable will name the system it was measured in and the period it covers. This is the fastest question and it separates the two categories immediately.',
          'Ask what happens if nothing material is found. A measurement exercise has an answer and it is a null result. An advisory engagement structurally cannot return nothing — there is always a recommendation.',
          'Ask whether benchmarks appear in the output. Not a criticism: benchmarks are useful and they are a different epistemic object from a measurement of your business.',
          'Ask who is in your systems and for how long. If the answer is nobody, you are buying analysis of what you tell them rather than of what is there.',
          'Ask whether another firm could execute the roadmap. A plan you cannot take elsewhere is a dependency dressed as a deliverable.',
        ],
      },
      { t: 'h2', text: 'The audit-firm comparison, which is closer' },
      {
        t: 'p',
        text:
          'Operational diligence has more in common with an audit than with strategy work, and the comparison is instructive. Both measure rather than advise, both name their evidence, both can return a clean result. The difference is that an audit is testing compliance against a standard, and this is testing conversion against the company’s own potential — so there is no external standard, only the company’s own fast-response population as the counterfactual.',
      },
      {
        t: 'p',
        text:
          'That is also why the recoverability haircut matters so much and why a stated one is a mark of seriousness. An audit either finds a misstatement or does not. A leakage figure is an estimate of what could be recovered, and an estimate without an explicit haircut is implicitly claiming that every lost enquiry was winnable, which nobody believes and which invalidates the rest of the report.',
      },
      { t: 'h2', text: 'When you need both, and in which order' },
      {
        t: 'p',
        text:
          'Measure first, almost always. A leakage figure is cheap, fast and it changes the strategic conversation: knowing that $3M a year is leaking out of the existing funnel is materially relevant to whether the answer is a new market or a fixed operation. The reverse sequence — strategy first, then measurement — routinely produces a strategy that assumes the operation converts better than it does.',
      },
      {
        t: 'p',
        text:
          'The exception is a genuine inflection: a pending acquisition, a new product line, an imminent change of model. There, the operation you would measure is about to stop existing, and measuring it carefully is a way of answering a question that will be obsolete by the time the answer arrives.',
      },
    ],
  },

  /* --------------------------------------------------------------------- */
  {
    slug: 'which-revenue-leaks-to-close-first',
    title: 'Which revenue leaks are worth closing first?',
    description:
      'Rank by recoverable dollars against effort, not by size. The ordering rule, the four-question test, and the leaks that feel urgent and are not.',
    answer:
      'Rank every leak by recoverable dollars divided by the effort to recover it, and work in that order — which is almost never the list by size. The largest leak is usually the hardest to close, because size and structural depth correlate: a leak between two systems that cannot talk to each other is big and expensive, while one caused by nobody owning a follow-up step is smaller and closable in a fortnight. Early credibility funds everything after it, so the first build should produce a measurable number inside one sales cycle.',
    category: 'Strategy',
    datePublished: '2026-09-23',
    published: true,
    body: [
      { t: 'h2', text: 'Why size is the wrong ordering' },
      {
        t: 'p',
        text:
          'Because a ranked list by size is a ranked list by difficulty, and nobody notices until the first build is four months late. The correlation is not an accident. Big leaks tend to sit at structural boundaries — between two systems of record, between two departments, between a process and the workaround the team invented to survive it — and those are exactly the places where closing anything requires a decision nobody currently owns.',
      },
      {
        t: 'p',
        text:
          'Smaller leaks tend to be local: one missing trigger, one unrouted channel, one step that depends on somebody remembering. They are cheap, fast, and they produce a number you can put in front of a board within a quarter. Starting there is not timidity. It is how you buy the political capital to attempt the structural one.',
      },
      {
        t: 'p',
        text:
          'This is why a report that ranks by recoverable dollars against effort is worth more than one that ranks by magnitude, and why the order the report is written in should be the order the work happens in.',
      },
      { t: 'h2', text: 'The four-question test for any candidate' },
      {
        t: 'p',
        text:
          'A leak needs a yes on the first two to be a candidate at all.',
      },
      {
        t: 'ol',
        items: [
          'Can it be measured in a system you already own, before and after? If not, you cannot prove the build worked, and an improvement you cannot prove is one you will be asked to justify in a budget review you then lose.',
          'Is the logic writable? If you can describe the rule in a paragraph, it can be automated. If the honest answer is "it depends, you get a feel for it", this is a process to document before it is a process to automate.',
          'Does it recur often enough to matter? A monthly failure costing $2,000 is $24,000 a year against a build that might take three weeks. The arithmetic has to clear on its own.',
          'Is the process stable? Automating something you are about to redesign means building it twice, and the second build is more expensive than the first because it has to be unpicked.',
        ],
      },
      { t: 'h2', text: 'The ordering, for most operating companies' },
      {
        t: 'p',
        text:
          'First: response latency on inbound enquiries. First for nearly everyone and it is not close. The loss is silent, the mechanism is well understood, the fix is a routing and automation problem rather than a staffing one, and the signal is visible in the first week. It is also the leak most often misdiagnosed, which means fixing it corrects a belief as well as a number.',
      },
      {
        t: 'p',
        text:
          'Second: follow-up behind a first response. Cheaper to build than intake routing and frequently comparable in value. Most companies reply once and stop. A conversation that stalls and is never picked back up closes itself, and the CRM records it as open indefinitely, which is why nobody sees it.',
      },
      {
        t: 'p',
        text:
          'Third: routing and assignment. Enquiries that arrived, were answered, and reached the wrong person, territory or location. Invisible until somebody measures time-to-first-contact segmented by source, at which point one channel is obviously worse than the others and nobody knew.',
      },
      {
        t: 'p',
        text:
          'Fourth: renewal and expansion triggers. Existing revenue lapsing because the prompt was a person remembering rather than a system firing. Usually the cheapest of all to close and almost always the last one anybody looks at, because it is not a new-business number and therefore has no natural owner.',
      },
      {
        t: 'p',
        text:
          'Fifth: quote and proposal turnaround, where quoting is formulaic. High delay cost per instance and the logic is usually already written down in a pricing sheet, which satisfies question two immediately.',
      },
      {
        t: 'p',
        text:
          'Sixth: handover between sales and delivery. Lower urgency, real retention impact, and it is the moment a customer decides whether the thing they bought is well run.',
      },
      { t: 'h2', text: 'The three that feel urgent and are not' },
      {
        t: 'p',
        text:
          'Internal reporting. Genuinely annoying, highly visible to leadership, and what it produces is hours saved — which get absorbed into the working day rather than reallocated, and therefore never reach a P&L. Worth doing. Not worth doing first.',
      },
      {
        t: 'p',
        text:
          'Data entry between two systems that should not both exist. Automating the transfer entrenches the duplication and makes the eventual consolidation harder. The better move is usually to remove one system, and an automation project is frequently how a company avoids having that conversation.',
      },
      {
        t: 'p',
        text:
          'Whatever the loudest person complains about most. Sometimes that is the right target. Sometimes it is a process affecting one person for twenty minutes a week. Run it through the four questions before it sets the roadmap by volume of complaint.',
      },
      { t: 'h2', text: 'Sequencing rules that survive contact with reality' },
      {
        t: 'ul',
        items: [
          'Capture the baseline before touching anything. Current latency, conversion by latency, volume by channel. After go-live that data is gone, and without it you cannot prove what changed — which is the most common reason a successful build gets no credit.',
          'Pick something measurable within one sales cycle for the first build. A first project whose result is only visible in nine months will not survive a budget conversation.',
          'Do one intake path properly rather than four at once. What you learn doing the first usually changes the scope of the second, and doing them in parallel forfeits that.',
          'Write the failure path before the automation. Every automated step needs a defined answer for the case it cannot handle. Deciding that afterwards means deciding it during an incident.',
          'Name an owner for each closed leak, and attach a visible number to it. A leak that was closed and is not watched reopens, and a tool nobody owns leaks again within a quarter.',
          'Let the second build wait until the first has run unattended for a month. That month is where you find out what you actually built.',
        ],
      },
      { t: 'h2', text: 'The failure this ordering exists to prevent' },
      {
        t: 'p',
        text:
          'The common failure is not choosing the wrong leak. It is automating a genuinely bad process extremely well, and thereby making a fragmented operation faster at being fragmented. Automation amplifies whatever it is pointed at: point it at a coherent process and it compounds what works, point it at a broken one and it industrialises the breakage at a speed no human could sustain.',
      },
      {
        t: 'p',
        text:
          'Which is why measurement comes before building, and why the honest version of this exercise sometimes concludes that a process should be deleted rather than automated. That conclusion is a good outcome and it is considerably cheaper than the alternative.',
      },
    ],
  },
  /* --------------------------------------------------------------------- */
  {
    slug: 'how-to-measure-roi-on-closing-a-revenue-leak',
    title: 'How do you measure the ROI of closing a revenue leak?',
    description:
      'Capture the baseline before the build, measure in the system the leak was found in, and expect sealed to be smaller than found. The metrics that survive a board review.',
    answer:
      'Capture the baseline before the build starts — that is the only moment an honest baseline still exists — then measure recovery in the same system the leak was found in, against that same baseline, over a stated window. Three numbers survive scrutiny: found, which is annualised leakage identified; sealed, which is annualised recovery actually measured afterwards and is always smaller than found; and payback, the number of weeks for measured recovery to equal total fees paid. Hours saved does not survive, because the freed hour gets absorbed rather than reallocated and never reaches a P&L.',
    category: 'Measurement',
    datePublished: '2026-09-23',
    published: true,
    body: [
      { t: 'h2', text: 'The baseline expires, and this is unrecoverable' },
      {
        t: 'p',
        text:
          'It is the most common and most expensive mistake in this work. Once the new process is live, the old behaviour is gone. You cannot reconstruct what your response latency was, or how conversion varied by latency, from a CRM that has been reorganised around the new workflow. The comparison you needed is no longer available at any price.',
      },
      {
        t: 'p',
        text:
          'Capture, before anything is built: enquiry volume by channel; time from enquiry to first genuine human response; conversion split by that response speed; average first-year value; and the share of enquiries receiving no second contact. Take at least a full sales cycle, and longer if the business is seasonal.',
      },
      {
        t: 'p',
        text:
          'Store it outside the systems being changed, dated, with the extraction method written down so somebody can reproduce it in a year — and that somebody will not be you, it will be a finance business partner who was not in the room. A baseline nobody can re-derive is an assertion.',
      },
      { t: 'h2', text: 'Found, sealed and payback' },
      {
        t: 'p',
        text:
          'Three words with three definitions, and keeping them distinct is what makes the reporting credible. Found is annualised leakage identified during the diagnostic. Sealed is annualised recovery measured after implementation, over the period stated. Payback is the weeks required for measured recovery to equal total fees paid, diagnostic plus implementation.',
      },
      {
        t: 'p',
        text:
          'The relationship between the first two is the important part. Sealed is always smaller than found, and a report claiming otherwise should be discarded. Some of what was found was never recoverable; some of it required a decision the business chose not to make; some leaked out through a different gap once the first was closed. A complete seal is not credible and reads as fabrication to anyone who has done this work.',
      },
      {
        t: 'note',
        text:
          'If a firm presents a sealed figure equal to its found figure, the useful question is not "how" but "what happened to the recoverability haircut". Every honest leakage model has one, and it should be stated as a number rather than buried.',
      },
      {
        t: 'p',
        text:
          'A worked shape makes the relationship concrete. A diagnostic finds $3.0M of annualised leakage. Implementation closes the top three leaks across two phases at $60,000. Measured recovery over the following two quarters annualises to $1.1M — smaller than what was found, as it always is. Total fees paid are $65,000 including the $5,000 diagnostic, so payback is roughly three weeks of recovered revenue. Those are the four numbers a board wants: found, spent, sealed, and weeks to payback.',
      },
      { t: 'h2', text: 'The metrics that hold up in front of a board' },
      {
        t: 'ul',
        items: [
          'Time to first genuine contact. The most direct measure of the thing that changed, visible within a week, and difficult to argue with because it is a timestamp rather than an inference.',
          'Conversion by response speed. The causal link. If fast-response conversion was already higher before the build, and volume has moved from the slow group to the fast group, attribution is an argument rather than an assertion.',
          'Revenue per enquiry. Volume-independent, which matters because it survives a good quarter and an ordinary one without needing to be explained.',
          'Dollars recovered, annualised, with the system and the window named. This is the number a CFO will engage with and the only one that belongs in a board pack headline.',
          'Payback in weeks. Converts the whole exercise into the unit an investment committee already uses.',
        ],
      },
      { t: 'h2', text: 'And the ones that do not' },
      {
        t: 'p',
        text:
          'Hours saved. The saving is real and it never lands on a financial statement, because the freed hour is absorbed into the working day rather than redeployed to something measurable. It cannot defend a renewal and it should not be the headline.',
      },
      {
        t: 'p',
        text:
          'Activity counts — messages sent, workflows built, tasks automated. These describe the system rather than its effect, and their improvement is guaranteed by the project having happened at all.',
      },
      {
        t: 'p',
        text:
          'Satisfaction scores in isolation. Useful as a guard against having broken something, useless as evidence of value, and easily moved by things unrelated to the build.',
      },
      { t: 'h2', text: 'Attribution without a research budget' },
      {
        t: 'p',
        text:
          'The fair objection to any before-and-after is that other things changed too. Three defences, in ascending order of rigour, and all three are available to a mid-market company.',
      },
      {
        t: 'ol',
        items: [
          'Compare against the same period last year rather than the previous quarter. Crude, and it handles seasonality, which is the most common confound.',
          'Use a control. If you have multiple locations, territories or channels, roll out to some and not others. This is the strongest option most companies have and it is far easier than it sounds — it mostly requires resisting the urge to launch everywhere at once.',
          'Segment within the change. Compare conversion among enquiries that were already fast before the build against those moved from slow to fast. If the gain is concentrated in the second group, the mechanism is doing the work rather than the calendar.',
        ],
      },
      { t: 'h2', text: 'When to measure what' },
      {
        t: 'ul',
        items: [
          'Week one: operational metrics only. Latency, error rate, escalation rate. These move immediately and tell you whether the thing works at all.',
          'Weeks two to four: leading indicators. Contact rate, booking rate, drop-off. Do not report conversion yet.',
          'One full sales cycle: conversion and revenue. For some businesses that is three weeks and for others two quarters. Reporting a conversion lift before a cycle has closed is reporting noise, and doing it once costs you credibility for every real number afterwards.',
          'Quarterly thereafter: same metrics, same method, same definitions. Consistency is what makes the series worth anything, and changing a definition mid-series destroys it.',
        ],
      },
      { t: 'h2', text: 'The one-page report that survives' },
      {
        t: 'p',
        text:
          'The baseline, dated, with its extraction method. The change, in the same units. The attribution argument, including what else changed in the period and why you believe it does not account for the result. The dollar figure with its arithmetic visible. And the assumptions listed, so a sceptical reader can adjust one and watch what happens.',
      },
      {
        t: 'p',
        text:
          'That last item is the one people leave out and it is the one that does the work. A conclusion that survives a hostile adjustment of its own inputs is worth more than a larger number that does not, and inviting the adjustment is what signals you already tried it.',
      },
    ],
  },

  /* --------------------------------------------------------------------- */
  {
    slug: 'how-to-price-a-revenue-leak-in-ebitda',
    title: 'How to price a revenue leak in EBITDA',
    description:
      'Recovered revenue is not recovered earnings. How to convert a leakage figure into an EBITDA number, and into enterprise value, without overstating it.',
    answer:
      'Convert recovered revenue to EBITDA by applying the incremental contribution margin on that revenue — not your blended gross margin, and not your net margin — then subtract the annualised cost of whatever now runs the recovered process. The result is usually a fraction of the headline revenue figure, and stating it that way is what makes it credible to an investment committee. Multiplying that EBITDA figure by your sector’s multiple gives an enterprise-value effect, which is the number that actually decides whether an operational build gets funded at a sponsor-backed company.',
    category: 'Measurement',
    datePublished: '2026-09-23',
    published: true,
    todo:
      '⚠️ Deliberately contains no asserted EBITDA multiples. Multiples are sector- and cycle-specific, this firm has not measured them, and publishing a number here would be exactly the unsourced-figure failure §10 exists to prevent. The worked example uses a reader-supplied multiple and says so.',
    body: [
      { t: 'h2', text: 'Why revenue is the wrong unit to present in' },
      {
        t: 'p',
        text:
          'A leakage figure is naturally produced in revenue, because revenue is what leaked. But revenue is not the unit the decision gets made in at a company with a sponsor, a board or a credit agreement. Those readers think in EBITDA, and presenting a revenue number to them invites the correct objection that most of it is not profit.',
      },
      {
        t: 'p',
        text:
          'Worse, presenting revenue makes the figure look larger than the value it represents, which is the specific way a good analysis loses its reader. An operating partner who mentally discounts your $3M to $600,000 while you are still talking has stopped evaluating the finding and started evaluating you.',
      },
      {
        t: 'p',
        text:
          'So do the conversion yourself, in the report, and show it. The number gets smaller and considerably harder to argue with.',
      },
      { t: 'h2', text: 'Incremental contribution margin, not gross margin' },
      {
        t: 'p',
        text:
          'This is the step that is most often done wrong, and the error always runs in the same direction. Recovered demand is incremental, which means the right margin to apply is the contribution margin on one more unit of that specific revenue — not the blended gross margin across the business.',
      },
      {
        t: 'p',
        text:
          'Sometimes incremental margin is higher than blended, because fixed costs are already covered and the recovered revenue drops through at near-contribution. Sometimes it is much lower, because serving more volume requires more capacity: another technician, another van, another shift. Which of those is true is a question about where you sit relative to capacity, and it is the single largest determinant of whether a leakage finding is worth acting on.',
      },
      {
        t: 'p',
        text:
          'The honest version states which case applies and why. "We are at 70% utilisation on installation crews, so the first $1.4M of recovered revenue requires no additional capacity and the next tranche requires a crew" is a sentence that makes a report credible. Applying a single blended margin to the whole figure does the opposite.',
      },
      { t: 'h2', text: 'The chain, with a worked example' },
      {
        t: 'p',
        text:
          'Take the $3.0M annualised leakage figure from a diagnostic at a $40M services business. Every input below is either that company’s own or explicitly the reader’s to supply.',
      },
      {
        t: 'ol',
        items: [
          'Start with recovered revenue: $3.0M annualised, already net of a stated recoverability haircut.',
          'Apply incremental contribution margin. Suppose 45% on this revenue, with existing capacity absorbing it. That is $1.35M of incremental contribution.',
          'Subtract the annualised cost of running the recovered process. Software, licences, monitoring, and any partial headcount. Suppose $90,000. That leaves $1.26M.',
          'Subtract the amortised build cost if your board wants it in the first-year figure. Implementation at this scale typically runs $25,000 to $75,000 across all phases; take $60,000, and the first-year EBITDA effect is about $1.20M with the run-rate effect at $1.26M.',
          'Apply your sector’s EBITDA multiple to the run-rate figure to get the enterprise-value effect. The multiple is yours to supply — it is sector- and cycle-specific and nobody should take one from an article. At a hypothetical 7x, $1.26M becomes roughly $8.8M of enterprise value.',
        ],
      },
      {
        t: 'note',
        text:
          'Notice the ratio at the end. A $60,000 build producing $1.26M of run-rate EBITDA, capitalised, is an enterprise-value effect two orders of magnitude larger than the spend. That asymmetry is why operational leakage is interesting to sponsors at all — and it is also why the inputs have to be conservative enough to survive somebody re-deriving them, because the conclusion is extreme enough to attract scrutiny.',
      },
      { t: 'h2', text: 'The four places this arithmetic gets inflated' },
      {
        t: 'ul',
        items: [
          'Using blended gross margin instead of incremental contribution margin. Almost always overstates, and it is the first thing a CFO checks.',
          'Ignoring the capacity step. Recovered demand that cannot be served is not recovered revenue, it is a waiting list and a service failure.',
          'Omitting the run cost. Every automated process has an ongoing cost, and a figure presented without it is a gross number pretending to be net.',
          'Applying a multiple to a found figure rather than a sealed one. Found is what the diagnostic identified; sealed is what was measured afterwards and is always smaller. Capitalising found rather than sealed is the single largest overstatement available in this arithmetic, and it is the one most often made.',
        ],
      },
      { t: 'h2', text: 'What to do when the multiple is unknown or contested' },
      {
        t: 'p',
        text:
          'Present the EBITDA effect and stop there, then show the enterprise-value effect as a sensitivity across a range the reader chooses rather than as a single figure. Three columns at three multiples is more persuasive than one column at your preferred one, because it demonstrates that the conclusion does not depend on the assumption you would most like to be true.',
      },
      {
        t: 'p',
        text:
          'The same logic applies to the recoverability haircut and the margin. Any figure in this chain that you would be reluctant to see adjusted is a figure the reader should adjust first.',
      },
      { t: 'h2', text: 'Why the conversion is worth doing even when it shrinks the number' },
      {
        t: 'p',
        text:
          'Because it changes what the finding is for. A revenue figure is interesting. An EBITDA figure is fundable. An enterprise-value figure is the version that gets discussed at a board meeting where the operational detail is not on the agenda.',
      },
      {
        t: 'p',
        text:
          'And because the conversion is the part a sceptical reader would otherwise do themselves, silently, less generously than you would, and without telling you the result. Doing it in the report means you control the assumptions on the record instead of losing the argument in somebody’s head.',
      },
    ],
  },
  /* --------------------------------------------------------------------- */
  {
    slug: 'what-access-does-a-diagnostic-need',
    title: 'What access does a revenue leakage diagnostic need, and what should you demand in return?',
    description:
      'The four things a diagnostic genuinely needs, what it should never be given, and the six questions your IT or legal team will ask before granting any of it.',
    answer:
      'Read access to every system that touches a lead — CRM, inbound channels, calendar, ticketing — plus twelve months of whatever history those systems already hold. That is narrower than most buyers expect: it does not require financial systems, HR records, document stores or payment details. In return you should demand read-only access wherever the system supports it, a named engagement team, a stated retention period, and a defined answer for what happens to the credentials at the end. A firm that has not thought those through has not done many of these.',
    category: 'Engagement',
    datePublished: '2026-09-23',
    published: true,
    todo:
      '⚠️ This post lists the questions a buyer should ask and deliberately does NOT answer them on this firm’s behalf. CONFIDENTIALITY in content/diagnostic.ts is empty by design — an invented security posture is worse than an absent one, and a specific false one is actionable. When that section is filled in, link to it from here and add a short section stating the firm’s own answers.',
    body: [
      { t: 'h2', text: 'The four things it genuinely needs' },
      {
        t: 'p',
        text:
          'Systems that touch a lead. CRM, every inbound channel, calendar, ticketing, and anything else an enquiry passes through. The object is to trace every path a lead can take and find where each one stops, which requires seeing the paths rather than a summary of them.',
      },
      {
        t: 'p',
        text:
          'Twelve months of existing history. Whatever the systems already hold. Nobody should be asked to assemble a data pack: the raw system is both less work and more trustworthy than a hand-prepared export, and if something is not in a system it is not evidence anyway.',
      },
      {
        t: 'p',
        text:
          'One owner with authority. A person who can grant access and answer questions without escalating. This is the single most common reason an engagement stalls, and it is a requirement rather than a preference.',
      },
      {
        t: 'p',
        text:
          'Thirty minutes each from four to six people, across sales, operations and service. No preparation. These conversations exist to find the gap between what the system records and what people actually do — which is the one thing no amount of system access reveals, and which never becomes a figure on its own.',
      },
      { t: 'h2', text: 'What it should never be given' },
      {
        t: 'ul',
        items: [
          'Financial systems. Nothing in a leakage diagnostic requires reading your general ledger. Deal values and conversion rates come from the CRM.',
          'HR or employee records. Never relevant.',
          'Blanket document or drive access. A frequent and lazy request — "give us the shared drive so we can find things". This is how an engagement ends up with visibility of an internal memo it had no business reading.',
          'Payment or card data. Out of scope entirely.',
          'Write access to anything destructive. No ability to delete records, modify pricing, or alter historical data. Read-only wherever the platform supports it.',
          'Production credentials belonging to a named individual. A service account per integration, always, so that revoking it later is a non-event rather than a password reset for a person.',
        ],
      },
      {
        t: 'p',
        text:
          'The pattern across all six is worth noticing: the narrow request is also the better-engineered one. A firm that knows exactly which permissions it needs has scoped the work; a firm that asks for administrator access has not, and will be reasoning about your business from a pile of data it did not need.',
      },
      { t: 'h2', text: 'The six questions to ask before granting anything' },
      {
        t: 'p',
        text:
          'These are the questions a buyer’s IT or legal function will raise, and it is faster to put them to the firm directly at the point of commissioning than to discover the answers during provisioning.',
      },
      {
        t: 'ol',
        items: [
          'Is there an NDA, is it mutual, and who signs it?',
          'Is access read-only wherever the system supports it?',
          'Who inside the firm sees the data, and is it limited to the engagement team?',
          'What happens to the credentials at readout — revoked by you, or returned?',
          'Is anything retained afterwards, and if so what, where, and for how long?',
          'Are subcontractors or offshore staff involved at any point?',
        ],
      },
      {
        t: 'note',
        text:
          'Get the answers in writing rather than on a call. Not because anyone is expected to lie, but because the answer to question five in particular tends to differ between what a principal believes and what a delivery process actually does, and writing it down is how that gets reconciled before it matters.',
      },
      { t: 'h2', text: 'Why the real transaction is access, not the fee' },
      {
        t: 'p',
        text:
          'A $5,000 diagnostic is not really a $5,000 decision. It is a decision to hand a firm you have not worked with visibility of the system your revenue runs through, and an operating partner at a $40M company will not clear that internally on the strength of good copy about the report. The fee is the small half of the transaction.',
      },
      {
        t: 'p',
        text:
          'Which means the security conversation is not a procurement formality to be got through — it is a substantial part of what you are evaluating. A firm with crisp answers has done this often enough to have been asked before. A firm that treats the question as friction is telling you something about the last several engagements.',
      },
      { t: 'h2', text: 'Data residency, and the questions that follow from it' },
      {
        t: 'p',
        text:
          'For Canadian companies, and particularly for anyone with public-sector or healthcare-adjacent customers, where data physically sits is a real constraint rather than a formality. Ask where data is processed, where it is stored at rest, which sub-processors are involved, and what the retention period is. Four questions, and a firm that cannot answer them in writing has answered them.',
      },
      {
        t: 'p',
        text:
          'Ask separately whether anything from your systems is used to train models. The answer should be no by default and it should be contractual rather than a statement of intent on a marketing page.',
      },
      { t: 'h2', text: 'How to scope access properly, whoever you hire' },
      {
        t: 'ul',
        items: [
          'One service account per integration, never a shared human login.',
          'Least privilege, then verify it. Grant the narrowest permission set and confirm the firm cannot reach something it should not. Assumption is not verification.',
          'Field-level scoping where the platform supports it. A leakage diagnostic needs enquiry source, timestamps, owner, stage and value. It does not need free-text notes on every customer.',
          'Separate read and write paths. Read from systems of record; write nothing, or write to a defined and logged set of fields.',
          'Log every access, and check the log once during the engagement rather than never.',
          'Diarise the revocation for readout day. The most common security failure in consulting engagements is not a breach — it is a credential that stayed live for three years.',
        ],
      },
      {
        t: 'p',
        text:
          'None of this is onerous and all of it is faster to do at the start than to retrofit. It also has a useful side effect: a firm that works comfortably inside a tightly scoped account is demonstrating, before it produces any finding, that it understands the difference between the data it needs and the data it would like.',
      },
    ],
  },

  /* --------------------------------------------------------------------- */
  {
    slug: 'what-if-a-diagnostic-finds-nothing',
    title: 'What happens if a diagnostic finds nothing worth fixing?',
    description:
      'A null result is a real outcome and should be written into the engagement terms. Why it almost never happens, and why a firm that cannot return one is worth less.',
    answer:
      'The report says so in its first paragraph and the firm tells you not to hire it. That should be a written term of the engagement rather than a reassurance on a call, because it is the only structural counterweight to a fee that is credited against implementation — without it, the firm is paid for finding something. In practice a fully null result is rare at $10M to $100M, but a result too small to justify a build is not rare at all, and the two should be treated the same way.',
    category: 'Engagement',
    datePublished: '2026-09-23',
    published: true,
    body: [
      { t: 'h2', text: 'Why this question is really about incentives' },
      {
        t: 'p',
        text:
          'Anyone commissioning a diagnostic whose fee is credited against the follow-on build has spotted the obvious problem: the firm is better off finding something. That is a fair objection and it does not have a rhetorical answer. It has a structural one, or it has none.',
      },
      {
        t: 'p',
        text:
          'The structural answer has two parts. First, a written commitment that an immaterial finding is reported as immaterial, in the first paragraph, with an explicit recommendation not to proceed. Second, implementation priced and approved one phase at a time, with no committed total — because a firm that wanted to inflate findings would want a large committed build, not an approval it has to re-earn at every phase.',
      },
      {
        t: 'p',
        text:
          'Ask for both in writing. A firm that will give you the credit but not the counterweight has built a sales funnel with a report attached to it.',
      },
      { t: 'h2', text: 'The three shapes a disappointing result takes' },
      {
        t: 'p',
        text:
          'A genuinely null result — no measurable leakage — is uncommon in an operation of any complexity. Far more common are three outcomes that all deserve the same honesty.',
      },
      {
        t: 'ol',
        items: [
          'Immaterial. Leakage exists and is small relative to the cost of closing it. A $40,000 annual leak against a $60,000 build is not a project, it is a rounding error with a project attached.',
          'Real but not operational. The loss is genuine and the cause is pricing, product or competitive — none of which an automation build addresses. The correct report says where the money is going and that this firm is the wrong instrument.',
          'Real but not closable yet. The leak is large and it sits behind something structural: a system migration already underway, a reorganisation, an acquisition mid-integration. Building now means building twice.',
        ],
      },
      {
        t: 'p',
        text:
          'The third is the one most likely to be handled badly, because it is the one where a firm can technically deliver a build that technically closes a gap that is about to be rebuilt anyway. Nobody has lied and the money is wasted.',
      },
      { t: 'h2', text: 'What you still own after a null result' },
      {
        t: 'p',
        text:
          'Everything the engagement produced. The report and the roadmap are yours whether you build with the firm, build it yourself, or hand the whole thing to somebody else — and the roadmap is written so that another firm could execute it, which matters most precisely in the case where you are not going to use the firm that wrote it.',
      },
      {
        t: 'p',
        text:
          'A null result also leaves you with something less obvious and quite valuable: a measured baseline of your own funnel that did not exist before. Latency by channel, conversion by latency, volume by source, the share of enquiries receiving no second contact. That baseline is what makes any future claim about operational improvement testable, and it is the thing companies most often discover they needed after it was no longer available.',
      },
      {
        t: 'note',
        text:
          'This is the argument for commissioning a diagnostic before you need one. The baseline expires the moment you change the process, so the cheapest time to capture it is always earlier than the moment you decide you want it.',
      },
      { t: 'h2', text: 'What a null result tells you about the firm' },
      {
        t: 'p',
        text:
          'More than a positive one does, which is the awkward part. Any firm can produce a report full of findings. A firm that has returned a null result and said so has demonstrated the only thing that makes its positive findings worth anything.',
      },
      {
        t: 'p',
        text:
          'So it is a reasonable question to ask in a reference call, or of the firm directly: how many engagements have returned an immaterial finding, and what happened next. The answer being "none, ever" is not the reassurance it sounds like.',
      },
      { t: 'h2', text: 'How to reduce the odds of paying for a null result' },
      {
        t: 'p',
        text:
          'You can get most of the way to the answer yourself, for free, before commissioning anything. The point is not to pre-empt the diagnostic but to establish whether the order of magnitude justifies it.',
      },
      {
        t: 'ul',
        items: [
          'Split last quarter’s enquiries by whether they got a genuine human response inside an hour, and compare conversion between the two groups. A large gap with a large slow group is the signal.',
          'Count enquiries that received exactly one contact and no follow-up. If that number is small, one whole category of leak is already absent.',
          'Call your own business twice — mid-afternoon on a Tuesday, and on a Saturday evening. Note what happens and how long it takes. This costs ten minutes and is startlingly diagnostic.',
          'Check every channel you have ever published. The old inbox, the second number, the chat widget, the marketplace queue.',
          'Multiply the gap you found by your own average first-year value, and annualise it. If that figure is not comfortably a multiple of a $5,000 fee plus a $25,000 to $75,000 build, the honest answer is not yet.',
        ],
      },
      {
        t: 'p',
        text:
          'If that rough arithmetic produces a large number, a diagnostic will tell you how much of it is real and in what order to attack it. If it produces a small one, you have your answer and it cost you an afternoon. Either way the work was worth doing, which is the useful property of a test that can come back negative.',
      },
    ],
  },
];
