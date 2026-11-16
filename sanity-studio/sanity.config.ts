import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

// Project 3uamydx4 (Hexona Systems Blog) is a separate project from hamzaautomates.com.
// Do not reuse the hamzaautomates.com project or dataset.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '3uamydx4'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'hexona-blog',
  title: 'Hexona Systems Blog',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {types: schemaTypes},
})
