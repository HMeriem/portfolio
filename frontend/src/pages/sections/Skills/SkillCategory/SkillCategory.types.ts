export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategoryProps {
  title: string;
  skills: Skill[];
}
