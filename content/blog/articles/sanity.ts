import type {Article} from '../types'
// Written by scripts/sync-sanity.mjs before dev, test and build. Committed as [] so imports always resolve.
import generated from './sanity.generated.json'

/** Articles authored in the Hexona Sanity dataset. Never edit by hand. */
const SANITY_ARTICLES = generated as unknown as Article[]

export default SANITY_ARTICLES
