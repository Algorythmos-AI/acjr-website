import type { Lang } from '../i18n/routes';
import type { Content } from './types';
import { fr } from './fr';
import { en } from './en';
import { ar } from './ar';

export const content: Record<Lang, Content> = { fr, en, ar };
export type { Content } from './types';
