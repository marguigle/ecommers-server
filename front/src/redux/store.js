import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import productReducer from "./slices/productSlice.js";
import cartReducer from "./slices/cartSlice.js";
import wishlistReducer from "./slices/wishlistSlice.js";
import blogReducer from "./slices/blogSlice.js";
import categoryReducer from "./slices/categorySlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    blog: blogReducer,
    category: categoryReducer,
  },
});
