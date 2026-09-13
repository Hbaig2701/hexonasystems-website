import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { Analytics } from '@/components/layout/Analytics';
import { CookieBar } from '@/components/layout/CookieBar';
import { SITE } from '@/lib/site';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Hexona Systems: bespoke AI implementation for $10M+ operations',
    template: '%s · Hexona Systems',
  },
  description:
    'Hexona designs and installs bespoke AI systems inside operations already past $10M. A high-value implementation we build, install and run, measured against the revenue it adds.',
  openGraph: {
    type: 'website',
    siteName: 'Hexona Systems',
    locale: 'en_CA',
    url: SITE.url,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#0A0C10',
  colorScheme: 'dark',
};

/**
 * NO-JS BASELINE (§14, Phase 4).
 * This inline script runs before first paint and marks the document as
 * JS-capable. Every entrance animation is armed by `.js-enabled`, so with
 * JavaScript disabled the default state is `opacity: 1` with no transform —
 * which is what crawlers and preview bots see.
 *
 * The direction matters: the default is VISIBLE and JS opts into hiding. A
 * <noscript> stylesheet would avoid touching the DOM, but it only applies when
 * JS is disabled outright — so a JS error, a blocked bundle or a partial
 * execution would leave every section stuck at opacity 0. This way a failure
 * anywhere downstream still renders a complete, readable page.
 */
const JS_ENABLED_SCRIPT = `document.documentElement.classList.add('js-enabled');`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning is required and is scoped to this element only.
    // The script above adds `js-enabled` to <html> before React hydrates, so the
    // live class attribute legitimately differs from the server-rendered one.
    // React does not patch mismatched attributes — the class survives either way
    // — but without this it logs a hydration warning on every page load, which
    // buries real warnings. Shallow by design: mismatches anywhere inside the
    // tree still surface normally.
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_ENABLED_SCRIPT }} />
      </head>
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only z-[100] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-[14px] focus:font-medium focus:text-[#0A0C10]"
        >
          Skip to content
        </a>

        {/* §4.5 — the background grid field, fixed so it parallaxes against content. */}
        <div className="grid-field" aria-hidden="true" />

        <SmoothScroll />
        <Header />

        {/* Every page wraps its content in <PageFrame>, which owns <main> and
            the footer. Pages decide whether the footer carries the CTA band —
            the homepage does not, because §7.1 S12 already is that CTA. */}
        {children}

        <CookieBar />
        <Analytics />
      </body>
    </html>
  );
}
