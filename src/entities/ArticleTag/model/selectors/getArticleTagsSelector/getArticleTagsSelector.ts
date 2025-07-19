import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleTagsSelector = (state: StateSchema) => state.article_tags?.data || [];
