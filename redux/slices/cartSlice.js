import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    addItem: (state, action) => {
      const existItem = state.products.find(
        (item) => item.id === action.payload.id
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
        (item) => item.id !== action.payload
      );
    },
    increaseQuantity: (state, action) => {
      const product = state.products.find((item) => item.id === action.payload);
      if (product) {
        product.quantity += 1;
        if (product.quantity >= 11) {
          alert("Chỉ có thể mua tối đa 10 sản phẩm");
          product.quantity = 10;
        }
      }
    },
    decreaseQuantity: (state, action) => {
      const product = state.products.find((item) => item.id === action.payload);
      if (product) {
        product.quantity -= 1;
      }
    },
  },
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice;
