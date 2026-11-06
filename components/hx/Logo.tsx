/**
 * The Hexona mark: two interlocking hexagonal rings, deep teal under, cyan over,
 * with the teal ring woven back over the cyan along the lower left.
 *
 * Geometry is the one in components/ui/HexMark.tsx and public/hexona-mark.svg.
 * `draw` makes the rings draw themselves in on load (CSS in globals: .hx-draw),
 * which is why every path carries pathLength=1.
 */

const RING_BACK = 'M157 80 L122 140.62 L52 140.62 L17 80 L52 19.38 L122 19.38 Z';
const RING_FRONT = 'M183 106 L148 166.62 L78 166.62 L43 106 L78 45.38 L148 45.38 Z';

type Tone = 'brand' | 'light';

const COLORS: Record<Tone, { back: string; front: string }> = {
  brand: { back: '#0B5566', front: '#35C6D1' },
  // On the deep-teal footer the dark ring would vanish, so it lifts to light cyan.
  light: { back: '#7FE3EA', front: '#35C6D1' },
};

export function LogoMark({
  size = 28,
  tone = 'brand',
  draw = false,
  className,
  title,
}: {
  size?: number | string;
  tone?: Tone;
  draw?: boolean;
  className?: string;
  /** Give a title only where the mark stands alone; next to the name it is decoration. */
  title?: string;
}) {
  const c = COLORS[tone];
  const width = typeof size === 'number' ? size : undefined;
  return (
    <svg
      viewBox="0 0 200 186"
      width={width}
      height={typeof size === 'number' ? Math.round(size * 0.93) : undefined}
      className={[draw ? 'hx-draw' : '', className].filter(Boolean).join(' ') || undefined}
      fill="none"
      // The mitred corners poke past the 200×186 box; without this they are cut off.
      overflow="visible"
      strokeLinejoin="miter"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <g strokeWidth="33">
        <path d={RING_BACK} stroke={c.back} pathLength={1} />
        <path d={RING_FRONT} stroke={c.front} pathLength={1} />
        <path
          d={RING_BACK}
          stroke={c.back}
          pathLength={1}
          className="hx-weave"
          strokeDasharray="0.34 0.66"
          strokeDashoffset="-0.125"
        />
      </g>
    </svg>
  );
}

export function Wordmark({ tone = 'brand' }: { tone?: Tone }) {
  return (
    <span
      className="inline-flex items-center gap-2.5 text-[18px] font-semibold tracking-[-0.01em]"
      style={{ color: tone === 'light' ? '#FFFFFF' : 'var(--hx-ink)' }}
    >
      <LogoMark size={30} tone={tone} />
      Hexona Systems
    </span>
  );
}
