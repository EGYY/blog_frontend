import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '../Button/Button';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './DisplayError.module.scss';

interface DisplayErrorProps {
    className?: string;
    errorTitle?: string;
    errorDescription?: string;
    actionText?: string;
    actionHandler?: () => void;
}

export const DisplayError: FC<DisplayErrorProps> = memo(
    ({
        className,
        errorTitle,
        errorDescription,
        actionText,
        actionHandler = () => window.location.reload(),
    }) => {
        const { t } = useTranslation();
        return (
            <div className={classNames(cls.pageError, {}, [className])}>
                <h1>{errorTitle || t('error_page')}</h1>
                <p>{errorDescription || t('error_page_description')}</p>
                {actionHandler && (
                    <Button onClick={actionHandler}>
                        {actionText || t('error_page_button')}
                    </Button>
                )}
            </div>
        );
    },
);
