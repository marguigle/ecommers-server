import { createSlice } from "@reduxjs/toolkit";

const getStoredWishlist = () => {
  try {
    const stored = localStorage.getItem("externalWishlist");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState = {
  wishlist: [],
  externalWishlist: getStoredWishlist(),
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
    addToExternalWishlist: (state, action) => {
      const exists = state.externalWishlist.some((item) => item._id === action.payload._id);
      if (!exists) {
        state.externalWishlist.push(action.payload);
        localStorage.setItem("externalWishlist", JSON.stringify(state.externalWishlist));
      }
    },
    removeFromExternalWishlist: (state, action) => {
      state.externalWishlist = state.externalWishlist.filter((item) => item._id !== action.payload);
      localStorage.setItem("externalWishlist", JSON.stringify(state.externalWishlist));
    },
    setWishlistLoading: (state, action) => {
      state.loading = action.payload;
    },
    setWishlistError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setWishlist,
  clearWishlist,
  addToExternalWishlist,
  removeFromExternalWishlist,
  setWishlistLoading,
  setWishlistError,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
