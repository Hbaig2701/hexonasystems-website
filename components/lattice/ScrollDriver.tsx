'use client';

import { useEffect } from 'react';
import { latticeState } from '@/lib/lattice/state';
import { REDUCED_MOTION_QUERY } from '@/lib/motion';

/**
 * MOMENT 2 — the scroll-scrubbed assembly, spec §6.4.
 *
 * "The lattice assembly is scrubbed to scroll position, not time-based, across
 * the full height of the homepage narrative. Use one GSAP ScrollTrigger with
 * scrub: 1 writing to a single ref that the render loop reads."
 *
 * One ScrollTrigger. One ref. Zero React re-renders from scroll.
 * Disabled entirely under prefers-reduced-motion (§6.5) — the static tier
 * renders the assembled lattice and progress stays pinned at 1.
 */
export function ScrollDriver({ triggerId }: { triggerId: string }) {
  useEffect(() => {
    const reduced = window.matchMedia(REDUCED_MOTION_QUERY).matches;
    if (reduced) {
      latticeState.progress = 1;
      return;
    }

    const trigger = document.getElementById(triggerId);
    if (!trigger) return;

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      // Lenis drives scroll; ScrollTrigger has to be told when it moves or the
      // scrub lags a frame behind the smoothed position.
      const lenis = (window as unknown as { __lenis?: { on: (e: string, f: () => void) => void } })
        .__lenis;
      lenis?.on('scroll', ScrollTrigger.update);

      const tween = gsap.to(latticeState, {
        progress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1, // 1-second smoothing lag
          invalidateOnRefresh: true,
        },
      });

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [triggerId]);

  return null;
}

/**
 * Pointer field — §5.4. Writes to the same mutable channel.
 * Disabled entirely on touch: `(pointer: fine)` gates it.
 */
export function PointerDriver() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

    const onMove = (e: PointerEvent) => {
      latticeState.mouseX = e.clientX - window.innerWidth / 2;
      latticeState.mouseY = -(e.clientY - window.innerHeight / 2);
      latticeState.mouseActive = 1;
    };
    const onLeave = () => {
      latticeState.mouseActive = 0;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
    };
  }, []);

  return null;
}
