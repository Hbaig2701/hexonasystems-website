import Link from 'next/link';
import { Wordmark } from './Wordmark';
import { FIRM } from '@/content/firm';

/**
 * Footer — §3.5. Always VOID, whatever surface precedes it.
 *
 * Three columns desktop, stacked mobile. §10 removes what normally accumulates
 * down here: no newsletter field, no social icons, no "back to top", no chat
 * widget. An email address is the contact mechanism.
 */

/** Matches the primary nav. `/method` removed — the route does not exist and
 *  this link 404'd on every page. See the note in Header.tsx. */
const SITE_LINKS = [
  { label: 'Diagnostic', href: '/diagnostic' },
  { label: 'Implementation', href: '/implementation' },
  { label: 'Evidence', href: '/evidence' },
  { label: 'Insights', href: '/insights' },
  { label: 'Firm', href: '/firm' },
];

/**
 * ⚠️ /terms AND /privacy DO NOT EXIST. v1 had both pages; v2 deleted them and
 * kept the footer links, so both 404'd on every page of the site.
 *
 * They are gated rather than deleted, because unlike /method these two SHOULD
 * exist — a firm taking systems access and holding client data is expected to
 * publish them, and a buyer's legal function will look. Writing them is not a
 * developer's call, so the links stay dark until the pages land: set the flag
 * and add the routes together.
 *
 * Until then the footer says nothing about it to a visitor, which is the correct
 * failure mode. A missing Privacy link invites a question; a Privacy link that
 * 404s answers it badly.
 */
const LEGAL_LIVE = false;

/**
 * §3.5: if the Institute stays under this brand at all, ONE unstyled text line
 * pointing off-domain. §1.2 moves it to a separate property because "largest
 * community on Skool" reads creator, not firm. Set the URL to surface it.
 */
const INSTITUTE_URL = '';

export function Footer() {
  return (
    <footer data-surface="void" className="border-t border-line">
      <div className="shell py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="flex flex-col gap-5">
            <Wordmark className="text-brand" />
            <p className="t-small max-w-[34ch] text-fg-2">{FIRM.positioning}</p>
            <address className="t-small flex flex-col gap-1 not-italic text-fg-3">
              {/* The principal was named only in the old Standing section. A
                  firm selling diligence does not get to be anonymous, so the
                  name moved here rather than off the site. */}
              <span className="text-fg-2">{FIRM.principal}</span>
              <span>{FIRM.address}</span>
              {FIRM.phone && (
                <a href={`tel:${FIRM.phone.replace(/\s/g, '')}`} className="link">
                  {FIRM.phone}
                </a>
              )}
              <a href={`mailto:${FIRM.email}`} className="link">
                {FIRM.email}
              </a>
            </address>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-3">
              {SITE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="t-small text-fg-2 hover:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            {LEGAL_LIVE && (
              <>
                <Link href="/terms" className="t-small text-fg-2 hover:text-fg">
                  Terms
                </Link>
                <Link href="/privacy" className="t-small text-fg-2 hover:text-fg">
                  Privacy
                </Link>
              </>
            )}
            {INSTITUTE_URL && (
              <a
                href={INSTITUTE_URL}
                className="t-small mt-4 text-fg-3 hover:text-fg-2"
                rel="noopener noreferrer"
              >
                Automation Institute →
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell py-5">
          <p className="t-label text-fg-3">
            © Hexona Systems {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
