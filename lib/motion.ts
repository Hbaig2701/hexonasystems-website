/**
 * lib/motion.ts — motion tokens, spec §6.2.
 * Nothing bounces. No spring overshoot, no elastic easing.
 */

export const ease = {
  out: [0.16, 1, 0.3, 1] as const, // entrances — the workhorse
  inOut: [0.65, 0, 0.35, 1] as const, // scroll scrubs, state changes
  sharp: [0.4, 0, 0.2, 1] as const, // micro-interactions
  linear: [0, 0, 1, 1] as const, // continuous loops only
};

export const dur = {
  micro: 0.15, // hover, focus, toggle
  fast: 0.24, // button states
  standard: 0.4, // element entrance
  slow: 0.7, // section entrance
  deliberate: 1.4, // hero orchestration
};

export const stagger = { tight: 0.04, standard: 0.06, loose: 0.1 };

/** CSS equivalents, for components that animate in stylesheets rather than JS. */
export const cssEase = {
  out: 'cubic-bezier(0.16, 1, 0.30, 1)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

/** Single source of truth for the reduced-motion query. */
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
