import { frameworks } from './Frameworks.data';
import SkillCategory from '../SkillCategory/SkillCategory';

export default function Frameworks() {
  return <SkillCategory title="Frameworks" skills={frameworks} />;
}
