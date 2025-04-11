import {createSlice} from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        products: [],
    },
    reducers: {
        addItemCheckout: (state, action) => {
            const existItem = state.products.find((item) => item._id === action.payload._id);
            if (existItem) {
                existItem.quantityy += action.payload.quantityy;
            } else {
                state.products.push({
                    ...action.payload,
                    quantityy: action.payload.quantityy,
                });
            }
        },
        removeItemCheckout: (state, action) => {
            state.products = state.products.filter(
                (item) => item._id !== action.payload
            );
        },
    },
});

export const {addItemCheckout, removeItemCheckout} = checkoutSlice.actions;
export default checkoutSlice;
