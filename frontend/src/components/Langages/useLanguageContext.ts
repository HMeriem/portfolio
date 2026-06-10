import { createContext, useContext } from 'react';
import type { LanguageContextValue } from '@/components/Langages/LanguageContext.props';

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguageContext(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error('useLanguageContext must be used within LanguageProvider');
  return context;
}
