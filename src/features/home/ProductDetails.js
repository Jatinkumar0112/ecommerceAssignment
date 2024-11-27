import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Row, Col, Card, Button, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { selectProductById, fetchAllProductByIdAsync } from './productSlice'; // Adjust based on your Redux logic
import { addToCart } from '../navbar/cartSlice'; // Import the addToCart action from cartSlice
import './ProductDetails.css'; 
import Navbar from '../navbar/Navbar';

const { Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Fetch product details when the component mounts
  useEffect(() => {
    dispatch(fetchAllProductByIdAsync(id));
  }, [dispatch, id]);

  // Select the product from Redux store
  const product = useSelector((state) => selectProductById(state, id));

  // Show loading message while data is fetching
  if (!product) {
    return <div>Loading product details...</div>;
  }

  // Handle add to cart action
  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Dispatch the addToCart action with the selected product
  };
  
  return (
    <Layout>
      <Navbar />
      <Content className="product-content">
        <Row gutter={[16, 16]} className="product-row">
          
          <Col xs={24} sm={12} md={12} lg={10} className="product-col">
            <Card
              hoverable
              cover={
                <img
                  alt={product.name}
                  src={product.image || 'https://via.placeholder.com/300?text=Product+Image'}
                  className="product-image"
                />
              }
            />
          </Col>

          <Col xs={24} sm={12} md={12} lg={14} className="product-col">
            <Card className="product-card">
              <Title level={2}>{product.name}</Title>
              <Paragraph className="product-description">{product.description}</Paragraph>
              <Title level={4} className="product-price">${product.price}</Title>
              <Button 
                type="primary" 
                size="large" 
                className="add-to-cart-btn" 
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer className="product-footer">
        E-Commerce Website ©2023 Created by Jatin Kumar.
      </Footer>
    </Layout>
  );
};

export default ProductDetail;
