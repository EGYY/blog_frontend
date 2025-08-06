import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleCommentsTotalPages = (state: StateSchema) =>
    state?.article_comments_block?.totalPages || 1;
