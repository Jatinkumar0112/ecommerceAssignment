import React, { useState, useEffect } from 'react';
import { Layout, Input, Button, Badge, Drawer, List, InputNumber, Typography } from 'antd';
import { ShoppingCartOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal, removeFromCart, updateQuantity } from './cartSlice'; // Redux actions
import './Navbar.css';

const { Header } = Layout;
const { Text } = Typography;

const Navbar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false); 
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems); 
  const totalPrice = useSelector(selectCartTotal); 

  // Check window size to update isMobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Set screen size threshold for mobile view
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize); // Add resize event listener
    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);

  // Open and close cart drawer
  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  // Handle quantity change
  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  // Handle removing an item from the cart
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Header className="header">
    
      <div className="logo">{isMobile ? null : 'E-Commerce'}</div>

      
      <div className="search-container">
        <Input.Search
          placeholder="Search products..."
          className="search-bar"
          enterButton
        />
      </div>

      
      <Link to={'/login'}>
        <Button type="primary" icon={<UserOutlined />} className="login-button">
          Login
        </Button>
      </Link>

      
      <Badge  className="cart-badge" count={cartItems.length}>
        <Button icon={<ShoppingCartOutlined />} className="cart-button" onClick={showDrawer} />
      </Badge>

      
      <Drawer
        title="Shopping Cart"
        placement="right"
        visible = {drawerVisible}
        onClose={closeDrawer}
        width={400}
      >
        {cartItems.length === 0 ? (
          <div>Your cart is empty</div>
        ) : (
          <>
            <List
              itemLayout="horizontal"
              dataSource={cartItems}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <InputNumber
                      min={1}
                      value={item.quantity}
                      onChange={(value) => handleQuantityChange(item.id, value)}
                    />,
                    <Button
                      icon={<DeleteOutlined />}
                      type="link"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={item.name}
                    // description={`$${item.price}`}
                  />
                  <div>Total: ${item.price * item.quantity}</div>
                </List.Item>
              )}
            />
            <div style={{ marginTop: 20 }}>
              <Text strong>Total Price: ${totalPrice.toFixed(2)}</Text>
            </div>
            <Button type="primary" block style={{ marginTop: 20 }}>
              Proceed to Checkout
            </Button>
          </>
        )}
      </Drawer>
    </Header>
  );
};

export default Navbar;
