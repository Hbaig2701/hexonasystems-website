'use client';

import { useActionState } from 'react';
import { commission, type FormState } from './actions';
import { FIELDS, COMMISSION } from '@/content/commission';
import { FIRM } from '@/content/firm';
import { cn } from '@/lib/cn';

/**
 * The only client component on the site, and it earns it.
 *
 * ⚠️ THIS FORM NEEDS JAVASCRIPT, AND THAT IS A REAL EXCEPTION TO THE SITE'S
 * RULE. Every other component renders complete without a bundle. This one does
 * not, and the claim that it did was tested and found false: React emits the
 * progressive-enhancement fields for `useActionState`, but a submit without a
 * bundle returns 200 with the action never running, which is worse than an
 * error because it looks like it worked.
 *
 * Rather than pretend, the <noscript> below says so before anyone fills in nine
 * fields, and gives the email address instead. A server-component form with a
 * plain action would genuinely work scriptless, but it loses the entered
 * answers on every validation error, and losing nine answers is a worse failure
 * than the one being avoided.
 *
 * Fields come from content/commission.ts rather than being written out here,
 * so the questions can be reordered or reworded without touching markup. The
 * field labels are the qualification; see the note in that file.
 */

const initial: FormState = { status: 'idle' };
const EMAIL = FIRM.email;

export function CommissionForm() {
  const [state, formAction, pending] = useActionState(commission, initial);

  if (state.status === 'sent') {
    return (
      <div className="border-t border-line pt-10">
        <h2 className="t-display-2 mb-6">{COMMISSION.success.heading}</h2>
        <p className="t-body max-w-[58ch] text-fg-2">{COMMISSION.success.body}</p>
      </div>
    );
  }

  const errors = state.status === 'error' ? (state.errors ?? {}) : {};

  return (
    <form action={formAction} noValidate className="border-t border-line">
      {/* Said before the nine fields, not after them. See the note above. */}
      <noscript>
        <p className="t-body border-b border-line py-7 text-fg">
          This form needs JavaScript to send. With it switched off, email{' '}
          <a href={`mailto:${EMAIL}`} className="link text-brand">
            {EMAIL}
          </a>{' '}
          instead and we will reply the same way.
        </p>
      </noscript>

      {FIELDS.map((f) => {
        const err = errors[f.name];
        const id = `f-${f.name}`;
        const describedBy =
          [f.hint ? `${id}-hint` : null, err ? `${id}-err` : null].filter(Boolean).join(' ') ||
          undefined;

        return (
          <div key={f.name} className="border-b border-line py-7">
            <label htmlFor={id} className="t-label mb-2 block text-fg">
              {f.label}
              {!f.required && <span className="ml-2 text-fg-3">Optional</span>}
            </label>

            {f.hint && (
              <p id={`${id}-hint`} className="t-small mb-4 max-w-[62ch] text-fg-3">
                {f.hint}
              </p>
            )}

            {f.type === 'textarea' ? (
              <textarea
                id={id}
                name={f.name}
                rows={4}
                required={f.required}
                aria-invalid={err ? true : undefined}
                aria-describedby={describedBy}
                className={fieldClass(err)}
              />
            ) : f.type === 'select' ? (
              <select
                id={id}
                name={f.name}
                required={f.required}
                defaultValue=""
                aria-invalid={err ? true : undefined}
                aria-describedby={describedBy}
                className={fieldClass(err)}
              >
                <option value="" disabled>
                  Choose one
                </option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                name={f.name}
                type={f.type}
                required={f.required}
                autoComplete={f.autoComplete}
                aria-invalid={err ? true : undefined}
                aria-describedby={describedBy}
                className={fieldClass(err)}
              />
            )}

            {err && (
              <p id={`${id}-err`} className="t-small mt-3 text-loss">
                {err}
              </p>
            )}
          </div>
        );
      })}

      {/* Honeypot. Hidden from sight AND from assistive technology, so nobody
          who should be filling this form is ever offered it. lib/lead.ts
          accepts and discards anything that arrives with it filled in. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="f-role">Role</label>
        <input id="f-role" name="role" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-10">
        <button
          type="submit"
          disabled={pending}
          className="t-label inline-block border border-brand bg-brand px-7 py-3.5 text-bg transition-opacity duration-[160ms] disabled:opacity-55"
        >
          {pending ? 'Sending…' : 'Send it to the principal'}
        </button>
        <p className="t-small text-fg-3">{COMMISSION.fallback}</p>
      </div>

      {/* aria-live so the message is announced when it replaces nothing. */}
      <p aria-live="polite" className="t-small mt-5 min-h-5 text-loss">
        {state.status === 'error' ? state.message : ''}
      </p>
    </form>
  );
}

function fieldClass(err?: string) {
  return cn(
    't-body w-full border bg-bg-sunk px-4 py-3 text-fg outline-none',
    'transition-colors duration-[160ms] focus:border-brand',
    err ? 'border-loss' : 'border-line',
  );
}
