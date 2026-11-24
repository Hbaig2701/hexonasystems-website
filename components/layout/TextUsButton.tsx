import Script from 'next/script';

/**
 * NOT RENDERED (Nov 24, 2026): removed from app/layout.tsx until the SnapMe
 * button is live. To restore, render <TextUsButton /> before <Analytics />.
 *
 * SnapMe "Text us" button, pinned bottom-right on every page.
 *
 * SnapMe's loader (embed.js) turns the placeholder div into a 90px-tall iframe
 * sized to the div's width; when a visitor opens it, the loader expands the
 * frame to full screen itself (popover top layer), so this wrapper only has
 * to place the closed button. The loader sets no cookies; it forwards the
 * page's utm/gclid/fbclid params to SnapMe for attribution.
 */
export function TextUsButton() {
  return (
    <>
      <div
        className="fixed bottom-3 right-3 z-[60] w-[232px] max-w-[calc(100vw-24px)] sm:bottom-5 sm:right-5"
        aria-label="Text us"
      >
        <div data-snapme-button="untitled-3vso9x5" data-height="90" />
      </div>
      <Script src="https://app.snapme.link/embed.js" strategy="afterInteractive" />
    </>
  );
}
