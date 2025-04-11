import {useState} from "react";
import {FileText, Printer, Trash2} from 'lucide-react';
import {formatDate} from "@/app/libs/formatDate";
import type {OrderResponse} from "@/app/models/Order";
import Image from "next/image";
import Link from "next/link";
import type {ProductResponse} from "@/app/models/Product";

interface Item {
    productId: ProductResponse;
    selectedColor: string;
    selectedSize: number;
    quantity: number;
    price: number;
}

export default function OrderManagement({data}: { data: OrderResponse[] }) {
    const [showCancelPopup, setShowCancelPopup] = useState(false);
    const [orderDetailPopup, setOrderDetailPopup] = useState(false);
    const [order, setOrder] = useState<OrderResponse | null>(null);
    const [orderId, setOrderId] = useState('');

    type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";
    const statusStyles: Record<OrderStatus, string> = {
        Processing: "bg-yellow-100 text-yellow-800",
        Shipped: "bg-blue-100 text-blue-800",
        Delivered: "bg-green-100 text-green-800",
        Cancelled: "bg-gray-100 text-gray-800"
    };

    const handleCancelClick = (id: string) => {
        setOrderId(id);
        setShowCancelPopup(true);
    };

    const handleCancelConfirm = () => {
        cancelOrder(orderId);
    };

    const cancelOrder = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:3000/orders/${id}`);
            if (!res.ok) return;
            const {data: order} = await res.json();
            await fetch(`http://localhost:3000/orders/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({...order, status: "Cancelled"})
            });
            setShowCancelPopup(false);
        } catch (error) {
            console.error("Lỗi hệ thống:", error);
        }
    };

    const handleStatus = (status: string) => {
        switch (status) {
            case "Processing":
                return "Đang xử lí";
            case "Shipped":
                return "Đang vận chuyển";
            case "Delivered":
                return "Hoàn thành";
            default:
                return "Đã bị hủy";
        }
    }

    const handleOrderDetail = (item: OrderResponse) => {
        setOrder(item);
        setOrderDetailPopup(true);
    }
    return (
        <div className="relative w-full bg-white py-4 rounded-xl">
            {/* Table Container */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full min-w-[800px] text-sm">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="p-4 font-semibold text-gray-700 border-b">Mã đơn hàng</th>
                        <th className="p-4 font-semibold text-gray-700 border-b">Ngày đặt hàng</th>
                        <th className="p-4 font-semibold text-gray-700 border-b">Tổng tiền</th>
                        <th className="p-4 font-semibold text-gray-700 border-b">Trạng thái</th>
                        <th className="p-4 font-semibold text-gray-700 border-b">Xem chi tiết</th>
                        <th className="p-4 font-semibold text-gray-700 border-b">Hủy đơn hàng</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((order) => (
                        <tr key={order._id}
                            className="text-center border-b border-gray-200 hover:bg-blue-50/30 transition-colors duration-200">
                            <td className="p-4 text-gray-700">{order.uniqueKey}</td>
                            <td className="p-4 text-gray-700">{formatDate(order.createdAt)}</td>
                            <td className="p-4 font-medium text-gray-700">{order.amount.toLocaleString("vn-VN")} VND</td>
                            <td className="p-4  ">
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full ${statusStyles[order.status as OrderStatus]} text-sm font-medium 
                                        `}>
                                        {handleStatus(order.status)}
                                    </span>
                            </td>
                            <td className="p-4">
                                <div className="flex justify-center  ">
                                    <button
                                        onClick={() => handleOrderDetail(order)}
                                        className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700
                                                rounded-lg transition-all duration-200 hover:bg-blue-50"
                                    >
                                        <span>Chi tiết đơn hàng</span>
                                        <FileText className="w-5 h-5"/>
                                    </button>
                                </div>
                            </td>
                            <td className="p-4">
                                <div className="flex justify-center">
                                    {handleStatus(order.status) === "Đang xử lí" ? (
                                        <button
                                            onClick={() => handleCancelClick(order._id)}
                                            className="flex items-center gap-2 px-4 py-2 text-red-500 hover:text-red-600
                                                    rounded-lg transition-all duration-200 hover:bg-red-50"
                                        >
                                            <span>Hủy</span>
                                            <Trash2 className="w-5 h-5"/>
                                        </button>
                                    ) : (
                                        <div
                                            className="flex items-center gap-2 px-4 py-2 text-gray-400 cursor-not-allowed">
                                            <span>Hủy</span>
                                            <Trash2 className="w-5 h-5 opacity-50"/>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/*order detail*/}
            {order && orderDetailPopup && (
                <div onClick={() => setOrderDetailPopup(!orderDetailPopup)} className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 print:static print:bg-white backdrop-blur-sm">
                    <div
                        onClick={e => e.stopPropagation()}
                        className="relative w-full max-w-5xl bg-white rounded-lg p-4 shadow-xl overflow-y-auto max-h-[90vh] border print:shadow-none print:max-h-full animate-fadeIn"
                    >
                        {/* Header */}
                        <div className="px-6 mb-4">
                            <h1 className="text-2xl uppercase font-bold text-gray-800 tracking-wide">
                                Chi tiết đơn hàng
                            </h1>
                        </div>

                        <div className="px-6 py-2 text-gray-700 mb-4">
                            <div className="flex flex-col md:flex-row gap-2 md:gap-24">
                                <div className="space-y-2">
                                    <p className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-600">Mã đơn hàng:</span>
                                        <span className="font-medium">{order.uniqueKey}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-600">Khách hàng:</span>
                                        <span className="font-medium">{order.userId.name}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-600">Ngày mua:</span>
                                        <span className="font-medium">{formatDate(order.createdAt)}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-600">Trạng thái:</span>
                                        {handleStatus(order.status)}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-600">Tiền sản phẩm:</span>
                                        <span className="font-medium">{order.amount.toLocaleString("vi-VN")} VND</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-600">Chi phí vận chuyển:</span>
                                        <span className="font-medium">50.000 VND</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-600">Tổng hóa đơn:</span>
                                        <span className="font-medium">10.050.000 VND</span>
                                    </p>


                                </div>
                            </div>
                        </div>

                        {/* Bảng sản phẩm */}
                        <div className="overflow-x-auto border border-gray-200">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-center">
                                <tr>
                                    <th className="p-4 font-semibold text-gray-600">Hình ảnh</th>
                                    <th className="p-4 font-semibold text-gray-600">Màu chọn</th>
                                    <th className="p-4 font-semibold text-gray-600">Size chọn</th>
                                    <th className="p-4 font-semibold text-gray-600">Số lượng</th>
                                    <th className="p-4 font-semibold text-gray-600">Giá tiền</th>
                                    <th className="p-4 font-semibold text-gray-600 print:hidden">Thao tác</th>
                                </tr>
                                </thead>
                                <tbody>
                                {order.orderDetailId.items.map((item: Item, index: number) => (
                                    <tr key={index}
                                        className="border-t border-gray-200 hover:bg-gray-50/50 text-center transition-colors">
                                        <td className="p-4">
                                            <div className="flex justify-center">
                                                <Image
                                                    src="/assets/images/MLB-Chunky-Runner-NY-Black-White(1).png"
                                                    alt="MLB Chunky Runner NY Black White"
                                                    width={80}
                                                    height={80}
                                                    className="rounded-lg object-cover shadow-sm"
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium">{item.selectedColor}</td>
                                        <td className="p-4 font-medium">{item.selectedSize}</td>
                                        <td className="p-4 font-medium">{item.quantity}</td>
                                        <td className="p-4 font-medium">{item.price.toLocaleString("vi-VN")} VND</td>
                                        <td className="p-4 space-x-3 print:hidden">
                                            <Link
                                                href={`/pages/productDetail/${item.productId._id}`}
                                                className="inline-flex items-center justify-center px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:underline"
                                            >
                                                Bình luận
                                            </Link>
                                            <Link
                                                href={`/pages/productDetail/${item.productId._id}`}
                                                className="inline-flex items-center justify-center px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:underline"
                                            >
                                                Mua lại
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex items-center justify-end gap-4 print:hidden">
                            <button
                                onClick={() => setOrderDetailPopup(!orderDetailPopup)}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 flex items-center gap-2"
                            >
                                Đóng
                            </button>
                            <button
                                onClick={() => window.print()}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                            >
                                <Printer size={20}/>
                                In hóa đơn
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cancel Confirmation Modal */}
            {showCancelPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative transform transition-all duration-300 opacity-100 scale-100">
                        <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl">
                            {/* Modal Header */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-800 text-center">
                                    Xác nhận hủy đơn hàng
                                </h3>
                                <p className="mt-2 text-center text-gray-600">
                                    Bạn có chắc chắn muốn hủy đơn hàng này không?
                                </p>
                            </div>

                            {/* Modal Actions */}
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => setShowCancelPopup(false)}
                                    className="px-6 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium
                                        hover:bg-gray-200 active:bg-gray-300"
                                >
                                    Không
                                </button>
                                <button
                                    onClick={handleCancelConfirm}
                                    className="px-6 py-2.5 rounded-lg bg-red-500 text-white font-medium
                                        hover:bg-red-600 active:bg-red-700"
                                >
                                    Có, hủy đơn
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

