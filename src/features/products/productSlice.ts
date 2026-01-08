import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productsAPI } from '@/services/api';
import type { Product, ProductState } from '@/types';

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const response = await productsAPI.getAll();
  return response;
});

export const fetchProductsAdmin = createAsyncThunk('products/fetchAllAdmin', async () => {
  const response = await productsAPI.getAllAdmin();
  return response;
});

export const fetchProductById = createAsyncThunk('products/fetchById', async (id: string) => {
  const response = await productsAPI.getById(id);
  return response;
});

export const createProduct = createAsyncThunk(
  'products/create',
  async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'margin'>) => {
    const response = await productsAPI.create(data);
    return response;
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, data }: { id: string; data: Partial<Product> }) => {
    const response = await productsAPI.update(id, data);
    return response;
  }
);

export const deleteProduct = createAsyncThunk('products/delete', async (id: string) => {
  await productsAPI.delete(id);
  return id;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchProductsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
