import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Tag } from '@/shared/ui/Tag/Tag';

import cls from './ArticleList.module.scss';

interface ArticleListProps {
    articles: Article[]
    loading: boolean
    view?: ArticleView,
    error?: string
}

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    articles,
    loading,
    error,
    view = ArticleView.GRID,
  } = props;

  const { t } = useTranslation('article');

  const getSkeletons = useCallback(() => {
    return new Array(view === ArticleView.GRID ? 8 : 4)
      .fill(0)
      .map((_, idx) => <ArticleListItemSkeleton key={idx} view={view} />);
  }, [view]);

  return (
    <div className={classNames(cls.articlesListWrapper, {}, [cls[view]])}>
      {articles.map((article) => {
        return <ArticleListItem className={cls.articlesListItem} key={article.id} article={article} view={view} />;
      })}
      {error && <Tag variant="error">{error}</Tag>}
      {!articles.length && !loading && (<Tag variant="info">{t('data_empty')}</Tag>)}
      {loading && getSkeletons()}
    </div>
  );
});
