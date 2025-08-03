import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlePublished = (state: StateSchema) => state?.article_create_update?.articlePublished || false;
