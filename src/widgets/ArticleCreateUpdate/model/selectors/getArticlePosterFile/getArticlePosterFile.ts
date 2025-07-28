import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlePosterFile = (state: StateSchema) => state?.article_create_update?.articlePosterFile;
