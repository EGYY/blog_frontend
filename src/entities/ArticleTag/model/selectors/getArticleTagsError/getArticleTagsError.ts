import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleTagsError = (state: StateSchema) => state.article_tags?.error;
