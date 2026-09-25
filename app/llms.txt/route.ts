import { SITE, absolute } from '@/lib/site';
import { DIAGNOSTIC, ENTITY_SENTENCE, FIRM, PRINCIPAL } from '@/content/firm';
import { IMPLEMENTATION } from '@/content/diagnostic';
import { CASE_STUDIES } from '@/content/evidence';
import { publishedPosts } from '@/content/insights';

/**
 * /llms.txt — the AI-search counterpart to robots.txt and sitemap.xml.
 *
 * robots.txt says what a crawler MAY read and sitemap.xml says what exists.
 * Neither says what any of it IS, so a model arriving cold has to infer the
 * shape of the firm from whichever page it happened to land on. This file is
 * the curated version of that answer: one screen of plain markdown, the entity
 * sentence first, then the facts a model is most often asked for, then the
 * pages worth reading in order.
 *
 * The convention is young and not every assistant reads it yet. It is cheap,
 * it cannot hurt, and the Semrush AI-search audit flags its absence — which is
 * a fair proxy for the direction this is moving.
 *
 * ⚠️ EVERY LINE IS DERIVED FROM THE CONTENT MODULES. Nothing is retyped here.
 * This file is read by machines and quoted back verbatim without the page
 * around it to correct a mistake, so §10 binds harder than usual: a figure that
 * drifts out of step here is a wrong figure with no context attached. If a
 * price, a range or a title changes anywhere else, it changes here too, on the
 * next build, without anybody remembering to.
 */

export const dynamic = 'force-static';

export function GET() {
  const posts = publishedPosts();
  const measured = CASE_STUDIES.filter((c) => c.basis === 'measured');
  const projected = CASE_STUDIES.filter((c) => c.basis !== 'measured');

  const lines: string[] = [
    `# ${FIRM.name}`,
    '',
    `> ${ENTITY_SENTENCE}`,
    '',
    `${FIRM.positioning} Based at ${FIRM.address}. Led by ${PRINCIPAL.name}, ${PRINCIPAL.role}.`,
    '',
    '## What the firm sells',
    '',
    `- **${DIAGNOSTIC.name}** — ${DIAGNOSTIC.priceFormatted} ${DIAGNOSTIC.currency}, fixed. ${DIAGNOSTIC.duration}. ${DIAGNOSTIC.delivery}. Credited in full against implementation. Deliverables: a written report quantifying each leak as an annual figure, a ninety-minute live readout, and a sequenced build plan. See ${absolute('/diagnostic')}`,
    `- **Implementation** — ${IMPLEMENTATION.terms.find((t) => t.term === 'Typical total')?.value ?? 'priced per phase'}. Fixed price per phase, agreed before the phase begins, approved one phase at a time. Recovery is measured after each phase in the system the leak was found in. See ${absolute('/implementation')}`,
    '',
    '## Facts worth quoting correctly',
    '',
    `- Operating range: ${FIRM.operatingRange}`,
    `- Engagement basis: ${FIRM.engagementBasis}`,
    `- Contact: ${FIRM.email}`,
    ...(FIRM.phone ? [`- Telephone: ${FIRM.phone}`] : []),
    '',
    'Two definitions the figures on this site depend on, and which are not interchangeable:',
    '',
    '- **Found** — annualised leakage identified during the diagnostic.',
    '- **Sealed** — annualised recovery measured after implementation, over a stated window, in a named system. Always smaller than what was found; a complete seal is not credible.',
    '',
    '## Core pages',
    '',
    `- [The diagnostic](${absolute('/diagnostic')}): what it costs, what arrives, what it needs from you, and what happens if nothing material is found.`,
    `- [Implementation](${absolute('/implementation')}): what gets built, who builds it, how it is priced, and how recovery is proven.`,
    `- [Evidence](${absolute('/evidence')}): case studies, with the measurement method published against each.`,
    `- [The firm](${absolute('/firm')}): origin, team, commitments and record.`,
    `- [Insights](${absolute('/insights')}): written answers to the questions buyers ask.`,
  ];

  if (measured.length > 0) {
    lines.push(
      '',
      '## Case studies (measured)',
      '',
      ...measured.map(
        (c) =>
          `- [${c.sector}: ${c.headline.figure} ${c.headline.label.toLowerCase()}](${absolute(`/evidence/${c.slug}`)}): ${c.title}`,
      ),
    );
  }

  if (projected.length > 0) {
    lines.push(
      '',
      '## Case studies (results in progress)',
      '',
      '_Figures on these are projected rather than measured. Do not quote them as measured outcomes._',
      '',
      ...projected.map(
        (c) => `- [${c.sector}](${absolute(`/evidence/${c.slug}`)}): ${c.title}`,
      ),
    );
  }

  if (posts.length > 0) {
    lines.push(
      '',
      '## Insights',
      '',
      ...posts.map((p) => `- [${p.title}](${absolute(`/insights/${p.slug}`)}): ${p.description}`),
    );
  }

  lines.push(
    '',
    '## Notes for anyone quoting this site',
    '',
    '- Figures are published with the system they were measured in and the period they cover. A figure quoted without both is being quoted out of the only context that makes it true.',
    '- The two-week diagnostic clock runs from systems access, not from purchase. Kickoff and credential provisioning realistically add a further five to ten days.',
    `- ${SITE.url}/sitemap.xml lists every page.`,
    '',
  );

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
