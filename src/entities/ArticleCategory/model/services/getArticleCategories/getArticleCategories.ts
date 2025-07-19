import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkExtraArg } from '@/app/providers/StoreProvider';
import { ArticleCategory } from '../../types/articleCategory';

export const getArticleCategories = createAsyncThunk<
ArticleCategory[], void, { rejectValue: string, extra: ThunkExtraArg }>(
  'article/getArticleCategories',
  async (_, { rejectWithValue, extra }) => {
    try {
      const response = await extra.api.get<ArticleCategory[]>('/article-categories');
      return response.data;
    } catch (e: any) {
      if (e?.response?.data?.message) {
        return rejectWithValue(e.response.data.message);
      }
      return rejectWithValue(e.message);
    }
  },
);
