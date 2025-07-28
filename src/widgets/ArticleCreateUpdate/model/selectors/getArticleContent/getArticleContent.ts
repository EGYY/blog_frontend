import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleContent = (state: StateSchema) => state?.article_create_update?.articleContent || '';
