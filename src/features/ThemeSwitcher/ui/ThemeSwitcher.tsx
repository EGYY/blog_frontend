import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import MoonIcon from '@/shared/assets/moon.svg';
import SunIcon from '@/shared/assets/sun.svg';
import { Theme } from '@/shared/config/theme/ThemeContext';
import { useTheme } from '@/shared/config/theme/useTheme';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button/Button';
import { Tooltip } from '@/shared/ui/Tooltip/Tooltip';

import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    className?: string;
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
                {theme === Theme.LIGHT ? <SunIcon /> : <MoonIcon />}
            </Button>
        </Tooltip>
    );
});
