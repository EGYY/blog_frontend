import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleFilterCurrentFilters = (state: StateSchema) =>
    state?.articles_filters?.currentFilters || {};
