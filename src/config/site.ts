/**
 * Organisation facts used across the site. Values set to null are not yet supplied by ACJR
 * and are rendered as "to be published shortly" — never replace them with invented data.
 */
const rawEndpoint = (import.meta.env?.PUBLIC_FORMSPREE_ENDPOINT as string | undefined) ?? '';

export const site = {
  legalName: 'African Center for Justice Rights',
  acronym: 'ACJR',
  nameFr: 'Centre Africain pour les Droits de la Justice',
  acronymFr: 'CADJ',
  nameAr: 'المركز الافريقي للحقوق والعدالة',
  rna: 'W751274196',
  foundingDate: '2024-04-25',
  statutesDate: '2026-09-17',
  city: 'Paris',
  country: 'France',
  /** Publishable postal address (registered office or domiciliation), required by LCEN art. 1-1 I (formerly art. 6 III). */
  postalAddress: null as string | null,
  email: null as string | null,
  phone: null as string | null,
  social: [] as { name: string; url: string }[],
  /** Hosting provider for the legal notice (LCEN). Address from vercel.com/legal/privacy-policy. */
  host: {
    name: 'Vercel Inc.',
    address: '440 N Barranca Avenue #4133, Covina, CA 91723',
    /** Not published by Vercel; to be confirmed before launch. */
    phone: null as string | null,
    url: 'vercel.com',
  },
  // The CSP only allows formspree.io, so anything else is treated as unset.
  formEndpoint: /^https:\/\/formspree\.io\/f\/[A-Za-z0-9_-]+$/.test(rawEndpoint) ? rawEndpoint : null,
};

/** Shown where a legally required detail has not yet been supplied by ACJR. */
export const pendingText = {
  fr: 'à communiquer prochainement',
  en: 'to be published shortly',
  ar: 'يُعلَن عنه قريباً',
} as const;

/** Wraps Latin-script text in Unicode isolates so it keeps its order inside Arabic sentences. */
export const isolate = (text: string) => `⁨${text}⁩`;
