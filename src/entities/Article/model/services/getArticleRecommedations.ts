import { createAsyncThunk } from '@reduxjs/toolkit';

import { Article } from '../types/article';

import { ThunkExtraArg } from '@/app/providers/StoreProvider';

export const getArticleRecommedations = createAsyncThunk<
  Article[], string, { rejectValue: string, extra: ThunkExtraArg }>(
    'article/getArticleRecommedations',
    async (id, { rejectWithValue, extra }) => {
      try {
        const response = await extra.api.get<Article[]>(`/articles/${id}/recommendations`);
        return response.data;
      } catch (e: any) {
        if (e?.response?.data?.message) {
          return rejectWithValue(e.response.data.message);
        }
        return rejectWithValue(e.message);
      }
    },
  );
