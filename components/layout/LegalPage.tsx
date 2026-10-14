import { Surface } from '@/components/ui/Surface';
import type { LegalDoc } from '@/content/legal';

/**
 * /terms and /privacy share this layout. A single text column on PAPER, no
 * lattice, no section markers: a legal page is read, not sold, and anything
 * decorative here reads as the firm trying to make the small print look like
 * something else.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <Surface surface="paper" rule={false}>
      <div className="shell">
        <div className="max-w-[68ch]">
          <p className="t-label mb-6 text-fg-3">Last updated · {doc.updated}</p>
          <h1 className="t-display-1 mb-10">{doc.title}</h1>
          <p className="t-lead mb-14 text-fg-2">{doc.intro}</p>

          <div className="flex flex-col gap-12">
            {doc.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="t-display-2 mb-5">{s.heading}</h2>
                {s.body.map((para, i) => (
                  <p key={i} className="t-body mb-4 text-fg-2 last:mb-0">
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </Surface>
  );
}
