import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ThemeSwitcher.module.scss';
import { useTheme } from '@/shared/config/theme/useTheme';
import { Theme } from '@/shared/config/theme/ThemeContext';
import { Button } from '@/shared/ui/Button/Button';
import SunIcon from '@/shared/assets/sun.svg';
import MoonIcon from '@/shared/assets/moon.svg';
import { Tooltip } from '@/shared/ui/Tooltip/Tooltip';

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo(({ className }) => {
  const { theme, switchTheme } = useTheme();
  const { t } = useTranslation('sidebar');

  return (
    <Tooltip content={t('toggle_theme')} preferredPlacement="right">
      <Button
        onClick={switchTheme}
        className={classNames(cls.themeSwitcher, {}, [className])}
        theme="ghostIcon"
      >
        {theme === Theme.LIGHT ? (
          <SunIcon />
        ) : (
          <MoonIcon />
        )}
      </Button>
    </Tooltip>

  );
});
