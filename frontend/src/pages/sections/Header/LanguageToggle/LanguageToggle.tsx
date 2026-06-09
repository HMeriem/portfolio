import styles from './LanguageToggle.module.css';
import Icon from '@/components/Icon/Icon';
import { useLanguage } from '@/components/Langages/useLanguage';
import { useTranslation } from '@/components/Langages/useTranslation';

export default function LanguageToggle() {
  const { toggle } = useLanguage();
  const translation = useTranslation();

  return (
    <button
      className={styles.languageToggle}
      onClick={toggle}
      aria-label={`Switch to ${translation.header.langToggle}`}
    >
      <Icon name="globe" size={16} />
      <span>{translation.header.langToggle}</span>
    </button>
  );
}
