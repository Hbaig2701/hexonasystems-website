import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Card — spec §4.6.
 * --surface background, 1px hairline, 6px radius, no drop shadow by default.
 * On hover: border brightens, background raises, and a 1px cyan line grows
 * along the top edge from left to right in 320ms.
 *
 * THAT TOP-EDGE LINE IS THE SITE'S SIGNATURE HOVER — every card type uses it.
 */

const cardClasses =
  'group relative block rounded-md border border-hairline bg-surface ' +
  'transition-[background-color,border-color] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] ' +
  'hover:border-hairline-bright hover:bg-surface-raised ' +
  "before:content-[''] before:absolute before:left-0 before:top-0 before:h-px before:w-full " +
  'before:bg-accent before:origin-left before:scale-x-0 ' +
  'before:transition-transform before:duration-[320ms] before:ease-[cubic-bezier(0.16,1,0.3,1)] ' +
  'hover:before:scale-x-100 focus-visible:before:scale-x-100 ' +
  'before:rounded-t-md';

interface CardProps {
  children: ReactNode;
  className?: string;
  href?: string;
}

export function Card({ children, className, href }: CardProps) {
  if (href) {
    return (
      <Link href={href} className={cn(cardClasses, className)}>
        {children}
      </Link>
    );
  }
  return <div className={cn(cardClasses, className)}>{children}</div>;
}
