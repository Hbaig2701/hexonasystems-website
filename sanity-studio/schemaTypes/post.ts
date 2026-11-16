import {defineType, defineField, defineArrayMember} from 'sanity'

/**
 * One Sanity document = one Article in content/blog/types.ts.
 * Field names match that type so scripts/sync-sanity.mjs can map them 1:1.
 * Writing rules live in content/blog/README.md; blog.test.ts is the hard gate.
 */

const BANNED =
  /[–—]|\b(delve|landscape|seamless(ly)?|robust|unlock|leverage|crucial|pivotal|elevate|empower|journey|showcase|enhance|game-changer|revolutionize|cutting-edge|ultimately)\b|in today's|fast-paced|it's worth noting|here's why|here's how|here's the thing|let's dive|in conclusion|not just|whether you're/i

// Soft check while writing. npm test in the site repo is the real gate.
const clean = (Rule: any) =>
  Rule.custom((v?: string) =>
    v && BANNED.test(v) ? 'Contains a dash or banned word (see content/blog/README.md)' : true,
  ).warning()

const text = (name: string, title: string, rows = 3) =>
  defineField({name, title, type: 'text', rows, validation: clean})

export const post = defineType({
  name: 'post',
  title: 'Blog article',
  type: 'document',
  groups: [
    {name: 'meta', title: 'Meta', default: true},
    {name: 'body', title: 'Body'},
    {name: 'proof', title: 'FAQ and sources'},
    {name: 'cover', title: 'Cover'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title (H1)',
      type: 'string',
      group: 'meta',
      description: 'Sentence case, phrased the way people search.',
      validation: (R) => R.required().max(90),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'meta',
      options: {source: 'title', maxLength: 80},
      description: 'Becomes /blog/<slug>. Must not match an existing article.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          {title: 'Guides', value: 'guides'},
          {title: 'Costs & comparisons', value: 'costs'},
          {title: 'Playbooks', value: 'playbooks'},
          {title: 'Business value', value: 'value'},
          {title: 'AI news', value: 'news'},
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Kind label',
      type: 'string',
      group: 'meta',
      options: {list: ['Guide', 'Comparison', 'Playbook', 'News', 'Analysis']},
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      group: 'meta',
      description: 'Max 43 characters. The site adds " · Hexona Systems".',
      validation: (R) => R.max(43),
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      group: 'meta',
      description: '120 to 160 characters.',
      validation: (R) => R.required().min(120).max(160),
    }),
    defineField({name: 'datePublished', type: 'date', group: 'meta', validation: (R) => R.required()}),
    defineField({name: 'dateModified', type: 'date', group: 'meta', validation: (R) => R.required()}),
    defineField({
      name: 'lastChecked',
      type: 'date',
      group: 'meta',
      description: 'The day every fact and price was last checked against its source.',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'queries',
      title: 'Target searches',
      type: 'array',
      of: [{type: 'string'}],
      group: 'meta',
      description: 'Not shown on the page. Used for planning and reporting.',
    }),

    defineField({
      name: 'intro',
      type: 'array',
      of: [{type: 'text', rows: 3}],
      group: 'body',
      description: 'The answer in the first two sentences. Then one or two short paragraphs.',
      validation: (R) => R.required().min(1),
    }),
    defineField({
      name: 'tldr',
      title: 'TL;DR',
      type: 'array',
      of: [{type: 'string'}],
      group: 'body',
      validation: (R) => R.min(3).max(5),
    }),
    defineField({
      name: 'sections',
      type: 'array',
      group: 'body',
      validation: (R) => R.required().min(3),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'section',
          preview: {select: {title: 'heading'}},
          fields: [
            defineField({name: 'heading', type: 'string', validation: (R) => R.required()}),
            defineField({name: 'id', type: 'string', description: 'Optional anchor. Defaults to the heading.'}),
            defineField({name: 'paragraphs', type: 'array', of: [{type: 'text', rows: 4}]}),
            defineField({name: 'bullets', type: 'array', of: [{type: 'string'}]}),
            defineField({
              name: 'steps',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'title', type: 'string'},
                    {name: 'detail', type: 'text', rows: 3},
                  ],
                  preview: {select: {title: 'title'}},
                },
              ],
            }),
            defineField({
              name: 'table',
              type: 'object',
              fields: [
                {name: 'caption', type: 'string'},
                {
                  name: 'columns',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {name: 'key', type: 'string', description: 'Short id, e.g. price'},
                        {name: 'label', type: 'string'},
                      ],
                      preview: {select: {title: 'label'}},
                    },
                  ],
                },
                {
                  name: 'rows',
                  type: 'array',
                  description: 'Each row: one cell per column, in column order.',
                  of: [
                    {
                      type: 'object',
                      fields: [{name: 'cells', type: 'array', of: [{type: 'string'}]}],
                      preview: {select: {title: 'cells.0'}},
                    },
                  ],
                },
              ],
            }),
            defineField({
              name: 'figure',
              type: 'object',
              description: 'Optional "at a glance" graphic.',
              fields: [
                {
                  name: 'kind',
                  type: 'string',
                  options: {list: ['stats', 'bars', 'steps']},
                },
                {name: 'caption', type: 'string'},
                {
                  name: 'stats',
                  title: 'Stats (kind = stats)',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {name: 'value', type: 'string'},
                        {name: 'label', type: 'string'},
                      ],
                      preview: {select: {title: 'value', subtitle: 'label'}},
                    },
                  ],
                },
                {
                  name: 'bars',
                  title: 'Bars (kind = bars)',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {name: 'label', type: 'string'},
                        {name: 'value', type: 'number'},
                        {name: 'display', type: 'string'},
                      ],
                      preview: {select: {title: 'label', subtitle: 'display'}},
                    },
                  ],
                },
                {name: 'stepItems', title: 'Steps (kind = steps)', type: 'array', of: [{type: 'string'}]},
              ],
            }),
            text('callout', 'Callout (caveat or rule of thumb)', 2),
          ],
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Closing call to action',
      type: 'object',
      group: 'body',
      description: 'Optional. Say we will help. Never promise a ranking or result.',
      fields: [
        {name: 'title', type: 'string'},
        {name: 'text', type: 'text', rows: 3},
      ],
    }),

    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      group: 'proof',
      description: '5 to 8. Answers must stand alone. They become FAQPage schema.',
      validation: (R) => R.required().min(5).max(8),
      of: [
        {
          type: 'object',
          fields: [
            {name: 'question', type: 'string', validation: (R: any) => R.required()},
            {name: 'answer', type: 'text', rows: 3, validation: (R: any) => R.required()},
          ],
          preview: {select: {title: 'question'}},
        },
      ],
    }),
    defineField({
      name: 'sources',
      type: 'array',
      group: 'proof',
      description: 'At least 2. Primary sources. Note what was used and the date read.',
      validation: (R) => R.required().min(2),
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string', validation: (R: any) => R.required()},
            {name: 'url', type: 'url', validation: (R: any) => R.required()},
            {name: 'note', type: 'string', description: 'e.g. Pricing page, read Nov 6, 2026'},
          ],
          preview: {select: {title: 'label', subtitle: 'note'}},
        },
      ],
    }),
    defineField({
      name: 'related',
      title: 'Related article slugs',
      type: 'array',
      of: [{type: 'string'}],
      group: 'proof',
      description: 'Exactly 3 slugs of existing articles (without /blog/).',
      validation: (R) => R.required().length(3),
    }),

    defineField({
      name: 'coverStyle',
      title: 'Cover style',
      type: 'string',
      group: 'cover',
      options: {list: ['chat', 'stat', 'versus', 'button', 'type']},
      initialValue: 'type',
      validation: (R) => R.required(),
    }),
    defineField({name: 'coverAlt', type: 'string', group: 'cover', description: 'Third person: what the cover shows.', validation: (R) => R.required()}),
    defineField({name: 'coverText', title: 'Text (type, button)', type: 'string', group: 'cover'}),
    defineField({name: 'coverCaption', title: 'Caption (button)', type: 'string', group: 'cover'}),
    defineField({name: 'coverValue', title: 'Value (stat)', type: 'string', group: 'cover'}),
    defineField({name: 'coverLabel', title: 'Label (stat)', type: 'string', group: 'cover'}),
    defineField({
      name: 'coverMessages',
      title: 'Messages (chat)',
      type: 'array',
      group: 'cover',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'from', type: 'string', options: {list: ['them', 'ai']}},
            {name: 'text', type: 'string'},
          ],
          preview: {select: {title: 'text', subtitle: 'from'}},
        },
      ],
    }),
    defineField({name: 'coverLeft', title: 'Left heading (versus)', type: 'string', group: 'cover'}),
    defineField({name: 'coverRight', title: 'Right heading (versus)', type: 'string', group: 'cover'}),
    defineField({
      name: 'coverRows',
      title: 'Rows (versus, up to 4)',
      type: 'array',
      group: 'cover',
      validation: (R) => R.max(4),
      of: [
        {
          type: 'object',
          fields: [
            {name: 'left', type: 'string'},
            {name: 'right', type: 'string'},
          ],
          preview: {select: {title: 'left', subtitle: 'right'}},
        },
      ],
    }),
  ],
  orderings: [{title: 'Newest first', name: 'dateDesc', by: [{field: 'datePublished', direction: 'desc'}]}],
  preview: {select: {title: 'title', subtitle: 'category'}},
})
