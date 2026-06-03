import styles from './header.module.css';
import ThemeToggle from './ThemeToggle/ThemeToggle';

export default function Header() {
  return (
    <div className={styles.header}>
      <span className={styles.header__name}>Meriem Hammouya</span>
      <div className={styles.header__links}>
        <a href="#skills" className={styles.header__link}>
          Compétences
        </a>
        <a href="#career" className={styles.header__link}>
          Parcours
        </a>
        <a href="#contact" className={styles.header__link}>
          Contact
        </a>
        <ThemeToggle />
      </div>
    </div>
  );
}
