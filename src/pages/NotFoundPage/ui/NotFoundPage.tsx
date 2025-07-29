import { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './NotFoundPage.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import { PageWrapper } from '@/widgets/PageWrapper';

interface NotFoundPageProps {
    className?: string
}

export const NotFoundPage: FC<NotFoundPageProps> = ({ className }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <div className={classNames(cls.notFoundPage, {}, [className])}>
        <h1>
          {t('not_found_page')}
        </h1>
        <p>{t('not_found_page_description')}</p>
        <Button onClick={() => navigate('/')}>{t('not_found_page_button')}</Button>
      </div>
    </PageWrapper>
  );
};
