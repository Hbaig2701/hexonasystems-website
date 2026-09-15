import Image from 'next/image';
import { TRUSTED_BY } from '@/content/firm';

/**
 * The trusted-by band. Sits directly under the hero, on the hero's own ground,
 * so it reads as the last line of the opening rather than as a section of its
 * own. It carries NO section number for the same reason: numbering it would
 * push Standing to 02 and the engagement record to 03, and this is a band, not
 * an argument.
 *
 * HOW THE LOOP WORKS. The track holds the list twice and translates exactly
 * -50%, which lands the second copy precisely where the first began. That is
 * the whole trick, and it is why the duplicate must be an exact copy: change
 * one list and the seam appears. The duplicate is aria-hidden, so a screen
 * reader hears seven names once, and the list stays a real <ul> so it is read
 * as a list rather than as a run-on line.
 *
 * NO EDGE FADE. The usual marquee masks its ends with a gradient, but §3.2
 * rules out gradients and the whole design is hard edges. The band is full
 * bleed, so names clip at the viewport edge, which is where text is expected
 * to leave anyway.
 *
 * Hover pauses it. A visitor who wants to read a name should not have to chase
 * it, and that is also the accessible escape hatch for WCAG 2.2's pause
 * requirement on moving content, alongside the reduced-motion rule.
 */
export function TrustedBy() {
  return (
    <section data-surface="void" className="border-t border-line py-12" aria-label="Trusted by">
      <p className="t-label shell mb-8 text-fg-3">
        Trusted by teams at
      </p>

      <div className="marquee">
        <div className="marquee-track">
          <List />
          <List duplicate />
        </div>
      </div>
    </section>
  );
}

function List({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      className="marquee-list"
      /* The second copy exists only to close the loop. */
      aria-hidden={duplicate || undefined}
    >
      {TRUSTED_BY.map((org) => (
        <li key={org.name} className="flex shrink-0 items-center">
          {org.logo ? (
            <Image
              src={org.logo}
              alt={org.name}
              width={132}
              height={28}
              className="h-7 w-auto opacity-70"
            />
          ) : (
            /* Type, until the logos land. Set at the same weight a logo would
               carry so the band does not visibly change rhythm when they do. */
            <span className="whitespace-nowrap text-[19px] font-medium tracking-[-0.01em] text-fg-2">
              {org.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
