import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleTagsLoading = (state: StateSchema) => state.article_tags?.loading || false;
