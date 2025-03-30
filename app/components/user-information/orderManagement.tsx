import {useState} from "react";
import {FileText, Trash2} from 'lucide-react';

import type {OrderResponse} from "@/app/models/Order";
import {formatDate} from "@/app/libs/formatDate";

export default function OrderManagement({
                                            data,
                                            setActiveTab,
                                            setOrderDetailId
                                        }: {
    data: OrderResponse[];
    setActiveTab: (tab: string) => void;
    setOrderDetailId: (id: string) => void;
}) {
    const [showCancelPopup, setShowCancelPopup] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState('');

    type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";
    const statusStyles: Record<OrderStatus, string> = {
        Processing: "bg-yellow-100 text-yellow-800",
        Shipped: "bg-blue-100 text-blue-800",
        Delivered: "bg-green-100 text-green-800",
        Cancelled: "bg-gray-100 text-gray-800"
    };

    const handleCancelClick = (orderId: string) => {
        setSelectedOrderId(orderId);
        setShowCancelPopup(true);
    };

    const handleCancelConfirm = async () => {
        await cancelOrder(selectedOrderId);
        setShowCancelPopup(false);
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
            alert("Hủy đơn hàng thành công");
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
                return "Đơn hàng đã bị hủy";
        }
    }

    const handleViewDetail = (orderId: string) => {
        setOrderDetailId(orderId); // Lưu orderDetailId
        setActiveTab("Chi tiết đơn hàng"); // Chuyển tab về "Chi tiết đơn hàng"
    };
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-sm border border-gray-300 rounded-lg shadow-md">
                <thead>
                <tr className="bg-gray-100 text-gray-700">
                    <th className="p-3 text-left">Mã đơn hàng</th>
                    <th className="p-3 text-left">Ngày đặt hàng</th>
                    <th className="p-3 text-left">Tổng tiền</th>
                    <th className="p-3 text-left">Trạng thái</th>
                    <th className="p-3 text-center">Xem chi tiết</th>
                    <th className="p-3 text-center">Hủy đơn hàng</th>
                </tr>
                </thead>
                <tbody>
                {data.map((order) => (
                    <tr key={order._id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="p-3">{order._id}</td>
                        <td className="p-3">{formatDate(order.createdAt)}</td>
                        <td className="p-3">{order.amount.toLocaleString("vn-VN")} VND</td>
                        <td className="p-3">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[order.status as OrderStatus] || 'bg-gray-100 text-gray-800'}`}>
                                   {handleStatus(order.status)}
                                </span>
                        </td>
                        <td className="p-3 flex justify-center items-center">
                            <button
                                onClick={() => handleViewDetail(order.orderDetailId._id)}
                                className="text-blue-600 flex items-center gap-1"
                            >
                                <p>Chi tiết đơn hàng</p>
                                <FileText size={20}/>
                            </button>
                        </td>
                        <td className="p-3">
                            {handleStatus(order.status) === "Đang xử lí" ? (
                                <button
                                    onClick={() => handleCancelClick(order._id)}
                                    className="text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
                                >
                                    <p>Hủy</p>
                                    <Trash2 size={20}/>
                                </button>
                            ) : (
                                <div title={`Hủy đơn hàng`} className={`flex items-center gap-1`}>
                                    <p>Hủy</p>
                                    <Trash2 size={20} className={`opacity-50 cursor-not-allowed`}/>
                                </div>
                                // <span className="text-gray-400 cursor-not-allowed" title={`Không thể hủy đơn hàng`}>Hủy đơn</span>
                            )}

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Popup xác nhận hủy đơn */}
            {showCancelPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
                        <h3 className="text-lg font-semibold text-center mb-4">Xác nhận hủy đơn hàng</h3>
                        <p className="text-center text-gray-600 mb-6">Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowCancelPopup(false)}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-all"
                            >
                                Không
                            </button>
                            <button
                                onClick={handleCancelConfirm}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-all"
                            >
                                Có, hủy đơn
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}