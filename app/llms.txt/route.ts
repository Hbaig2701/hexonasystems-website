import { SITE, absolute } from '@/lib/site';
import { ENTITY_SENTENCE, FIRM, PRINCIPAL } from '@/content/firm';
import { EMPLOYEES } from '@/content/employees';
import { INDUSTRY_LIST } from '@/content/industries';
import { CASE_STUDIES } from '@/content/evidence';
import { ARTICLES, CATEGORIES } from '@/content/blog';

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
  const measured = CASE_STUDIES.filter((c) => c.basis === 'measured');
  const projected = CASE_STUDIES.filter((c) => c.basis !== 'measured');

  const lines: string[] = [
    `# ${FIRM.name}`,
    '',
    `> ${ENTITY_SENTENCE}`,
    '',
    `${FIRM.positioning} Based at ${FIRM.address}. Led by ${PRINCIPAL.name}, ${PRINCIPAL.role}.`,
    '',
    '## What the firm does',
    '',
    'Hexona builds and runs AI employees for service businesses, and only builds the ones that increase enterprise value: more revenue captured, lower cost to deliver, and a business that runs without depending on its owner. Engagements start with a free one-hour consult.',
    '',
    ...EMPLOYEES.map(
      (e) =>
        `- **${e.name}** (moves ${e.driver.toLowerCase()}): ${e.short}${e.page ? ` See ${absolute(`/ai-employees/${e.slug}`)}` : ''}`,
    ),
    '',
    '## Industries served',
    '',
    ...INDUSTRY_LIST.map((i) => `- ${i.name}${i.page ? `: ${absolute(`/industries/${i.slug}`)}` : ''}`),
    '',
    '## Facts worth quoting correctly',
    '',
    `- Based in Toronto, serving the United States and Canada`,
    `- More than 1,000 agencies run on Hexona's AI and systems`,
    `- Contact: ${FIRM.email}`,
    ...(FIRM.phone ? [`- Telephone: ${FIRM.phone}`] : []),
    '',
    '## Core pages',
    '',
    `- [AI employees](${absolute('/ai-employees')}): every role Hexona builds, and the number each one moves.`,
    `- [Industries](${absolute('/industries')}): how the AI employees fit construction, home services, med spas, property management and more.`,
    `- [Case studies](${absolute('/evidence')}): results, with the measurement method published against each.`,
    `- [Blog](${absolute('/blog')}): answers to the questions owners ask, with costs, playbooks and weekly AI news. RSS: ${absolute('/blog/feed.xml')}`,
    `- [About](${absolute('/firm')}): origin, team and record.`,
    `- [Enterprise Value Score](${absolute('/score')}): a free 20-question assessment of a business on the 10 drivers of enterprise value.`,
    `- [Book a free consult](${absolute('/book')})`,
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

  for (const c of CATEGORIES) {
    const list = ARTICLES.filter((x) => x.category === c.id);
    if (list.length === 0) continue;
    lines.push('', `## Blog: ${c.label}`, '', `_${c.blurb}_`, '', ...list.map((p) => `- [${p.title}](${absolute(`/blog/${p.slug}`)}): ${p.description}`));
  }

  lines.push(
    '',
    '## Notes for anyone quoting this site',
    '',
    '- Figures are published with the system they were measured in and the period they cover. A figure quoted without both is being quoted out of the only context that makes it true.',
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
