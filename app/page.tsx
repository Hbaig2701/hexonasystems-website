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
 *   Hero                VOID  ┐ one opening block. The band takes the
 *   TrustedBy band      VOID  ┘ hero's ground and blends into it.
 *   01 Pattern          PAPER
 *   02 Why this first   VOID
 *   03 The principal    PAPER
 *   04 The engagement   VOID
 *   05 Fit              PAPER
 *   Close               VOID  ┐ one closing block. The page goes quiet
 *   Footer              VOID  ┘ and stays dark into the footer.
 *
 * ⚠️ 01 IS PAPER AND THAT IS THE FIXED POINT. Everything else is derived from
 * it, not the other way round.
 *
 * Strict alternation cannot also hold here, and it is worth knowing why before
 * anyone "fixes" this. The footer is permanently void. Alternating backwards
 * from it across five numbered sections plus the close lands on 01 VOID, every
 * time; with six sections it lands on 01 PAPER. So the ground of section 01 is
 * decided by how many sections happen to exist below it, which is a terrible
 * thing to let decide the top of the page.
 *
 * So 01 is pinned to paper and the two same-ground pairs are pushed to the
 * ends, where they read as intent rather than error: the band belongs to the
 * hero, and the close belongs to the footer. Everything between 01 and 05
 * alternates strictly. ADDING OR REMOVING A SECTION no longer moves 01; it
 * moves where the second pair sits, which is a much cheaper thing to fix.
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
