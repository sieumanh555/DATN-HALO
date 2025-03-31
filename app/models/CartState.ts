import type {ProductResponse} from "@/app/models/Product";

interface CartState {
    cart: {
        products: ProductResponse[];
    };
}

export default CartState;