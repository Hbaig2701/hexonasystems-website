import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * FigureBlock — §3.5.
 * Sunk panel, 1px rule, mono label, large tabular figure, one line of
 * annotation. No shadow, no hover, no icon.
 *
 * Note the annotation uses --fg-3, which is why --ink-3 had to be darkened from
 * the spec's #6A6E77: on --paper-sunk that value measures 4.29:1, below AA.
 * See the token block in globals.css.
 */
export function FigureBlock({
  label,
  figure,
  annotation,
  tone,
  className,
}: {
  label: string;
  figure: ReactNode;
  annotation?: string;
  tone?: 'loss' | 'brand';
  className?: string;
}) {
  return (
    <div className={cn('border border-line bg-bg-sunk p-6', className)}>
      <p className="t-label mb-5 text-fg-3">{label}</p>
      <p
        className={cn(
          't-figure-lg',
          tone === 'loss' ? 'text-loss' : tone === 'brand' ? 'text-brand' : 'text-fg',
        )}
      >
        {figure}
      </p>
      {annotation && <p className="t-small mt-5 max-w-[44ch] text-fg-3">{annotation}</p>}
    </div>
  );
}
