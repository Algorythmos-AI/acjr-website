import type { Content } from './types';
import { site, pendingText } from '../config/site.ts';

const p = pendingText.en;

/* English translation of fr.ts. English carries the organisation's legal reference name. */
export const en: Content = {
  meta: {
    home: {
      title: 'Justice and human rights in Africa',
      description:
        'ACJR documents human-rights violations, supports victims and advocates for justice and accountability in Africa.',
      lead: '',
    },
    about: {
      title: 'About us',
      description: 'History, vision and mission of the African Center for Justice Rights (ACJR), a Paris-based association under the 1901 law.',
      lead: 'An independent association, founded in Paris, working for justice and human dignity in Africa.',
    },
    principles: {
      title: 'Our principles',
      description: 'ACJR’s five principles: independence, universality of rights, impartiality, non-discrimination and a victim-centred approach.',
      lead: 'Five principles, set by our statutes, frame everything we do.',
    },
    framework: {
      title: 'Legal framework',
      description: 'The international and African human-rights instruments on which ACJR bases its work.',
      lead: 'Our work rests on international human-rights law, humanitarian law and international criminal law.',
    },
    work: {
      title: 'What we do',
      description: 'Documentation, legal analysis, transitional justice, protection of defenders, vulnerable groups, research and training.',
      lead: 'Six areas of work, set out in our statutes, to advance justice and accountability.',
    },
    advocacy: {
      title: 'International advocacy',
      description: 'How ACJR aims to carry the voices of victims to the UN and African human-rights mechanisms.',
      lead: 'We aim to bring documented facts before international and regional human-rights mechanisms.',
    },
    governance: {
      title: 'Governance',
      description: 'Executive Bureau, General Assembly and Board: how ACJR is democratically governed.',
      lead: 'Democratic, volunteer-led governance, as defined by our statutes.',
    },
    transparency: {
      title: 'Transparency',
      description: 'ACJR’s legal status, funding sources, independence, accounts and internal policies.',
      lead: 'Our credibility rests on our independence and on being open about how we work.',
    },
    news: {
      title: 'News',
      description: 'The latest news, statements and publications from ACJR.',
      lead: 'Statements, publications and activities of the association.',
    },
    involved: {
      title: 'Get involved',
      description: 'Become a member, volunteer or partner of ACJR, or support its work.',
      lead: 'Members, volunteers and partners: everyone can help defend human rights.',
    },
    contact: {
      title: 'Contact',
      description: 'Contact ACJR, a Paris-based human-rights association. Safety advice for victims and witnesses.',
      lead: 'Write to us. If you are a victim or a witness, please read our safety advice first.',
    },
    legal: {
      title: 'Legal notice',
      description: 'Legal notice for the ACJR website: publisher, publication director, host and intellectual property.',
      lead: 'Information required by the French law on confidence in the digital economy (LCEN).',
    },
    privacy: {
      title: 'Privacy policy',
      description: 'How ACJR handles your personal data under the GDPR. No tracking cookies.',
      lead: 'We collect the bare minimum and set no tracking cookies.',
    },
  },

  nav: {
    home: 'Home',
    about: 'About us',
    principles: 'Our principles',
    framework: 'Legal framework',
    work: 'What we do',
    advocacy: 'Advocacy',
    governance: 'Governance',
    transparency: 'Transparency',
    news: 'News',
    involved: 'Get involved',
    contact: 'Contact',
    legal: 'Legal notice',
    privacy: 'Privacy',
  },

  facts: [
    { value: '2024', label: 'Founded in Paris' },
    { value: '1901 law', label: 'Non-profit association' },
    { value: '6', label: 'Areas of work' },
    { value: 'Africa', label: 'and the international stage' },
  ],

  home: {
    eyebrow: 'African Center for Justice Rights',
    heroTitle: 'For an Africa where justice, the rule of law and human dignity are effectively protected',
    heroLead:
      'We document serious human-rights violations, stand with victims and carry their voices to national, African and international bodies.',
    ctaPrimary: 'Explore our work',
    ctaSecondary: 'About us',
    missionEyebrow: 'Our mission',
    missionTitle: 'Establish the facts, defend rights, demand accountability',
    missionText: [
      'ACJR is an independent human-rights association. It works to ensure that violations committed in Africa are rigorously documented, that those responsible are held to account, and that victims obtain truth, justice and reparation.',
      'It acts in accordance with international law, impartially, and with the safety and dignity of the people concerned at the heart of its work.',
    ],
    objectivesTitle: 'Our areas of work',
    objectivesLead: 'Six objectives, set out in Article 6 of our statutes, shape our work.',
    howTitle: 'How we work',
    howLead: 'From the field to international bodies, a rigorous chain of work.',
    how: [
      { title: 'Document', text: 'Gather and preserve testimony and evidence to international standards.' },
      { title: 'Analyse', text: 'Assess the facts under international and regional law.' },
      { title: 'Advocate', text: 'Bring the facts before UN and African mechanisms and competent courts.' },
      { title: 'Support', text: 'Stand with victims, witnesses and human-rights defenders, safely.' },
    ],
    principlesTitle: 'Non-negotiable principles',
    principlesLead: 'Independence, universality of rights, impartiality, non-discrimination and a victim-centred approach.',
    advocacyTitle: 'A voice before international mechanisms',
    advocacyText:
      'The Human Rights Council, the Universal Periodic Review, special procedures, treaty bodies and the African Commission on Human and Peoples’ Rights: where it is permitted to take part and in line with their rules, ACJR aims to take documented facts where they can make a difference.',
    involvedTitle: 'Get involved',
    involvedText:
      'Lawyers, researchers, journalists, translators or concerned citizens: join a volunteer association committed to justice.',
    involvedCta: 'Become a member or volunteer',
  },

  objectives: [
    {
      id: 'documentation',
      title: 'Monitoring and documenting violations',
      short: 'Monitor and document serious violations, following the Istanbul and Minnesota Protocols.',
      body: [
        'Credible justice starts with established facts. ACJR monitors and documents serious human-rights violations, using verifiable methods and probative evidence.',
        'It promotes internationally recognised investigation protocols, notably the Istanbul Protocol (documenting torture) and the Minnesota Protocol (investigating potentially unlawful deaths).',
      ],
      points: [
        'Monitoring situations and documenting serious violations',
        'Promoting the Istanbul and Minnesota Protocols',
        'Verifiable methods and probative evidence',
        'Safety, dignity and consent of victims and witnesses',
      ],
    },
    {
      id: 'litigation',
      title: 'Legal analysis and strategic litigation',
      short: 'Prepare analysis, case files and legal briefs in support of justice mechanisms.',
      body: [
        'ACJR prepares analysis, documentary case files and legal briefs.',
        'In accordance with applicable law, this work supports justice mechanisms and strategic litigation before the competent courts.',
      ],
      points: ['Legal analysis', 'Documentary case files', 'Legal briefs', 'Support for justice mechanisms and strategic litigation'],
    },
    {
      id: 'transitional',
      title: 'Transitional justice',
      short: 'Support truth-seeking, accountability, reparation and institutional reform.',
      body: [
        'Societies emerging from conflict or crisis need truth, justice and lasting reform.',
        'ACJR supports transitional-justice processes, in keeping with its origins: the association was founded as « Paix et la Transition Démocratique » (Peace and Democratic Transition).',
      ],
      points: ['Truth-seeking', 'Accountability', 'Reparation', 'Institutional reform'],
    },
    {
      id: 'defenders',
      title: 'Protecting human-rights defenders',
      short: 'Legal protection and advocacy for defenders, lawyers, journalists and whistle-blowers.',
      body: [
        'Human-rights defenders, lawyers, journalists and people who report violations are often put at risk by their commitment.',
        'ACJR contributes to their legal protection and advocates on their behalf, drawing in particular on the UN Declaration on Human Rights Defenders.',
      ],
      points: ['Legal protection', 'Advocacy', 'Human-rights defenders, lawyers and journalists', 'People who report violations'],
    },
    {
      id: 'vulnerable',
      title: 'Protecting vulnerable groups',
      short: 'Defend women, children, refugees, displaced people and minorities.',
      body: [
        'Conflicts and crises hit the most vulnerable first.',
        'ACJR defends the rights of vulnerable people and groups, in particular women exposed to gender-based violence, children affected by conflict, refugees, displaced people and minorities.',
      ],
      points: ['Women exposed to gender-based violence', 'Children affected by conflict', 'Refugees and displaced people', 'Minorities'],
    },
    {
      id: 'research',
      title: 'Research and training',
      short: 'Produce and share research, and train human-rights actors.',
      body: [
        'Defending human rights depends on knowledge. ACJR produces and disseminates research, studies and analysis.',
        'It contributes to training human-rights actors at national and regional level.',
      ],
      points: ['Research and studies', 'Published analysis', 'Training for human-rights actors', 'At national and regional level'],
    },
  ],

  about: {
    storyTitle: 'Our story',
    story: [
      'The association was founded in Paris on 25 April 2024 as « Paix et la Transition Démocratique » (Peace and Democratic Transition) by its three founding members.',
      'On 17 September 2026, an extraordinary general assembly changed its name and statutes. As the African Center for Justice Rights (ACJR) it is the legal continuation of the original association: no new legal entity was created and the founding members are unchanged. The change was registered with the prefecture on 30 September 2026.',
    ],
    timeline: [
      { date: '25 April 2024', title: 'Founded', text: '« Paix et la Transition Démocratique » is constituted in Paris.' },
      { date: '17 September 2026', title: 'New statutes', text: 'An extraordinary general assembly adopts the new name and statutes.' },
      { date: '30 September 2026', title: 'Registered', text: 'Change registered with the prefecture — RNA W751274196.' },
    ],
    visionTitle: 'Our vision',
    vision: 'To contribute to an Africa in which justice, the rule of law, human dignity and fundamental freedoms are effectively protected.',
    missionTitle: 'Our mission',
    mission: [
      'Methodically monitor and document human-rights violations in line with international legal standards.',
      'Contribute to the fight against impunity.',
      'Support victims.',
      'Strengthen civic space, access to justice and good governance.',
    ],
    namesTitle: 'Our names',
    namesText: 'The English name is the legal reference name. The statutes allow French and Arabic translations for international communication:',
    nextTitle: 'Find out more',
  },

  principles: {
    intro: 'Article 4 of our statutes sets out five principles for our human-rights work.',
    items: [
      { title: 'Independence', text: 'ACJR works fully independently of governments, political parties, religious organisations and financial interests.' },
      { title: 'Universality and indivisibility of rights', text: 'All human rights are treated as interdependent and indivisible.' },
      { title: 'Impartiality and documentary rigour', text: 'Monitoring, documentation and analysis rest on verifiable methods, probative evidence and respect for applicable standards.' },
      { title: 'Non-discrimination', text: 'ACJR acts for every person without distinction, in particular of origin, colour, sex, religion, political opinion, or national or social origin.' },
      { title: 'A victim-centred approach', text: 'The safety, dignity, consent, access to remedy and reparation of victims and witnesses are essential considerations.' },
    ],
  },

  framework: {
    intro: [
      'The preamble to our statutes places ACJR’s work within international law. The association seeks to contribute to criminal justice, the fight against impunity, transitional justice and the strengthening of the rule of law on the African continent.',
    ],
    referencesTitle: 'Instruments cited in the preamble',
    references: [
      { name: 'Charter of the United Nations', year: '1945', note: 'The purposes and principles that inspire the association.', url: 'https://www.un.org/en/about-us/un-charter' },
      { name: 'Universal Declaration of Human Rights', year: '1948', note: 'The universal foundation of human rights.', url: 'https://www.un.org/en/about-us/universal-declaration-of-human-rights' },
      { name: 'International Covenant on Civil and Political Rights', year: '1966', note: 'Right to life, prohibition of torture, fair trial, fundamental freedoms.', url: 'https://www.ohchr.org/en/instruments-mechanisms/instruments/international-covenant-civil-and-political-rights' },
      { name: 'International Covenant on Economic, Social and Cultural Rights', year: '1966', note: 'Rights to work, health, education and an adequate standard of living.', url: 'https://www.ohchr.org/en/instruments-mechanisms/instruments/international-covenant-economic-social-and-cultural-rights' },
      { name: 'African Charter on Human and Peoples’ Rights', year: '1981', note: 'The cornerstone of the African human-rights system.', url: 'https://achpr.au.int/en/charter/african-charter-human-and-peoples-rights' },
      { name: 'Geneva Conventions of 12 August 1949 and Additional Protocols', year: '1949 · 1977', note: 'Protection of people in armed conflict.', url: 'https://ihl-databases.icrc.org/en/ihl-treaties' },
      { name: 'Rome Statute of the International Criminal Court', year: '1998', note: 'Genocide, crimes against humanity, war crimes, the crime of aggression.', url: 'https://www.icc-cpi.int/publications/core-legal-texts' },
      { name: 'Convention against Torture', year: '1984', note: 'Absolute prohibition of torture and cruel, inhuman or degrading treatment.', url: 'https://www.ohchr.org/en/instruments-mechanisms/instruments/convention-against-torture-and-other-cruel-inhuman-or-degrading' },
      { name: 'International Convention for the Protection of All Persons from Enforced Disappearance', year: '2006', note: 'Prohibition of enforced disappearance and the right to truth.', url: 'https://www.ohchr.org/en/instruments-mechanisms/instruments/international-convention-protection-all-persons-enforced' },
      { name: 'UN Declaration on Human Rights Defenders', year: '1998', note: 'The right to promote and protect human rights.', url: 'https://www.ohchr.org/en/instruments-mechanisms/instruments/declaration-right-and-responsibility-individuals-groups-and' },
    ],
    lawTitle: 'Our status under French law',
    law: [
      'ACJR is a non-profit association governed by the French law of 1 July 1901 and the decree of 16 August 1901, with an African and international mission. It is based in Paris and has no fixed term.',
      'It works in France, in Africa and internationally.',
    ],
    protocolsTitle: 'Documentation standards',
    protocols: [
      { title: 'Istanbul Protocol', text: 'Manual on the effective investigation and documentation of torture and other cruel, inhuman or degrading treatment or punishment.' },
      { title: 'Minnesota Protocol', text: 'Protocol on the investigation of potentially unlawful death.' },
    ],
  },

  work: {
    intro: [
      'Our statutes set six complementary objectives. Together they cover the whole chain from establishing the facts to justice and reparation.',
    ],
    methodTitle: 'An integrated approach',
    method: [
      'Each area feeds the others: documentation underpins legal analysis, which underpins advocacy; research and training strengthen the whole.',
    ],
    pointsTitle: 'In practice',
  },

  advocacy: {
    intro: [
      'Documented facts matter only if they reach those who can act. ACJR seeks to engage with international and regional human-rights mechanisms, independently and in line with their rules.',
    ],
    unTitle: 'The UN system and the Human Rights Council',
    unLead: 'Where it is permitted to take part, and in line with the applicable rules, ACJR may contribute to the work of these mechanisms.',
    un: [
      { title: 'Human Rights Council', text: 'Taking part in sessions, consultations and events, and organising or contributing to side events.' },
      { title: 'Universal Periodic Review', text: 'Preparing and submitting contributions, under the conditions the mechanism sets.' },
      { title: 'Special procedures', text: 'Sending information, communications and appeals to special procedures and competent mechanisms.' },
      { title: 'Treaty bodies', text: 'Shadow reports and contributions; where the law allows, helping victims access complaint mechanisms.' },
    ],
    africaTitle: 'Regional and international cooperation',
    africaLead: 'ACJR also aims to act at continental level and with international judicial institutions.',
    africa: [
      { title: 'African Commission on Human and Peoples’ Rights', text: 'Cooperation and advocacy with the Commission.' },
      { title: 'Other African mechanisms', text: 'Cooperation and advocacy with other competent African mechanisms, in line with their rules on referral and participation.' },
      { title: 'International judicial institutions', text: 'Submitting documented information where this is legally possible and relevant.' },
    ],
    networksTitle: 'Alliances and networks',
    networks: [
      'ACJR seeks to build alliances and networks with non-governmental organisations, institutions and regional or international actors pursuing compatible goals.',
    ],
    note: 'ACJR is an independent organisation. It does not currently hold consultative status with the UN Economic and Social Council (ECOSOC) and is not accredited to any UN or African Union body. Any engagement with these mechanisms implies no affiliation with, or endorsement by, them.',
  },

  governance: {
    intro: [
      'ACJR is governed democratically. Its bodies and their powers are defined by the statutes adopted on 17 September 2026; internal rules, prepared by the Board and approved by the General Assembly, set out the details.',
    ],
    bureauTitle: 'The Executive Bureau',
    bureauLead: 'When the statutes were adopted, continuity in office was ensured by the three founding members:',
    bureau: [
      { name: 'ABDELRAHIM GREIN Sadam', role: 'President', duty: 'Legally represents the association in all civil matters.' },
      { name: 'MAHMUD MOHAMED Hruia', role: 'Secretary-General', duty: 'Handles administration and coordination, and keeps the minutes.' },
      { name: 'EL TAHER AISSA Issam', role: 'Treasurer', duty: 'Oversees finances, the accounts and budget preparation.' },
    ],
    bureauNote: 'The Bureau is elected by the Board from among its members. It may include a Vice-President, who assists and stands in for the President.',
    bodiesTitle: 'The association’s bodies',
    bodies: [
      {
        title: 'Ordinary General Assembly',
        text: 'It brings together the voting members. It approves the activity and financial reports and the budget, elects the Board, sets membership fees and approves the internal rules.',
        facts: ['At least once a year', '21 days’ notice', 'Simple majority'],
      },
      {
        title: 'Extraordinary General Assembly',
        text: 'The only body that can amend the statutes or dissolve the association.',
        facts: ['Quorum: two-thirds of voting members', 'Two-thirds majority', 'Second assembly within 30 days if quorum fails'],
      },
      {
        title: 'Board of Directors',
        text: 'It sets the direction for implementing the Assembly’s decisions, oversees general policies, adopts the draft budget and ensures sound administration.',
        facts: ['3 to 7 members', 'Renewable 3-year term', 'Meets at least every six months'],
      },
      {
        title: 'Executive Bureau',
        text: 'Elected by the Board from its members, it includes at least a President, a Secretary-General and a Treasurer.',
        facts: ['Optional Vice-President', 'The President represents the association'],
      },
    ],
    volunteerTitle: 'Volunteer leadership',
    volunteer: [
      'Positions on the Board and the Executive Bureau are voluntary and unpaid. Expenses actually incurred in the association’s interest may be reimbursed against receipts and are recorded in the financial documents.',
    ],
    statutesTitle: 'Our statutes at a glance',
    statutes: [
      'Preamble and international legal references',
      'Constitution, name, seat and duration (Art. 1–3)',
      'Guiding principles and independence (Art. 4)',
      'Vision, mission and strategic objectives (Art. 5–6)',
      'Methods and international advocacy (Art. 7–8)',
      'Members, rights and obligations (Art. 9–10)',
      'Organisation and governance (Art. 11–15)',
      'Finance and transparency (Art. 16–18)',
      'Internal rules and policies (Art. 19–20)',
      'Dissolution, liquidation and formalities (Art. 21–22)',
    ],
    statutesNote: 'The full statutes are available on request.',
  },

  transparency: {
    intro: ['We are open about our status, our resources and the rules we work by.'],
    statusTitle: 'Legal status',
    status: [
      { label: 'Legal name', value: 'African Center for Justice Rights (ACJR)' },
      { label: 'In French', value: 'Centre Africain pour les Droits de la Justice (CADJ)' },
      { label: 'Legal form', value: 'Association under the French law of 1 July 1901' },
      { label: 'Seat', value: 'Paris, France' },
      { label: 'RNA number', value: 'W751274196' },
      { label: 'Founded', value: '25 April 2024' },
      { label: 'Current statutes', value: '17 September 2026' },
      { label: 'Financial year', value: '1 January – 31 December' },
    ],
    fundingTitle: 'Our resources',
    funding: ['Under Article 16 of the statutes, the association’s resources comprise:'],
    fundingSources: [
      'membership fees;',
      'grants;',
      'donations and bequests permitted by law;',
      'funding from foundations and public or private bodies compatible with its independence;',
      'income from non-profit activities, studies, training or publications;',
      'any other resources permitted by the laws and regulations in force.',
    ],
    independenceTitle: 'Our independence',
    independence: [
      'ACJR refuses any funding whose conditions would be incompatible with its independence, its impartiality, its statutory objectives or the integrity of its monitoring, documentation and human-rights work.',
    ],
    accountsTitle: 'Accounts and oversight',
    accounts: [
      'Regular accounts are kept. The financial report is submitted to the General Assembly for approval every year.',
      'Where the law, applicable thresholds, contractual commitments or a General Assembly decision require it, the accounts are audited or certified by a qualified professional.',
    ],
    policiesTitle: 'Internal policies',
    policiesLead: 'Under Article 20 of the statutes, the association adopts internal policies covering in particular:',
    policies: [
      { title: 'Ethics and conduct', text: 'Standards of behaviour expected of members, volunteers and representatives.' },
      { title: 'Protecting children and vulnerable people', text: 'Preventing abuse and exploitation.' },
      { title: 'Conflicts of interest and corruption', text: 'Preventing conflicts of interest and corruption.' },
      { title: 'Protection of data and sources', text: 'Confidentiality and security of information, victims, witnesses and sources.' },
      { title: 'Equal opportunity and non-discrimination', text: 'Equal opportunity and the prevention of discrimination.' },
    ],
  },

  news: {
    emptyTitle: 'No news published yet',
    emptyText: 'Our first statements and publications will appear on this page soon.',
    followText: 'To stay informed, write to us.',
  },

  involved: {
    intro: ['ACJR is a membership association. Your commitment counts.'],
    membershipTitle: 'Become a member',
    membershipLead: 'The statutes provide for four categories of members:',
    categories: [
      { title: 'Founding members', text: 'ABDELRAHIM GREIN Sadam, MAHMUD MOHAMED Hruia and EL TAHER AISSA Issam, signatories of the founding act.' },
      { title: 'Active members', text: 'Individuals or organisations admitted as members, who take part in activities and pay the annual fee where applicable.' },
      { title: 'Associate members', text: 'People or organisations supporting the association’s work in an advisory capacity, without voting rights.' },
      { title: 'Honorary members', text: 'Distinguished people recognised for their contribution to the association’s goals, exempt from fees.' },
    ],
    admissionTitle: 'Admission',
    admission: [
      'Admission follows the procedure set out in the internal rules. The association may take into account, among other things, commitment to its values and the absence of known involvement in serious human-rights violations, serious corruption or incitement to hatred.',
    ],
    lossTitle: 'Loss of membership',
    loss: [
      'Membership ends on death, written resignation, non-payment of a fee that is due, or exclusion for serious cause. Any exclusion must be reasoned, and the person concerned may first present their observations.',
    ],
    ways: [
      { title: 'Volunteer', text: 'Lawyers, researchers, translators, communicators: put your skills to work for justice.', cta: 'Offer my help' },
      { title: 'Partner', text: 'Organisations and institutions with compatible goals: let’s build alliances together.', cta: 'Become a partner' },
      { title: 'Support', text: 'Donations and bequests help keep us independent. Contact us to find out how.', cta: 'Support us' },
    ],
    supportNote: 'Online donations will be available soon.',
  },

  contact: {
    intro: 'For questions, partnership or membership requests, please use the form below.',
    safetyTitle: 'Victims and witnesses: your safety comes first',
    safety: [
      'This form is not a secure channel: it is not end-to-end encrypted, and messages pass through a US-based provider (Formspree).',
      'Do not describe what you experienced or witnessed, give names, places or dates, or send evidence, photos or videos.',
      'Use a device, connection and email account that only you control: our reply will arrive in that inbox. Use private browsing and clear your history if necessary.',
      'Simply tell us how and when you can be reached safely. We will try to contact you through a suitable channel, but cannot guarantee a response time.',
      'If you are in immediate danger, contact emergency services or a protection organisation you trust, if you can do so safely.',
    ],
    formTitle: 'Write to us',
    fields: {
      name: 'Name',
      email: 'Email address',
      subject: 'Subject',
      message: 'Message',
      consent: 'I agree that ACJR may use this information to reply to my message.',
    },
    subjects: ['General question', 'Membership or volunteering', 'Partnership', 'Press', 'Other'],
    required: 'Required',
    submit: 'Send message',
    sending: 'Sending…',
    errorSummary: 'There is a problem with the form:',
    errors: {
      name: 'Enter your name.',
      email: 'Enter a valid email address, for example name@example.org.',
      message: 'Enter your message.',
      consent: 'Tick the consent box to send your message.',
    },
    success: 'Thank you, your message has been sent. We will reply as soon as possible.',
    failure: 'Your message could not be sent. Please try again later.',
    inactive: 'The contact form is not active yet, so no message can be sent for now. Our contact details will be published on this page very soon.',
    privacyLink: 'Read our privacy policy',
    locationTitle: 'Seat',
    location: 'Paris, France',
    emailTitle: 'Email',
    emailPending: 'Address coming soon',
  },

  // LCEN art. 6 III. Missing client details render as "to be published shortly".
  legal: {
    sections: [
      {
        title: 'Publisher',
        body: [
          'African Center for Justice Rights (ACJR), a non-profit association governed by the French law of 1 July 1901. RNA number: W751274196.',
          `Registered office: ${site.postalAddress ?? `Paris, France (postal address ${p})`}.`,
          `Phone: ${site.phone ?? p}. Email: ${site.email ?? p}.`,
        ],
      },
      { title: 'Publication director', body: ['ABDELRAHIM GREIN Sadam, President of the association.'] },
      {
        title: 'Hosting',
        body: [`${site.host.name}, ${site.host.address}, USA. Phone: ${site.host.phone ?? p}. Website: ${site.host.url}.`],
      },
      {
        title: 'Intellectual property',
        body: [
          'The text, logo and graphics on this site belong to ACJR unless stated otherwise. Any reproduction, even partial, requires prior permission, except for short quotations with the source cited.',
        ],
      },
      { title: 'External links', body: ['Links to third-party sites are provided for information. ACJR is not responsible for their content.'] },
      {
        title: 'Independence',
        body: [
          'ACJR is an independent organisation. It does not currently hold consultative status with the UN Economic and Social Council (ECOSOC) and is not accredited to any UN or African Union body. References on this site to these mechanisms describe bodies the association may engage with; they imply no affiliation with, or endorsement by, them.',
        ],
      },
    ],
  },

  // GDPR art. 13.
  privacy: {
    updated: 'Last updated: 23 October 2026',
    sections: [
      {
        title: 'Data controller',
        body: [
          `African Center for Justice Rights (ACJR), a French non-profit association with its registered office in Paris, France. Contact: ${site.email ?? p}.`,
          'The association has not appointed a data protection officer.',
        ],
      },
      {
        title: 'Hosting and connection data',
        body: [
          'The site is hosted by Vercel Inc. (USA). On every visit, Vercel processes technical connection data (IP address, date and time, page requested, browser type) to serve the pages and keep the service secure.',
          'This processing is based on our legitimate interest in running a secure website (Article 6(1)(f) GDPR). Vercel keeps these logs for a limited period, as set out in its privacy policy.',
        ],
      },
      {
        title: 'Contact form',
        body: [
          'When it is active, the contact form collects your name, email address, subject and message. This data is used solely to reply to you.',
          'The legal basis is your consent (Article 6(1)(a) GDPR), which you can withdraw at any time.',
        ],
      },
      {
        title: 'Sensitive data',
        body: [
          'Do not include information about your health, origins, political or religious opinions, or violations you experienced or witnessed. If you do, you explicitly consent to its processing solely to reply to you (Article 9(2)(a) GDPR).',
        ],
      },
      {
        title: 'Recipients and processors',
        body: [
          'Your data is never sold. It is passed only to the processors listed here: Vercel Inc. for hosting and Formspree Inc. for delivering form messages. Only authorised members of the association read it.',
        ],
      },
      {
        title: 'Transfers outside the European Union',
        body: [
          'Vercel Inc. and Formspree Inc. are based in the USA. Transfers to Vercel rely on the EU–US Data Privacy Framework, in which Vercel states it participates.',
          'The safeguards for transfers to Formspree will be set out here before the form is activated.',
        ],
      },
      {
        title: 'Retention',
        body: ['Messages are deleted no later than 12 months after the last exchange, including from Formspree and our mailboxes.'],
      },
      {
        title: 'Cookies and analytics',
        body: ['This site sets no cookies and uses no third-party analytics or tracking tools, so no consent banner is needed.'],
      },
      {
        title: 'Your rights',
        body: [
          'You have the right to access, rectify, erase, restrict, object to and port your data, and to withdraw your consent at any time. To exercise these rights, write to the data controller at the contact details above.',
          'You may also lodge a complaint with the French data-protection authority, the CNIL (cnil.fr).',
        ],
      },
    ],
  },
};
