import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import {
    articleActions,
    ArticleList,
    articleReducer,
    getArticlesList,
    getArticlesListError,
    getArticlesListLoading,
    getArticlesListPage,
    getArticlesListSelector,
    getArticlesListTotal,
    getArticlesView,
    getInitedArticles,
} from '@/entities/Article';
import {
    articlesFiltersActions,
    articlesFiltersReducer,
    getArticleFilterCurrentFilters,
} from '@/features/ArticlesFilters';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { isEmptyObject } from '@/shared/lib/helpers/isEmptyObject/isEmptyObject';
import { objectToSearchParams } from '@/shared/lib/helpers/objectToSearchParams/objectToSearchParams';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppEffect } from '@/shared/lib/hooks/useAppEffect/useAppEffect';
import { useMobile } from '@/shared/lib/hooks/useMobile/useMobile';
import {
    ArticlesListHeader,
    MobileArticleListHeader,
} from '@/widgets/ArticlesListHeader';
import { PageWrapper } from '@/widgets/PageWrapper';

const initialReducers: ReducersList = {
    article: articleReducer,
    articles_filters: articlesFiltersReducer,
};

const ArticlesPage = memo(() => {
    const dispatch = useAppDispatch();
    const loading = useSelector(getArticlesListLoading);
    const error = useSelector(getArticlesListError);
    const articles = useSelector(getArticlesListSelector);
    const view = useSelector(getArticlesView);
    const page = useSelector(getArticlesListPage);
    const total = useSelector(getArticlesListTotal);
    const inited = useSelector(getInitedArticles);
    const currentFilters = useSelector(getArticleFilterCurrentFilters);

    const navigate = useNavigate();
    const location = useLocation();
    const query = useMemo(
        () => new URLSearchParams(location.search),
        [location.search],
    );

    const isMobile = useMobile();

    useAppEffect(() => {
        if (!inited) {
            if (query.get('search')) {
                dispatch(
                    articlesFiltersActions.setSearch(query.get('search')!),
                );
            }

            if (query.get('sortBy') || query.get('sort')) {
                const sort = query.get('sort') || 'desc';
                const sortBy = query.get('sortBy') || 'date';
                if (sortBy === 'asc_date' || sortBy === 'date') {
                    dispatch(
                        articlesFiltersActions.setSort(`${sort}_date` as any),
                    );
                } else if (sortBy === 'views') {
                    dispatch(articlesFiltersActions.setSort('most_popular'));
                }
            }

            if (query.get('tagIds')) {
                dispatch(
                    articlesFiltersActions.setTags(
                        query.get('tagIds')?.split(',')!,
                    ),
                );
            }

            if (query.get('categoryIds')) {
                dispatch(
                    articlesFiltersActions.setCategories(
                        query.get('categoryIds')?.split(',')!,
                    ),
                );
            }
            const filters = {
                ...(query.get('search') && { search: query.get('search')! }),
                ...(query.get('sortBy') && { sortBy: query.get('sortBy') }),
                ...(query.get('sort') && { sort: query.get('sort') }),
                ...(query.get('tagIds') && {
                    tagIds: query.get('tagIds')?.split(',')!,
                }),
                ...(query.get('categoryIds') && {
                    categoryIds: query.get('categoryIds')?.split(',')!,
                }),
            };
            if (!isEmptyObject(filters)) {
                dispatch(articlesFiltersActions.setCurrentFilters(filters));
            }
            dispatch(articleActions.setInitedArticles(true));
        }
    }, [dispatch, inited, query]);

    useAppEffect(() => {
        if (inited) {
            if (!isEmptyObject(currentFilters)) {
                const params = objectToSearchParams(currentFilters);
                navigate({ search: params.toString() });
            } else {
                navigate({ search: '' });
            }
            dispatch(getArticlesList({ replace: true }));
        }
    }, [currentFilters, dispatch, inited, navigate]);

    const onScrollEnd = useCallback(() => {
        if (!loading && total > articles.length) {
            dispatch(articleActions.setArticlesPage(page + 1));
            dispatch(getArticlesList({ replace: false }));
        }
    }, [dispatch, loading, total, articles.length, page]);

    return (
        <DynamicModuleLoader
            reducers={initialReducers}
            removeAfterAnmount={false}
        >
            <PageWrapper onScrollEnd={onScrollEnd} needAutoScroll>
                {isMobile ? (
                    <MobileArticleListHeader />
                ) : (
                    <ArticlesListHeader />
                )}
                <ArticleList
                    loading={loading}
                    articles={articles}
                    error={error}
                    view={view}
                />
            </PageWrapper>
        </DynamicModuleLoader>
    );
});

export default ArticlesPage;
