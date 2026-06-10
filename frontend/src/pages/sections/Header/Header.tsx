import styles from './header.module.css';
import ThemeToggle from './ThemeToggle/ThemeToggle';
import LanguageToggle from './LanguageToggle/LanguageToggle';
import { useTranslation } from '@/components/Langages/useTranslation';

export default function Header() {
  const translation = useTranslation();

  return (
    <div className={styles.header}>
      <span className={styles.header__name}>Meriem Hammouya</span>
      <div className={styles.header__links}>
        <a href="#skills" className={styles.header__link}>
          {translation.header.skills}
        </a>
        <a href="#career" className={styles.header__link}>
          {translation.header.career}
        </a>
        <a href="#contact" className={styles.header__link}>
          {translation.header.contact}
        </a>
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </div>
  );
}
