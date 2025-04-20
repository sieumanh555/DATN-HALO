"use client";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {addItem} from "@/redux/slices/cartSlice";
import {useDispatch} from "react-redux";
import {ProductResponse} from "@/app/models/Product";

export default function Trangchitiet() {
    const {id} = useParams();
    const dispatch = useDispatch();

    const [product, setProduct] = useState<ProductResponse| null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`http://localhost:3000/products/${id}`);
            const data = await response.json()
            if (!response.ok) {
                console.log(">>> Lỗi lấy dữ liệu product: ", data)
                return;
            }
            setProduct(data.data);
        }
        fetchProduct();
    }, [id]);

    return (
        <div>
            <button
                onClick={() => dispatch(addItem({...product, selectedSize: "40", selectedColor: "Đỏ", quantityy: 1}))}
            >
                Mua sp 1 size: 40 color: red
            </button>

            <button
                onClick={() => dispatch(addItem({...product, selectedSize: "41", selectedColor: "Xanh", quantityy: 1}))}
            >
                Mua sp 2 size 41 color:blue
            </button>
        </div>
    );
}