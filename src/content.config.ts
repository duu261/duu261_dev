import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tag: z.enum(['java', 'ai-workflow', 'linux', 'brse', 'hardware']),
    hook: z.string(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    role: z.enum(['team project', 'daily driver', 'hardware']),
    stack: z.array(z.string()),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    order: z.number(),
  }),
});

export const collections = { blog, projects };
