'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { useScrollDepth, useScrolledPast } from '@/lib/hooks';

/**
 * Header — spec §3.2.
 *
 * Desktop: fixed, 72px, backdrop-blur(24px) over rgba(8,9,11,0.72), with a 1px
 * bottom hairline that fades in only after 40px of scroll.
 *
 * `Book a review` is rendered at 85% opacity / scale 0.96 below 40% scroll
 * depth and animates to full presence past it — the primary CTA gets louder as
 * intent grows.
 *
 * Mobile: full-screen panel that wipes up in 420ms over the background grid
 * field — NOT the lattice. The lattice is reserved for the three placements in
 * §5.5. Nav items stagger in at 50ms. Both CTAs pinned to the bottom of the
 * panel where thumbs are.
 */

const NAV = [
  { label: 'System', href: '/system' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
];

export function Header() {
  const scrolled = useScrolledPast(40);
  const depth = useScrollDepth();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const promoted = depth > 0.4;

  // Close the mobile panel on navigation.
  // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting UI state on route change
  useEffect(() => setOpen(false), [pathname]);

  // Lock scroll while the panel is open.
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
        className={cn(
          'fixed inset-x-0 top-0 z-50 h-[72px]',
          'border-b transition-colors duration-[400ms]',
          scrolled ? 'border-hairline' : 'border-transparent',
        )}
        style={{
          backgroundColor: 'var(--header-scrim)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        <div className="page-shell flex h-full items-center justify-between gap-8">
          <Link href="/" aria-label="Hexona Systems, home" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'group relative py-2 font-mono text-[12px] uppercase tracking-[0.08em]',
                    'transition-colors duration-[240ms]',
                    active ? 'text-primary' : 'text-secondary hover:text-primary',
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent',
                      'transition-transform duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <Button href="/audit" variant="secondary" className="px-5 py-3 text-[13px]">
              Model your upside
            </Button>
            <Button
              href="/book"
              variant="primary"
              className={cn(
                'px-5 py-3 text-[13px] transition-[opacity,transform] duration-[400ms]',
                promoted ? 'scale-100 opacity-100' : 'scale-[0.96] opacity-85',
              )}
            >
              Book a review
            </Button>
          </div>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span className="relative block h-3.5 w-6">
              <span
                className={cn(
                  'absolute left-0 block h-px w-full bg-primary transition-all duration-[240ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
                  open ? 'top-1.5 rotate-45' : 'top-0',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 block h-px w-full bg-primary transition-all duration-[240ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
                  open ? 'top-1.5 -rotate-45' : 'top-3',
                )}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile panel — wipes up over the grid field, 420ms. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className={cn(
          'fixed inset-0 z-40 lg:hidden',
          'transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
          open ? 'translate-y-0' : 'translate-y-full',
        )}
        style={{ backgroundColor: 'var(--base)' }}
      >
        <div className="grid-field" aria-hidden="true" />
        <div className="page-shell relative z-10 flex h-full flex-col justify-between pb-10 pt-[104px]">
          <nav aria-label="Primary" className="flex flex-col">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-hairline py-5 text-[28px] font-medium tracking-[-0.02em] text-primary transition-[opacity,transform] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transitionDelay: open ? `${120 + i * 50}ms` : '0ms',
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateY(0)' : 'translateY(12px)',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <Button href="/audit" variant="secondary" className="w-full">
              Model your upside
            </Button>
            <Button href="/book" variant="primary" className="w-full" arrow>
              Book a systems review
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
