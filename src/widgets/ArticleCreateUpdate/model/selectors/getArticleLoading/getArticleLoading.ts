import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleLoading = (state: StateSchema) =>
    state?.article_create_update?.loading || false;
