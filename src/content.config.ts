import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // 'essay' | 'research' | 'log', drives grouping on the homepage.
    kind: z.enum(['essay', 'research', 'log']),
    date: z.string(), // ISO date, e.g. 2026-06-04
    kicker: z.string().optional(),
    standfirst: z.string().optional(),
    // Ordering weight for the homepage "selected research" list (lower first).
    weight: z.number().default(100),
    // External artifacts for research writeups.
    demo: z.string().optional(),
    source: z.string().optional(),
    // Hide from the homepage selected-research list but keep in /writing.
    unlisted: z.boolean().default(false),
  }),
});

export const collections = { writing };
