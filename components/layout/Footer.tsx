import Link from 'next/link';
import { Logo } from './Logo';
import { Button } from '@/components/ui/Button';
import { COMPANY } from '@/content/claims';

/**
 * Footer — spec §3.2.
 * Four columns on desktop, stacked on mobile, sitting on --surface with a
 * hairline top border. Above that border, a 120px band containing the final
 * CTA (§7.1 S12) — suppressed on the homepage, where S12 already is that CTA.
 *
 * PHASE 7 GATE: the "Insights" link is only added when /insights ships.
 * Nothing in Phases 1–6 may link a route that does not exist (§14, Phase 7).
 */

const INSIGHTS_LIVE = false;

const SYSTEM_LINKS = [
  { label: 'The Engine', href: '/system' },
  { label: 'Embedded AI', href: '/system#embedded-ai' },
  { label: 'Integrated Stack', href: '/system#integrated-stack' },
  { label: 'Bespoke Development', href: '/system#bespoke-development' },
  { label: 'Consulting', href: '/system#consulting' },
];

const PROOF_LINKS = [
  { label: 'Case Studies', href: '/work' },
  { label: 'The Record', href: '/about#the-record' },
  { label: 'Press', href: '/about#the-record' },
  ...(INSIGHTS_LIVE ? [{ label: 'Insights', href: '/insights' }] : []),
];

/**
 * ⚠️ [ASSET NEEDED] Social profile URLs. Left empty deliberately — a footer
 * icon linking to "#" is worse than no icon.
 */
const SOCIAL: { label: string; href: string }[] = [];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="type-label mb-5 text-quaternary">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-small text-secondary transition-colors duration-[240ms] hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({ showCta = true }: { showCta?: boolean }) {
  return (
    <footer className="relative z-10">
      {showCta && (
        <div className="page-shell pb-20">
          <div className="glow-block rounded-md border border-hairline bg-surface px-7 py-16 text-center md:px-14">
            <p className="type-display-3 mx-auto mb-8 max-w-[22ch] text-primary">
              Take Your First Step to Liberation
            </p>
            <Button href="/book" variant="primary" size="large" arrow>
              Book a systems review
            </Button>
          </div>
        </div>
      )}

      <div className="glow-footer border-t border-hairline bg-surface">
        <div className="page-shell py-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-5">
              <Logo />
              <p className="text-small max-w-[30ch] text-secondary">
                Bespoke AI implementation for operations already past $10M.
              </p>
              <address className="type-micro flex flex-col gap-1.5 not-italic text-quaternary">
                <span>{COMPANY.address}</span>
                {COMPANY.phone && (
                  <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="hover:text-primary">
                    {COMPANY.phone}
                  </a>
                )}
                <a href={`mailto:${COMPANY.email}`} className="hover:text-primary">
                  {COMPANY.email}
                </a>
              </address>
            </div>

            <FooterColumn title="System" links={SYSTEM_LINKS} />
            <FooterColumn title="Proof" links={PROOF_LINKS} />
          </div>
        </div>

        <div className="border-t border-hairline">
          <div className="page-shell flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="type-micro text-quaternary">
              © {COMPANY.name} 2026
              <span aria-hidden="true" className="px-2 text-decorative">
                ·
              </span>
              <Link href="/privacy" className="hover:text-primary">
                Privacy
              </Link>
              <span aria-hidden="true" className="px-2 text-decorative">
                ·
              </span>
              <Link href="/terms" className="hover:text-primary">
                Terms
              </Link>
            </p>

            {SOCIAL.length > 0 && (
              <ul className="flex items-center gap-5">
                {SOCIAL.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className="type-micro text-quaternary hover:text-primary"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
