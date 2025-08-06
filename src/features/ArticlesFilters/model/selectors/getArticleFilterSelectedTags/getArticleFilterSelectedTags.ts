import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleFilterSelectedTags = (state: StateSchema) =>
    state?.articles_filters?.tags || [];
