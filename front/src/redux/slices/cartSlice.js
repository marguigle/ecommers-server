import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  cartTotal: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload.cart || action.payload;
      if (action.payload.cartTotal !== undefined) {
        state.cartTotal = action.payload.cartTotal;
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.cartTotal = 0;
    },
    setCartLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCartError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCart, clearCart, setCartLoading, setCartError } = cartSlice.actions;
export default cartSlice.reducer;
