import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleFormLoading = (state: StateSchema) => state?.article_comments_block?.addCommentForm.loading || false;
