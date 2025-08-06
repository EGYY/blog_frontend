import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlesListLoading = (state: StateSchema) =>
    state.article?.loadingArticles || false;
