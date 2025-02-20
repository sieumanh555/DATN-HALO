"use client";
import Image from "next/image";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Link from "next/link";
// import { useState } from "react";
// import useSWR from "swr";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../redux/store";

// import { addItem } from "@/redux/slices/cartSlice";
// import { PackageX } from "lucide-react";
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
      <div className="relative flex h-screen mb-12 overflow-hidden">
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
        <div className="relative flex min-w-[50%] min-h-[450px] overflow-hidden">
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
        <div className="relative flex min-w-[50%] min-h-[450px] overflow-hidden">
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
      <div>
        <span>Sản phẩm mới ra mắt</span>
        <span>Xem tất cả --</span>
      </div>
      <div>
        <div className="w-[321px] min-h-[456] bg-slate-400 flex flex-col gap-5 ">
          <div className="overflow-hidden w-[321] h-[290]">
            <Image
              src="https://i.pinimg.com/736x/a0/34/5f/a0345fdbcf2697e90a1b1241437870ad.jpg"
              width={321}
              height={205}
              alt="Hình ảnh mô tả"
            />
          </div>
          <div className="flex flex-row">
            <Image
              src="https://i.pinimg.com/736x/a0/34/5f/a0345fdbcf2697e90a1b1241437870ad.jpg"
              width={50}
              height={50}
              alt="Hình ảnh mô tả"
            />
            <Image
              src="https://i.pinimg.com/736x/a0/34/5f/a0345fdbcf2697e90a1b1241437870ad.jpg"
              width={50}
              height={50}
              alt="Hình ảnh mô tả"
            />
          </div>
          <div
            className="text-lg antialiased md:subpixel-antialiased"
            style={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              width: "321px",
            }}
          >
            <h1>Áo Thun Local Brand Unisex Teelab Seasonal Tshirt TS295 </h1>
          </div>

          <div>
            <span>10.000VNĐ</span>
            <span className="px-2 line-through">20.000VNĐ</span>
          </div>
          <div>
            <span>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span className="px-2">Đã bán hơn 2,4k</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <FontAwesomeIcon icon={faLocationDot} className="text-lg" />
            <span className="text-lg relative top-0.5">Hồ Chí Minh</span>
          </div>
        </div>
      </div>
    </div>
  );
}
