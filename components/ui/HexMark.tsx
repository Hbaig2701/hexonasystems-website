import { cn } from '@/lib/cn';

/**
 * HexMark — the Hexona logo.
 *
 * Two congruent hexagonal rings of equal weight, offset along the down-right
 * diagonal and interlocked like two links of a chain. The dark ring sits up and
 * left, the cyan ring down and right, and they weave: cyan passes over dark
 * along the upper right, dark passes back over cyan along the lower left.
 *
 * CONSTRUCTION. Each ring is one hexagon path carrying a 33-unit stroke, not a
 * filled annulus, which is what keeps the band an exactly even weight through
 * the mitred corners. Circumradius 70, centres 13 units either side of (100,93)
 * on the diagonal. The weave is the dark ring drawn a second time on top of the
 * cyan one through a dash window: 142.8 units of a 420-unit perimeter, started
 * 52.5 units in. That is the whole trick, and it is why the file has three
 * paths rather than a dozen clipped fragments.
 *
 * DO NOT shrink this below about 18px. The weave gaps are roughly a twentieth
 * of the width, so under that they close up and the mark turns to mud; it
 * stops reading as two linked rings and starts reading as a blob. The wordmark
 * sets it at 20, which is the smallest size the interlace survives.
 *
 * The colours are the logo's own and deliberately do NOT follow the surface
 * tokens. A logotype is exempt from the contrast rules precisely because it is
 * an identity rather than information, and a mark that changes colour with its
 * background is not an identity. They are declared in globals.css so there is
 * still one place to change them.
 */
export function HexMark({ className }: { className?: string }) {
  return (
    <svg
      className={cn('block', className)}
      viewBox="0 0 200 186"
      fill="none"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
    >
      {/* Dark ring, up and left. Under the cyan one. */}
      <path
        d="M157 80 L122 140.62 L52 140.62 L17 80 L52 19.38 L122 19.38 Z"
        stroke="var(--logo-slate)"
        strokeWidth="33"
      />
      {/* Cyan ring, down and right. Over the dark one. */}
      <path
        d="M183 106 L148 166.62 L78 166.62 L43 106 L78 45.38 L148 45.38 Z"
        stroke="var(--logo-cyan)"
        strokeWidth="33"
      />
      {/* The weave: the dark ring returning over the cyan one, lower left. */}
      <path
        d="M157 80 L122 140.62 L52 140.62 L17 80 L52 19.38 L122 19.38 Z"
        stroke="var(--logo-slate)"
        strokeWidth="33"
        strokeDasharray="142.8 277.2"
        strokeDashoffset="-52.5"
      />
    </svg>
  );
}
