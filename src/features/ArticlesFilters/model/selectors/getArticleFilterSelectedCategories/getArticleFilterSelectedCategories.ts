import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleFilterSelectedCategories = (state: StateSchema) =>
    state?.articles_filters?.categories || [];
