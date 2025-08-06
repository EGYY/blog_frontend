import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleComments = (state: StateSchema) =>
    state?.article_comments_block?.comments || [];
