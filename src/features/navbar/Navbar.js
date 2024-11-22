import React from 'react';
import { Layout, Menu, Input, Button, Badge } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'; // Ensure correct import
import './Navbar.css'; 
import { Link } from 'react-router-dom';

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header className="header">
     
      <div className="logo">E-Commerce</div>
      
     
      <Input.Search
        placeholder="Search products..."
        className="search-bar"
        enterButton
      />

     
      <Menu theme="light" mode="horizontal" className="menu">
        <Link to={'/'}> <Menu.Item key="home">Home</Menu.Item></Link>
       
        <Menu.Item key="products">Products</Menu.Item>
        <Menu.Item key="about">About Us</Menu.Item>
        <Menu.Item key="contact">Contact</Menu.Item>
      </Menu>

     
      <Link to={'/login'}>
      <Button type="primary" icon={<UserOutlined />} className="login-button"> 
        Login
      </Button>
      </Link>
      

      <Badge count={5}>
        <Button icon={<ShoppingCartOutlined />} className="cart-button" />
      </Badge>
      
    </Header>
  );
};

export default Navbar;