import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleCategoriesSelector = (state: StateSchema) => state.article_categories?.data || [];
