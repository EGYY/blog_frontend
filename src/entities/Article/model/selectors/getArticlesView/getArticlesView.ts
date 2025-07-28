import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleView } from '../../types/article';

export const getArticlesView = (state: StateSchema) => state.article?.view || ArticleView.GRID;
