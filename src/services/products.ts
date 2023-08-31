import {baseApi} from './baseApi';
import {FetchArgs} from '@reduxjs/toolkit/dist/query';

const fetchProducts = (): FetchArgs => {
  return {
    url: 'products',
    method: 'GET',
  };
};

const productsAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    fetchProducts: builder.query({
      query: fetchProducts,
      transformResponse: (response: any) => {
        return response;
      },
    }),
  }),

  overrideExisting: true,
});

export const {useFetchProductsQuery} = productsAPI;
