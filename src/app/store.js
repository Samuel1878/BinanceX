import { configureStore } from '@reduxjs/toolkit';
import { cryptoAPI } from '../Services/CryptoAPI.js';
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store =configureStore({
  reducer: {
    [cryptoAPI.reducerPath]: cryptoAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(cryptoAPI.middleware),
});
setupListeners(store.dispatch);
export default store