import { cn } from '@/lib/cn';

/**
 * Wordmark. Type, not a logo.
 *
 * §10 rules out stock imagery and the whole direction is "document, not
 * dashboard", so the mark is set in the mono face that carries every other
 * label on the site. It inherits its colour from the surrounding surface, which
 * is what lets the header sit on either ground without a second asset.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'font-[family-name:var(--font-figure)] text-[13px] font-medium uppercase tracking-[0.2em]',
        className,
      )}
    >
      Hexona
    </span>
  );
}
