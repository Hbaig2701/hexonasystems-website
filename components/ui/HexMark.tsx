import { cn } from '@/lib/cn';

/**
 * HexMark — the Hexona logo.
 *
 * Two congruent hexagonal rings of equal weight, offset along the down-right
 * diagonal and interlocked like two links of a chain. The deep blue ring sits
 * up and left, the bright cyan ring down and right, and they weave: cyan passes
 * over blue along the upper right, blue passes back over cyan along the lower
 * left. One hue, two values.
 *
 * GEOMETRY. Circumradius 70, centres 13 units either side of (100,93) on the
 * diagonal. Each ring is ONE hexagon path carrying a stroke, not a filled
 * annulus, which is what holds the band to an exactly even weight through the
 * mitred corners. The weave is the up-left ring drawn a second time on top of
 * the other through a dash window: 142.8 units of a 420-unit perimeter, started
 * 52.5 units in. That is the whole trick, and it is why this file has a handful
 * of paths rather than a page of clipped fragments.
 *
 * TWO VARIANTS, and they are not interchangeable.
 *
 *   solid    The logo. Filled bands, the logo's own two colours. Use wherever
 *            the mark is standing in for the company: the wordmark, the favicon.
 *
 *   outline  A drawing of the logo. Hairline rings in currentColor, the far
 *            ring stepped back to 55% so the two read as one in front of the
 *            other. Use where the mark is decoration rather than identity.
 *            Scaled up to watermark size the solid version puts an enormous
 *            two-tone slab behind the copy, which fights a page built out of
 *            hairlines and serif text; at low opacity its two colours muddy
 *            into one grey and the weave stops reading at all. The outline
 *            keeps the drawing and drops the mass.
 *
 * The interlace in the outline variant is cut by over-stroking in var(--bg),
 * so the mark has to sit on a flat background rather than over an image. That
 * is fine here and costs nothing; every surface on this site is flat.
 *
 * DO NOT set the solid variant below about 18px. The weave gaps are roughly a
 * twentieth of the width, so under that they close and the mark turns to mud.
 * The wordmark sets it at 20, which is the smallest size the interlace lives.
 *
 * The solid colours are the logo's own and deliberately do NOT follow the
 * surface tokens. A logotype is exempt from the contrast rules precisely
 * because it is an identity rather than information, and a mark that changes
 * colour with its background is not an identity.
 */

/** Up and left. Drawn under, then partly back over. */
const RING_BACK = 'M157 80 L122 140.62 L52 140.62 L17 80 L52 19.38 L122 19.38 Z';
/** Down and right. Drawn over. */
const RING_FRONT = 'M183 106 L148 166.62 L78 166.62 L43 106 L78 45.38 L148 45.38 Z';
/** The window through which the back ring returns over the front one. */
const WEAVE = { strokeDasharray: '142.8 277.2', strokeDashoffset: '-52.5' } as const;

export function HexMark({
  variant = 'solid',
  className,
}: {
  variant?: 'solid' | 'outline';
  className?: string;
}) {
  const common = {
    className: cn('block', className),
    viewBox: '0 0 200 186',
    fill: 'none',
    strokeLinejoin: 'miter' as const,
    'aria-hidden': true,
    focusable: 'false' as const,
  };

  if (variant === 'outline') {
    /* 3 for the line, 17 for the gap it is cut out of: a 7-unit clearance
       either side, which is what makes the crossing read as over and under
       rather than as two lines meeting. */
    const LINE = 3;
    const CUT = 17;
    return (
      <svg {...common}>
        <g strokeWidth={LINE} stroke="currentColor">
          <path d={RING_BACK} opacity="0.55" />
          <path d={RING_FRONT} stroke="var(--bg)" strokeWidth={CUT} />
          <path d={RING_FRONT} />
          <path d={RING_BACK} stroke="var(--bg)" strokeWidth={CUT} {...WEAVE} />
          <path d={RING_BACK} opacity="0.55" {...WEAVE} />
        </g>
      </svg>
    );
  }

  return (
    <svg {...common}>
      <g strokeWidth="33">
        <path d={RING_BACK} stroke="var(--logo-blue)" />
        <path d={RING_FRONT} stroke="var(--logo-cyan)" />
        <path d={RING_BACK} stroke="var(--logo-blue)" {...WEAVE} />
      </g>
    </svg>
  );
}
