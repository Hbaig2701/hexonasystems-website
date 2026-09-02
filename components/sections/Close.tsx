'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { latticeState } from '@/lib/lattice/state';
import { useReducedMotion } from '@/lib/hooks';

/**
 * SECTION 12 — CLOSE. §7.1 S12.
 *
 * Full-bleed. Lattice fully sealed and breathing. No section eyebrow: S1 and
 * S12 are the bookends and carry no index (§4.3).
 *
 * MOMENT 6 — PACKET CONVERGENCE (§6.4): as this section enters the viewport,
 * all packets currently in the system converge toward the CTA button's screen
 * position over 1.6s, and on arrival the button's glow intensifies by 40% and
 * holds. RUNS ONCE PER SESSION.
 *
 * §6.5: convergence is disabled entirely under prefers-reduced-motion.
 */

const CONVERGE_MS = 1600;

export function Close() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const fired = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ctaRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || fired.current) return;
        fired.current = true;
        io.disconnect();

        const rect = el.getBoundingClientRect();
        // Lattice space: pixels, origin at viewport centre, y up.
        latticeState.convergeX = rect.left + rect.width / 2 - window.innerWidth / 2;
        latticeState.convergeY = -(rect.top + rect.height / 2 - window.innerHeight / 2);

        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / CONVERGE_MS);
          // Per-frame lerp factor, ramping so packets accelerate inward.
          latticeState.converge = 0.015 + t * t * 0.09;
          if (t < 1) {
            requestAnimationFrame(step);
          } else {
            latticeState.converge = 0;
            glowRef.current?.setAttribute('data-arrived', 'true');
          }
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <section className="relative py-24 md:py-36">
      <div className="page-shell">
        {/* The reference design's closing block: a single contained panel with
            the teal bloom, centred. It is the one moment the page stops being a
            document and becomes an offer. */}
        <Reveal>
          <div className="glow-block rounded-md border border-hairline bg-surface px-7 py-20 text-center md:px-16 md:py-28">
            <h2 className="type-display-2 mx-auto mb-7 max-w-[18ch]">
              Take Your First Step to <span className="text-accent">Liberation</span>
            </h2>

            <p className="type-lead mx-auto mb-12 max-w-[46ch] text-secondary">
              You&apos;ve seen the number. The only question left is whether it keeps compounding.
            </p>

            <div ref={ctaRef} className="inline-block">
              <div
                ref={glowRef}
                className="inline-block rounded-md transition-shadow duration-500 data-[arrived=true]:shadow-[0_12px_46px_rgba(34,211,238,0.38)]"
              >
                <Button href="/book" variant="primary" size="large" arrow>
                  Book a systems review
                </Button>
              </div>
            </div>

            <p className="text-small mx-auto mt-8 max-w-[52ch] text-secondary">
              30 minutes. We&apos;ll map your gaps live. If there isn&apos;t enough leakage to
              justify a build, we&apos;ll say so.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
