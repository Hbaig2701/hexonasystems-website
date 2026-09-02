'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * §7.2 item 2 — the architecture diagram.
 *
 * "An interactive layered diagram: Data Layer → Integration Layer → Automation
 *  Layer → AI Layer → Interface Layer. Hovering any layer dims the others to
 *  30% and reveals a detail panel. Built in SVG, not an image, so it's crisp
 *  and animatable."
 *
 * Keyboard-operable as well as hoverable: each layer is a real button, so the
 * detail panel is reachable without a pointer (§10.4).
 */

const LAYERS = [
  {
    id: 'interface',
    name: 'Interface Layer',
    short: 'What your team touches',
    detail:
      'One console for pipeline, conversations, scheduling and reporting. The layer that decides whether any of the rest gets used.',
  },
  {
    id: 'ai',
    name: 'AI Layer',
    short: 'Judgment and language',
    detail:
      'Market and proprietary models doing qualification, drafting, routing and resolution, with escalation paths you define rather than inherit.',
  },
  {
    id: 'automation',
    name: 'Automation Layer',
    short: 'The rules that move work',
    detail:
      'Triggers, routing, assignment, follow-up and retries. This is where a lead stops depending on someone noticing it.',
  },
  {
    id: 'integration',
    name: 'Integration Layer',
    short: 'Everything you already run',
    detail:
      'Make, Zapier and direct API connections into the tools you keep. Hexona bridges what exists before it replaces anything.',
  },
  {
    id: 'data',
    name: 'Data Layer',
    short: 'One record, not five',
    detail:
      'A single source of truth for contacts, activity and revenue, so a number in one report cannot disagree with the same number in another.',
  },
];

export function ArchitectureDiagram() {
  const [active, setActive] = useState<string | null>(null);
  const detail = LAYERS.find((l) => l.id === active) ?? null;

  return (
    <div className="grid-12 gap-y-8">
      <div className="[grid-column:1/8]">
        <div className="flex flex-col gap-2">
          {LAYERS.map((layer) => {
            const dimmed = active !== null && active !== layer.id;
            return (
              <button
                key={layer.id}
                type="button"
                onMouseEnter={() => setActive(layer.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(layer.id)}
                onBlur={() => setActive(null)}
                onClick={() => setActive((a) => (a === layer.id ? null : layer.id))}
                aria-pressed={active === layer.id}
                className={cn(
                  'group relative w-full rounded-md border border-hairline bg-surface px-6 py-5 text-left',
                  'transition-[opacity,border-color,background-color] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
                  dimmed ? 'opacity-30' : 'opacity-100',
                  active === layer.id && 'border-accent bg-surface-raised',
                )}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="type-label text-primary">{layer.name}</span>
                  <span className="type-micro text-quaternary">{layer.short}</span>
                </div>

                {/* Hex-edge motif tying the diagram to the lattice language (§5.5). */}
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-4 h-full w-16 opacity-30"
                  viewBox="0 0 64 64"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M32 14 L47 23 L47 41 L32 50 L17 41 L17 23 Z"
                    fill="none"
                    stroke={active === layer.id ? 'var(--accent)' : 'var(--hairline-bright)'}
                    strokeWidth="1"
                  />
                </svg>
              </button>
            );
          })}
        </div>
      </div>

      <div className="[grid-column:9/13]">
        <div
          className="rounded-md border border-hairline bg-surface-inset p-6"
          aria-live="polite"
        >
          {detail ? (
            <>
              <p className="type-label mb-4 text-accent">{detail.name}</p>
              <p className="text-small text-secondary">{detail.detail}</p>
            </>
          ) : (
            <>
              <p className="type-label mb-4 text-quaternary">Five layers</p>
              <p className="text-small text-secondary">
                Hover or focus a layer to see what it does. Every one of them exists in your business
                today. The difference is whether they were designed together or accumulated one
                subscription at a time.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
