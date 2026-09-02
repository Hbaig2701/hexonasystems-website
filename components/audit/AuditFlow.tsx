'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Input';
import { LeakVisual } from './LeakVisual';
import { AuditResults } from './AuditResults';
import { cn } from '@/lib/cn';
import { track } from '@/lib/analytics';
import { LIMITS } from '@/content/audit-model';
import {
  DEFAULT_SESSION,
  loadSession,
  saveSession,
  type AuditSession,
} from '@/lib/audit/state';

/**
 * THE REVENUE LEAK AUDIT — §8.
 *
 * ONE QUESTION AT A TIME. Not a form of four fields — a sequence of four
 * screens, each with one large input. This roughly doubles completion rates
 * versus a multi-field form and it makes each answer feel consequential.
 *
 * Advance behaviour, precisely (§8.1):
 *   · Preset chips advance immediately on click, after a 400ms hold so the
 *     visitor sees the visualization react to their choice.
 *   · Sliders NEVER auto-advance — every position is technically valid, so
 *     auto-advance would fire on first touch. They require an explicit
 *     Continue →, enabled from the moment the step mounts.
 *   · Number inputs advance on Enter, or on Continue →.
 *   · ← returns to the previous step with all values retained.
 */

const CHIP_HOLD_MS = 400;

/* Q1 uses a log scale so the low end — where most businesses actually sit —
   gets the resolution, paired with a free number input for anything outside
   the slider's range (§8.2). */
const Q1_MIN = 10;
const Q1_MAX = 2000;
const Q1_STEPS = 1000;

function q1ToSlider(value: number): number {
  const clamped = Math.min(Q1_MAX, Math.max(Q1_MIN, value));
  return Math.round((Math.log(clamped / Q1_MIN) / Math.log(Q1_MAX / Q1_MIN)) * Q1_STEPS);
}

function q1FromSlider(pos: number): number {
  return Math.round(Q1_MIN * Math.pow(Q1_MAX / Q1_MIN, pos / Q1_STEPS));
}

const Q2_CHIPS = [
  { label: 'Almost none', value: 5 },
  { label: 'About a quarter', value: 25 },
  { label: 'About half', value: 50 },
  { label: 'Most', value: 85 },
];

const Q4_CHIPS = [
  { label: '$500', value: 500 },
  { label: '$2,500', value: 2500 },
  { label: '$10,000', value: 10000 },
  { label: '$50,000', value: 50000 },
];

const QUESTIONS = [
  'How many new inquiries does your business get in a month?',
  'What share of those get a real response within five minutes?',
  'Of the people you do speak to, what share become customers?',
  "What's an average customer worth to you in the first year?",
];

export function AuditFlow({
  initial,
  startAtResults = false,
  className,
}: {
  initial?: AuditSession;
  /** /audit/results hydrates straight to the results view (§3.1). */
  startAtResults?: boolean;
  className?: string;
}) {
  const [session, setSession] = useState<AuditSession>(initial ?? DEFAULT_SESSION);
  const [step, setStep] = useState(startAtResults ? 4 : 0);
  const started = useRef(startAtResults);
  const holdTimer = useRef<number | null>(null);

  // Restore an in-progress session (§8.8) unless the URL already supplied one.
  // sessionStorage is browser-only, so this cannot happen before hydration.
  useEffect(() => {
    if (initial) return;
    const restored = loadSession();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading an external store on mount
    if (restored) setSession(restored);
  }, [initial]);

  useEffect(() => saveSession(session), [session]);

  useEffect(
    () => () => {
      if (holdTimer.current) window.clearTimeout(holdTimer.current);
    },
    [],
  );

  const update = useCallback((patch: Partial<AuditSession>) => {
    setSession((s) => ({ ...s, ...patch }));
  }, []);

  /** Fires `audit_started` exactly once, on the first interaction (§1.5). */
  const markStarted = useCallback(() => {
    if (started.current) return;
    started.current = true;
    track('audit_started');
  }, []);

  const advance = useCallback(() => {
    markStarted();
    setStep((s) => {
      const next = Math.min(4, s + 1);
      track(next === 4 ? 'audit_completed' : 'audit_step_completed', { step: s + 1 });
      return next;
    });
  }, [markStarted]);

  /** Chips hold for 400ms so the visualization visibly reacts before advancing. */
  const chooseChip = useCallback(
    (patch: Partial<AuditSession>) => {
      update(patch);
      markStarted();
      if (holdTimer.current) window.clearTimeout(holdTimer.current);
      holdTimer.current = window.setTimeout(advance, CHIP_HOLD_MS);
    },
    [advance, markStarted, update],
  );

  const back = useCallback(() => {
    if (holdTimer.current) window.clearTimeout(holdTimer.current);
    setStep((s) => Math.max(0, s - 1));
  }, []);

  if (step === 4) {
    return (
      <AuditResults
        session={session}
        onChange={setSession}
        onRestart={() => setStep(0)}
        className={className}
      />
    );
  }

  return (
    <div className={cn('grid-12 items-start gap-y-10', className)}>
      {/* Mobile puts the visualization ABOVE the form so it stays visible while
          typing (§8.1). On desktop the form is columns 1–5, the visual 7–12. */}
      <div className="order-2 [grid-column:1/6] md:order-1">
        <div className="flex flex-col gap-8">
          <ProgressSegments step={step} />

          <div role="group" aria-labelledby="audit-question">
            <p className="type-label mb-4 text-accent">
              Question {step + 1} of 4
            </p>
            <h3
              id="audit-question"
              className="type-display-3 mb-8 max-w-[20ch] text-primary"
            >
              {QUESTIONS[step]}
            </h3>

            {step === 0 && (
              <StepInquiries
                value={session.monthlyLeads}
                onChange={(monthlyLeads) => {
                  markStarted();
                  update({ monthlyLeads });
                }}
                onSubmit={advance}
              />
            )}

            {step === 1 && (
              <StepShare
                value={session.fastResponsePct}
                chips={Q2_CHIPS}
                onSlide={(fastResponsePct) => {
                  markStarted();
                  update({ fastResponsePct });
                }}
                onChip={(fastResponsePct) => chooseChip({ fastResponsePct })}
                unit="answered within five minutes"
              />
            )}

            {step === 2 && (
              <StepShare
                value={session.closeRate}
                onSlide={(closeRate) => {
                  markStarted();
                  update({ closeRate: Math.max(1, closeRate) });
                }}
                unit="of conversations become customers"
              />
            )}

            {step === 3 && (
              <StepValue
                value={session.customerValue}
                chips={Q4_CHIPS}
                onChange={(customerValue) => {
                  markStarted();
                  update({ customerValue });
                }}
                onChip={(customerValue) => chooseChip({ customerValue })}
                onSubmit={advance}
              />
            )}
          </div>

          <div className="flex items-center gap-6">
            {step > 0 && (
              <button
                type="button"
                onClick={back}
                className="type-label text-tertiary transition-colors hover:text-primary"
              >
                ← Back
              </button>
            )}
            <Button variant="primary" onClick={advance} arrow>
              {step === 3 ? 'Show me the number' : 'Continue'}
            </Button>
          </div>

          {/* Each step announces itself to screen readers (§10.4). */}
          <p aria-live="polite" className="sr-only">
            Question {step + 1} of 4. {QUESTIONS[step]}
          </p>
        </div>
      </div>

      <div className="order-1 [grid-column:7/13] md:order-2">
        <div className="overflow-hidden rounded-md border border-hairline bg-surface-inset">
          <div className="flex items-center justify-between border-b border-hairline bg-surface px-4 py-2.5">
            <span className="type-label text-tertiary">Your operation, live</span>
            <span className="type-micro text-quaternary">
              {Math.round((1 - session.fastResponsePct / 100) * 100)}% of inquiries hit a gap
            </span>
          </div>
          <LeakVisual session={session} answered={step} className="h-[300px] md:h-[420px]" />
          <div className="border-t border-hairline px-4 py-3">
            <p className="type-micro text-quaternary">
              Cyan packets are inquiries. Red ones fell through a gap before anyone answered.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressSegments({ step }: { step: number }) {
  return (
    <div className="flex gap-2" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="relative h-px flex-1 bg-hairline-bright"
        >
          <span
            className={cn(
              'absolute inset-0 origin-left bg-accent transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
              i <= step ? 'scale-x-100' : 'scale-x-0',
            )}
          />
        </span>
      ))}
    </div>
  );
}

function StepInquiries({
  value,
  onChange,
  onSubmit,
}: {
  value: number;
  onChange: (v: number) => void;
  onSubmit: () => void;
}) {
  const [raw, setRaw] = useState(String(value));
  const [mirrored, setMirrored] = useState(value);

  // Adjusting state when a prop changes, React's documented pattern: the field
  // keeps its own text (so "" and "1" are typeable mid-entry) but re-syncs when
  // the value moves for another reason — the slider, or a step revisited via ←.
  if (value !== mirrored) {
    setMirrored(value);
    setRaw(String(value));
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-end gap-4">
        <input
          type="number"
          inputMode="numeric"
          aria-label="Inquiries per month"
          min={LIMITS.monthlyLeads.min}
          max={LIMITS.monthlyLeads.max}
          value={raw}
          onChange={(e) => {
            setRaw(e.target.value);
            const n = Number(e.target.value);
            if (Number.isFinite(n) && n >= LIMITS.monthlyLeads.min) {
              onChange(Math.min(LIMITS.monthlyLeads.max, Math.round(n)));
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onSubmit();
            }
          }}
          className="type-figure w-[7ch] border-b border-hairline-bright bg-transparent pb-2 text-[44px] text-primary outline-none transition-colors focus:border-accent"
        />
        <span className="type-label pb-4 text-tertiary">per month</span>
      </div>

      <Slider
        label="Drag, or type above"
        value={q1ToSlider(value)}
        min={0}
        max={Q1_STEPS}
        onChange={(pos) => onChange(q1FromSlider(pos))}
        ariaValueText={`${value} inquiries per month`}
      />

      <p className="type-micro text-quaternary">
        The slider covers 10 to 2,000. Outside that range, type the number.
      </p>
    </div>
  );
}

function StepShare({
  value,
  chips,
  onSlide,
  onChip,
  unit,
}: {
  value: number;
  chips?: { label: string; value: number }[];
  onSlide: (v: number) => void;
  onChip?: (v: number) => void;
  unit: string;
}) {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-end gap-3">
        <span className="type-figure text-[44px] text-primary">{value}</span>
        <span className="type-figure pb-1 text-[28px] text-tertiary">%</span>
      </div>
      <p className="type-label -mt-4 text-tertiary">{unit}</p>

      <Slider
        value={value}
        min={0}
        max={100}
        onChange={onSlide}
        ariaValueText={`${value} percent ${unit}`}
        label="Drag to set"
      />

      {chips && onChip && (
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => onChip(chip.value)}
              className={cn(
                'rounded-md border px-4 py-2.5 text-[13px] transition-all duration-[240ms]',
                value === chip.value
                  ? 'border-accent bg-accent-wash text-primary'
                  : 'border-hairline-bright text-secondary hover:border-accent hover:text-primary',
              )}
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function StepValue({
  value,
  chips,
  onChange,
  onChip,
  onSubmit,
}: {
  value: number;
  chips: { label: string; value: number }[];
  onChange: (v: number) => void;
  onChip: (v: number) => void;
  onSubmit: () => void;
}) {
  const [raw, setRaw] = useState(String(value));
  const [mirrored, setMirrored] = useState(value);

  // Same adjust-on-prop-change pattern as Q1 — the chips write `value`, and the
  // typed field follows without fighting the visitor mid-keystroke.
  if (value !== mirrored) {
    setMirrored(value);
    setRaw(String(value));
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-end gap-2">
        <span className="type-figure pb-2 text-[32px] text-tertiary">$</span>
        <input
          type="number"
          inputMode="numeric"
          aria-label="Average first-year customer value in dollars"
          min={LIMITS.customerValue.min}
          max={LIMITS.customerValue.max}
          value={raw}
          onChange={(e) => {
            setRaw(e.target.value);
            const n = Number(e.target.value);
            if (Number.isFinite(n) && n >= LIMITS.customerValue.min) {
              onChange(Math.min(LIMITS.customerValue.max, Math.round(n)));
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onSubmit();
            }
          }}
          className="type-figure w-[9ch] border-b border-hairline-bright bg-transparent pb-2 text-[44px] text-primary outline-none transition-colors focus:border-accent"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <button
            key={chip.label}
            type="button"
            onClick={() => onChip(chip.value)}
            className={cn(
              'rounded-md border px-4 py-2.5 text-[13px] transition-all duration-[240ms]',
              value === chip.value
                ? 'border-accent bg-accent-wash text-primary'
                : 'border-hairline-bright text-secondary hover:border-accent hover:text-primary',
            )}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <p className="type-micro text-quaternary">
        First-year revenue from an average customer, not lifetime value.
      </p>
    </div>
  );
}
