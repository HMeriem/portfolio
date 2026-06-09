import type { PropsWithChildren } from 'react';
import { LanguageContext } from '@/components/Langages/useLanguageContext';
import { useLanguageState } from '@/components/Langages/useLanguageState';

export function LanguageProvider({ children }: PropsWithChildren) {
  const context = useLanguageState();

  return (
    <LanguageContext.Provider value={context}>
      {children}
    </LanguageContext.Provider>
  );
}
