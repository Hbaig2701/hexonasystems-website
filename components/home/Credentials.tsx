import { Surface } from '@/components/ui/Surface';
import { SectionMarker } from '@/components/layout/SectionMarker';
import { CREDENTIALS, ENGAGEMENT_TERMS, TRACK_RECORD, hasTrackRecord } from '@/content/firm';

/**
 * SECTION 2 — STANDING. §4. PAPER.
 *
 * No headline. No prose. Credentials, then a rule, then terms of engagement,
 * because §4 is right that those are different things and must not be mixed.
 *
 * DEVIATION FROM §4: the credentials are not a ruled table.
 *
 * A table implies a set, and a set of two reads as two orphaned rows. §1.3 is
 * emphatic that two is the honest count and that one real credential beats four
 * that invite scrutiny — but a table row is not how you present something you
 * want believed. The Platinum award is the single strongest verifiable asset on
 * this site and it was being rendered at the same weight as a cell.
 *
 * So each credential gets scale: year in mono accent, award at display-2, the
 * substantiation beneath it, and a rule between. Same information, same honest
 * count, presented like a firm that means it. The engagement terms stay a
 * compact ruled list, which is what they are.
 *
 * Rows enter on a 60ms stagger, per §4.
 */
export function Credentials() {
  return (
    <Surface surface="paper">
      <div className="shell">
        <SectionMarker index="01" label="Standing" className="mb-16" />

        <div className="col-12">
          <div className="[grid-column:1/10]">
            {/* --- Operating track record --------------------------------
                §5-style gate: renders only with real entries, never seeded to
                fill the space. It leads because for this reader it outranks
                any award. See TRACK_RECORD in content/firm.ts. */}
            {hasTrackRecord() && (
              <ul className="mb-20 border-t border-line">
                {TRACK_RECORD.map((e, i) => (
                  <li
                    key={`${e.company}-${e.period}`}
                    data-enter=""
                    style={{ ['--enter-delay' as string]: `${i * 60}ms` }}
                    className="border-b border-line py-10"
                  >
                    <div className="flex flex-col gap-x-12 gap-y-4 md:flex-row md:items-baseline">
                      <p className="t-label shrink-0 text-brand md:w-20">{e.period}</p>
                      <div>
                        <h2 className="t-display-2 mb-3">{e.company}</h2>
                        <p className="t-label mb-4 text-fg-3">{e.role}</p>
                        <p className="t-body text-fg-2">{e.outcome}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* --- Credentials ------------------------------------------- */}
            <ul className="border-t border-line">
              {CREDENTIALS.map((c, i) => (
                <li
                  key={c.title}
                  data-enter=""
                  style={{ ['--enter-delay' as string]: `${i * 60}ms` }}
                  className="border-b border-line py-10"
                >
                  <div className="flex flex-col gap-x-12 gap-y-4 md:flex-row md:items-baseline">
                    <p className="t-label shrink-0 text-brand md:w-20">{c.year}</p>

                    <div>
                      <h2 className="t-display-2 mb-3">{c.title}</h2>
                      <p className="t-body text-fg-2">{c.detail}</p>

                      {c.href ? (
                        <a
                          href={c.href}
                          className="link t-label mt-5 inline-block"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Verify
                          <span aria-hidden="true" className="ml-1.5 text-brand">
                            →
                          </span>
                        </a>
                      ) : (
                        /* §1.3 wants credentials third-party and VERIFIABLE, so
                           an unlinked one needs flagging. But this notice was
                           SHIPPING TO VISITORS in the loss colour, which meant
                           the standing section announced twice that nothing on
                           it could be checked. On a page whose whole argument
                           is that claims are verifiable, that is worse than the
                           missing link it was reporting.
                           It is now a development-only nag. Supply the URL in
                           content/firm.ts and it disappears for good. */
                        process.env.NODE_ENV !== 'production' && (
                          <p className="t-label mt-5 text-loss">
                            Dev only · verification link missing
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* --- Terms of engagement. Different thing, separated. ------- */}
            <dl className="mt-20 border-t border-line">
              {ENGAGEMENT_TERMS.map((t) => (
                <div
                  key={t.term}
                  className="flex flex-col gap-x-12 gap-y-1 border-b border-line py-5 md:flex-row"
                >
                  <dt className="t-label shrink-0 text-fg-3 md:w-44">{t.term}</dt>
                  <dd className="t-body text-fg">{t.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Surface>
  );
}
