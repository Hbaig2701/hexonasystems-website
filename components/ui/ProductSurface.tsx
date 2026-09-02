import { cn } from '@/lib/cn';
import { Icon } from './Icon';

/**
 * ProductSurface — drawn mock-ups of the thing being described.
 *
 * The reference design's most engaging blocks are not its copy, they are the
 * little product panels sitting next to the copy: a task queue, a chat reply, a
 * stack of tools, a metric strip. They give the eye somewhere to land and they
 * make an abstract claim concrete.
 *
 * These are DRAWN from the design tokens, not screenshots and not stock. §15
 * rules out stock imagery, and a screenshot of a real dashboard would date the
 * moment the product changes. Built from divs and hairlines, they restyle
 * themselves whenever the tokens move.
 *
 * Every one is aria-hidden. They illustrate a point the surrounding copy
 * already makes in words, so a screen reader gains nothing from a description
 * of a fake interface (§10.4).
 */

type Variant = 'queue' | 'agent' | 'stack' | 'metrics';

export function ProductSurface({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'glow-card relative overflow-hidden rounded-md border border-hairline bg-surface p-5',
        className,
      )}
      data-glow="on"
    >
      {/* Faint window chrome. Enough to read as an interface, not enough to
          pretend it is a real screenshot. */}
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-hairline-bright" />
        <span className="h-2 w-2 rounded-full bg-hairline-bright" />
        <span className="h-2 w-2 rounded-full bg-hairline-bright" />
      </div>
      {render(variant)}
    </div>
  );
}

function render(variant: Variant) {
  switch (variant) {
    /* An inbound queue where one row has been sitting unanswered. */
    case 'queue':
      return (
        <div className="flex flex-col gap-2">
          <Row label="New inquiry" meta="2 min" state="ok" />
          <Row label="New inquiry" meta="4 min" state="ok" />
          <Row label="New inquiry" meta="31 hr" state="leak" />
          <Row label="New inquiry" meta="Unassigned" state="leak" />
          <Row label="New inquiry" meta="6 min" state="ok" />
        </div>
      );

    /* An agent answering at 9:40pm. */
    case 'agent':
      return (
        <div className="flex flex-col gap-3">
          <div className="flex justify-end">
            <span className="max-w-[80%] rounded-md rounded-br-sm border border-hairline bg-surface-inset px-3 py-2 text-[12px] leading-snug text-secondary">
              Hi, do you have space for a 3 year old in September?
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent text-[10px] font-semibold text-[#06070A]">
              H
            </span>
            <span className="max-w-[80%] rounded-md rounded-tl-sm border border-accent/40 bg-accent-wash px-3 py-2 text-[12px] leading-snug text-primary">
              We do. I can hold a place and book you a tour, would Thursday 4pm work?
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sealed" />
            <span className="type-micro text-quaternary">Answered in 1m 48s · 9:40pm</span>
          </div>
        </div>
      );

    /* Twelve subscriptions collapsing into one platform. */
    case 'stack':
      return (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-4 gap-1.5">
            {Array.from({ length: 8 }, (_, i) => (
              <span
                key={i}
                className="h-6 rounded-sm border border-hairline bg-surface-inset opacity-60"
              />
            ))}
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="h-px flex-1 bg-hairline" />
            <span className="type-micro text-quaternary">consolidates to</span>
            <span className="h-px flex-1 bg-hairline" />
          </div>
          <div className="flex h-10 items-center justify-center rounded-md border border-accent/40 bg-accent-wash">
            <span className="type-label text-accent">One platform</span>
          </div>
        </div>
      );

    /* Response time falling, revenue rising. */
    case 'metrics':
      return (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            <Tile label="Response" value="2 min" tone="sealed" />
            <Tile label="Recovered" value="$80K" tone="accent" />
          </div>
          <Sparkline />
        </div>
      );
  }
}

function Row({ label, meta, state }: { label: string; meta: string; state: 'ok' | 'leak' }) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 rounded-sm border px-3 py-2',
        state === 'leak'
          ? 'border-leak/30 bg-leak/[0.06]'
          : 'border-hairline bg-surface-inset',
      )}
    >
      <span className="flex items-center gap-2">
        <span className={cn(state === 'leak' ? 'text-leak' : 'text-sealed')}>
          <Icon name={state === 'leak' ? 'cross' : 'check'} className="h-3.5 w-3.5" />
        </span>
        <span className="text-[12px] text-secondary">{label}</span>
      </span>
      <span
        className={cn('type-figure text-[11px]', state === 'leak' ? 'text-leak' : 'text-quaternary')}
      >
        {meta}
      </span>
    </div>
  );
}

function Tile({ label, value, tone }: { label: string; value: string; tone: 'sealed' | 'accent' }) {
  return (
    <div className="rounded-sm border border-hairline bg-surface-inset px-3 py-2.5">
      <p className="type-micro mb-1.5 text-quaternary">{label}</p>
      <p className={cn('type-figure text-[19px]', tone === 'accent' ? 'text-accent' : 'text-sealed')}>
        {value}
      </p>
    </div>
  );
}

function Sparkline() {
  return (
    <svg viewBox="0 0 200 48" className="h-12 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 40 L28 37 L56 38 L84 30 L112 24 L140 14 L168 10 L200 4 L200 48 L0 48 Z"
        fill="url(#spark)"
      />
      <path
        d="M0 40 L28 37 L56 38 L84 30 L112 24 L140 14 L168 10 L200 4"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
