import Product from "@/app/models/Product";

interface CartState {
    cart: {
        products: Product[];
    };
}

export default CartState;