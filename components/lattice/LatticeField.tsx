'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { LatticeSVG } from './LatticeSVG';
import { useLatticeTier, type LatticeTier } from './useLatticeTier';
import { PointerDriver, ScrollDriver } from './ScrollDriver';

/**
 * LatticeField — the orchestrator for §5.
 *
 * Picks a tier from the capability check, mounts it, and owns the runtime
 * downgrade guard. three.js is dynamically imported so it never blocks first
 * paint: the lattice mounts after first paint and fades in (§6.4 Moment 1,
 * §10.3).
 *
 * FORCING A TIER (Phase 2 acceptance — "all three fallback tiers verified by
 * forcing each"): append ?lattice=webgl | svg | static | off to any URL.
 */

const LatticeCanvas = dynamic(
  () => import('./LatticeCanvas').then((m) => m.LatticeCanvas),
  { ssr: false },
);

function forcedTier(): LatticeTier | 'off' | null {
  if (typeof window === 'undefined') return null;
  const value = new URLSearchParams(window.location.search).get('lattice');
  if (value === 'webgl' || value === 'svg' || value === 'static' || value === 'off') return value;
  return null;
}

export function LatticeField({ narrativeId }: { narrativeId: string }) {
  const { tier, sampleFrame } = useLatticeTier();
  const [override, setOverride] = useState<LatticeTier | 'off' | null>(null);
  const [visible, setVisible] = useState(false);

  // The ?lattice= override lives in the URL, which only exists client-side.
  // eslint-disable-next-line react-hooks/set-state-in-effect -- reading location on mount
  useEffect(() => setOverride(forcedTier()), []);

  // MOMENT 1: the canvas fades in 0 → 1 over 0.9s once it has mounted.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const active = override ?? tier;

  return (
    <>
      <ScrollDriver triggerId={narrativeId} />
      <PointerDriver />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {active === 'webgl' && (
          <LatticeCanvas observeId={narrativeId} onFrameSample={sampleFrame} />
        )}
        {active === 'svg' && <LatticeSVG mode="animated" />}
        {active === 'static' && <LatticeSVG mode="static" />}
        {/* 'pending' and 'off' render nothing. The page is complete without it. */}
      </div>
    </>
  );
}
