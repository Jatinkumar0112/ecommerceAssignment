import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Row, Col, Card, Button, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { selectProductById, fetchAllProductByIdAsync } from './productSlice'; // Adjust based on your Redux logic
import './ProductDetails.css'; 
import Navbar from '../navbar/Navbar';

const { Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  console.log(id);
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

  return (
    <Layout>
      <Navbar/>
      <Content className="product-content">
        <Row gutter={16} className="product-row">
          {/* Product Image */}
          <Col className="product-col">
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

          {/* Product Details */}
          <Col className="product-col">
            <Card className="product-card">
              <Title level={2}>{product.name}</Title>
              <Paragraph>{product.description}</Paragraph>
              <Title level={4}>${product.price}</Title>
              <Button type="primary" size="large" className="add-to-cart-btn">
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
