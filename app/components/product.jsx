import Image from "next/image";
import { faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Product() {
    return (
        <div className="relative bg-white shadow-md rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-105">
            {/* Nhãn HOT */}
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                HOT
            </div>

            {/* Hình ảnh chính của sản phẩm */}
            <div className="w-full h-60 overflow-hidden rounded-md">
                <Image
                    src="/assets/images/haloered.webp"
                    width={321}
                    height={240}
                    className="w-full h-full object-cover cursor-pointer transition duration-300 ease-in-out "
                    alt="Hình ảnh mô tả"
                />
            </div>

            {/* Thông tin sản phẩm */}
            <div className="mt-3">
                <h3 className="text-base font-semibold text-gray-800">
                    Áo Thun Local Brand Unisex Teelab Seasonal Tshirt TS295
                </h3>
                <div className="flex items-center mt-2">
                    <span className="text-red-500 text-lg font-bold">10.000VNĐ</span>
                    <span className="text-gray-400 line-through ml-2">20.000VNĐ</span>
                </div>
            </div>

            {/* Đánh giá sản phẩm */}
            <div className="flex items-center mt-2 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="mr-1" />
                ))}
                <span className="ml-2 text-gray-500 text-sm">Đã bán hơn 2,4k</span>
            </div>

            {/* Địa điểm bán */}
            <div className="flex items-center mt-2 text-gray-700">
                <FontAwesomeIcon icon={faLocationDot} className="text-lg" />
                <span className="ml-2">Hồ Chí Minh</span>
            </div>
        </div>
    );
}