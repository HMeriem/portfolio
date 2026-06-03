import type { SkillDotsProps } from './SkillDots.types';
import styles from './SkillDots.module.css';

export default function SkillDots({ level, max = 5 }: SkillDotsProps) {
  return (
    <div className={styles.skillDots} aria-hidden="true">
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={styles.skillDots__dot}
          data-filled={i < level}
        />
      ))}
    </div>
  );
}
