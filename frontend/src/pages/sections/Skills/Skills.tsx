import styles from './skills.module.css';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import Languages from './Languages/Languages';
import Frameworks from './Framework/Frameworks';
import Tools from './Tools/Tools';

export default function Skills() {
  return (
    <div className={styles.skills}>
      <SectionHeader title="Compétences" index="01" />
      <div className={styles.skills__categories}>
        <div className={styles.skills__categories__category}>
          <Languages />
        </div>
        <div className={styles.skills__categories__category}>
          <Frameworks />
        </div>
        <div className={styles.skills__categories__category}>
          <Tools />
        </div>
      </div>
    </div>
  );
}
