import type { Language } from '@/utils/langages/translations.types';

export interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
}
