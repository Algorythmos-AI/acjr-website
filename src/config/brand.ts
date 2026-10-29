import type { Lang } from '../i18n/routes';

/** Lockup files per language with their intrinsic size (from each SVG's viewBox). */
export const lockups: Record<Lang, { src: string; srcWhite: string; width: number; height: number }> = {
  fr: { src: '/brand/lockup-fr.svg', srcWhite: '/brand/lockup-fr-white.svg', width: 801.8, height: 200 },
  en: { src: '/brand/lockup-en.svg', srcWhite: '/brand/lockup-en-white.svg', width: 801.8, height: 200 },
  ar: { src: '/brand/lockup-ar.svg', srcWhite: '/brand/lockup-ar-white.svg', width: 772.9, height: 200 },
};
