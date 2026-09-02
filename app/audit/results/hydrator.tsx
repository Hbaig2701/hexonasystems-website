'use client';

import { useEffect, useState } from 'react';
import { AuditResults } from '@/components/audit/AuditResults';
import { track } from '@/lib/analytics';
import { encodeAudit, saveSession, type AuditSession } from '@/lib/audit/state';

/**
 * Keeps the URL in sync with any assumption the visitor tunes on a restored
 * result (§8.8) — otherwise re-sharing the link would reproduce a different
 * number than the one on screen.
 */
export function ResultsHydrator({ session: initial }: { session: AuditSession }) {
  const [session, setSession] = useState(initial);

  useEffect(() => {
    track('audit_results_restored');
  }, []);

  useEffect(() => {
    saveSession(session);
    const url = new URL(window.location.href);
    url.searchParams.set('s', encodeAudit(session));
    window.history.replaceState(null, '', url.toString());
  }, [session]);

  return <AuditResults session={session} onChange={setSession} />;
}
