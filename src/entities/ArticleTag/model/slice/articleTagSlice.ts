import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getArticleTags } from '../services/getArticleTags/getArticleTags';
import { ArticlesTagsSchema, ArticleTag } from '../types/articleTag';

const initialState: ArticlesTagsSchema = {
  data: [],
  loading: false,
  error: undefined,
};

export const articleTagSlice = createSlice({
  name: 'articleTagSlice',
  initialState,
  reducers: {
    setTags: (state, { payload }: PayloadAction<ArticleTag[]>) => {
      state.data = payload;
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticleTags.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getArticleTags.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getArticleTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: articleTagActions } = articleTagSlice;

export const { reducer: articleTagReducer } = articleTagSlice;
