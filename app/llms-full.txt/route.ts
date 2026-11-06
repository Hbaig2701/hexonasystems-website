import { absolute } from '@/lib/site';
import { TOKEN, pathLabel } from '@/lib/blog-links';
import { ENTITY_SENTENCE, FIRM, KEY_FACTS, PRINCIPAL } from '@/content/firm';
import { EMPLOYEES } from '@/content/employees';
import { INDUSTRY_LIST } from '@/content/industries';
import { CASE_STUDIES } from '@/content/evidence';
import { FIRM_FAQS } from '@/content/faqs';
import { ARTICLES, blogPath, categoryLabel } from '@/content/blog';
import type { Faq } from '@/content/faqs';

/**
 * /llms-full.txt — the long companion to /llms.txt.
 *
 * llms.txt is the one-screen map. This is the full text of the pages that
 * answer questions: every AI employee, every industry page, every case study
 * and every article, as plain markdown, so an assistant can read the site in
 * one fetch instead of crawling it. Derived entirely from the content modules,
 * like llms.txt, so it can never drift from the pages.
 */

export const dynamic = 'force-static';

/** Articles write site links as bare paths ("/book"); render them as the same
 *  labelled links the page shows, with absolute URLs. */
const links = (t: string) =>
  t.replace(TOKEN, (m) => {
    if (!m.startsWith('/')) return m;
    const label = pathLabel(m);
    return label ? `[${label}](${absolute(m)})` : absolute(m);
  });

const faqBlock = (faqs: Faq[]) => (faqs.length ? ['### Questions', '', ...faqs.flatMap((f) => [`**${f.question}**`, links(f.answer), ''])] : []);

export function GET() {
  const out: string[] = [
    `# ${FIRM.name}: full text`,
    '',
    `> ${ENTITY_SENTENCE}`,
    '',
    `The short version of this file is ${absolute('/llms.txt')}. Led by ${PRINCIPAL.name}, ${PRINCIPAL.role}. Contact: ${FIRM.email}. Book a free consult: ${absolute('/book')}`,
    '',
    '## Facts',
    '',
    ...KEY_FACTS.map((f) => `- ${f.field}: ${f.value}`),
    '',
    ...faqBlock(FIRM_FAQS),
    '## AI employees',
    '',
  ];

  for (const e of EMPLOYEES) {
    out.push(`## ${e.name}`, '', `URL: ${e.page ? absolute(`/ai-employees/${e.slug}`) : absolute('/ai-employees')}`, `Moves: ${e.driver}`, '', e.short, '');
    const p = e.page;
    if (!p) continue;
    out.push(p.answer, '', p.intro, '', '### What it does', '', ...p.does.map((d) => `- **${d.title}.** ${d.text}`), '');
    if (p.problems.length) out.push('### Problems it fixes', '', ...p.problems.map((x) => `- ${x}`), '');
    out.push('### How it is set up', '', ...p.steps.map((s, i) => `${i + 1}. **${s.title}.** ${s.text}`), '');
    if (p.proof.length) out.push('### Results', '', ...p.proof.map((r) => `- ${r.figure}: ${r.label} (${r.sector}, ${absolute(`/evidence/${r.caseSlug}`)})`), '');
    out.push(...faqBlock(p.faqs));
  }

  out.push('## Industries', '');
  for (const ind of INDUSTRY_LIST) {
    const p = ind.page;
    if (!p) continue;
    out.push(`## ${ind.name}`, '', `URL: ${absolute(`/industries/${ind.slug}`)}`, '', p.answer, '', p.intro, '', '### Common problems', '', ...p.problems.map((x) => `- **${x.title}.** ${x.text}`), '');
    out.push(...faqBlock(p.faqs));
  }

  out.push('## Case studies', '');
  for (const c of CASE_STUDIES) {
    out.push(
      `## ${c.title}`,
      '',
      `URL: ${absolute(`/evidence/${c.slug}`)}`,
      `Sector: ${c.sector}${c.region ? `, ${c.region}` : ''}. Basis: ${c.basis === 'measured' ? 'measured in the client\'s own systems' : 'projected, not yet measured'}.`,
      `Headline: ${c.headline.figure} ${c.headline.label}`,
      '',
      ...c.situation,
      '',
      '### What was built',
      '',
      ...c.whatWeBuilt.map((x) => `- ${x}`),
      '',
      ...(c.whatChanged?.length ? ['### What changed', '', ...c.whatChanged.map((w) => `- ${w.metric}: ${w.before} → ${w.after}`), ''] : []),
      '### Outcomes',
      '',
      ...c.outcomes.map((x) => `- ${x}`),
      '',
      `How it was measured: ${c.verification}`,
      '',
    );
  }

  out.push('## Articles', '');
  for (const a of ARTICLES) {
    out.push(`## ${a.title}`, '', `URL: ${absolute(blogPath(a.slug))}`, `Category: ${categoryLabel(a.category)}. Published ${a.datePublished}, last checked ${a.lastChecked}.`, '');
    out.push(...a.intro.map(links), '');
    if (a.tldr.length) out.push('### Key points', '', ...a.tldr.map((t) => `- ${links(t)}`), '');
    for (const s of a.sections) {
      out.push(`### ${s.heading}`, '');
      if (s.paragraphs) out.push(...s.paragraphs.flatMap((x) => [links(x), '']));
      if (s.bullets) out.push(...s.bullets.map((x) => `- ${links(x)}`), '');
      if (s.steps) out.push(...s.steps.map((x, i) => `${i + 1}. **${x.title}.** ${links(x.detail)}`), '');
      if (s.table) {
        const cols = s.table.columns;
        out.push(`${s.table.caption}`, '', `| ${cols.map((c) => c.label).join(' | ')} |`, `|${cols.map(() => '---').join('|')}|`, ...s.table.rows.map((r) => `| ${cols.map((c) => (r[c.key] ?? '').replace(/\|/g, '/')).join(' | ')} |`), '');
      }
      if (s.callout) out.push(`> ${links(s.callout)}`, '');
    }
    out.push(...faqBlock(a.faq));
    if (a.sources.length) out.push('### Sources', '', ...a.sources.map((s) => `- ${s.label}: ${s.url}`), '');
  }

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
