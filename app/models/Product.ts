interface Product {
    _id: string;
    name: string;
    sku: string;
    brand: string;
    category: {
        [key: string]: string
    };
    image: string;
    subImage: string[];
    price: number;
    priceSale: number;
    quantity: number;
    sizes: [
        { size: number, stock: number }
    ];
    selectedSize: number;
    view: number;
    hot: number;
}

export default Product;
