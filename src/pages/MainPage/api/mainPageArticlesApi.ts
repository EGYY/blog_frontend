import { ArticlesServerResponse, ArticleType } from '@/entities/Article';
import { rtkApi } from '@/shared/config/api/rtkApi';

const articlesApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticles: build.query<ArticlesServerResponse, string | undefined>({
      query: (categoryIds) => ({
        url: '/articles',
        method: 'GET',
        headers: { 'x-public': true },
        params: {
          categoryIds,
          limit: 50,
        },
      }),
    }),
  }),
});

export const useArticlesQuery = articlesApi.useGetArticlesQuery;
