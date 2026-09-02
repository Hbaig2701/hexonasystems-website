/**
 * content/positioning.ts — the values grid and the comparison table.
 *
 * Both patterns come from the Framer design. The COMPARISON copy is kept close
 * to the original because it is the strongest writing in it — every line is a
 * claim a competitor cannot copy, which is exactly the §13 test.
 *
 * The VALUES copy is not. The reference cards read "Your success is our
 * priority—we build solutions that truly make an impact", which is the register
 * §13 rules out by name. So these keep the reference's shape — four cards, icon,
 * short title, two lines — and Hexona's voice: the three tenets from §7.4, plus
 * the award, which is the one value that is a verifiable fact rather than a
 * sentiment.
 */

import { AWARDS_COUNT, BUSINESSES_POWERED, DEVELOPER_NETWORK } from './claims';

export interface Value {
  /** Icon key — drawn inline, never an emoji (§15). */
  icon: 'award' | 'scoreboard' | 'amplifier' | 'seam';
  title: string;
  copy: string;
}

export const VALUES: Value[] = [
  {
    icon: 'award',
    title: 'Award-Winning Growth',
    copy: 'Recipient of the Platinum (2024) and Diamond (2025) SaaSPreneur Awards, the top 0.01% of SaaS agencies worldwide.',
  },
  {
    icon: 'scoreboard',
    title: 'Revenue Is the Only Scoreboard',
    copy: 'Hours saved is a vanity metric. It feels like progress and it never appears on a P&L. We measure builds against revenue and profit.',
  },
  {
    icon: 'amplifier',
    title: 'AI Amplifies What It’s Pointed At',
    copy: 'Point it at a coherent operation and it compounds what works. Point it at a fragmented one and it industrialises the fragmentation.',
  },
  {
    icon: 'seam',
    title: 'The Seams Are the Business',
    copy: 'Companies rarely fail at their work. They fail between the pieces of it: in the handoffs nobody owns, where a lead waits to be noticed.',
  },
];

export interface ComparisonRow {
  them: string;
  us: string;
}

/**
 * "What makes us stand out in the industry."
 * Two columns, ✕ against ✓. Numbers come from claims.ts like every other figure.
 */
export const COMPARISON: ComparisonRow[] = [
  { them: 'Riding the AI wave', us: 'Building since before ChatGPT' },
  { them: 'Founded less than three years ago', us: 'One of the first modern AI agencies' },
  { them: 'Unremarkable leadership', us: 'Award-winning founder' },
  { them: 'No in-field experience', us: `${BUSINESSES_POWERED.value} businesses supported` },
  { them: 'Small teams, small capacity', us: `${DEVELOPER_NETWORK.value} developer network, and growing` },
];

export const COMPARISON_HEADINGS = {
  them: 'Other agencies',
  us: 'Hexona',
} as const;

/** The hero news badge, from the Framer design. */
export const NEWS_BADGE = {
  label: 'News',
  text: 'Hexona has been awarded the Diamond SaaSPreneur Award',
  href: '/about#the-record',
  /** ⚠️ Gated on the Diamond award being confirmed — see SAASPRENEUR_DIAMOND. */
  status: 'pending' as const,
};

export const AWARDS_LABEL = AWARDS_COUNT;
