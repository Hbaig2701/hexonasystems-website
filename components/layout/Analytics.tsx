'use client';

import { useEffect } from 'react';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';

/**
 * Analytics — spec §10.1.
 * PostHog for audit-funnel drop-off, Vercel Analytics for traffic.
 *
 * PostHog only initialises when a key is configured, so local development and
 * preview deploys stay clean. §9.5: if analytics beyond first-party is used, a
 * cookie consent bar is required — PostHog is configured with
 * `persistence: 'memory'` until consent, and CookieBar upgrades it.
 */
export function Analytics() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    let cancelled = false;
    import('posthog-js').then(({ default: posthog }) => {
      if (cancelled) return;
      posthog.init(key, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
        capture_pageview: true,
        capture_pageleave: true,
        persistence:
          localStorage.getItem('hx-consent') === 'granted' ? 'localStorage+cookie' : 'memory',
      });
      (window as unknown as { posthog?: unknown }).posthog = posthog;
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return <VercelAnalytics />;
}
