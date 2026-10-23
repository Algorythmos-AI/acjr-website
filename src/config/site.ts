/**
 * Organisation facts used across the site. Values set to null are not yet supplied by ACJR
 * and are simply not rendered — never replace them with invented data.
 */
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
  email: null as string | null,
  phone: null as string | null,
  social: [] as { name: string; url: string }[],
  /** Hosting provider details for the legal notice (LCEN). */
  host: {
    name: 'Vercel Inc.',
    address: '440 N Barranca Ave #4133, Covina, CA 91723, USA',
    url: 'https://vercel.com',
  },
  formEndpoint: (import.meta.env.PUBLIC_FORMSPREE_ENDPOINT as string | undefined) || null,
};
