import { StateSchema } from '@/app/providers/StoreProvider';

export const getTotalArticleComments = (state: StateSchema) =>
    state?.article_comments_block?.total || 0;
