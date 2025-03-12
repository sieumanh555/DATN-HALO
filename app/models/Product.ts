import Category from "./Category"
import Variant from "./Variant"
interface Product {
    _id: string;
    name: string;
    sku: string;
    brand: string;
    category: string | Category;
    image: string;
    subImage: string[];
    price: number;
    priceSale: number;
    quantity: number;
    selectedSize: number;
    variants: string | Variant[],
    view: number;
    hot: number;
}

export default Product;
