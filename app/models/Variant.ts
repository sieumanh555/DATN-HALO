// interface Variant {
//     _id: string,
//     productId: string,
//     image: string;
//     color: string,
//     hex: string,
//     size: number,
//     stock: number,
//     price: number,
//     priceSale: number
// }


interface Variant {
    _id: string,
    size: string,
    color: string,
    price: number,
    stock: number,
    status: string,
    images: string[]
}

export default Variant;
