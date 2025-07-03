import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginByEmail } from '../services/loginByEmail/loginByEmail';
import { LoginSchema } from '../types/LoginSchema';

const initialState: LoginSchema = {
  loading: false,
  error: undefined,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
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
      });
  },
});

export const { actions: loginActions } = loginSlice;

export const { reducer: loginReducer } = loginSlice;
