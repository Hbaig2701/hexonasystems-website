'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { track } from '@/lib/analytics';
import { leadSchema, MIN_SUBMIT_MS } from '@/lib/audit/schema';
import { markGated, type AuditSession } from '@/lib/audit/state';
import { formatMoney, tierFor, type AuditResult } from '@/content/audit-model';

/**
 * §8.6 — THE GATE.
 *
 * Inline expansion, NOT a page navigation, which loses state.
 *
 * The breakdown email is TRANSACTIONAL and sends regardless — the checkbox
 * governs marketing only, and the copy says so plainly. CASL requires the box
 * be unchecked by default (§9.5); Hexona is Canadian and this is not optional.
 */

type Errors = Partial<Record<'fullName' | 'email' | 'company' | 'form', string>>;

export function AuditGate({
  session,
  result,
  shareUrl,
  onUnlock,
}: {
  session: AuditSession;
  result: AuditResult;
  shareUrl: string;
  onUnlock: () => void;
}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false); // CASL: unchecked by default
  const [website, setWebsite] = useState(''); // honeypot
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const mountedAt = useRef(0);
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Stamped on mount, not during render — the timing check (§9.4) measures
    // how long a human spent with the form in front of them.
    mountedAt.current = Date.now();
    firstField.current?.focus();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const elapsedMs = Date.now() - mountedAt.current;

    const payload = {
      fullName,
      email,
      company,
      phone,
      marketingConsent: consent,
      audit: {
        monthlyLeads: session.monthlyLeads,
        fastResponsePct: session.fastResponsePct,
        closeRate: session.closeRate,
        customerValue: session.customerValue,
        slowResponsePenalty: session.slowResponsePenalty,
        recoverabilityRate: session.recoverabilityRate,
      },
      resultsUrl: shareUrl,
      sourcePage: typeof window === 'undefined' ? '' : window.location.pathname,
      utm: readUtm(),
      website,
      elapsedMs,
    };

    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (key === 'fullName' || key === 'email' || key === 'company') next[key] = issue.message;
      }
      if (Object.keys(next).length === 0) next.form = 'Something in that submission looked off.';
      setErrors(next);
      return;
    }

    // Timing check (§9.4). Held on the client too so a human who is genuinely
    // fast is not silently rejected by the server with no explanation.
    if (elapsedMs < MIN_SUBMIT_MS) {
      setErrors({ form: 'One moment. Finishing up.' });
      window.setTimeout(() => setErrors({}), MIN_SUBMIT_MS - elapsedMs);
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setErrors({ form: body?.error ?? 'We could not send that. Try again in a moment.' });
        setSubmitting(false);
        return;
      }

      track('audit_email_captured', {
        tier: tierFor(result.annualLeak),
        annual_leak: Math.round(result.annualLeak),
        marketing_consent: consent,
      });
      markGated();
      onUnlock();
    } catch {
      setErrors({ form: 'Network error. Your results are still here. Try again.' });
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-md border border-hairline bg-surface p-7 md:p-10">
      <p className="type-label mb-4 text-accent">The full breakdown</p>
      <h3 className="type-display-3 mb-4 max-w-[24ch]">
        Where {formatMoney(result.annualLeak)} is going, itemised.
      </h3>
      <p className="type-body mb-8 max-w-[56ch] text-secondary">
        We&apos;ll send the breakdown to your inbox and show it here immediately. No sequence, no
        drip. One email.
      </p>

      <form onSubmit={submit} className="max-w-[620px]" noValidate>
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            ref={firstField}
            label="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={errors.fullName}
            autoComplete="name"
          />
          <Input
            label="Company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            error={errors.company}
            autoComplete="organization"
          />
          <Input
            label="Work email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            autoComplete="email"
            wrapperClassName="md:col-span-2"
          />
          <Input
            label="Phone"
            type="tel"
            optional
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            wrapperClassName="md:col-span-2"
            hint="Only if you'd rather we call than email."
          />
        </div>

        {/* Honeypot — §9.4. Hidden from people and from assistive technology. */}
        <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <label className="mt-7 flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]"
          />
          <span className="text-small text-secondary">
            Send me occasional insights on automation and revenue operations. One email now either
            way; this is only about what comes after.
          </span>
        </label>

        {errors.form && (
          <p className="type-micro mt-5 text-leak" role="alert">
            {errors.form}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Button type="submit" variant="primary" arrow disabled={submitting}>
            {submitting ? 'Sending…' : 'Show me the breakdown'}
          </Button>
          <a href="/privacy" className="type-micro text-quaternary hover:text-primary">
            How we handle your data
          </a>
        </div>
      </form>
    </div>
  );
}

function readUtm() {
  if (typeof window === 'undefined') return undefined;
  const p = new URLSearchParams(window.location.search);
  const utm = {
    source: p.get('utm_source') ?? undefined,
    medium: p.get('utm_medium') ?? undefined,
    campaign: p.get('utm_campaign') ?? undefined,
  };
  return utm.source || utm.medium || utm.campaign ? utm : undefined;
}
