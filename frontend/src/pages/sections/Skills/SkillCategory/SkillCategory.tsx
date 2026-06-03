import type { SkillCategoryProps } from './SkillCategory.types';
import styles from './SkillCategory.module.css';
import SkillDots from '../SkillDots/SkillDots';

export default function SkillCategory({ title, skills }: SkillCategoryProps) {
  return (
    <div className={styles.skillCategory}>
      <h3 className={styles.skillCategory__title}>{title}</h3>
      <ul className={styles.skillCategory__list}>
        {skills.map(({ name, level }) => (
          <li key={name} className={styles.skillCategory__list__item}>
            <span className={styles.skillCategory__list__item__name}>
              {name}
            </span>
            <SkillDots level={level} />
          </li>
        ))}
      </ul>
    </div>
  );
}
