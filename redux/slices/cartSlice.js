import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
    },
    reducers: {
        addItem: (state, action) => {
            const existItem = state.products.find(
                (item) =>
                    item._id === action.payload._id
                    &&
                    item.selectedSize === action.payload.selectedSize
                    &&
                    item.selectedColor === action.payload.selectedColor
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
            // const delItem = state.products.find((item) =>
            //     item._id === action.payload.id &&
            //     item.selectedSize === action.payload.selectedSize &&
            //     item.selectedColor === action.payload.selectedColor
            // );
            // state.products = state.products.filter((item) => item !== delItem);
            state.products = state.products.filter(
                (item) => !(
                    item._id === action.payload.id &&
                    item.selectedSize === action.payload.selectedSize &&
                    item.selectedColor === action.payload.selectedColor
                )
            );
        },
        removeAll: (state) => {
            state.products = [];
        },
        increaseQuantity: (state, action) => {
            const product = state.products.find(
                (item) => (
                    item._id === action.payload.id &&
                    item.selectedSize === action.payload.selectedSize &&
                    item.selectedColor === action.payload.selectedColor
                )
            );
            if (product) {
                product.quantityy += 1;
                if (product.quantityy > action.payload.stock) {
                    alert(`Chỉ có thế mua ${action.payload.stock} sản phẩm`);
                    product.quantityy = action.payload.stock;
                }
            } else {
                alert("Không tìm thấy sản phẩm")
            }
        },
        decreaseQuantity: (state, action) => {
            const product = state.products.find(
                (item) => item._id === action.payload.id
                    && item.selectedSize === action.payload.selectedSize &&
                    item.selectedColor === action.payload.selectedColor
            );
            if (product) {
                product.quantityy -= 1;
            }
        },
        updateVariant: (state, action) => {
            const { id, oldSize, oldColor, newSize, newColor } = action.payload;

            const productIndex = state.products.findIndex(
                item =>
                    item._id === id &&
                    item.selectedSize === oldSize &&
                    item.selectedColor === oldColor
            );

            if (productIndex !== -1) {
                const product = state.products[productIndex];

                // Kiểm tra nếu đã tồn tại sản phẩm mới
                const duplicate = state.products.find(
                    item =>
                        item._id === id &&
                        item.selectedSize === newSize &&
                        item.selectedColor === newColor
                );

                if (duplicate) {
                    // Nếu tồn tại rồi thì gộp số lượng và xóa cái cũ
                    duplicate.quantityy += product.quantityy;
                    state.products.splice(productIndex, 1);
                } else {
                    // Cập nhật variant mới
                    state.products[productIndex].selectedSize = newSize;
                    state.products[productIndex].selectedColor = newColor;
                }
            }
        }
    },
});

export const {
    addItem,
    removeItem,
    removeAll,
    increaseQuantity,
    decreaseQuantity,
    updateVariant
} = cartSlice.actions;
export default cartSlice;
