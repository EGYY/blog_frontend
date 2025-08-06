import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlesListPage = (state: StateSchema) =>
    state.article?.pageArticles || 1;
