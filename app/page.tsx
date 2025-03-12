"use client";
import useSWR from "swr";
import {useState} from "react";
import {useDispatch} from "react-redux";

import {addItem} from "@/redux/slices/cartSlice";
import type Product from "../app/models/Product";
import type Variant from "../app/models/Variant";
import Image from "next/image";

export default function Home() {
    const [selectedSize, setSelectedSize] = useState(0);
    const dispatch = useDispatch();
    const fetcher = (url: string) => fetch(url).then((res) => res.json()).then((data) => data.data);
    const {data, error} = useSWR<Product[]>(
        "http://localhost:3000/products",
        fetcher,
        {
            refreshInterval: 3000,
        }
    );
    if (!data) return <div>Loading...</div>;
    if (error) return <div>Lỗi fetching data: {error.message}</div>;

    function handleAdd(product: Product) {
        if (selectedSize === 0) {
            alert("Vui lòng chọn size giày")
        } else {
            dispatch(addItem(product))
        }
    }

    return (
        <div className={`w-full mt-[18px] px-[100px] flex justify-between`}>
            {data.map((product) => (
                <div
                    key={product._id}
                    className="bg-[#fff] text-gray-600 rounded-lg mx-2 my-2 p-[14px] hover:shadow-lg flex flex-col gap-3">
                    <div className="h-[160px] px-2 flex items-center">
                        <Image
                            src={`/assets/images/${product.image}`}
                            alt={product.name}
                            width={200}
                            height={200}
                            title={`Xem chi tiết sản phẩm`}
                            className={`mix-blend-darken transition-transform duration-300 hover:scale-110`}
                        />
                    </div>
                    <p className={`h-14 hover:text-[#034292]`}>{product.name}</p>
                    <div className={`font-bold`}>
                        {product.price.toLocaleString("vi-VN")}đ
                        {product.priceSale !== 0 ? (
                            <span className="font-normal text-gray-400 line-through ml-[8px]">
                    {product.priceSale.toLocaleString("vi-VN")}đ
                    </span>
                        ) : (
                            <div className={`hidden`}></div>
                        )}

                    </div>
                    <div className="flex gap-2">
                        {Array.isArray(product.variants) && product.variants
                            .filter((variant: Variant) => variant.stock > 0)
                            .map((variant: Variant) => (
                                <div key={variant._id}
                                     className={`w-8 h-8 bg-gray-200 flex items-center justify-center`}>
                                    {variant.size}
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex gap-2">
                        {Array.isArray(product.variants) && product.variants
                            .filter((variant: Variant) => variant.stock > 0)
                            .map((variant: Variant) => (
                                <div key={variant._id} className={`p-2 rounded-full`} style={{backgroundColor: variant.hex}}>
                                    <div className={`w-[2px] h-[2px]`}>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <button onClick={() => dispatch(addItem(product))}>
                        thêm vào giỏ hàng
                    </button>
                    <button>
                        mua
                    </button>
                </div>
            ))}
        </div>
    );
}

