export type IconName =
  | 'email'
  | 'github'
  | 'linkedin'
  | 'location'
  | 'download'
  | 'globe';

export interface IconProps {
  name: IconName;
  size?: number;
}
