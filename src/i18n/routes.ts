export const languages = ['fr', 'en', 'ar'] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = 'fr';

export const langMeta: Record<Lang, { label: string; short: string; dir: 'ltr' | 'rtl'; hreflang: string; ogLocale: string }> = {
  fr: { label: 'Français', short: 'FR', dir: 'ltr', hreflang: 'fr', ogLocale: 'fr_FR' },
  en: { label: 'English', short: 'EN', dir: 'ltr', hreflang: 'en', ogLocale: 'en_GB' },
  ar: { label: 'العربية', short: 'عربي', dir: 'rtl', hreflang: 'ar', ogLocale: 'ar_AR' },
};

export const pageKeys = [
  'home', 'about', 'principles', 'framework', 'work', 'advocacy',
  'governance', 'transparency', 'news', 'involved', 'contact', 'legal', 'privacy',
] as const;
export type PageKey = (typeof pageKeys)[number];

// Arabic pages use the English slugs: ASCII URLs are safer to share, log and link-check.
const enSlugs: Record<PageKey, string> = {
  home: '',
  about: 'about',
  principles: 'about/principles',
  framework: 'about/legal-framework',
  work: 'what-we-do',
  advocacy: 'advocacy',
  governance: 'governance',
  transparency: 'transparency',
  news: 'news',
  involved: 'get-involved',
  contact: 'contact',
  legal: 'legal-notice',
  privacy: 'privacy',
};

export const slugs: Record<Lang, Record<PageKey, string>> = {
  fr: {
    home: '',
    about: 'qui-sommes-nous',
    principles: 'qui-sommes-nous/principes',
    framework: 'qui-sommes-nous/cadre-juridique',
    work: 'nos-actions',
    advocacy: 'plaidoyer-international',
    governance: 'gouvernance',
    transparency: 'transparence',
    news: 'actualites',
    involved: 'agir',
    contact: 'contact',
    legal: 'mentions-legales',
    privacy: 'confidentialite',
  },
  en: enSlugs,
  ar: enSlugs,
};

/** Parent page used for breadcrumbs and active-nav highlighting. */
export const parentOf: Partial<Record<PageKey, PageKey>> = {
  principles: 'about',
  framework: 'about',
  transparency: 'governance',
};

export function pagePath(lang: Lang, key: PageKey, hash = ''): string {
  const slug = slugs[lang][key];
  return `/${lang}/${slug ? `${slug}/` : ''}${hash ? `#${hash}` : ''}`;
}

export function newsPath(lang: Lang, articleSlug: string): string {
  return `${pagePath(lang, 'news')}${articleSlug}/`;
}

export function isLang(value: string | undefined): value is Lang {
  return languages.includes(value as Lang);
}
