import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import facebookAdsReducer from './slices/facebookAdsSlice';
import seoReducer from './slices/seoSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    facebookAds: facebookAdsReducer,
    seo: seoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;