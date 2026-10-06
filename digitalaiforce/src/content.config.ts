import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    /** Optional shorter <title> for search results (defaults to title + brand). */
    seoTitle: z.string().optional(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    /** Slug of the service this article supports (for the end-of-post CTA). */
    relatedService: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
