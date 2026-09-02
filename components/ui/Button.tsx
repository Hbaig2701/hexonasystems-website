import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Button — spec §4.6.
 * Radius is 6px maximum across the whole site: sharp corners read as
 * engineered, pill shapes read as consumer app.
 */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'default' | 'large';

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium ' +
  'transition-[background-color,border-color,color,transform,box-shadow,opacity] ' +
  'duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)] ' +
  'disabled:opacity-45 disabled:pointer-events-none select-none';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-[#0A0C10] hover:bg-accent-bright hover:-translate-y-px ' +
    'hover:shadow-[0_8px_24px_var(--accent-glow)] active:translate-y-0 active:duration-[80ms]',
  secondary:
    'bg-transparent border border-hairline-bright text-primary ' +
    'hover:border-accent hover:bg-accent-wash',
  ghost:
    'text-secondary hover:text-primary px-0 [&_.arrow]:transition-transform ' +
    '[&_.arrow]:duration-[240ms] hover:[&_.arrow]:translate-x-1',
};

const sizes: Record<ButtonSize, string> = {
  default: 'text-[14px] px-7 py-3.5 leading-none',
  large: 'text-[16px] px-9 py-[18px] leading-none',
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  /** Renders the ghost arrow glyph. Ghost variant animates it on hover. */
  arrow?: boolean;
}

type AsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type AsLink = CommonProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string };

export function Button(props: AsButton | AsLink) {
  const { variant = 'primary', size = 'default', children, className, arrow, ...rest } = props;

  const classes = cn(
    base,
    variants[variant],
    variant === 'ghost' ? 'text-[14px] py-2' : sizes[size],
    className,
  );

  const content = (
    <>
      {children}
      {arrow && (
        <span className="arrow text-[12px]" aria-hidden="true">
          →
        </span>
      )}
    </>
  );

  if ('href' in rest && typeof rest.href === 'string') {
    const { href, ...anchorProps } = rest as AsLink;
    const external = href.startsWith('http') || href.startsWith('mailto:');
    if (external) {
      return (
        <a href={href} className={classes} {...anchorProps}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {content}
      </Link>
    );
  }

  const { type = 'button', ...buttonProps } = rest as AsButton;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
