import type { Translations } from './translations.types';

export const en: Translations = {
  header: {
    skills: 'Skills',
    career: 'Career',
    contact: 'Contact',
    langToggle: 'FR',
  },
  theme: {
    dark: 'Dark',
    light: 'Light',
    ariaLabel: 'Change theme',
  },
  identity: {
    availability: 'Available for new opportunities',
    jobTitle: 'Full Stack Developer',
    contractTypes: 'Permanent | Fixed-term | Freelance',
    cvButton: 'My Resume',
    cvPath: '/cv-en.pdf',
    cvDownloadName: 'Resume Meriem Hammouya.pdf',
  },
  presentation: {
    bio: 'A passionate and curious developer, I have built a solid foundation of technical and interpersonal skills over five years of professional experience. These allow me to adapt to diverse environments, collaborate with varied teams, and tackle complex challenges. What I seek above all: stimulating partnerships and the satisfaction of writing useful, well-designed code.',
    stats: [
      { value: '5+', label: 'Years exp.' },
      { value: '4', label: 'Companies' },
      { value: 'TS', label: 'Main stack' },
      { value: 'M2', label: 'MIASHS DCISS' },
    ],
  },
  skills: {
    sectionTitle: 'Skills',
    languages: 'Languages',
    frameworks: 'Frameworks',
    tools: 'Tools & Practices',
  },
  career: {
    sectionTitle: 'Career',
    entries: [
      {
        period: '2024 — present',
        title: 'Lead TS / Python Developer',
        company: 'Ergonova',
        description: [
          {
            text: 'Design and development from scratch of an ergonomic analysis application using video-based action detection (React / FastAPI)',
          },
          {
            text: 'Project planning, scoping and management in a constrained environment (limited funding, competitive market)',
          },
          {
            text: 'Technical supervision and mentoring of an apprentice developer',
          },
          {
            text: 'Collaboration with an AI researcher to integrate detection models into the application',
          },
          {
            text: 'Business plan development and participation in go-to-market strategy',
          },
        ],
      },
      {
        period: '2023 — 2024',
        title: 'JavaScript Developer',
        company: 'Zenride',
        description: [
          {
            text: 'Research of solutions to streamline order placement by our partners, along with planning follow-up, development and delivery',
          },
          { text: 'Bug resolution with a zero-bug objective' },
          { text: 'Optimisation of agile processes and delivery workflows' },
          { text: 'Training teams on newly developed tools' },
          { text: 'Dependency monitoring on the project' },
        ],
      },
      {
        period: '2021 — 2023',
        title: 'Full-stack Developer',
        company: 'Kaizen Solutions',
        description: [
          {
            text: 'As part of tooling modernisation:',
            subItems: [
              'Selecting the most appropriate technologies',
              'Analysing code and specifications to identify features to implement and those to challenge',
              'Conducting tests in real conditions',
              'Cost estimation',
            ],
          },
          { text: 'Introduction of agile solutions in a V-cycle context' },
          { text: 'Implementation of GIT, Cypress, Jest, Cucumber, TypeORM' },
          { text: 'Proposal of new features' },
        ],
      },
      {
        period: '2019 — 2021',
        title: 'Full-stack Developer',
        company: 'Antilop',
        description: [
          { text: 'Implementation of a zero-bug policy' },
          { text: 'Integration of mockups' },
          {
            text: 'Participation in agile ceremonies (daily stand-ups, sprint planning, retrospectives…)',
          },
          { text: 'Implementation of new features' },
          { text: 'Creation of hooks on PrestaShop' },
        ],
      },
    ],
  },
  contact: {
    sectionTitle: 'Contact',
    tagline: "Let's talk.",
    links: {
      email: 'Send an email',
      github: 'GitHub Profile',
      linkedin: 'LinkedIn Profile',
      location: 'Marseille — remote ok',
    },
    form: {
      namePlaceholder: 'Name',
      emailPlaceholder: 'Email',
      messagePlaceholder: 'Message...',
      submitIdle: 'Send →',
      submitLoading: 'Sending...',
      success: 'Message sent successfully.',
      errorServer: 'A server error occurred. Please try again later.',
      errorNetwork:
        'Unable to reach the server. Check your internet connection.',
      errorRateLimit:
        'You have reached the daily message limit. Please try again later.',
      validationName: 'Please enter your name.',
      validationEmail: 'Please enter your email address.',
      validationEmailFormat: 'Invalid email address.',
      validationMessage: 'Please write your message.',
    },
  },
};
