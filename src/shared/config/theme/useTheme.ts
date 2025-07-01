import { useContext } from 'react';
import { STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

interface UseThemeResult {
    switchTheme: () => void;
    theme: Theme;
}

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext);

  const switchTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    localStorage.setItem(STORAGE_THEME_KEY, newTheme);
    document.body.className = newTheme;
    setTheme(newTheme);
  };

  return {
    theme,
    switchTheme,
  };
};
