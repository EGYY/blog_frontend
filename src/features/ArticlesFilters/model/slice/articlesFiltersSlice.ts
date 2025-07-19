import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticlesFiltersSchema } from '../types/articlesFilters';

const initialState: ArticlesFiltersSchema = {
  search: '',
  sort: undefined,
  categories: [],
  tags: [],
  currentFilters: {},
  __filters_ready: false,
};

export const articlesFiltersSlice = createSlice({
  name: 'articlesFiltersSlice',
  initialState,
  reducers: {
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
    setSort: (state, { payload }: PayloadAction<'asc_date' | 'desc_date' | 'most_popular'>) => {
      state.sort = payload;
    },
    setTag: (state, { payload }: PayloadAction<any>) => {
      state.tags = [...state.tags!, payload];
    },
    setTags: (state, { payload }: PayloadAction<any[]>) => {
      state.tags = payload;
    },
    setCategory: (state, { payload }: PayloadAction<any>) => {
      state.categories = [...state.categories!, payload];
    },
    setCategories: (state, { payload }: PayloadAction<any[]>) => {
      state.categories = payload;
    },
    setCurrentFilters: (state, { payload }: PayloadAction<any>) => {
      state.currentFilters = payload;
    },
    setFilter: (state, { payload }: PayloadAction<Record<string, any>>) => {
      state.currentFilters = { ...state.currentFilters, ...payload };
    },
    removeFilter: (state, { payload }: PayloadAction<string>) => {
      delete state.currentFilters[payload];
    },
    clearTags: (state) => {
      state.tags = [];
    },
    clearCategories: (state) => {
      state.categories = [];
    },
    clearSearch: (state) => {
      state.search = '';
    },
    setFiltersReady: (state, { payload }: PayloadAction<boolean>) => {
      state.__filters_ready = payload;
    },
  },
});

export const { actions: articlesFiltersActions } = articlesFiltersSlice;

export const { reducer: articlesFiltersReducer } = articlesFiltersSlice;
