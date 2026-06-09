import type { IconProps } from './Icon.types';
import DownloadIcon from './DownloadIcon';
import EmailIcon from './EmailIcon';
import GithubIcon from './GithubIcon';
import GlobeIcon from './GlobeIcon';
import LinkedinIcon from './LinkedinIcon';
import LocationIcon from './LocationIcon';

export default function Icon({ name, size }: IconProps) {
  switch (name) {
    case 'download':
      return <DownloadIcon size={size} />;
    case 'email':
      return <EmailIcon size={size} />;
    case 'github':
      return <GithubIcon size={size} />;
    case 'globe':
      return <GlobeIcon size={size} />;
    case 'linkedin':
      return <LinkedinIcon size={size} />;
    case 'location':
      return <LocationIcon size={size} />;
  }
}
