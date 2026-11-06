'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Wordmark } from '@/components/hx/Logo';

/**
 * Site header. Transparent over the hero, frosted white once the page scrolls.
 *
 * ⚠️ Every href here must resolve to a real route: `npm run check:seo` reads
 * the `href: '…'` literals in this file and fails on a dead one.
 */
const NAV = [
  { label: 'AI Employees', href: '/ai-employees' },
  { label: 'Industries', href: '/industries' },
  { label: 'Case Studies', href: '/evidence' },
  { label: 'Articles', href: '/insights' },
  { label: 'About', href: '/firm' },
];

const CTA = { label: 'Book a free consult', href: '/book' };

export const HEADER_H = 76;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
        className="hx hx-header"
        data-scrolled={scrolled || open ? 'true' : 'false'}
        style={{ height: HEADER_H, background: scrolled || open ? undefined : 'transparent' }}
      >
        <div className="hx-wrap flex h-full items-center justify-between gap-6">
          <Link href="/" aria-label="Hexona Systems, home" className="no-underline">
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hx-nav hidden items-center gap-7 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Link href={CTA.href} className="hx-btn hx-btn-primary !min-h-[44px] !px-5 !py-3 text-[15px]">
              {CTA.label}
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
          >
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0E1E24" strokeWidth="1.8" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </header>

      <div
        id="menu"
        hidden={!open}
        className="hx fixed inset-0 z-40 lg:hidden"
        style={{ paddingTop: HEADER_H, background: '#FFFFFF' }}
      >
        <div className="hx-wrap flex h-full flex-col justify-between py-8">
          <nav aria-label="Primary" className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hx-serif border-b py-5 text-[28px] no-underline"
                style={{ borderColor: 'var(--hx-line)', color: 'var(--hx-ink)' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href={CTA.href} className="hx-btn hx-btn-primary w-full">
            {CTA.label}
          </Link>
        </div>
      </div>
    </>
  );
}
