import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  productCategories: [],
  blogCategories: [],
  colors: [],
  coupons: [],
  loading: false,
  error: null,
};

export const fetchExternalCategories = createAsyncThunk(
  "category/fetchExternalCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setProductCategories: (state, action) => {
      state.productCategories = action.payload;
    },
    setBlogCategories: (state, action) => {
      state.blogCategories = action.payload;
    },
    setColors: (state, action) => {
      state.colors = action.payload;
    },
    setCoupons: (state, action) => {
      state.coupons = action.payload;
    },
    setCategoryLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCategoryError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExternalCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExternalCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.productCategories = action.payload;
      })
      .addCase(fetchExternalCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setProductCategories,
  setBlogCategories,
  setColors,
  setCoupons,
  setCategoryLoading,
  setCategoryError,
} = categorySlice.actions;
export default categorySlice.reducer;
