import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useArticlesQuery } from '../api/mainPageArticlesApi';
import { getMainPageSelectedCategory } from '../model/selectors/getMainPageSelectedCategory/getMainPageSelectedCategory';
import { mainPageActions, mainPageReducer } from '../model/slice/mainPageSlice';

import { Category } from '@/entities/Article';
import { useArticleCategoriesQuery } from '@/entities/ArticleCategory';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleListByCategory } from '@/widgets/ArticleListByCategory';
import { PageWrapper } from '@/widgets/PageWrapper';

const initialReducers: ReducersList = {
    main_page: mainPageReducer,
};

const MainPage = memo(() => {
    const dispatch = useAppDispatch();
    const { data: categories, isLoading: categoriesIsLoading } =
        useArticleCategoriesQuery();
    const selectedCategory = useSelector(getMainPageSelectedCategory);
    const {
        data: articles,
        isFetching: articlesIsLoading,
        isError: articlesError,
        refetch: refetchArticles,
    } = useArticlesQuery(selectedCategory?.id);

    const onChangeCategory = useCallback(
        (category: Category) => {
            if (selectedCategory?.id === category.id) {
                dispatch(mainPageActions.setSelectedCategory(undefined));
            } else {
                dispatch(mainPageActions.setSelectedCategory(category));
            }
        },
        [dispatch, selectedCategory?.id],
    );

    return (
        <DynamicModuleLoader
            reducers={initialReducers}
            removeAfterAnmount={false}
        >
            <PageWrapper data-testid="main-page">
                <ArticleListByCategory
                    articles={articles?.data || []}
                    categories={categories}
                    loadingArticles={articlesIsLoading}
                    loadingCategories={categoriesIsLoading}
                    errorArticles={articlesError}
                    refetchArticles={refetchArticles}
                    selectedCategory={selectedCategory}
                    onChangeCategory={onChangeCategory}
                />
            </PageWrapper>
        </DynamicModuleLoader>
    );
});

export default MainPage;
