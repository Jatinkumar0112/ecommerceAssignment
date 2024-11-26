import React from 'react';
import { ProductList } from './features/home/ProductList.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetail from './features/home/ProductDetails.js';
import LoginForm from './components/LoginForm.js';
// import PrivateRoute from './components/PrivateRoute.js';
// import Cart from './features/cart/Cart.js';

import './App.css';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail/>} />
      {/* <Route path="/products/:id" element={<PrivateRoute element={<ProductDetail />} />} /> */}
      <Route path="/login" element={<LoginForm/>}/>
      {/* <Route path="/cart" element={<Cart />} /> */}
    </Routes>
  </Router>
  );
}

export default App;
