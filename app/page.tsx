import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { TrustedBy } from '@/components/home/TrustedBy';
import { Pattern } from '@/components/home/Pattern';
import { Arithmetic } from '@/components/home/Arithmetic';
import { Principal } from '@/components/home/Principal';
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
 *   Hero                VOID
 *   TrustedBy band      PAPER
 *   01 Pattern          VOID
 *   02 Why this first   PAPER
 *   03 The principal    VOID
 *   04 The engagement   PAPER
 *   05 Fit              VOID
 *   Close               PAPER
 *   Footer              VOID
 *
 * Every block alternates, with no exceptions. That became possible only when
 * The principal was added: the count changed parity, which freed the band to
 * take paper and stop riding on the hero's ground.
 *
 * ⚠️ THE FOOTER IS PERMANENTLY VOID and fixes everything above it. Alternating
 * backwards from it determines every ground on this list, so no section can be
 * flipped on its own. Adding or removing ANY section inverts all of them.
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
      <Principal />
      <DiagnosticOffer />
      <Fit />
      <Close />
    </>
  );
}
