import styles from './ThemeToggle.module.css';
import { useThemeToggle } from './useThemeToggle';
import { useTranslation } from '@/components/Langages/useTranslation';

export default function ThemeToggle() {
  const { isDark, toggle } = useThemeToggle();
  const translation = useTranslation();

  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label={translation.theme.ariaLabel}
      className={styles.themeToggle}
      onClick={toggle}
    >
      <span className={styles.themeToggle__thumb} data-dark={isDark}>
        <span className={styles.themeToggle__thumb__inner} />
      </span>
      <span className={styles.themeToggle__label}>
        {isDark ? translation.theme.dark : translation.theme.light}
      </span>
    </button>
  );
}
