import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SaveScrollPostitionSchema } from '../types/saveScrollPostition';

const initialState: SaveScrollPostitionSchema = {
  scroll: {},
};

export const saveScrollPostitionSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setScrollPostition: (state, { payload }: PayloadAction<{path: string, position: number}>) => {
      state.scroll[payload.path] = payload.position;
    },
  },
});

export const { actions: saveScrollPostitionActions } = saveScrollPostitionSlice;

export const { reducer: saveScrollPostitionReducer } = saveScrollPostitionSlice;
