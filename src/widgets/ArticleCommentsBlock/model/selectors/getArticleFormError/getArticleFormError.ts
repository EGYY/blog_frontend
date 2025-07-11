import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleFormError = (state: StateSchema) => state?.article_comments_block?.addCommentForm.error;
