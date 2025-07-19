import {
  CombinedState, configureStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { userReducer } from '@/entities/User';
import { createReducerManager } from './reducerManager';
import { axiosClassic, axiosWithAuth } from '@/shared/config/api/api';
import { saveScrollPostitionReducer } from '@/features/SaveScrollPostition';
import { toastReducer } from '@/features/Toast';

export const createReduxStore = (
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
    scroll: saveScrollPostitionReducer,
    toasts: toastReducer,
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
    }),
  });

  // @ts-ignore
  store.reducerManager = reducerManager;

  return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
