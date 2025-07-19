import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Toast, ToastSchema } from '../types/toast';

const initialState: ToastSchema = {
  items: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
      const newToast: Toast = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.items.push(newToast);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((toast) => toast.id !== action.payload);
    },
  },
});
export const { actions: toastActions } = toastSlice;

export const { reducer: toastReducer } = toastSlice;
