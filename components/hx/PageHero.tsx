import type { ReactNode } from 'react';
import { LatticeCanvas } from './LatticeCanvas';
import { Breadcrumbs, delay } from './Blocks';

/**
 * The hero for every inner page: breadcrumbs, eyebrow, H1, the one-sentence
 * answer, and the calls to action, over the same living lattice as the
 * homepage. `aside` sits to the right on wide screens.
 */
export function PageHero({
  trail,
  eyebrow,
  title,
  answer,
  children,
  aside,
}: {
  trail: { name: string; path: string }[];
  eyebrow: string;
  title: ReactNode;
  /** Quotable answer sentence. Keep it the first paragraph on the page. */
  answer: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="hx-hero">
      <LatticeCanvas className="hx-hero-canvas" />
      <div className="hx-wrap flex flex-wrap items-center gap-12 pb-20 pt-12 lg:flex-nowrap lg:pb-24 lg:pt-16">
        <div className="min-w-0 flex-[999_1_560px]">
          <Breadcrumbs trail={trail} />
          <p className="hx-eyebrow m-0 mb-6" data-enter="up">
            {eyebrow}
          </p>
          <h1 className="hx-h1 m-0 max-w-[18ch]" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', ...delay(80) }} data-enter="rise">
            {title}
          </h1>
          <p className="hx-lead m-0 mt-7 max-w-[42rem]" data-enter="rise" style={delay(180)}>
            {answer}
          </p>
          {children && (
            <div className="mt-9" data-enter="up" style={delay(260)}>
              {children}
            </div>
          )}
        </div>
        {aside && (
          <div className="mx-auto w-full max-w-[420px] flex-[1_1_320px]" data-enter="scale" style={delay(200)}>
            {aside}
          </div>
        )}
      </div>
    </header>
  );
}
