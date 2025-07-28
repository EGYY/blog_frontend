import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlePoster = (state: StateSchema) => state?.article_create_update?.articlePoster || '';
