import { cn } from '@/lib/cn';

/**
 * SectionEyebrow — THE TYPOGRAPHIC SIGNATURE, spec §4.3.
 *
 *   ─── 03 / REVENUE LEAKAGE ────────────────────────────────
 *
 * `03` in --accent, ` / ` in --text-decorative (a separator glyph, not read
 * content), the label in --text-secondary, then a 1px --hairline rule filling
 * the remaining width.
 *
 * Appears on every NUMBERED section. The homepage hero (S1) and closing CTA
 * (S12) are deliberately exempt — they are the bookends and carry no index.
 *
 * On light surfaces, substitute --light-accent / --light-hairline /
 * --light-secondary via the `tone` prop.
 *
 * §5.5 permits a 1px hex-edge motif in these rules on interior pages — that is
 * the third and only other place the lattice may appear.
 */

interface SectionEyebrowProps {
  /** Two-digit index, e.g. "03". Omit for unnumbered sections. */
  index?: string;
  label: string;
  tone?: 'dark' | 'light';
  /** Renders the hex-edge motif in the trailing rule (§5.5, interior pages). */
  hexMotif?: boolean;
  className?: string;
}

export function SectionEyebrow({
  index,
  label,
  tone = 'dark',
  hexMotif = false,
  className,
}: SectionEyebrowProps) {
  const accent = tone === 'light' ? 'text-light-accent' : 'text-accent';
  const secondary = tone === 'light' ? 'text-light-secondary' : 'text-secondary';
  const decorative = tone === 'light' ? 'text-light-tertiary' : 'text-decorative';
  const rule = tone === 'light' ? 'bg-light-hairline' : 'bg-hairline';

  return (
    <div className={cn('flex w-full items-center gap-3', className)}>
      {/* Leading rule — the ─── before the index */}
      <span aria-hidden="true" className={cn('h-px w-8 shrink-0', rule)} />

      <p className="type-label flex shrink-0 items-baseline gap-2 whitespace-nowrap">
        {index && <span className={accent}>{index}</span>}
        {index && (
          <span aria-hidden="true" className={decorative}>
            /
          </span>
        )}
        <span className={secondary}>{label}</span>
      </p>

      {/* Trailing rule fills the remaining width */}
      {hexMotif ? (
        <span aria-hidden="true" className="relative h-2 min-w-8 flex-1 overflow-hidden">
          <span className={cn('absolute left-0 top-1/2 h-px w-full', rule)} />
          <svg
            className="absolute left-0 top-0 h-2 w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <pattern id="hex-edge" width="14" height="8" patternUnits="userSpaceOnUse">
                <path
                  d="M0 4 L3.5 0 L10.5 0 L14 4 L10.5 8 L3.5 8 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className={tone === 'light' ? 'text-light-hairline' : 'text-hairline'}
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hex-edge)" opacity="0.5" />
          </svg>
        </span>
      ) : (
        <span aria-hidden="true" className={cn('h-px min-w-8 flex-1', rule)} />
      )}
    </div>
  );
}
