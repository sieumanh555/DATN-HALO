import {configureStore} from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice.js";
import checkoutSlice from "./slices/checkoutSlice"

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        checkout: checkoutSlice.reducer,
    },
});
export default store;
