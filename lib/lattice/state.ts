/**
 * lib/lattice/state.ts — the single mutable channel between scroll/pointer and
 * the render loop.
 *
 * MOMENT 2, §6.4: "Never trigger React re-renders from scroll — the canvas
 * reads the ref directly in its useFrame." This module is that ref. Nothing
 * here is React state, on purpose.
 */

export const latticeState = {
  /** Normalized scroll progress of the homepage narrative, 0 → 1. */
  progress: 0,
  /** Pointer position in lattice space (px, origin at viewport centre). */
  mouseX: 0,
  mouseY: 0,
  /** 0 when the pointer has left the window or the device is touch-only. */
  mouseActive: 0,
  /** MOMENT 6 — set to 1 when the closing CTA enters the viewport. */
  converge: 0,
  /** Screen position of the CTA button that packets converge toward. */
  convergeX: 0,
  convergeY: 0,
};

export type LatticeState = typeof latticeState;

export function resetLatticeState() {
  latticeState.progress = 0;
  latticeState.mouseActive = 0;
  latticeState.converge = 0;
}
