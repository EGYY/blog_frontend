import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleCategoriesError = (state: StateSchema) => state.article_categories?.error;
