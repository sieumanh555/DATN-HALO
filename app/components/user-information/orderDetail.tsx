import Image from "next/image";
import Link from "next/link";
import type Product from "@/app/models/Product";
import type {OrderResponse} from "@/app/models/Order";
import type {OrderDetailResponse} from "@/app/models/OrderDetail";

interface Item {
    productId: Product;
    selectedColor: string;
    selectedSize: number;
    quantity: number;
    price: number;
}

export default function OrderDetail({order, orderDetail}: { order: OrderResponse; orderDetail: OrderDetailResponse }) {
    const formatDate = (str: string | Date) => {
        const date = typeof str === "string" ? new Date(str) : str;
        return date.toLocaleDateString("vi-VN");
    };

    type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";
    const statusStyles: Record<OrderStatus, string> = {
        Processing: "bg-yellow-100 text-yellow-800",
        Shipped: "bg-blue-100 text-blue-800",
        Delivered: "bg-green-100 text-green-800",
        Cancelled: "bg-gray-100 text-gray-800"
    };

    return (
        <div className="full-shadow mt-6 p-6 bg-white rounded-lg space-y-4">
            {/* Thông tin đơn hàng */}
            <div className="space-y-2 text-gray-700">
                <p>
                    <span className={`font-semibold mr-3`}> Mã đơn hàng:</span>{order._id}
                </p>
                <p>
                    <span className={`font-semibold mr-3`}>Khách hàng:</span>{order.userId.name}
                </p>
                <p>
                    <span
                        className={`font-semibold mr-3`}>Tổng hóa đơn:</span>{order.amount.toLocaleString("vi-VN")} VND
                </p>
                <p className="flex items-center gap-2">
                    <span className={`font-semibold`}>Trạng thái:</span>
                    <span
                        className={`px-3 py-1 text-xs font-semibold rounded-md ${statusStyles[order.status as OrderStatus] || "bg-gray-200 text-gray-800"}`}>
                        {order.status}
                    </span>
                </p>
                <p>
                    <span className={`font-semibold mr-3`}>Ngày mua:</span> {formatDate(order.createdAt)}
                </p>
            </div>

            {/* Bảng sản phẩm */}
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                    <tr className="text-center">
                        <th className="p-3 border-b">Hình ảnh</th>
                        <th className="p-3 border-b">Màu chọn</th>
                        <th className="p-3 border-b">Size chọn</th>
                        <th className="p-3 border-b">Số lượng</th>
                        <th className="p-3 border-b">Giá</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderDetail.items.map((item: Item, index: number) => (
                        <tr key={index} className="border-b hover:bg-gray-50 text-center">
                            <td className="p-3 flex justify-center items-center">
                                <Image
                                    src="/assets/images/MLB-Chunky-Runner-NY-Black-White(1).png"
                                    alt="MLB Chunky Runner NY Black White"
                                    width={80}
                                    height={80}
                                    className="rounded-lg"
                                />
                            </td>
                            <td className="p-3">{item.selectedColor}</td>
                            <td className="p-3">{item.selectedSize}</td>
                            <td className="p-3">{item.quantity}</td>
                            <td className="p-3">{item.price.toLocaleString("vi-VN")} VND</td>
                            <td className="p-3 hover:cursor text-blue-600">
                                <Link href={`/pages/product-detail/${item.productId._id}`}>
                                    Mua lại
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
