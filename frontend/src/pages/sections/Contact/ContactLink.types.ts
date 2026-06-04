export type IconName = 'email' | 'github' | 'linkedin' | 'location';

export interface ContactLink {
  id: IconName;
  ariaLabel: string;
  href?: string;
}
