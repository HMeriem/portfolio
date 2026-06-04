import type { IconProps } from './Icon.types';
import EmailIcon from './EmailIcon';
import GithubIcon from './GithubIcon';
import LinkedinIcon from './LinkedinIcon';
import LocationIcon from './LocationIcon';

export default function Icon({ name, size }: IconProps) {
  switch (name) {
    case 'email':
      return <EmailIcon size={size} />;
    case 'github':
      return <GithubIcon size={size} />;
    case 'linkedin':
      return <LinkedinIcon size={size} />;
    case 'location':
      return <LocationIcon size={size} />;
  }
}
