'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Entrances — §3.4's standard entrance, wired once for the whole document.
 *
 * Any element anywhere can opt in by adding `data-enter`, and an optional
 * `--enter-delay` for the 50ms stagger. This component finds them all and sets
 * `data-entered` as each crosses 15% visibility; the transition itself lives in
 * globals.css.
 *
 * One observer for the document rather than a <Reveal> wrapper per block, so
 * every section stays a server component and the entrance costs no client
 * bundle beyond this file.
 *
 * The no-JS contract runs the other way round: `[data-enter]` alone is the
 * FINAL state, and only `.js [data-enter]` is hidden. So if this never runs,
 * or fails, the page is fully visible rather than fully blank.
 */
export function Entrances() {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-enter]'));
    if (nodes.length === 0) return;

    // No observer, or the reader asked for no motion: reveal everything now.
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      for (const el of nodes) el.setAttribute('data-entered', 'true');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-entered', 'true');
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );

    for (const el of nodes) {
      // Anything already on screen at mount reveals immediately, so the first
      // viewport never waits on a scroll that may not come.
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.setAttribute('data-entered', 'true');
      } else {
        io.observe(el);
      }
    }

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
