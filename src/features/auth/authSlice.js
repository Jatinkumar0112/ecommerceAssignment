import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null, // Stores user details
  token: null, // Stores authentication token
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user; // Stores user details
      state.token = action.payload.token; // Stores the token
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

// Selector to access the auth state
export const selectAuthState = (state) => state.auth;

export default authSlice.reducer;
