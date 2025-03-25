import Product from "@/app/models/Product";

export interface OrderDetailRequest {
    _id: string,
    items: [
        {
            productId: string,
            selectedColor: string,
            selectedSize: number,
            quantity: number,
            price: number
        }
    ],
    createdAt: Date,
    updatedAt: Date
}

export interface OrderDetailResponse {
    _id: string,
    items: [
        {
            productId: Product,
            selectedColor: string,
            selectedSize: number,
            quantity: number,
            price: number
        }
    ],
    createdAt: Date,
    updatedAt: Date
}
