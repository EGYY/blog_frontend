import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleRecommendationsLoading = (state: StateSchema) => state.article?.recommedationsLoading || false;
