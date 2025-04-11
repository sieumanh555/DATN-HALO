import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
    },
    reducers: {
        addItem: (state, action) => {
            const existItem = state.products.find(
                (item) => item._id === action.payload._id
            );
            if (existItem) {
                existItem.quantityy += action.payload.quantityy;
            } else {
                state.products.push({
                    ...action.payload,
                    quantityy: action.payload.quantityy,
                });
            }
        },
        removeItem: (state, action) => {
            state.products = state.products.filter(
                (item) => item._id !== action.payload
            );
        },
        removeAll: (state) => {
            state.products = [];
        },
        increaseQuantity: (state, action) => {
            const product = state.products.find((item) => item._id === action.payload);
            if (product) {
                product.quantityy += 1;
                if (product.quantityy >= 11) {
                    alert("Chỉ có thể mua tối đa 10 sản phẩm");
                    product.quantityy = 10;
                }
            }
        },
        decreaseQuantity: (state, action) => {
            const product = state.products.find((item) => item._id === action.payload);
            if (product) {
                product.quantityy -= 1;
            }
        },
    },
});

export const {
    addItem,
    removeItem,
    removeAll,
    increaseQuantity,
    decreaseQuantity} = cartSlice.actions;
export default cartSlice;
