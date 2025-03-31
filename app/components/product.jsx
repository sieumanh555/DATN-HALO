import Image from "next/image";
import Link from "next/link";
import { faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Product({ products = [], limit = Infinity }) {
    if (!Array.isArray(products) || products.length === 0) {
        return <p className="text-center text-gray-500">Không có sản phẩm nào để hiển thị.</p>;
    }
    console.log(products);

    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-6 sm:gap-[35px] gap-[10px]">
            {products.slice(0, limit).map((product, index) => (
                <Link key={product._id || index} href={`/pages/trangchitiet/${product._id}`} className="block">
                    <div className="relative bg-white shadow-md rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-105 h-full flex flex-col">
                        {product?.hot === 1 && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                HOT
                            </div>
                        )}
                        <div className="w-full h-60 overflow-hidden rounded-md flex-shrink-0">
                            <Image
                                src={product?.hinhanh || "/assets/images/default.webp"}
                                width={321}
                                height={240}
                                className="w-full h-full object-cover cursor-pointer transition duration-300 ease-in-out"
                                alt={product?.name || "Sản phẩm"}
                            />
                        </div>
                        <div className="mt-3 flex-grow flex flex-col">
                            <h3 className="text-base font-semibold text-gray-800 line-clamp-2 min-h-[2.5rem]">
                                {product?.name || "Tên sản phẩm không xác định"}
                            </h3>
                            <div className="flex items-center mt-2">
                                {typeof product?.pricePromo === "number" ? (
                                    <>
                    <span className="text-red-500 text-sm font-bold">
                      {product.pricePromo.toLocaleString()} VNĐ
                    </span>
                                        {typeof product?.price === "number" && (
                                            <span className="text-gray-400 line-through ml-2 text-sm">
                        {product.price.toLocaleString()} VNĐ
                      </span>
                                        )}
                                    </>
                                ) : (
                                    <span className="text-red-500 text-sm font-bold">
                    {typeof product?.price === "number"
                        ? product.price.toLocaleString() + " VNĐ"
                        : "Đang cập nhật"}
                  </span>
                                )}
                            </div>
                            <div className="flex items-center mt-2 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <FontAwesomeIcon
                                        key={i}
                                        icon={faStar}
                                        className={i < (product?.rating || 0) ? "mr-1 text-yellow-400" : "mr-1 text-gray-300"}
                                    />
                                ))}
                                <span className="ml-2 text-gray-500 text-sm">
                  Đã bán {typeof product?.sold === "number" ? product.sold : "0"}
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