import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  pages: 1,
};

export const fetchExternalProducts = createAsyncThunk(
  "product/fetchExternalProducts",
  async (category = null, { rejectWithValue }) => {
    try {
      const url = category
        ? `https://fakestoreapi.com/products/category/${category}`
        : "https://fakestoreapi.com/products";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      return data.map((product) => ({
        _id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        images: [{ url: product.image }],
        category: product.category,
        rating: product.rating,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.products || action.payload;
      if (action.payload.total !== undefined) {
        state.total = action.payload.total;
        state.page = action.payload.page || 1;
        state.pages = action.payload.pages || 1;
      }
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExternalProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExternalProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchExternalProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProducts, setProduct, setLoading, setError, clearProduct } = productSlice.actions;
export default productSlice.reducer;
