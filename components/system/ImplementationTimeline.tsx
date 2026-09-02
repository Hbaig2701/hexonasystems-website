'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * §7.2 item 6 — the implementation timeline.
 * "A horizontal scrubbing timeline, weeks 1–10, showing what happens each week.
 *  Removes the biggest unstated fear (open-ended projects)."
 *
 * The scrubber is a real range input so it is keyboard-operable and readable by
 * assistive technology, not a drag-only affordance (§10.4).
 */

const WEEKS = [
  { week: 1, phase: 'Map', title: 'Operation mapped', detail: 'Every path revenue takes through the business, and every seam between systems, documented with the people who actually work them.' },
  { week: 2, phase: 'Map', title: 'Gaps quantified', detail: 'Each gap priced annually. Priorities set by dollars, not by opinion or by whoever is loudest.' },
  { week: 3, phase: 'Build', title: 'Data layer', detail: 'One record established for contacts, activity and revenue. Existing data audited and migrated.' },
  { week: 4, phase: 'Build', title: 'Integrations', detail: 'The tools you keep are connected (Make, Zapier, direct API) and verified both directions.' },
  { week: 5, phase: 'Build', title: 'Intake and routing', detail: 'Every channel lands in one queue with your routing rules. This is usually where response time collapses.' },
  { week: 6, phase: 'Build', title: 'AI agents live', detail: 'Response and qualification agents deployed against your criteria, with human escalation paths.' },
  { week: 7, phase: 'Build', title: 'Follow-up automation', detail: 'Sequences behind every first response, so a stalled conversation gets picked back up.' },
  { week: 8, phase: 'Prove', title: 'Parallel running', detail: 'The new path runs alongside the old one. Nothing is switched off until the numbers agree.' },
  { week: 9, phase: 'Prove', title: 'Instrumentation', detail: 'Response time, contact rate and close rate reported against pipeline, not against activity.' },
  { week: 10, phase: 'Compound', title: 'Handover and cadence', detail: 'Your team owns it. Measured against revenue and profit on a standing review cadence.' },
];

export function ImplementationTimeline() {
  const [index, setIndex] = useState(0);
  const active = WEEKS[index];

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5">
        <label htmlFor="timeline-scrub" className="type-label text-tertiary">
          Scrub the timeline · week {active.week} of 10
        </label>
        <input
          id="timeline-scrub"
          type="range"
          min={0}
          max={WEEKS.length - 1}
          step={1}
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}
          aria-valuetext={`Week ${active.week}: ${active.title}`}
          className="hx-slider w-full"
          style={{ ['--pct' as string]: `${(index / (WEEKS.length - 1)) * 100}%` }}
        />
      </div>

      <div className="mb-10 hidden grid-cols-10 gap-1 md:grid">
        {WEEKS.map((w, i) => (
          <button
            key={w.week}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Week ${w.week}: ${w.title}`}
            aria-current={i === index}
            className={cn(
              'flex flex-col items-start gap-2 border-t pt-3 text-left transition-colors duration-[240ms]',
              i <= index ? 'border-accent' : 'border-hairline',
            )}
          >
            <span
              className={cn(
                'type-micro transition-colors duration-[240ms]',
                i === index ? 'text-accent' : i < index ? 'text-secondary' : 'text-quaternary',
              )}
            >
              W{w.week}
            </span>
          </button>
        ))}
      </div>

      <div className="rounded-md border border-hairline bg-surface p-7" aria-live="polite">
        <div className="mb-5 flex flex-wrap items-baseline gap-3">
          <span className="type-figure text-[15px] text-accent">
            WEEK {String(active.week).padStart(2, '0')}
          </span>
          <span aria-hidden="true" className="text-decorative">
            /
          </span>
          <span className="type-label text-tertiary">{active.phase}</span>
        </div>
        <h3 className="type-display-3 mb-4">{active.title}</h3>
        <p className="type-body max-w-[62ch] text-secondary">{active.detail}</p>
      </div>

      <p className="type-micro mt-5 max-w-[62ch] text-quaternary">
        Scope determines the exact length. A defined implementation typically runs six to ten weeks;
        a recent Ontario manufacturing coordination build was eight.
      </p>
    </div>
  );
}
