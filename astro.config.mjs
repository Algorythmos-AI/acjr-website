// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Final domain is not decided yet; set SITE_URL in the deploy environment.
const site = process.env.SITE_URL ?? 'https://acjr.vercel.app';

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/_styleguide/'),
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr-FR', en: 'en', ar: 'ar' },
      },
    }),
  ],
});
