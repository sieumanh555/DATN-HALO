import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice.js";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

