import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { BUILDERS_TRAINED } from '@/content/claims';

/**
 * SECTION 10 — FOR BUILDERS. §7.1 S10.
 *
 * A single full-width band, visually distinct — --surface with a hairline top
 * and bottom — but DELIBERATELY COMPACT. It must not compete with the primary
 * narrative. The builder is the secondary audience (§2.2): they get a strong
 * dedicated page and a single tasteful entry point, never hero real estate.
 */
export function Builders() {
  return (
    <section className="border-y border-hairline bg-surface py-20">
      <div className="page-shell">
        <SectionHeading
          eyebrow="For builders"
          index="10"
          size="display-3"
          className="mb-12"
        >
          Not here to buy a system? Learn to build them.
        </SectionHeading>

        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <Reveal index={1}>
              <p className="type-body max-w-[58ch] text-secondary">
                The Automation Institute has trained more than {BUILDERS_TRAINED.value} builders to
                design, sell and deploy automation for local businesses, on the same engine Hexona
                runs on. Agencies license it. Individuals learn it.
              </p>
            </Reveal>
          </div>

          <Reveal index={2} className="shrink-0">
            <Button href="/incubator" variant="secondary" arrow>
              Explore the Institute
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
