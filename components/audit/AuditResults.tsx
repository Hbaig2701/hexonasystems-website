'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { DataPanel, DataRow } from '@/components/ui/DataPanel';
import { Odometer } from '@/components/ui/Odometer';
import { Slider } from '@/components/ui/Input';
import { AuditGate } from './AuditGate';
import { Breakdown } from './Breakdown';
import { cn } from '@/lib/cn';
import { track } from '@/lib/analytics';
import {
  calculateLeak,
  formatDeals,
  formatMoney,
  LIMITS,
  MODEL,
  MODEL_SOURCE,
  tierFor,
} from '@/content/audit-model';
import { isGated, resultsUrl, type AuditSession } from '@/lib/audit/state';

/**
 * §8.4 — RESULTS, UNGATED.
 *
 * The headline number is shown with NO email required. This is deliberate:
 * gating it kills 70% of completions and makes the tool feel like a
 * bait-and-switch. Showing it free proves the tool is real, gives the visitor
 * something to screenshot and send to their partner, and makes the email ask
 * feel like an upgrade rather than a toll. The gate goes on the DETAIL.
 *
 * Showing the arithmetic is non-negotiable. It is the difference between a
 * credible diagnostic and a lead-gen gimmick, and sophisticated buyers can tell
 * instantly which one they're using.
 */

export function AuditResults({
  session,
  onChange,
  onRestart,
  className,
}: {
  session: AuditSession;
  onChange: (s: AuditSession) => void;
  onRestart?: () => void;
  className?: string;
}) {
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [play, setPlay] = useState(false);
  const gateRef = useRef<HTMLDivElement>(null);

  const result = useMemo(
    () =>
      calculateLeak(session, {
        slowResponsePenalty: session.slowResponsePenalty,
        recoverabilityRate: session.recoverabilityRate,
      }),
    [session],
  );

  // sessionStorage is browser-only: a visitor who already passed the gate this
  // session should not be asked again. The odometer starts on the next frame.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading an external store on mount
    setUnlocked(isGated());
    const frame = requestAnimationFrame(() => setPlay(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const shareUrl = useMemo(
    () => resultsUrl(session, typeof window === 'undefined' ? '' : window.location.origin),
    [session],
  );

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      track('audit_link_copied', { tier: tierFor(result.annualLeak) });
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked — the URL is visible in the address bar regardless */
    }
  };

  const tuned =
    session.slowResponsePenalty !== MODEL.slowResponsePenalty ||
    session.recoverabilityRate !== MODEL.recoverabilityRate;

  return (
    <div className={cn('flex flex-col gap-10', className)}>
      <div className="grid-12 gap-y-10">
        {/* ---- The number ------------------------------------------------- */}
        <div className="[grid-column:1/7]">
          <p className="type-label mb-6 text-tertiary">Based on your numbers</p>

          <Odometer
            value={formatMoney(result.annualLeak)}
            play={play}
            className="block text-[clamp(3rem,7vw,5.5rem)] text-accent"
          />

          <p className="type-label mt-7 text-secondary">Leaving your business every year</p>

          <p className="type-body mt-8 max-w-[46ch] text-secondary">
            Every month,{' '}
            <span className="type-figure text-primary">{formatDeals(result.dealsLostToDelay)}</span>{' '}
            people reach out and don&apos;t become customers because the response was too slow.
            We&apos;d expect instant response to win back about{' '}
            <span className="type-figure text-primary">{formatDeals(result.dealsRecoverable)}</span>{' '}
            of them.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Button
              variant="primary"
              arrow
              onClick={() => {
                setGateOpen(true);
                track('audit_gate_viewed', { tier: tierFor(result.annualLeak) });
                requestAnimationFrame(() =>
                  gateRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
                );
              }}
            >
              Get the full breakdown + your benchmark
            </Button>

            <button
              type="button"
              onClick={copyLink}
              className="type-label text-tertiary transition-colors hover:text-primary"
            >
              {copied ? 'Link copied' : 'Copy link to these results'}
            </button>

            {onRestart && (
              <button
                type="button"
                onClick={onRestart}
                className="type-label text-quaternary transition-colors hover:text-primary"
              >
                Change my answers
              </button>
            )}
          </div>
        </div>

        {/* ---- The arithmetic --------------------------------------------- */}
        <div className="[grid-column:8/13]">
          <DataPanel header="How we got there" headerRight={tuned ? 'Assumptions tuned' : undefined}>
            <DataRow label="Inquiries per month" value={formatDeals(session.monthlyLeads)} />
            <DataRow
              label="Reached within 5 minutes"
              value={formatDeals(session.monthlyLeads - result.slowLeads)}
            />
            <DataRow label="Reached slowly" value={formatDeals(result.slowLeads)} />

            <div className="h-3" />

            <DataRow label="Closing now" value={formatDeals(result.currentDeals)} />
            <DataRow
              label="Closing if every lead were answered fast"
              value={formatDeals(result.potentialDeals)}
            />
            <DataRow
              label="Lost to delay"
              value={formatDeals(result.dealsLostToDelay)}
              tone="leak"
              rule
            />
            <DataRow
              label="× recoverability haircut"
              value={`× ${session.recoverabilityRate.toFixed(2)}`}
            />
            <DataRow
              label="Recoverable per month"
              value={formatDeals(result.dealsRecoverable)}
              tone="sealed"
              rule
            />
            <DataRow
              label="× average first-year value"
              value={`× ${formatMoney(session.customerValue)}`}
            />
            <DataRow label="Monthly" value={formatMoney(result.monthlyLeak)} rule />
            <DataRow label="× 12" value="" />
            <DataRow label="Annual" value={formatMoney(result.annualLeak)} emphasis tone="accent" />
          </DataPanel>

          <p className="type-micro mt-4 max-w-[52ch] text-quaternary">
            Two figures, and they are not the same thing.{' '}
            <span className="text-leak">{formatDeals(result.dealsLostToDelay)}</span> is what delay
            costs you. <span className="text-sealed">{formatDeals(result.dealsRecoverable)}</span> is
            what we believe is recoverable.
          </p>

          {/* ---- Adjust assumptions --------------------------------------- */}
          <div className="mt-6">
            <button
              type="button"
              aria-expanded={showAssumptions}
              onClick={() => {
                setShowAssumptions((v) => !v);
                if (!showAssumptions) track('audit_assumptions_adjusted');
              }}
              className="type-label text-tertiary transition-colors hover:text-primary"
            >
              Adjust assumptions {showAssumptions ? '⌃' : '⌄'}
            </button>

            {showAssumptions && (
              <div className="mt-6 flex flex-col gap-8 rounded-md border border-hairline bg-surface p-5">
                <p className="type-micro max-w-[52ch] text-quaternary">
                  Every assumption in the model is visible and adjustable. If you think a figure is
                  wrong, change it, and the output changes with it. It&apos;s a model, not a magic
                  trick.
                </p>

                <Slider
                  label="Slow-response conversion penalty"
                  value={Math.round(session.slowResponsePenalty * 100)}
                  min={LIMITS.slowResponsePenalty.min * 100}
                  max={LIMITS.slowResponsePenalty.max * 100}
                  onChange={(v) => onChange({ ...session, slowResponsePenalty: v / 100 })}
                  format={(v) => `${v}% worse conversion on slow leads`}
                  ariaValueText={`${Math.round(session.slowResponsePenalty * 100)} percent`}
                />

                <Slider
                  label="Recoverability haircut"
                  value={Math.round(session.recoverabilityRate * 100)}
                  min={LIMITS.recoverabilityRate.min * 100}
                  max={LIMITS.recoverabilityRate.max * 100}
                  onChange={(v) => onChange({ ...session, recoverabilityRate: v / 100 })}
                  format={(v) => `${v}% of delay-lost deals are winnable`}
                  ariaValueText={`${Math.round(session.recoverabilityRate * 100)} percent`}
                />

                {tuned && (
                  <button
                    type="button"
                    onClick={() =>
                      onChange({
                        ...session,
                        slowResponsePenalty: MODEL.slowResponsePenalty,
                        recoverabilityRate: MODEL.recoverabilityRate,
                      })
                    }
                    className="type-label self-start text-quaternary hover:text-primary"
                  >
                    Reset to our defaults
                  </button>
                )}
              </div>
            )}
          </div>

          {/* §8.5 — the penalty constant must be attributed before launch. */}
          <p className="type-micro mt-5 max-w-[52ch] text-quaternary">
            {MODEL_SOURCE.attributed ? (
              MODEL_SOURCE.href ? (
                <a href={MODEL_SOURCE.href} className="underline hover:text-primary">
                  {MODEL_SOURCE.text}
                </a>
              ) : (
                MODEL_SOURCE.text
              )
            ) : (
              <span className="text-leak">
                [ASSET PENDING · §8.5] The slow-response penalty must be attributed to a citable
                study or to Hexona&apos;s own client data before launch. Do not ship an unattributed
                constant.
              </span>
            )}
          </p>
        </div>
      </div>

      {/* ---- Gate and breakdown: inline expansion, NOT a navigation ------- */}
      <div ref={gateRef}>
        {!unlocked && gateOpen && (
          <AuditGate
            session={session}
            result={result}
            shareUrl={shareUrl}
            onUnlock={() => {
              setUnlocked(true);
              setGateOpen(false);
            }}
          />
        )}

        {unlocked && <Breakdown session={session} result={result} />}
      </div>
    </div>
  );
}
