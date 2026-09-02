'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { REDUCED_MOTION_QUERY } from './motion';

/**
 * Browser-state hooks.
 *
 * Anything that reads a browser-only capability uses `useSyncExternalStore`
 * rather than `useState` + `useEffect`. It gives an explicit server snapshot
 * (so hydration cannot mismatch), it subscribes properly to the underlying
 * source, and it avoids the cascading render that setting state in an effect
 * body causes.
 */

/** True once the client has hydrated. False on the server, always. */
const noopSubscribe = () => () => {};
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/**
 * Standard scroll entrance — §6.3.
 * IntersectionObserver, rootMargin '0px 0px -18% 0px', once.
 *
 * Sets `data-entered="true"` on the DOM node directly; the transition itself
 * lives in globals.css so the no-JS baseline (§14) stays correct — without JS
 * the element is already at its final state and this hook simply never runs.
 * Touching the attribute rather than React state also keeps entrance animations
 * off the render path entirely.
 */
export function useEnter<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If the browser cannot observe, reveal immediately rather than trap content.
    if (typeof IntersectionObserver === 'undefined') {
      el.setAttribute('data-entered', 'true');
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute('data-entered', 'true');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -18% 0px', threshold: 0 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}

/** Fires once when the element crosses `threshold` visibility. */
export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.55) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      // No observer: reveal on the next tick rather than during the effect body,
      // so this degenerate path cannot cascade a render.
      const t = setTimeout(() => setInView(true), 0);
      return () => clearTimeout(t);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

/* --- Media query ---------------------------------------------------------- */

function subscribeToQuery(query: string) {
  return (onChange: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  };
}

const subscribeToReducedMotion = subscribeToQuery(REDUCED_MOTION_QUERY);
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;

/** Live reduced-motion preference. Re-renders if the user changes it mid-session. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    () => false, // the server cannot know; entrances are CSS-gated regardless
  );
}

/* --- Scroll --------------------------------------------------------------- */

/** Shared scroll subscription — one listener, however many hooks read from it. */
function subscribeToScroll(onChange: () => void) {
  let frame = 0;
  const handler = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      onChange();
    });
  };
  window.addEventListener('scroll', handler, { passive: true });
  window.addEventListener('resize', handler, { passive: true });
  return () => {
    if (frame) cancelAnimationFrame(frame);
    window.removeEventListener('scroll', handler);
    window.removeEventListener('resize', handler);
  };
}

/**
 * Normalized scroll depth of the document, 0 → 1.
 *
 * Note this is NOT what drives the lattice — that reads a mutable ref inside
 * its own render loop and never re-renders React (§6.4, Moment 2). This exists
 * for the header CTA promotion, which genuinely is a React state change.
 */
export function useScrollDepth(): number {
  return useSyncExternalStore(
    subscribeToScroll,
    () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // Quantised to 5% steps so a continuous scroll produces at most 20
      // re-renders instead of one per frame.
      return max > 0 ? Math.round(Math.min(1, window.scrollY / max) * 20) / 20 : 0;
    },
    () => 0,
  );
}

/** True once the user has scrolled past `px`. Used for the header hairline. */
export function useScrolledPast(px: number): boolean {
  const getSnapshot = useCallback(() => window.scrollY > px, [px]);
  return useSyncExternalStore(subscribeToScroll, getSnapshot, () => false);
}
