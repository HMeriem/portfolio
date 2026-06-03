import Identity from './Identity/Identity';
import Presentation from './Presentation/Presentation';
import styles from './profile.module.css';

export default function Profile() {
  return (
    <section className={styles.profile}>
      <div className={styles.profile__identity}>
        <Identity />
      </div>
      <div className={styles.profile__presentation}>
        <Presentation />
      </div>
    </section>
  );
}
