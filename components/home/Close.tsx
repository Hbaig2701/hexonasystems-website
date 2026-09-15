import { Surface } from '@/components/ui/Surface';
import { Button, TextLink } from '@/components/ui/Button';
import { DIAGNOSTIC } from '@/content/firm';

/**
 * SECTION 7 — CLOSE. §4. VOID.
 *
 * No form. No newsletter. No social icons. The page ends.
 */
export function Close() {
  return (
    <Surface surface="paper">
      <div className="shell">
        <div className="col-12">
          <div className="[grid-column:1/9]">
            <h2 className="t-display-1 mb-16">
              Either you have the number,
              <br className="hidden sm:inline" />
              or you&apos;re guessing.
            </h2>

            <div className="flex flex-col items-start gap-8">
              <Button href="/diagnostic">
                Commission a diagnostic <span aria-hidden="true">→</span> {DIAGNOSTIC.priceFormatted}
              </Button>
              <TextLink href="/diagnostic#discuss">Discuss it first</TextLink>
            </div>

            <p className="t-label mt-20 border-t border-brand/30 pt-6 text-fg-3">
              Ten business days <span className="px-1.5 text-brand opacity-50">·</span> Fixed fee
              <span className="px-1.5 text-brand opacity-50">·</span> Credited against
              implementation
            </p>
          </div>
        </div>
      </div>
    </Surface>
  );
}
