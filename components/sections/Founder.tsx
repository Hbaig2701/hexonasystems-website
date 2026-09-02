import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { AssetPlaceholder } from '@/components/ui/AssetPlaceholder';

/**
 * SECTION 9 — THE FOUNDER. §7.1 S9.
 *
 * A deliberate TONAL BREAK: the one section on the site that inverts to a light
 * surface. After eight sections of dark instrumentation, an editorial light
 * section lands like a held breath. It is also, practically, the section people
 * remember.
 *
 * Every cyan element here uses --light-accent (#B33C00), not --accent — the
 * standard cyan only reaches 2.6:1 on this ground and fails badly (§10.4).
 */
export function Founder() {
  return (
    <section className="bg-light-base py-28 md:py-40">
      <div className="page-shell">
        <SectionHeading
          eyebrow="The founder"
          index="09"
          tone="light"
          sub="Not a technologist who found business. An operator who learned to build."
          className="mb-20"
        >
          How Hexona Came to Be
        </SectionHeading>

        <div className="grid-12 gap-y-12">
          <div className="[grid-column:1/6]">
            <Reveal>
              {/* ⚠️ [ASSET NEEDED · §7.1 S9, §11 item 2] High-quality founder
                  portrait: environmental, shot in a real workspace. NOT a
                  white-background headshot, NOT AI-generated, and never a stock
                  photo standing in (§15). */}
              <AssetPlaceholder
                tone="light"
                label="Founder portrait"
                detail="Environmental, high resolution, real workspace, professionally shot. Not a white-background headshot. Not AI-generated."
                className="aspect-[4/5]"
              />
            </Reveal>
          </div>

          <div className="[grid-column:7/13]">
            <Reveal index={1}>
              <p className="type-display-3 mb-1 text-light-primary">Hamza Baig</p>
              <p className="type-label mb-12 text-light-tertiary">Founder, Hexona Systems</p>
            </Reveal>

            <div className="flex flex-col gap-6 text-[1.15rem] leading-[1.65] text-light-secondary">
              <Reveal index={2}>
                <p className="max-w-[58ch]">
                  In 2022 he was laid off by email. The lesson he took from it wasn&apos;t about that
                  job. It was that a system he didn&apos;t control could remove him from it in a
                  single sentence. So he started building systems.
                </p>
              </Reveal>
              <Reveal index={3}>
                <p className="max-w-[58ch]">
                  He was early to ChatGPT, publishing real business applications while most people
                  were still asking it to write poems. The audience that came from that became one of
                  the largest AI automation communities in the world. Hexona came from the same
                  instinct: he&apos;d spent years watching capable companies lose money not to
                  competitors, but to their own seams.
                </p>
              </Reveal>
              <Reveal index={4}>
                <p className="max-w-[58ch]">
                  He is not a technologist who found business. He&apos;s an operator who learned to
                  build.
                </p>
              </Reveal>
            </div>

            <Reveal index={5}>
              <blockquote className="my-12 border-l-2 border-light-accent pl-7">
                <p className="type-display-3 max-w-[26ch] text-light-primary">
                  &ldquo;These aren&apos;t vanity metrics. They&apos;re signals. Automation
                  isn&apos;t optional anymore. It&apos;s survival.&rdquo;
                </p>
              </blockquote>
            </Reveal>

            <Reveal index={6}>
              <a
                href="/about"
                className="type-label inline-flex items-center gap-2 text-light-accent transition-opacity hover:opacity-70"
              >
                Read the full story <span aria-hidden="true">→</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
