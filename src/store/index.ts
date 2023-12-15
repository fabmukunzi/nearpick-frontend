import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import {
  combineReducers,
  configureStore,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import { notification } from 'antd';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { baseAPI } from './api';
import userReducer from './reducers/users';
import { PERSIST_KEY } from '@utils/constants';
import { useRouter } from 'next/router';

const rootReducer = combineReducers({
  [baseAPI.reducerPath]: baseAPI.reducer,
  userReducer,
});

const persistConfig = {
  key: PERSIST_KEY,
  version: 1,
  storage,
  blacklist: [baseAPI.reducerPath], // blacklisting a store attribute name, will not persist that store attribute.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      notification.error({
        message: action.payload?.data?.message || 'Oops something went wrong',
        key: action.meta.arg.endpointName,
      });
    }
    if (action?.payload?.status === 401) location.href = '/auth/login';

    return next(action);
  };

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    baseAPI.middleware,
    rtkQueryErrorLogger,
  ],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
