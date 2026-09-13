import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Button — §3.5. Two variants only.
 *
 * The primary's surface inversion lives in globals.css, keyed off the enclosing
 * [data-surface], so a caller never has to know which ground it is standing on
 * and can never get it wrong. See the BUTTONS block there for the contrast
 * reasoning.
 *
 * No transform, no shadow, 2px radius. §10: anything that lifts or glows on
 * hover belongs on a consumer site.
 */

type Variant = 'primary' | 'secondary';

interface Common {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type AsLink = Common & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string };

export function Button(props: AsButton | AsLink) {
  const { variant = 'primary', children, className, ...rest } = props;
  const classes = cn('btn', variant === 'primary' ? 'btn-primary' : 'btn-secondary', className);

  if ('href' in rest && typeof rest.href === 'string') {
    const { href, ...anchorProps } = rest as AsLink;
    const external = href.startsWith('http') || href.startsWith('mailto:');
    if (external) {
      return (
        <a href={href} className={classes} {...anchorProps}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const { type = 'button', ...buttonProps } = rest as AsButton;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

/**
 * The text link that sits beside a primary CTA throughout the copy deck
 * ("What you receive →", "Discuss it first →").
 */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const inner = (
    <>
      {children}
      {/* The arrow carries the accent, the words stay in body colour. Colouring
          the whole link would make every inline CTA compete with the primary
          button; colouring only the glyph marks it as a way out of the section
          without raising its voice. */}
      <span aria-hidden="true" className="ml-1.5 text-brand">
        →
      </span>
    </>
  );
  if (href.startsWith('http') || href.startsWith('mailto:')) {
    return (
      <a href={href} className={cn('link', className)}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cn('link', className)}>
      {inner}
    </Link>
  );
}
