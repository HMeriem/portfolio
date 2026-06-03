import { tools } from './Tools.data';
import SkillCategory from '../SkillCategory/SkillCategory';

export default function Tools() {
  return <SkillCategory title="Outils & Pratiques" skills={tools} />;
}
