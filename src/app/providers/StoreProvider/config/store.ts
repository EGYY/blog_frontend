import {
  CombinedState, configureStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';

import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

import { userReducer } from '@/entities/User';
import { saveScrollPostitionReducer } from '@/features/SaveScrollPostition';
import { toastReducer } from '@/features/Toast';
import { axiosClassic, axiosWithAuth } from '@/shared/config/api/api';
import { rtkApi } from '@/shared/config/api/rtkApi';

export const createReduxStore = (
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
    scroll: saveScrollPostitionReducer,
    toasts: toastReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,

  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api: axiosClassic,
          apiAuth: axiosWithAuth,
        },
      },
    }).concat(rtkApi.middleware),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
