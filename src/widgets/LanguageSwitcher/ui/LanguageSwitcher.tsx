import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './LanguageSwitcher.module.scss';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
    className?: string
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ className }) => {
    const { t, i18n } = useTranslation('navbar')

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
    }
    return (
        <Button
            className={classNames(cls.languageSwitcher, {}, [className])}
            theme={ThemeButton.GHOST_ICON}
            onClick={toggleLanguage}
            title={t('language_title')}
        >
            {t('language')}
        </Button>
    );
};