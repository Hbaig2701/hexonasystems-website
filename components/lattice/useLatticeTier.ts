'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { REDUCED_MOTION_QUERY } from '@/lib/motion';

/**
 * The fallback ladder — spec §5.2. Mandatory, three rungs:
 *
 *   1. 'webgl'  — WebGL2 context obtainable AND the capability check passes
 *   2. 'svg'    — animated, same choreography, ~40 cells instead of ~180
 *   3. 'static' — prefers-reduced-motion: the ASSEMBLED lattice, no motion
 *
 * Plus the runtime guard: tier selection is made once and the renderer does not
 * flip on transient jank, but a device that cannot sustain the simulation is
 * allowed exactly ONE downgrade per session, gated hard.
 */

export type LatticeTier = 'webgl' | 'svg' | 'static' | 'pending';

const WARMUP_FRAMES = 90; // shader compile, texture upload — ignore entirely
const WINDOW_FRAMES = 120; // rolling median window
const DOWNGRADE_MS = 40; // 25fps — comfortably below the 33.3ms (30fps) floor,
//                          so a device legitimately holding 30fps is never
//                          downgraded (§5.2, §5.6).

function hasWebGL2(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!canvas.getContext('webgl2');
  } catch {
    return false;
  }
}

function isLowPower(): boolean {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return (
    (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 4) ||
    // deviceMemory is Chromium-only — undefined in Safari and Firefox.
    // Treat "unknown" as capable; the runtime guard is the real safety net.
    (nav.deviceMemory !== undefined && nav.deviceMemory < 4)
  );
}

export function useLatticeTier() {
  // 'pending' until the client has run the capability check. The server never
  // guesses a tier — it renders nothing and the page is complete without it.
  const [tier, setTier] = useState<LatticeTier>('pending');
  const downgraded = useRef(false);

  // The capability check needs a real WebGL context and real navigator hints,
  // neither of which exists on the server. Running once, after mount, is the
  // whole design (§5.2) — the server renders no lattice at all and the page is
  // complete without it.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- capability probe on mount */
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      setTier('static');
      return;
    }
    setTier(hasWebGL2() && !isLowPower() ? 'webgl' : 'svg');
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  /* --- Runtime guard --------------------------------------------------- */
  const frames = useRef<number[]>([]);
  const count = useRef(0);

  const sampleFrame = useCallback((deltaMs: number) => {
    if (downgraded.current) return;

    count.current += 1;
    if (count.current <= WARMUP_FRAMES) return;

    const buf = frames.current;
    buf.push(deltaMs);
    if (buf.length < WINDOW_FRAMES) return;
    if (buf.length > WINDOW_FRAMES) buf.shift();

    const sorted = [...buf].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];

    if (median > DOWNGRADE_MS) {
      // One-way. Never upgrade back. Never downgrade twice.
      downgraded.current = true;
      setTier('svg');
    }
  }, []);

  return { tier, sampleFrame };
}
