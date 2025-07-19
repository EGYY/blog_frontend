import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleFilterSort = (state: StateSchema) => state?.articles_filters?.sort;
