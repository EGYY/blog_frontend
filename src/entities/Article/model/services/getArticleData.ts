import { createAsyncThunk } from '@reduxjs/toolkit';

import { Article } from '../types/article';

import { ThunkExtraArg } from '@/app/providers/StoreProvider';

export const getArticleData = createAsyncThunk<Article, string, { rejectValue: string, extra: ThunkExtraArg }>(
  'article/getArticleData',
  async (id, { rejectWithValue, extra }) => {
    try {
      const response = await extra.api.get<Article>(`/articles/${id}`);
      return response.data;
    } catch (e: any) {
      if (e?.response?.data?.message) {
        return rejectWithValue(e.response.data.message);
      }
      return rejectWithValue(e.message);
    }
  },
);
