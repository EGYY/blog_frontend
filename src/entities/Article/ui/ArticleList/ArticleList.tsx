import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DisplayError } from '@/shared/ui/DisplayError/DisplayError';

import cls from './ArticleList.module.scss';

interface ArticleListProps {
    articles: Article[];
    loading: boolean;
    view?: ArticleView;
    error?: string;
    refetchArticles?: () => void;
    resetFilters?: () => void;
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        articles,
        loading,
        error,
        view = ArticleView.GRID,
        refetchArticles,
        resetFilters,
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
                return (
                    <ArticleListItem
                        className={cls.articlesListItem}
                        key={article.id}
                        article={article}
                        view={view}
                    />
                );
            })}
            {error && (
                <DisplayError
                    errorTitle={t('error_articles_title')}
                    errorDescription={t('error_articles_description')}
                    actionText={t('error_articles_action_text')}
                    actionHandler={refetchArticles}
                    className={cls.articlesError}
                />
            )}
            {!articles.length && !loading && (
                <DisplayError
                    errorTitle={t('data_empty_title')}
                    errorDescription={t('data_empty')}
                    actionText={t('reset_filters')}
                    actionHandler={resetFilters}
                    className={cls.articlesEmpty}
                />
            )}
            {loading && getSkeletons()}
        </div>
    );
});
