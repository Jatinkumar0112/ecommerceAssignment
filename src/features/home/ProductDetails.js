import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Row, Col, Card, Button, Typography } from 'antd';
import { addToCart } from '../navbar/cartSlice'; // Import the addToCart action from cartSlice
import { useDispatch } from 'react-redux';
import { fetchProductById } from './productAPI'; // Your API call for fetching product details
import './ProductDetails.css'; 

const { Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState({}); // Local state for product
  const [loading, setLoading] = useState(true); // Loading state
  
  // Fetch product details when the component mounts
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productData = await fetchProductById(id); // Fetch product from API
        // console.log({productData})
        setProduct(productData); // Set product data in local state
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchProductDetails(); // Call the function to fetch product details
  }, [id]);
  

  // Show loading message while data is fetching
  if (loading) {
    return <div>Loading product details...</div>;
  }

  // Handle add to cart action
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product.data)); // Dispatch the addToCart action with the selected product
    }
  };
  
  return (
    <Layout className="layout">
      <Content className="product-content">
        <Row gutter={[16, 16]} className="product-row">
          
          <Col xs={24} sm={12} md={12} lg={10} className="product-col">
            <Card
              hoverable
              cover={
                <img
                  alt={product.data.name}
                  src={product.data.image || 'https://via.placeholder.com/300?text=Product+Image'}
                  className="product-image"
                />
              }
            />
          </Col>

          <Col xs={24} sm={12} md={12} lg={14} className="product-col">
            <Card className="product-card">
              <Title level={2}>{product.data.name}</Title>
              <Paragraph className="product-description">{product.data.description}</Paragraph>
              <Title level={4} className="product-price">${product.data.price}</Title>
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
