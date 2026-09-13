import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * RecordTable — §3.5, the site's primary component.
 *
 * Engagement records, credentials, scope, deliverables: all of them are this.
 * §10 forbids card grids of three, so wherever instinct says "feature cards"
 * the answer is a ruled table or a numbered list.
 *
 * Colours come from the enclosing surface, so the same table is correct on
 * paper and on void. The mobile stack is pure CSS (see globals.css), which
 * keeps one semantic <table> in the DOM: screen readers get real row and
 * column relationships at every width, and there is no horizontal scroll.
 */

export interface Column {
  key: string;
  label: string;
  /** Right-aligned tabular figures. */
  numeric?: boolean;
  /** Signal colour. Always paired with the column label, never colour alone. */
  tone?: 'loss' | 'brand';
}

export interface Row {
  id: string;
  cells: Record<string, ReactNode>;
  /** Rows on the engagement record link through to /evidence/[slug]. */
  href?: string;
}

export function RecordTable({
  columns,
  rows,
  zebra = false,
  caption,
  className,
}: {
  columns: Column[];
  rows: Row[];
  zebra?: boolean;
  /** Visually hidden unless you need it; screen readers always get it. */
  caption?: string;
  className?: string;
}) {
  return (
    <table className={cn('record', zebra && 'record--zebra', className)}>
      {caption && <caption className="sr-only">{caption}</caption>}
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key} scope="col" className={cn(c.numeric && 'num')}>
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className={cn(row.href && 'is-link')}>
            {columns.map((c, i) => {
              const content = row.cells[c.key];
              const toned =
                c.tone === 'loss'
                  ? 'text-loss'
                  : c.tone === 'brand'
                    ? 'text-brand'
                    : undefined;

              return (
                <td key={c.key} data-label={c.label} className={cn(c.numeric && 'num', toned)}>
                  {/* Only the first cell carries the link, so a row is one tab
                      stop rather than five. */}
                  {row.href && i === 0 ? (
                    <Link href={row.href} className="link">
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * Column definitions, published beneath a table. §4 section 3 is blunt about
 * why: an undefined column is an unfalsifiable claim.
 */
export function ColumnKey({ items }: { items: { term: string; definition: string }[] }) {
  return (
    <dl className="mt-8 flex flex-col gap-2.5">
      {items.map((item) => (
        <div key={item.term} className="flex flex-col gap-1 sm:flex-row sm:gap-5">
          <dt className="t-label shrink-0 text-fg-3 sm:w-24">{item.term}</dt>
          <dd className="t-small max-w-[68ch] text-fg-3">{item.definition}</dd>
        </div>
      ))}
    </dl>
  );
}
