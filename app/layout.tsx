import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Newsreader } from 'next/font/google';
import './globals.css';
import { Header, HEADER_H } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Entrances } from '@/components/layout/Entrances';
import { LatticeDefs } from '@/components/ui/Lattice';
import { SITE } from '@/lib/site';
import { FIRM } from '@/content/firm';
import { JsonLd, organizationLd, principalLd, webSiteLd } from '@/lib/jsonld';

/**
 * §3.3 — the institutional research-note stack: serif display, grotesque body,
 * mono figures. All three free.
 *
 * Newsreader is loaded at 400 only. §3.3 is explicit that display type is serif
 * at weight 400 and NEVER bold, so shipping a bold cut would only make it
 * possible to violate the rule by accident.
 */

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Hexona Systems: operational diligence and revenue recovery',
    template: '%s · Hexona Systems',
  },
  description:
    'We find demand a company already paid for and is failing to convert, price it in EBITDA, and seal it. Fixed-scope diagnostic for operating companies at $3M to $15M.',
  openGraph: { type: 'website', siteName: FIRM.name, locale: 'en_CA', url: SITE.url },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0B0D0C',
  colorScheme: 'dark light',
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
      className={`${newsreader.variable} ${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
      </head>
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

        {/* The lattice geometry, once per document. Every <Lattice/> on the
            page is a <use> pointing at this; without it they draw nothing. */}
        <LatticeDefs />

        <a
          href="#main"
          data-surface="paper"
          className="sr-only z-[100] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:px-4 focus:py-2 focus:text-[14px]"
        >
          Skip to content
        </a>

        <Header />

        <main id="main" style={{ paddingTop: HEADER_H }}>
          {children}
        </main>

        <Footer />
        <Entrances />
      </body>
    </html>
  );
}
