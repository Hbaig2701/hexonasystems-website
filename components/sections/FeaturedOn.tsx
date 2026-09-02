import { Reveal } from '@/components/ui/Reveal';
import { PRESS } from '@/content/claims';

/**
 * AS FEATURED ON — the press bar from the reference design.
 *
 * §15 names "'Trusted by' logo bar with no context" as a cargo-culted pattern,
 * and the fix is to LABEL THE RELATIONSHIP PRECISELY. So this says "As featured
 * on" and nothing more: these are publications that have covered Hexona, not
 * partners and not customers. Those are legally different claims (§11 item 5).
 *
 * Wordmarks in mono type at 55% opacity, restoring on hover — never colored
 * logo soup. Real logo files can drop in later without changing the layout.
 */
export function FeaturedOn() {
  return (
    <section className="border-y border-hairline py-14">
      <div className="page-shell">
        <Reveal>
          <p className="type-label mb-9 text-center text-quaternary">As featured on</p>
        </Reveal>

        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {PRESS.map((outlet, i) => (
            <Reveal key={outlet.name} index={i} as="li">
              <span className="type-label whitespace-nowrap text-tertiary opacity-55 transition-opacity duration-[240ms] hover:opacity-100">
                {outlet.name}
              </span>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="type-micro mt-8 text-center text-quaternary">
            ⚠️ Press coverage. Confirm each placement and supply logo files before launch (§11).
          </p>
        </Reveal>
      </div>
    </section>
  );
}
