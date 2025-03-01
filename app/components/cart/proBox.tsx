"use client";
import Link from "next/link";
import Image from "next/image";
import {useDispatch} from "react-redux";
import {Minus, Plus, Trash2} from 'lucide-react';

import {decreaseQuantity, increaseQuantity, removeItem,} from "@/redux/slices/cartSlice";
import Product from "../../models/Product";

export default function ProBox({data}: { data: Product }) {
    const dispatch = useDispatch();

    const handleDecrease = (product: Product) => {
        if (product.quantity === 1) {
            const text = `Xóa sản phẩm ${product.name}`;
            if (confirm(text) == true) {
                alert("Xóa thành công");
                dispatch(removeItem(product._id));
            } else {
                console.log(
                    ".-- .... -.-- / -.. .. -.. / -.-- --- ..- / -.. --- / - .... .. ... / - --- / -- . . . . . . . . . / ..--.."
                );
            }
        } else {
            dispatch(decreaseQuantity(product._id));
        }
    };

    return (
        <div className="relative w-full bg-[#fff] rounded-lg mt-[18px] p-[20px] flex justify-between">
            <div className="w-[52%] flex justify-between">
                <div className={`h-[120px] flex items-center`}>
                    <Image
                        src={`/assets/images/${data.image}`}
                        alt={`${data.name}`}
                        width={120}
                        height={120}
                        className={`rounded`}
                    />
                </div>
                <div className="relative w-[68%] flex flex-col space-y-2">
                    <div className="font-semibold">{data.name}</div>
                    <div className="opacity-60">Mã sản phẩm: {data.sku}</div>
                    <div className="opacity-60">Chọn size: {data.selectedSize}</div>
                    <div className={`w-full flex items-center gap-4`}>
                        <Link href={`/pages/product-detail/${data._id}`}
                              className="opacity-60 hover:underline hover:text-[#0037B3]">
                            <div>Xem chi tiết sản phẩm</div>
                        </Link>
                        <p>|</p>
                        <button
                            onClick={() => dispatch(removeItem(data._id))}
                            title={`Xóa sản phẩm ${data.name} ?`}
                            className={`cursor-pointer text-gray-600 hover:text-[#D92D20]`}
                        >
                            <Trash2 className={`w-6 h-6 `}/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-[14%] h-[24px] flex">
                <button
                    onClick={() => handleDecrease(data)}
                    className="w-[25%] flex justify-center items-center rounded hover:bg-[#F2F4F7] hover:shadow-lg"
                >
                    <Minus className={`w-5`}/>
                </button>
                <div className="inputNumber w-[50%]">
                    <input
                        type="number"
                        id="quantity"
                        value={data.quantity}
                        readOnly
                        className="w-full text-center focus:outline-none"
                    />
                </div>
                <button
                    onClick={() => dispatch(increaseQuantity(data._id))}
                    className="w-[25%] flex justify-center items-center rounded hover:bg-[#F2F4F7] hover:shadow-lg"
                >
                    <Plus className={`w-5`}/>
                </button>
            </div>
            <div className="w-[14%] flex justify-center">
                <p>{data.price.toLocaleString("vi-VN")}đ</p>
            </div>
            <div className="w-[14%] flex justify-center">
                <p>{(data.price * data.quantity).toLocaleString("vi-VN")}đ</p>
            </div>
        </div>
    );
}
