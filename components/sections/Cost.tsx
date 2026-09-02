import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { AuditSection } from '@/components/audit/AuditSection';

/**
 * SECTION 3 — THE COST. §7.1 S3.
 *
 * This section embeds the LIVE AUDIT TOOL directly in the homepage (§8).
 * Not a link to it — the actual working tool. It is the highest-value real
 * estate on the site and it goes above the fold on the second screen.
 */
export function Cost() {
  return (
    <section id="audit" className="scroll-mt-24 pb-32 pt-8 md:pb-40">
      <div className="page-shell">
        <SectionHeading
          eyebrow="The cost"
          index="02"
          sub="Hours aren't a line on your P&L. We'd rather show you the revenue."
          className="mb-16"
        >
          Put a number on it.
        </SectionHeading>

        <div className="grid-12 mb-16">
          <div className="[grid-column:1/8]">
            <Reveal index={1}>
              <p className="type-body mb-6 max-w-[58ch] text-secondary">
                Most automation companies will tell you how many hours you&apos;ll save. Hours
                aren&apos;t a line on your P&amp;L. We&apos;d rather show you the revenue.
              </p>
            </Reveal>
            <Reveal index={2}>
              <p className="type-body max-w-[58ch] text-secondary">
                Answer four questions about how your business handles inbound. In under a minute,
                you&apos;ll see what the gap is costing you annually. And you don&apos;t have to
                give us anything to find out.
              </p>
            </Reveal>
          </div>
        </div>

        <AuditSection />
      </div>
    </section>
  );
}
