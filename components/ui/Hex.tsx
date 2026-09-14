import { cn } from '@/lib/cn';

/**
 * Hex — a flat-top hexagon outline in currentColor.
 *
 * The company is called Hexona and nothing on the site said so. This is the
 * mark that fixes it, used small and sparingly: in the section markers, in the
 * wordmark, and as the tick on a figure block.
 *
 * v1 made the hexagon a full WebGL lattice with packets falling through it.
 * §3.4 forbids canvas, WebGL and particles outright, and it is right to: an
 * operating partner reads animation as marketing spend, and marketing spend is
 * margin he is paying for. A drawn glyph at 1px says the same thing in a
 * register this buyer doesn't have to forgive.
 */
export function Hex({
  size = 10,
  filled = false,
  className,
}: {
  size?: number;
  /** A solid hexagon, for the small marker dot. */
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size * 0.866}
      viewBox="0 0 20 17.32"
      aria-hidden="true"
      focusable="false"
      className={cn('inline-block shrink-0', className)}
    >
      <path
        d="M15 0 L20 8.66 L15 17.32 L5 17.32 L0 8.66 L5 0 Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke={filled ? 'none' : 'currentColor'}
        strokeWidth={filled ? 0 : 1.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}
