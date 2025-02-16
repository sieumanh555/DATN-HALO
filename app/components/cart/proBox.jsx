"use client";
import Link from "next/link";
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ProBox({ data }: { data: any }) {
  const dispatch = useDispatch();

  const handleDecrease = (product: any) => {
    if (product.quantity === 1) {
      const text = `Xóa sản phẩm ${product.name}`;
      if (confirm(text) == true) {
        alert("Xóa thành công");
        dispatch(removeItem(product.id));
      } else {
        console.log(
          ".-- .... -.-- / -.. .. -.. / -.-- --- ..- / -.. --- / - .... .. ... / - --- / -- . . . . . . . . . / ..--.."
        );
      }
    } else {
      dispatch(decreaseQuantity(product.id));
    }
  };

  return (
    <div className="relative w-full bg-[#fff] rounded-lg mt-[18px] p-[20px] flex justify-between hover:shadow-lg">
      <div className="w-[52%] flex justify-between">
        <img
          src={`images/${data.image}`}
          alt=""
          className={`w-[28%] h-[120px] rounded`}
        />
        <div className="w-[68%] flex flex-col space-y-[8px]">
          <p className="font-semibold">{data.name}</p>
          <p className="opacity-60">Mã sản phẩm: {data.idProduct}</p>
          <p className="opacity-60">Mã danh mục: {data.idCategory}</p>
          <p className="opacity-60">Size: {data.size}</p>
          <p className="opacity-60">Màu sắc: {data.color}</p>
          <Link href="#" className="opacity-60 underline hover:text-[#0037B3]">
            <p>Xem thêm thông tin</p>
          </Link>
        </div>
      </div>

      <div className="w-[14%] h-[24px] flex">
        <button
          onClick={() => handleDecrease(data)}
          className="w-[25%] flex justify-center items-center rounded hover:bg-[#F2F4F7] hover:shadow-lg"
        >
          <img
            src="/images/minus-icon.png"
            alt=""
            className="w-[16px] h-[16px]"
          />
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
          onClick={() => dispatch(increaseQuantity(data.id))}
          className="w-[25%] flex justify-center items-center rounded hover:bg-[#F2F4F7] hover:shadow-lg"
        >
          <img
            src="/images/plus-icon.png"
            alt=""
            className="w-[16px] h-[16px]"
          />
        </button>
      </div>

      <div className="w-[14%] text-center opacity-50">
        <p>{data.price.toLocaleString("vi-VN")}đ</p>
      </div>

      <div className="w-[14%] text-center opacity-50">
        <p>{(data.price * data.quantity).toLocaleString("vi-VN")}đ</p>
      </div>

      <button
        onClick={() => dispatch(removeItem(data.id))}
        className="absolute top-[-10px] right-[-10px]"
      >
        <div
          title={`Xóa sản phẩm ${data.name} ?`}
          className="relative w-[32px] h-[32px] bg-[#D92D20] hover:shadow-complex transition-shadow rounded-full flex justify-center items-center"
        >
          <img
            src="/images/plus-white-icon.png"
            alt=""
            className="absolute w-[24px] h-[24px] rotate-45"
          />
        </div>
      </button>
    </div>
  );
}
