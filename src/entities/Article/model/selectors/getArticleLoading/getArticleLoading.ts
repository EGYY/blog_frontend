import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleLoading = (state: StateSchema) => state.article?.loading;
