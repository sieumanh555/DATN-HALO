"use client";
import Link from "next/link";
import useSWR from "swr";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {ArrowLeft, ChevronLeft, Plus, ShoppingCart, Ticket} from "lucide-react";
import {getCookieCSide} from "@/app/libs/Cookie/clientSideCookie"

import Discount from "@/app/models/Discount";
import {CartState, CheckoutState} from "../../models/CartState";
import {ProductCart, ProductResponse} from "@/app/models/Product";
import {removeAll} from "@/redux/slices/cartSlice";

import ProBox from "../../components/cart/proBox";
// import SubProBox from "../../components/cart/subProBox";
import CartEmpty from "../../components/cart/cartEmpty";


export default function Cart() {
    const router = useRouter();
    const dispatch = useDispatch();
    const token = getCookieCSide("as_tn");
    const cart = useSelector((state: CartState) => state.cart.products || []);
    const checkout = useSelector((state: CheckoutState) => state.checkout.products || [])
    const [popup, setPopup] = useState(false);
    const [discounts, setDiscounts] = useState<Discount[]>([]);
    const [discount, setDiscount] = useState<Discount>({
        _id: "",
        name: "",
        description: "",
        condition: 0,
        minus: 0,
        percent: 0,
        stock: 0,
    });
    const [voucherPopup, setVoucherPopup] = useState(false);
    useEffect(() => {
        fetch("http://localhost:3000/discounts")
            .then((res) => res.json())
            .then((data) => setDiscounts(data))
            .catch((err) =>
                console.error("Lỗi fetching http://localhost:3000/discounts", err)
            );
    }, []);

    const subTotal = useMemo(() => {
        return checkout.reduce(
            (total: number, item: ProductCart) => total + item.pricePromo * item.quantityy,
            0
        );
    }, [checkout]);

    const total = useMemo(() => {
        if (!discount) return subTotal;
        const discountValue =
            discount.minus > 0 ? discount.minus : (subTotal * discount.percent) / 100;
        const finalTotal = subTotal - discountValue;
        return finalTotal > 0 ? finalTotal : 0;
    }, [subTotal, discount]);

    const handleClosePopup = () => {
        dispatch(removeAll());
        setPopup(false);
    }

    const handleCheckout = () => {
        if (!token) {
            router.push("/pages/login");
        } else {
            router.push("/pages/checkout");
        }
    }

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const {data, error} = useSWR<ProductResponse[]>("http://localhost:3000/products",
        fetcher,
        {refreshInterval: 3000}
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
                                <p className="w-[52%] ml-5">Sản phẩm</p>
                                <p className="w-[14%] text-center">Số lượng</p>
                                <p className="w-[14%] text-center">Giá</p>
                                <p className="w-[14%] text-center">Tổng</p>
                            </div>
                            {cart.map((product: ProductCart) => (
                                <div key={product._id}>
                                    <ProBox data={product}/>
                                </div>
                            ))}
                            {/* navigation pages/shop ? delete cart */}
                            <div className={`w-full mt-[18px] flex justify-between`}>
                                <Link href="#" className="flex items-center space-x-2">
                                    <ArrowLeft className={`w-5 h-5`}/>
                                    <p>Tiếp tục mua hàng</p>
                                </Link>
                                <button
                                    onClick={() => setPopup(true)}
                                    className={`group hover:text-[#D92D20] flex items-center gap-1`}
                                >
                                    <Plus
                                        className={`w-6 h-6 opacity-0 transition-transform duration-300 group-hover:opacity-100 group-hover:rotate-[135deg]`}
                                    />
                                    <p>Xóa tất cả</p>
                                </button>
                            </div>
                        </div>

                        {/*checkout.ts information*/}
                        <div className={`w-[38%] bg-[#fff] rounded-lg mt-[46px] px-10 py-8 space-y-4`}>
                            <div className="w-full border-b pb-4 flex justify-between">
                                <p className="w-[40%] text-xl font-semibold uppercase">Tổng cộng</p>
                                <p className="w-[40%] text-right">
                                    {total.toLocaleString("vi-VN")}đ
                                </p>
                            </div>

                            <div className="w-full border-b pb-4 flex flex-col">
                                <div className={`w-full flex justify-between items-center`}>
                                    <div className="flex items-center gap-2">
                                        <Ticket strokeWidth={1.5} size={26}/>
                                        <p className={`text-lg`}>Mã giảm giá</p>
                                    </div>

                                    {discount.condition <= subTotal && discount.stock <= 0 ? (
                                        <button onClick={() => setVoucherPopup(true)} title={`Chọn mã`}>
                                            <p className={`text-[#034292]`}>Áp dụng mã</p>
                                        </button>
                                    ) : (
                                        <div>
                                            <button
                                                onClick={() => setVoucherPopup(true)}
                                                className={`w-full flex justify-end`}
                                                title={`Chọn mã`}
                                            >
                                                <p className={`text-[#034292] flex justify-end`}>
                                                    {discount.name}
                                                </p>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div
                                    className={`${
                                        discount.condition > subTotal && discount.stock <= 0
                                            ? `hidden`
                                            : `block`
                                    } text-sm flex justify-end`}
                                >
                                    {discount.description}
                                </div>
                            </div>


                            {checkout.length > 0 && token!== null ? (
                                <button
                                    onClick={() => handleCheckout()}
                                    className="w-full h-10 mt-[18px] bg-blue-700 hover:bg-blue-600 text-[#fff] rounded">
                                    Thanh toán
                                </button>
                            ): (
                                <button
                                    disabled
                                    className="w-full h-10 mt-[18px] bg-gray-400  rounded">
                                    Thanh toán
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            ) : (
                <CartEmpty/>
            )}

            {/* recently viewed product */}
            <div className="mt-12">
                <p className="text-2xl font-medium">Sản phẩm vừa xem</p>
                {/*<div className="mt-[18px] flex flex-wrap justify-between">*/}
                {/*    {data.map((product: Product, index: number) => (*/}
                {/*        <Link key={index} href="#" className="w-[16%]">*/}
                {/*            <SubProBox data={product} />*/}
                {/*        </Link>*/}
                {/*    ))}*/}
                {/*</div>*/}
            </div>

            {/* new product */}
            <div className="mt-12">
                <p className="text-2xl font-medium">Sản phẩm mới</p>
                {/*<div className="mt-[18px] flex flex-wrap justify-between">*/}
                {/*    {data.map((product: Product, index: number) => (*/}
                {/*        <Link key={index} href="#" className="w-[16%]">*/}
                {/*            <SubProBox data={product} />*/}
                {/*        </Link>*/}
                {/*    ))}*/}
                {/*</div>*/}
            </div>

            {/* Voucher popup */}
            <div>
                <div
                    onClick={() => setVoucherPopup(false)}
                    className={`${
                        voucherPopup === false ? `hidden` : `fixed top-0 right-0 z-10`
                    } w-full h-full bg-[#00000066]`}
                ></div>
                <div
                    className={`${
                        voucherPopup === false ? `hidden` : `fixed top-0 right-0 z-10`
                    } w-[320px] h-full bg-[#fff] flex flex-col justify-between`}
                >
                    <div className={`w-full h-12 border-b-[2px] flex items-center`}>
                        <ChevronLeft
                            onClick={() => setVoucherPopup(false)}
                            strokeWidth={1.5}
                            className={`w-[10%] cursor-pointer`}
                        />
                        <div className={`w-[90%] font-medium flex justify-center`}>
                            Mã giảm giá
                        </div>
                    </div>
                    <div className={`w-full px-4 flex flex-col gap-2`}>
                        {discounts.map((discount: Discount) => (
                            <div
                                key={discount._id}
                                className={`${
                                    discount.stock <= 0 ? `hidden` : `block`
                                } w-full h-[100px] text-sm py-2 border-2 border-dashed flex justify-between items-center`}
                            >
                                <Ticket strokeWidth={0.5} className={`w-[120px] h-[80px]`}/>
                                <div className={`w-[160px] flex flex-col gap-y-1`}>
                                    <p className={`text-[#124062] uppercase`}>{discount.name}</p>
                                    <p className={`text-xs text-gray-600`}>
                                        {discount.description}
                                    </p>
                                    <button
                                        onClick={() => {
                                            setDiscount(discount);
                                            setPopup(false)
                                        }}
                                        className={`w-[100px] h-6 text-xs text-[#fff] bg-[#165b8d] rounded-xl`}
                                    >
                                        Áp dụng
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => setPopup(false)}
                        className={`w-[90%] h-10 mx-auto my-4 text-[#04aae7] hover:text-[#fff] border-[2px] rounded border-[#04aae7] hover:bg-[#04aae7] `}
                    >
                        Quay lại trang thanh toán
                    </button>
                </div>
            </div>

            {/*Cancel Popup */}
            <div className={`${popup === false ? `hidden` : `block`}`}>
                <div
                    onClick={() => setPopup(false)}
                    className={`bg-[#00000066] w-full h-full fixed top-0 right-0 z-10`}
                ></div>
                <div
                    className={`bg-gray-100 w-[480px] h-[240px] fixed top-[25%] right-[35%] z-20 p-8 rounded-xl flex flex-col justify-center items-center gap-4`}
                >
                    <div>
                        <ShoppingCart className={`w-12 h-12`}/>
                    </div>
                    <p>Bạn có muốn xóa <span className={`text-[#D92D20]`}>{cart.length}</span> sản phẩm trong giỏ hàng?
                    </p>
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
