import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { VALUES } from '@/content/positioning';

/**
 * OBJECTIVE DOMINANCE — the 2×2 values grid from the reference design.
 *
 * Layout, icons and corner glow are the reference's. The copy is not: three of
 * the four reference cards read in the register §13 rules out by name
 * ("Your success is our priority"), so these carry the tenets from §7.4 —
 * which say something a competitor could not also say — in the same shape.
 *
 * The glow is `data-glow="on"` rather than hover-only: on a values grid the
 * bloom is the point, not a reward for pointing at it. Cards alternate which
 * corner it blooms from so a 2×2 does not read as four identical tiles.
 */
export function Values({ index = '04' }: { index?: string } = {}) {
  return (
    <section className="band section-pad">
      <div className="page-shell">
        <SectionHeading
          eyebrow="Our values"
          index={index}
          sub="What we optimise for, stated plainly enough that you can hold us to it."
          className="mb-16"
        >
          Objective Dominance
        </SectionHeading>

        <div className="mx-auto grid max-w-[980px] gap-5 md:grid-cols-2">
          {VALUES.map((value, i) => (
            <Reveal key={value.title} index={i}>
              <div
                data-glow="on"
                style={{ ['--glow-x' as string]: i % 2 === 0 ? '0%' : '100%' }}
                className="glow-card h-full rounded-md border border-hairline bg-surface p-7 transition-colors duration-[320ms] hover:border-hairline-bright"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-hairline-bright bg-surface-raised text-accent">
                    <Icon name={value.icon} />
                  </span>
                  <h3 className="text-[18px] font-medium tracking-[-0.02em] text-primary">
                    {value.title}
                  </h3>
                </div>
                <p className="text-small max-w-[46ch] text-secondary">{value.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
