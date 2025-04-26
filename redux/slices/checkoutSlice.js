import {createSlice} from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        products: [],
    },
    reducers: {
        addItemCheckout: (state, action) => {
            const existItem = state.products.find(
                (item) => (
                    item._id === action.payload._id &&
                    item.selectedSize === action.payload.selectedSize &&
                    item.selectedColor === action.payload.selectedColor
                ));
            if (existItem) {
                existItem.quantityy += action.payload.payload.quantityy;
            } else {
                state.products.push({
                    ...action.payload,
                    quantityy: action.payload.quantityy,
                });
            }
        },
        removeItemCheckout: (state, action) => {
            state.products = state.products.filter(
                (item) => !(
                    item._id === action.payload.id &&
                    item.selectedSize === action.payload.selectedSize &&
                    item.selectedColor === action.payload.selectedColor
                )
            );
        },
        updateVariantCheckout: (state, action) => {
            const {id, oldSize, oldColor, newSize, newColor} = action.payload;

            const productIndex = state.products.findIndex(
                item =>
                    item._id === id &&
                    item.selectedSize === oldSize &&
                    item.selectedColor === oldColor
            );

            if (productIndex !== -1) {
                state.products = state.products.filter((item) =>
                    item._id === id &&
                    item.selectedSize === oldSize &&
                    item.selectedColor === oldColor
                );
                state.products = [
                    ...state.products,
                    {
                        ...action.payload.product,
                        selectedSize: newSize,
                        selectedColor: newColor
                    }
                ]

            }
        }
    }
});
export const {addItemCheckout, removeItemCheckout, updateVariantCheckout} = checkoutSlice.actions;
export default checkoutSlice;
