import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface ProductData {
  id: number;
  colour: string;
  name: string;
  price: number;
  img: string;
}

export interface ProductState {
  products: ProductData[] | null;
  cart: any;
}

const initialState: ProductState = {
  products: [],
  cart: [],
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductData[]>) => {
      state.products = action.payload;
    },
    addToCart: (state, action: PayloadAction<ProductData>) => {
      state.cart?.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<ProductData>) => {
      state.cart = state.cart?.filter(
        (item: {id: number}) => item.id !== action.payload.id,
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {setProducts, addToCart, removeFromCart} = productSlice.actions;
//Selectors
export const getAllProducts = (state: {products: {products: ProductData[]}}) =>
  state.products.products;
export const getCart = (state: {products: {cart: any}}) => state.products.cart;

export default productSlice.reducer;
