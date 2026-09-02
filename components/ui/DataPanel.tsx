import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * DataPanel — spec §4.6.
 * A recurring component for displaying metrics: a mono header bar over a body
 * of large tabular figures. Used in case studies and the audit results.
 */

interface DataPanelProps {
  /** Mono header bar content. Rendered uppercase at --text-label. */
  header?: ReactNode;
  /** Optional right-aligned content in the header bar. */
  headerRight?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function DataPanel({
  header,
  headerRight,
  children,
  className,
  bodyClassName,
}: DataPanelProps) {
  return (
    <div className={cn('overflow-hidden rounded-md border border-hairline bg-surface', className)}>
      {header && (
        <div className="flex items-center justify-between gap-4 border-b border-hairline bg-surface-raised px-5 py-3">
          <div className="type-label text-tertiary">{header}</div>
          {headerRight && <div className="type-micro text-quaternary">{headerRight}</div>}
        </div>
      )}
      <div className={cn('p-5', bodyClassName)}>{children}</div>
    </div>
  );
}

/**
 * A single label/figure row inside a DataPanel. The arithmetic tables in the
 * audit (§8.4) are built from these — label left, tabular figure right, so a
 * visitor checking the chain by hand can follow it down the column.
 */
export function DataRow({
  label,
  value,
  emphasis,
  tone = 'default',
  rule,
}: {
  label: ReactNode;
  value: ReactNode;
  emphasis?: boolean;
  tone?: 'default' | 'leak' | 'sealed' | 'accent';
  /** Draws a hairline above the row — used to close an arithmetic group. */
  rule?: boolean;
}) {
  const toneClass =
    tone === 'leak'
      ? 'text-leak'
      : tone === 'sealed'
        ? 'text-sealed'
        : tone === 'accent'
          ? 'text-accent'
          : emphasis
            ? 'text-primary'
            : 'text-secondary';

  return (
    <div
      className={cn(
        'flex items-baseline justify-between gap-6 py-2',
        rule && 'mt-1 border-t border-hairline pt-3',
      )}
    >
      <span className={cn('text-[13px]', emphasis ? 'text-primary' : 'text-tertiary')}>{label}</span>
      <span className={cn('type-figure text-[15px]', toneClass, emphasis && 'text-[17px]')}>
        {value}
      </span>
    </div>
  );
}
