import styles from './identity.module.css';
import Icon from '@/components/Icon/Icon';
import { useTranslation } from '@/components/Langages/useTranslation';

export default function Identity() {
  const translation = useTranslation();

  return (
    <div className={styles.identity}>
      <div className={styles.identity__disponibility}>
        <p className={styles.identity__disponibility__label}>
          {translation.identity.availability}
        </p>
      </div>
      <p className={styles.identity__firstname}>Meriem</p>
      <p className={styles.identity__lastname}>Hammouya</p>
      <div className={styles.identity__infos}>
        <p className={styles.identity__infos__job}>
          {translation.identity.jobTitle}
        </p>
        <p className={styles.identity__infos__location}>Marseille | France</p>
        <p className={styles.identity__infos__research}>
          {translation.identity.contractTypes}
        </p>
      </div>
      <div className={styles.identity__actions}>
        <a
          className={styles.identity__actions__primary}
          href={translation.identity.cvPath}
          download={translation.identity.cvDownloadName}
        >
          <Icon name="download" size={14} />
          {translation.identity.cvButton}
        </a>
      </div>
    </div>
  );
}
