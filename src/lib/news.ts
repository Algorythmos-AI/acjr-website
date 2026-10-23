import { getCollection, type CollectionEntry } from 'astro:content';
import { languages, newsPath, pagePath, type Lang } from '../i18n/routes';

export type Article = CollectionEntry<'news'>;
export const PAGE_SIZE = 9;

/** Drafts are visible only when SHOW_DRAFTS=1, so production never ships sample content. */
export const showDrafts = process.env['SHOW_DRAFTS'] === '1';

/** The article's URL slug is its file name, e.g. src/news/fr/nouveaux-statuts.md → nouveaux-statuts. */
export const articleSlug = (a: Article) => a.id.split('/').slice(1).join('/');
export const articleLang = (a: Article) => a.id.split('/')[0] as Lang;

export async function allArticles(): Promise<Article[]> {
  const entries = await getCollection('news', (e) => showDrafts || !e.data.draft);
  // Newest first; same-day articles fall back to their id so the order is stable across builds.
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
}

export async function articlesFor(lang: Lang): Promise<Article[]> {
  return (await allArticles()).filter((a) => articleLang(a) === lang);
}

export function newsPagePath(lang: Lang, page: number): string {
  return page <= 1 ? pagePath(lang, 'news') : `${pagePath(lang, 'news')}page/${page}/`;
}

/** Real translations of this article only, for hreflang. Missing languages are left out. */
export function articleTranslations(article: Article, all: Article[]): Partial<Record<Lang, string>> {
  const out: Partial<Record<Lang, string>> = {};
  for (const l of languages) {
    const match = all.find((a) => articleLang(a) === l && a.data.translationKey === article.data.translationKey);
    if (match) out[l] = newsPath(l, articleSlug(match));
  }
  return out;
}

/** Where each language switcher link should go for this article: its translation, or the news listing. */
export function articleAlternates(article: Article, all: Article[]): Record<Lang, string> {
  const out = {} as Record<Lang, string>;
  for (const l of languages) {
    const match = all.find((a) => articleLang(a) === l && a.data.translationKey === article.data.translationKey);
    out[l] = match ? newsPath(l, articleSlug(match)) : pagePath(l, 'news');
  }
  return out;
}

const locales: Record<Lang, string> = { fr: 'fr-FR', en: 'en-GB', ar: 'ar-u-nu-latn' };
export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(locales[lang], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
}
