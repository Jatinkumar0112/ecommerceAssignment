import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      console.log('Removing item with id:', id);
      console.log('Current items in cart:', JSON.stringify(state.items)); 
      
      const itemToRemove = state.items.find((item) => item.id === id);
      console.log({itemToRemove})
      
      if (itemToRemove) {
       
        state.items = state.items.filter((item) => item.id !== id);
        
      
        state.totalPrice = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      } else {
        console.log('Item not found in cart');
      }
    },
    
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = quantity;
      }
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0; 
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.totalPrice;

export default cartSlice.reducer;
