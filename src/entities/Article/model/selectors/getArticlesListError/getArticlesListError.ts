import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlesListError = (state: StateSchema) =>
    state.article?.error;
