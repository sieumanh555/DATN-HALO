import Link from "next/link";
import {useState} from "react";
import {FileText, Trash2} from 'lucide-react';
import {formatDate} from "@/app/libs/formatDate";

import type {OrderResponse} from "@/app/models/Order";


export default function OrderManagement({data}: { data: OrderResponse[] }) {
    const [showCancelPopup, setShowCancelPopup] = useState(false);
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

    return (
        <div className="w-full bg-white py-4 rounded-xl">
            {/* Table Container */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full min-w-[800px] text-sm">
                    {/* Table Header */}
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

                    {/* Table Body */}
                    <tbody>
                    {data.map((order) => (
                        <tr
                            key={order._id}
                            className="text-center border-b border-gray-200 hover:bg-blue-50/30 transition-colors duration-200"
                        >
                            <td className="p-4 text-gray-700">{order.uniqueKey}</td>
                            <td className="p-4 text-gray-700">{formatDate(order.createdAt)}</td>
                            <td className="p-4 font-medium text-gray-700">
                                {order.amount.toLocaleString("vn-VN")} VND
                            </td>
                            <td className="p-4  ">
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full ${statusStyles[order.status as OrderStatus]} text-sm font-medium 
                                        `}>
                                        {handleStatus(order.status)}
                                    </span>
                            </td>
                            <td className="p-4">
                                <div className="flex justify-center  ">
                                    <Link href={`/pages/user/order/orderDetail/${order._id}`}>
                                        <button
                                            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700
                                                rounded-lg transition-all duration-200 hover:bg-blue-50"
                                        >
                                            <span>Chi tiết đơn hàng</span>
                                            <FileText className="w-5 h-5"/>
                                        </button>
                                    </Link>
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