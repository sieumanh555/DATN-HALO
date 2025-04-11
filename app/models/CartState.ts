import {ProductCart} from "@/app/models/Product";

export interface CartState {
    cart: {
        products: ProductCart[];
    };
}

export interface CheckoutState {
    checkout: {
        products: ProductCart[];
    }
}
