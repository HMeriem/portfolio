import { languages } from './Languages.data';
import SkillCategory from '../SkillCategory/SkillCategory';

export default function Languages() {
  return <SkillCategory title="Langages" skills={languages} />;
}
