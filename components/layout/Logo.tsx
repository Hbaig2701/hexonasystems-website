import { cn } from '@/lib/cn';

/**
 * The Hexona mark.
 *
 * ⚠️ [ASSET NEEDED · §11 item 13] The official brand mark in SVG, or a decision
 * to redraw it. What follows is a drawn placeholder built from the same
 * structural language as the lattice (a hexagon cell with one open edge — the
 * gap, before it is sealed). It is deliberately not a stock glyph, and it is
 * built to be swapped in one file.
 */
export function Logo({
  className,
  tone = 'dark',
}: {
  className?: string;
  tone?: 'dark' | 'light';
}) {
  const fg = tone === 'light' ? 'var(--light-primary)' : 'var(--text-primary)';

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        width="20"
        height="22"
        viewBox="0 0 20 22"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Outer cell — one edge left open, in cyan: the seam. */}
        <path
          d="M10 1 L18.66 6 L18.66 16 L10 21 L1.34 16 L1.34 6 Z"
          stroke={fg}
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="none"
          opacity="0.9"
        />
        <path d="M10 1 L18.66 6" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" />
        {/* Inner cell — the sealed core. */}
        <path
          d="M10 7.4 L14.32 9.9 L14.32 14.9 L10 17.4 L5.68 14.9 L5.68 9.9 Z"
          fill={fg}
          opacity="0.16"
        />
      </svg>
      <span
        className="font-mono text-[15px] font-medium uppercase tracking-[0.18em]"
        style={{ color: fg }}
      >
        Hexona
      </span>
    </span>
  );
}
