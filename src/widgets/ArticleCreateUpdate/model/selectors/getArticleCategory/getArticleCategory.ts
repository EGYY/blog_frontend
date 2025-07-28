import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleCategory = (state: StateSchema) => state?.article_create_update?.articleCategory;
