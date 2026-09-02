/**
 * content/breakdown.ts — the post-gate modules from §8.7.
 *
 * Everything factual in here is either derived from the visitor's own inputs or
 * marked pending. Nothing is invented: §11 is explicit that nothing on the
 * asset list can be made up, and a fabricated benchmark is exactly the kind of
 * number a sophisticated buyer checks.
 */

/**
 * ⚠️ [ASSET NEEDED · §8.7] Industry benchmark response times.
 * "Companies in your sector typically respond in X minutes; you're at Y."
 * Supply real data or CUT THIS MODULE — the spec offers both options and an
 * invented benchmark is worse than no benchmark.
 */
export const INDUSTRY_BENCHMARKS: { industry: string; medianMinutes: number }[] = [];

/**
 * ⚠️ [ASSET NEEDED · §8.7] How the modelled leak distributes across causes.
 * §8.3 folds "never reached" and "reached late, converted worse" into a single
 * blended penalty on purpose, so this split cannot be derived from the model —
 * it has to come from Hexona's own implementation data.
 *
 * Until it does, the module renders each source WITHOUT a dollar figure and
 * says so, rather than showing a number nobody can defend.
 */
export const LEAK_SOURCE_SHARES: { label: string; share: number }[] = [];

export const LEAK_SOURCES_ATTRIBUTED = false;

export interface LeakSource {
  rank: number;
  title: string;
  detail: string;
}

/** The causes themselves are descriptive, not numerical, so they can ship. */
export const LEAK_SOURCES: LeakSource[] = [
  {
    rank: 1,
    title: 'Inbound that lands outside a staffed window',
    detail:
      'Evenings, weekends and lunch hours. The inquiry is real, the intent is highest in the first few minutes, and nobody is there. This is almost always the largest single source.',
  },
  {
    rank: 2,
    title: 'Handoffs between systems that do not talk',
    detail:
      'A lead arrives in one tool, gets logged in a second, assigned in a third. Every seam adds hours, and hours are what convert a live inquiry into a cold one.',
  },
  {
    rank: 3,
    title: 'Follow-up that stops after the first attempt',
    detail:
      'The first reply goes out and nothing is scheduled behind it. Deals that needed a second or third touch are recorded as "not interested" when they were only unattended.',
  },
];

/** Implementation sketch by monthly volume band (§8.7). Descriptive, not a quote. */
export function sealingSketch(monthlyLeads: number): { band: string; steps: string[] } {
  if (monthlyLeads < 100) {
    return {
      band: 'Under 100 inquiries a month',
      steps: [
        'One intake path. Every channel (form, phone, DM, email) lands in the same queue.',
        'An answering agent that replies in under two minutes, any hour, and books straight into the calendar.',
        'A three-touch follow-up sequence that runs automatically when a first reply goes unanswered.',
      ],
    };
  }
  if (monthlyLeads < 600) {
    return {
      band: '100–600 inquiries a month',
      steps: [
        'One intake path across every channel, with routing rules by source and by value.',
        'Instant AI response and qualification, escalating to a human on the signals you define.',
        'Assignment and follow-up automated end to end, so nothing waits on someone noticing it.',
        'A single dashboard for response time, contact rate and close rate, measured weekly.',
      ],
    };
  }
  return {
    band: 'Over 600 inquiries a month',
    steps: [
      'Consolidated intake with routing by source, value and region.',
      'Instant AI response and qualification at volume, with human escalation paths per segment.',
      'Automated assignment, follow-up and re-engagement, including dormant-lead recovery.',
      'Revenue instrumentation: response time and contact rate reported against pipeline, not against activity.',
      'Staged rollout by channel so nothing goes dark during implementation.',
    ],
  };
}

/** Comparable case, matched on leak tier (§8.7). Only launched cases qualify. */
export function comparableCase(annualLeak: number): { slug: string; label: string } {
  if (annualLeak >= 250_000) {
    return { slug: 'manufacturing-coordination', label: 'Manufacturing coordination, Ontario' };
  }
  if (annualLeak >= 50_000) {
    return { slug: 'missed-lead-capture', label: 'Missed lead capture' };
  }
  return { slug: 'childcare-response-time', label: 'Childcare response time' };
}
