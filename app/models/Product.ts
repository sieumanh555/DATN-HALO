import Category from "./Category"
import Variant from "./Variant"

// interface Product {
//     _id: string;
//     name: string;
//     sku: string;
//     brand: string;
//     category: string | Category;
//     price: number;
//     priceSale: number;
//     quantity: number;
//     selectedSize: number;
//     variants: string | Variant[];
//     view: number;
//     sold: number;
//     hot: number;
// }
export interface ProductRequest {
    _id: string,
    name: string,
    price: number,
    pricePromo: number,
    hot: boolean,
    mota: string,
    hinhanh: string,
    quantity: number,
    isNew: boolean,
    rating: number,
    location: string,
    category: string,
    variants: string[]
}

export interface ProductResponse {
    _id: string,
    name: string,
    price: number,
    pricePromo: number,
    hot: boolean,
    mota: string,
    hinhanh: string,
    quantity: number,
    isNew: boolean,
    rating: number,
    location: string,
    category: Category,
    variants: [Variant]
}

export interface ProductCart extends ProductResponse{
    selectedSize: string,
    selectedColor: string,
    quantityy: number,
}
