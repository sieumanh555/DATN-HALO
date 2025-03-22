import Category from "./Category"
import Variant from "./Variant"

interface Product {
    _id: string;
    name: string;
    sku: string;
    brand: string;
    category: string | Category;
    price: number;
    priceSale: number;
    quantity: number;
    selectedSize: number;
    variants: string | Variant[];
    view: number;
    sold: number;
    hot: number;
}

export default Product;
