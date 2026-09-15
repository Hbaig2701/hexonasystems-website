import { Surface } from '@/components/ui/Surface';
import { Lattice } from '@/components/ui/Lattice';
import { HexMark } from '@/components/ui/HexMark';
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
 * The terms strap that used to close this section is gone. Both of its claims
 * still appear in full: the ten business days and the credited fee are stated
 * in Diagnostic, and Close repeats them at the point of decision. §4's warning
 * still binds wherever they do appear, so the clock is defined as running FROM
 * SYSTEMS ACCESS, never "ten days from now".
 *
 * The min-height is short of a full screen on purpose. 100svh minus the header
 * pushed the trusted-by band entirely below the fold; 16rem is roughly the
 * header plus the band, so the band's last line lands at the bottom of the
 * first screen instead of being something you have to go looking for.
 */
export function Hero() {
  return (
    <Surface surface="void" rule={false} padded={false} as="header" className="hex-stage">
      {/* The mark, in the empty right columns. The outline variant, not the
          solid one: at this size the solid logo is a slab and fights a page
          made of hairlines. Same component either way, so there is exactly one
          definition of the logo in the codebase. Placement and motion are in
          .hex-mark. */}
      <Lattice />

      <HexMark variant="outline" className="hex-mark" />

      <div className="relative shell flex min-h-[calc(100svh-16rem)] flex-col justify-center py-20">
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

    </Surface>
  );
}
