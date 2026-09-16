'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Wordmark } from './Wordmark';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import type { SurfaceName } from '@/components/ui/Surface';

/**
 * Header — §3.1, §2.
 *
 * Four links, one button. The button is the only coloured element in the
 * header, and it inverts by surface (§3.5).
 *
 * SURFACE SWITCHING: the header adopts the surface of the section beneath it,
 * switching at the boundary. Text and border colour cross-fade over 160ms; the
 * background switch is instant, because a fading background would read as the
 * gradient blend §3.1 explicitly forbids between sections.
 *
 * The section under the header is found by hit-testing the header's own bottom
 * edge against every [data-surface] block, rather than by observing
 * intersections. Intersection ratios answer "how much of this is visible",
 * which is the wrong question: the question is "what is directly behind this
 * 64px strip", and only a point test answers that correctly when a short
 * section passes beneath.
 */

const NAV = [
  { label: 'Diagnostic', href: '/diagnostic' },
  { label: 'Implementation', href: '/implementation' },
  { label: 'Evidence', href: '/evidence' },
  { label: 'Method', href: '/method' },
  { label: 'Firm', href: '/firm' },
];

export const HEADER_H = 64;

export function Header() {
  const [surface, setSurface] = useState<SurfaceName>('void');
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting UI state on route change
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      const line = HEADER_H - 1;
      let found: SurfaceName | null = null;

      for (const el of document.querySelectorAll<HTMLElement>('[data-surface]')) {
        if (el.closest('header') || el.id === 'menu') continue;
        const r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) {
          found = (el.dataset.surface as SurfaceName) ?? null;
        }
      }
      if (found) setSurface(found);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header
        data-surface={surface}
        style={{ height: HEADER_H }}
        className="fixed inset-x-0 top-0 z-50 border-b border-line transition-[color,border-color] duration-[160ms]"
      >
        <div className="shell flex h-full items-center justify-between gap-8">
          <Link href="/" aria-label="Hexona Systems, home">
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    't-label relative py-1 transition-colors duration-[160ms]',
                    active ? 'text-fg' : 'text-fg-2 hover:text-fg',
                  )}
                >
                  {item.label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-0 h-px w-full bg-brand"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Button href="/diagnostic" className="px-5 py-2.5 text-[13px]">
              Commission a diagnostic
            </Button>
          </div>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((v) => !v)}
            className="t-label -mr-2 px-2 py-2 md:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <div
        id="menu"
        data-surface="void"
        hidden={!open}
        className="fixed inset-0 z-40 md:hidden"
        style={{ paddingTop: HEADER_H }}
      >
        <div className="shell flex h-full flex-col justify-between py-10">
          <nav aria-label="Primary" className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="t-display-2 border-b border-line py-5 text-fg"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button href="/diagnostic" className="w-full">
            Commission a diagnostic
          </Button>
        </div>
      </div>
    </>
  );
}
