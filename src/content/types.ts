import type { PageKey } from '../i18n/routes';

/**
 * Shape of every language's page content. French (fr.ts) is written first; en.ts and ar.ts
 * must satisfy the same type, so a missing section is a build error rather than a blank page.
 * Fixed-length tuples keep the number of objectives, principles, etc. identical across languages.
 */

export type Pair = { title: string; text: string };
export type Six<T> = [T, T, T, T, T, T];
export type Five<T> = [T, T, T, T, T];
export type Four<T> = [T, T, T, T];
export type Three<T> = [T, T, T];

export type ObjectiveId = 'documentation' | 'litigation' | 'transitional' | 'defenders' | 'vulnerable' | 'research';

export interface Objective {
  id: ObjectiveId;
  title: string;
  /** One sentence for the home-page tile. */
  short: string;
  body: string[];
  points: string[];
}

export interface Reference {
  name: string;
  year: string;
  note: string;
  url: string;
}

export interface Content {
  meta: Record<PageKey, { title: string; description: string; lead: string }>;
  /** Short labels for navigation, breadcrumbs and the footer. */
  nav: Record<PageKey, string>;
  facts: Four<{ value: string; label: string }>;
  home: {
    eyebrow: string;
    heroTitle: string;
    heroLead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    missionEyebrow: string;
    missionTitle: string;
    missionText: string[];
    objectivesTitle: string;
    objectivesLead: string;
    howTitle: string;
    howLead: string;
    how: Four<Pair>;
    principlesTitle: string;
    principlesLead: string;
    advocacyTitle: string;
    advocacyText: string;
    involvedTitle: string;
    involvedText: string;
    involvedCta: string;
  };
  objectives: Six<Objective>;
  about: {
    storyTitle: string;
    story: string[];
    timeline: Three<{ date: string; title: string; text: string }>;
    visionTitle: string;
    vision: string;
    missionTitle: string;
    mission: string[];
    namesTitle: string;
    namesText: string;
    nextTitle: string;
  };
  principles: { intro: string; items: Five<Pair> };
  framework: {
    intro: string[];
    referencesTitle: string;
    references: Reference[];
    lawTitle: string;
    law: string[];
    protocolsTitle: string;
    protocols: Pair[];
  };
  work: { intro: string[]; methodTitle: string; method: string[]; pointsTitle: string };
  advocacy: {
    intro: string[];
    unTitle: string;
    unLead: string;
    un: Four<Pair>;
    africaTitle: string;
    africaLead: string;
    africa: Three<Pair>;
    networksTitle: string;
    networks: string[];
    note: string;
  };
  governance: {
    intro: string[];
    bureauTitle: string;
    bureauLead: string;
    bureau: Three<{ name: string; role: string }>;
    bodiesTitle: string;
    bodies: Three<Pair>;
    volunteerTitle: string;
    volunteer: string[];
    statutesTitle: string;
    statutes: string[];
    statutesNote: string;
  };
  transparency: {
    intro: string[];
    statusTitle: string;
    status: { label: string; value: string }[];
    fundingTitle: string;
    funding: string[];
    fundingSources: string[];
    independenceTitle: string;
    independence: string[];
    accountsTitle: string;
    accounts: string[];
    policiesTitle: string;
    policies: Pair[];
  };
  news: { emptyTitle: string; emptyText: string; followText: string };
  involved: {
    intro: string[];
    membershipTitle: string;
    membershipLead: string;
    categories: Three<Pair>;
    admissionTitle: string;
    admission: string[];
    ways: Three<Pair & { cta: string }>;
    supportNote: string;
  };
  contact: {
    intro: string;
    safetyTitle: string;
    safety: string[];
    formTitle: string;
    fields: { name: string; email: string; subject: string; message: string; consent: string };
    subjects: string[];
    required: string;
    submit: string;
    sending: string;
    errorSummary: string;
    errors: { name: string; email: string; message: string; consent: string };
    success: string;
    failure: string;
    inactive: string;
    privacyLink: string;
    locationTitle: string;
    location: string;
    emailTitle: string;
    emailPending: string;
  };
  legal: { sections: { title: string; body: string[] }[] };
  privacy: { updated: string; sections: { title: string; body: string[] }[] };
}
