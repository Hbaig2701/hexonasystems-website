import { cn } from '@/lib/cn';
import { HexMark } from '@/components/ui/HexMark';

/**
 * Wordmark. Type, not a logo.
 *
 * §10 rules out stock imagery and the whole direction is "document, not
 * dashboard", so the WORD is set in the mono face that carries every other
 * label on the site, and inherits its colour from the surrounding surface.
 * That is what lets the header sit on either ground without a second asset.
 *
 * The mark beside it does not inherit: it is the logo, in the logo's colours,
 * and it is set at 20px because the interlace closes up below about 18. See
 * HexMark.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-[family-name:var(--font-figure)] text-[13px] font-medium uppercase tracking-[0.2em]',
        className,
      )}
    >
      <HexMark className="w-5 shrink-0" />
      Hexona
    </span>
  );
}
