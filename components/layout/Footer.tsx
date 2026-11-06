import Link from 'next/link';
import { Wordmark } from '@/components/hx/Logo';
import { FIRM } from '@/content/firm';

/**
 * The closing block and footer, on every page: one call to action, repeated
 * the same way everywhere, then the links.
 *
 * ⚠️ Every `href: '…'` literal here is checked by `npm run check:seo`.
 */
const EXPLORE = [
  { label: 'AI Employees', href: '/ai-employees' },
  { label: 'Industries', href: '/industries' },
  { label: 'Case Studies', href: '/evidence' },
  { label: 'Articles', href: '/insights' },
  { label: 'About', href: '/firm' },
  { label: 'Value Score', href: '/score' },
];

const LEGAL = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

export function Footer() {
  return (
    <footer className="hx" style={{ background: 'var(--hx-teal-deep)', color: '#FFFFFF' }}>
      <div className="hx-wrap grid gap-10 py-24 md:grid-cols-[1.4fr_1fr] md:items-end md:py-28">
        <div data-enter="up">
          <h2 className="hx-h2 m-0" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05 }}>
            Find out what&rsquo;s holding your value{' '}
            <em className="italic" style={{ color: 'var(--hx-cyan-light)' }}>
              back.
            </em>
          </h2>
          <p className="mt-6 max-w-[38rem] text-[18px] leading-relaxed" style={{ color: 'var(--hx-on-teal)' }}>
            A free one-hour consult. We&rsquo;ll look at your numbers and tell you which AI employee
            would move them first. Straight answers, no sales script.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end" data-enter="up" style={{ ['--enter-delay' as string]: '120ms' }}>
          <Link href="/book" className="hx-btn hx-btn-cyan">
            Book a free consult <span className="hx-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: '#1A5361' }}>
        <div className="hx-wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Wordmark tone="light" />
            <p className="m-0 max-w-[34ch] text-[15px]" style={{ color: 'var(--hx-on-teal)' }}>
              {FIRM.positioning}
            </p>
            <address className="flex flex-col gap-1 text-[14px] not-italic" style={{ color: '#A9CDD2' }}>
              <span>{FIRM.address}</span>
              <span>Serving the United States and Canada</span>
              {FIRM.phone && (
                <a href={`tel:${FIRM.phone.replace(/\s/g, '')}`} style={{ color: '#FFFFFF' }}>
                  {FIRM.phone}
                </a>
              )}
              <a href={`mailto:${FIRM.email}`} style={{ color: '#FFFFFF' }}>
                {FIRM.email}
              </a>
            </address>
          </div>

          <nav aria-label="Footer">
            <p className="hx-kicker m-0 mb-4" style={{ color: 'var(--hx-cyan-light)' }}>
              Explore
            </p>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[15px] no-underline hover:underline" style={{ color: 'var(--hx-on-teal)' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="hx-kicker m-0 mb-4" style={{ color: 'var(--hx-cyan-light)' }}>
              Company
            </p>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              <li>
                <Link href="/book" className="text-[15px] no-underline hover:underline" style={{ color: 'var(--hx-on-teal)' }}>
                  Book a free consult
                </Link>
              </li>
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[15px] no-underline hover:underline" style={{ color: 'var(--hx-on-teal)' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: '#1A5361' }}>
        <div className="hx-wrap py-6 text-[13px]" style={{ color: '#A9CDD2' }}>
          © Hexona Systems {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
