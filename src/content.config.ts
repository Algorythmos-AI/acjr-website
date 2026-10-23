import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * News articles live in src/news/{lang}/{slug}.md. The same `translationKey` links the three
 * language versions of one article. Articles with `draft: true` are only built when
 * SHOW_DRAFTS=1 (local review and the drafts test build), never in production.
 */
const news = defineCollection({
  // NEWS_DIR points the fixtures test build at generated articles (scripts/make-news-fixtures.mjs).
  loader: glob({ pattern: '**/*.md', base: process.env['NEWS_DIR'] ?? './src/news' }),
  schema: z.object({
    title: z.string().max(110),
    description: z.string().max(160),
    date: z.coerce.date(),
    translationKey: z.string(),
    category: z.enum(['statement', 'publication', 'event', 'association']),
    draft: z.boolean().default(false),
  }),
});

export const collections = { news };
