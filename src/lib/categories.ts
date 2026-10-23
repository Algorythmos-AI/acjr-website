import { ui } from '../i18n/ui';
import type { Lang } from '../i18n/routes';
import type { Article } from './news';

const keys = {
  statement: 'catStatement',
  publication: 'catPublication',
  event: 'catEvent',
  association: 'catAssociation',
} as const;

export function categoryLabel(category: Article['data']['category'], lang: Lang): string {
  return ui[lang][keys[category]];
}
