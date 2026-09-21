import { cn } from '@/lib/cn';

/**
 * InquiryLedger — what leakage looks like on the ground.
 *
 * Five inbound inquiries at one company on one morning. Three answered inside
 * ten minutes, one answered on the second day, one never assigned to anybody.
 * The two that failed were paid for exactly like the three that did not.
 *
 * ⚠️ THIS IS NOT EVIDENCE AND MUST NEVER BE MISTAKEN FOR IT. §5 gates the
 * engagement record precisely because a PE operating partner checks that block
 * hardest, and a fabricated table there would be the most damaging thing on the
 * site. This is a diagram of a mechanism and it lives in the ARGUMENT section,
 * away from the record. Do not move it into §1 or anywhere near /evidence.
 *
 * It CARRIED a caption reading "Illustrative, not client data", removed at the
 * founder's request. The figures are invented, so without that line the only
 * thing separating this from a client record is its position on the page.
 * Keep it in the argument.
 *
 * Built out of the same parts as the rest of the page: hairline rules, a mono
 * label, tabular figures. No panel chrome, no window buttons, no shadow, no
 * rounded corners. It reads as a page torn out of a log, which is the register
 * the whole site is written in.
 */

interface Line {
  /** Minutes to first human response, or null where nobody ever picked it up. */
  minutes: number | null;
  display: string;
}

const LINES: Line[] = [
  { minutes: 2, display: '2 min' },
  { minutes: 4, display: '4 min' },
  { minutes: 1860, display: '31 hr' },
  { minutes: null, display: 'Unassigned' },
  { minutes: 6, display: '6 min' },
];

/** The threshold the whole diagram turns on. Inside ten minutes the inquiry is
 *  still live; past it, it has usually already bought somewhere else. */
const LIVE_WITHIN_MINUTES = 10;

function isLive(line: Line) {
  return line.minutes !== null && line.minutes <= LIVE_WITHIN_MINUTES;
}

export function InquiryLedger({ className }: { className?: string }) {
  return (
    <figure className={cn('m-0', className)}>
      <div className="border border-line bg-bg-sunk">
        <p className="t-label border-b border-line px-5 py-4 text-fg-3">
          Inbound inquiries · one morning
        </p>

        <ul className="m-0 list-none p-0">
          {LINES.map((line, i) => {
            const live = isLive(line);
            return (
              <li
                key={i}
                className={cn(
                  'flex items-center gap-4 border-b border-line px-5 py-4 last:border-b-0',
                  /* The failed lines carry a bar in the loss colour. Colour is
                     never the only signal: the mark and the figure both say it
                     too, which is what keeps this readable to a deuteranope. */
                  !live && 'border-l-2 border-l-loss',
                )}
              >
                <Glyph live={live} />
                <span className="t-small text-fg-2">New inquiry</span>
                <span
                  className={cn(
                    't-small ml-auto tabular-nums',
                    live ? 'text-fg-3' : 'font-medium text-loss',
                  )}
                >
                  {line.display}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

    </figure>
  );
}

/** A check or a cross, drawn rather than typed, so it keeps its weight next to
 *  the mono figures and never depends on an emoji font. */
function Glyph({ live }: { live: boolean }) {
  return (
    <svg
      className={cn('shrink-0', live ? 'text-brand' : 'text-loss')}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
      focusable="false"
    >
      {live ? <path d="M1.5 6.5 L4.5 9.5 L10.5 2.5" /> : <path d="M2 2 L10 10 M10 2 L2 10" />}
    </svg>
  );
}
