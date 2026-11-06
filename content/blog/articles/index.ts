/**
 * Every article file, registered here. Add the import and the entry; the
 * route, hub, category page, sitemap, RSS feed, llms.txt and cover image all
 * pick it up from content/blog/index.ts.
 *
 * batch-*.ts files exist so several writers can register articles at the same
 * time without editing the same file. New articles can go in any batch file or
 * directly in the list below.
 */

import type { Article } from '../types';
import whatIsAnAiAgent from './what-is-an-ai-agent';
import batch1 from './batch-1';
import batch2 from './batch-2';
import batch3 from './batch-3';
import batch4 from './batch-4';
import batch5 from './batch-5';
import batch6 from './batch-6';
import batch7 from './batch-7';
import batch8 from './batch-8';

export const ARTICLE_FILES: Article[] = [
  whatIsAnAiAgent,
  ...batch1,
  ...batch2,
  ...batch3,
  ...batch4,
  ...batch5,
  ...batch6,
  ...batch7,
  ...batch8,
];
