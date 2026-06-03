import styles from './career.module.css';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import CareerCard from '@/components/CareerCard/CareerCard';
import { experiences } from './experiences.data';

export default function Career() {
  return (
    <div className={styles.career}>
      <SectionHeader title="Parcours" index="02" />
      <div className={styles.career__experiences}>
        {experiences.map((experience) => (
          <div
            key={experience.company}
            className={styles.career__experiences__card}
          >
            <CareerCard experience={experience} />
          </div>
        ))}
      </div>
    </div>
  );
}
