'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

/**
 * §9.5 — "Cookie consent banner if any analytics beyond first-party is used —
 * and if used, make it a TASTEFUL HAIRLINE BAR, not a modal that blocks the
 * hero."
 *
 * It only renders when PostHog is actually configured. No analytics key, no
 * banner — asking for consent to something that isn't running is theatre.
 */
export function CookieBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
    if (localStorage.getItem('hx-consent')) return;
    // Let the hero land first.
    const t = window.setTimeout(() => setVisible(true), 1600);
    return () => window.clearTimeout(t);
  }, []);

  if (!visible) return null;

  function decide(value: 'granted' | 'denied') {
    localStorage.setItem('hx-consent', value);
    setVisible(false);
    if (value === 'granted') {
      const posthog = (window as unknown as { posthog?: { set_config: (c: object) => void } })
        .posthog;
      posthog?.set_config({ persistence: 'localStorage+cookie' });
    }
  }

  return (
    <div
      role="region"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline"
      style={{ backgroundColor: 'var(--header-scrim)', backdropFilter: 'blur(24px)' }}
    >
      <div className="page-shell flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-small max-w-[64ch] text-secondary">
          We measure how people move through the audit so we can fix where it loses them. Analytics
          cookies only run if you say yes.{' '}
          <a href="/privacy" className="underline hover:text-primary">
            Privacy
          </a>
        </p>
        <div className="flex shrink-0 gap-3">
          <Button variant="secondary" className="px-4 py-2.5 text-[13px]" onClick={() => decide('denied')}>
            Decline
          </Button>
          <Button variant="primary" className="px-4 py-2.5 text-[13px]" onClick={() => decide('granted')}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
