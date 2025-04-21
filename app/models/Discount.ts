interface Discount {
    _id: string;
    name: string;
    minus: number;
    percent: number;
    condition: number;
    description: string;
    stock: number;
}

export default Discount;
