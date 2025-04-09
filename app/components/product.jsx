import Image from "next/image";
import Link from "next/link";
import { faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Product({ products = [], limit = Infinity, columns = 3 }) {
  if (!Array.isArray(products) || products.length === 0) {
    return <p className="text-center text-gray-500">Không có sản phẩm nào để hiển thị.</p>;
  }

  return (
    <div
      className={`grid gap-4 lg:gap-6 overflow-hidden ${
        columns === 3
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : columns === 4
          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          : `grid-cols-${columns}`
      }`}
    >
      {products.slice(0, limit).map((product, index) => (
        <Link key={product._id || index} href={`/pages/trangchitiet/${product._id}`} className="block">
          <div className="relative bg-white shadow-md rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-102 h-full flex flex-col min-w-[200px] mx-auto">
            {product?.hot === 1 && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                HOT
              </div>
            )}
            <div className="w-full h-[240px] overflow-hidden rounded-md flex-shrink-0 flex items-center justify-center bg-gray-100">
              <Image
                src={product?.hinhanh || "/assets/images/default.webp"}
                width={240}
                height={240}
                className="object-contain w-full h-full cursor-pointer transition duration-300 ease-in-out"
                alt={product?.name || "Sản phẩm"}
                priority={index < 3}
                quality={80}
              />
            </div>
            <div className="mt-3 flex-grow flex flex-col">
              <h3 className="text-base font-semibold text-gray-800 line-clamp-2 min-h-[2.5rem]">
                {product?.name || "Tên sản phẩm không xác định"}
              </h3>
              <div className="flex items-center mt-2">
                {typeof product?.pricePromo === "number" && product.pricePromo > 0 ? (
                  <>
                    <span className="text-red-500 text-sm font-bold">
                      {product.pricePromo.toLocaleString("vi-VN", { currency: "VND" })} VNĐ
                    </span>
                    {typeof product?.price === "number" && product.price > product.pricePromo && (
                      <span className="text-gray-400 line-through ml-2 text-sm">
                        {product.price.toLocaleString("vi-VN", { currency: "VND" })} VNĐ
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-red-500 text-sm font-bold">
                    {typeof product?.price === "number"
                      ? product.price.toLocaleString("vi-VN", { currency: "VND" }) + " VNĐ"
                      : "Đang cập nhật"}
                  </span>
                )}
              </div>
              <div className="flex items-center mt-2 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={i < Math.floor(product?.rating || 0) ? "mr-1 text-yellow-400" : "mr-1 text-gray-300"}
                  />
                ))}
                <span className="ml-2 text-gray-500 text-sm">
                  Đã bán {typeof product?.sold === "number" ? product.sold.toLocaleString() : "0"}
                </span>
              </div>
              <div className="flex items-center mt-2 text-gray-700">
                <FontAwesomeIcon icon={faLocationDot} className="text-lg" />
                <span className="ml-2 line-clamp-1">{product?.location || "Không xác định"}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}