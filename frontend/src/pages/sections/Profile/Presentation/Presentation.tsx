import styles from './presentation.module.css';
import { useTranslation } from '@/components/Langages/useTranslation';

export default function Presentation() {
  const translation = useTranslation();

  return (
    <div className={styles.presentation}>
      <p className={styles.presentation__bio}>{translation.presentation.bio}</p>
      <div className={styles.presentation__stats}>
        {translation.presentation.stats.map(({ value, label }) => (
          <div key={label} className={styles.presentation__stat}>
            <span className={styles.presentation__stat__value}>{value}</span>
            <span className={styles.presentation__stat__label}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
