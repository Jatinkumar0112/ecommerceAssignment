import React, { useState, useEffect } from 'react';
import { Layout, Input, Button, Badge, Drawer, List, InputNumber, Typography, Space } from 'antd';
import { ShoppingCartOutlined, UserOutlined, DeleteOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal, removeFromCart, updateQuantity , clearCart} from './cartSlice'; // Redux actions
import { selectAuthState, logout } from '../auth/authSlice'; // Auth actions
import './Navbar.css';
import { setSearchQuery } from '../home/productSlice';

const { Header } = Layout;
const { Text } = Typography;

const Navbar = () => {
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false); 
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems); 
  const totalPrice = useSelector(selectCartTotal); 
  const authState = useSelector(selectAuthState); 
  console.log(authState)
  const location = useLocation();

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

  // Logout function
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleCheckout = (item) => {
    if (!authState.isAuthenticated) {
     
      navigate('/login', { state: { fromCart: true } }); 
    } else {
      dispatch(clearCart()); 
      // alert('Check out All items'); 
    }
  };
  const handleSearch = (value) => {
    // console.log(value)
    dispatch(setSearchQuery(value)); // Dispatch the search query to Redux
  };

  const isProductDetailsPage = location.pathname.startsWith('/products/');
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Header className="header">
      <Link to={'/'}>
        <div className="logo">E-Commerce</div>
      </Link>
      {!isProductDetailsPage && (
        <div className="search-container">
          <Input.Search
            placeholder="Search products..."
            className="search-bar"
            onSearch={handleSearch}
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
          <Link to={'/login'}>
            <Button type="primary" icon={<UserOutlined />} className="login-button">
              Login
            </Button>
          </Link>
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
                  <List.Item.Meta
                    title={item.name}
                  />
                  <div>Total: ${item.price * item.quantity}</div>
                </List.Item>
              )}
            />
            <div style={{ marginTop: 20 }}>
              <Text strong>Total Price: ${totalPrice.toFixed(2)}</Text>
            </div>
            <Button type="primary" block style={{ marginTop: 20 } } onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </>
        )}
      </Drawer>
    </Header>
  );
};

export default Navbar;
