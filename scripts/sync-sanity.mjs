#!/usr/bin/env node
/**
 * Pulls PUBLISHED blog articles from the Hexona Sanity dataset and writes them
 * to content/blog/articles/sanity.generated.json in the exact Article shape
 * (content/blog/types.ts). The site then treats them like any other article:
 * sitemap, RSS, llms.txt, schema, covers and tests all pick them up.
 *
 * Safe by design:
 *  - No env vars set  -> writes [] and exits 0 (builds never break).
 *  - Fetch fails      -> keeps the previous file if one exists, else [].
 *  - Invalid document -> skipped with a warning, never published half-built.
 *  - Slug already used by a hand-written article -> the hand-written one wins
 *    (handled in content/blog/articles/index.ts), so old posts are untouched.
 *
 * Env: SANITY_PROJECT_ID, SANITY_DATASET (default production),
 *      SANITY_READ_TOKEN (only if the dataset is private).
 */
import {mkdir, readFile, writeFile} from 'node:fs/promises'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../content/blog/articles/sanity.generated.json')
const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_READ_TOKEN
const API_VERSION = '2025-01-01'

const QUERY = '*[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current)] | order(datePublished desc)'

const prune = (v) => {
  if (Array.isArray(v)) return v.map(prune)
  if (v && typeof v === 'object') {
    return Object.fromEntries(
      Object.entries(v)
        .filter(([k, x]) => !k.startsWith('_') && x !== null && x !== undefined && x !== '' && !(Array.isArray(x) && x.length === 0))
        .map(([k, x]) => [k, prune(x)]),
    )
  }
  return v
}

const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function cover(d) {
  switch (d.coverStyle) {
    case 'chat':
      return {style: 'chat', messages: (d.coverMessages ?? []).map((m) => ({from: m.from, text: m.text}))}
    case 'stat':
      return {style: 'stat', value: d.coverValue, label: d.coverLabel}
    case 'button':
      return {style: 'button', text: d.coverText, caption: d.coverCaption}
    case 'versus':
      return {
        style: 'versus',
        left: d.coverLeft,
        right: d.coverRight,
        rows: (d.coverRows ?? []).slice(0, 4).map((r) => [r.left, r.right]),
      }
    default:
      return {style: 'type', text: d.coverText || d.title}
  }
}

function figure(f) {
  if (!f?.kind) return undefined
  if (f.kind === 'stats') return {kind: 'stats', caption: f.caption, items: f.stats ?? []}
  if (f.kind === 'bars') return {kind: 'bars', caption: f.caption, items: f.bars ?? []}
  if (f.kind === 'steps') return {kind: 'steps', caption: f.caption, items: f.stepItems ?? []}
  return undefined
}

function table(t) {
  if (!t?.columns?.length) return undefined
  return {
    caption: t.caption,
    columns: t.columns,
    rows: (t.rows ?? []).map((r) => Object.fromEntries(t.columns.map((c, i) => [c.key, r.cells?.[i] ?? ''])))
  }
}

function toArticle(d) {
  const a = {
    slug: d.slug.current,
    category: d.category,
    kind: d.kind,
    title: d.title,
    seoTitle: d.seoTitle,
    description: d.description,
    datePublished: d.datePublished,
    dateModified: d.dateModified || d.datePublished,
    lastChecked: d.lastChecked || d.dateModified || d.datePublished,
    cover: cover(d),
    coverAlt: d.coverAlt,
    intro: d.intro ?? [],
    tldr: d.tldr ?? [],
    sections: (d.sections ?? []).map((s) => ({
      id: s.id || slugify(s.heading),
      heading: s.heading,
      paragraphs: s.paragraphs,
      bullets: s.bullets,
      steps: s.steps,
      table: table(s.table),
      figure: figure(s.figure),
      callout: s.callout,
    })),
    faq: d.faq ?? [],
    sources: d.sources ?? [],
    related: d.related ?? [],
    queries: d.queries ?? [],
    cta: d.cta,
  }
  return prune(a)
}

function problems(a) {
  const p = []
  if (!/^[a-z0-9-]+$/.test(a.slug ?? '')) p.push('bad slug')
  for (const k of ['category', 'kind', 'title', 'description', 'datePublished', 'coverAlt']) if (!a[k]) p.push('missing ' + k)
  if (!a.intro?.length) p.push('missing intro')
  if (!a.sections?.length) p.push('no sections')
  if (!a.faq || a.faq.length < 5) p.push('needs 5+ FAQs')
  if (!a.sources || a.sources.length < 2) p.push('needs 2+ sources')
  if (!a.related || a.related.length !== 3) p.push('needs exactly 3 related slugs')
  return p
}

async function write(list) {
  await mkdir(dirname(OUT), {recursive: true})
  await writeFile(OUT, JSON.stringify(list, null, 2) + '\n')
}

async function main() {
  if (!projectId) {
    console.log('[sanity] SANITY_PROJECT_ID not set, writing no articles.')
    return write([])
  }
  const host = token ? 'api.sanity.io' : 'apicdn.sanity.io'
  const url = 'https://' + projectId + '.' + host + '/v' + API_VERSION + '/data/query/' + dataset + '?perspective=published&query=' + encodeURIComponent(QUERY)
  try {
    const res = await fetch(url, token ? {headers: {Authorization: 'Bearer ' + token}} : undefined)
    if (!res.ok) throw new Error('HTTP ' + res.status)
    const {result} = await res.json()
    const out = []
    for (const d of result ?? []) {
      const a = toArticle(d)
      const bad = problems(a)
      if (bad.length) {
        console.warn('[sanity] skipped "' + (d.slug?.current ?? d._id) + '": ' + bad.join(', '))
        continue
      }
      out.push(a)
    }
    await write(out)
    console.log('[sanity] wrote ' + out.length + ' article(s).')
  } catch (err) {
    console.warn('[sanity] fetch failed (' + err.message + '); keeping previous file if present.')
    try {
      await readFile(OUT, 'utf8')
    } catch {
      await write([])
    }
  }
}

main()
