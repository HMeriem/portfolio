import type { PropsWithChildren } from 'react';
import { LanguageProvider } from '@/components/Langages/LanguageProvider';

export function Wrapper({ children }: PropsWithChildren) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
