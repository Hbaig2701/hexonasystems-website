import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { TrustedBy } from '@/components/home/TrustedBy';
import { Pattern } from '@/components/home/Pattern';
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
 *   Hero VOID + TrustedBy VOID   (one opening block, the band is the hero's
 *                                  last line and takes its ground)
 *   01 Pattern          PAPER
 *   02 Why this first   VOID
 *   03 The engagement   PAPER
 *   04 Fit              VOID
 *   Close               PAPER
 *   Footer              VOID
 *
 * ⚠️ THE FOOTER IS PERMANENTLY VOID, and that is what fixes everything above
 * it. Alternating backwards from a dark footer makes Close paper, Fit void,
 * The engagement paper, Why this first void and Pattern paper. Flip any one
 * section and two neighbours collide somewhere; the only way to change one is
 * to change all of them. Close is paper for this reason and not by preference.
 *
 * The trusted-by band is deliberately UNNUMBERED. It continues the hero's
 * ground rather than interrupting it, and numbering it would push Standing to
 * 02 and the engagement record to 03.
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
      <TrustedBy />
      <Pattern />
      <Arithmetic />
      <DiagnosticOffer />
      <Fit />
      <Close />
    </>
  );
}
