import { createAsyncThunk } from '@reduxjs/toolkit';

import { ArticlesServerResponse } from '../types/article';

import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider';

export interface GetArticlesListQueryParams {
  replace?: boolean,
}

export const getArticlesList = createAsyncThunk<
  ArticlesServerResponse, GetArticlesListQueryParams, { rejectValue: string, extra: ThunkExtraArg }>(
    'article/getArticlesList',
    async (_, { rejectWithValue, extra, getState }) => {
      try {
        const state = getState() as StateSchema;
        const page = state.article?.pageArticles || 1;
        const currentFilters = state.articles_filters?.currentFilters || {};
        const params = new URLSearchParams({
          page: String(page),
          ...currentFilters,
        });
        const response = await extra.api.get<ArticlesServerResponse>('/articles', { params });
        return response.data;
      } catch (e: any) {
        if (e?.response?.data?.message) {
          return rejectWithValue(e.response.data.message);
        }
        return rejectWithValue(e.message);
      }
    },
  );
