import Image from "next/image";
import { faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Product({ products, limit }) {
  if (!products || !products.length) return <p>Không có sản phẩm nào để hiển thị.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.slice(0, limit).map((product) => (
        <div
          key={product.id}
          className="relative bg-white shadow-md rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          {product.hot && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              HOT
            </div>
          )}
          <div className="w-full h-60 overflow-hidden rounded-md">
            <Image
              src={product.image || "/assets/images/default.webp"}
              width={321}
              height={240}
              className="w-full h-full object-cover cursor-pointer transition duration-300 ease-in-out"
              alt={product.name || "Sản phẩm"}
            />
          </div>
          <div className="mt-3">
            <h3 className="text-base font-semibold text-gray-800">
              {product.name}
            </h3>
            <div className="flex items-center mt-2">
              <span className="text-red-500 text-lg font-bold">
                {product.price
                  ? product.price.toLocaleString() + " VNĐ"
                  : "Đang cập nhật"}
              </span>
              {product.oldPrice && (
                <span className="text-gray-400 line-through ml-2">
                  {product.oldPrice.toLocaleString()} VNĐ
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center mt-2 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                className={
                  i < product.rating ? "mr-1 text-yellow-400" : "mr-1 text-gray-300"
                }
              />
            ))}
            <span className="ml-2 text-gray-500 text-sm">
              Đã bán {product.sold}k
            </span>
          </div>
          <div className="flex items-center mt-2 text-gray-700">
            <FontAwesomeIcon icon={faLocationDot} className="text-lg" />
            <span className="ml-2">{product.location}</span>
          </div>
        </div>
      ))}
    </div>
  );
}