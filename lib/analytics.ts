'use client';

/**
 * lib/analytics.ts — the funnel, spec §1.5 and §14 (Phase 6).
 *
 * The success metrics table measures exactly five transitions:
 *   homepage → audit start → completion → email captured → call booked
 * Every one of them fires an event below. PostHog does the step-by-step
 * drop-off analysis; Vercel Analytics covers page-level traffic.
 */

export type AnalyticsEvent =
  | 'audit_started'
  | 'audit_step_completed'
  | 'audit_completed'
  | 'audit_assumptions_adjusted'
  | 'audit_gate_viewed'
  | 'audit_email_captured'
  | 'audit_link_copied'
  | 'audit_results_restored'
  | 'booking_started'
  | 'booking_submitted'
  | 'cta_clicked';

type Props = Record<string, string | number | boolean | null | undefined>;

interface PostHogLike {
  capture: (event: string, props?: Props) => void;
}

function posthog(): PostHogLike | null {
  if (typeof window === 'undefined') return null;
  return (window as unknown as { posthog?: PostHogLike }).posthog ?? null;
}

export function track(event: AnalyticsEvent, props?: Props): void {
  posthog()?.capture(event, props);

  if (process.env.NODE_ENV === 'development') {
    console.debug('[analytics]', event, props ?? {});
  }
}
