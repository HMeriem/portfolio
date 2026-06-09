import { frameworks } from './Frameworks.data';
import SkillCategory from '../SkillCategory/SkillCategory';
import { useTranslation } from '@/components/Langages/useTranslation';

export default function Frameworks() {
  const translation = useTranslation();

  return (
    <SkillCategory title={translation.skills.frameworks} skills={frameworks} />
  );
}
