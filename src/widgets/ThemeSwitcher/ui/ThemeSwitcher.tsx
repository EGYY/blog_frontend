import { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ThemeSwitcher.module.scss';
import { useTheme } from '@/shared/config/theme/useTheme';
import { Theme } from '@/shared/config/theme/ThemeContext';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import SunIcon from '@/shared/assets/sun.svg';
import MoonIcon from '@/shared/assets/moon.svg';

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const { theme, switchTheme } = useTheme();
  const { t } = useTranslation('navbar');

  return (
    <Button
      onClick={switchTheme}
      className={classNames(cls.themeSwitcher, {}, [className])}
      title={t('toggle_theme')}
      theme={ThemeButton.GHOST_ICON}
    >
      {theme === Theme.LIGHT ? (
        <SunIcon />
      ) : (
        <MoonIcon />
      )}
    </Button>
  );
};
