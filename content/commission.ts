import { DIAGNOSTIC, FIRM } from './firm';

/**
 * content/commission.ts — the intake form, as content rather than as markup.
 *
 * Every other page on this site keeps its words in content/ and its layout in
 * app/. A form is the place that convention is most often broken and where it
 * matters most, because the field labels ARE the qualification: what you ask
 * for, in what order, decides who finishes.
 *
 * ⚠️ THE REVENUE BAND IS THE WHOLE POINT OF THIS FORM. The site states a
 * $3M-$15M operating range everywhere, and /diagnostic promises to say so on a
 * call rather than after taking the fee. Asking the question here, with "under
 * $3M" as an ordinary option rather than a disqualifier, is what makes that
 * promise operational instead of decorative. Do not remove the option to make
 * the funnel look better; a below-range lead that self-identifies is cheaper to
 * turn down than one discovered in week one.
 */

export interface Field {
  name: string;
  label: string;
  /** Rendered under the label. The reason the question is being asked. */
  hint?: string;
  type: 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'select';
  required?: boolean;
  options?: string[];
  autoComplete?: string;
}

export const REVENUE_BANDS = [
  'Under $1M',
  '$1M to $3M',
  '$3M to $15M',
  'Over $15M',
] as const;

export const FIELDS: Field[] = [
  {
    name: 'name',
    label: 'Your name',
    type: 'text',
    required: true,
    autoComplete: 'name',
  },
  {
    name: 'email',
    label: 'Work email',
    type: 'email',
    required: true,
    autoComplete: 'email',
  },
  {
    name: 'phone',
    label: 'Phone',
    hint: 'The next step is a call, so this is the number we would use. Include the country code if you are outside North America.',
    type: 'tel',
    required: true,
    autoComplete: 'tel',
  },
  {
    name: 'company',
    label: 'Company',
    type: 'text',
    required: true,
    autoComplete: 'organization',
  },
  {
    name: 'website',
    label: 'Website',
    type: 'url',
    required: false,
    autoComplete: 'url',
  },
  {
    name: 'revenue',
    label: 'Annual revenue',
    hint: 'A rough band is fine. It tells us which AI employees are likely to pay back fastest for a business your size.',
    type: 'select',
    required: true,
    options: [...REVENUE_BANDS],
  },
  {
    name: 'headcount',
    label: 'Headcount',
    type: 'text',
    required: false,
  },
  {
    name: 'systems',
    label: 'What tools run the business today',
    hint: 'CRM, phone system, calendar, field-service or booking software. If the answer is a spreadsheet, say so.',
    type: 'textarea',
    required: true,
  },
  {
    name: 'why',
    label: 'What would you hand to an AI employee first',
    hint: 'Missed calls, slow follow-up, scheduling, paperwork, invoices. Whatever is costing you most right now.',
    type: 'textarea',
    required: true,
  },
  {
    name: 'timing',
    label: 'When you would want to start',
    type: 'text',
    required: false,
  },
];

export const COMMISSION = {
  eyebrow: 'Commission a diagnostic',
  heading: 'Tell us what we would be looking at.',
  lede: `Ten questions, and none of them are qualifying you for a sales call. They are what we need to scope the work and to tell you honestly whether it is worth doing. The principal reads every one of these.`,

  /** Shown beside the form, not inside it. What happens after submit. */
  next: [
    {
      term: 'You hear back inside one business day',
      detail: 'From the principal, not from a sequence. If we are not the right fit we say so in that reply.',
    },
    {
      term: 'A thirty minute call, no deck',
      detail: 'We scope what we would look at and confirm the systems involved. You can stop here at no cost.',
    },
    {
      term: 'Then, and only then, an invoice',
      detail: `${DIAGNOSTIC.priceFormatted}, fixed, and credited in full against implementation. The clock starts when credentials are provisioned, not when you pay.`,
    },
  ],

  /** The form is not the only way in. Some people will always prefer email. */
  fallback: `Would rather just email? ${FIRM.email}.`,

  success: {
    heading: 'Thanks. That is with Hamza.',
    body: 'You will have a reply inside one business day to set a time for your free consult. If we are not the right fit, that reply will say so.',
  },
} as const;
