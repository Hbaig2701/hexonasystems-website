'use client';

import { AuditFlow } from './AuditFlow';
import { Button } from '@/components/ui/Button';
import { useHydrated } from '@/lib/hooks';
import type { AuditSession } from '@/lib/audit/state';

/**
 * AuditSection — the JS gate for the audit tool.
 *
 * §14 (Phase 4), no-JS baseline: "the lattice canvas and the audit tool simply
 * do not render, and the audit section falls back to a static block with the
 * §7.1 S3 copy and a link to /book."
 *
 * A client component still server-renders its markup, so mounting the tool
 * behind a `mounted` flag is what actually delivers that: without JS the
 * fallback is what ships and it is complete on its own; with JS the tool
 * replaces it after hydration.
 *
 * The wrapper carries a min-height so the swap does not move the page
 * (CLS < 0.05, §10.3).
 */
export function AuditSection({ initial }: { initial?: AuditSession }) {
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <div className="min-h-[520px] rounded-md border border-hairline bg-surface p-8 md:p-12">
        <p className="type-label mb-5 text-accent">The Revenue Leak Audit</p>
        <h3 className="type-display-3 mb-6 max-w-[22ch]">
          Four questions. Under a minute. Your number, not someone else&apos;s.
        </h3>
        <p className="type-body mb-8 max-w-[60ch] text-secondary">
          The audit runs in your browser and needs JavaScript. If you&apos;d rather skip it, book a
          systems review and we&apos;ll map your gaps live: the same arithmetic, on a call, in
          thirty minutes.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button href="/book" variant="primary" arrow>
            Book a systems review
          </Button>
          <Button href="/work/childcare-response-time" variant="secondary" arrow>
            See what sealing it did for one operator
          </Button>
        </div>
      </div>
    );
  }

  return <AuditFlow initial={initial} className="min-h-[520px]" />;
}
