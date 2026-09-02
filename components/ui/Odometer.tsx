'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import { useReducedMotion } from '@/lib/hooks';

/**
 * Odometer — MOMENT 3, spec §6.4.
 *
 * Statistics animate as odometer digit rolls, not number tweens. Each digit is
 * a vertical strip of 0–9 in Geist Mono that translates upward to land on its
 * final value. Digits settle RIGHT-TO-LEFT with a 45ms offset, so the number
 * appears to resolve. Duration 1.1s, ease.out.
 *
 * While rolling, digits are --text-secondary; on settle they snap to
 * --text-primary and a 1px cyan rule wipes in beneath the number over 300ms.
 *
 * NO-JS / SSR BASELINE (§14): 'idle' — what the server renders and what a
 * crawler sees — is the FINAL value, already correct. The roll is a
 * progressive enhancement over correct text, never a replacement for it.
 * To roll, the strip is 'primed' to a start offset for exactly one frame with
 * transitions suppressed, then released.
 */

const ROLL_MS = 1100;
const DIGIT_OFFSET_MS = 45;
/** How many full 0–9 revolutions a digit travels before landing. */
const REVOLUTIONS = 1;

type Phase = 'idle' | 'primed' | 'rolling' | 'settled';

interface OdometerProps {
  /** The final, formatted string. Non-digit characters ($ , + % K) pass through. */
  value: string;
  /** Start the roll. Caller owns the trigger (typically 55% viewport visibility). */
  play?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** Wipe a 1px cyan rule in beneath the number on settle. */
  rule?: boolean;
}

export function Odometer({
  value,
  play = false,
  className,
  style,
  rule = false,
}: OdometerProps) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('idle');

  const chars = value.split('');
  const digitPositions = chars.map((c, i) => (/\d/.test(c) ? i : -1)).filter((i) => i >= 0);
  const totalMs = ROLL_MS + digitPositions.length * DIGIT_OFFSET_MS;

  // Advancing the roll's state machine when the caller flips `play`. The prime
  // step must land in the DOM for one frame with transitions suppressed before
  // the roll is released, which is inherently an effect, not a derivation.
  useEffect(() => {
    if (!play || phase !== 'idle') return;
    /* eslint-disable react-hooks/set-state-in-effect -- animation state machine */

    // Reduced motion: final value rendered immediately, no roll. (§6.5)
    if (reduced) {
      setPhase('settled');
      return;
    }

    setPhase('primed');
    /* eslint-enable react-hooks/set-state-in-effect */
    const frame = requestAnimationFrame(() => setPhase('rolling'));
    return () => cancelAnimationFrame(frame);
  }, [play, phase, reduced]);

  useEffect(() => {
    if (phase !== 'rolling') return;
    const t = window.setTimeout(() => setPhase('settled'), totalMs);
    return () => window.clearTimeout(t);
  }, [phase, totalMs]);

  const rolling = phase === 'rolling';
  const primed = phase === 'primed';
  const settled = phase === 'settled';

  return (
    <span className={cn('type-figure relative inline-block', className)} style={style}>
      {/* The accessible value is always the final one, in the DOM, at all times. */}
      <span className="sr-only">{value}</span>

      <span aria-hidden="true" className="type-figure inline-flex items-baseline">
        {chars.map((char, i) => {
          if (!/\d/.test(char)) {
            return (
              <span
                key={i}
                className={cn('transition-colors duration-200', rolling && 'text-secondary')}
              >
                {char}
              </span>
            );
          }

          // Digits settle right-to-left: the rightmost digit lands first.
          const posFromRight = digitPositions.length - 1 - digitPositions.indexOf(i);
          const delay = posFromRight * DIGIT_OFFSET_MS;
          const target = Number(char);

          // Primed sits REVOLUTIONS×10 rows below its landing spot so the strip
          // travels upward into place.
          const rows = primed ? target + REVOLUTIONS * 10 : target;

          return (
            <span
              key={i}
              className="relative inline-block overflow-hidden align-baseline"
              style={{ height: '1em' }}
            >
              {/* An in-flow, invisible copy of the digit. It does two jobs, and
                  the second one is why the commas used to look broken:

                  1. It gives the cell its exact width, straight from the font's
                     own metrics rather than a guessed em value.
                  2. It establishes the cell's BASELINE. An inline-block whose
                     content is all absolutely positioned has no in-flow line
                     box, so CSS falls back to using its bottom margin edge as
                     the baseline. That made every digit sit high while the
                     commas and the dollar sign stayed on the real text
                     baseline, which read as the separators having dropped. */}
              <span aria-hidden="true" style={{ visibility: 'hidden' }}>
                {char}
              </span>

              <span
                className="absolute inset-x-0 top-0 flex flex-col"
                style={{
                  transform: `translateY(${-rows}em)`,
                  transition: rolling
                    ? `transform ${ROLL_MS}ms cubic-bezier(0.16, 1, 0.30, 1) ${delay}ms`
                    : 'none',
                  // Tracking applies to each CELL, keeping the number on one
                  // rhythm. Inside the column it would shift each digit's
                  // centring, so drop it here.
                  letterSpacing: 0,
                }}
              >
                {Array.from({ length: 10 * (REVOLUTIONS + 1) }, (_, d) => (
                  <span
                    key={d}
                    className={cn(
                      'block text-center transition-colors duration-200',
                      rolling && 'text-secondary',
                    )}
                    style={{ height: '1em', lineHeight: '1em' }}
                  >
                    {d % 10}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </span>

      {rule && (
        <span
          aria-hidden="true"
          className="absolute -bottom-3 left-0 block h-px w-full origin-left bg-accent transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `scaleX(${settled || phase === 'idle' ? 1 : 0})` }}
        />
      )}
    </span>
  );
}
