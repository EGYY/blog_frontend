import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleFilterFiltersReady = (state: StateSchema) => state?.articles_filters?.__filters_ready || false;
