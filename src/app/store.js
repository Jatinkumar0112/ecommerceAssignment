import { configureStore } from '@reduxjs/toolkit';
// import productReducer from '../features/home/productSlice';
import cartReducer from '../features/navbar/cartSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    // product:productReducer,
    cart:cartReducer,
    auth:authReducer
   
  },
});
