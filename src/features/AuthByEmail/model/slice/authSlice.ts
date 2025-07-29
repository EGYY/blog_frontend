import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { loginByEmail } from '../services/loginByEmail/loginByEmail';
import { registrateByEmail } from '../services/registrateByEmail/registrateByEmail';
import { AuthSchema } from '../types/AuthSchema';

const initialState: AuthSchema = {
  loading: false,
  typeForm: 'auth',
  error: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setTypeForm: (state, { payload }: PayloadAction<'auth' | 'register'>) => {
      state.typeForm = payload;
    },
    setError: (state, { payload }: PayloadAction<string | undefined>) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByEmail.pending, (state) => {
        state.error = undefined;
        state.loading = true;
      })
      .addCase(loginByEmail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registrateByEmail.pending, (state) => {
        state.error = undefined;
        state.loading = true;
      })
      .addCase(registrateByEmail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registrateByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: authActions } = authSlice;

export const { reducer: authReducer } = authSlice;
