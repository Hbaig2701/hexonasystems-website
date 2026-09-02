/**
 * Numerals — the resolved figure treatment, and the reason for it.
 *
 * DECIDED: display figures use Geist with true tabular lining figures.
 * Mono is retained only for small uppercase technical labels (.type-label,
 * .type-micro), which is where it earns its keep.
 *
 * The mono example below is kept deliberately, as an anti-pattern. §4.3
 * originally specified Geist Mono for big numbers, and anyone reading the spec
 * will be tempted to "restore" it. Look at the space either side of the comma
 * before doing that: in a monospace, the comma and the dollar sign are small
 * glyphs centred inside a FULL-WIDTH advance, so "$415,800" renders with a
 * visible crater around the separator. It is inherent to monospacing and no
 * other monospace face fixes it.
 *
 * Both treatments use tabular lining figures, so digits share an advance and
 * columns align either way. The difference is entirely in the separators.
 */

const FIGURES = ['$415,800', '$80,000', '1,500+', '11.55', '$20,000,000+'];

const OPTIONS = [
  {
    id: 'geist',
    name: 'Geist · the figure face',
    note: 'Same family as the headings, so headline and figure read as one system. tabular-nums + lining-nums keeps every digit on an identical advance.',
    className: 'type-figure',
    tone: 'text-accent',
  },
  {
    id: 'mono',
    name: 'Geist Mono · do not restore this',
    note: 'The spec’s original treatment. Look at the space either side of the comma. That is the monospace advance, not a rendering artefact.',
    className: 'type-figure-mono',
    tone: 'text-leak',
  },
];

export function Numerals() {
  return (
    <div>
      <p className="type-body mb-10 max-w-[68ch] text-secondary">
        Figures use <code className="text-accent">--font-figure</code>, a single token in
        globals.css. Nothing in the codebase references a numeric face directly, so changing it is
        one line, but read the note on the second example first.
      </p>

      <div className="flex flex-col gap-12">
        {OPTIONS.map((option) => (
          <div key={option.id}>
            <div className="mb-5 flex flex-wrap items-baseline gap-3 border-b border-hairline pb-3">
              <span className="type-label text-primary">{option.name}</span>
              <span className="type-micro max-w-[62ch] text-quaternary">{option.note}</span>
            </div>

            {/* Display size — where the separator problem is most visible. */}
            <p
              className={`${option.className} ${option.tone} mb-7`}
              style={{ fontSize: 'clamp(2.6rem, 6vw, 4.4rem)' }}
            >
              $415,800
            </p>

            {/* Data size — a right-aligned column, as in the audit breakdown. */}
            <div className="max-w-[420px] rounded-md border border-hairline bg-surface p-5">
              {FIGURES.map((figure) => (
                <div
                  key={figure}
                  className="flex items-baseline justify-between gap-6 border-b border-hairline py-2 last:border-b-0"
                >
                  <span className="text-[13px] text-tertiary">Example</span>
                  <span className={`${option.className} text-[15px] text-primary`}>{figure}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
