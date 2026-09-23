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

const SITE_LINKS = [
  { label: 'Diagnostic', href: '/diagnostic' },
  { label: 'Implementation', href: '/implementation' },
  { label: 'Evidence', href: '/evidence' },
  { label: 'Firm', href: '/firm' },
];

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
            <Link href="/terms" className="t-small text-fg-2 hover:text-fg">
              Terms
            </Link>
            <Link href="/privacy" className="t-small text-fg-2 hover:text-fg">
              Privacy
            </Link>
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
