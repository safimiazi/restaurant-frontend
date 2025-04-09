import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import { baseApi } from './api/baseApi';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import categoryReducer from './features/category/categorySlice';
import productCartReducer from './features/productCart/ProductCartSlice';
import loginRegistrationReducer from './features/auth/loginRegistrationSlice';
import adminAuthReducer from './features/auth/AdminAuthSlice';

// Persist configs
const authPersistConfig = {
  key: 'auth',
  storage,
};

const adminAuthPersistConfig = {
  key: 'adminAuth',
  storage,
};

// Create persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedAdminAuthReducer = persistReducer(adminAuthPersistConfig, adminAuthReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    adminAuth: persistedAdminAuthReducer,
    category: categoryReducer,
    cart: productCartReducer,
    loginRegistration: loginRegistrationReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Type definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);