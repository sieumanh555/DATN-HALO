"use client";
import Image from "next/image";
import {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {ChevronLeft, Package, Ticket, Truck} from "lucide-react";
import {getCookieCSide, getPayload, setCookie} from "@/app/libs/Cookie/clientSideCookie";

import Discount from "../../models/Discount";
import type User from "@/app/models/User";
import {CheckoutState} from "../../models/CartState";
import {OrderRequest} from "@/app/models/Order";

export default function CheckOut() {
    const checkout = useSelector((state: CheckoutState) => state.checkout.products || []);
    const [user, setUser] = useState<User | null>(null);
    const [name, setName] = useState(user?.name || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [zipcode, setZipcode] = useState(user?.zipcode || "");
    const [address, setAddress] = useState(user?.address || "");
    const [note, setNote] = useState("");
    const [shipping, setShipping] = useState<number>(40000);
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
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [order, setOrder] = useState<OrderRequest | null>(null);
    const [popup, setPopup] = useState(false);
    const [checkoutPopup, setCheckoutPopup] = useState(false);
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

    const getInformation = () => {
        const info = getPayload();
        setUser(info);
    }
    const subTotal = useMemo(() => {
        return checkout.reduce((total, item) => total + item.pricePromo * item.quantityy, 0);
    }, [checkout]);
    const total = useMemo(() => {
        if (!discount) return subTotal + shipping;
        const discountValue =
            discount.minus > 0 ? discount.minus : (subTotal * discount.percent) / 100;
        const finalTotal = subTotal + shipping - discountValue;
        return finalTotal > 0 ? finalTotal : 0;
    }, [subTotal, shipping, discount]);
    const percent = Math.abs(Math.ceil(((total - subTotal + shipping) * 100) / (total + shipping)));
    const updateUserInfo = async () => {
        try {
            const data = {name, phone, zipcode, address};
            if (user) {
                const token = getCookieCSide("as_tn");
                const response = await fetch(`http://localhost:3000/users/${user._id}`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(data),
                });
                const responseData = await response.json();
                if (response) {
                    setCookie(`as_tn`, responseData.access_token, 3);
                    setCookie(`rh_tn`, responseData.refresh_token, 7);
                    setUser(getPayload());
                } else {
                    alert(responseData.message);
                }
            }
        } catch (error) {
            console.log("Lỗi đăng nhập:" + error);
            alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        }
    };
    const createOrder = async () => {
        switch (paymentMethod) {
            case "cod": {
                const paymentResponse = await fetch("http://localhost:3000/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(order)
                });

                const data = await paymentResponse.json();
                if (paymentResponse.ok) {
                    // gửi email thông báo mua hàng thành công
                    const timer = setTimeout(() => {
                        setCheckoutSuccess(!checkoutSuccess)
                    });
                    return () => clearTimeout(timer);
                } else {
                    console.log("Lỗi thanh toán:", data)
                }
                break;
            }
            case "zalopay": {

                break;
            }
            case "creditCard": {

                break;
            }
            default: {
                break;
            }
        }
    }

    useEffect(() => {
        getInformation();
    }, []);
    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setPhone(user.phone || "");
            setZipcode(user.zipcode || "");
            setAddress(user.address || "");
        }
    }, [user]);
    useEffect(() => {
        fetch("http://localhost:3000/discounts")
            .then((res) => res.json())
            .then((data) => setDiscounts(data))
            .catch((err) =>
                console.error("Lỗi fetching http://localhost:3000/discounts", err)
            );
    }, []);
    const createOrderDetail = async () => {
        if (user && user._id) {
            const {_id: userId} = user;
            const createOrderDetail = async () => {
                try {
                    const response = await fetch("http://localhost:3000/orderDetails", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            items: checkout.map((item) => ({
                                productId: item._id,
                                selectedSize: item.selectedSize,
                                selectedColor: item.selectedColor,
                                quantity: item.quantityy,
                                price: item.price
                            }))
                        })
                    })
                    if (response.ok) {
                        const data = await response.json();
                        const orderDetailId = data.data._id;
                        console.log("orderDetailId: ",orderDetailId);

                        setOrder({
                            userId,
                            orderDetailId: orderDetailId,
                            amount: total,
                            description: note,
                            discountId: discount?._id,
                            address: address,
                            paymentMethod: paymentMethod,
                            paymentStatus: "Uncompleted",
                            shipping: shipping,
                            status: "Processing"
                        })
                    }
                } catch (err) {
                    console.log(">>>Lỗi tạo chi tiết đơn hàng: ", err);
                }
            }
            createOrderDetail();
        }
    }
    const handleCreateOrder = async () => {
        await createOrderDetail();
        createOrder();
    }
    console.log(order)
    return (
        <section className="container grid grid-cols-1 md:grid-cols-2 gap-8 px-[100px] py-10 tracking-wide">
            {/* customer info */}
            {user && (
                <div className="grid-cols-1">
                    <p className="text-3xl font-semibold">Thông tin giao hàng</p>
                    <div className={`bg-[#fff] rounded-lg mt-6 px-8 py-6 flex flex-wrap gap-x-[14px] gap-y-4`}>
                        {/*name*/}
                        <div className="w-[280px] flex flex-col">
                            <label htmlFor="name" className="font-semibold">
                                Họ và tên
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="h-10 text-[14px] mt-2 px-3 py-[10px] border-[2px] rounded focus:outline-none"
                            />
                        </div>

                        {/*phone*/}
                        <div className="w-[280px] flex flex-col">
                            <label htmlFor="phone" className="font-semibold">
                                Số điện thoại
                            </label>
                            <input
                                id="phone"
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="h-10 text-[14px] mt-2 px-3 py-[10px] border-[2px] rounded focus:outline-none"
                            />

                        </div>

                        {/*email*/}
                        <div className="w-[280px] flex flex-col">
                            <label htmlFor="email" className="font-semibold">
                                Email
                            </label>
                            <input
                                id="email"
                                type="text"
                                value={user?.email}
                                readOnly
                                disabled
                                className="h-10 text-[14px] mt-2 px-3 py-[10px] border-[2px] rounded  hover:cursor-not-allowed"
                            />
                        </div>

                        {/*zipcode*/}
                        <div className="w-[80px] flex flex-col">
                            <label htmlFor="zipcode" className="font-semibold">
                                ZIP
                            </label>
                            {/*<select id="zipcode">*/}
                            {/*    {zipcode.map((item) => item.code.map((code) => (*/}
                            {/*        <option key={code.code} value={code.code} className={`p-2`}>{`${code.code} - ${code.name}`}</option>*/}
                            {/*    )))*/}
                            {/*    }*/}
                            {/*</select>*/}
                            <input
                                id="zipcode"
                                type="text"
                                value={zipcode}
                                onChange={(e) => setZipcode(e.target.value)}
                                className="h-10 text-[14px] mt-2 px-3 py-[10px] border-[2px] rounded focus:outline-none"
                            />
                        </div>

                        {/*address*/}
                        <div className="w-full flex flex-col">
                            <label htmlFor="address" className="font-semibold">
                                Địa chỉ
                            </label>
                            <input
                                id="address"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="h-10 text-[14px] mt-2 px-3 py-[10px] border-[2px] rounded focus:outline-none"
                            />
                        </div>

                        <div className="w-full flex flex-col">
                            <label htmlFor="note" className="font-semibold">
                                Ghi chú
                            </label>
                            <textarea
                                id="note"
                                name="note"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full h-[100px] text-[14px] mt-2 px-3 py-[10px] border-[2px] rounded focus:outline-none"
                            ></textarea>
                        </div>

                        {/* Submit button */}
                        <button
                            onClick={() => updateUserInfo()}
                            className="w-[10%] h-8 bg-blue-700 hover:bg-blue-600 text-white rounded mt-2 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            )}

            {/* payment method */}
            <div className="grid-cols-1">
                <p className="text-3xl font-bold">Phương thức thanh toán</p>
                {/*payment*/}
                <div className="bg-[#fff] mt-[24px] rounded-lg px-[30px] py-[20px] flex justify-evenly">

                    <div className="w-[240px] flex justify-center items-center">
                        <input
                            id="cod"
                            name="paymentMethod"
                            defaultChecked
                            type="radio"
                            value="cod"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-[14px] h-[14px] cursor-pointer"
                        />
                        <label htmlFor="cod" className="ml-[8px] cursor-pointer">
                            COD
                        </label>
                    </div>

                    <div className="w-[240px] flex justify-center items-center">
                        <input
                            id="zalopay"
                            name="paymentMethod"
                            type="radio"
                            value="zalopay"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-[14px] h-[14px] cursor-pointer"
                        />
                        <label htmlFor="pos" className="ml-[8px] cursor-pointer">
                            ZaloPay
                        </label>
                    </div>

                    <div className="w-[240px] flex justify-center items-center">
                        <input
                            id="creditCard"
                            name="paymentMethod"
                            type="radio"
                            value="creditCard"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-[14px] h-[14px] cursor-pointer"
                        />
                        <label htmlFor="creditCard" className="ml-[8px] cursor-pointer">
                            Thẻ ngân hàng
                        </label>
                    </div>

                </div>

                {/*order info*/}
                <div className="bg-[#fff] mt-4 rounded-lg px-8 py-6 space-y-4">
                    <p className="text-xl font-semibold uppercase">đơn hàng</p>
                    <div className="w-full mt-[18px] flex justify-between items-center">
                        <div className="h-19 flex items-center gap-2">
                            <Package strokeWidth={1} className={`w-9 h-9`}/>
                            <button
                                onClick={() => setCheckoutPopup(!checkoutPopup)}
                                className={`hover:text-blue-600`}>{checkout.length} sản phẩm
                            </button>
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

                    <div className="w-full mt-[18px] flex flex-col">
                        <div className={`w-full flex justify-between items-center`}>
                            <div className="flex items-center gap-2">
                                <Ticket strokeWidth={1} className={`w-9 h-9`}/>
                                <p>Mã giảm giá</p>
                            </div>

                            {discount.condition <= subTotal && discount.stock <= 0 ? (
                                <button onClick={() => setPopup(true)} title={`Chọn mã`}>
                                    <p className={`text-[#034292]`}>Chưa áp dụng</p>
                                </button>
                            ) : (
                                <div>
                                    <button
                                        onClick={() => setPopup(true)}
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

                    <div className="w-full pt-4 border-t-2 border-gray-300 flex justify-between items-center">
                        <div>
                            <p className={`text-xl text-[#D92D20]`}>Tổng :</p>
                        </div>
                        {discount.condition > 0 && subTotal >= discount.condition ? (
                            <div className="flex gap-4">
                                <p className="text-[#D92D20]">
                                    {total.toLocaleString("vi-VN")}đ (-{percent}%)
                                </p>
                                <p className="line-through">
                                    {(subTotal + shipping).toLocaleString("vi-VN")}đ
                                </p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-[#D92D20]">
                                    {total.toLocaleString("vi-VN")}đ
                                </p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => handleCreateOrder()}
                        className="w-full h-10 bg-blue-700 hover:bg-blue-600 text-[#fff] rounded">
                        Thanh toán
                    </button>
                </div>
            </div>

            {/* Voucher popup */}
            <div>
                <div
                    onClick={() => setPopup(false)}
                    className={`${
                        popup === false ? `hidden` : `fixed top-0 right-0 z-10`
                    } w-full h-full bg-[#00000066]`}
                ></div>
                <div
                    className={`${
                        popup === false ? `hidden` : `fixed top-0 right-0 z-10`
                    } w-[320px] h-full bg-[#fff] flex flex-col justify-between`}
                >
                    <div className={`w-full h-12 border-b-[2px] flex items-center`}>
                        <ChevronLeft
                            onClick={() => setPopup(false)}
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

            {/*Checkout popup*/}
            {checkoutPopup && (
                <div onClick={() => setCheckoutPopup(!checkoutPopup)}
                     className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 print:static print:bg-white backdrop-blur-sm">
                    <div
                        onClick={e => e.stopPropagation()}
                        className="relative w-full max-w-5xl bg-white rounded-lg p-4 shadow-xl overflow-y-auto max-h-[90vh] border print:shadow-none print:max-h-full animate-fadeIn"
                    >
                        {/* Header */}
                        <div className="px-6 mb-4">
                            <h1 className="text-2xl text-center uppercase font-bold text-gray-800 tracking-wide">
                                Chi tiết đơn hàng
                            </h1>
                        </div>

                        {/* Bảng sản phẩm */}
                        <div className="overflow-x-auto border border-gray-200">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-center">
                                <tr>
                                    <th className="p-4 font-semibold text-gray-600">Hình ảnh</th>
                                    <th className="p-4 font-semibold text-gray-600">Màu chọn</th>
                                    <th className="p-4 font-semibold text-gray-600">Size chọn</th>
                                    <th className="p-4 font-semibold text-gray-600">Số lượng</th>
                                    <th className="p-4 font-semibold text-gray-600">Giá tiền</th>
                                    <th className="p-4 font-semibold text-gray-600">Tổng</th>
                                </tr>
                                </thead>
                                <tbody>
                                {checkout.map((item) => (
                                    <tr key={item._id}
                                        className="border-t border-gray-200 hover:bg-gray-50/50 text-center transition-colors">
                                        <td className="p-4">
                                            <div className="flex justify-center">
                                                <Image
                                                    src="/assets/images/MLB-Chunky-Runner-NY-Black-White(1).png"
                                                    alt="MLB Chunky Runner NY Black White"
                                                    width={80}
                                                    height={80}
                                                    className="rounded-lg object-cover shadow-sm"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium">{item.selectedColor}</td>
                                        <td className="p-4 font-medium">{item.selectedSize}</td>
                                        <td className="p-4 font-medium">{item.quantityy}</td>
                                        <td className="p-4 font-medium">{item.pricePromo.toLocaleString("vi-VN")} VND</td>
                                        <td className="p-4 font-medium">{(item.pricePromo * item.quantityy).toLocaleString("vi-VN")} VND</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex items-center justify-start gap-4 print:hidden">
                            <button
                                onClick={() => setCheckoutPopup(!checkoutPopup)}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 flex items-center gap-2"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
