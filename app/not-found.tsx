import Link from 'next/link';
import { LatticeCanvas } from '@/components/hx/LatticeCanvas';

/** Shown for any URL the site doesn't serve. Points people to the pages that matter. */
export default function NotFound() {
  const links = [
    { href: '/ai-employees', label: 'AI employees' },
    { href: '/industries', label: 'Industries' },
    { href: '/blog', label: 'Blog' },
    { href: '/score', label: 'Value Score' },
  ];
  return (
    <div className="hx">
      <section className="hx-hero">
        <LatticeCanvas className="hx-hero-canvas" />
        <div className="hx-wrap flex min-h-[70svh] flex-col justify-center py-20">
          <p className="hx-eyebrow m-0 mb-6 self-start">404</p>
          <h1 className="hx-h1 m-0 max-w-[16ch]" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)' }}>
            This page went to <span className="hx-mark">voicemail.</span>
          </h1>
          <p className="hx-lead m-0 mt-6 max-w-[36rem]">
            The link may be old or mistyped. Here is where most people are headed.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/" className="hx-btn hx-btn-primary">
              Back to the homepage
            </Link>
            <Link href="/book" className="hx-btn hx-btn-ghost">
              Book a free consult
            </Link>
          </div>
          <ul className="m-0 mt-10 flex list-none flex-wrap gap-3 p-0">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hx-pill">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
