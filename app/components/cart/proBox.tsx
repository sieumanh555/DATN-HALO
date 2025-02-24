"use client";
import Link from "next/link";
import Image from "next/image";
import {useDispatch} from "react-redux";
import {Plus, Minus} from 'lucide-react';

import {
    removeItem,
    increaseQuantity,
    decreaseQuantity,
} from "@/redux/slices/cartSlice";
import Product from "../../models/Product";

export default function ProBox({data}: { data: Product }) {
    const dispatch = useDispatch();

    const handleDecrease = (product: Product) => {
        if (product.quanlity === 1) {
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
        <div className="relative w-full bg-[#fff] rounded-lg mt-[18px] p-[20px] flex justify-between hover:shadow-lg">
            <div className="w-[52%] flex justify-between">
                <div className={`w-[28%] h-[120px] relative`}>
                    <Image
                        src={`/assets/images/${data.image}`}
                        alt=""
                        fill
                        className={`object-cover rounded`}
                    />
                </div>
                <div className="w-[68%] flex flex-col space-y-[8px]">
                    <div className="font-semibold">{data.name}</div>
                    <div className="opacity-60">Mã sản phẩm: {data.sku}</div>
                    <div className="opacity-60">Mã danh mục: {data.category.categoryName}</div>
                    <div className="opacity-60 flex items-center justify-between">
                    <div className={`w-[30%]`}>Size:</div>
                        <div
                        className={`w-[60%]text-sm flex justify-between`}>
                        {Object.keys(data.sizes).map((size, index) => (
                            <div key={index}
                                 className={`w-8 h-8 border-2 rounded-lg flex items-center justify-center`}>
                                {size}
                            </div>
                        ))}
                    </div>
                    </div>

                    <div className="opacity-60">Brand: {data.brand}</div>
                    <Link href="#" className="opacity-60 underline text-[#0037B3]">
                        <div>Xem thêm thông tin</div>
                    </Link>
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
                        value={data.quanlity}
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

            <div className="w-[14%] text-center opacity-50">
                <p>{data.price.toLocaleString("vi-VN")}đ</p>
            </div>

            <div className="w-[14%] text-center opacity-50">
                <p>{(data.price * data.quanlity).toLocaleString("vi-VN")}đ</p>
            </div>

            <button
                onClick={() => dispatch(removeItem(data._id))}
                className="absolute top-[-10px] right-[-10px]"
            >
                <div
                    title={`Xóa sản phẩm ${data.name} ?`}
                    className="relative w-[32px] h-[32px] bg-[#D92D20] hover:shadow-complex transition-shadow rounded-full flex justify-center items-center"
                >
                    {/*<img*/}
                    {/*    src="/images/plus-white-icon.png"*/}
                    {/*    alt=""*/}
                    {/*    className="absolute w-[24px] h-[24px] rotate-45"*/}
                    {/*/>*/}
                    <Plus className={`text-[#fff] rotate-45`}/>
                </div>
            </button>
        </div>
    );
}
