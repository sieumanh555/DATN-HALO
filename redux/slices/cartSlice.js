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
                existItem.quantity += action.payload.quantity;
            } else {
                state.products.push({
                    ...action.payload,
                    quantity: action.payload.quantity,
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
                product.quantity += 1;
                if (product.quantity >= 11) {
                    alert("Chỉ có thể mua tối đa 10 sản phẩm");
                    product.quantity = 10;
                }
            }
        },
        decreaseQuantity: (state, action) => {
            const product = state.products.find((item) => item._id === action.payload);
            if (product) {
                product.quantity -= 1;
            }
        },
    },
});

export const {addItem, removeItem, removeAll, increaseQuantity, decreaseQuantity} =
    cartSlice.actions;
export default cartSlice;
