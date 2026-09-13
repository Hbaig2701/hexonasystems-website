import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { Credentials } from '@/components/home/Credentials';
import { Results } from '@/components/home/Results';
import { Arithmetic } from '@/components/home/Arithmetic';
import { DiagnosticOffer } from '@/components/home/Diagnostic';
import { Fit } from '@/components/home/Fit';
import { Close } from '@/components/home/Close';

/**
 * THE HOMEPAGE — §4. Seven sections, copy verbatim.
 *
 * Proof first, argument second (§0): credentials and the engagement record come
 * before the reasoning, because this buyer checks standing before he reads a
 * case for anything.
 *
 * Surfaces alternate per §3.1:
 *   Hero VOID · Credentials PAPER · Results VOID · Arithmetic PAPER
 *   · Diagnostic VOID · Fit PAPER · Close VOID
 *
 * Exactly one figure settle on the page, on the enterprise-value line in
 * Arithmetic (§3.4, §8).
 */

export const metadata: Metadata = {
  title: 'Hexona Systems: operational diligence and revenue recovery',
  description:
    'We find demand a company already paid for and is failing to convert, price it in EBITDA, and seal it. A fixed-scope diagnostic for operating companies at $10M to $100M.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Credentials />
      <Results />
      <Arithmetic />
      <DiagnosticOffer />
      <Fit />
      <Close />
    </>
  );
}
