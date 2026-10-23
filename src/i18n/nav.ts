import { content } from '../content';
import { pagePath, parentOf, type Lang, type PageKey } from './routes';
import { ui } from './ui';

export interface NavLink {
  label: string;
  href: string;
  key: PageKey;
}
export interface NavItem extends NavLink {
  children?: NavLink[];
}

/** Primary navigation. Items with children open a dropdown whose first entry is the overview page. */
export function primaryNav(lang: Lang): NavItem[] {
  const c = content[lang];
  const link = (key: PageKey, hash = ''): NavLink => ({ key, label: c.nav[key], href: pagePath(lang, key, hash) });
  const overview = (key: PageKey): NavLink => ({ ...link(key), label: ui[lang].overview });

  return [
    { ...link('about'), children: [overview('about'), link('principles'), link('framework')] },
    {
      ...link('work'),
      children: [overview('work'), ...c.objectives.map((o) => ({ key: 'work' as const, label: o.title, href: pagePath(lang, 'work', o.id) }))],
    },
    link('advocacy'),
    { ...link('governance'), children: [overview('governance'), link('transparency')] },
    link('news'),
    link('involved'),
  ];
}

/** Top-level section a page belongs to, for highlighting the active nav item. */
export function sectionOf(key: PageKey | null): PageKey | null {
  if (!key) return null;
  return parentOf[key] ?? key;
}

/** Breadcrumb trail from home to the current page. */
export function breadcrumbs(lang: Lang, key: PageKey): NavLink[] {
  const c = content[lang];
  const trail: NavLink[] = [{ key: 'home', label: ui[lang].home, href: pagePath(lang, 'home') }];
  const parent = parentOf[key];
  if (parent) trail.push({ key: parent, label: c.nav[parent], href: pagePath(lang, parent) });
  trail.push({ key, label: c.nav[key], href: pagePath(lang, key) });
  return trail;
}
