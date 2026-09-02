import Image from 'next/image';
import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { TEAM } from '@/content/team';

/**
 * THE ARCHITECTS BEHIND THE ENGINE — the team grid from the reference design.
 *
 * This is §7.4 item 4 finally answerable: "The current site promises
 * 'Experienced Leadership' and delivers only the founder. Either populate this
 * properly or remove the heading."
 *
 * Portraits are monochrome, as in the reference. That is not only a look — six
 * photographs shot in six different rooms under six different lights will never
 * agree in colour, and desaturating them is what makes a grid read as a
 * masthead instead of a staff directory.
 *
 * ⚠️ No portrait may be stock or AI-generated (§15, §11 item 8). Until a real
 * photograph exists, each card shows a plainly-labelled placeholder — the one
 * thing worse than an empty frame is a convincing fake of a real colleague.
 */
export function Team() {
  return (
    <section className="section-pad">
      <div className="page-shell">
        <SectionHeading
          eyebrow="Our team"
          index="09"
          sub="We bring together technology and strategy to build automation that holds up in production."
          className="mb-16"
        >
          The Architects Behind the Engine
        </SectionHeading>

        <div className="mx-auto grid max-w-[1040px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} index={i}>
              <figure className="group h-full overflow-hidden rounded-md border border-hairline bg-surface transition-colors duration-[320ms] hover:border-hairline-bright">
                <div className="relative aspect-[4/5] overflow-hidden bg-surface-inset">
                  {member.portrait ? (
                    <Image
                      src={member.portrait}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
                      className="object-cover grayscale transition-[transform,filter] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={`Placeholder: portrait of ${member.name}, asset pending`}
                      className="flex h-full w-full flex-col items-center justify-center gap-3 border-b border-dashed border-hairline-bright p-5 text-center"
                    >
                      <span className="type-label text-leak">Asset pending</span>
                      <span className="type-micro max-w-[24ch] text-quaternary">
                        Real photograph required. Never stock, never generated.
                      </span>
                    </div>
                  )}
                </div>

                <figcaption className="p-5">
                  <p className="text-[17px] font-medium tracking-[-0.015em] text-primary">
                    {member.name}
                  </p>
                  <p className="type-micro mt-1.5 text-quaternary">{member.role}</p>
                  {member.bio && <p className="text-small mt-3 text-secondary">{member.bio}</p>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
