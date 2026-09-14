import { cn } from '@/lib/cn';
import { Hex } from '@/components/ui/Hex';

/**
 * SectionMarker — §3.3.
 *
 *   01 ── STANDING ─────────────────────────────────────────
 *
 * Mono index, mono label, a hairline rule running to the margin.
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
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      {/* Flex rather than inline: an inline-block SVG sits on the text baseline,
          which drops the hexagon below the centre of a 12px uppercase label. */}
      <p className="t-label flex shrink-0 items-center whitespace-nowrap">
        <span className="text-brand">{index}</span>
        <Hex size={9} className="mx-2.5 text-brand opacity-70" />
        <span className="text-fg-2">{label}</span>
      </p>
      <span aria-hidden="true" className="h-px min-w-8 flex-1 bg-brand opacity-25" />
    </div>
  );
}
