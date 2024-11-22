import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],  // Array to store cart items
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;  // Increment quantity if product exists
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.items.find(item => item.id === id);
      if (product) {
        product.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => 
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;
