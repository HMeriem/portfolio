import styles from './ThemeToggle.module.css';
import { useThemeToggle } from './useThemeToggle';

export default function ThemeToggle() {
    const { isDark, toggle } = useThemeToggle();
    return (
        <button
            role="switch"
            aria-checked={isDark}
            aria-label="Changer le thème"
            className={styles.themeToggle}
            onClick={toggle}
        >
            <span className={styles.themeToggle__thumb} data-dark={isDark}>
                <span className={styles.themeToggle__thumb__inner} />
            </span>
            <span className={styles.themeToggle__label}>{isDark ? 'Sombre' : 'Clair'}</span>
        </button>
    );
}
