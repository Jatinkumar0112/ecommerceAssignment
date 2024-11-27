import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts,fetchProductById , fetchProductByCategories,fetchTypesOfCategories} from './productAPI';



const initialState = {
  products: [],
  categorie:[],
  typesOfCategories:[],
  searchQuery: '',
  status: 'idle',
  selectedProduct:null,
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);
export const fetchAllProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);
export const fetchTypesOfCategoriesAsync = createAsyncThunk(
  'product/fetchTypesOfCategories',
  async () => {
    const response = await fetchTypesOfCategories();
    return response.data;
  }
);
export const fetchProductByCategoriesAsync = createAsyncThunk(
  'product/fetchProductByCategories',
  async (categories) => {
    const response = await fetchProductByCategories(categories);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
     
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchAllProductsAsync.rejected, (state) => {
        state.status = 'failed'; 
      })
      .addCase(fetchAllProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchAllProductByIdAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchProductByCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categorie = action.payload;
      })
      .addCase(fetchProductByCategoriesAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchTypesOfCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTypesOfCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.typesOfCategories = action.payload;
      })
      .addCase(fetchTypesOfCategoriesAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectProductState = (state) => state.product;
export const { setSearchQuery} = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectProductByCategories = (state) => state.product.categorie;
export const selectTypesOfCategories = (state) => state.product.typesOfCategories;
export const selectSearchedProducts = (state) => {
  const { products, searchQuery } = state.product;
  return products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
};
export default productSlice.reducer;