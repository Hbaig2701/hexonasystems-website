'use server';

import { headers } from 'next/headers';
import { submitLead, type LeadResult } from '@/lib/lead';

export type FormState =
  | { status: 'idle' }
  | { status: 'sent' }
  | { status: 'error'; message: string; errors?: Record<string, string> };

/**
 * The form's only entry point.
 *
 * Signature is (prevState, formData) because the form uses `useActionState`,
 * which is what gives inline errors and a pending state without a reload.
 * It does NOT make the form work without a bundle; see the note in
 * CommissionForm.tsx, where that was tested and found false.
 *
 * ⚠️ VALIDATION IS SERVER SIDE AND THAT IS NOT BELT AND BRACES. The `required`
 * and `type="email"` attributes on the inputs are a courtesy to the person
 * filling it in; they are trivially bypassed and are not a check. Everything
 * that matters is re-decided here, in lib/lead.ts, against the schema.
 */
export async function commission(_prev: FormState, formData: FormData): Promise<FormState> {
  const h = await headers();
  /* x-forwarded-for is a list; the client is the first entry. Vercel sets it. */
  const ip = (h.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';

  const result: LeadResult = await submitLead(
    {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      website: formData.get('website') || undefined,
      revenue: formData.get('revenue'),
      headcount: formData.get('headcount') || undefined,
      systems: formData.get('systems'),
      why: formData.get('why'),
      timing: formData.get('timing') || undefined,
      role: formData.get('role') || undefined,
    },
    ip,
  );

  if (result.ok) return { status: 'sent' };

  switch (result.kind) {
    case 'invalid':
      return {
        status: 'error',
        message: 'A few answers need another look.',
        errors: result.errors,
      };
    case 'rate':
      return {
        status: 'error',
        message: 'That is several submissions in a minute. Give it sixty seconds and try again.',
      };
    case 'bot':
      /* Tell a bot it succeeded. A bot told it failed simply retries. */
      return { status: 'sent' };
  }
}
