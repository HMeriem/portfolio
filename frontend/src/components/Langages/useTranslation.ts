import { fr } from '@/utils/langages/fr';
import { en } from '@/utils/langages/en';
import type {
  Language,
  Translations,
} from '@/utils/langages/translations.types';
import { useLanguageContext } from './useLanguageContext';

const locales: Record<Language, Translations> = { fr, en };

export function useTranslation(): Translations {
  const { language } = useLanguageContext();

  return locales[language];
}
