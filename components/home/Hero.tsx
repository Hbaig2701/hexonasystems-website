import { Surface } from '@/components/ui/Surface';
import { Button, TextLink } from '@/components/ui/Button';
import { DIAGNOSTIC } from '@/content/firm';

/**
 * SECTION 1 — HERO. §4. VOID.
 *
 * Columns 1–8, not centred. No image. Serif 400, three hard-broken lines.
 *
 * `What you receive →` points at /diagnostic, not /method: §4 is explicit that
 * the revenue page stays one click from the hero.
 *
 * The strap reads TEN BUSINESS DAYS and the clock is defined as running from
 * systems access everywhere it appears (§4 warning). Never "ten days from now".
 */
export function Hero() {
  return (
    <Surface surface="void" rule={false} padded={false} texture as="header">
      {/* The mark. One per page, behind the copy, at 14% so it reads as
          watermark rather than illustration. */}
      <svg
        className="hex-mark"
        viewBox="0 0 200 173.2"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M150 0 L200 86.6 L150 173.2 L50 173.2 L0 86.6 L50 0 Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M137.5 21.65 L175 86.6 L137.5 151.55 L62.5 151.55 L25 86.6 L62.5 21.65 Z"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M125 43.3 L150 86.6 L125 129.9 L75 129.9 L50 86.6 L75 43.3 Z"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.35"
        />
      </svg>

      <div className="relative shell flex min-h-[calc(100svh-64px)] flex-col justify-center py-24">
        <div className="col-12">
          <div className="[grid-column:1/9]">
            <p className="t-label mb-14 text-fg-3">
              {/* The firm's name takes the accent; the descriptors stay quiet.
                  The separators too, so the line reads as one instrument
                  marking rather than three coloured words. */}
              <span className="text-brand">Hexona Systems</span>
              <span className="px-1.5 text-brand opacity-50">·</span> Operational diligence
              &amp; revenue recovery
              <span className="px-1.5 text-brand opacity-50">·</span> Toronto
            </p>

            <h1 className="t-display-1 mb-12">
              The most expensive revenue
              <br className="hidden sm:inline" />
              is the revenue you already
              <br className="hidden sm:inline" />
              bought and never collected.
            </h1>

            <p className="t-lead mb-14 text-fg-2">
              We find demand a company already paid for and is failing to convert, price it in
              EBITDA, and seal it.
            </p>

            <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
              <Button href="/diagnostic">
                Commission a diagnostic <span aria-hidden="true">→</span>{' '}
                {DIAGNOSTIC.priceFormatted}
              </Button>
              <TextLink href="/diagnostic">What you receive</TextLink>
            </div>
          </div>
        </div>
      </div>

      <div className="shell">
        <p className="t-label border-t border-brand/30 py-6 text-fg-3">
          Ten business days <span className="px-1.5 text-brand opacity-50">·</span> Fixed scope
          <span className="px-1.5 text-brand opacity-50">·</span> Fee credited against
          implementation
        </p>
      </div>
    </Surface>
  );
}
