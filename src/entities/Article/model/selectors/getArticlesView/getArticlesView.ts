import { ArticleView } from '../../types/article';

import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlesView = (state: StateSchema) =>
    state.article?.view || ArticleView.GRID;
