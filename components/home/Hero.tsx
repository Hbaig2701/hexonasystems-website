import Link from 'next/link';
import { ENTITY_SENTENCE } from '@/content/firm';
import { LatticeCanvas } from '@/components/hx/LatticeCanvas';
import { PointerTilt } from '@/components/hx/Interactive';
import { LogoMark } from '@/components/hx/Logo';
import { delay } from '@/components/hx/Blocks';

/**
 * The homepage hero: headline, the entity sentence, two calls to action, and
 * the Hexona mark floating over a living lattice.
 *
 * ⚠️ ENTITY_SENTENCE must render here (Ticket 5, enforced by check:seo). It is
 * the line an assistant lifts when asked who Hexona is, so it is real body
 * text, not a graphic.
 */
export function Hero() {
  return (
    <header className="hx-hero">
      <LatticeCanvas className="hx-hero-canvas" />

      <div className="hx-wrap flex min-h-[calc(100svh-76px)] flex-wrap items-center gap-12 py-16 lg:flex-nowrap lg:py-20">
        <div className="min-w-0 flex-[999_1_560px]">
          <p className="hx-eyebrow m-0 mb-7" data-enter="up">
            <span className="hx-ping" aria-hidden="true" />
            Done-for-you AI implementation
          </p>

          <h1 className="hx-h1 m-0 max-w-[14ch]" data-enter="rise" style={delay(80)}>
            AI that increases <span className="hx-mark">enterprise value.</span>
          </h1>

          <p className="hx-lead m-0 mt-8 max-w-[40rem]" data-enter="rise" style={delay(180)}>
            We build and run AI employees for service businesses: a receptionist, sales follow-up,
            dispatch and back office. We only build the ones that make your business worth more.
          </p>

          <div className="mt-10 flex flex-wrap gap-3" data-enter="up" style={delay(280)}>
            <Link href="/book" className="hx-btn hx-btn-primary">
              Book a free consult <span className="hx-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/ai-employees" className="hx-btn hx-btn-ghost">
              Meet your AI team
            </Link>
          </div>

          {/* The definition. Quiet for people, essential for machines. */}
          <p className="m-0 mt-10 max-w-[44rem] text-[14px] leading-relaxed" style={{ color: 'var(--hx-ink-3)', ...delay(380) }} data-enter="rise">
            {ENTITY_SENTENCE}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[420px] flex-[1_1_320px]" data-enter="scale" style={delay(200)}>
          <div className="relative aspect-square">
            <div className="hx-orbit" aria-hidden="true">
              <span style={{ top: '6%', left: '50%' }} />
              <span style={{ bottom: '18%', left: '6%' }} />
              <span style={{ top: '40%', right: '-1%' }} />
            </div>
            <div className="hx-orbit hx-orbit-2" aria-hidden="true">
              <span style={{ top: '-1%', left: '30%' }} />
              <span style={{ bottom: '4%', right: '30%' }} />
            </div>
            <PointerTilt className="absolute inset-[16%]">
              <div className="hx-float h-full w-full">
                <LogoMark size="100%" draw className="hx-mark-shadow h-full w-full" title="Hexona Systems" />
              </div>
            </PointerTilt>
          </div>
        </div>
      </div>
    </header>
  );
}
