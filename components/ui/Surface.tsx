import type { ElementType, ReactNode } from 'react';
import { createElement } from 'react';
import { cn } from '@/lib/cn';

export type SurfaceName = 'paper' | 'void';

/**
 * Surface — the spine of the v2 design system (§3.1).
 *
 * The site alternates void → paper → void → paper section by section. Rather
 * than every component carrying two colour variants, a section declares its
 * surface once and everything inside reads semantic tokens (--bg, --fg, --line,
 * --brand) that globals.css remaps per surface.
 *
 * Transitions between surfaces are HARD EDGES. No gradient blend, no fade. A
 * section boundary is an abrupt change and a 1px rule, and that sharpness is
 * the aesthetic (§3.1).
 */
export function Surface({
  surface,
  as = 'section',
  rule = true,
  padded = true,
  children,
  className,
  id,
}: {
  surface: SurfaceName;
  as?: ElementType;
  /** 1px rule at the top boundary. The only thing marking the transition. */
  rule?: boolean;
  padded?: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return createElement(
    as,
    {
      id,
      'data-surface': surface,
      className: cn(rule && 'border-t border-line', padded && 'section-pad', className),
    },
    children,
  );
}
