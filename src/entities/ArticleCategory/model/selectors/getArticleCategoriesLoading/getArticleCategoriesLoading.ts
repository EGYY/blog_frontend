import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleCategoriesLoading = (state: StateSchema) => state.article_categories?.loading || false;
