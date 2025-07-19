import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getArticleCategories } from '../services/getArticleCategories/getArticleCategories';
import { ArticleCategory, ArticlesCategoriesSchema } from '../types/articleCategory';

const initialState: ArticlesCategoriesSchema = {
  data: [],
  loading: false,
  error: undefined,
};

export const articleCategorySlice = createSlice({
  name: 'articleCategorySlice',
  initialState,
  reducers: {
    setCategories: (state, { payload }: PayloadAction<ArticleCategory[]>) => {
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
      .addCase(getArticleCategories.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getArticleCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getArticleCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: articleCategoryActions } = articleCategorySlice;

export const { reducer: articleCategoryReducer } = articleCategorySlice;
