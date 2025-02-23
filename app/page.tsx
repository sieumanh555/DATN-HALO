"use client";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { useDispatch } from "react-redux";

import { addItem } from "@/redux/slices/cartSlice";
export default function Home() {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("http://localhost:3000/products", fetcher, {
    refreshInterval: 3000,
  });
  if (!data) return <div>Loading...</div>;
  if (error) return <div>Lỗi fetching data: {error.message}</div>;

  return (
    <div className="m-[48px]">
      <Link href="/page/cart">
        <div>giỏ hàng</div>
      </Link>
      {data.map((product: any) => (
        <div
          key={product._id}
          className="w-[20%] bg-[#fff] rounded-lg mx-auto my-[8px] p-[14px] hover:shadow-lg flex flex-col space-y-[8px]"
        >
          <img src={`assets/images/${product.image}`} alt="" className="rounded" />
          <p>{product.name}</p>
          <div className="text-[#D92D20]">
            {product.price}
            {product.priceSale && (
              <span className="text-[#000000] opacity-60 line-through ml-[8px]">
                {product.priceSale}
              </span>
            )}
          </div>
          <p>300 lượt mua</p>
          <button
            onClick={() =>
              dispatch(addItem({ ...product, quantity: quantity }))
            }
          >
            Mua
          </button>
        </div>
      ))}
    </div>
  );
}
