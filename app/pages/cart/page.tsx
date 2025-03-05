"use client";
import Link from "next/link";
import useSWR from "swr";
import {useDispatch, useSelector} from "react-redux";
import {useMemo, useState} from "react";
import {ArrowLeft, Plus, ShoppingCart} from 'lucide-react';

import Product from "../../models/Product";
import CartState from "../../models/CartState";
import {removeAll} from "@/redux/slices/cartSlice";
import ProBox from "../../components/cart/proBox";
import CartEmpty from "../../components/cart/cartEmpty";
import SubProBox from "../../components/cart/subProBox";

export default function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector((state: CartState) => state.cart.products || []);
    const [popup, setPopup] = useState(false);

    const calSubTotal = () => {
        return cart.reduce(
            (total: number, item: Product) => total + item.price * item.quantity,
            0
        );
    }
    const subTotal = useMemo(() => calSubTotal(), [cart]);

    function handleClosePopup() {
        dispatch(removeAll());
        setPopup(false);
    }

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const {data, error} = useSWR<Product[]>(
        "http://localhost:3000/products",
        fetcher,
        {
            refreshInterval: 3000,
        }
    );
    if (!data) return <div>Loading...</div>;
    if (error) return <div>Lỗi fetching data: {error.message}</div>;
    return (
        <section className="px-[100px] py-6 bg-[#F2F4F7] tracking-wide">
            {cart.length > 0 ? (
                <div>
                    <div className="w-full mt-6 flex justify-between">
                        {/*cart*/}
                        <div className="w-[60%]">
                            <div className="w-full px-5 text-xl flex justify-between">
                                <p className="w-[52%]">Sản phẩm</p>
                                <p className="w-[14%] text-center">Số lượng</p>
                                <p className="w-[14%] text-center">Giá</p>
                                <p className="w-[14%] text-center">Tổng</p>
                            </div>
                            {cart.map((product: Product) => (
                                <ProBox key={product._id} data={product}/>
                            ))}
                            {/* navigation pages/shop ? delete cart */}
                            <div className={`w-full mt-[18px] flex justify-between`}>
                                <Link
                                    href="#"
                                    className="flex items-center space-x-2"
                                >
                                    <ArrowLeft className={`w-5 h-5`}/>
                                    <p>Tiếp tục mua hàng</p>
                                </Link>
                                <button
                                    onClick={() => setPopup(true)}
                                    className={`group hover:text-[#D92D20] flex items-center gap-1`}
                                >
                                    <Plus
                                        className={`w-6 h-6 opacity-0 transition-transform duration-300 group-hover:opacity-100 group-hover:rotate-[135deg]`}/>
                                    <p>Xóa tất cả</p>
                                </button>
                            </div>
                        </div>

                        {/*checkout information*/}
                        <div className={`w-[38%] h-[380px] bg-[#fff] rounded-lg mt-[46px] px-10 py-8 space-y-4`}>
                            <p className="text-3xl font-semibold uppercase">đơn hàng</p>
                            <div className="w-full flex justify-between">
                                <p className="w-[40%] text-xl font-medium">Tổng đơn hàng</p>
                                <p className="w-[40%] text-right">
                                    {subTotal.toLocaleString("vi-VN")}đ
                                </p>
                            </div>

                            <div className="w-full border-t-2 border-gray-300 pt-4 flex justify-between">
                                <p className="w-[40%] text-xl font-medium">Tổng tiền</p>

                                <div className="w-[40%] text-right">
                                    <p>{subTotal.toLocaleString("vi-VN")}đ</p>
                                </div>
                            </div>

                            <Link href="/pages/checkout">
                                <button
                                    className="w-full h-10 mt-[18px] bg-blue-700 hover:bg-blue-600 text-[#fff] rounded">
                                    Thanh toán
                                </button>
                            </Link>
                        </div>
                    </div>


                </div>
            ) : (
                <CartEmpty/>
            )}

            {/* recently viewed product */}
            <div className="mt-12">
                <p className="text-2xl font-medium">Sản phẩm vừa xem</p>
                <div className="mt-[18px] flex flex-wrap justify-between">
                    {data.map((product: Product, index: number) => (
                        <Link key={index} href="#" className="w-[16%]">
                            <SubProBox data={product}/>
                        </Link>
                    ))}
                </div>
            </div>

            {/* new product */}
            <div className="mt-12">
                <p className="text-2xl font-medium">Sản phẩm mới</p>
                <div className="mt-[18px] flex flex-wrap justify-between">
                    {data.map((product: Product, index: number) => (
                        <Link key={index} href="#" className="w-[16%]">
                            <SubProBox data={product}/>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Popup */}
            <div className={`${popup === false ? `hidden` : `block`}`}>
                <div
                    onClick={() => setPopup(false)}
                    className={`bg-[#00000066] w-full h-full fixed top-0 right-0 z-10`}
                ></div>
                <div
                    className={`bg-gray-100 w-[480px] h-[240px] fixed top-[25%] right-[35%] z-20 p-8 rounded-xl flex flex-col justify-center items-center gap-4`}>
                    <div>
                        {/*<Image*/}
                        {/*    src={`/assets/images/logo.jpg`}*/}
                        {/*    alt={`HaloStore`}*/}
                        {/*    width={80}*/}
                        {/*    height={40}*/}
                        {/*    className={`mix-blend-darken`}*/}
                        {/*/>*/}
                        <ShoppingCart className={`w-12 h-12`}/>
                    </div>
                    <p>Bạn có muốn xóa {cart.length} sản phẩm trong giỏ hàng?</p>
                    <div className={`text-sm font-semibold mt-4 flex gap-6`}>
                        <button
                            onClick={() => setPopup(false)}
                            className={`w-[60px] h-10 shadow rounded`}
                        >
                            Đóng
                        </button>
                        <button
                            onClick={() => handleClosePopup()}
                            className={`w-[60px] h-10 bg-[#D92D20] text-white shadow rounded`}
                        >
                            Xóa
                        </button>

                    </div>
                </div>
            </div>

        </section>
    );
}
