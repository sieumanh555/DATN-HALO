import {ProductCart} from "@/app/models/Product";
import type Voucher from "@/app/models/Voucher";

export const subTotal = (checkout: ProductCart[]): number => {
    return checkout.reduce((total: number, item: ProductCart): number => {
        const variant = item.variants.find((variant) =>
            variant.size === item.selectedSize &&
            variant.color === item.selectedColor
        );

        const variantExtra = variant?.price || 0;
        const totalPrice = (item.price + variantExtra) * item.quantityy;
        return total + totalPrice
    }, 0)
}

export const total = (subTotal: number, voucher: Voucher): number => {
    let voucherValue = 0;
    if (voucher && Object.keys(voucher).length > 0) {
        switch (voucher.type) {
            case "percentage": {
                voucherValue = (Number(voucher.value) * subTotal) / 100;
                break;
            }
            case "fixed_amount": {
                voucherValue = Number(voucher.value) * 1000;
                break;
            }
            case "shipping": {
                voucherValue = Number(voucher.value) * 1000;
                break;
            }
            default : {
                voucherValue = 0;
                break;
            }
        }
    }
    const finalTotal = subTotal - voucherValue;
    return finalTotal > 0 ? finalTotal : 0;
}

export const percent = (subTotal: number, total: number): number => {
    const value = Math.ceil(((subTotal - total) * 100) / subTotal);
    return value > 0 ? value : 0;
}