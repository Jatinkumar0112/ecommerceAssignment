import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import { Layout, Select, Row, Col, Card, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import './ProductList.css';
import { fetchAllProducts, fetchProductByCategories, fetchTypesOfCategories } from './productAPI';

const { Option } = Select;
const { Title } = Typography;
const { Content, Footer } = Layout;

const maxDescriptionLength = 30;
const truncateDescription = (description, maxLength) => {
  if (!description) return " ";
  return description.length > maxLength ? description.substring(0, maxLength) + '...' : description;
};

const maxTitleLength = 15;
const truncateTitle = (title, maxLength) => {
  if (!title) return " ";
  return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
};

const ProductList = ({searchQuery})  => {

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [typesOfCategories, setTypesOfCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  // const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch all products and categories on component mount
  useEffect(() => {
    const fetchData = async() => {
      setLoading(true);
      try {
        const products = await fetchAllProducts();
        const categories = await fetchTypesOfCategories();
        setAllProducts(products.data);
        setTypesOfCategories(categories.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle category selection
  const handleCategoryChange = async (category) => {
    if (category === "all") {
      setSelectedCategory(null);
      setFilteredProducts([]);
    } else {
      setSelectedCategory(category);
      setLoading(true);
      try {
        const response = await fetchProductByCategories(category);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Determine the products to display
  const productsToDisplay = searchQuery
    ? allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedCategory
    ? filteredProducts
    : allProducts;

  return (
    <Layout>
      {/* <Navbar /> */}
      <Layout>
        <div className="filter">
          <Title level={3} className="filter-title">
            Filter By Categories
          </Title>
          <Select
            value={selectedCategory || 'all'}
            onChange={handleCategoryChange}
            style={{ width: '100%' }}
            placeholder="Select a category"
            className="filter-select"
          >
            <Option key="all" value="all">
              All Products
            </Option>
            {typesOfCategories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </div>

        <Layout className="layout">
          <Content className="content">
            {loading ? (
              <div>Loading products...</div>
            ) : productsToDisplay.length === 0 ? (
              <div className="no-products">No products available</div>
            ) : (
              <Row gutter={[16, 16]} className="row" wrap>
                {productsToDisplay.map((product) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                    <Card
                      hoverable
                      className="card"
                      cover={
                        <img
                          alt={product.name}
                          src={product.image || 'https://via.placeholder.com/300'}
                          className="card-image"
                        />
                      }
                    >
                      <Card.Meta
                        title={truncateTitle(product.title, maxTitleLength)}
                        description={truncateDescription(product.description, maxDescriptionLength)}
                      />
                      <div className="card-title">${product.price}</div>
                      <Link to={`/products/${product.id}`}>
                        <Button type="primary" block>
                          View Details
                        </Button>
                      </Link>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Content>
        </Layout>
      </Layout>
      <Footer className="footer">
        E-Commerce Website ©2024 Created by Jatin Kumar.
      </Footer>
    </Layout>
  );
}
export default ProductList;
