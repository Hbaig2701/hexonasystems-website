import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { VALUE_GENERATED } from '@/content/claims';
import { NEWS_BADGE } from '@/content/positioning';

/**
 * SECTION 1 — HERO.
 *
 * Repositioned for the deca-million buyer. The previous hero led with revenue
 * leakage, which is a defensive frame and reads as small: an operator running
 * eight figures does not shop for a lead-capture tool. The claim is now the
 * upside and the tier, stated in the first six words.
 *
 * Centred, with the news badge above the headline and a teal bloom behind it.
 * min-height:100svh avoids the mobile URL-bar jump. The H1 is hard-broken and
 * must never reflow to three lines. "more" is the only accented word.
 *
 * Motion is MOMENT 1, driven from CSS so the no-JS baseline renders the
 * finished hero with nothing hidden.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pb-24 pt-32">
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
              <span>You&apos;re already doing eight figures.</span>
            </span>
            <span
              className="hero-mask block overflow-hidden pb-[0.08em]"
              style={{ ['--delay' as string]: '400ms' }}
            >
              <span>
                You should be doing <span className="text-accent">millions more</span>.
              </span>
            </span>
          </h1>

          <p
            className="hero-enter type-lead mb-11 max-w-[56ch] text-secondary"
            style={{ ['--delay' as string]: '580ms' }}
          >
            Hexona designs and installs bespoke AI systems inside operations already past $10M. Not
            software you configure. A high-value implementation we build, install and run, measured
            against the revenue it adds.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="hero-enter" style={{ ['--delay' as string]: '760ms' }}>
              <Button href="/book" variant="primary" size="large" arrow>
                Book a systems review
              </Button>
            </span>
            <span className="hero-enter" style={{ ['--delay' as string]: '820ms' }}>
              <Button href="#audit" variant="secondary" size="large">
                Model your upside
              </Button>
            </span>
          </div>

          <p
            className="hero-enter type-micro mt-14 text-quaternary"
            style={{ ['--delay' as string]: '880ms' }}
          >
            {VALUE_GENERATED.value} generated or saved for the operations we build for
          </p>
        </div>
      </div>

      <div
        className="hero-cue-wrap absolute bottom-10 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <span className="scroll-cue motion-loop block" />
      </div>
    </section>
  );
}
