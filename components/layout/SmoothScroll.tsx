'use client';

import { useEffect } from 'react';
import { REDUCED_MOTION_QUERY } from '@/lib/motion';

/**
 * Lenis — spec §10.1.
 * Makes scroll-scrubbed animation feel intentional rather than jittery.
 * MUST respect reduced-motion: with `prefers-reduced-motion: reduce` we never
 * initialise it at all, and the browser's native scroll takes over (§6.5).
 *
 * Loaded in the critical path per §10.3: Lenis must initialise before the first
 * scroll event or there is a visible hitch.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let cancelled = false;

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      const instance = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // Never hijack touch scrolling — it makes mobile feel broken.
        syncTouch: false,
      });
      lenis = instance;

      // Expose for GSAP ScrollTrigger to read from (§6.4, Moment 2).
      (window as unknown as { __lenis?: unknown }).__lenis = instance;

      const loop = (time: number) => {
        instance.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      lenis?.destroy();
      delete (window as unknown as { __lenis?: unknown }).__lenis;
    };
  }, []);

  return null;
}
