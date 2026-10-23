# ACJR website

The website of the **African Center for Justice Rights (ACJR)**. In French it is the *Centre Africain pour les Droits de la Justice (CADJ)*, and in Arabic *المركز الافريقي للحقوق والعدالة*. ACJR is a Paris-based human-rights association under the French law of 1901.

The site is static, built with Astro, and published in French, English and Arabic (right-to-left). See `PLAN.md` for the design and the information architecture, and `CONTENT-REVIEW.md` for what still needs the client's input.

## Getting started

```sh
npm ci
npm run dev            # http://localhost:4321/fr/
npm run build          # production build in dist/ (drafts excluded)
npm run build:drafts   # build in dist-drafts/ that includes draft news
npm run build:fixtures # test-only build in dist-fixtures/ with generated news (pagination, hreflang)
```

Requires Node 22.22 or later in the 22.x line (see `.nvmrc`).

## Where things live

| Path | What |
|---|---|
| `src/content/{fr,en,ar}.ts` | All page copy. French is the source. The types in `src/content/types.ts` force every language to provide every section. |
| `src/i18n/ui.ts`, `src/i18n/routes.ts` | Interface strings, and the URL slugs for each language |
| `src/news/{fr,en,ar}/*.md` | News articles. One `translationKey` links the three language versions. |
| `src/views/`, `src/components/`, `src/layouts/` | Page templates and components |
| `src/styles/tokens.css` | Colour, type and spacing tokens (contrast-checked) |
| `public/brand/` | Logo files served by the site. Regenerate with `scripts/brand/`. |
| `docs/brand/README.md` | Brand guide: colours, clear space, minimum sizes. Kept out of `public/`. |
| `docs/` | Source statutes and design references. **Never served.** |

### Publishing a news article
1. Add `src/news/fr/<slug>.md`, `src/news/en/<slug>.md` and `src/news/ar/<slug>.md`, all with the same `translationKey`.
2. Keep `draft: true` while the article is under review. Preview it with `npm run build:drafts`.
3. Set `draft: false` to publish. The home page shows the latest three articles automatically.

## Quality gate

`npm run check` must pass before every merge. CI runs it on each pull request. It runs:

1. `astro check`: types, including missing translations
2. content parity across the three languages, including news
3. WCAG contrast on every token pair
4. the production, drafts and fixtures builds
5. the leak guard: no PV, récépissé, `docs/` content, documents, the street address, draft markers or UN wordmark in `dist/`
6. every inline script and style has its hash in the page's CSP
7. `html-validate` on all three builds
8. the internal link check
9. Playwright + axe-core at 375, 768 and 1280 px
10. Lighthouse in the mobile profile, which must score ≥ 95 in every category

To run the browser tests against a locally installed Chromium, set `PW_CHROMIUM=/path/to/chrome` for Playwright and `CHROME_PATH=/path/to/chrome` for Lighthouse.

## Configuration

Copy `.env.example` to `.env`:
- `SITE_URL`: the public URL, used for canonical links, hreflang and the sitemap.
- `PUBLIC_FORMSPREE_ENDPOINT`: the contact form endpoint, `https://formspree.io/f/…` (anything else is ignored, since the CSP allows only formspree.io). While it is unset, the form is disabled and shows a notice.

Security headers are in `vercel.json`, which also runs the leak guard as part of the Vercel build, so a leaky build cannot deploy. Astro adds a hash-based CSP to every page; hand-written inline scripts live in `src/config/inline-scripts.mjs` so their hashes are added automatically.

## Hard rules

- **No UN emblem or wordmark**, and no wording that suggests UN affiliation.
- **Never publish** the PV d'AGE, the récépissé, the statutes PDF or the street address (unless the client approves).
- **No unverified content:** sample news stays `draft: true`.
