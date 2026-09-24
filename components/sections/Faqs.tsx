import { Surface, type SurfaceName } from '@/components/ui/Surface';
import { SectionMarker } from '@/components/layout/SectionMarker';
import type { Faq } from '@/content/faqs';

/**
 * FAQ block — AI SEO Developer Guide, Ticket 7.
 *
 * ⚠️ NOT AN ACCORDION, AND THAT IS THE POINT ON BOTH COUNTS.
 *
 * Ticket 7 warns against putting FAQ content behind a click, because a crawler
 * that never clicks never sees the answer. The usual compromise is a native
 * <details> element, which keeps the text in the HTML. This goes further and
 * drops the disclosure entirely, for two reasons:
 *
 *   1. It removes the failure mode instead of mitigating it. There is no click,
 *      no JavaScript and no client bundle, so there is nothing to get wrong
 *      later and nothing to verify on every deploy.
 *   2. It is the idiom this site already uses. BUILDS, DELIVERABLES,
 *      REQUIREMENTS and TERMS are all <dl> lists that state everything at once.
 *      §10 strips what accumulates on consumer sites, and a question you have to
 *      open before you can read it is exactly that.
 *
 * The question is a real <h3>, which Ticket 7 requires: a <summary> is a control,
 * not a heading, and without a real one the questions are invisible both to a
 * heading-outline pass and to the screen-reader users who navigate by one.
 *
 * The caller passes the SAME array to `faqPageLd()`, so the visible text and the
 * marked-up text are one object and cannot drift (Ticket 2c).
 *
 * ⚠️ ON THE SURFACE, BECAUSE §3.1 HAS A RULE AND THIS BENDS IT.
 *
 * Inserting one section into a strictly alternating run ALWAYS creates a
 * same-ground pair somewhere — that is arithmetic, not a choice. The only choice
 * is where the pair sits. app/page.tsx sets the principle: pairs get pushed to
 * the ends, "where they read as intent rather than error", and the close belongs
 * to the footer.
 *
 * So every FAQ block on the site is passed the SAME surface as the close that
 * follows it, which makes the tail of each page one continuous quiet block —
 * FAQ, close, footer — rather than putting a pair in the middle of the argument.
 * The 1px rule still marks each boundary, so the transitions stay legible and
 * nothing is blended.
 *
 * If a reviewer prefers the pair mid-page, change the `surface` prop at each
 * call site; nothing here depends on it.
 *
 * ⚠️ THE HEADING COLUMN IS STICKY, VIA `.faq-aside` IN globals.css. Two or
 * three lines of heading sit beside an answer column several times their
 * height, and a grid item stretches to its row, so without it the heading
 * pinned to the top of a dead full-height column and the section read as
 * broken. The rule is scoped above 900px because below that the grid collapses
 * to one column. Keep the length of these answer sets near the site norm of
 * roughly 400 characters; the layout tolerates a long set, it does not flatter
 * one.
 */
export function Faqs({
  items,
  index,
  label = 'Straight answers',
  heading,
  surface = 'paper',
  lede,
}: {
  items: Faq[];
  index: string;
  label?: string;
  heading: string;
  surface?: SurfaceName;
  lede?: string;
}) {
  if (items.length === 0) return null;

  return (
    <Surface surface={surface}>
      <div className="shell">
        <SectionMarker index={index} label={label} className="mb-14" />
        <div className="col-12 gap-y-16">
          <div className="faq-aside [grid-column:1/5]">
            <h2 className="t-display-2 mb-6">{heading}</h2>
            {lede && <p className="t-body max-w-[36ch] text-fg-2">{lede}</p>}
          </div>

          <dl className="[grid-column:6/13] m-0 border-t border-line">
            {items.map((faq, i) => (
              <div
                key={faq.question}
                className="border-b border-line py-7"
                data-enter
                style={{ ['--enter-delay' as string]: `${i * 50}ms` }}
              >
                {/* dt wraps the h3 rather than replacing it: the definition-list
                    semantics carry the pairing, the heading carries the outline.
                    Ticket 7 asks for the heading; the <dl> is what the rest of
                    this site uses for a term-and-detail pair. */}
                <dt className="mb-2">
                  <h3 className="t-body text-fg">{faq.question}</h3>
                </dt>
                <dd className="t-small m-0 max-w-[68ch] text-fg-2">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Surface>
  );
}
