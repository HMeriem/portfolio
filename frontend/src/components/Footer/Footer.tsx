import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <span className={styles.footer__copyright}>© {year} Hammouya Meriem</span>
      <span className={styles.footer__stack}>
        React · NestJS · TypeScript · Docker
      </span>
    </footer>
  );
}
