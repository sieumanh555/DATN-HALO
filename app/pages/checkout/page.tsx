"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Check, ChevronLeft, Package, Ticket, Truck } from "lucide-react";
import {
  getCookieCSide,
  getUserInfo,
  setCookie,
} from "@/app/libs/Cookie/clientSideCookie";
import { codPayment, zaloPayment } from "@/app/payment/payment-method";
import { percent, subTotal, total } from "@/app/libs/cart/calcCart";
import { sendOrderConfirmation } from "@/app/libs/send-email";

import type User from "@/app/models/User";
import type { CheckoutState, VoucherState } from "../../models/CartState";
import type Voucher from "../../models/Voucher";
import { addVoucher } from "@/redux/slices/voucherSlice";

// import {OrderRequest} from "@/app/models/Order";
// import {changeStock} from "@/app/payment/product";

export default function CheckOut() {
  // const router = useRouter()
  const dispatch = useDispatch();
  const checkout = useSelector(
    (state: CheckoutState) => state.checkout.products || []
  );
  const voucher = useSelector(
    (state: VoucherState) => state.voucher.voucher || {}
  );

  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  // const [zipcode, setZipcode] = useState(user?.zipcode || "");
  const [address, setAddress] = useState(user?.address || "");
  const [note, setNote] = useState("");
  const [shipping, setShipping] = useState<number>(40000);
  const [vouchers, setVouchers] = useState<Voucher[] | []>([]);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  // const [order, setOrder] = useState<OrderRequest | null>(null);
  const [voucherPopup, setVoucherPopup] = useState(false);
  const [checkoutPopup, setCheckoutPopup] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  // const [ErrOrderInfo, setErrOrderInfo] = useState(false);

  const getInformation = async () => {
    try {
      const userInfo = await getUserInfo();
      if (userInfo) {
        setUser(userInfo);
      } else {
        console.log("Lỗi lấy thông tin user");
      }
    } catch (error) {
      console.log("Lỗi lấy thông tin user:" + error);
    }
  };

  const calcSubTotal = useMemo(() => subTotal(checkout), [checkout]);
  const calcTotal = useMemo(
    () => total(calcSubTotal, voucher),
    [calcSubTotal, voucher]
  );
  const calcVoucherPercent = useMemo(
    () => percent(calcSubTotal, calcTotal),
    [calcSubTotal, calcTotal]
  );

  const updateUserInfo = async () => {
    try {
      const data = { name, phone, address };
      if (user) {
        const token = getCookieCSide("as_tn");
        const response = await fetch(
          `https://datn-api-production.up.railway.app/user/${user._id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const responseData = await response.json();
        if (response) {
          setCookie(`as_tn`, responseData.access_token, 3);
          setCookie(`rh_tn`, responseData.refresh_token, 7);
          //   setUser(getPayload());
        } else {
          alert(responseData.message);
        }
      }
    } catch (error) {
      console.log("Lỗi đăng nhập:" + error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  const handleCreateOrder = async (currPaymentMethod: string) => {
    let voucherValue = 0;
    let shippingMethod = "Giao hàng tiết kiệm";
    if (voucher) {
      switch (voucher.type) {
        case "percent": {
          voucherValue = (Number(voucher.value) * calcSubTotal) / 100;
          break;
        }
        case "fixed_amount": {
          voucherValue = Number(voucher.value) * 1000;
          break;
        }
        case "shipping": {
          voucherValue = Number(voucher.value) * 1000;
          break;
        }
        default: {
          voucherValue = 0;
          break;
        }
      }
    }

    switch (shipping) {
      case 40000: {
        shippingMethod = "Giao hàng tiết kiệm";
        break;
      }
      case 120000: {
        shippingMethod = "Giao hàng nhanh";
        break;
      }
      default: {
        shippingMethod = "Giao hàng tiết kiệm";
        break;
      }
    }

    switch (currPaymentMethod) {
      case "cod": {
        if (user && user._id) {
          const response = await codPayment(
            checkout,
            user,
            calcTotal,
            voucher?._id || "",
            voucherValue,
            address,
            paymentMethod,
            shipping,
            shippingMethod
          );
          if (response.status === 200) {
            await sendOrderConfirmation(response.data, user.email);
            setCheckoutSuccess(!checkoutSuccess);
          } else {
            console.log("Lỗi tạo đơn hàng: ", response);
          }
          // await Promise.all(checkout.map((item) => changeStock(item)));
        } else {
          console.log("Vui lòng đăng nhập");
        }
        break;
      }
      case "zalopay": {
        if (user && user._id) {
          const createOrder = await zaloPayment(checkout, user, calcTotal);
          if (createOrder) {
            window.location.href = `${createOrder.zaloResponse.order_url}`;
          }
          setCheckoutSuccess(!checkoutSuccess);
        } else {
          console.log("Vui lòng đăng nhập");
        }
        break;
      }

      case "creditCard": {
        break;
      }
      default: {
        break;
      }
    }
  };

  useEffect(() => {
    getInformation();
  }, []);
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      // setZipcode(user.zipcode || "");
      setAddress(user.address || "");
    }
  }, [user]);
  useEffect(() => {
    fetch("https://datn-api-production.up.railway.app/voucher")
      .then((res) => res.json())
      .then((data) => setVouchers(data))
      .catch((err) =>
        console.error(
          "Lỗi fetch https://datn-api-production.up.railway.app/voucher",
          err
        )
      );
  }, []);


  return (
    <section className="container grid grid-cols-1 md:grid-cols-2 gap-8 px-[100px] py-10 tracking-wide">
      {/* customer info */}
      {user && (
        <div className="grid-cols-1">
          <p className="text-3xl font-semibold">Thông tin giao hàng</p>
          <div
            className={`bg-[#fff] rounded-lg mt-6 px-8 py-6 flex flex-wrap gap-x-[14px] gap-y-4`}
          >
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
                className={`h-10 text-[14px] mt-2 px-3 py-[10px] border-[2px] ${
                  name === "" ? "border-[red]" : ""
                } rounded focus:outline-none`}
              />
              {name === "" ? (
                <div className={`text-xs text-red-500 py-1`}>
                  * Vui lòng nhập tên
                </div>
              ) : (
                <div className={`hidden`}>Nothing</div>
              )}
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
                className={`h-10 text-[14px] mt-2 px-3 py-[10px] border-[2px] ${
                  phone === "" ? "border-[red]" : ""
                } rounded focus:outline-none`}
              />
              {phone === "" ? (
                <div className={`text-xs text-red-500 py-1`}>
                  * Vui lòng nhập số điện thoại
                </div>
              ) : (
                <div className={`hidden`}>Nothing</div>
              )}
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
                className={`h-10 text-[14px] mt-2 px-3 py-[10px] border-[2px] ${
                  user?.email === "" ? "border-[red]" : ""
                } rounded  hover:cursor-not-allowed`}
              />
              {user?.email === "" ? (
                <div className={`text-xs text-red-500 py-1`}>
                  * Vui lòng nhập email
                </div>
              ) : (
                <div className={`hidden`}>Nothing</div>
              )}
            </div>

            {/*zipcode*/}
            {/* <div className="w-[180px] flex flex-col">
                            <label htmlFor="zipcode" className="font-semibold">
                                ZIP
                            </label>
                            <input
                                id="zipcode"
                                type="text"
                                value={zipcode}
                                onChange={(e) => setZipcode(e.target.value)}
                                className={`h-10 text-[14px] mt-2 px-3 py-[10px] border-[2px] ${zipcode === "" ? "border-[red]" : ""} rounded focus:outline-none`}
                            />
                            {zipcode === "" ? (
                                <div className={`text-xs text-red-500 py-1`}>* Vui lòng nhập mã bưu chính</div>
                            ) : (
                                <div className={`hidden`}>Nothing</div>
                            )}
                        </div> */}

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
                className={`h-10 text-[14px] mt-2 px-3 py-[10px] border-[2px] ${
                  address === "" ? "border-[red]" : ""
                } rounded focus:outline-none transition-all duration-200`}
              />
              {address === "" ? (
                <div className={`text-xs text-red-500 py-1`}>
                  * Vui lòng nhập địa chỉ
                </div>
              ) : (
                <div className={`hidden`}>Nothing</div>
              )}
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
        <div className="bg-[#fff] mt-[24px] rounded-lg px-4 py-5 flex justify-between">
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
            <label htmlFor="zalopay" className="ml-[8px] cursor-pointer">
              ZaloPay
            </label>
          </div>

          {/*<div className="w-[240px] flex justify-center items-center">*/}
          {/*    <input*/}
          {/*        id="creditCard"*/}
          {/*        name="paymentMethod"*/}
          {/*        type="radio"*/}
          {/*        value="creditCard"*/}
          {/*        onChange={(e) => setPaymentMethod(e.target.value)}*/}
          {/*        className="w-[14px] h-[14px] cursor-pointer"*/}
          {/*    />*/}
          {/*    <label htmlFor="creditCard" className="ml-[8px] cursor-pointer">*/}
          {/*        Thẻ ngân hàng*/}
          {/*    </label>*/}
          {/*</div>*/}
        </div>

        {/*order info*/}
        <div className="bg-[#fff] mt-4 rounded-lg px-8 py-6 space-y-4">
          <p className="text-xl font-semibold uppercase">đơn hàng</p>
          <div className="w-full mt-[18px] flex justify-between items-center">
            <div className="h-19 flex items-center gap-2">
              <Package strokeWidth={1} className={`w-9 h-9`} />
              <p>{checkout.length} sản phẩm</p>
              <button onClick={() => setCheckoutPopup(!checkoutPopup)}>
                <p className={`hover:text-blue-600`}>( Xem chi tiết )</p>
              </button>
            </div>

            <p>{calcSubTotal.toLocaleString("vi-VN")}đ</p>
          </div>

          <div className={`w-full mt-[18px]`}>
            <div className="w-full mt-[18px] flex justify-between items-center">
              <div className="h-10 flex items-center gap-2">
                <Truck strokeWidth={1} className={`w-9 h-9`} />
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
                <Ticket strokeWidth={1} className={`w-9 h-9`} />
                <p>Mã giảm giá</p>
              </div>

              {Object.keys(voucher).length === 0 ? (
                <button onClick={() => setVoucherPopup(true)} title={`Chọn mã`}>
                  <p className={`text-[#034292]`}>Chưa áp dụng</p>
                </button>
              ) : (
                <div>
                  <button
                    onClick={() => setVoucherPopup(true)}
                    className={`w-full flex justify-end`}
                    title={`Chọn mã`}
                  >
                    <p className={`text-[#034292] flex justify-end`}>
                      {voucher.code}
                    </p>
                  </button>
                </div>
              )}
            </div>
            <div
              className={`${
                !voucher ? `hidden` : `block`
              } text-sm flex justify-end`}
            >
              {voucher?.name}
            </div>
          </div>

          <div className="w-full pt-4 border-t-2 border-gray-300 flex justify-between items-center">
            <div>
              <p className={`text-xl text-[#D92D20]`}>Tổng :</p>
            </div>
            {voucher ? (
              <div className="flex gap-4">
                <p className="text-[#D92D20]">
                  {Object.keys(voucher).length === 0
                    ? `${(calcTotal + shipping).toLocaleString("vi-VN")}đ`
                    : `${(calcTotal + shipping).toLocaleString(
                        "vi-VN"
                      )}đ (-${calcVoucherPercent}%)`}
                </p>
                <p className="line-through">
                  {Object.keys(voucher).length === 0
                    ? ``
                    : `${(calcSubTotal + shipping).toLocaleString("vi-VN")}đ`}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-[#D92D20]">
                  {calcTotal.toLocaleString("vi-VN")}đ
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              handleCreateOrder(paymentMethod);
            }}
            className="w-full h-10 bg-blue-700 hover:bg-blue-600 text-[#fff] rounded"
          >
            Thanh toán
          </button>
        </div>
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
          } w-[320px] h-full bg-[#fff] flex flex-col`}
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
          <div
            className={`w-full px-4 py-6 overflow-y-auto flex flex-col gap-2`}
          >
            {vouchers.map((voucher: Voucher) => (
              <div
                key={voucher._id}
                className={`${
                  voucher.status !== "active" ? `hidden` : `block`
                } w-full h-[100px] text-sm py-2 border-2 border-dashed flex justify-between items-center`}
              >
                <Ticket strokeWidth={0.5} className={`w-[120px] h-[80px]`} />
                <div className={`w-[160px] flex flex-col gap-y-1`}>
                  <p className={`text-[#124062] uppercase`}>{voucher.code}</p>
                  <p className={`text-xs text-gray-600`}>{voucher.name}</p>
                  <button
                    onClick={() => {
                      dispatch(addVoucher({ ...voucher }));
                      setVoucherPopup(false);
                    }}
                    className={`w-[100px] h-6 text-xs border text-[#fff] bg-[#165b8d] hover:bg-white hover:text-[#165b8d] rounded`}
                  >
                    Áp dụng
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setVoucherPopup(false)}
            className={`absolute w-[90%] bottom-0 right-2 z-10 h-10 mx-auto my-4 text-[#04aae7] hover:text-[#fff] border-[2px] rounded border-[#04aae7] hover:bg-[#04aae7] `}
          >
            Quay lại trang giỏ hàng
          </button>
        </div>
      </div>

      {/*Checkout popup*/}
      {checkoutPopup && (
        <div
          onClick={() => setCheckoutPopup(!checkoutPopup)}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 print:static print:bg-white backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
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
                    <th className="p-4 font-semibold text-gray-600">
                      Hình ảnh
                    </th>
                    <th className="p-4 font-semibold text-gray-600">
                      Màu chọn
                    </th>
                    <th className="p-4 font-semibold text-gray-600">
                      Size chọn
                    </th>
                    <th className="p-4 font-semibold text-gray-600">
                      Số lượng
                    </th>
                    <th className="p-4 font-semibold text-gray-600">
                      Giá tiền
                    </th>
                    <th className="p-4 font-semibold text-gray-600">Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {checkout.map((item) => (
                    <tr
                      key={`${item._id}_${item.selectedSize}_${item.selectedColor}`}
                      className="border-t border-gray-200 hover:bg-gray-50/50 text-center transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex justify-center" title={item.name}>
                          <Image
                            src={`${
                              item.variants.find(
                                (variant) =>
                                  variant.size === item.selectedSize &&
                                  variant.color === item.selectedColor
                              )?.images[0]
                            }`}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover shadow-sm"
                          />
                        </div>
                      </td>
                      <td className="p-4 font-medium">{item.selectedColor}</td>
                      <td className="p-4 font-medium">{item.selectedSize}</td>
                      <td className="p-4 font-medium">{item.quantityy}</td>
                      <td className="p-4 font-medium">
                        {(
                          item.price +
                          (item.variants.find(
                            (variant) =>
                              variant.size === item.selectedSize &&
                              variant.color === item.selectedColor
                          )?.price || 0)
                        ).toLocaleString("vi-VN")}{" "}
                        VND
                      </td>
                      <td className="p-4 font-medium">
                        {(
                          (item.price +
                            (item.variants.find(
                              (variant) =>
                                variant.size === item.selectedSize &&
                                variant.color === item.selectedColor
                            )?.price || 0)) *
                          item.quantityy
                        ).toLocaleString("vi-VN")}{" "}
                        VND
                      </td>
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

      {/*checkoutSuccess*/}
      {checkoutSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          {/* Click outside to close */}
          <div
            onClick={() => setCheckoutSuccess(false)}
            className="absolute inset-0"
          />

          {/* Modal content */}
          <div className="relative z-10 w-[90%] max-w-md bg-white rounded-2xl px-6 py-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center">
                <Check size={32} color="#ffffff" />
              </div>
            </div>
            <h2 className="text-center text-lg sm:text-xl font-semibold text-gray-800">
              Đặt hàng thành công
            </h2>
            <p className="text-center text-base text-gray-600">
              Cảm ơn quý khách đã tin tưởng và mua hàng tại{" "}
              <span className="font-semibold text-black">HALO</span>.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
