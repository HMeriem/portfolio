import styles from './ScrollHint.module.css';

export default function ScrollHint() {
  return (
    <div className={styles.scrollHint} aria-hidden="true">
      <span className={styles.scrollHint__chevron} />
    </div>
  );
}
