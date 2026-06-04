export type IconName =
  | 'email'
  | 'github'
  | 'linkedin'
  | 'location'
  | 'download';

export interface IconProps {
  name: IconName;
  size?: number;
}
