import type { LegalDoc } from '@/content/legal';

/**
 * /terms and /privacy share this layout: one calm reading column. A legal page
 * is read, not sold, so there is no lattice and no motion here.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <div className="hx">
      <div className="hx-wrap py-16 lg:py-24">
        <div className="mx-auto max-w-[46rem]">
          <p className="hx-eyebrow m-0 mb-6">Last updated · {doc.updated}</p>
          <h1 className="hx-h1 m-0" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}>
            {doc.title}
          </h1>
          <p className="hx-lead m-0 mt-6">{doc.intro}</p>

          <div className="mt-14 flex flex-col gap-12">
            {doc.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="hx-h3 m-0 mb-4">{s.heading}</h2>
                {s.body.map((para, i) => (
                  <p key={i} className="m-0 mb-4 text-[17px] leading-[1.75] last:mb-0" style={{ color: 'var(--hx-ink-2)' }}>
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
