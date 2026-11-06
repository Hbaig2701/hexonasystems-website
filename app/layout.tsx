import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
import { GoogleTagManager } from '@next/third-parties/google';
import './globals.css';
import { Header, HEADER_H } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Entrances } from '@/components/layout/Entrances';
import { SITE } from '@/lib/site';
import { ENTITY_SENTENCE, FIRM } from '@/content/firm';
import { JsonLd, organizationLd, principalLd, webSiteLd } from '@/lib/jsonld';

/**
 * Fonts are self-hosted from app/fonts (OFL-licensed, from Fontsource), not
 * downloaded from Google Fonts at build time. That download failed
 * intermittently and could fail a production deploy.
 *
 * Newsreader: display serif, 400 and 500, normal and italic (the highlighted
 * phrases are italic). Inter: one variable file covers every body weight.
 */
const newsreader = localFont({
  variable: '--font-newsreader',
  display: 'swap',
  src: [
    { path: './fonts/newsreader-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/newsreader-latin-400-italic.woff2', weight: '400', style: 'italic' },
    { path: './fonts/newsreader-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/newsreader-latin-500-italic.woff2', weight: '500', style: 'italic' },
  ],
});

const inter = localFont({
  variable: '--font-inter',
  display: 'swap',
  src: './fonts/inter-latin-wght-normal.woff2',
  weight: '100 900',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Hexona Systems: AI that increases enterprise value',
    template: '%s · Hexona Systems',
  },
  description: ENTITY_SENTENCE,
  openGraph: { type: 'website', siteName: FIRM.name, locale: 'en_US', url: SITE.url },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  colorScheme: 'light',
};

/**
 * §8 Phase 3 acceptance: readable and persuasive with JS disabled. Entrances
 * are armed by `.js`, so the no-JS default is opacity 1 with no transform.
 * suppressHydrationWarning is required and scoped to this element only, because
 * this script mutates the class before React hydrates.
 */
const JS_FLAG = `document.documentElement.classList.add('js');`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
      </head>
      {/* Google Tag Manager container (GA4 and any tags configured in GTM). Loads after hydration. */}
      <GoogleTagManager gtmId="GTM-KZ9XN392" />
      <body className="min-h-svh">
        {/* AI SEO Developer Guide, Ticket 2 — the entity graph, once per
            document rather than per page.

            These three are site-wide facts, so emitting them here means every
            page carries the entity and every `@id` reference made by a Service,
            FAQPage, Article or BlogPosting block resolves on the page it appears
            on. Put them per-page instead and a crawler that fetches one post in
            isolation sees an author reference pointing at nothing. */}
        <JsonLd data={organizationLd()} />
        <JsonLd data={webSiteLd()} />
        <JsonLd data={principalLd()} />

        <a
          href="#main"
          className="hx sr-only z-[100] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:px-4 focus:py-2 focus:text-[14px]"
        >
          Skip to content
        </a>

        <Header />

        <main id="main" style={{ paddingTop: HEADER_H }}>
          {children}
        </main>

        <Footer />
        <Entrances />
        <Analytics />
      </body>
    </html>
  );
}
