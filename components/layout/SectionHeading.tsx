'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { useEnter } from '@/lib/hooks';

/**
 * SectionHeading — the section cadence from the reference designs.
 *
 *        ╭──────────╮
 *        │ Our Team │        ← pill eyebrow
 *        ╰──────────╯
 *   The Architects Behind     ← centred heading
 *        the Engine
 *   We bring together …       ← one-line centred sub
 *
 * Every section on the site opens this way. What sits UNDER it varies
 * deliberately — grids, splits, ledgers, full-bleed panels — so the page keeps
 * a rhythm instead of repeating one shape twelve times (§4.4, §15).
 *
 * The mono index from §4.3 is retained as an optional prefix inside the pill:
 * it is what makes the site read as instrumentation rather than brochure, and
 * it costs nothing to keep.
 *
 * Entrance: pill, heading and sub stagger at 60ms (§6.3). The heading is the
 * anchor, so it carries no delay of its own.
 */

interface SectionHeadingProps {
  /** Pill text — short. "Our Team", "The Cost", "Straight Answers". */
  eyebrow: string;
  /** Two-digit index rendered in the pill, e.g. "03". Bookends omit it (§4.3). */
  index?: string;
  children: ReactNode;
  /** One line. Keep it to one line. It is a caption, not a paragraph. */
  sub?: ReactNode;
  tone?: 'dark' | 'light';
  align?: 'center' | 'left';
  /** Heading level. Defaults to h2; pages use h1 for their own title. */
  as?: 'h1' | 'h2' | 'h3';
  size?: 'display-1' | 'display-2' | 'display-3';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  index,
  children,
  sub,
  tone = 'dark',
  align = 'center',
  as: Tag = 'h2',
  size = 'display-2',
  className,
}: SectionHeadingProps) {
  const ref = useEnter<HTMLDivElement>();
  const light = tone === 'light';
  const centered = align === 'center';

  return (
    <div
      ref={ref}
      data-enter=""
      className={cn(
        'flex flex-col',
        centered ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      <span
        className={cn(
          'pill mb-8',
          light && 'border-light-hairline bg-light-surface',
        )}
      >
        {index && (
          <>
            <span className={cn('type-micro', light ? 'text-light-accent' : 'text-accent')}>
              {index}
            </span>
            <span
              aria-hidden="true"
              className={cn('type-micro', light ? 'text-light-tertiary' : 'text-decorative')}
            >
              /
            </span>
          </>
        )}
        <span
          className={cn(
            'type-label !tracking-[0.1em]',
            light ? 'text-light-secondary' : 'text-secondary',
          )}
        >
          {eyebrow}
        </span>
      </span>

      <Tag
        className={cn(
          size === 'display-1'
            ? 'type-display-1'
            : size === 'display-3'
              ? 'type-display-3'
              : 'type-display-2',
          // Headings get a measure even when centred, so a long title breaks
          // where it should instead of running the full width of the viewport.
          centered ? 'max-w-[19ch]' : 'max-w-[22ch]',
          light ? 'text-light-primary' : 'text-primary',
        )}
      >
        {children}
      </Tag>

      {sub && (
        <p
          className={cn(
            'type-lead mt-6 max-w-[54ch]',
            light ? 'text-light-secondary' : 'text-secondary',
          )}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
