import { useLanguageContext } from './useLanguageContext';
import type { Language } from '@/utils/langages/translations.types';

export function useLanguage() {
  const { language, setLanguage } = useLanguageContext();

  function toggle() {
    const next: Language = language === 'fr' ? 'en' : 'fr';
    setLanguage(next);
  }

  return { language, toggle };
}
