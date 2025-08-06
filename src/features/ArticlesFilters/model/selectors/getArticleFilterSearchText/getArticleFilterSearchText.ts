import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleFilterSearchText = (state: StateSchema) =>
    state?.articles_filters?.search || '';
