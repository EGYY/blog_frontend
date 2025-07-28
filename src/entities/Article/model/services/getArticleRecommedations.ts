import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkExtraArg } from '@/app/providers/StoreProvider';
import { Article } from '../types/article';

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
