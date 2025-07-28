import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleSubtitle = (state: StateSchema) => state?.article_create_update?.articleSubtitle || '';
