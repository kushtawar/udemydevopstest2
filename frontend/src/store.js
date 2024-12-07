import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import cartSliceeducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
/*
import cartSliceReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
 */

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceeducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
