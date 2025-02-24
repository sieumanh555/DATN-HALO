interface Product {
    _id: string;
    brand: string;
    category: {
        [key: string]: string
    };
    hot: number;
    image: string;
    name: string;
    price: number;
    priceSale: number;
    quanlity:number;
    sizes: {
        [key: string]: number
    };
    sku: string;
    subImage: string[]
}

export default Product;
