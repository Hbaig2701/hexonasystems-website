import { cn } from '@/lib/cn';

/**
 * SectionMarker — §3.3.
 *
 *   01 ── CREDENTIALS ─────────────────────────────────────
 *
 * Mono index, mono label, a hairline rule running to the margin. This is the
 * whole section-heading device: v1 wrapped its equivalent in a pill and centred
 * it, which is the brochure move. Here it is a marginal annotation on a
 * document, which is the point.
 *
 * The rule uses --mark rather than --line so it reads as a drawn mark rather
 * than a structural border, and --mark never renders text.
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
      <p className="t-label shrink-0 whitespace-nowrap">
        <span className="text-fg">{index}</span>
        <span aria-hidden="true" className="px-2 text-mark">
          ──
        </span>
        <span className="text-fg-2">{label}</span>
      </p>
      <span aria-hidden="true" className="h-px min-w-8 flex-1 bg-mark opacity-60" />
    </div>
  );
}
