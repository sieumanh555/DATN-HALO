"use client";
// import Link from "next/link";
// import { useState } from "react";
// import useSWR from "swr";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../redux/store";

// import { addItem } from "@/redux/slices/cartSlice";
// import { PackageX } from "lucide-react";
import Product from "./components/product";
import Images from "./components/image";
import ImagesMini from "./components/imagemini";
import SlideShow from "./components/slideshow";
export default function Home() {
  // const [quantity] = useState<number>(1);
  // const dispatch = useDispatch();
  // const cart = useSelector((state: RootState) => state.cart);

  // const fetcher = (url: string) => fetch(url).then((res) => res.json());
  // const { data, error } = useSWR("http://localhost:3000/products", fetcher, {
  //   refreshInterval: 3000,
  // });
  // if (!data) return <div>Loading...</div>;
  // if (error) return <div>Lỗi fetching data: {error.message}</div>;

  return (
    // <div className="m-[48px]">
    //   <Link href="/cart">
    //     <div>giỏ hàng</div>
    //   </Link>
    //   {data.map((product: any) => (
    //     <div
    //       key={product.id}
    //       className="w-[20%] bg-[#fff] rounded-lg mx-auto my-[8px] p-[14px] hover:shadow-lg flex flex-col space-y-[8px]"
    //     >
    //       <img src={`/images/${product.image}`} alt="" className="rounded" />
    //       <p>{product.name}</p>
    //       <div className="text-[#D92D20]">
    //         {product.price}
    //         {product.priceSale && (
    //           <span className="text-[#000000] opacity-60 line-through ml-[8px]">
    //             {product.priceSale}
    //           </span>
    //         )}
    //       </div>
    //       <p>{product.id} lượt mua</p>
    //       <button
    //         onClick={() =>
    //           dispatch(addItem({ ...product, quantity: quantity }))
    //         }
    //       >
    //         Mua
    //       </button>
    //     </div>
    //   ))}
    // </div>
    <div>
      <div className="relative flex h-screen w-full mb-12 overflow-hidden">
        <div className="flex gap-2 flex-col my-6 font-bold uppercase">
          <div className="relative z-30 p-5 text-[140px] bg-opacity-50 rounded-xl">
            Bộ sưu tập nam
          </div>
          <div className="relative z-30 p-5 text-[100px] bg-opacity-50 rounded-xl">
            Mùa xuân 2025
          </div>
          <div className="relative z-30 p-5 text-[60px] bg-opacity-50 rounded-xl">
            Phiên bản giói hạn
          </div>
        </div>
        <video
          autoPlay={true}
          loop={true}
          muted={true}
          className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
        >
          <source src="/banner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex flex-row mx-5 gap-2">
        <div
          className="relative flex  min-h-[450px] overflow-hidden"
          style={{ minWidth: "calc(50% - 5px)" }}
        >
          <div className="flex gap-2 flex-col my-6 font-bold uppercase">
            <div className="relative z-30 p-5 text-[40px] bg-opacity-50 rounded-xl">
              Bộ sưu tập nam
            </div>
            <div className="relative z-30 p-5 text-[30px] bg-opacity-50 rounded-xl">
              Mùa xuân 2025
            </div>
            <div className="relative z-30 p-5 text-[20px] bg-opacity-50 rounded-xl">
              Phiên bản giói hạn
            </div>
          </div>
          <video
            autoPlay={true}
            loop={true}
            muted={true}
            className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
          >
            <source src="/banner.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div
          className="relative flex overflow-hidden"
          style={{ minWidth: "calc(50% - 5px)" }}
        >
          <div className="flex gap-2 flex-col my-6 font-bold uppercase">
            <div className="relative z-30 p-5 text-[40px] bg-opacity-50 rounded-xl">
              Bộ sưu tập nam
            </div>
            <div className="relative z-30 p-5 text-[30px] bg-opacity-50 rounded-xl">
              Mùa xuân 2025
            </div>
            <div className="relative z-30 p-5 text-[20px] bg-opacity-50 rounded-xl">
              Phiên bản giói hạn
            </div>
          </div>
          <video
            autoPlay={true}
            loop={true}
            muted={true}
            className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
          >
            <source src="/banner.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="text-gray-900 mx-5 my-5 py-8 flex justify-between items-center border-b-4 border-b-gray-900">
        <span className="text-[28px]">Sản phẩm mới ra mắt</span>
        <span className="text-[16px]">Xem tất cả --</span>
      </div>

      <div className="mx-5 grid grid-cols-5 gap-7">
        <Product></Product>
        <Product></Product>
        <Product></Product>
        <Product></Product>
        <Product></Product>
        <Product></Product>
        <Product></Product>
        <Product></Product>
      </div>
      <div className="text-gray-900 mx-5 my-5 py-8 text-center border-b-4 border-b-gray-900">
        <span className="text-[28px]">Sản phẩm mới ra mắt</span>
      </div>
      <div className="w-full px-5 flex flex-row">
        <div className="w-[50%]">
          <video
            autoPlay={true}
            loop={true}
            muted={true}
            className="relative z-10 w-auto h-auto"
          >
            <source src="/banner.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="text-gray-900 max-w-[50%] px-10 flex justify-center flex-col gap-5">
          <h1 className="text-[54px]">Bộ sưu tập nam</h1>
          <p>
            This collection brings together dreamy spirit with Hello Kittys
            timeless adorableness. Designed for dreamers who find beauty in the
            little things, it serves as a gentle reminder that love, friendship,
            and imagination are the true colors of life.Step into a world where
            every piece tells a story of dreams, and every moment radiates
            cuteness. Be part of a j ourney that inspires you to dream boldly
            and love endlessly
          </p>
          <button className="bg-transparent hover:bg-gray-500 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-gray-900 hover:border-transparent rounded">
            Button
          </button>
        </div>
      </div>
      <div className="text-gray-900 mx-5 my-5 py-8 text-center border-b-4 border-b-gray-900">
        <span className="text-[28px]">Sản phẩm mới ra mắt</span>
      </div>
      {/* // */}
      <div className="w-full px-5 flex flex-row">
        <div className="text-gray-900 max-w-[50%] pr-5 flex justify-center flex-col gap-5">
          <h1 className="text-[54px]">Bộ sưu tập nam</h1>
          <p>
            This collection brings together dreamy spirit with Hello Kittys
            timeless adorableness. Designed for dreamers who find beauty in the
            little things, it serves as a gentle reminder that love, friendship,
            and imagination are the true colors of life.Step into a world where
            every piece tells a story of dreams, and every moment radiates
            cuteness. Be part of a j ourney that inspires you to dream boldly
            and love endlessly
          </p>
          <button className="bg-transparent hover:bg-gray-500 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-gray-900 hover:border-transparent rounded">
            Button
          </button>
        </div>
        <div className="w-[50%]">
          <video
            autoPlay={true}
            loop={true}
            muted={true}
            className="relative z-10 w-auto h-auto"
          >
            <source src="/banner.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="text-gray-900 mx-5 my-5 py-8 text-center border-b-4 border-b-gray-900">
        <span className="text-[28px]">Sản phẩm mới ra mắt</span>
      </div>
      <div className="w-full min-h-[700px] flex flex-col gap-y-10">
        <div className="relative top-0 left-0 w-full h-full z-0">
          <video
            autoPlay={true}
            loop={true}
            muted={true}
            className="w-full h-[700px] object-cover"
          >
            <source src="/banner.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="text-center text-gray-900 z-10 flex flex-col gap-5 max-w-[900px] mx-[500px]">
          <h1 className="text-2xl mb-4 text-[42px]">Chào mừng Halo Shop</h1>
          <p className="mb-4 text-[22px]">
            This collection brings together dreamy spirit with Hello Kitty
            timeless adorableness. Designed for dreamers who find beauty in the
            little things, it serves as a gentle reminder that love, friendship,
          </p>
          <button className="px-6 py-2 bg-gray-900 text-white rounded-full">
            Click
          </button>
        </div>
      </div>
      <div className="text-gray-900 mx-5 my-5 py-8 flex justify-between items-center border-b-4 border-b-gray-900">
        <span className="text-[28px]">Sản phẩm mới ra mắt</span>
        <span className="text-[16px]">Xem tất cả --</span>
      </div>
      <div className="flex mx-5 gap-5 ">
        <Images />
        <Images />
        <Images />
        <Images />
      </div>
      <div>
        <SlideShow />
      </div>
      <div className="text-gray-900 mx-5 my-5 py-8 text-center border-b-4 border-b-gray-900">
        <span className="text-[28px]">Sản phẩm mới ra mắt</span>
      </div>
      <div className="flex flex-row flex-wrap mx-5 gap-[0.8rem]">
        {Array.from({ length: 16 }).map((_, i) => (
          <ImagesMini key={i} />
        ))}
      </div>
    </div>
  );
}
