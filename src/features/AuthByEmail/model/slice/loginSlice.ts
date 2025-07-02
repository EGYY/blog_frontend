import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginByEmail } from '../services/loginByEmail/loginByEmail';
import { LoginSchema } from '../types/LoginSchema';

const initialState: LoginSchema = {
  loading: false,
  error: null,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setError: (state, { payload }: PayloadAction<string | null>) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByEmail.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(loginByEmail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: loginActions } = loginSlice;

export const { reducer: loginReducer } = loginSlice;
