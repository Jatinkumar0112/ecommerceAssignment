import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import { Layout, Select, Row, Col, Card, Button, Radio } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectAllProducts, 
  selectSearchedProducts,
  fetchAllProductsAsync, 
  selectTypesOfCategories, 
  fetchTypesOfCategoriesAsync, 
  selectProductByCategories, 
  fetchProductByCategoriesAsync, 
  selectProductState
} from './productSlice';
import { Link } from 'react-router-dom';
import './ProductList.css';
const { Option } = Select;

const { Content, Footer, Sider } = Layout;
const maxDescriptionLength = 30;
const truncateDescription = (description, maxLength) => {
  if (!description) return " "; // Return an empty string if description is undefined
  return description.length > maxLength ? description.substring(0, maxLength) + '...' : description;
};
const maxTitleLength = 15;
const truncateTitle = (title, maxLength) => {
  if (!title) return " "; 
  return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
};

export function ProductList() {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);
  const searchedProducts = useSelector(selectSearchedProducts);
  const typesOfCategories = useSelector(selectTypesOfCategories);
  const filteredProducts = useSelector(selectProductByCategories);
  // const productState = useSelector(selectProductState);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {searchQuery} = useSelector(selectProductState);

  // Fetch all products and categories on component mount
  useEffect(() => {
    dispatch(fetchTypesOfCategoriesAsync());
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);

  // Handle category selection
  const handleCategoryChange = (category) => {
    if (category === "all") { 
      setSelectedCategory(null); // Clear the filter
      dispatch(fetchAllProductsAsync()); // Fetch and display all products
    } else {
      setSelectedCategory(category);
      dispatch(fetchProductByCategoriesAsync(category));
    }
  };

  // Determine the products to display
  let productsToDisplay = allProducts; // Default to all products

  if (searchQuery){
    productsToDisplay = searchedProducts; // If search query exists, use searched products
  } else if (selectedCategory) {
    productsToDisplay = filteredProducts; // If a category is selected, use filtered products
  }

  return (
    <Layout>
      <Navbar />
      <Layout>
        <div className="filter">
          <h3>Filter By Categories</h3>
          <Select
            value={selectedCategory || undefined}
            onChange={handleCategoryChange}
            style={{ width: '100%' }}
            placeholder="Select a category"
            className="filter-select"
          >
            {typesOfCategories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
            
              <Option key={"all"} value={"all"}>All products</Option>
            
          </Select>
        </div>

        <Layout className="layout">
          <Content className="content">
            <Row gutter={16} className="row" wrap>
              {productsToDisplay.map(product => (
                <Col span={8}xs={24} sm={12} md={8} lg={6} key={product.id}>
                  <Card
                    hoverable
                    className="card"
                    cover={<img alt={product.name} src={product.image} className="card-image" />}
                  >
                    <Card.Meta 
                      title={truncateTitle(product.title, maxTitleLength)} 
                      description={truncateDescription(product.description, maxDescriptionLength)} 
                    />
                    <div className="card-title">${product.price}</div>
                    <Link to={`/products/${product.id}`}>
                    <Button color="primary" variant="filled"> View Details</Button>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </Content>
        </Layout>
      </Layout>
      <Footer className="footer">
        E-Commerce Website ©2024 Created by Jatin Kumar.
      </Footer>
    </Layout>
  );
}
