import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createArticle } from '../services/createArticle/createArticle';
import { updateArticle } from '../services/updateArticle/updateArticle';
import { ArticleCreateUpdateSchema } from '../types/articleCreateUpdateTypes';

import { ArticleType } from '@/entities/Article';

const initialState: ArticleCreateUpdateSchema = {
  loading: false,
  error: undefined,
  articleContent: '',
  articleTitle: '',
  articleSubtitle: '',
  articleTags: [],
  articleCategory: '',
  articlePoster: '',
  articlePosterFile: undefined,
  articlePublished: false,
};

export const articleCreateUpdateSlice = createSlice({
  name: 'articleCreateUpdate',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setArticleContent: (state, action: PayloadAction<string>) => {
      state.articleContent = action.payload;
    },
    setArticleTitle: (state, action: PayloadAction<string>) => {
      state.articleTitle = action.payload;
    },
    setArticleSubtitle: (state, action: PayloadAction<string>) => {
      state.articleSubtitle = action.payload;
    },
    setArticleTags: (state, action: PayloadAction<string[]>) => {
      state.articleTags = action.payload;
    },
    setArticleCategory: (state, action: PayloadAction<string>) => {
      state.articleCategory = action.payload;
    },
    setArticlePoster: (state, action: PayloadAction<string>) => {
      state.articlePoster = action.payload;
    },
    setArticlePosterFile: (state, action: PayloadAction<File>) => {
      state.articlePosterFile = action.payload;
    },
    setArticlePubslished: (state, action: PayloadAction<boolean>) => {
      state.articlePublished = action.payload;
    },
    initDefaultData: (state, action: PayloadAction<ArticleType | undefined>) => {
      if (action.payload) {
        const article = action.payload;
        state.articleContent = article.content;
        state.articleTitle = article.title;
        state.articleSubtitle = article.subtitle;
        state.articleTags = article.tags.map((tag) => tag.id);
        state.articleCategory = article.categoryId;
        state.articlePoster = article.poster;
        state.articlePublished = Boolean(article.published);
      } else {
        state.articleContent = '';
        state.articleTitle = '';
        state.articleSubtitle = '';
        state.articleTags = [];
        state.articleCategory = '';
        state.articlePoster = '';
        state.articlePublished = false;
      }
    },
    resetData: (state) => {
      state.articleContent = '';
      state.articleTitle = '';
      state.articleSubtitle = '';
      state.articleTags = [];
      state.articleCategory = '';
      state.articlePoster = '';
      state.articlePublished = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createArticle.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(createArticle.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateArticle.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateArticle.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: articleCreateUpdateActions } = articleCreateUpdateSlice;

export const { reducer: articleCreateUpdateReducer } = articleCreateUpdateSlice;
