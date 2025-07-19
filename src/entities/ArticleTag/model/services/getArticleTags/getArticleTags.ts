import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkExtraArg } from '@/app/providers/StoreProvider';
import { ArticleTag } from '../../types/articleTag';

export const getArticleTags = createAsyncThunk<
ArticleTag[], void, { rejectValue: string, extra: ThunkExtraArg }>(
  'article/getArticleTags',
  async (_, { rejectWithValue, extra }) => {
    try {
      const response = await extra.api.get<ArticleTag[]>('/article-tags');
      return response.data;
    } catch (e: any) {
      if (e?.response?.data?.message) {
        return rejectWithValue(e.response.data.message);
      }
      return rejectWithValue(e.message);
    }
  },
);
