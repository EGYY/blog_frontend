import { rtkApi } from '@/shared/config/api/rtkApi';
import { ArticleTag } from '../model/types/articleTag';

const articleTagApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleTags: build.query<ArticleTag[], void>({
      query: () => ({
        url: '/article-tags',
        method: 'GET',
        headers: { 'x-public': true },
      }),
    }),
  }),
});

export const useArticleTagsQuery = articleTagApi.useGetArticleTagsQuery;
