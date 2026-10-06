// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Canonical production URL — used for canonical tags, Open Graph URLs and the sitemap.
  site: 'https://digitalaiforce.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  // Prefetch internal links on hover/focus so page changes feel instant.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
