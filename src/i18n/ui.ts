import type { Lang } from './routes';

/** Interface strings. French is the source; the other languages must provide every key. */
const fr = {
  skip: 'Aller au contenu principal',
  menu: 'Menu',
  closeMenu: 'Fermer le menu',
  mainNav: 'Navigation principale',
  languageNav: 'Choix de la langue',
  breadcrumb: "Fil d'Ariane",
  home: 'Accueil',
  overview: "Vue d'ensemble",
  contactUs: 'Nous contacter',
  readMore: 'Lire la suite',
  learnMore: 'En savoir plus',
  statutesRef: 'Statuts, art.',
  tagline: 'Justice, droits humains et redevabilité en Afrique',
  footerAbout:
    "Association indépendante de défense des droits humains, régie par la loi du 1er juillet 1901, dont le siège est à Paris.",
  footerExplore: 'Explorer',
  footerOrganisation: "L'association",
  footerLegal: 'Informations légales',
  legalStatus: 'Association loi 1901',
  rnaLabel: 'RNA',
  disclaimer:
    "L'ACJR est une organisation indépendante. Elle n'est affiliée à aucun gouvernement ni à aucune organisation intergouvernementale.",
  copyright: 'Tous droits réservés.',
  externalLink: '(site externe)',
  opensNewTab: "(s'ouvre dans un nouvel onglet)",
  notFoundTitle: 'Page introuvable',
  notFoundText: "La page que vous cherchez n'existe pas ou a été déplacée.",
} as const;

type Strings = { [K in keyof typeof fr]: string };

const en: Strings = {
  skip: 'Skip to main content',
  menu: 'Menu',
  closeMenu: 'Close menu',
  mainNav: 'Main navigation',
  languageNav: 'Choose language',
  breadcrumb: 'Breadcrumb',
  home: 'Home',
  overview: 'Overview',
  contactUs: 'Contact us',
  readMore: 'Read more',
  learnMore: 'Learn more',
  statutesRef: 'Statutes, art.',
  tagline: 'Justice, human rights and accountability in Africa',
  footerAbout:
    'An independent human-rights association governed by the French law of 1 July 1901, based in Paris.',
  footerExplore: 'Explore',
  footerOrganisation: 'The organisation',
  footerLegal: 'Legal information',
  legalStatus: 'Association under the 1901 law',
  rnaLabel: 'RNA',
  disclaimer:
    'ACJR is an independent organisation. It is not affiliated with any government or intergovernmental organisation.',
  copyright: 'All rights reserved.',
  externalLink: '(external site)',
  opensNewTab: '(opens in a new tab)',
  notFoundTitle: 'Page not found',
  notFoundText: 'The page you are looking for does not exist or has moved.',
};

const ar: Strings = {
  skip: 'الانتقال إلى المحتوى الرئيسي',
  menu: 'القائمة',
  closeMenu: 'إغلاق القائمة',
  mainNav: 'التنقل الرئيسي',
  languageNav: 'اختيار اللغة',
  breadcrumb: 'مسار التنقل',
  home: 'الرئيسية',
  overview: 'نظرة عامة',
  contactUs: 'اتصل بنا',
  readMore: 'اقرأ المزيد',
  learnMore: 'اعرف المزيد',
  statutesRef: 'النظام الأساسي، المادة',
  tagline: 'العدالة وحقوق الإنسان والمساءلة في أفريقيا',
  footerAbout:
    'جمعية مستقلة للدفاع عن حقوق الإنسان، يحكمها القانون الفرنسي الصادر في 1 يوليو 1901، ومقرها باريس.',
  footerExplore: 'استكشف',
  footerOrganisation: 'الجمعية',
  footerLegal: 'معلومات قانونية',
  legalStatus: 'جمعية خاضعة لقانون 1901',
  rnaLabel: 'رقم السجل الوطني للجمعيات',
  disclaimer:
    'المركز منظمة مستقلة، وهو غير تابع لأي حكومة أو منظمة حكومية دولية.',
  copyright: 'جميع الحقوق محفوظة.',
  externalLink: '(موقع خارجي)',
  opensNewTab: '(يفتح في علامة تبويب جديدة)',
  notFoundTitle: 'الصفحة غير موجودة',
  notFoundText: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
};

export const ui: Record<Lang, Strings> = { fr, en, ar };
