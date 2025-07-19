import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlesListSelector = (state: StateSchema) => state.article?.articles || [];
