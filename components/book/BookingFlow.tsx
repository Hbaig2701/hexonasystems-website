'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { AssetPlaceholder } from '@/components/ui/AssetPlaceholder';
import { DataPanel, DataRow } from '@/components/ui/DataPanel';
import { track } from '@/lib/analytics';
import { bookingSchema, MIN_SUBMIT_MS } from '@/lib/audit/schema';
import { decodeAudit, loadSession, resultsUrl } from '@/lib/audit/state';
import { calculateLeak, formatDeals, formatMoney } from '@/content/audit-model';

/**
 * §7.6 — qualification, then the calendar.
 *
 * "If audit data exists in the session, attach it to the booking record
 *  automatically and show a confirmation line: 'Your audit results will be
 *  attached to this booking.'"
 *
 * §9.4: Cloudflare Turnstile belongs on THIS form only — never on the audit,
 * where a visible challenge would gut completion rates.
 */

type Errors = Partial<Record<string, string>>;

export function BookingFlow() {
  const params = useSearchParams();
  const [qualified, setQualified] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const mountedAt = useRef(0);

  const [revenueBand, setRevenueBand] = useState('$1–5M');
  const [monthlyLeads, setMonthlyLeads] = useState('');
  const [driver, setDriver] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');

  // Audit data from the URL (?audit=…) or from this session's storage.
  const [attached, setAttached] = useState<ReturnType<typeof loadSession>>(null);

  // Audit data arrives from the URL or from sessionStorage — both browser-only.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- reading external state on mount */
    // Stamped on mount, not during render (§9.4 timing check).
    mountedAt.current = Date.now();
    track('booking_started');

    const fromUrl = params.get('audit');
    if (fromUrl) {
      try {
        const encoded = new URL(fromUrl, window.location.origin).searchParams.get('s');
        const decoded = decodeAudit(encoded);
        if (decoded) {
          setAttached(decoded);
          setMonthlyLeads(String(decoded.monthlyLeads));
          return;
        }
      } catch {
        /* malformed link — fall through to session storage */
      }
    }

    const stored = loadSession();
    if (stored) {
      setAttached(stored);
      setMonthlyLeads(String(stored.monthlyLeads));
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [params]);

  const attachedResult = attached
    ? calculateLeak(attached, {
        slowResponsePenalty: attached.slowResponsePenalty,
        recoverabilityRate: attached.recoverabilityRate,
      })
    : null;

  function qualify(e: React.FormEvent) {
    e.preventDefault();
    const elapsedMs = Date.now() - mountedAt.current;

    const payload = {
      revenueBand,
      monthlyLeads: Number(monthlyLeads || 0),
      driver,
      fullName,
      email,
      company,
      marketingConsent: consent,
      auditResultsUrl: attached ? resultsUrl(attached, window.location.origin) : undefined,
      website,
      elapsedMs,
    };

    const parsed = bookingSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    if (elapsedMs < MIN_SUBMIT_MS) {
      setErrors({ form: 'One moment. Finishing up.' });
      return;
    }

    setErrors({});
    setSubmitting(true);
    track('booking_submitted', {
      revenue_band: revenueBand,
      has_audit: Boolean(attached),
    });
    // The qualifying answers are carried into the calendar step, where the
    // scheduler creates the record. Nothing is lost if the visitor abandons.
    setQualified(true);
    setSubmitting(false);
  }

  if (qualified) {
    return (
      <div className="grid-12 gap-y-10">
        <div className="[grid-column:1/8]">
          <p className="type-label mb-5 text-accent">Step 2 of 2</p>
          <h2 className="type-display-3 mb-8 max-w-[20ch]">Pick a time.</h2>

          {/* ⚠️ The GoHighLevel calendar embed goes here. Hexona already runs
              GHL at app.hexonasystems.com (§9.1) — this is the one place the
              scheduler belongs, after qualification, never before it. */}
          <AssetPlaceholder
            label="GoHighLevel calendar embed"
            detail="[ASSET NEEDED] The scheduler URL from app.hexonasystems.com, plus the field mapping so the three qualifying answers and the audit results URL land on the booking record (§7.6, §9.1)."
            className="min-h-[420px]"
          />
        </div>

        <div className="[grid-column:9/13]">
          <DataPanel header="Going into the call">
            <DataRow label="Revenue" value={revenueBand} />
            <DataRow label="Monthly inbound" value={monthlyLeads || 'Not set'} />
            <DataRow label="Company" value={company} />
            {attachedResult && (
              <DataRow
                label="Modelled annual leak"
                value={formatMoney(attachedResult.annualLeak)}
                tone="accent"
                rule
              />
            )}
          </DataPanel>
          {attached && (
            <p className="type-micro mt-4 text-sealed">
              Your audit results will be attached to this booking.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid-12 gap-y-10">
      <div className="[grid-column:1/8]">
        <p className="type-label mb-5 text-accent">Step 1 of 2</p>
        <h2 className="type-display-3 mb-10 max-w-[20ch]">Three questions.</h2>

        <form onSubmit={qualify} className="flex flex-col gap-6" noValidate>
          <Select
            label="Annual revenue"
            value={revenueBand}
            onChange={(e) => setRevenueBand(e.target.value)}
            error={errors.revenueBand}
          >
            <option>&lt;$1M</option>
            <option>$1–5M</option>
            <option>$5–20M</option>
            <option>$20M+</option>
          </Select>

          <Input
            label="Approximate monthly inbound lead volume"
            type="number"
            inputMode="numeric"
            min={0}
            value={monthlyLeads}
            onChange={(e) => setMonthlyLeads(e.target.value)}
            error={errors.monthlyLeads}
          />

          <Textarea
            label="What's driving this?"
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
            error={errors.driver}
            placeholder="A sentence is plenty."
          />

          <div className="mt-2 grid gap-5 md:grid-cols-2">
            <Input
              label="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={errors.fullName}
              autoComplete="name"
            />
            <Input
              label="Company"
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
          </div>

          {/* Honeypot — §9.4 */}
          <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
            <label htmlFor="book-website">Website</label>
            <input
              id="book-website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]"
            />
            <span className="text-small text-secondary">
              Send me occasional insights on automation and revenue operations. Nothing about this
              booking depends on it.
            </span>
          </label>

          {/* ⚠️ Cloudflare Turnstile mounts here — booking form ONLY (§9.4). */}

          {errors.form && (
            <p className="type-micro text-leak" role="alert">
              {errors.form}
            </p>
          )}

          <div className="mt-2">
            <Button type="submit" variant="primary" size="large" arrow disabled={submitting}>
              Continue to the calendar
            </Button>
          </div>

          <p className="type-micro text-quaternary">
            We use this to arrive prepared, not to score you. Read the{' '}
            <a href="/privacy" className="underline hover:text-primary">
              privacy policy
            </a>
            .
          </p>
        </form>
      </div>

      <div className="[grid-column:9/13]">
        {attached && attachedResult ? (
          <>
            <DataPanel header="Your audit, attached">
              <DataRow label="Inquiries / month" value={formatDeals(attached.monthlyLeads)} />
              <DataRow label="Answered in 5 min" value={`${attached.fastResponsePct}%`} />
              <DataRow
                label="Recoverable / month"
                value={formatDeals(attachedResult.dealsRecoverable)}
                tone="sealed"
              />
              <DataRow
                label="Annual leak"
                value={formatMoney(attachedResult.annualLeak)}
                emphasis
                tone="accent"
                rule
              />
            </DataPanel>
            <p className="type-micro mt-4 text-sealed">
              Your audit results will be attached to this booking.
            </p>
          </>
        ) : (
          <DataPanel header="No audit attached">
            <p className="text-small mb-5 text-secondary">
              Run the audit first and your figures come to the call with you, and we spend the thirty
              minutes on what to do about them rather than on arithmetic.
            </p>
            <Button href="/audit" variant="ghost" arrow>
              Run the audit
            </Button>
          </DataPanel>
        )}
      </div>
    </div>
  );
}
