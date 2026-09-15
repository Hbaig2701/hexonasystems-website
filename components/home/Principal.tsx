import { Surface } from '@/components/ui/Surface';
import { SectionMarker } from '@/components/layout/SectionMarker';
import { FigureBlock } from '@/components/ui/FigureBlock';
import { PRINCIPAL } from '@/content/firm';

/**
 * SECTION 3 — THE PRINCIPAL. VOID.
 *
 * WHY IT SITS HERE, immediately before the price.
 *
 * By the end of section 02 the reader accepts that leakage is real and that a
 * recovered dollar beats an earned one. The next thing the page does is ask
 * for $5,000. "Who is asking" has to be answered before that number, not after
 * it: placed later, anyone who balks at the price never reaches it, and at this
 * price from an unknown firm people decide on the person before the offer.
 *
 * It is also the only first-person block on the site. Everything else speaks as
 * the firm, which is what makes the switch land rather than read as a lapse.
 * Do not rewrite this into "we".
 *
 * The copy is deliberately shorter than the founder's own version, and
 * content/firm.ts records which facts were left out and what each one would
 * have cost. Read that before adding any of them back.
 */
export function Principal() {
  return (
    <Surface surface="paper">

      <div className="shell">
        <SectionMarker index="03" label="The principal" className="mb-14" />

        <div className="col-12 gap-y-14">
          <div className="[grid-column:1/8]">
            <h2 className="t-display-2 mb-3">{PRINCIPAL.name}</h2>
            <p className="t-label mb-10 text-brand">{PRINCIPAL.role}</p>

            {PRINCIPAL.bio.map((para, i) => (
              <p
                key={i}
                /* The first line is the claim, so it carries the lead size.
                   The rest is substantiation and sits at body. */
                className={i === 0 ? 't-lead mb-8 text-fg' : 't-body mb-6 text-fg-2 last:mb-0'}
              >
                {para}
              </p>
            ))}
          </div>

          <div className="[grid-column:9/13] flex flex-col gap-6">
            {PRINCIPAL.figures.map((f) => (
              <FigureBlock key={f.label} label={f.label} figure={f.figure} />
            ))}
          </div>
        </div>
      </div>
    </Surface>
  );
}
