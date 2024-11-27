import React, { useState, useEffect } from 'react';
import { Layout, Input, Button, Badge, Drawer, List, InputNumber, Typography, Space } from 'antd';
import { ShoppingCartOutlined, UserOutlined, DeleteOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal, removeFromCart, updateQuantity, clearCart } from './cartSlice'; // Cart Redux actions
import { selectAuthState, logout } from '../auth/authSlice'; // Auth Redux actions
import './Navbar.css';

const { Header } = Layout;
const { Text } = Typography;

const Navbar = ({ searchQuery, onSearch }) => {
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems); // Cart items from Redux
  const totalPrice = useSelector(selectCartTotal); // Total price from Redux
  const authState = useSelector(selectAuthState); // Auth state from Redux
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Set screen size threshold for mobile view
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize); // Add resize event listener
    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);

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

  // Logout function
  const handleLogout = () => {
    dispatch(logout());
  };

  // Handle checkout
  const handleCheckout = () => {
    if (!authState.isAuthenticated) {
      navigate('/login', { state: { fromCart: true } });
    } else {
      dispatch(clearCart());
    }
  };

  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);
  const isProductDetailsPage = location.pathname.startsWith('/products/');
  const isLoginPage = location.pathname === '/login';

  return (
    <Header className="header">
      <Link to={'/'}>
        <div className="logo">E-Commerce</div>
      </Link>
      {!(isProductDetailsPage || isLoginPage)  && (
        <div className="search-container">
          <Input.Search
            placeholder="Search products..."
            className="search-bar"
            value={searchQuery} // Controlled component
            onChange={(e) => onSearch(e.target.value)} // Pass the search value back to the parent
            enterButton
          />
        </div>
      )}
     

     <Space>
  {authState.isAuthenticated ? (
    <Button
      type="primary"
      icon={<LogoutOutlined />}
      className="logout-button"
      onClick={handleLogout}
    >
      Logout
    </Button>
  ) : (
    !isLoginPage && (
      <Link to={'/login'}>
        <Button type="primary" icon={<UserOutlined />} className="login-button">
          Login
        </Button>
      </Link>
    )
  )}

  <Badge className="cart-badge" count={totalItemsInCart}>
    <Button icon={<ShoppingCartOutlined />} className="cart-button" onClick={showDrawer} />
  </Badge>
</Space>


      <Drawer
        title="Shopping Cart"
        placement="right"
        visible={drawerVisible}
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
                  <List.Item.Meta title={item.name} />
                  <div>Total: ${item.price * item.quantity}</div>
                </List.Item>
              )}
            />
            <div style={{ marginTop: 20 }}>
              <Text strong>Total Price: ${totalPrice.toFixed(2)}</Text>
            </div>
            <Button type="primary" block style={{ marginTop: 20 }} onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </>
        )}
      </Drawer>
    </Header>
  );
};

export default Navbar;
