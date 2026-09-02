import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { BUSINESSES_POWERED } from '@/content/claims';
import { NEWS_BADGE } from '@/content/positioning';

/**
 * SECTION 1 — HERO. §7.1 S1, restyled to the reference design's cadence.
 *
 * Centred, with the news badge above the headline and a teal bloom behind it.
 * Full viewport height at min-height:100svh (small viewport unit — avoids the
 * mobile URL-bar jump). The H1 is hard-broken with <br> and must never reflow
 * to three lines. "leaking" is the only accented word in the hero.
 *
 * No section eyebrow: S1 and S12 are the bookends and carry no index (§4.3).
 *
 * Motion is MOMENT 1 (§6.4), driven entirely from CSS so the no-JS baseline
 * renders the finished hero with nothing hidden.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pb-24 pt-32">
      {/* Teal bloom behind the headline. Purely atmospheric — it sits under the
          content and never behind body copy at a size where it could affect
          legibility. */}
      <div className="glow-hero" aria-hidden="true" />

      <div className="page-shell relative">
        <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
          <Link
            href={NEWS_BADGE.href}
            className="hero-rise pill mb-10 transition-colors duration-[240ms] hover:border-accent"
            style={{ ['--delay' as string]: '150ms' }}
          >
            <span className="type-micro rounded-sm bg-accent px-2 py-0.5 font-medium uppercase tracking-[0.1em] text-[#06070A]">
              {NEWS_BADGE.label}
            </span>
            <span className="text-small text-secondary">{NEWS_BADGE.text}</span>
          </Link>

          <h1 className="type-display-1 mb-9">
            <span
              className="hero-mask block overflow-hidden pb-[0.08em]"
              style={{ ['--delay' as string]: '280ms' }}
            >
              <span>Your revenue isn&apos;t lost.</span>
            </span>
            <span
              className="hero-mask block overflow-hidden pb-[0.08em]"
              style={{ ['--delay' as string]: '400ms' }}
            >
              <span>
                It&apos;s <span className="text-accent">leaking</span>.
              </span>
            </span>
          </h1>

          <p
            className="hero-enter type-lead mb-11 max-w-[58ch] text-secondary"
            style={{ ['--delay' as string]: '580ms' }}
          >
            Every unanswered lead. Every manual handoff. Every reply that took a day instead of a
            minute. These are gaps, and revenue falls through them before anyone notices. Hexona
            builds the operating system that seals them.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="hero-enter" style={{ ['--delay' as string]: '760ms' }}>
              <Button href="#audit" variant="primary" size="large" arrow>
                Find your leak
              </Button>
            </span>
            <span className="hero-enter" style={{ ['--delay' as string]: '820ms' }}>
              <Button href="/book" variant="secondary" size="large">
                Book a systems review
              </Button>
            </span>
          </div>

          <p
            className="hero-enter type-micro mt-14 text-quaternary"
            style={{ ['--delay' as string]: '880ms' }}
          >
            {BUSINESSES_POWERED.value} businesses running on Hexona
          </p>
        </div>
      </div>

      {/* Scroll cue — a 1px vertical line whose opacity travels top-to-bottom
          on a 2.4s linear loop. */}
      <div
        className="hero-cue-wrap absolute bottom-10 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <span className="scroll-cue motion-loop block" />
      </div>
    </section>
  );
}
