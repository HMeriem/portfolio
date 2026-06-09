import { useState, useEffect } from 'react';
import type { Language } from '@/utils/langages/translations.types';
import type { LanguageContextValue } from '@/components/Langages/LanguageContext.props';

function getStoredLanguage(): Language {
  try {
    const stored = localStorage.getItem('lang');
    if (stored === 'en') return 'en';
  } catch (error) {
    console.warn('[useLanguageState] localStorage not available', error);
  }
  return 'fr';
}

export function useLanguageState(): LanguageContextValue {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  function setLanguage(lang: Language) {
    setLanguageState(lang);
    try {
      localStorage.setItem('lang', lang);
    } catch (error) {
      console.warn('[useLanguageState] Failed to persist language', error);
    }
  }

  return { language, setLanguage };
}
