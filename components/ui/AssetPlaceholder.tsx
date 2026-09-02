import { cn } from '@/lib/cn';

/**
 * AssetPlaceholder — §0.5 and §14 (Phase 4).
 *
 * "Anything marked [ASSET NEEDED] is a file Hamza must supply. Build with a
 *  labelled placeholder that is OBVIOUSLY a placeholder — never ship a stock
 *  photo as a stand-in."
 *
 * And Phase 6: "All [ASSET NEEDED] items resolved or their sections cut — no
 * labelled placeholder survives into production."
 *
 * So this component is deliberately ugly-honest: dashed border, the word
 * PENDING in the leak colour, and a note saying exactly what is missing. It
 * should be uncomfortable to look at on a staging URL. That is the point.
 */
export function AssetPlaceholder({
  label,
  detail,
  tone = 'dark',
  className,
}: {
  label: string;
  detail?: string;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const light = tone === 'light';

  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}, asset pending`}
      className={cn(
        'flex flex-col justify-end rounded-md border border-dashed p-6',
        light ? 'border-light-hairline bg-light-surface' : 'border-hairline-bright bg-surface',
        className,
      )}
    >
      <p className={cn('type-label mb-2', light ? 'text-light-accent' : 'text-leak')}>
        Asset pending
      </p>
      <p className={cn('type-label mb-3', light ? 'text-light-primary' : 'text-primary')}>
        {label}
      </p>
      {detail && (
        <p
          className={cn(
            'type-micro max-w-[38ch]',
            light ? 'text-light-tertiary' : 'text-quaternary',
          )}
        >
          {detail}
        </p>
      )}
    </div>
  );
}
