import Image from "next/image";
export default function NewProBox({ data }: { data: any }) {
  return (
    <div className="relative bg-[#fff] rounded-lg my-2 p-[14px] hover:shadow-lg flex flex-col space-y-2">
      <Image src={`/images/${data.image}`} alt="" width={200} height={200} className="rounded" />
      <p>{data.name}</p>
      <div className="text-[#D92D20]">
        {data.price.toLocaleString("vi-VN")}đ
        <span className="text-[#000000] opacity-60 line-through ml-[8px]">
          {data.priceSale.toLocaleString("vi-VN")}đ
        </span>
      </div>
      <p>223 lượt mua</p>
      <div className="absolute w-[40px] h-[18px] bg-[#034292] text-white text-xs flex justify-center items-center rounded-2xl right-[6px] top-0">
        New
      </div>
    </div>
  );
}
