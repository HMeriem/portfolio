import styles from './identity.module.css';

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
        <p className={styles.identity__infos__location}>Marseille, France</p>
        <p className={styles.identity__infos__research}>CDI, CDD, Freelance</p>
      </div>
      <div className={styles.identity__actions}>
        <button className={styles.identity__actions__primary}>
          Me contacter
        </button>
        <button className={styles.identity__actions__secondary}>
          Voir les projets
        </button>
      </div>
    </div>
  );
}
