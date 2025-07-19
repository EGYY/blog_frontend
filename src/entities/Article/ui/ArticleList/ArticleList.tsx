import { memo, useCallback } from 'react';
import cls from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

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
      {loading && getSkeletons()}
    </div>
  );
});
