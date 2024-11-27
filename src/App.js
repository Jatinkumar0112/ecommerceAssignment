import React,{useState} from 'react';
import  ProductList  from './features/home/ProductList.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetail from './features/home/ProductDetails.js';
import LoginForm from './components/LoginForm.js';
import Navbar from './features/navbar/Navbar.js';
// import PrivateRoute from './components/PrivateRoute.js';
// import Cart from './features/cart/Cart.js';

import './App.css';


function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle the search query change
  const handleSearch = (value) => {
    setSearchQuery(value);
  };
  return (
    <Router>
      <Navbar searchQuery={searchQuery} onSearch={handleSearch} />
    <Routes>
      <Route path="/"   element={<ProductList searchQuery={searchQuery} />} />
      <Route path="/products/:id" element={<ProductDetail/>} />
      {/* <Route path="/products/:id" element={<PrivateRoute element={<ProductDetail />} />} /> */}
      <Route path="/login" element={<LoginForm/>}/>
      {/* <Route path="/cart" element={<Cart />} /> */}
    </Routes>
  </Router>
  );
}

export default App;
