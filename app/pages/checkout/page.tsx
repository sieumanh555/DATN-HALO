"use client";
import Image from "next/image";
import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ChevronLeft, Package, Ticket, Truck} from 'lucide-react';

import CartState from "../../models/CartState";
import Product from "../../models/Product";
import Discount from "../../models/Discount";


const userInfo = {
    "userName": "Võ Tấn Đạt",
    "phoneNumber": "0797373333",
    "email": "vtdat0720@gmail.com",
    "zip": 90250,
    "address": "58 Cầu Giấy, Phường Quan Hoa, Quận Cầu Giấy, Thành phố Hà Nội",
    "commune": "Quan Hoa",
    "district": "Cầu Giấy",
    "province": "Hà Nội",
}
export default function CheckOut() {
    const dispatch = useDispatch();
    const cart = useSelector((state: CartState) => state.cart.products || []);
    const [shipping, setShipping] = useState(40000);
    const [user, setUser] = useState(userInfo);
    const [popup, setPopup] = useState(false);
    const [discounts, setDiscounts] = useState<Discount[]>([])
    const [discount, setDiscount] = useState<Discount>({
        _id: "",
        name: "",
        minus: 0,
        percent: 0,
        condition: 0,
        description: "",
        stock: 0,
    });
    const calSubTotal = () => {
        return cart.reduce((total: number, item: Product) => total + item.price * item.quantity, 0)
    };
    const calTotal = () => {
        let total = 0;
        let discountValue = 0;
        if (subTotal >= discount.condition) {
            if (discount.minus > 0) {
                discountValue = discount.minus
            } else {
                discountValue = (subTotal * discount.percent) / 100
            }
        }
        total = subTotal + shipping - discountValue;
        if (total <= 0) {
            return total = 0;
        }
        return total;
    };

    const subTotal = useMemo(() => calSubTotal(), [cart]);
    const total = useMemo(() => calTotal(), [cart, shipping, discount]);
    const percent = Math.abs(Math.ceil((total - subTotal + shipping) * 100 / (total + shipping)));

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const response = await fetch("http://localhost:3000/discounts");
                const data = await response.json();
                setDiscounts(data);
            } catch (err) {
                console.error("Lỗi fetching http://localhost:3000/discounts", err);
            }
        };
        fetchDiscounts();
    }, []);
    return (
        <section className="container grid grid-cols-1 md:grid-cols-2 gap-8 px-[100px] py-10 tracking-wide">
            {/* customer info */}
            <div className="grid-cols-1">
                <p className="text-3xl font-semibold">Thông tin giao hàng</p>

                <form
                    action=""
                    className="bg-[#fff] rounded-lg mt-6 px-8 py-6 flex flex-wrap gap-x-[14px] gap-y-4"
                >
                    <div className="w-[280px] flex flex-col">
                        <label htmlFor="name" className="font-semibold">
                            Họ và tên
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Oách Xà Lách"
                            value={user.userName}
                            readOnly
                            className="h-10 text-[14px] mt-2 px-3 py-[10px] border-[2px] rounded focus:outline-none"
                        />
                    </div>

                    <div className="w-[280px] flex flex-col">
                        <label htmlFor="phone" className="font-semibold">
                            Số điện thoại
                        </label>
                        <input
                            type="text"
                            id="phone"
                            placeholder="079xxxxxxx"
                            value={user.phoneNumber}
                            readOnly
                            className="h-10 text-[14px] mt-2 px-3 py-[10px] border-[2px] rounded focus:outline-none"
                        />
                    </div>

                    <div className="w-[280px] flex flex-col">
                        <label htmlFor="email" className="font-semibold">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            placeholder="OachXaLach123@gmail.com"
                            value={user.email}
                            readOnly
                            className="h-10 text-[14px] mt-2 px-3 py-[10px] border-[2px] rounded focus:outline-none"
                        />
                    </div>

                    <div className="w-[80px] flex flex-col">
                        <label htmlFor="zipcode" className="font-semibold">
                            ZIP
                        </label>
                        <input
                            type="text"
                            id="zipcode"
                            placeholder="90250"
                            value={user.zip}
                            readOnly
                            className="h-10 text-[14px] mt-2 px-3 py-[10px] border-[2px] rounded focus:outline-none"
                        />
                    </div>

                    <div className="w-full flex flex-col">
                        <label htmlFor="address" className="font-semibold">
                            Địa chỉ
                        </label>
                        <input
                            type="text"
                            id="address"
                            placeholder="58 Cầu Giấy, Phường Quan Hoa, Quận Cầu Giấy, Thành phố Hà Nội"
                            value={user.address}
                            readOnly
                            className="h-10 text-[14px] mt-2 px-3 py-[10px] border-[2px] rounded focus:outline-none"
                        />
                    </div>

                    <div className="w-[183px] flex flex-col">
                        <label htmlFor="province" className="font-semibold">
                            Tỉnh/Thành phố
                        </label>
                        <input
                            type="text"
                            id="province"
                            placeholder="Hà Nội"
                            value={user.province}
                            readOnly
                            className="h-10 text-[14px] mt-2 px-3 py-[10px] border-[2px] rounded focus:outline-none"
                        />
                    </div>

                    <div className="w-[183px] flex flex-col">
                        <label htmlFor="district" className="font-semibold">
                            Quận/Huyện
                        </label>
                        <input
                            type="text"
                            id="district"
                            placeholder="Cầu Giấy"
                            value={user.district}
                            readOnly
                            className="h-10 text-[14px] mt-2 px-3 py-[10px] border-[2px] rounded focus:outline-none"
                        />
                    </div>

                    <div className="w-[183px] flex flex-col">
                        <label htmlFor="commune" className="font-semibold">
                            Phường/Xã
                        </label>
                        <input
                            type="text"
                            id="commune"
                            placeholder="Quan Hoa"
                            value={user.commune}
                            readOnly
                            className="h-10 text-[14px] mt-2 px-3 py-[10px] border-[2px] rounded focus:outline-none"
                        />
                    </div>

                    <div className="w-full flex flex-col">
                        <label htmlFor="note" className="font-semibold">
                            Ghi chú
                        </label>
                        <textarea
                            id="note"
                            placeholder="dunno :v"
                            className="w-full h-[100px] text-[14px] mt-2 px-3 py-[10px] border-[2px] rounded focus:outline-none"
                        ></textarea>
                    </div>
                </form>
            </div>
            {/* payment method */}
            <div className="grid-cols-1">
                <p className="text-3xl font-bold">Phương thức thanh toán</p>
                {/*payment*/}
                <div className="bg-[#fff] mt-[24px] rounded-lg px-[30px] py-[20px] flex justify-evenly">
                    <div className="w-[240px] flex justify-center items-center">
                        <input
                            type="radio"
                            name="paymentMethod"
                            id="cod"
                            defaultChecked
                            className="w-[14px] h-[14px] cursor-pointer"
                        />
                        <label htmlFor="cod" className="ml-[8px] cursor-pointer">
                            COD
                        </label>
                    </div>

                    <div className="w-[240px] flex justify-center items-center">
                        <input
                            type="radio"
                            name="paymentMethod"
                            id="pos"
                            className="w-[14px] h-[14px] cursor-pointer"
                        />
                        <label htmlFor="pos" className="ml-[8px] cursor-pointer">
                            ZaloPay
                        </label>
                    </div>

                    <div className="w-[240px] flex justify-center items-center">
                        <input
                            type="radio"
                            name="paymentMethod"
                            id="creditCard"
                            className="w-[14px] h-[14px] cursor-pointer"
                        />
                        <label htmlFor="creditCard" className="ml-[8px] cursor-pointer">
                            Thẻ tín dụng
                        </label>
                    </div>
                </div>
                {/*credit payment*/}
                <div className="bg-[#fff] mt-4 rounded-lg px-8 py-6">
                    <p className="text-xl font-semibold uppercase">Thông tin thẻ ngân hàng</p>

                    <div className="w-full flex flex-wrap items-center gap-x-[18px] gap-y-[18px] mt-[18px]">
                        <div className="w-[300px] flex flex-col">
                            <label htmlFor="bankNumber" className="font-semibold">
                                Số thẻ*
                            </label>
                            <input
                                type="text"
                                id="bankNumber"
                                placeholder="1234 1234 1234 1234"
                                className="h-[40px] text-[14px] mt-[8px] px-[12px] py-[10px] border-[2px] rounded focus:outline-none"
                            />
                        </div>

                        <div className=" mt-7 flex gap-2">
                            <div className={`w-[60px] h-9 flex justify-center items-center`}>
                                <Image
                                    src="/assets/images/payment-mastercard-icon.png"
                                    alt=""
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <div className={`w-[60px] h-9 flex justify-center items-center`}>
                                <Image
                                    src="/assets/images/payment-paypal-icon.png"
                                    alt=""
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <div className={`w-[60px] h-9 flex justify-center items-center`}>
                                <Image
                                    src="/assets/images/payment-visa-icon.png"
                                    alt=""
                                    width={32}
                                    height={32}
                                />
                            </div>
                        </div>

                        <div className="w-[200px] flex flex-col">
                            <label htmlFor="dateExpire" className="font-semibold">
                                Ngày hết hạn*
                            </label>
                            <input
                                type="text"
                                id="dateExpire"
                                placeholder="MM / YY"
                                className="h-[40px] text-[14px] mt-[8px] px-[12px] py-[10px] border-[2px] rounded focus:outline-none"
                            />
                        </div>

                        <div className="w-[200px] flex flex-col">
                            <label htmlFor="cvc" className="font-semibold">
                                CVC*
                            </label>
                            <input
                                type="text"
                                id="cvc"
                                placeholder="012"
                                className="h-[40px] text-[14px] mt-[8px] px-[12px] py-[10px] border-[2px] rounded focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
                {/*order info*/}
                <div className="bg-[#fff] mt-4 rounded-lg px-8 py-6 space-y-4">
                    <p className="text-xl font-semibold uppercase">đơn hàng</p>

                    <div className="w-full mt-[18px] flex justify-between items-center">
                        <div className="h-19 flex items-center gap-2">
                            <Package strokeWidth={1} className={`w-9 h-9`}/>
                            <p>{cart.length} sản phẩm</p>
                        </div>
                        <p>{subTotal.toLocaleString("vi-VN")}đ</p>
                    </div>

                    <div className={`w-full mt-[18px]`}>
                        <div className="w-full mt-[18px] flex justify-between items-center">
                            <div className="h-10 flex items-center gap-2">
                                <Truck strokeWidth={1} className={`w-9 h-9`}/>
                                <p>Chi phí vận chuyển</p>
                            </div>
                            <p>{shipping.toLocaleString("vi-VN")}đ</p>
                        </div>
                        <div className=" my-4 ml-12 flex items-center">
                            <input
                                type="radio"
                                id="giaohangtietkiem"
                                name="shipping"
                                value={40000}
                                defaultChecked={true}
                                onClick={() => setShipping(40000)}
                                className="cursor-pointer"
                            />
                            <label
                                htmlFor="giaohangtietkiem"
                                className="ml-[6px] cursor-pointer"
                            >
                                Giao hàng tiết kiệm
                            </label>
                        </div>
                        <div className=" my-4 ml-12 flex items-center">
                            <input
                                type="radio"
                                name="shipping"
                                id="giaohangnhanh"
                                value={120000}
                                onClick={() => setShipping(120000)}
                                className="cursor-pointer"
                            />
                            <label
                                htmlFor="giaohangnhanh"
                                className="ml-[6px] cursor-pointer"
                            >
                                Giao hàng nhanh
                            </label>
                        </div>
                    </div>

                    <div className="w-full mt-[18px] flex justify-between items-center">
                        <div className="h-10 flex items-center gap-2">
                            <Ticket strokeWidth={1} className={`w-9 h-9`}/>
                            <p>Mã giảm giá</p>
                        </div>
                        {discount.condition <= 0 && discount.stock <= 0 ? (
                            <button
                                onClick={() => setPopup(true)}
                                title={`Chọn mã`}>
                                <p className={`text-[#034292]`}>Chưa áp dụng</p>
                            </button>
                        ) : (
                            <div>
                                <button
                                    onClick={() => setPopup(true)}
                                    className={`w-full flex justify-end`}
                                    title={`Chọn mã`}>
                                    <p className={`text-[#034292]`}>{discount.name}</p>
                                </button>
                                <p className={`text-sm`}>{discount.description}</p>
                            </div>
                        )}

                    </div>


                    <div className="w-full pt-4 border-t-2 border-gray-300 flex justify-between items-center">
                        <div>
                            <p className={`text-xl text-[#D92D20]`}>Tổng :</p>
                        </div>
                        {discount.condition > 0 && subTotal >= discount.condition ? (
                            <div className="flex gap-4">
                                <p className="text-[#D92D20]">{total.toLocaleString("vi-VN")}đ (-{percent}%)</p>
                                <p className="line-through">{subTotal.toLocaleString("vi-VN")}đ</p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-[#D92D20]">{total.toLocaleString("vi-VN")}đ
                                </p>
                            </div>
                        )}
                    </div>


                    <button className="w-full h-10 bg-blue-700 hover:bg-blue-600 text-[#fff] rounded">
                        Thanh toán
                    </button>
                </div>
            </div>


            {/* Popup */
            }
            <div>
                <div
                    onClick={() => setPopup(false)}
                    className={`${popup === false ? `hidden` : `fixed top-0 right-0 z-10`} w-full h-full bg-[#00000066]`}>
                </div>
                <div
                    className={`${popup === false ? `hidden` : `fixed top-0 right-0 z-10`} w-[320px] h-full bg-[#fff] flex flex-col justify-between`}>
                    <div className={`w-full h-12 border-b-[2px] flex items-center`}>
                        <ChevronLeft onClick={() => setPopup(false)} strokeWidth={1.5}
                                     className={`w-[10%] cursor-pointer`}/>
                        <div className={`w-[90%] font-medium flex justify-center`}>Mã giảm giá</div>
                    </div>
                    <div className={`w-full px-4 flex flex-col gap-2`}>
                        {discounts.map((discount: Discount) => (
                            <div
                                key={discount._id}
                                className={`${discount.stock <= 0 ? `hidden` : `block`} w-full h-[100px] text-sm py-2 border-2 border-dashed flex justify-between items-center`}>
                                <Ticket strokeWidth={0.5} className={`w-[100px] h-[100px]`}/>
                                <div className={`w-[160px] flex flex-col gap-y-1`}>
                                    <p className={`text-[#124062] uppercase`}>{discount.name}</p>
                                    <p className={`text-xs text-gray-600`}>{discount.description}</p>
                                    <button
                                        onClick={() => setDiscount(discount)}
                                        className={`w-[100px] h-6 text-xs text-[#fff] bg-[#165b8d] rounded-xl`}>
                                        Áp dụng
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => setPopup(false)}
                        className={`w-[90%] h-10 mx-auto my-4 text-[#04aae7] hover:text-[#fff] border-[2px] rounded border-[#04aae7] hover:bg-[#04aae7] `}>
                        Quay lại trang thanh toán
                    </button>
                </div>
            </div>
        </section>
    )
        ;
}
