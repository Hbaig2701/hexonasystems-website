import { cn } from '@/lib/cn';

/**
 * SectionMarker — §3.3.
 *
 *   01 ── STANDING ─────────────────────────────────────────
 *
 * Mono index, mono label, a hairline rule running to the margin.
 *
 * The separator is a hairline, not a glyph. It repeats at the head of every
 * section on every page, and a shape repeated that often stops being an accent
 * and becomes the page's texture. The hexagon is spent once, large, on the hero.
 *
 * ⚠️ `as` EXISTS BECAUSE SOME PAGES HAVE NO OTHER HEADING. On /diagnostic and
 * the rest, each section carries a display <h2> in its body and this marker is
 * decoration above it, so it stays a <p> and must: two headings per section
 * would compete in the outline. A case study page has no body heading at all,
 * so its five sections were invisible to a heading pass and to any crawler
 * building a page outline. Those pass `as="h2"`. Default stays 'p'.
 *
 * The index numeral carries the accent. This is the single highest-value place
 * to spend it: the marker repeats at the head of every section on every page,
 * so the colour reads as the site's enumeration system rather than as a
 * highlight applied to one thing. On paper it resolves to the deep teal and
 * behaves like dark ink with a hint of colour; on void it is the full brand
 * cyan. Same rule, two temperatures.
 */
export function SectionMarker({
  index,
  label,
  className,
  as: As = 'p',
}: {
  index: string;
  label: string;
  className?: string;
  /** 'h2' where this marker IS the section's only heading. See above. */
  as?: 'p' | 'h2' | 'h3';
}) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      {/* Flex rather than inline: an inline hairline sits on the text baseline,
          which drops it below the centre of a 12px uppercase label. */}
      <As className="t-label flex shrink-0 items-center whitespace-nowrap">
        <span className="text-brand">{index}</span>
        <span aria-hidden="true" className="mx-3 h-px w-4 bg-brand opacity-45" />
        <span className="text-fg-2">{label}</span>
      </As>
      <span aria-hidden="true" className="h-px min-w-8 flex-1 bg-brand opacity-25" />
    </div>
  );
}
