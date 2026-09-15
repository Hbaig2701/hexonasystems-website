import Image from 'next/image';
import { Surface } from '@/components/ui/Surface';
import { SectionMarker } from '@/components/layout/SectionMarker';
import { FigureBlock } from '@/components/ui/FigureBlock';
import { PRINCIPAL } from '@/content/firm';
import { cn } from '@/lib/cn';

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
          {/* Dossier layout: portrait in the narrow left column, the account
              beside it, figures beneath. The photo is deliberately modest in
              scale. It is here to put a face to a name at the moment the
              reader is deciding whether to trust one, not to be a hero image. */}
          <div className="[grid-column:1/4]">
            <Image
              src={PRINCIPAL.portrait.src}
              width={PRINCIPAL.portrait.width}
              height={PRINCIPAL.portrait.height}
              alt={PRINCIPAL.name}
              sizes="(max-width: 768px) 55vw, 24vw"
              className="w-full border border-line"
            />
          </div>

          <div className="[grid-column:4/13]">
            <h2 className="t-display-2 mb-3">{PRINCIPAL.name}</h2>
            <p className="t-label mb-10 text-brand">{PRINCIPAL.role}</p>

            {PRINCIPAL.bio.map((para, i) => (
              <p
                key={i}
                /* The first line is the claim, so it carries the lead size.
                   The rest is substantiation and sits at body. */
                className={cn(
                  'max-w-[64ch]',
                  i === 0 ? 't-lead mb-8 text-fg' : 't-body mb-6 text-fg-2 last:mb-0',
                )}
              >
                {para}
              </p>
            ))}
          </div>

          <div className="[grid-column:4/13] grid gap-6 sm:grid-cols-2">
            {PRINCIPAL.figures.map((f) => (
              <FigureBlock key={f.label} label={f.label} figure={f.figure} />
            ))}
          </div>
        </div>
      </div>
    </Surface>
  );
}
