'use client';

import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

/**
 * Input / Textarea / Select / Slider — spec §4.6.
 * --surface-inset background, 1px hairline, 6px radius, 14px 16px padding.
 * Label above in mono at --text-label. Focus: border → accent plus a 3px glow.
 */

const fieldClasses =
  'w-full rounded-md border border-hairline bg-surface-inset px-4 py-3.5 ' +
  'text-primary placeholder:text-quaternary ' +
  'transition-[border-color,box-shadow] duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)] ' +
  'focus:border-accent focus:outline-none focus:shadow-[0_0_0_3px_var(--accent-glow)] ' +
  'aria-[invalid=true]:border-leak';

interface FieldShellProps {
  label?: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}

function FieldShell({
  label,
  hint,
  error,
  optional,
  htmlFor,
  children,
  className,
}: FieldShellProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label htmlFor={htmlFor} className="type-label flex items-baseline gap-2 text-tertiary">
          {label}
          {optional && <span className="type-micro normal-case text-quaternary">optional</span>}
        </label>
      )}
      {children}
      {hint && !error && <p className="type-micro text-quaternary">{hint}</p>}
      {error && (
        <p className="type-micro text-leak" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    hint?: string;
    error?: string;
    optional?: boolean;
    wrapperClassName?: string;
  }
>(function Input(
  { label, hint, error, optional, className, wrapperClassName, id, ...props },
  ref,
) {
  const generated = useId();
  const fieldId = id ?? generated;
  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      optional={optional}
      htmlFor={fieldId}
      className={wrapperClassName}
    >
      <input
        ref={ref}
        id={fieldId}
        aria-invalid={error ? true : undefined}
        className={cn(fieldClasses, className)}
        {...props}
      />
    </FieldShell>
  );
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    hint?: string;
    error?: string;
    optional?: boolean;
  }
>(function Textarea({ label, hint, error, optional, className, id, ...props }, ref) {
  const generated = useId();
  const fieldId = id ?? generated;
  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      optional={optional}
      htmlFor={fieldId}
    >
      <textarea
        ref={ref}
        id={fieldId}
        aria-invalid={error ? true : undefined}
        className={cn(fieldClasses, 'min-h-28 resize-y', className)}
        {...props}
      />
    </FieldShell>
  );
});

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    hint?: string;
    error?: string;
  }
>(function Select({ label, hint, error, className, id, children, ...props }, ref) {
  const generated = useId();
  const fieldId = id ?? generated;
  return (
    <FieldShell label={label} hint={hint} error={error} htmlFor={fieldId}>
      <select
        ref={ref}
        id={fieldId}
        aria-invalid={error ? true : undefined}
        className={cn(fieldClasses, 'appearance-none pr-10', className)}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238A929E' stroke-width='1.2'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 16px center',
        }}
        {...props}
      >
        {children}
      </select>
    </FieldShell>
  );
});

/**
 * Slider. Every slider on this site is paired with a number input (§10.4) so
 * the value is keyboard-enterable, not only draggable.
 */
export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
  id,
  ariaValueText,
}: {
  label?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  id?: string;
  ariaValueText?: string;
}) {
  const generated = useId();
  const fieldId = id ?? generated;
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label htmlFor={fieldId} className="type-label text-tertiary">
          {label}
        </label>
      )}
      <input
        id={fieldId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={ariaValueText}
        onChange={(e) => onChange(Number(e.target.value))}
        className="hx-slider w-full"
        style={{ ['--pct' as string]: `${pct}%` }}
      />
      {format && <div className="type-figure text-[15px] text-secondary">{format(value)}</div>}
    </div>
  );
}
