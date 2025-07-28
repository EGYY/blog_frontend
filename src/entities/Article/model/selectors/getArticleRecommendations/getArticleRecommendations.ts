import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleRecommendationsSelector = (state: StateSchema) => state.article?.recommedations || [];
