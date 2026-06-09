import { languages } from './Languages.data';
import SkillCategory from '../SkillCategory/SkillCategory';
import { useTranslation } from '@/components/Langages/useTranslation';

export default function Languages() {
  const translation = useTranslation();

  return (
    <SkillCategory title={translation.skills.languages} skills={languages} />
  );
}
