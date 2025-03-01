import {configureStore} from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice.js";

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
    },
});
// export type AppDispatch = typeof store.dispatch;
export default store;
