import styles from './identity.module.css';
import Icon from '@/components/Icon/Icon';

export default function Identity() {
  return (
    <div className={styles.identity}>
      <div className={styles.identity__disponibility}>
        <p className={styles.identity__disponibility__label}>
          Disponible pour de nouvelles opportunités
        </p>
      </div>
      <p className={styles.identity__firstname}>Meriem</p>
      <p className={styles.identity__lastname}>Hammouya</p>
      <div className={styles.identity__infos}>
        <p className={styles.identity__infos__job}>Développeuse Full Stack</p>
        <p className={styles.identity__infos__location}>Marseille | France</p>
        <p className={styles.identity__infos__research}>
          CDI | CDD | Freelance
        </p>
      </div>
      <div className={styles.identity__actions}>
        <a
          className={styles.identity__actions__primary}
          href="/cv-meriem-hammouya.pdf"
          download="CV Meriem Hammouya.pdf"
        >
          <Icon name="download" size={14} />
          Mon CV
        </a>
      </div>
    </div>
  );
}
