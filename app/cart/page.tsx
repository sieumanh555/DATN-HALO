"use client";
import Link from "next/link";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import ProBox from "../components/cart/proBox";
import CartEmpty from "../components/cart/cartEmpty";
import SubProBox from "../components/cart/SubProBox";

export default function Cart() {
  const cart = useSelector((state: any) => state.cart.products || []);
  const [shipping, setShipping] = useState(40000);
  const [discount, setDiscount] = useState({
    id: "",
    minus: 0,
    percent: 0,
    condition: Infinity,
    description: "",
  });

  const calSubTotal = () =>
    cart.reduce(
      (total: any, item: any) => total + item.price * item.quantity,
      0
    );

  const calTotal = () => {
    let total = 0;
    let discountValue = 0;
    if (subTotal >= discount.condition) {
      if (discount.minus > 0) {
        discountValue = discount.minus;
      } else {
        discountValue = (subTotal * discount.percent) / 100;
      }
    }
    return (total = subTotal + shipping - discountValue);
  };
  // const [subTotal, setSubTotal] = useState(() => calSubTotal());
  // const [total, setTotal] = useState(() => calTotal());

  const subTotal = useMemo(() => calSubTotal(), [cart]);
  const total = useMemo(() => calTotal(), [shipping, discount, cart]);

  async function getDiscount(discountID: any) {
    try {
      const discounts = await fetch("http://localhost:3000/discounts").then(
        (res) => res.json()
      );
      const discount = discounts.find(
        (discount: any) => discount.id === discountID
      );
      if (discount) {
        setDiscount(discount);
      } else {
        console.log("Discount: ", discount);
        setDiscount((prev) => prev);
      }
    } catch (error) {
      console.log("Lỗi fetching discount: ", error);
    }
  }

  function handleSubmit(evt: any) {
    evt.preventDefault();
    const discountCode = evt.target.discountCode.value;
    if (discountCode === "") {
      alert("Mã giảm giá không được để trống");
      setDiscount({
        id: "",
        minus: 0,
        percent: 0,
        condition: Infinity,
        description: "",
      });
    }
    if (discountCode == discount.id) {
      // popup thông báo giam3 giá đã áp dụng
      alert(`Mã giảm giá ${discount.id} đã được áp dụng`);
    } else {
      getDiscount(discountCode);
    }
  }

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("http://localhost:3000/products", fetcher, {
    refreshInterval: 3000,
  });
  if (!data) return <div>Loading...</div>;
  if (error) return <div>Lỗi fetching data: {error.message}</div>;

  const percent = Math.floor(
    ((total - (subTotal + shipping)) * 100) / (subTotal + shipping)
  );

  return (
    <section className="p-12 bg-[#F2F4F7] tracking-wide">
      {cart.length > 0 ? (
        <div>
          <p className="text-[28px] uppercase">Giỏ hàng</p>
          <div className="w-full border-b-[4px] border-[#000000] mt-[18px]"></div>
          <div className="w-full mt-[36px] flex justify-between">
            <div className="w-[60%]">
              <div className="w-full text-xl px-[20px] flex justify-between">
                <p className="w-[52%]">Sản phẩm</p>
                <p className="w-[14%] text-center">Số lượng</p>
                <p className="w-[14%] text-center">Giá</p>
                <p className="w-[14%] text-center">Tổng</p>
              </div>
              {cart.map((product: any) => (
                <ProBox key={product.id} data={product} />
              ))}
            </div>

            <div className="w-[38%] bg-[#fff] rounded-lg mt-[46px] p-[40px] space-y-[18px]">
              <p className="text-3xl uppercase">đơn hàng</p>
              <div className="w-full border-b-[4px] border-[#000000]"></div>
              <div className="w-full my-[18px]">
                <label htmlFor="discountCode" className="text-xl font-medium">
                  Mã giảm giá
                </label>
                <form
                  onSubmit={handleSubmit}
                  className="w-[60%] h-[40px] border-[2px] my-[8px]"
                >
                  <input
                    type="text"
                    id="discountCode"
                    className="w-[70%] h-full px-3 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-[30%] h-full bg-[#034292] text-[#fff]"
                  >
                    Áp dụng
                  </button>
                </form>
                {discount ? (
                  <div className="text-sm text-[#D92D20]">
                    {discount.description}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="w-full border-b-[4px] border-[#000000]"></div>
              <div className="w-full flex justify-between">
                <p className="w-[40%] text-xl font-medium">Tổng đơn hàng</p>

                <p className="w-[40%] text-right">
                  {subTotal.toLocaleString("vi-VN")}đ
                </p>
              </div>
              <div>
                <div className="w-full flex justify-between">
                  <p className="w-[40%] text-xl font-medium">
                    Chi phí vận chuyển
                  </p>
                  <p className="w-[40%] text-right">
                    {shipping.toLocaleString("vi-VN")}đ
                  </p>
                </div>

                <div className="my-[8px] ml-[20px] flex items-center">
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
                    className="ml-[6px]  cursor-pointer"
                  >
                    Giao hàng tiết kiệm
                  </label>
                </div>

                <div className="my-[8px] ml-[20px] flex items-center">
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

              <div className="w-full border-b-[4px] border-[#000000]"></div>
              <div className="w-full flex justify-between">
                <p className="w-[40%] text-xl font-medium">Tổng tiền</p>

                <div className="w-[40%] text-[#D92D20] flex space-x-[6px] justify-end">
                  <p>{total.toLocaleString("vi-VN")}đ</p>
                  {percent < 0 ? (
                    <p>({percent}%)</p>
                  ) : (
                    <div className="hidden"></div>
                  )}
                </div>
              </div>

              <div className="w-full border-b-[4px] border-[#000000]"></div>
              <Link href="/checkout">
                <button className="w-full h-[40px] bg-[#034292] text-[#fff] rounded">
                  Thanh toán
                </button>
              </Link>
            </div>
          </div>
          <Link
            href="#"
            className="block mt-[18px] flex items-center space-x-[8px]"
          >
            <img
              src="/images/previous-arrow-icon.png"
              alt=""
              className="w-[16px] h-[16px]"
            />
            <p>Tiếp tục mua hàng</p>
          </Link>
        </div>
      ) : (
        <CartEmpty />
      )}

      {/* cart */}

      <div className="mt-12">
        <p className="text-2xl font-medium">Sản phẩm vừa xem</p>
        <div className="mt-[18px] flex flex-wrap justify-between">
          {data.map((product: any, index: any) => (
            <Link key={index} href="#" className="w-[16%]">
              <SubProBox data={product} />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-12">
        <p className="text-2xl font-medium">Sản phẩm mới</p>
        <div className="mt-[18px] flex flex-wrap justify-between">
          {data.map((product: any, index: any) => (
            <Link key={index} href="#" className="w-[16%]">
              <SubProBox data={product} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
