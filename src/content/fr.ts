import type { Content } from './types';
import { site, pendingText } from '../config/site.ts';

/** True once ACJR can actually be reached (an email or a live form). */
const canContact = Boolean(site.email || site.formEndpoint);
const p = pendingText.fr;

/*
 * French source content. Faithful to the statutes adopted on 17 September 2026,
 * rewritten as web prose. Article references are noted so the text can be checked.
 */
export const fr: Content = {
  meta: {
    home: {
      title: 'Justice et droits humains en Afrique',
      description:
        'L’ACJR a pour mission de documenter les violations des droits humains, de soutenir les victimes et de plaider pour la justice et la redevabilité en Afrique.',
      lead: '',
    },
    about: {
      title: 'Qui sommes-nous',
      description: 'Histoire, vision et mission de l’African Center for Justice Rights (ACJR), association loi 1901 basée à Paris.',
      lead: 'Une association indépendante, fondée à Paris, au service de la justice et de la dignité humaine en Afrique.',
    },
    principles: {
      title: 'Nos principes',
      description: "Les cinq principes d'action de l'ACJR : indépendance, universalité des droits, impartialité, non-discrimination et approche centrée sur les victimes.",
      lead: 'Cinq principes, fixés par nos statuts, encadrent chacune de nos actions.',
    },
    framework: {
      title: 'Cadre juridique',
      description: "Les instruments internationaux et africains de droits humains sur lesquels se fonde l'action de l'ACJR.",
      lead: 'Notre travail repose sur le droit international des droits humains, le droit humanitaire et le droit pénal international.',
    },
    work: {
      title: 'Nos actions',
      description: "Documentation, analyse juridique, justice transitionnelle, protection des défenseurs, groupes vulnérables, recherche et formation.",
      lead: 'Six domaines d’action, définis par nos statuts, pour faire progresser la justice et la redevabilité.',
    },
    advocacy: {
      title: 'Plaidoyer international',
      description: 'Comment l’ACJR entend porter la voix des victimes auprès des mécanismes onusiens et africains de protection des droits humains.',
      lead: 'Nous entendons porter les faits documentés devant les mécanismes internationaux et régionaux de protection des droits humains.',
    },
    governance: {
      title: 'Gouvernance',
      description: "Bureau exécutif, assemblée générale et conseil d'administration : l'organisation démocratique de l'ACJR.",
      lead: 'Une gouvernance démocratique et bénévole, définie par nos statuts.',
    },
    transparency: {
      title: 'Transparence',
      description: "Statut juridique, sources de financement, indépendance, comptes et politiques internes de l'ACJR.",
      lead: 'Notre crédibilité repose sur notre indépendance et sur la transparence de notre fonctionnement.',
    },
    news: {
      title: 'Actualités',
      description: "Les dernières actualités, déclarations et publications de l'ACJR.",
      lead: 'Déclarations, publications et activités de l’association.',
    },
    involved: {
      title: 'Agir avec nous',
      description: "Devenir membre, bénévole ou partenaire de l'ACJR, ou soutenir son action.",
      lead: 'Membres, bénévoles et partenaires : chacun peut contribuer à la défense des droits humains.',
    },
    contact: {
      title: 'Contact',
      description: "Contacter l'ACJR, association de défense des droits humains basée à Paris. Conseils de sécurité pour les victimes et témoins.",
      lead: canContact
        ? 'Écrivez-nous. Si vous êtes victime ou témoin, lisez d’abord nos conseils de sécurité.'
        : 'Nos coordonnées seront publiées très prochainement. Si vous êtes victime ou témoin, lisez d’abord nos conseils de sécurité.',
    },
    legal: {
      title: 'Mentions légales',
      description: "Mentions légales du site de l'ACJR : éditeur, directeur de la publication, hébergeur et propriété intellectuelle.",
      lead: 'Informations prévues par la loi pour la confiance dans l’économie numérique (LCEN).',
    },
    privacy: {
      title: 'Politique de confidentialité',
      description: "Comment l'ACJR traite vos données personnelles, conformément au RGPD. Aucun cookie de suivi.",
      lead: 'Nous collectons le strict minimum et ne déposons aucun cookie de suivi.',
    },
    search: {
      title: 'Rechercher',
      description: 'Rechercher dans les pages et les actualités du site de l’ACJR.',
      lead: 'Toutes les pages et actualités du site, en français.',
    },
  },

  nav: {
    home: 'Accueil',
    about: 'Qui sommes-nous',
    principles: 'Nos principes',
    framework: 'Cadre juridique',
    work: 'Nos actions',
    advocacy: 'Plaidoyer',
    governance: 'Gouvernance',
    transparency: 'Transparence',
    news: 'Actualités',
    involved: 'Agir',
    contact: 'Contact',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
    search: 'Rechercher',
  },

  facts: [
    { value: '2024', label: 'Fondée à Paris' },
    { value: 'Loi 1901', label: 'Association à but non lucratif' },
    { value: '6', label: 'Domaines d’action' },
    { value: 'Afrique', label: 'et scène internationale' },
  ],

  home: {
    eyebrow: 'Centre Africain pour les Droits de la Justice',
    // Art. 5 — vision
    heroTitle: 'Pour une Afrique où la justice, l’État de droit et la dignité humaine sont effectivement protégés',
    heroLead:
      'Notre mission : documenter les violations graves des droits humains, soutenir les victimes et porter les faits documentés devant les juridictions et mécanismes africains et internationaux compétents.',
    ctaPrimary: 'Découvrir nos actions',
    ctaSecondary: 'Qui sommes-nous',
    pathsTitle: 'Par où commencer ?',
    pathsLead: 'Trois portes d’entrée, selon ce qui vous amène.',
    paths: [
      { title: 'Victime ou témoin', text: 'Avant de nous transmettre quoi que ce soit, lisez nos conseils pour communiquer en sécurité.', cta: 'Conseils de sécurité' },
      { title: 'Juriste, chercheur ou organisation', text: 'Comment l’ACJR entend développer des alliances et des réseaux avec les organisations qui poursuivent des objectifs compatibles.', cta: 'Alliances et réseaux' },
      { title: 'Rejoindre l’association', text: 'Membres, bénévoles et partenaires : les modalités prévues par nos statuts.', cta: 'Agir avec nous' },
    ],
    missionEyebrow: 'Notre mission',
    missionTitle: 'Établir les faits, défendre les droits, exiger des comptes',
    missionText: [
      "L'ACJR est une association indépendante de défense des droits humains. Elle s'attache à ce que les violations commises en Afrique soient documentées avec rigueur, que leurs auteurs aient à en répondre et que les victimes obtiennent vérité, justice et réparation.",
      "Elle agit dans le respect du droit international, en toute impartialité, et en plaçant la sécurité et la dignité des personnes concernées au cœur de son travail.",
    ],
    objectivesTitle: 'Nos domaines d’action',
    objectivesLead: 'Six objectifs, inscrits à l’article 6 de nos statuts, structurent notre travail.',
    howTitle: 'Notre méthode',
    howLead: 'De l’établissement des faits jusqu’aux instances internationales : une méthode rigoureuse.',
    how: [
      { title: 'Documenter', text: 'Suivre et documenter les violations selon des méthodes vérifiables et les standards internationaux.' },
      { title: 'Analyser', text: 'Qualifier juridiquement les faits au regard du droit international et régional.' },
      { title: 'Plaider', text: 'Porter les faits, lorsque c’est possible et selon leurs règles, devant les mécanismes onusiens et africains et les juridictions compétentes.' },
      { title: 'Accompagner', text: 'Soutenir les victimes, les témoins et les défenseurs des droits humains, en plaçant leur sécurité au premier plan.' },
    ],
    principlesTitle: 'Des principes non négociables',
    principlesLead: 'Indépendance, universalité des droits, impartialité, non-discrimination et approche centrée sur les victimes.',
    advocacyTitle: 'Une voix auprès des mécanismes internationaux',
    advocacyText:
      'Lorsqu’elle y est admise et selon leurs règles, l’ACJR entend porter les faits documentés là où ils peuvent faire changer les choses.',
    involvedTitle: 'Agir avec nous',
    involvedText:
      'Juristes, chercheurs, journalistes, traducteurs ou simples citoyens : rejoignez une association bénévole engagée pour la justice.',
    involvedCta: 'Devenir membre ou bénévole',
  },

  // Art. 6 — objectives
  objectives: [
    {
      id: 'documentation',
      title: 'Suivi et documentation des violations',
      short: 'Suivre et documenter les violations graves, et promouvoir les Protocoles d’Istanbul et du Minnesota.',
      body: [
        "Une justice crédible commence par des faits établis. L’ACJR a pour objectif de suivre et de documenter les violations graves des droits humains, en s’appuyant sur des méthodes vérifiables et des éléments probants.",
        "Elle promeut l’utilisation de protocoles d’enquête internationalement reconnus, notamment le Protocole d’Istanbul (documentation de la torture) et le Protocole du Minnesota (enquêtes sur les décès potentiellement illicites).",
      ],
      points: [
        'Suivi des situations et documentation des violations graves',
        'Promotion des Protocoles d’Istanbul et du Minnesota',
        'Méthodes vérifiables et éléments probants',
        'Sécurité, dignité et consentement des victimes et des témoins',
      ],
    },
    {
      id: 'litigation',
      title: 'Analyse juridique et contentieux stratégique',
      short: 'Préparer analyses, dossiers et mémoires juridiques à l’appui des mécanismes de justice.',
      body: [
        'L’ACJR entend préparer des analyses, des dossiers documentaires et des mémoires juridiques.',
        "Dans le respect du droit applicable, ces travaux sont destinés à soutenir les mécanismes de justice et les contentieux stratégiques devant les juridictions compétentes.",
      ],
      points: [
        'Analyses juridiques',
        'Dossiers documentaires',
        'Mémoires juridiques',
        'Appui aux mécanismes de justice et au contentieux stratégique',
      ],
    },
    {
      id: 'transitional',
      title: 'Justice transitionnelle',
      short: 'Soutenir la recherche de la vérité, la responsabilité, la réparation et la réforme institutionnelle.',
      body: [
        "Les sociétés qui sortent d’un conflit ou d’une crise ont besoin de vérité, de justice et de réformes durables.",
        "L’ACJR entend soutenir les processus de justice transitionnelle, dans la continuité de ses origines : l’association a été fondée sous le nom « Paix et la Transition Démocratique ».",
      ],
      points: ['Recherche de la vérité', 'Responsabilité', 'Réparation', 'Réforme institutionnelle'],
    },
    {
      id: 'defenders',
      title: 'Protection des défenseurs des droits humains',
      short: 'Protection juridique et plaidoyer pour les défenseurs, avocats, journalistes et personnes signalant des violations.',
      body: [
        "Les défenseurs des droits humains, les avocats, les journalistes et les personnes qui signalent des violations sont souvent exposés à des risques en raison de leur engagement.",
        "L’ACJR entend contribuer à leur protection juridique et mener un plaidoyer en leur faveur, en s’appuyant notamment sur la Déclaration des Nations Unies sur les défenseurs des droits de l’homme.",
      ],
      points: [
        'Protection juridique',
        'Plaidoyer',
        'Défenseurs des droits humains, avocats et journalistes',
        'Personnes signalant des violations',
      ],
    },
    {
      id: 'vulnerable',
      title: 'Protection des groupes vulnérables',
      short: 'Défendre les femmes, les enfants, les réfugiés, les personnes déplacées et les minorités.',
      body: [
        "Les conflits et les crises frappent d’abord les plus vulnérables.",
        "L’ACJR a pour objectif de défendre les droits des personnes et groupes vulnérables, notamment les femmes exposées aux violences fondées sur le genre, les enfants touchés par les conflits, les réfugiés, les personnes déplacées et les minorités.",
      ],
      points: [
        'Femmes exposées aux violences fondées sur le genre',
        'Enfants touchés par les conflits',
        'Réfugiés et personnes déplacées',
        'Minorités',
      ],
    },
    {
      id: 'research',
      title: 'Recherche et formation',
      short: 'Produire et diffuser des recherches et former les acteurs des droits humains.',
      body: [
        "La défense des droits humains repose sur la connaissance. L’ACJR entend produire et diffuser des recherches, des études et des analyses.",
        'Elle entend contribuer à la formation des acteurs des droits humains aux niveaux national et régional.',
      ],
      points: [
        'Recherches et études',
        'Diffusion des analyses',
        'Formation des acteurs des droits humains',
        'Aux niveaux national et régional',
      ],
    },
  ],

  about: {
    storyTitle: 'Notre histoire',
    story: [
      "L'association a été constituée à Paris le 25 avril 2024 sous le nom « Paix et la Transition Démocratique » par ses trois membres fondateurs.",
      "Le 17 septembre 2026, l’assemblée générale extraordinaire a modifié sa dénomination et ses statuts. Sous le nom African Center for Justice Rights (ACJR), en français Centre Africain pour les Droits de la Justice (CADJ), elle en constitue la continuation juridique : aucune nouvelle personne morale n’a été créée et l’identité des membres fondateurs est inchangée. La modification a été enregistrée en préfecture le 30 septembre 2026.",
    ],
    timeline: [
      { date: '25 avril 2024', title: 'Fondation', text: 'Constitution à Paris de « Paix et la Transition Démocratique ».' },
      { date: '17 septembre 2026', title: 'Nouveaux statuts', text: 'L’assemblée générale extraordinaire adopte la nouvelle dénomination et les nouveaux statuts.' },
      { date: '30 septembre 2026', title: 'Enregistrement', text: 'Modification enregistrée en préfecture — RNA W751274196.' },
    ],
    visionTitle: 'Notre vision',
    vision: 'Contribuer à une Afrique dans laquelle la justice, l’État de droit, la dignité humaine et les libertés fondamentales sont effectivement protégés.',
    missionTitle: 'Notre mission',
    mission: [
      'Suivre et documenter méthodiquement les violations des droits humains, conformément aux standards juridiques internationaux.',
      'Contribuer à la lutte contre l’impunité.',
      'Soutenir les victimes.',
      'Renforcer l’espace civique, l’accès à la justice et la bonne gouvernance.',
    ],
    namesTitle: 'Nos noms',
    namesText:
      'La dénomination juridique de référence est anglaise. Les statuts autorisent des traductions en français et en arabe pour la communication internationale :',
    nextTitle: 'Pour aller plus loin',
  },

  // Art. 4 — principles
  principles: {
    intro: 'L’article 4 de nos statuts fixe cinq principes d’action en matière de droits humains.',
    items: [
      {
        title: 'Indépendance',
        text: "L'ACJR exerce ses activités en toute indépendance à l’égard des gouvernements, des partis politiques, des organisations religieuses et des intérêts financiers.",
      },
      {
        title: 'Universalité et indivisibilité des droits',
        text: 'L’ensemble des droits humains est considéré comme interdépendant et indivisible.',
      },
      {
        title: 'Impartialité et rigueur documentaire',
        text: 'Le suivi, la documentation et l’analyse reposent sur des méthodes vérifiables, des éléments probants et le respect des standards applicables.',
      },
      {
        title: 'Non-discrimination',
        text: 'L’ACJR agit au bénéfice de toute personne, sans distinction notamment d’origine, de couleur, de sexe, de religion, d’opinion politique, d’origine nationale ou sociale.',
      },
      {
        title: 'Approche centrée sur les victimes',
        text: 'La sécurité, la dignité, le consentement, l’accès à un recours et la réparation des victimes et des témoins sont des considérations essentielles.',
      },
    ],
  },

  // Preamble — legal references
  framework: {
    intro: [
      'Le préambule de nos statuts inscrit l’action de l’ACJR dans le cadre du droit international. L’association entend contribuer à la justice pénale, à la lutte contre l’impunité, à la justice transitionnelle et au renforcement de l’État de droit sur le continent africain.',
    ],
    referencesTitle: 'Instruments cités dans le préambule',
    references: [
      { name: 'Charte des Nations Unies', year: '1945', note: 'Buts et principes dont s’inspire l’association.', url: 'https://www.un.org/fr/about-us/un-charter' },
      { name: 'Déclaration universelle des droits de l’homme', year: '1948', note: 'Fondement universel des droits humains.', url: 'https://www.un.org/fr/about-us/universal-declaration-of-human-rights' },
      { name: 'Pacte international relatif aux droits civils et politiques', year: '1966', note: 'Droit à la vie, interdiction de la torture, procès équitable, libertés fondamentales.', url: 'https://www.ohchr.org/fr/instruments-mechanisms/instruments/international-covenant-civil-and-political-rights' },
      { name: 'Pacte international relatif aux droits économiques, sociaux et culturels', year: '1966', note: 'Droits au travail, à la santé, à l’éducation, à un niveau de vie suffisant.', url: 'https://www.ohchr.org/fr/instruments-mechanisms/instruments/international-covenant-economic-social-and-cultural-rights' },
      { name: 'Charte africaine des droits de l’homme et des peuples', year: '1981', note: 'Socle du système africain de protection des droits humains.', url: 'https://achpr.au.int/en/charter/african-charter-human-and-peoples-rights' },
      { name: 'Conventions de Genève du 12 août 1949 et Protocoles additionnels', year: '1949 · 1977 · 2005', note: 'Protection des personnes en temps de conflit armé.', url: 'https://ihl-databases.icrc.org/fr/ihl-treaties' },
      { name: 'Statut de Rome de la Cour pénale internationale', year: '1998', note: 'Génocide, crimes contre l’humanité, crimes de guerre, crime d’agression.', url: 'https://www.icc-cpi.int/fr/publications/textes-juridiques-fondamentaux' },
      { name: 'Convention contre la torture', year: '1984', note: 'Interdiction absolue de la torture et des traitements cruels, inhumains ou dégradants.', url: 'https://www.ohchr.org/fr/instruments-mechanisms/instruments/convention-against-torture-and-other-cruel-inhuman-or-degrading' },
      { name: 'Convention internationale pour la protection de toutes les personnes contre les disparitions forcées', year: '2006', note: 'Interdiction des disparitions forcées et droit à la vérité.', url: 'https://www.ohchr.org/fr/instruments-mechanisms/instruments/international-convention-protection-all-persons-enforced' },
      { name: 'Déclaration des Nations Unies sur les défenseurs des droits de l’homme', year: '1998', note: 'Droit de promouvoir et de protéger les droits humains.', url: 'https://www.ohchr.org/fr/instruments-mechanisms/instruments/declaration-right-and-responsibility-individuals-groups-and' },
    ],
    lawTitle: 'Notre statut en droit français',
    law: [
      "L'ACJR est une association à but non lucratif régie par la loi du 1er juillet 1901 et le décret du 16 août 1901, à vocation africaine et internationale. Son siège est à Paris et sa durée est illimitée.",
      'Elle exerce ses activités en France, en Afrique et à l’échelle internationale.',
    ],
    protocolsTitle: 'Standards de documentation',
    protocols: [
      { title: 'Protocole d’Istanbul', text: 'Manuel pour enquêter efficacement sur la torture et autres peines ou traitements cruels, inhumains ou dégradants, et les documenter.' },
      { title: 'Protocole du Minnesota', text: 'Protocole relatif aux enquêtes sur les décès résultant potentiellement d’actes illégaux.' },
    ],
  },

  work: {
    intro: [
      'Nos statuts fixent six objectifs complémentaires. Ensemble, ils couvrent toute la chaîne qui va de l’établissement des faits à la justice et à la réparation.',
    ],
    methodTitle: 'Une approche intégrée',
    method: [
      'Chaque domaine nourrit les autres : la documentation fonde l’analyse juridique, qui fonde le plaidoyer ; la recherche et la formation renforcent l’ensemble.',
    ],
    pointsTitle: 'Concrètement',
  },

  // Art. 7 and 8 — UN and African engagement
  advocacy: {
    intro: [
      'Les faits documentés n’ont de valeur que s’ils parviennent à celles et ceux qui peuvent agir. L’ACJR entend interagir avec les mécanismes internationaux et régionaux de protection des droits humains, en toute indépendance et conformément à leurs règles.',
    ],
    unTitle: 'Le système onusien et le Conseil des droits de l’homme',
    unLead: 'Lorsqu’elle y est admise et conformément aux règles applicables, l’ACJR peut contribuer aux travaux des mécanismes suivants.',
    un: [
      { title: 'Conseil des droits de l’homme', text: 'Participation aux sessions, consultations et événements, et organisation ou contribution à des événements parallèles.' },
      { title: 'Examen périodique universel', text: 'Préparation et soumission de contributions, dans les conditions prévues par le mécanisme.' },
      { title: 'Procédures spéciales', text: 'Informations, communications et appels adressés aux procédures spéciales et mécanismes compétents.' },
      { title: 'Organes conventionnels', text: 'Rapports alternatifs et contributions ; lorsque le droit le permet, accompagnement des victimes vers les mécanismes de plainte.' },
    ],
    africaTitle: 'Coopération régionale et internationale',
    africaLead: 'L’ACJR entend aussi agir au niveau du continent et auprès des institutions judiciaires internationales.',
    africa: [
      { title: 'Commission africaine des droits de l’homme et des peuples', text: 'Coopération et plaidoyer auprès de la Commission.' },
      { title: 'Autres mécanismes africains', text: 'Coopération et plaidoyer auprès des autres mécanismes africains compétents, dans le respect de leurs règles de saisine et de participation.' },
      { title: 'Institutions judiciaires internationales', text: 'Transmission d’informations documentées, lorsque cela est juridiquement possible et pertinent.' },
    ],
    networksTitle: 'Alliances et réseaux',
    networks: [
      'L’ACJR entend développer des alliances et des réseaux avec des organisations non gouvernementales, des institutions et des acteurs régionaux ou internationaux poursuivant des objectifs compatibles.',
    ],
    note: 'L’ACJR est une organisation indépendante. Elle ne dispose pas, à ce jour, du statut consultatif auprès du Conseil économique et social (ECOSOC) et n’est accréditée auprès d’aucun organe onusien ou de l’Union africaine. Son éventuelle participation à ces mécanismes n’implique aucune affiliation ni aucun soutien de leur part.',
  },

  // Art. 11–15 — governance
  governance: {
    intro: [
      'L’ACJR est administrée de manière démocratique. Ses organes et leurs pouvoirs sont définis par les statuts adoptés le 17 septembre 2026  ; ils prévoient un règlement intérieur, préparé par le conseil d’administration et soumis à l’approbation de l’assemblée générale, pour en préciser les modalités.',
    ],
    bureauTitle: 'Le Bureau exécutif',
    bureauLead: 'À la date d’adoption des statuts, la continuité des fonctions est assurée par les trois membres fondateurs :',
    bureau: [
      { name: 'ABDELRAHIM GREIN Sadam', role: 'Président', duty: 'Représente légalement l’association dans les actes de la vie civile.' },
      { name: 'MAHMUD MOHAMED Hruia', role: 'Secrétaire général', duty: 'Assure le suivi administratif et la coordination, et conserve les procès-verbaux.' },
      { name: 'EL TAHER AISSA Issam', role: 'Trésorier', duty: 'Assure le suivi financier, la tenue des comptes et la préparation budgétaire.' },
    ],
    bureauNote: 'Le Bureau est élu par le conseil d’administration parmi ses membres. Il peut comprendre un vice-président, qui assiste et remplace le président.',
    bodiesTitle: 'Les organes de l’association',
    bodies: [
      {
        title: 'Assemblée générale ordinaire',
        text: 'Elle réunit les membres disposant du droit de vote et à jour de leurs obligations associatives. Elle approuve les rapports d’activité et financier et le budget, élit le conseil d’administration, fixe les cotisations et approuve le règlement intérieur.',
        facts: ['Au moins une fois par an', 'Convocation 21 jours à l’avance, sauf urgence motivée', 'Majorité simple'],
      },
      {
        title: 'Assemblée générale extraordinaire',
        text: 'Seule compétente pour modifier les statuts ou prononcer la dissolution de l’association.',
        facts: ['Quorum : deux tiers des membres disposant du droit de vote', 'Majorité des deux tiers des suffrages exprimés', 'À défaut de quorum, seconde assemblée sous 30 jours, sans condition de quorum (sauf dissolution)'],
      },
      {
        title: 'Conseil d’administration',
        text: 'Il détermine les orientations de mise en œuvre des décisions de l’assemblée, supervise les politiques générales, arrête le projet de budget et veille à la bonne administration.',
        facts: ['3 à 7 membres', 'Mandat de 3 ans, renouvelable', 'Se réunit au moins tous les six mois', 'Voix prépondérante du président en cas de partage'],
      },
      {
        title: 'Bureau exécutif',
        text: 'Élu par le conseil parmi ses membres, il comprend au minimum un président, un secrétaire général et un trésorier.',
        facts: ['Vice-président élu le cas échéant', 'Le président représente l’association'],
      },
    ],
    volunteerTitle: 'Une direction bénévole',
    volunteer: [
      'Les fonctions exercées au sein du conseil d’administration et du Bureau exécutif sont bénévoles et gratuites. Les frais réellement engagés dans l’intérêt de l’association peuvent être remboursés sur justificatifs ; ils sont retracés dans les documents financiers.',
    ],
    statutesTitle: 'Nos statuts en bref',
    statutes: [
      'Préambule et références juridiques internationales',
      'Constitution, dénomination, siège et durée (art. 1 à 3)',
      'Principes directeurs et indépendance (art. 4)',
      'Vision, mission et objectifs stratégiques (art. 5 et 6)',
      'Modes d’action et plaidoyer international (art. 7 et 8)',
      'Membres, droits et obligations (art. 9 et 10)',
      'Organisation et gouvernance (art. 11 à 15)',
      'Régime financier et transparence (art. 16 à 18)',
      'Règlement intérieur et politiques internes (art. 19 et 20)',
      'Dissolution, liquidation et formalités (art. 21 et 22)',
    ],
    statutesNote: 'Les statuts complets peuvent être communiqués sur demande.',
  },

  // Art. 16–20 — finance and policies
  transparency: {
    intro: ['Nous rendons compte de notre statut, de nos ressources et de nos règles de fonctionnement.'],
    statusTitle: 'Statut juridique',
    status: [
      { label: 'Dénomination juridique', value: 'African Center for Justice Rights (ACJR)' },
      { label: 'En français', value: 'Centre Africain pour les Droits de la Justice (CADJ)' },
      { label: 'Forme', value: 'Association régie par la loi du 1er juillet 1901' },
      { label: 'Siège', value: 'Paris, France' },
      { label: 'N° RNA', value: 'W751274196' },
      { label: 'Création', value: '25 avril 2024' },
      { label: 'Statuts en vigueur', value: '17 septembre 2026' },
      { label: 'Exercice financier', value: '1er janvier – 31 décembre' },
    ],
    fundingTitle: 'Nos ressources',
    funding: ['Selon l’article 16 des statuts, les ressources de l’association comprennent :'],
    fundingSources: [
      'les cotisations ;',
      'les subventions ;',
      'les dons et libéralités autorisés par la loi ;',
      'les financements de fondations et d’organismes publics ou privés compatibles avec son indépendance ;',
      'les produits d’activités, études, formations ou publications non lucratives ;',
      'toutes autres ressources autorisées par les lois et règlements en vigueur.',
    ],
    independenceTitle: 'Notre indépendance',
    independence: [
      'L’ACJR refuse tout financement dont les conditions seraient incompatibles avec son indépendance, son impartialité, ses objectifs statutaires ou l’intégrité de ses activités de suivi, de documentation et de défense des droits humains.',
    ],
    accountsTitle: 'Comptes et contrôle',
    accounts: [
      'Une comptabilité régulière est tenue. Le rapport financier est soumis chaque année à l’approbation de l’assemblée générale.',
      'Lorsque la loi, les seuils applicables, des engagements contractuels ou une décision de l’assemblée générale l’exigent, les comptes sont contrôlés ou certifiés par un professionnel habilité.',
    ],
    dissolutionTitle: 'En cas de dissolution',
    dissolution: [
      'Seule une assemblée générale extraordinaire spécialement convoquée peut décider la dissolution, aux conditions de quorum et de majorité de l’article 12.',
      'L’actif net ne peut être réparti entre les membres : il est dévolu à un organisme à but non lucratif poursuivant des objectifs compatibles (article 21).',
    ],
    policiesTitle: 'Politiques internes',
    policiesLead: 'Selon l’article 20 des statuts, l’association adopte, en fonction de ses activités et de ses obligations, des politiques internes relatives notamment aux domaines suivants :',
    policies: [
      { title: 'Éthique et conduite', text: 'Règles de comportement attendues des membres, bénévoles et représentants.' },
      { title: 'Protection des enfants et des personnes vulnérables', text: 'Prévention des abus et de l’exploitation.' },
      { title: 'Conflits d’intérêts et corruption', text: 'Prévention des conflits d’intérêts et de la corruption.' },
      { title: 'Protection des données et des sources', text: 'Confidentialité et sécurité des informations relatives aux victimes, aux témoins et aux sources.' },
      { title: 'Égalité des chances et non-discrimination', text: 'Égalité des chances et prévention des discriminations.' },
    ],
  },

  news: {
    emptyTitle: 'Aucune actualité publiée pour le moment',
    emptyText: 'Nos premières déclarations et publications paraîtront prochainement sur cette page.',
    followText: canContact ? 'Pour être informé, écrivez-nous.' : 'Nos coordonnées seront publiées prochainement sur la page Contact.',
  },

  // Art. 9–10 — members
  involved: {
    intro: ['L’ACJR est une association de membres. Votre engagement compte.'],
    membershipTitle: 'Devenir membre',
    membershipLead: 'Les statuts prévoient quatre catégories de membres :',
    categories: [
      { title: 'Membres fondateurs', text: 'ABDELRAHIM GREIN Sadam, MAHMUD MOHAMED Hruia et EL TAHER AISSA Issam, signataires de l’acte constitutif.' },
      { title: 'Membres actifs', text: 'Personnes physiques ou morales admises, qui participent aux activités et acquittent, le cas échéant, la cotisation annuelle.' },
      { title: 'Membres associés', text: 'Personnes ou organisations qui soutiennent les activités à titre consultatif, sans droit de vote.' },
      { title: 'Membres d’honneur', text: 'Personnalités distinguées pour leur contribution aux objectifs de l’association, dispensées de cotisation.' },
    ],
    admissionTitle: 'Admission',
    admission: [
      'L’admission est prononcée selon les modalités fixées par le règlement intérieur. L’association peut notamment tenir compte de l’adhésion à ses valeurs et de l’absence d’implication connue dans des violations graves des droits humains, des faits graves de corruption ou des appels à la haine.',
    ],
    lossTitle: 'Perte de la qualité de membre',
    loss: [
      'La qualité de membre se perd par décès, démission écrite, non-paiement de la cotisation lorsqu’elle est exigible, ou exclusion pour motif grave. Toute exclusion est motivée, et l’intéressé peut d’abord présenter ses observations.',
    ],
    ways: [
      { title: 'Bénévolat', text: 'Juristes, chercheurs, traducteurs, communicants : mettez vos compétences au service de la justice.', cta: 'Proposer mon aide' },
      { title: 'Partenariats', text: 'Organisations et institutions poursuivant des objectifs compatibles : construisons ensemble des alliances.', cta: 'Devenir partenaire' },
      { title: 'Soutien', text: `Les dons contribuent à notre indépendance. ${canContact ? 'Contactez-nous pour connaître les modalités.' : 'Les modalités seront précisées prochainement.'}`, cta: 'Nous soutenir' },
    ],
    supportNote: 'Les modalités de don en ligne seront bientôt disponibles.',
  },

  contact: {
    intro: 'Pour toute question, demande de partenariat ou d’adhésion, utilisez le formulaire ci-dessous.',
    safetyTitle: 'Victimes et témoins : votre sécurité d’abord',
    safety: [
      'Ce formulaire n’est pas un canal sécurisé : il n’est pas chiffré de bout en bout et les messages transitent par un prestataire établi aux États-Unis (Formspree).',
      'N’y décrivez aucun fait subi ou observé, n’indiquez ni nom de personne, ni lieu, ni date, et n’envoyez ni preuves, ni photos, ni vidéos. Vous pouvez utiliser un pseudonyme dans le champ « Nom ».',
      'Utilisez un appareil, une connexion et une adresse électronique que vous seul contrôlez : notre réponse arrivera dans cette boîte. Utilisez la navigation privée et effacez votre historique si nécessaire. Ces conseils valent aussi pour les messages envoyés par courriel.',
      'Indiquez simplement comment et quand vous joindre en sécurité ; nous chercherons à vous recontacter par un canal adapté, sans pouvoir garantir de délai.',
      'En cas de danger immédiat, contactez, si vous pouvez le faire sans risque, les services d’urgence ou une organisation de protection de confiance.',
    ],
    formTitle: 'Écrivez-nous',
    fields: {
      name: 'Nom ou pseudonyme',
      email: 'Adresse électronique',
      subject: 'Objet',
      message: 'Message',
      consent: 'J’accepte que l’ACJR utilise ces informations pour répondre à mon message.',
    },
    subjects: ['Question générale', 'Adhésion ou bénévolat', 'Partenariat', 'Presse', 'Autre'],
    required: 'Champ obligatoire',
    submit: 'Envoyer le message',
    sending: 'Envoi en cours…',
    errorSummary: 'Le formulaire contient des erreurs :',
    errors: {
      name: 'Indiquez votre nom.',
      email: 'Indiquez une adresse électronique valide, par exemple nom@exemple.org.',
      message: 'Écrivez votre message.',
      consent: 'Cochez la case de consentement pour envoyer le message.',
    },
    success: 'Merci, votre message a bien été envoyé. Nous vous répondrons dans les meilleurs délais.',
    failure: 'Le message n’a pas pu être envoyé. Veuillez réessayer plus tard.',
    inactive: 'Le formulaire de contact n’est pas encore activé : aucun message ne peut être envoyé pour le moment. Nos coordonnées seront publiées sur cette page très prochainement.',
    privacyLink: 'Consulter notre politique de confidentialité',
    locationTitle: 'Siège',
    location: 'Paris, France',
    emailTitle: 'Courriel',
    emailPending: 'Adresse bientôt disponible',
  },

  // LCEN art. 1-1 I (formerly art. 6 III). Missing client details render as "à communiquer prochainement".
  legal: {
    sections: [
      {
        title: 'Éditeur du site',
        body: [
          'African Center for Justice Rights (ACJR), en français Centre Africain pour les Droits de la Justice, association à but non lucratif régie par la loi du 1er juillet 1901. N° RNA : W751274196.',
          `Siège social : ${site.postalAddress ?? `Paris, France (adresse postale ${p})`}.`,
          `Téléphone : ${site.phone ?? p}. Courriel : ${site.email ?? p}.`,
        ],
      },
      { title: 'Directeur de la publication', body: ['ABDELRAHIM GREIN Sadam, président de l’association.'] },
      {
        title: 'Hébergement',
        body: [`${site.host.name}, ${site.host.address}, États-Unis. Téléphone : ${site.host.phone ?? p}. Site : ${site.host.url}.`],
      },
      {
        title: 'Propriété intellectuelle',
        body: [
          'Les textes, le logo et les éléments graphiques de ce site sont la propriété de l’ACJR, sauf mention contraire. Toute reproduction, même partielle, nécessite une autorisation préalable, à l’exception des citations courtes accompagnées de la source.',
        ],
      },
      {
        title: 'Liens externes',
        body: ['Les liens vers des sites tiers sont fournis à titre d’information. L’ACJR n’est pas responsable de leur contenu.'],
      },
      {
        title: 'Indépendance',
        body: [
          'L’ACJR est une organisation indépendante. Elle ne dispose pas, à ce jour, du statut consultatif auprès du Conseil économique et social (ECOSOC) et n’est accréditée auprès d’aucun organe onusien ou de l’Union africaine. Les références faites sur ce site à ces mécanismes décrivent des instances avec lesquelles l’association peut être amenée à interagir ; elles n’impliquent aucune affiliation ni aucun soutien de leur part.',
        ],
      },
    ],
  },

  // GDPR art. 13.
  privacy: {
    updated: 'Dernière mise à jour : 23 octobre 2026',
    sections: [
      {
        title: 'Responsable du traitement',
        body: [
          `African Center for Justice Rights (ACJR), association loi 1901, siège social à Paris, France. Contact : ${site.email ?? p}.`,
          'L’association n’a pas désigné de délégué à la protection des données.',
        ],
      },
      {
        title: 'Hébergement et données de connexion',
        body: [
          'Le site est hébergé par Vercel Inc. (États-Unis). À chaque visite, Vercel traite des données techniques de connexion (adresse IP, date et heure, page demandée, type de navigateur) afin d’afficher les pages et d’assurer la sécurité du service.',
          'Ce traitement repose sur notre intérêt légitime à exploiter un site sûr (article 6.1.f du RGPD). L’ACJR n’a pas accès à ces journaux et ne les conserve pas ; Vercel les conserve pendant la durée minimale nécessaire à la sécurité et au fonctionnement du service, selon sa politique de confidentialité.',
        ],
      },
      {
        title: 'Formulaire de contact',
        body: [
          'Lorsqu’il est actif, le formulaire de contact recueille votre nom, votre adresse électronique, l’objet et le message. Ces données servent uniquement à vous répondre.',
          'Le fondement juridique est votre consentement (article 6.1.a du RGPD), que vous pouvez retirer à tout moment.',
          'La fourniture de ces données est facultative ; sans nom, adresse électronique et message, nous ne pouvons pas vous répondre. Aucune décision automatisée n’est prise.',
        ],
      },
      {
        title: 'Données sensibles',
        body: [
          'N’indiquez aucune information sur votre santé, vos origines, vos opinions politiques ou religieuses, ni sur des violations subies ou observées. Si un message en contient malgré tout, nous ne l’utiliserons que pour vous répondre et vous orienter, et nous supprimerons ces informations dès que possible.',
        ],
      },
      {
        title: 'Destinataires et sous-traitants',
        body: [
          'Vos données ne sont jamais vendues. Elles ne sont transmises qu’aux sous-traitants mentionnés ici : Vercel Inc. pour l’hébergement et Formspree Inc. pour l’acheminement des messages du formulaire. Elles ne sont lues que par les membres habilités de l’association.',
        ],
      },
      {
        title: 'Transferts hors de l’Union européenne',
        body: [
          'Vercel Inc. et Formspree Inc. sont établis aux États-Unis. Les transferts vers Vercel reposent sur le cadre de protection des données UE–États-Unis (Data Privacy Framework), auquel Vercel déclare adhérer.',
          'Les garanties applicables aux transferts vers Formspree seront précisées ici avant l’activation du formulaire.',
        ],
      },
      {
        title: 'Durée de conservation',
        body: ['Les messages sont supprimés au plus tard 12 mois après le dernier échange, y compris de l’espace Formspree et de nos messageries.'],
      },
      {
        title: 'Cookies et mesure d’audience',
        body: ['Ce site ne dépose aucun cookie et n’utilise aucun outil de mesure d’audience ou de traçage tiers. Aucun bandeau de consentement n’est donc nécessaire.'],
      },
      {
        title: 'Vos droits',
        body: [
          'Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité de vos données, ainsi que du droit de retirer votre consentement à tout moment. Pour les exercer, écrivez au responsable du traitement aux coordonnées indiquées ci-dessus.',
          'Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr).',
        ],
      },
    ],
  },
};
