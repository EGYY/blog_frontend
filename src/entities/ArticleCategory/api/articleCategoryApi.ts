import { ArticleCategory } from '../model/types/articleCategory';

import { rtkApi } from '@/shared/config/api/rtkApi';

const articleCategoryApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleCategories: build.query<ArticleCategory[], void>({
      query: () => ({
        url: '/article-categories',
        method: 'GET',
        headers: { 'x-public': true },
      }),
    }),
  }),
});

export const useArticleCategoriesQuery = articleCategoryApi.useGetArticleCategoriesQuery;
