import type { ReactNode } from 'react';
import { Footer } from './Footer';
import { cn } from '@/lib/cn';

/**
 * PageFrame — owns <main> (the skip-link target) and the footer.
 *
 * `footerCta` controls the 120px final-CTA band above the footer's top border
 * (§3.2). The homepage passes false: §7.1 S12 already is that CTA and running
 * both would read as a site that repeats itself.
 */
export function PageFrame({
  children,
  footerCta = true,
  className,
}: {
  children: ReactNode;
  footerCta?: boolean;
  className?: string;
}) {
  return (
    <>
      <main id="main" className={cn('relative z-10 flex-1 pt-[72px]', className)}>
        {children}
      </main>
      <Footer showCta={footerCta} />
    </>
  );
}
