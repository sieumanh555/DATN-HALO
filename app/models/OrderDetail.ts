import Product from "@/app/models/Product";

interface OrderDetail {
    _id: string,
    items: [
        productId: string | Product,
        selectedColor: string,
        selectedSize: number,
        quantity: number,
        price: number
    ],
    createdAt: Date,
    updatedAt: Date
}
export default OrderDetail;