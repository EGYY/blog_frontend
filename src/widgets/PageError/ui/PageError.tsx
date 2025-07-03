import { FC, memo } from 'react';

import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './PageError.module.scss';
import { Button } from '@/shared/ui/Button/Button';

interface PageErrorProps {
    className?: string
}

export const PageError: FC<PageErrorProps> = memo(({ className }) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.pageError, {}, [className])}>
      <h1>{t('error_page')}</h1>
      <p>{t('error_page_description')}</p>
      <Button onClick={() => window.location.reload()}>{t('error_page_button')}</Button>
    </div>
  );
});
