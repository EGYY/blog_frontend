import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkExtraArg } from '@/app/providers/StoreProvider';
import { ArticleType } from '@/entities/Article';

type crateArticleDataBody = FormData

export const createArticle = createAsyncThunk<
    ArticleType,
    crateArticleDataBody,
    { rejectValue: string, extra: ThunkExtraArg }
>(
  'article/createArticle',
  async (body, { rejectWithValue, extra }) => {
    try {
      const response = await extra.apiAuth.post<ArticleType>('/articles', body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (e: any) {
      if (e?.response?.data?.message) {
        return rejectWithValue(e.response.data.message);
      }
      return rejectWithValue(e.message);
    }
  },
);
