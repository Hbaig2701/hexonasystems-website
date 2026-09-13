import { Surface } from '@/components/ui/Surface';
import { SectionMarker } from '@/components/layout/SectionMarker';
import { RecordTable } from '@/components/ui/RecordTable';
import { CREDENTIALS, ENGAGEMENT_TERMS } from '@/content/firm';

/**
 * SECTION 2 — CREDENTIALS. §4. PAPER.
 *
 * No headline. No prose. Two ruled tables, separated by a rule, because
 * credentials and terms of engagement are different things and must not be
 * mixed.
 *
 * ⚠️ Two credentials is the honest count and two is enough (§1.3, §4). Padding
 * this to five rows with facts about the offer is the same inflation in a
 * different costume. No syndicated press logos: Yahoo Finance, Digital Journal
 * and Digital Media Net are press-release distribution and a PE operating
 * partner recognises the format on sight. McGill is a fact about the principal
 * and belongs on /firm.
 *
 * Rows draw in on a 60ms stagger.
 */
export function Credentials() {
  return (
    <Surface surface="paper">
      <div className="shell">
        <SectionMarker index="01" label="Standing" className="mb-14" />

        <div className="col-12">
          <div className="[grid-column:1/10]">
            <RecordTable
              caption="Credentials"
              columns={[
                { key: 'year', label: 'Year' },
                { key: 'title', label: 'Credential' },
                { key: 'detail', label: 'Detail' },
              ]}
              rows={CREDENTIALS.map((c, i) => ({
                id: c.title,
                cells: {
                  year: c.year,
                  title: c.href ? (
                    <a href={c.href} className="link" rel="noopener noreferrer">
                      {c.title}
                    </a>
                  ) : (
                    c.title
                  ),
                  detail: c.detail,
                },
                delay: i * 60,
              }))}
            />

            <div className="mt-16">
              <RecordTable
                caption="How we work"
                columns={[
                  { key: 'term', label: 'How we work' },
                  { key: 'value', label: '' },
                ]}
                rows={ENGAGEMENT_TERMS.map((t) => ({
                  id: t.term,
                  cells: { term: t.term, value: t.value },
                }))}
              />
            </div>
          </div>
        </div>
      </div>
    </Surface>
  );
}
