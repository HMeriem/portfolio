import { tools } from './Tools.data';
import SkillCategory from '../SkillCategory/SkillCategory';
import { useTranslation } from '@/components/Langages/useTranslation';

export default function Tools() {
  const translation = useTranslation();

  return <SkillCategory title={translation.skills.tools} skills={tools} />;
}
