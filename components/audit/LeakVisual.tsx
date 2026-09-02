'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/lib/hooks';
import type { AuditSession } from '@/lib/audit/state';

/**
 * MOMENT 4 — THE LEAK VISUALIZATION. Spec §6.4, §5.5 placement 2.
 *
 * "As the visitor completes each input, the lattice panel beside the form
 *  updates in real time:
 *    · lead volume     → density of packets entering the system rises
 *    · % answered fast → number of open gaps in the lattice drops
 *    · deal value      → packet size increases, and the falling packets leave a
 *                        longer, brighter --signal-leak trail
 *
 *  The visitor watches their own money fall out of a machine. That's the
 *  emotional beat the entire site is built to deliver."
 *
 * This is the second and last permitted canvas on the homepage (§5.2). It is
 * mounted only while the audit is in view and torn down on exit.
 *
 * Deliberately Canvas 2D rather than WebGL: it is a contained panel of ~30
 * cells, it costs nothing to run, and — critically — it must work on exactly
 * the devices where the WebGL tier was rejected. The audit is the conversion
 * centerpiece; it does not get to be the thing that fails on a mid-tier
 * Android.
 */

const ACCENT = '#22D3EE'; // --accent
const LEAK = '#FF5C5C'; //   --signal-leak

interface Packet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  falling: boolean;
  age: number;
  trail: number[];
}

interface Cell {
  cx: number;
  cy: number;
  /** Leaky cells have an open bottom edge and drop what passes through them. */
  leaky: boolean;
  rank: number;
}

export function LeakVisual({
  session,
  /** 0–4: how many questions the visitor has answered. Drives the reveal. */
  answered,
  className,
}: {
  session: AuditSession;
  answered: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const sessionRef = useRef(session);
  const answeredRef = useRef(answered);

  // The render loop reads the visitor's latest answers from refs rather than
  // from props, so a slider drag never restarts the simulation. Syncing them in
  // an effect (not during render) keeps the loop's view of the world stable
  // within a frame.
  useEffect(() => {
    sessionRef.current = session;
    answeredRef.current = answered;
  }, [session, answered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cells: Cell[] = [];
    let radius = 26;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // §5.6
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cells = buildCells(width, height);
    };

    const buildCells = (w: number, h: number): Cell[] => {
      radius = Math.max(20, Math.min(34, w / 9));
      const stepX = radius * 1.5;
      const stepY = radius * Math.sqrt(3);
      const out: Cell[] = [];
      let rank = 0;
      for (let col = 0; col * stepX < w + stepX; col++) {
        for (let row = 0; row * stepY < h + stepY; row++) {
          const cx = col * stepX + radius;
          const cy = row * stepY + ((col % 2) * stepY) / 2 + radius;
          if (cy > h + radius) continue;
          out.push({ cx, cy, leaky: false, rank: rank++ });
        }
      }
      // Stable pseudo-random ordering so "which cells are leaky" changes
      // smoothly as the visitor drags the slider, instead of reshuffling.
      out.sort((a, b) => ((a.rank * 2654435761) % 1000) - ((b.rank * 2654435761) % 1000));
      out.forEach((c, i) => (c.rank = i));
      return out;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const packets: Packet[] = [];
    let spawnAccumulator = 0;
    let last = performance.now();
    let raf = 0;
    let running = true;

    const drawHex = (cx: number, cy: number, r: number, skipBottom: boolean) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        // The "gap" is the lower-right edge — packets fall out of it.
        if (skipBottom && i === 4) {
          const a = (Math.PI / 3) * 5;
          ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
          continue;
        }
        const a1 = (Math.PI / 3) * i;
        const a2 = (Math.PI / 3) * (i + 1);
        ctx.moveTo(cx + Math.cos(a1) * r, cy + Math.sin(a1) * r);
        ctx.lineTo(cx + Math.cos(a2) * r, cy + Math.sin(a2) * r);
      }
      ctx.stroke();
    };

    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const s = sessionRef.current;
      const step = answeredRef.current;

      // --- Inputs → simulation parameters ---------------------------------
      // Q1 lead volume → packet density entering the system.
      const spawnRate = step >= 1 ? Math.min(18, 3 + s.monthlyLeads / 40) : 6;
      // Q2 fast response → how many gaps stay open.
      const leakShare = step >= 2 ? 1 - s.fastResponsePct / 100 : 0.85;
      // Q4 deal value → packet size and trail length.
      const packetSize =
        step >= 4 ? 1.8 + Math.min(3.4, Math.log10(Math.max(s.customerValue, 100)) - 1.6) : 2;
      const trailLen = step >= 4 ? Math.round(4 + Math.min(10, s.customerValue / 4000)) : 4;

      const leakyCount = Math.round(cells.length * leakShare);
      for (const c of cells) c.leaky = c.rank < leakyCount;

      // --- Spawn ------------------------------------------------------------
      spawnAccumulator += spawnRate * dt;
      while (spawnAccumulator >= 1 && packets.length < 220) {
        spawnAccumulator -= 1;
        packets.push({
          x: Math.random() * width,
          y: -6,
          vx: (Math.random() - 0.5) * 12,
          vy: 46 + Math.random() * 26,
          falling: false,
          age: 0,
          trail: [],
        });
      }

      // --- Integrate --------------------------------------------------------
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.age += dt;

        if (!p.falling) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;

          // Entering a leaky cell drops the packet out of the system.
          for (const c of cells) {
            if (c.leaky && Math.hypot(p.x - c.cx, p.y - c.cy) < radius * 0.42) {
              p.falling = true;
              p.vy = 90;
              p.age = 0;
              break;
            }
          }
        } else {
          p.vy += 620 * dt;
          p.y += p.vy * dt;
          p.x += p.vx * dt * 0.3;
        }

        p.trail.unshift(p.x, p.y);
        if (p.trail.length > trailLen * 2) p.trail.length = trailLen * 2;

        if (p.y > height + 40) packets.splice(i, 1);
      }

      // --- Draw -------------------------------------------------------------
      // NOTE ON ALPHA. This panel previously drew everything between 0.16 and
      // 0.35 alpha over --surface-inset (#07080B) and rendered as a black
      // rectangle. On a near-black ground a stroke needs real opacity to exist
      // at all. Nothing here goes below 0.28.
      ctx.clearRect(0, 0, width, height);

      // A slow breathing pulse so a lattice with no packets in frame still
      // looks alive rather than broken.
      const pulse = 0.85 + 0.15 * Math.sin(now / 1400);

      // Sealed cells: the structure that is working.
      ctx.lineWidth = 1.15;
      ctx.strokeStyle = `rgba(47, 217, 160, ${(0.34 * pulse).toFixed(3)})`;
      for (const c of cells) if (!c.leaky) drawHex(c.cx, c.cy, radius, false);

      // Leaky cells: open edge, warmer, and washed so the gaps read as an area
      // and not just a missing line.
      ctx.fillStyle = 'rgba(255, 92, 92, 0.05)';
      for (const c of cells) {
        if (!c.leaky) continue;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI / 3) * i;
          const x = c.cx + Math.cos(a) * radius * 0.92;
          const y = c.cy + Math.sin(a) * radius * 0.92;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
      }

      ctx.lineWidth = 1.15;
      ctx.strokeStyle = `rgba(255, 92, 92, ${(0.52 * pulse).toFixed(3)})`;
      for (const c of cells) if (c.leaky) drawHex(c.cx, c.cy, radius, true);

      // Packets. Glow first, then the core, so they read as light rather than
      // as flat dots.
      for (const p of packets) {
        const color = p.falling ? LEAK : ACCENT;

        if (p.trail.length > 3) {
          ctx.strokeStyle = color;
          ctx.globalAlpha = p.falling ? 0.75 : 0.42;
          ctx.lineWidth = p.falling ? 2 : 1.4;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(p.trail[0], p.trail[1]);
          for (let t = 2; t < p.trail.length; t += 2) ctx.lineTo(p.trail[t], p.trail[t + 1]);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        ctx.shadowColor = color;
        ctx.shadowBlur = p.falling ? 14 : 10;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.falling ? packetSize * 1.2 : packetSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(frame);
    };

    // prefers-reduced-motion: draw one static frame of the assembled state and
    // never start the loop (§6.5).
    if (reduced) {
      const s = sessionRef.current;
      const leakShare = answeredRef.current >= 2 ? 1 - s.fastResponsePct / 100 : 0.5;
      const leakyCount = Math.round(cells.length * leakShare);
      cells.forEach((c) => (c.leaky = c.rank < leakyCount));
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1.15;
      ctx.fillStyle = 'rgba(255, 92, 92, 0.05)';
      for (const c of cells) {
        if (!c.leaky) continue;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI / 3) * i;
          const x = c.cx + Math.cos(a) * radius * 0.92;
          const y = c.cy + Math.sin(a) * radius * 0.92;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
      }
      for (const c of cells) {
        ctx.strokeStyle = c.leaky ? 'rgba(255,92,92,0.52)' : 'rgba(47,217,160,0.34)';
        drawHex(c.cx, c.cy, radius, c.leaky);
      }
    } else {
      raf = requestAnimationFrame(frame);
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running && !reduced) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduced]);

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        role="presentation"
        className="block h-full w-full"
      />
    </div>
  );
}
