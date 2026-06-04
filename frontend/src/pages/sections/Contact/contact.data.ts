import type { ContactLink } from './ContactLink.types';

export const contactLinks: ContactLink[] = [
  {
    id: 'email',
    ariaLabel: 'Envoyer un email',
    href: 'mailto:mer.ham@outlook.fr',
  },
  {
    id: 'github',
    ariaLabel: 'Profil GitHub',
    href: 'https://github.com/HMeriem',
  },
  {
    id: 'linkedin',
    ariaLabel: 'Profil LinkedIn',
    href: 'https://www.linkedin.com/in/meriem-h-6431ab185',
  },
  {
    id: 'location',
    ariaLabel: 'Marseille — remote ok',
  },
];
