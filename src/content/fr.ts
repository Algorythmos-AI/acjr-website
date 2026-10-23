import type { Content } from './types';

/*
 * French source content. Faithful to the statutes adopted on 17 September 2026,
 * rewritten as web prose. Article references are noted so the text can be checked.
 */
export const fr: Content = {
  meta: {
    home: {
      title: 'Justice et droits humains en Afrique',
      description:
        "L'ACJR documente les violations des droits humains, soutient les victimes et plaide pour la justice et la redevabilité en Afrique.",
      lead: '',
    },
    about: {
      title: 'Qui sommes-nous',
      description: "Histoire, vision et mission du Centre Africain pour les Droits de la Justice (ACJR), association loi 1901 basée à Paris.",
      lead: 'Une association indépendante, fondée à Paris, au service de la justice et de la dignité humaine en Afrique.',
    },
    principles: {
      title: 'Nos principes',
      description: "Les cinq principes qui guident l'action de l'ACJR : indépendance, universalité, centralité des victimes, rigueur et protection.",
      lead: 'Cinq principes encadrent chacune de nos actions, de la collecte des témoignages au plaidoyer.',
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
      description: "Comment l'ACJR porte la voix des victimes auprès des mécanismes onusiens et africains de protection des droits humains.",
      lead: 'Nous portons les faits documentés devant les mécanismes internationaux et régionaux de protection des droits humains.',
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
      lead: 'Écrivez-nous. Si vous êtes victime ou témoin, lisez d’abord nos conseils de sécurité.',
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
    heroTitle: 'Pour une Afrique où la justice et la dignité humaine sont garanties à chacun',
    heroLead:
      'Nous documentons les violations graves des droits humains, accompagnons les victimes et portons leur voix devant les instances nationales, africaines et internationales.',
    ctaPrimary: 'Découvrir nos actions',
    ctaSecondary: 'Qui sommes-nous',
    missionEyebrow: 'Notre mission',
    missionTitle: 'Établir les faits, défendre les droits, exiger des comptes',
    missionText: [
      "L'ACJR est une association indépendante de défense des droits humains. Elle s'attache à ce que les violations commises en Afrique soient documentées avec rigueur, que leurs auteurs aient à en répondre et que les victimes obtiennent vérité, justice et réparation.",
      "Elle agit dans le respect du droit international, en toute impartialité, et en plaçant la sécurité et la dignité des personnes concernées au cœur de son travail.",
    ],
    objectivesTitle: 'Nos domaines d’action',
    objectivesLead: 'Six objectifs, inscrits à l’article 6 de nos statuts, structurent notre travail.',
    howTitle: 'Notre méthode',
    howLead: 'Du terrain jusqu’aux instances internationales, une chaîne de travail rigoureuse.',
    how: [
      { title: 'Documenter', text: 'Recueillir et préserver les témoignages et les preuves selon les standards internationaux.' },
      { title: 'Analyser', text: 'Qualifier juridiquement les faits au regard du droit international et régional.' },
      { title: 'Plaider', text: 'Porter les faits devant les mécanismes onusiens, africains et les juridictions compétentes.' },
      { title: 'Accompagner', text: 'Soutenir les victimes, les témoins et les défenseurs des droits humains, en sécurité.' },
    ],
    principlesTitle: 'Des principes non négociables',
    principlesLead: 'Indépendance, universalité, centralité des victimes, rigueur et protection.',
    advocacyTitle: 'Une voix auprès des mécanismes internationaux',
    advocacyText:
      'Conseil des droits de l’homme, Examen périodique universel, procédures spéciales, organes de traités, Commission africaine des droits de l’homme et des peuples : nous portons les faits là où ils peuvent faire changer les choses.',
    involvedTitle: 'Agir avec nous',
    involvedText:
      'Juristes, chercheurs, journalistes, traducteurs ou simples citoyens : rejoignez une association bénévole engagée pour la justice.',
    involvedCta: 'Devenir membre ou bénévole',
  },

  // Art. 6 — objectives
  objectives: [
    {
      id: 'documentation',
      title: 'Documentation des violations',
      short: 'Recueillir et préserver les preuves des violations graves selon les Protocoles d’Istanbul et du Minnesota.',
      body: [
        "Une justice crédible commence par des faits établis. L'ACJR recueille, vérifie et conserve les informations relatives aux violations graves des droits humains et du droit international humanitaire.",
        "Nos méthodes suivent les standards internationaux reconnus, notamment le Protocole d’Istanbul (documentation de la torture) et le Protocole du Minnesota (enquêtes sur les décès potentiellement illicites).",
      ],
      points: [
        'Recueil de témoignages dans le respect du consentement éclairé',
        'Vérification et recoupement des sources',
        'Conservation sécurisée des éléments de preuve',
        'Rapports thématiques et par pays',
      ],
    },
    {
      id: 'litigation',
      title: 'Analyse juridique et contentieux stratégique',
      short: 'Qualifier les faits en droit et soutenir les recours devant les juridictions compétentes.',
      body: [
        "Nous analysons les faits documentés au regard du droit international des droits humains, du droit humanitaire et du droit pénal international.",
        "Lorsque cela sert l’intérêt des victimes, l'ACJR soutient des recours devant les juridictions nationales, régionales et internationales, et contribue aux procédures en cours.",
      ],
      points: [
        'Notes juridiques et qualification des faits',
        'Appui aux avocats et aux victimes dans leurs recours',
        'Communications aux mécanismes régionaux et internationaux',
        'Veille sur la jurisprudence pertinente',
      ],
    },
    {
      id: 'transitional',
      title: 'Justice transitionnelle',
      short: 'Contribuer à la vérité, à la réparation et aux garanties de non-répétition après les conflits.',
      body: [
        "Les sociétés qui sortent d’un conflit ou d’un régime autoritaire ont besoin de vérité, de justice, de réparation et de garanties de non-répétition.",
        "L'ACJR contribue à ces processus par son expertise, son plaidoyer et l’accompagnement des victimes et de la société civile, dans l’esprit de ses origines : la paix et la transition démocratique.",
      ],
      points: [
        'Plaidoyer pour des mécanismes de vérité et de réparation',
        'Participation des victimes aux processus de transition',
        'Réformes institutionnelles et garanties de non-répétition',
        'Préservation de la mémoire',
      ],
    },
    {
      id: 'defenders',
      title: 'Protection des défenseurs des droits humains',
      short: 'Soutenir les défenseurs, avocats et journalistes menacés en raison de leur travail.',
      body: [
        "Les défenseurs des droits humains, les avocats et les journalistes paient souvent un lourd tribut pour leur engagement : menaces, détentions arbitraires, disparitions.",
        "L'ACJR alerte, mobilise et accompagne, en s’appuyant sur la Déclaration des Nations Unies sur les défenseurs des droits de l’homme et sur les mécanismes de protection existants.",
      ],
      points: [
        'Alertes et appels urgents',
        'Saisine des procédures spéciales compétentes',
        'Orientation vers des dispositifs de protection',
        'Solidarité et visibilité internationale',
      ],
    },
    {
      id: 'vulnerable',
      title: 'Protection des groupes vulnérables',
      short: 'Défendre les droits des femmes, des enfants, des personnes déplacées et des minorités.',
      body: [
        "Les conflits et les crises frappent d’abord les plus vulnérables : femmes et filles, enfants, personnes déplacées et réfugiées, minorités et personnes en situation de handicap.",
        "Nous accordons une attention particulière aux violences sexuelles et fondées sur le genre et aux violations des droits de l’enfant, avec une approche centrée sur les survivants.",
      ],
      points: [
        'Approche centrée sur les survivants et sensible au genre',
        'Droits des personnes déplacées et réfugiées',
        'Droits de l’enfant',
        'Non-discrimination des minorités',
      ],
    },
    {
      id: 'research',
      title: 'Recherche et formation',
      short: 'Produire des analyses et renforcer les capacités de la société civile africaine.',
      body: [
        "La défense des droits humains repose sur la connaissance. L'ACJR produit des études et des analyses sur les situations et les enjeux juridiques du continent.",
        "Elle organise des formations pour renforcer les capacités des acteurs de la société civile, des juristes et des journalistes en matière de documentation, de droit et de plaidoyer.",
      ],
      points: [
        'Études et notes d’analyse',
        'Formations à la documentation et au plaidoyer',
        'Ateliers et conférences',
        'Partenariats avec des universités et centres de recherche',
      ],
    },
  ],

  about: {
    storyTitle: 'Notre histoire',
    story: [
      "L'association a été fondée à Paris le 25 avril 2024 sous le nom « Paix et la Transition Démocratique », par des personnes engagées pour la paix et les droits humains en Afrique.",
      "Pour mieux refléter l’élargissement de sa mission à la justice et à la redevabilité, l’assemblée générale extraordinaire a adopté de nouveaux statuts le 17 septembre 2026. L’association est devenue le Centre Africain pour les Droits de la Justice (ACJR). La déclaration de modification a été enregistrée par la préfecture le 30 septembre 2026.",
    ],
    timeline: [
      { date: '25 avril 2024', title: 'Fondation', text: 'Création à Paris de « Paix et la Transition Démocratique ».' },
      { date: '17 septembre 2026', title: 'Nouveaux statuts', text: 'Adoption des statuts du Centre Africain pour les Droits de la Justice.' },
      { date: '30 septembre 2026', title: 'Enregistrement', text: 'Récépissé de la préfecture — RNA W751274196.' },
    ],
    visionTitle: 'Notre vision',
    vision: 'Une Afrique où la justice, la dignité humaine et l’état de droit sont garantis à chacun, et où aucune violation grave ne reste impunie.',
    missionTitle: 'Notre mission',
    mission: [
      'Documenter avec rigueur les violations graves des droits humains et du droit international humanitaire.',
      'Défendre les victimes et leur droit à la vérité, à la justice et à la réparation.',
      'Promouvoir la redevabilité devant les instances nationales, africaines et internationales.',
      'Renforcer la société civile africaine et protéger celles et ceux qui défendent les droits humains.',
    ],
    namesTitle: 'Nos noms',
    namesText:
      'L’association est connue sous trois noms officiels, en français, en anglais et en arabe :',
    nextTitle: 'Pour aller plus loin',
  },

  // Art. 4 — principles
  principles: {
    intro: 'Ces principes s’imposent à tous les membres, bénévoles et partenaires de l’association.',
    items: [
      {
        title: 'Indépendance et impartialité',
        text: "L'ACJR agit en toute indépendance à l’égard des gouvernements, des partis politiques, des groupes armés et des intérêts privés. Elle examine les violations quels qu’en soient les auteurs.",
      },
      {
        title: 'Universalité et non-discrimination',
        text: 'Les droits humains sont universels, indivisibles et interdépendants. Nous défendons chaque personne sans distinction d’origine, de sexe, de religion, d’opinion ou de statut.',
      },
      {
        title: 'Centralité des victimes',
        text: 'Les besoins, le consentement et la dignité des victimes et des survivants guident notre action. Nous appliquons le principe « ne pas nuire ».',
      },
      {
        title: 'Rigueur et exactitude',
        text: 'Nous ne publions que des informations vérifiées, selon des méthodes reconnues. La crédibilité de notre travail en dépend.',
      },
      {
        title: 'Confidentialité et protection des sources',
        text: 'L’identité et la sécurité des victimes, des témoins et des sources sont protégées en toutes circonstances. Aucune information sensible n’est divulguée sans consentement.',
      },
    ],
  },

  // Preamble — legal references
  framework: {
    intro: [
      'Le préambule de nos statuts inscrit l’action de l’ACJR dans le cadre du droit international. Ces textes définissent les droits que nous défendons et les obligations dont nous demandons le respect.',
    ],
    referencesTitle: 'Principaux instruments de référence',
    references: [
      { name: 'Déclaration universelle des droits de l’homme', year: '1948', note: 'Fondement universel des droits humains.', url: 'https://www.un.org/fr/about-us/universal-declaration-of-human-rights' },
      { name: 'Pacte international relatif aux droits civils et politiques', year: '1966', note: 'Droit à la vie, interdiction de la torture, procès équitable, libertés fondamentales.', url: 'https://www.ohchr.org/fr/instruments-mechanisms/instruments/international-covenant-civil-and-political-rights' },
      { name: 'Pacte international relatif aux droits économiques, sociaux et culturels', year: '1966', note: 'Droits au travail, à la santé, à l’éducation, à un niveau de vie suffisant.', url: 'https://www.ohchr.org/fr/instruments-mechanisms/instruments/international-covenant-economic-social-and-cultural-rights' },
      { name: 'Charte africaine des droits de l’homme et des peuples', year: '1981', note: 'Socle du système africain de protection des droits humains.', url: 'https://achpr.au.int/en/charter/african-charter-human-and-peoples-rights' },
      { name: 'Conventions de Genève et Protocoles additionnels', year: '1949 · 1977', note: 'Protection des personnes en temps de conflit armé.', url: 'https://ihl-databases.icrc.org/fr/ihl-treaties' },
      { name: 'Statut de Rome de la Cour pénale internationale', year: '1998', note: 'Génocide, crimes contre l’humanité, crimes de guerre, crime d’agression.', url: 'https://www.icc-cpi.int/fr/publications/textes-juridiques-fondamentaux' },
      { name: 'Convention contre la torture', year: '1984', note: 'Interdiction absolue de la torture et des traitements cruels, inhumains ou dégradants.', url: 'https://www.ohchr.org/fr/instruments-mechanisms/instruments/convention-against-torture-and-other-cruel-inhuman-or-degrading' },
      { name: 'Convention pour la protection de toutes les personnes contre les disparitions forcées', year: '2006', note: 'Interdiction des disparitions forcées et droit à la vérité.', url: 'https://www.ohchr.org/fr/instruments-mechanisms/instruments/international-convention-protection-all-persons-enforced' },
      { name: 'Déclaration sur les défenseurs des droits de l’homme', year: '1998', note: 'Droit de promouvoir et de protéger les droits humains.', url: 'https://www.ohchr.org/fr/instruments-mechanisms/instruments/declaration-right-and-responsibility-individuals-groups-and' },
    ],
    lawTitle: 'Notre statut en droit français',
    law: [
      "L'ACJR est une association à but non lucratif régie par la loi du 1er juillet 1901 relative au contrat d’association et par le décret du 16 août 1901. Son siège est à Paris.",
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
      'Les faits documentés n’ont de valeur que s’ils parviennent à celles et ceux qui peuvent agir. L’ACJR dialogue avec les mécanismes internationaux et régionaux de protection des droits humains et contribue à leurs travaux, en toute indépendance.',
    ],
    unTitle: 'Le système des droits humains des Nations Unies',
    unLead: 'Nous contribuons aux travaux des mécanismes onusiens ouverts à la société civile.',
    un: [
      { title: 'Conseil des droits de l’homme', text: 'Déclarations, participation aux sessions et organisation d’événements parallèles à Genève.' },
      { title: 'Examen périodique universel', text: 'Rapports de parties prenantes et suivi des recommandations adressées aux États.' },
      { title: 'Procédures spéciales', text: 'Communications et informations transmises aux rapporteurs spéciaux et groupes de travail.' },
      { title: 'Organes de traités', text: 'Rapports alternatifs aux comités chargés de surveiller l’application des conventions.' },
    ],
    africaTitle: 'Le système africain et la justice internationale',
    africaLead: 'Nous agissons également au niveau du continent et devant les juridictions internationales.',
    africa: [
      { title: 'Commission africaine des droits de l’homme et des peuples', text: 'Participation aux sessions, communications et contributions aux résolutions.' },
      { title: 'Cour africaine des droits de l’homme et des peuples', text: 'Suivi des affaires et appui aux démarches des victimes, lorsque la juridiction est compétente.' },
      { title: 'Justice pénale internationale', text: 'Transmission d’informations et plaidoyer pour la lutte contre l’impunité des crimes les plus graves.' },
    ],
    networksTitle: 'Réseaux et partenariats',
    networks: [
      'L’ACJR coopère avec des organisations de la société civile africaines et internationales, des barreaux, des universités et des médias, afin de mutualiser l’expertise et d’amplifier la voix des victimes.',
    ],
    note: 'L’ACJR est une organisation indépendante. Sa participation à ces mécanismes n’implique aucune affiliation à l’Organisation des Nations Unies, à l’Union africaine ou à leurs organes.',
  },

  // Art. 11–15 — governance
  governance: {
    intro: [
      'L’ACJR est administrée de manière démocratique. Ses organes et leurs pouvoirs sont définis par les statuts adoptés le 17 septembre 2026.',
    ],
    bureauTitle: 'Le Bureau exécutif',
    bureauLead: 'Les membres du Bureau, tels que désignés dans les statuts :',
    bureau: [
      { name: 'ABDELRAHIM GREIN Sadam', role: 'Président' },
      { name: 'MAHMUD MOHAMED Hruia', role: 'Secrétaire général' },
      { name: 'EL TAHER AISSA Issam', role: 'Trésorier' },
    ],
    bodiesTitle: 'Les organes de l’association',
    bodies: [
      { title: 'L’assemblée générale', text: 'Elle réunit l’ensemble des membres, définit les orientations, approuve les comptes et élit les administrateurs. L’assemblée générale extraordinaire est seule compétente pour modifier les statuts.' },
      { title: 'Le conseil d’administration', text: 'Il met en œuvre les orientations décidées par l’assemblée générale et veille au bon fonctionnement de l’association.' },
      { title: 'Le Bureau', text: 'Composé du président, du secrétaire général et du trésorier, il assure la gestion courante. Le président représente l’association dans tous les actes de la vie civile.' },
    ],
    volunteerTitle: 'Une direction bénévole',
    volunteer: [
      'Les fonctions de membre des organes dirigeants sont exercées à titre bénévole. Seuls les frais engagés pour l’association, dûment justifiés, peuvent être remboursés.',
    ],
    statutesTitle: 'Nos statuts en bref',
    statutes: [
      'Préambule et références juridiques internationales',
      'Dénomination, siège à Paris et durée (art. 1 à 3)',
      'Principes (art. 4), vision et mission (art. 5), objectifs (art. 6)',
      'Engagement auprès des Nations Unies et du système africain (art. 7 et 8)',
      'Membres, admission et perte de la qualité de membre (art. 9 et 10)',
      'Gouvernance (art. 11 à 15)',
      'Ressources, indépendance financière et comptes (art. 16 à 18)',
      'Règlement intérieur et politiques internes (art. 19 et 20)',
    ],
    statutesNote: 'Les statuts complets peuvent être communiqués sur demande.',
  },

  // Art. 16–20 — finance and policies
  transparency: {
    intro: ['Nous rendons compte de notre statut, de nos ressources et de nos règles de fonctionnement.'],
    statusTitle: 'Statut juridique',
    status: [
      { label: 'Dénomination', value: 'Centre Africain pour les Droits de la Justice (ACJR)' },
      { label: 'Forme', value: 'Association régie par la loi du 1er juillet 1901' },
      { label: 'Siège', value: 'Paris, France' },
      { label: 'N° RNA', value: 'W751274196' },
      { label: 'Création', value: '25 avril 2024' },
      { label: 'Statuts en vigueur', value: '17 septembre 2026' },
    ],
    fundingTitle: 'Nos ressources',
    funding: ['Conformément à ses statuts, les ressources de l’association peuvent provenir :'],
    fundingSources: [
      'des cotisations de ses membres ;',
      'des dons de personnes physiques et morales ;',
      'de subventions publiques et de fondations ;',
      'des recettes de ses activités (formations, publications) ;',
      'de toute autre ressource autorisée par la loi.',
    ],
    independenceTitle: 'Notre indépendance',
    independence: [
      'L’ACJR refuse tout financement susceptible de compromettre son indépendance, son impartialité ou sa liberté de parole. Aucun financeur ne peut influencer le choix de ses sujets ni le contenu de ses travaux.',
    ],
    accountsTitle: 'Comptes et contrôle',
    accounts: [
      'Le trésorier tient une comptabilité régulière. Les comptes annuels sont soumis à l’approbation de l’assemblée générale et peuvent faire l’objet d’un audit.',
      'Les comptes approuvés seront publiés sur cette page.',
    ],
    policiesTitle: 'Politiques internes',
    policies: [
      { title: 'Protection des sources et des données', text: 'Règles strictes de confidentialité, de consentement et de sécurité de l’information.' },
      { title: 'Prévention des conflits d’intérêts', text: 'Déclaration et gestion des intérêts des membres des organes dirigeants.' },
      { title: 'Protection et sauvegarde', text: 'Prévention des abus et de l’exploitation, en particulier envers les personnes vulnérables.' },
      { title: 'Éthique et intégrité', text: 'Refus de toute forme de corruption et exigence de probité dans la gestion des ressources.' },
    ],
  },

  news: {
    emptyTitle: 'Aucune actualité publiée pour le moment',
    emptyText: 'Nos premières déclarations et publications paraîtront prochainement sur cette page.',
    followText: 'Pour être informé, écrivez-nous.',
  },

  // Art. 9–10 — members
  involved: {
    intro: ['L’ACJR est une association de membres et de bénévoles. Votre engagement compte.'],
    membershipTitle: 'Devenir membre',
    membershipLead: 'L’association réunit différentes catégories de membres :',
    categories: [
      { title: 'Membres fondateurs', text: 'Les personnes à l’origine de la création de l’association.' },
      { title: 'Membres actifs', text: 'Les personnes qui participent régulièrement aux activités et versent une cotisation.' },
      { title: 'Membres d’honneur', text: 'Les personnes qui ont rendu des services signalés à la cause des droits humains.' },
    ],
    admissionTitle: 'Admission',
    admission: [
      'Toute personne qui adhère aux principes de l’association peut demander à devenir membre. La demande est examinée par le Bureau, qui statue sur l’admission.',
    ],
    ways: [
      { title: 'Bénévolat', text: 'Juristes, chercheurs, traducteurs, communicants : mettez vos compétences au service de la justice.', cta: 'Proposer mon aide' },
      { title: 'Partenariats', text: 'Organisations, barreaux, universités, médias : construisons ensemble des projets communs.', cta: 'Devenir partenaire' },
      { title: 'Soutien', text: 'Votre soutien financier garantit notre indépendance. Contactez-nous pour connaître les modalités.', cta: 'Nous soutenir' },
    ],
    supportNote: 'Les modalités de don en ligne seront bientôt disponibles.',
  },

  contact: {
    intro: 'Pour toute question, demande de partenariat ou d’adhésion, utilisez le formulaire ci-dessous.',
    safetyTitle: 'Victimes et témoins : votre sécurité d’abord',
    safety: [
      'N’envoyez pas de preuves, de photos, de vidéos ni de noms de victimes par ce formulaire.',
      'Utilisez un appareil et une connexion que vous jugez sûrs. Pensez à effacer votre historique de navigation si nécessaire.',
      'Indiquez simplement comment et quand vous joindre en sécurité : nous vous recontacterons par un canal adapté.',
      'En cas de danger immédiat, contactez les services d’urgence locaux ou une organisation de protection présente dans votre pays.',
    ],
    formTitle: 'Écrivez-nous',
    fields: {
      name: 'Nom',
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
    inactive: 'Le formulaire de contact sera activé très prochainement. Merci de votre patience.',
    privacyLink: 'Consulter notre politique de confidentialité',
    locationTitle: 'Siège',
    location: 'Paris, France',
    emailTitle: 'Courriel',
    emailPending: 'Adresse bientôt disponible',
  },

  legal: {
    sections: [
      {
        title: 'Éditeur du site',
        body: [
          'Centre Africain pour les Droits de la Justice (ACJR), association régie par la loi du 1er juillet 1901.',
          'Siège social : Paris, France. N° RNA : W751274196.',
        ],
      },
      { title: 'Directeur de la publication', body: ['ABDELRAHIM GREIN Sadam, président de l’association.'] },
      { title: 'Hébergement', body: ['Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com.'] },
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
          'L’ACJR est une organisation indépendante. Les références faites sur ce site aux Nations Unies, à l’Union africaine ou à leurs organes décrivent des mécanismes avec lesquels l’association interagit ; elles n’impliquent aucune affiliation ni aucun soutien de leur part.',
        ],
      },
    ],
  },

  privacy: {
    updated: 'Dernière mise à jour : octobre 2026',
    sections: [
      { title: 'Responsable du traitement', body: ['Centre Africain pour les Droits de la Justice (ACJR), Paris, France.'] },
      {
        title: 'Données collectées',
        body: [
          'Nous ne collectons que les données que vous nous transmettez volontairement via le formulaire de contact : nom, adresse électronique, objet et message.',
          'Ces données servent uniquement à répondre à votre demande. Le fondement juridique est votre consentement (article 6.1.a du RGPD).',
        ],
      },
      {
        title: 'Destinataires et sous-traitants',
        body: [
          'Les messages sont transmis par le service Formspree, qui agit en tant que sous-traitant, puis lus par les seuls membres habilités de l’association. Vos données ne sont jamais vendues ni cédées.',
        ],
      },
      { title: 'Durée de conservation', body: ['Les messages sont conservés au maximum 12 mois après le dernier échange, puis supprimés.'] },
      {
        title: 'Cookies et mesure d’audience',
        body: ['Ce site ne dépose aucun cookie publicitaire ni de suivi et n’utilise aucun outil de traçage tiers. Aucun bandeau de consentement n’est donc nécessaire.'],
      },
      {
        title: 'Vos droits',
        body: [
          'Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité de vos données, ainsi que du droit de retirer votre consentement à tout moment. Pour les exercer, contactez-nous via le formulaire de contact.',
          'Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr).',
        ],
      },
    ],
  },
};
