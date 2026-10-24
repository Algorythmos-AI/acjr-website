import type { Lang } from '../i18n/routes';

/**
 * Licensed photos, keyed by file name without extension (src/assets/photos/<key>.jpg).
 * There are none yet: until a photo is added, <Media> shows its line illustration instead.
 * Every photo needs alt text in all three languages and a row in CREDITS.md naming the file;
 * scripts/check-parity.mjs fails the build otherwise. Never use images of victims or of suffering.
 */
export interface Photo {
  alt: Record<Lang, string>;
}

export const photos: Record<string, Photo> = {};
