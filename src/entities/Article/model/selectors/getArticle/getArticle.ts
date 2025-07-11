import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticle = (state: StateSchema) => state.article?.article;
