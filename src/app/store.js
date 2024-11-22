import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/home/productSlice';
import cartReducer from '../features/navbar/cartSlice';

export const store = configureStore({
  reducer: {
    product:productReducer,
    cart:cartReducer
   
  },
});
