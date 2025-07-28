import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleCommentsPage = (state: StateSchema) => state?.article_comments_block?.page || 1;
