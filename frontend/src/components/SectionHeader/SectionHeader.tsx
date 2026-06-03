import type { SectionHeaderProps } from './SectionHeader.types';
import styles from './SectionHeader.module.css';

export default function SectionHeader({ title, index }: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <span className={styles.sectionHeader__title}>{title}</span>
      <span className={styles.sectionHeader__counter}>{index}</span>
    </div>
  );
}
