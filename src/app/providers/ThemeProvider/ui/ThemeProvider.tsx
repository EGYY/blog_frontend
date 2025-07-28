import {
  FC, PropsWithChildren, useMemo, useState,
} from 'react';
import { STORAGE_THEME_KEY, Theme, ThemeContext } from '@/shared/config/theme/ThemeContext';

const defaultTheme = localStorage.getItem(STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const defaultProps = useMemo(() => {
    return {
      theme,
      setTheme,
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};
