import styles from './career.module.css';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import CareerCard from '@/components/CareerCard/CareerCard';
import { useTranslation } from '@/components/Langages/useTranslation';

export default function Career() {
  const translation = useTranslation();

  return (
    <div className={styles.career}>
      <SectionHeader title={translation.career.sectionTitle} index="02" />
      <div className={styles.career__experiences}>
        {translation.career.entries.map((experience) => (
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
