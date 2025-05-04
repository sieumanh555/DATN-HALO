import {ProductCart} from "@/app/models/Product";
import Voucher from "@/app/models/Voucher";

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

export interface VoucherState {
    voucher: {
        voucher: Voucher;
    }
}
