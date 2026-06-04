import type { Experience } from '@/components/CareerCard/CareerCard.types';

export const careers: Experience[] = [
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
];
