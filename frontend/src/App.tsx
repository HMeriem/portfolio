import { LanguageProvider } from '@/components/Langages/LanguageProvider';
import HomePage from '@/pages/Home/Home';

export default function App() {
  return (
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  );
}
