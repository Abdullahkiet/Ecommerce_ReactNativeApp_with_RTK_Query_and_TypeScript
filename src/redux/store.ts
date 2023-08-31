import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import productReducer from './features/productSlice';
import logger from 'redux-logger';
import {baseApi} from '../services/baseApi';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    products: productReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({}).concat([baseApi.middleware, logger]),
});

setupListeners(store.dispatch);
