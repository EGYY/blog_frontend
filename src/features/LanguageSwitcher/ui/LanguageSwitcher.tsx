import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button/Button';
import { Tooltip } from '@/shared/ui/Tooltip/Tooltip';

import cls from './LanguageSwitcher.module.scss';

interface LanguageSwitcherProps {
    className?: string;
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = memo(
    ({ className }) => {
        const { t, i18n } = useTranslation('sidebar');

        const toggleLanguage = () => {
            i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
        };
        return (
            <Tooltip content={t('language_title')} preferredPlacement="right">
                <Button
                    className={classNames(cls.languageSwitcher, {}, [
                        className,
                    ])}
                    theme="ghostIcon"
                    onClick={toggleLanguage}
                >
                    {t('language')}
                </Button>
            </Tooltip>
        );
    },
);
