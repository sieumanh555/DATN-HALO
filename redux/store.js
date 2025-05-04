import {configureStore} from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice.js";
import checkoutSlice from "./slices/checkoutSlice";
import voucherSlice from "./slices/voucherSlice"

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        checkout: checkoutSlice.reducer,
        voucher: voucherSlice.reducer,
    },
});
export default store;
