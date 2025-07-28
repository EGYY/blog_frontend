import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleRecommedationsError = (state: StateSchema) => state.article?.recommendationsError || [];
