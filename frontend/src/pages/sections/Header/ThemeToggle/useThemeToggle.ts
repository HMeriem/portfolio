import { useEffect, useState } from 'react';

export function useThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute(
      'data-theme',
      next ? 'dark' : 'light',
    );
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  return { isDark, toggle };
}
