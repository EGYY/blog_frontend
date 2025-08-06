import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleCreateUpdateTags = (state: StateSchema) =>
    state?.article_create_update?.articleTags || [];
