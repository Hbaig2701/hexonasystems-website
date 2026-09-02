/**
 * content/testimonials.ts — "Hear from those that made the right choice".
 *
 * Transcribed AS TEXT from the Framer design, deliberately. §1.4 and §7.5 item 5
 * both flag the same failure on the current site: testimonials that exist only
 * as images are invisible to search engines, to screen readers, and to anyone
 * skimming. Every word here is real HTML.
 *
 * ⚠️ Two things to confirm before launch (§11 item 7):
 *   1. The exact wording, against the original submissions.
 *   2. Permission to attribute by name and company.
 * Typos in the source have been left as written rather than silently corrected —
 * a quote is a quote. Flag any that should be cleaned up.
 */

export interface Testimonial {
  quote: string;
  name: string;
  company: string;
  /** 1–5. All current entries are 5. */
  rating: number;
  /** Path to an avatar. Empty renders initials in a monogram. */
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Hamza and the team at Hexona have been amazing. They truly have a system to build a valuable and profitable business. The support on questions I’ve asked is first rate. I highly endorse them and believe in their mission.',
    name: 'Terry Alison',
    company: 'SkyGenix AI',
    rating: 5,
    avatar: '',
  },
  {
    quote:
      'Hexona is a phenomenal, knowledgeable source of automation expertise. There is no better company who understands automations.',
    name: 'Wes Quade',
    company: 'Reactive Labs',
    rating: 5,
    avatar: '',
  },
  {
    quote:
      'Hexona Systems truly is an expert in the automation workflow world. They are creative and can solve almost any scenario you throw at them.',
    name: 'Jace Nelson',
    company: 'GrowthPeak',
    rating: 5,
    avatar: '',
  },
  {
    quote:
      'I’ve been using Hexona Systems for about a year now, and it’s been a game-changer for my business. Thanks to their platform, I’ve been able to build up over 100 reviews, which has really boosted our credibility.',
    name: 'Khai Harrison',
    company: 'OutKasts Barbershop',
    rating: 5,
    avatar: '',
  },
];

/** Initials for the monogram fallback, so a missing avatar still reads as a person. */
export function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}
