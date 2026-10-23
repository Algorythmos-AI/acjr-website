// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import frenchTypography from './src/integrations/french-typography.mjs';

// Final domain is not decided yet; set SITE_URL in the deploy environment.
const site = process.env.SITE_URL ?? 'https://acjr-website.vercel.app';

export default defineConfig({
  site,
  trailingSlash: 'always',
  // Inlined CSS removes render-blocking requests; the CSP below hashes it.
  build: { format: 'directory', inlineStylesheets: 'always' },
  security: {
    // Emits a CSP <meta> with hashes for every inline script and style. Header-only
    // directives (frame-ancestors, HSTS…) are set in vercel.json.
    csp: {
      algorithm: 'SHA-256',
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self' https://formspree.io",
        "form-action 'self' https://formspree.io",
        "base-uri 'self'",
        "object-src 'none'",
      ],
    },
  },
  markdown: { syntaxHighlight: false },
  integrations: [
    frenchTypography(),
    sitemap({
      filter: (page) => !page.includes('/_styleguide/'),
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr-FR', en: 'en', ar: 'ar' },
      },
    }),
  ],
});
