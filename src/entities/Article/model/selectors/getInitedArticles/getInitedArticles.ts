import { StateSchema } from '@/app/providers/StoreProvider';

export const getInitedArticles = (state: StateSchema) => state.article?._inited_articles || false;
