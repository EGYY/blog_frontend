import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button/Button';

import styles from './ArticleError.module.scss';

interface ArticleErrorProps {
    className?: string
    error: any
}

export const ArticleError = memo((props: ArticleErrorProps) => {
  const { className, error } = props;
  const navigate = useNavigate();
  const { t } = useTranslation('article');
  return (
    <div className={classNames(styles.articleError, {}, [className])}>
      <h1>
        {t('article_error_title')}
      </h1>
      <p>{error}</p>
      <Button onClick={() => navigate('/articles')}>{t('article_navigate_btn')}</Button>
    </div>
  );
});
