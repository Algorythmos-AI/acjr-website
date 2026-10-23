# ACJR website — plan (revised: UN-standard quality)

## Context
**African Center for Justice Rights (ACJR)**, also *Centre Africain pour les Droits de la Justice (CADJ)* and *المركز الافريقي للحقوق والعدالة*, is a human-rights association registered in Paris under the 1901 law. It was founded on 25 April 2024 as « Paix et la Transition Démocratique ». New statutes were adopted on 17 Sept 2026, and the prefecture receipt dated 30 Sept 2026 gives RNA n° W751274196. ACJR needs a multi-page website in French, English and Arabic. It should look and work at the level of un.org / news.un.org / ohchr.org: calm, authoritative, accessible, fast and trustworthy. The visual language takes its cue from the ONU Info newsletter in `un-theme/`, tweaked so ACJR is clearly its own brand.

**Source material** (`/Users/samkalaliya/african-centre-ACJR`):
| File | Use |
|---|---|
| `Statuts_modifies_ACJR (1).pdf` | **Main content source.** Covers the preamble and legal references, principles (Art. 4), vision and mission (Art. 5), 6 objectives (Art. 6), UN and African engagement (Art. 7–8), members (Art. 9–10), governance (Art. 11–15), finance (Art. 16–18) and policies (Art. 19–20). |
| `PV_AGE_et_resolution_CADJ (2).pdf`, `Recepisse_MD (1).pdf` | **Reference only.** In the WhatsApp screenshot Sadam asked: *"This is just for reference; please do not publish it."* These files are never copied, linked or quoted. |
| `un-theme/*.jpeg` | Design reference: UN-blue rules and buttons, a charcoal footer with a thin blue top border, a bold serif headline over a clean sans body, and a dark date strip. |

## Non-negotiable rules
1. **No UN emblem, no "United Nations / Nations Unies / ONU" wordmark, and no wording that suggests UN affiliation or endorsement.** Using the emblem without authorisation is prohibited (UNGA res. 92(I)). We borrow palette, typography, spacing and page patterns only. UN mechanisms such as the Human Rights Council, the UPR (Universal Periodic Review) and special procedures are described as things ACJR *engages with*.
2. The PV and the récépissé are not published. The statutes PDF and the president's street address are not published either until the client confirms. The site shows "Paris, France" and a summary of the statutes.
3. The site never presents unverified content as real. Sample news is marked as a draft and excluded from the production build.

## 1. Design system (the "UN standard" layer)

### Colour palette: contrast checked against WCAG 2.2 AA
UN blue `#009EDB` on white is only **3.04:1**, which fails AA for body text. Using it for text or for buttons with small labels is the most common mistake in UN-look-alike sites, so the palette splits blue into roles:

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--blue-500` "UN-spirit blue" | `#009EDB` | Decorative only: 4px top rules, icons, hero accents, focus-ring outer | 5.07:1 on navy |
| `--blue-700` "ACJR blue" (primary) | `#0070AD` | Buttons, links, active nav (was `#0077B8`, which failed AA on the grey and pale-blue bands) | **5.36:1** with white, 4.77:1 on `--blue-50` ✔ |
| `--blue-800` | `#00609A` | Button hover | 6.5:1 ✔ |
| `--navy-900` | `#0B2545` | Utility bar, hero overlay, page-header band | 15.4:1 ✔ |
| `--charcoal` | `#333333` | Footer and date strips (straight from ONU Info) | 12.6:1 ✔ |
| `--ink` | `#222222` | Body text | 14.4:1 on `--grey-50` ✔ |
| `--grey-600` | `#4D4D4D` | Meta text and captions | 8.45:1 ✔ |
| `--grey-50` / `--grey-200` | `#F2F4F7` / `#D9DEE5` | Section bands, borders | – |
| `--ochre-500` "African gold" | `#C8963E` | Accent rules, numerals and the logo detail **on dark backgrounds only** | 5.78:1 on navy ✔ (2.66 on white ✘) |
| `--ochre-700` | `#8F631D` | Ochre text on white or grey (was `#9A6B1F`, 4.24:1 on grey) | 5.29:1 ✔ |
| `--link-on-dark` | `#7FD3F7` | Links in the footer and navy bands | 7.56:1 on charcoal ✔ |

The tokens live in `src/styles/tokens.css`. A unit test (see §6) recomputes every declared foreground/background pair, so no regression can slip in.

### Typography
- **Headlines:** Merriweather 700/900 (serif, the ONU Info headline feel).
- **Body and UI:** Roboto 400/500/700 (the UN digital standard sans).
- **Arabic:** Noto Naskh Arabic for headlines, Noto Sans Arabic for body, line-height 1.8.
- All fonts are self-hosted via `@fontsource` (no Google Fonts call, which avoids a GDPR issue in France). Only the needed weights and subsets (latin, latin-ext, arabic) are loaded, with `font-display: swap` and the two hero fonts preloaded.
- Fluid scale with `clamp()`: H1 40→56px, H2 30→40, H3 22→26, body 18px with 1.6 line-height, small 15px. Line length capped at 70ch.

### Layout and spacing
- Container max 1200px; 12-column CSS grid; 8px spacing scale; side gutters of 16px on mobile and 24px from tablet up.
- Breakpoints: 480 / 768 / 1024 / 1280.
- Only **CSS logical properties** (`margin-inline-start`, `inset-inline-end`, `text-align: start`), so one stylesheet mirrors correctly for Arabic RTL. Directional icons (arrows, chevrons) flip under `[dir=rtl]`.

### UN-pattern component inventory
| Component | Modelled on |
|---|---|
| **Utility bar** (navy, thin): language switcher FR · EN · عربي, "Contact", search later | un.org top bar |
| **Header**: logo lockup, vertical divider, tagline (the ONU Info header), primary nav, 4px `--blue-500` top border | ONU Info |
| **Primary nav** with dropdown panels for About, What we do and Advocacy; mobile drawer with a focus trap, Esc to close and `aria-expanded` | un.org |
| **Breadcrumbs** on every inner page | ohchr.org |
| **Page header band**: navy background, H1, one-line lead, optional ochre rule | ohchr.org |
| **Hero**: full-bleed photo, navy gradient overlay, serif headline, blue CTA | news.un.org |
| **Objective tiles**: 6 numbered tiles, SDG-grid style, each with a custom icon and the colour stripe of its theme | un.org/sdgs |
| **News card**: image, charcoal date strip, serif title, excerpt, blue "Lire la suite" | ONU Info, exact pattern |
| **Full-width CTA button** (solid `--blue-700`, 56px tall, bold) | ONU Info "Lire la suite" |
| **Principle list / accordion** (native `<details>`, no JS) | ohchr.org |
| **Fact strip**: "Founded 2024 · Paris · Loi 1901 · Africa & international" | un.org |
| **Key references panel**: UDHR, ICCPR, ICESCR, African Charter, Geneva Conventions, Rome Statute, CAT, CED, the Declaration on Human Rights Defenders, each linking to its official text | ohchr.org |
| **Footer**: charcoal background, blue top rule, white logo, uppercase legal links, socials, "Association loi 1901 — RNA W751274196" | ONU Info, exact pattern |

Iconography uses a single consistent outline set (Lucide via `astro-icon`, inlined at build time), plus 6 custom objective pictograms in the logo's line style.

Imagery: respectful, licensed photography of African cities, landscapes, people at work and courts (Unsplash/Pexels, with licences recorded in `CREDITS.md`). No images of victims or of suffering. Images get a subtle shared duotone treatment (navy/blue) so the set feels like one family, the way UN photo editorial does.

## 2. Logo (dedicated agent)
I will spawn **one general-purpose agent**, briefed only on the logo, to run in parallel with scaffolding. It writes to `website/public/brand/`.

- **Concept:** an open circular seal. At the centre, the silhouette of Africa with a balanced **scale of justice** whose beam crosses the continent. Around it, two **olive branches** meeting at the bottom and open at the top. This *evokes* the UN wreath without copying it: **no globe, no latitude grid, no polar map**, and the leaf pattern differs from the UN emblem.
- **Colour:** the mark in `--blue-700`, scale pans in `--ochre-500`. Also white, mono-navy and mono-black variants.
- **Lockups:**
  - Horizontal EN: mark | divider | **ACJR** (Roboto 700) over "African Center for Justice Rights".
  - Horizontal FR: same layout with **CADJ** over "Centre Africain pour les Droits de la Justice".
  - Horizontal AR: mirrored, with "المركز الافريقي للحقوق والعدالة". The Arabic must be rendered with real shaping (text converted to outlines from Noto Naskh, never hand-drawn glyphs).
  - Square mark-only version.
- **Deliverables:** optimised SVGs (SVGO, `viewBox`, `<title>`, no embedded raster), `favicon.svg` plus a 32px `favicon.ico`, `apple-touch-icon.png` (180), `og-image-{fr,en,ar}.png` (1200×630), and a one-page `brand/README.md` with clear-space and minimum-size rules (mark ≥ 24px).
- **Quality gate:** before integration I check legibility at 16px, 32px and 400px in the browser pane, plus a side-by-side check against the UN emblem to confirm it is distinct. One revision round is built in.

## 3. Information architecture
URLs are `/{fr|en|ar}/{slug}/` with slugs translated per language (`/fr/qui-sommes-nous/`, `/en/about/`, `/ar/من-نحن/`, the Arabic one encoded and tested). `/` detects `Accept-Language` client-side, falls back to `/fr/`, and includes a `<noscript>` link list.

| # | Page | Content (from the statutes) |
|---|---|---|
| 1 | **Home** | Hero headline drawn from the Vision; mission lead; 6 objective tiles; "How we work" (Document → Analyse → Advocate → Support); principles strip; latest news (hidden while there are 0 published posts); get-involved CTA |
| 2 | **About**: Who we are | Story and continuity (2024 → 2026), Vision and Mission (Art. 5), fact strip |
| 2a | About: Our principles | The 5 principles of Art. 4 |
| 2b | About: Legal framework | Preamble references panel |
| 3 | **What we do** | Overview, plus 6 sub-sections with anchors (Art. 6): documentation under the Istanbul and Minnesota Protocols; legal analysis and strategic litigation; transitional justice; protection of human-rights defenders, lawyers and journalists; vulnerable groups; research and training |
| 4 | **International advocacy** | UN human-rights system (Art. 7: HRC sessions and side events, UPR, special procedures, treaty bodies); African system and international courts (Art. 8); networks |
| 5 | **Governance** | Founders and Executive Bureau: President ABDELRAHIM GREIN Sadam, Secretary-General MAHMUD MOHAMED Hruia, Treasurer EL TAHER AISSA Issam (names exactly as in the statutes; no photos until supplied); General Assembly, Board and Bureau roles (Art. 11–14); volunteer leadership (Art. 15); statutes summary |
| 6 | **Transparency** | Funding sources and independence (Art. 16–17), accounts and audit (Art. 18), internal policies (Art. 20), legal status and RNA number |
| 7 | **News** | Listing (paginated, 9 per page) and article template (ONU Info layout) |
| 8 | **Get involved** | Membership categories and admission (Art. 9–10), volunteering, partnerships, support/donate (a "contact us" placeholder, with no payment code) |
| 9 | **Contact** | Accessible form, email placeholder, "Paris, France", and a **safe-reporting notice** for victims and witnesses: do not send evidence through the form, plus safe-contact advice (in line with Art. 4.5 and Art. 20 on source protection) |
| 10 | **Legal notice** (mentions légales) | Publisher and host, as French law (LCEN) requires |
| 11 | **Privacy policy** | GDPR: form data, no tracking cookies, so **no cookie banner is needed** (privacy-friendly analytics only, if any) |
| 12 | **404** | In each language, with search-style links |

## 4. Content and translation
- **French** is written first, faithful to the statutes but in readable web prose rather than legal articles. Each page notes its Art. reference in a code comment so the client can verify.
- **English** is the legal reference name and gets a professional translation. **Arabic** is in Modern Standard Arabic, using the official name verbatim from the statutes. Both are flagged in the open items for a native-speaker review before launch.
- Every UI string lives in `src/i18n/{fr,en,ar}.ts`, typed against the French keys. A **missing key is a TypeScript build error**, so the site can never show a blank or English label on the Arabic site.
- Page bodies live in content collections (`src/content/pages/{lang}/*.mdx`) with a zod schema (`title`, `description`, `slug`, `translationKey`, `order`). A build check fails if any `translationKey` is missing in one of the 3 languages, so the language switcher can never 404.

## 5. Technical architecture
- **Astro 5** static output, TypeScript strict, no UI framework. About 2 KB of vanilla JS covers the nav drawer, dropdowns and language detection. Everything works without JS except the redirect from `/`, which has a noscript fallback.
- Astro i18n config: `locales: ['fr','en','ar']`, `defaultLocale: 'fr'`, `prefixDefaultLocale: true`, `routing.redirectToDefaultLocale: false`.
- `src/layouts/Base.astro` sets `<html lang dir>`, canonical, `hreflang` alternates plus `x-default`, OG/Twitter meta, JSON-LD `NGO` schema (name, alternateName ×2, address locality Paris, foundingDate 2024-04-25), skip link, and landmarks.
- Components go in `src/components/`: `UtilityBar`, `Header`, `Nav`, `MobileDrawer`, `LangSwitch` (maps to the *same page* via `translationKey`), `Breadcrumbs`, `PageHeader`, `Hero`, `ObjectiveTile`, `NewsCard`, `Button`, `FactStrip`, `ReferencePanel`, `Footer`.
- Images go through `astro:assets` (AVIF/WebP, `srcset`, explicit width and height to prevent layout shift, lazy-loaded below the fold, mandatory `alt` per language enforced by the schema).
- **Contact form:** a static HTML form posting to Formspree, with the endpoint in an env var. It includes a honeypot field, server-side validation by the provider, an accessible inline error summary, a success page per language, and a consent line linking to the privacy policy.
- **Security headers** via `vercel.json`: strict CSP (self plus the Formspree endpoint), HSTS, `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, and frame-ancestors none. No third-party scripts.
- SEO: `@astrojs/sitemap` with i18n alternates, `robots.txt`, per-page title and description (≤ 60 and ≤ 155 characters, checked by the build), print stylesheet.
- Location: `/Users/samkalaliya/african-centre-ACJR/website/` with `git init`. The source PDFs stay outside and are listed in `.gitignore` as a precaution.
- Deploy: a Vercel preview. Production and a custom domain happen only after the user and client approve.

## 6. Robustness and QA (so it ships bug-free)
Automated, and wired into `npm run check`, which must pass before any deploy:
1. `astro check` + `tsc --noEmit`: types and missing i18n keys.
2. **Content-parity script**: every page and every `translationKey` exists in all 3 languages.
3. **Contrast test**: recomputes the token pairs above; fails below 4.5:1 (or 3:1 for large or UI elements).
4. `html-validate` on the built `dist/`.
5. **Link checker** (`linkinator`) on `dist/`, internal and external.
6. **Playwright** smoke tests at 375 / 768 / 1280px, in all 3 languages:
   - every page loads with no console errors;
   - nav and drawer work by keyboard (Tab, Esc);
   - the language switcher keeps you on the same page;
   - `dir=rtl` is present on `/ar/` and the header is visibly mirrored;
   - no horizontal scroll;
   - the contact form shows its validation errors.
7. **axe-core** via Playwright on every page: zero serious or critical violations.
8. **Lighthouse CI**: Performance, Accessibility, Best Practices and SEO all ≥ 95 on Home, About, News article and Contact (mobile profile).
9. **Leak guard**: a test greps `dist/` for "Recepisse", "PV_AGE", "Loeb", "Nations Unies", "United Nations emblem" and for `.pdf` files. Any hit fails the build.

Manual pass in the browser pane:
- Visual review of each template in FR, EN and AR at mobile and desktop widths.
- Arabic typography check (line breaking, numerals, punctuation, mixed Latin names).
- Print preview of one page.
- Tab-only navigation through Home and Contact.

## 7. Build order
1. Scaffold Astro, tokens, fonts, Base layout, i18n routing and RTL, plus the QA tooling (so checks run from day one). **The logo agent starts in parallel.**
2. Header, Footer, Nav and LangSwitch; then the remaining components, each previewed in a hidden `/fr/_styleguide/` page (excluded from the sitemap and noindex).
3. French content for all pages; page templates.
4. English and Arabic content; parity check goes green.
5. Integrate the logo after the quality gate; favicons and OG images.
6. Contact form, legal pages, SEO and security headers, 404.
7. Full `npm run check`, manual pass, fixes, then a Vercel preview URL shared for client review.

## 8. Open items for the client (placeholders until supplied)
- Contact email and phone; social accounts.
- OK to publish the statutes PDF and the street address?
- Real news and activities; founders' photos and bios.
- Donation method.
- Native review of the Arabic and English copy.
- Domain name and host details for the legal notice.
