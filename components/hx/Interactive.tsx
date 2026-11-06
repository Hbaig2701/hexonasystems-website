'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Tilt — the card leans towards the pointer and a soft light follows it across
 * the face (the ::after in .hx-card-tilt). Pointer devices only; touch and
 * reduced-motion users get a plain card.
 */
export function Tilt({
  href,
  max = 6,
  className,
  style,
  children,
}: {
  /** With an href the card is a link; without one it is a plain block. */
  href?: string;
  max?: number;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--ry', `${(x - 0.5) * max * 2}deg`);
        el.style.setProperty('--rx', `${(0.5 - y) * max * 2}deg`);
        el.style.setProperty('--mx', `${x * 100}%`);
        el.style.setProperty('--my', `${y * 100}%`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [max]);

  const cls = ['hx-card-tilt', className].filter(Boolean).join(' ');
  if (href) {
    return (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={cls} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={cls} style={style}>
      {children}
    </div>
  );
}

/**
 * PointerTilt — tilts a hero element in 3D against the pointer position over
 * the whole window, for the big logo.
 */
export function PointerTilt({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        el.style.setProperty('--ry', `${x * 18}deg`);
        el.style.setProperty('--rx', `${-y * 14}deg`);
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);
  return (
    <div ref={ref} className={['hx-mark-3d', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

/**
 * CountUp — every number inside the string counts up from zero when it scrolls
 * into view, keeping its formatting: "$50,000+", "18 → 3.5 hrs", "27% → 68%".
 * Server render and no-JS show the final text.
 */
export function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || typeof IntersectionObserver === 'undefined') return;
    const parts = value.split(/(\d[\d,]*(?:\.\d+)?)/);
    const nums = parts.map((p) => (/^\d/.test(p) ? p : null));
    if (!nums.some(Boolean)) return;

    const render = (k: number) =>
      parts
        .map((p, i) => {
          const n = nums[i];
          if (!n) return p;
          const target = Number(n.replace(/,/g, ''));
          const decimals = n.includes('.') ? n.split('.')[1].length : 0;
          const cur = target * k;
          const fixed = cur.toFixed(decimals);
          return n.includes(',') ? Number(fixed).toLocaleString('en-US', { minimumFractionDigits: decimals }) : fixed;
        })
        .join('');

    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started) return;
        started = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          setText(render(eased));
          if (p < 1) raf = requestAnimationFrame(tick);
          else setText(value);
        };
        raf = requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.6 },
    );
    // Start from zero only once we know the animation will run.
    if (el.getBoundingClientRect().top > window.innerHeight) setText(render(0));
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}
