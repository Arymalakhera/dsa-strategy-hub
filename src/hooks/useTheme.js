import { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';

export function useTheme() {
  const [theme, setThemeState] = useState(() => storageService.getTheme());

  useEffect(() => {
    // Initial DOM setup
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const handleThemeChange = () => {
      setThemeState(storageService.getTheme());
    };

    window.addEventListener('dsa_theme_updated', handleThemeChange);
    return () => window.removeEventListener('dsa_theme_updated', handleThemeChange);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    storageService.setTheme(next);
    setThemeState(next);
  };

  return { theme, toggleTheme, isDark: theme === 'dark' };
}
