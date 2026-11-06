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
 * answers on every validation error, and losing ten answers is a worse failure
 * than the one being avoided.
 *
 * Fields come from content/commission.ts rather than being written out here,
 * so the questions can be reordered or reworded without touching markup. The
 * field labels are the qualification; see the note in that file.
 */

const initial: FormState = { status: 'idle' };
const EMAIL = FIRM.email;

export function ConsultForm() {
  const [state, formAction, pending] = useActionState(commission, initial);

  if (state.status === 'sent') {
    return (
      <div className="py-4">
        <h2 className="hx-h3 mb-4">{COMMISSION.success.heading}</h2>
        <p className="max-w-[58ch] text-[17px] leading-relaxed text-[#3B4E55]">{COMMISSION.success.body}</p>
      </div>
    );
  }

  const errors = state.status === 'error' ? (state.errors ?? {}) : {};

  return (
    <form action={formAction} noValidate>
      {/* Said before the ten fields, not after them. See the note above. */}
      <noscript>
        <p className="border-b border-[#D7E6E8] py-7 text-[16px] text-[#0E1E24]">
          This form needs JavaScript to send. With it switched off, email{' '}
          <a href={`mailto:${EMAIL}`} className="hx-link">
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
          <div key={f.name} className="py-4">
            <label htmlFor={id} className="mb-1.5 block text-[15px] font-semibold text-[#0E1E24]">
              {f.label}
              {!f.required && <span className="ml-2 font-normal text-[#52656B]">Optional</span>}
            </label>

            {f.hint && (
              <p id={`${id}-hint`} className="mb-3 max-w-[62ch] text-[14px] leading-relaxed text-[#52656B]">
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
              <p id={`${id}-err`} className="mt-3 text-[14px] text-[#A32A1C]">
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

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-6">
        <button type="submit" disabled={pending} className="hx-btn hx-btn-primary disabled:opacity-55">
          {pending ? 'Sending…' : 'Request my free consult'}
          {!pending && <span className="hx-arrow" aria-hidden="true">→</span>}
        </button>
      </div>

      {/* aria-live so the message is announced when it replaces nothing. */}
      <p aria-live="polite" className="mt-5 min-h-5 text-[14px] text-[#A32A1C]">
        {state.status === 'error' ? state.message : ''}
      </p>
    </form>
  );
}

function fieldClass(err?: string) {
  return cn(
    'w-full rounded-xl border bg-white px-4 py-3 text-[16px] text-[#0E1E24] outline-none',
    'transition-[border-color,box-shadow] duration-200 focus:border-[#0B5566] focus:shadow-[0_0_0_4px_rgba(53,198,209,0.2)]',
    err ? 'border-[#A32A1C]' : 'border-[#BFD9DC]',
  );
}
