import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleCommentsLoading = (state: StateSchema) =>
    state?.article_comments_block?.loading || false;
