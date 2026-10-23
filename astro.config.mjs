// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import frenchTypography from './src/integrations/french-typography.mjs';
import { createHash } from 'node:crypto';
import { jsClassScript } from './src/config/inline-scripts.mjs';

/** @param {string} text @returns {`sha256-${string}`} */
const sha256 = (text) => `sha256-${createHash('sha256').update(text).digest('base64')}`;

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
      // Hand-written is:inline scripts are not hashed by Astro, so their hashes are added here.
      scriptDirective: { hashes: [sha256(jsClassScript)] },
    },
  },
  markdown: { syntaxHighlight: false },
  integrations: [
    frenchTypography(),
    // No sitemap i18n option: it assumes the same slug in every language, which is wrong here.
    // Each page declares its real alternates with <link rel="alternate" hreflang>.
    // The root language chooser is left out because it is not a canonical page.
    sitemap({
      filter: (page) => new URL(page).pathname !== '/' && !page.includes('/_styleguide/'),
    }),
  ],
});
