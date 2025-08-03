import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button/Button';

import cls from './PageError.module.scss';

interface PageErrorProps {
    className?: string
    errorTitle?: string
    errorDescription?: string
    actionText?: string
    actionHandler?: () => void
}

export const PageError: FC<PageErrorProps> = memo(({
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
      <Button onClick={actionHandler}>{actionText || t('error_page_button')}</Button>
    </div>
  );
});
