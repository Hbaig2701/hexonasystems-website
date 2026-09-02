'use client';

import { createElement } from 'react';
import type { ElementType, ReactNode } from 'react';
import { useEnter } from '@/lib/hooks';
import { cn } from '@/lib/cn';
import { stagger } from '@/lib/motion';

/**
 * Reveal — the standard scroll entrance, spec §6.3.
 *
 *   initial:  opacity 0, y +24px, blur(6px)
 *   animate:  opacity 1, y 0,     blur(0)
 *   duration: 0.7s · ease.out · IntersectionObserver, -18% root margin, once
 *
 * The transition itself lives in globals.css keyed off `.js-enabled [data-enter]`
 * so the no-JS baseline renders at the final state. See §14, Phase 4.
 */

interface RevealProps {
  children: ReactNode;
  /** Sibling index — multiplies the 60ms stagger (§6.3). */
  index?: number;
  /** Explicit delay in seconds, overrides `index`. */
  delay?: number;
  as?: ElementType;
  className?: string;
}

export function Reveal({ children, index = 0, delay, as = 'div', className }: RevealProps) {
  const ref = useEnter<HTMLElement>();
  const seconds = delay ?? index * stagger.standard;

  return createElement(
    as,
    {
      ref,
      'data-enter': '',
      style: { ['--enter-delay' as string]: `${Math.round(seconds * 1000)}ms` },
      className: cn(className),
    },
    children,
  );
}
