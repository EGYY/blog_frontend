import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MainPageSchema } from '../types/mainPage';

import { Category } from '@/entities/Article';

const initialState: MainPageSchema = {
  selectedCategory: undefined,
};

export const mainPageSlice = createSlice({
  name: 'mainPage',
  initialState,
  reducers: {
    setSelectedCategory: (state, { payload }: PayloadAction<Category | undefined>) => {
      state.selectedCategory = payload;
    },
  },
});

export const { actions: mainPageActions } = mainPageSlice;

export const { reducer: mainPageReducer } = mainPageSlice;
