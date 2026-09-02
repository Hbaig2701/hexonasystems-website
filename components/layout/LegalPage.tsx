import type { ReactNode } from 'react';
import { PageFrame } from './PageFrame';

/**
 * §7.7 — the legal layout.
 *
 * "Both use a stripped layout: standard header and footer, single text column
 *  at 68ch, --text-body, generous leading, no animation beyond the standard
 *  entrance, NO LATTICE. Last-updated date in mono at the top."
 *
 * The banner is not decorative. §7.7 is explicit: "Do not ship AI-drafted
 * privacy copy on a page that makes binding representations about data
 * handling — have it reviewed." What follows the banner is a drafting brief for
 * counsel, structured to cover everything §7.7 enumerates. It is not advice and
 * it must not go live in this state.
 */
export function LegalPage({
  title,
  updated,
  reviewed,
  children,
}: {
  title: string;
  updated: string;
  /** Flip to true only once counsel has reviewed and approved the copy. */
  reviewed: boolean;
  children: ReactNode;
}) {
  return (
    <PageFrame footerCta={false}>
      <div className="page-shell pb-28 pt-24 md:pt-32">
        <div className="max-w-[68ch]">
          <p className="type-micro mb-6 text-quaternary">Last updated · {updated}</p>
          <h1 className="type-display-2 mb-12">{title}</h1>

          {!reviewed && (
            <div className="mb-14 rounded-md border border-dashed border-hairline-bright bg-surface p-6">
              <p className="type-label mb-3 text-leak">
                Draft. Not reviewed by counsel. Do not publish.
              </p>
              <p className="type-body text-secondary">
                §7.7 and §11 require this page to carry counsel-reviewed copy before launch. The
                audit collects business data and Hexona is Canadian, so this document makes binding
                representations under CASL and PIPEDA. What follows is a structured drafting brief
                covering everything the specification enumerates. A starting point for a lawyer,
                not a substitute for one.
              </p>
            </div>
          )}

          <div className="legal-body flex flex-col gap-8 text-secondary">{children}</div>
        </div>
      </div>
    </PageFrame>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="type-label mb-4 text-primary">{heading}</h2>
      <div className="flex flex-col gap-4 leading-[1.75]">{children}</div>
    </section>
  );
}
