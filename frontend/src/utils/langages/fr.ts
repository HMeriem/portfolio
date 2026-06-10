import type { Translations } from './translations.types';

export const fr: Translations = {
  header: {
    skills: 'Compétences',
    career: 'Parcours',
    contact: 'Contact',
    langToggle: 'EN',
  },
  theme: {
    dark: 'Sombre',
    light: 'Clair',
    ariaLabel: 'Changer le thème',
  },
  identity: {
    availability: 'Disponible pour de nouvelles opportunités',
    jobTitle: 'Développeuse Full Stack',
    contractTypes: 'CDI | CDD | Freelance',
    cvButton: 'Mon CV',
    cvPath: '/cv-meriem-hammouya.pdf',
    cvDownloadName: 'CV Meriem Hammouya.pdf',
  },
  presentation: {
    bio: "Développeuse passionnée et curieuse, j'ai acquis, au fil de mes cinq années d'expérience professionnelle, une base solide de compétences techniques et humaines. Ces dernières me permettent aujourd'hui de m'adapter à des environnements variés, de collaborer avec des équipes aux profils divers, et surtout de relever des défis complexes. Ce que je recherche avant tout : des partenariats stimulants, la satisfaction d'un code utile, bien pensé et bien écrit.",
    stats: [
      { value: '5+', label: "Ans d'exp." },
      { value: '4', label: 'Entreprises' },
      { value: 'TS', label: 'Stack principale' },
      { value: 'M2', label: 'MIASHS DCISS' },
    ],
  },
  skills: {
    sectionTitle: 'Compétences',
    languages: 'Langages',
    frameworks: 'Frameworks',
    tools: 'Outils & Pratiques',
  },
  career: {
    sectionTitle: 'Parcours',
    entries: [
      {
        period: "2024 — aujourd'hui",
        title: 'Lead développeuse TS / Python',
        company: 'Ergonova',
        description: [
          {
            text: "Conception et développement from scratch d'une application d'analyse ergonomique par détection d'actions sur vidéo (React / FastAPI)",
          },
          {
            text: 'Planification, cadrage et pilotage du projet en environnement contraint (financement limité, marché concurrentiel)',
          },
          { text: "Encadrement et suivi technique d'un apprenti développeur" },
          {
            text: "Collaboration avec un chercheur IA pour l'intégration des modèles de détection dans l'application",
          },
          {
            text: 'Élaboration du plan commercial et participation à la stratégie de mise sur le marché',
          },
        ],
      },
      {
        period: '2023 — 2024',
        title: 'Développeuse JavaScript',
        company: 'Zenride',
        description: [
          {
            text: 'Recherche de solutions pour faciliter la prise de commande par nos partenaires, suivi de la planification, développement et livraison',
          },
          { text: 'Résolution de bug avec un objectif zéro bugs' },
          { text: 'Optimisation de processus agiles et de livraisons' },
          { text: 'Formation des équipes aux nouveaux outils développés' },
          { text: 'Veille des dépendances utilisées sur le projet' },
        ],
      },
      {
        period: '2021 — 2023',
        title: 'Développeuse Full-stack',
        company: 'Kaizen Solutions',
        description: [
          {
            text: 'Dans le cadre de la modernisation des outils :',
            subItems: [
              'Choix des technologies les plus adaptées',
              'Analyse du code et du cahier des charges pour identifier les fonctionnalités à implémenter et celles à challenger',
              'Réalisation de tests en situation réelle',
              'Estimation des coûts',
            ],
          },
          {
            text: 'Mise en place de solutions agiles dans un contexte de cycle en V',
          },
          { text: 'Implémentation de GIT, Cypress, Jest, Cucumber, TypeORM' },
          { text: 'Proposition de nouvelles fonctionnalités' },
        ],
      },
      {
        period: '2019 — 2021',
        title: 'Développeuse Full-stack',
        company: 'Antilop',
        description: [
          { text: "Mise en œuvre d'une politique zéro bug" },
          { text: 'Intégration des maquettes' },
          {
            text: 'Participation aux cérémonies agiles (daily, sprint planning, rétrospective…)',
          },
          { text: 'Implémentation de nouvelles fonctionnalités' },
          { text: 'Création de hooks sur PrestaShop' },
        ],
      },
    ],
  },
  contact: {
    sectionTitle: 'Contact',
    tagline: 'Parlons-en.',
    links: {
      email: 'Envoyer un email',
      github: 'Profil GitHub',
      linkedin: 'Profil LinkedIn',
      location: 'Marseille — remote ok',
    },
    form: {
      namePlaceholder: 'Nom',
      emailPlaceholder: 'Email',
      messagePlaceholder: 'Message...',
      submitIdle: 'Envoyer →',
      submitLoading: 'Envoi...',
      success: 'Message envoyé avec succès.',
      errorServer: 'Une erreur est survenue côté serveur. Réessayez plus tard.',
      errorNetwork:
        'Impossible de joindre le serveur. Vérifiez votre connexion internet.',
      errorRateLimit:
        'Vous avez atteint la limite de messages par jour. Réessayez ultérieurement.',
      validationName: 'Veuillez indiquer votre nom.',
      validationEmail: 'Veuillez indiquer votre adresse email.',
      validationEmailFormat: 'Adresse email invalide.',
      validationMessage: 'Veuillez écrire votre message.',
    },
  },
};
