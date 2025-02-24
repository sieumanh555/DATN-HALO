import Image from "next/image";
import Product from "../../models/Product";

export default function NewProBox({data}: { data: Product }) {
    return (
        <div
            className="relative h-[360px] bg-[#fff] text-gray-600 rounded-lg my-2 p-[14px] hover:shadow-lg flex flex-col gap-3">
            <div className="h-[180px] px-2 flex items-center">
                <Image
                    src={`/assets/images/${data.image}`}
                    alt={data.name}
                    width={200}
                    height={200}
                    title={`Xem chi tiết sản phẩm`}
                    className={`mix-blend-darken transition-transform duration-300 hover:scale-110`}
                />
            </div>
            <p className={`h-20 hover:text-[#034292]`}>{data.name}</p>

            <div className={`font-bold`}>
                {data.price.toLocaleString("vi-VN")}đ
                {data.priceSale !== 0 ? (
                    <span className="font-normal text-gray-400 line-through ml-[8px]">
                    {data.priceSale.toLocaleString("vi-VN")}đ
                    </span>
                ) : (
                    <div className={`hidden`}></div>
                )}

            </div>
            {/*<p>223 lượt mua</p>*/}
            <div className={`flex gap-2`}>
                {Object.entries(data.sizes).map(([size, value], index: number) => (
                    <div
                        key={index}
                        className={`${value !== 0 ? '' : 'hidden'} w-8 h-8 bg-gray-200 hover:bg-[#fff] text-xs border-2 rounded-lg flex justify-center items-center`}>
                        {size}
                    </div>
                ))}
            </div>
            <div
                className="absolute w-12 h-5 bg-[#034292] text-white text-xs flex justify-center items-center rounded-xl right-2 top-2">
                New
            </div>
        </div>
    );
}
