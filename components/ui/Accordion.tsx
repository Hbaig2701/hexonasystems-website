'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { useHydrated } from '@/lib/hooks';

/**
 * Accordion — spec §7.1 S11 and the no-JS requirement in §14 (Phase 4):
 * "the objections accordion is a native <details>/<summary> styled to spec,
 * enhanced by JS rather than replaced by it."
 *
 * So: real <details> elements. With JS off they open and close natively and
 * every answer is readable. With JS on we add the height transition, the
 * + → × rotation, and the one-open-at-a-time behaviour.
 *
 * aria-expanded / aria-controls are handled natively by <details>/<summary> —
 * adding them by hand on a <summary> actively confuses screen readers.
 */

export interface AccordionItem {
  question: string;
  answer: ReactNode;
}

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const enhanced = useHydrated();

  return (
    <div className={cn('border-t border-hairline', className)}>
      {items.map((item, i) => (
        <AccordionRow
          key={i}
          item={item}
          index={i}
          enhanced={enhanced}
          open={enhanced ? open === i : undefined}
          onToggle={(next) => setOpen(next ? i : null)}
        />
      ))}
    </div>
  );
}

function AccordionRow({
  item,
  index,
  enhanced,
  open,
  onToggle,
}: {
  item: AccordionItem;
  index: number;
  enhanced: boolean;
  open?: boolean;
  onToggle: (next: boolean) => void;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  // Keep the native element in sync with controlled state, without stomping on
  // the no-JS behaviour before enhancement kicks in.
  useEffect(() => {
    if (!enhanced || !detailsRef.current || open === undefined) return;
    detailsRef.current.open = open;
  }, [enhanced, open]);

  useEffect(() => {
    if (!enhanced) return;
    setHeight(open ? (bodyRef.current?.scrollHeight ?? 0) : 0);
  }, [enhanced, open]);

  return (
    <details
      ref={detailsRef}
      className="group border-b border-hairline"
      onToggle={(e) => {
        if (!enhanced) return;
        const isOpen = (e.currentTarget as HTMLDetailsElement).open;
        if (isOpen !== open) onToggle(isOpen);
      }}
    >
      <summary
        className={cn(
          'flex cursor-pointer list-none items-start justify-between gap-6 py-6',
          'transition-colors duration-[240ms] hover:text-accent',
          '[&::-webkit-details-marker]:hidden',
        )}
      >
        <span className="flex gap-5 pr-4">
          <span className="type-micro mt-1.5 shrink-0 text-quaternary">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[17px] font-medium leading-snug text-primary transition-colors duration-[240ms] group-hover:text-accent">
            {item.question}
          </span>
        </span>
        <span
          aria-hidden="true"
          className={cn(
            'mt-1 shrink-0 text-[18px] leading-none text-tertiary',
            'transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
            'group-open:rotate-45 group-open:text-accent',
          )}
        >
          +
        </span>
      </summary>

      <div
        className={cn(
          'overflow-hidden',
          enhanced &&
            'transition-[height,opacity] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
        )}
        style={enhanced ? { height, opacity: open ? 1 : 0 } : undefined}
      >
        <div ref={bodyRef} className="pb-7 pl-11 pr-12">
          <div className="type-body max-w-[68ch] text-secondary">{item.answer}</div>
        </div>
      </div>
    </details>
  );
}
