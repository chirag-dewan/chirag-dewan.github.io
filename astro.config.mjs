import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Static site for GitHub Pages, served at the apex domain (CNAME: www.cdewan.me).
export default defineConfig({
  site: 'https://www.cdewan.me',
  trailingSlash: 'ignore',
  integrations: [mdx()],
  build: { format: 'directory' },
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: 'github-light', wrap: false },
  },
});
