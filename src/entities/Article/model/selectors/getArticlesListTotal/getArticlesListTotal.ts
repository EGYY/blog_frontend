import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlesListTotal = (state: StateSchema) =>
    state.article?.totalArticles || 0;
