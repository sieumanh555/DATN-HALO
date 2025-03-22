import type Order from "@/app/models/Order";
import {Copy, Trash} from "lucide-react";
import {useState} from "react";

export default function OrderManagement({data}: { data: Order[] }) {
    const [showCopyPopup, setShowCopyPopup] = useState(false);
    const [showCancelPopup, setShowCancelPopup] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState('');

    const statusStyles = {
        Processing: 'bg-yellow-100 text-yellow-800',
        Shipped: 'bg-blue-100 text-blue-800',
        Delivered: 'bg-green-100 text-green-800',
        Cancelled: 'bg-gray-100 text-gray-800'
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setShowCopyPopup(true);
        setTimeout(() => setShowCopyPopup(false), 2000);
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
            // 🟢 Lấy thông tin đơn hàng
            const res = await fetch(`http://localhost:3000/orders/${id}`);
            if (!res.ok) {
                const errorData = await res.json();
                console.error("Lỗi lấy dữ liệu order:", errorData);
                return;
            }
            const {data: order} = await res.json();

            // 🟢 Cập nhật trạng thái đơn hàng
            const response = await fetch(`http://localhost:3000/orders/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    ...order,
                    status: "Cancel"
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Lỗi cập nhật đơn hàng:", errorData);
                return;
            }
            alert("Hủy đơn hàng thành công");
        } catch (error) {
            console.error("Lỗi hệ thống:", error);
        }
    };

    return (
        <div className={`min-h-[500px]`}>
            <table className="w-full border-collapse min-w-[800px]">
                <thead>
                <tr className="bg-gray-100">
                    <th className="p-3 text-left font-medium text-gray-700 border-b">Mã đơn
                        hàng
                    </th>
                    <th className="p-3 text-left font-medium text-gray-700 border-b">Mã chi
                        tiết đơn hàng
                    </th>
                    <th className="p-3 text-left font-medium text-gray-700 border-b">Ngày đặt hàng
                    </th>
                    <th className="p-3 text-left font-medium text-gray-700 border-b">Tổng
                        tiền
                    </th>
                    <th className="p-3 text-left font-medium text-gray-700 border-b">Trạng
                        thái
                    </th>
                    <th className="p-3 text-left font-medium text-gray-700 border-b">Hành
                        động
                    </th>
                </tr>
                </thead>
                <tbody>
                {data.map((order: Order) => (
                    <tr key={order._id} className="text-sm hover:bg-gray-50">
                        <td className="p-3 border-b">{order._id}</td>
                        <td className="p-3 border-b">
                            <div className="flex items-center gap-4">
                                <span>{order.orderDetailId._id}</span>
                                <button
                                    onClick={() => handleCopy(order.orderDetailId._id)}
                                    title="Sao chép"
                                    className="text-blue-500 hover:text-blue-600 p-1"
                                >
                                    <Copy size={16}/>
                                </button>
                            </div>
                        </td>
                        <td className="p-3 border-b">{order.createdAt.split("T")[0]}</td>
                        <td className="p-3 border-b">{order.amount.toLocaleString("vn-VN")} VND</td>
                        <td className="p-3 border-b">
                                    <span
                                        className={`px-2 py-1 rounded-lg text-sm ${statusStyles[order.status] || 'bg-gray-100 text-gray-800'}`}
                                    >
                                        {order.status}
                                    </span>
                        </td>
                        <td className="p-3 border-b">
                            {order.status === "Processing" ? (
                                <button
                                    onClick={() => handleCancelClick(order._id)}
                                    className="text-red-500 hover:text-red-600 p-1"
                                    title="Hủy đơn hàng"
                                >
                                    <Trash size={16}/>
                                </button>
                            ) : (
                                <button
                                    className="p-1 cursor-not-allowed opacity-50"
                                    title="Không thể hủy đơn hàng"
                                >
                                    <Trash size={16}/>
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>


            {/* Copy Popup */}
            {showCopyPopup && (
                <div
                    className="fixed top-[50%] right-[35%] bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-out">
                    Đã sao chép vào clipboard!
                </div>
            )}

            {/* Cancel Confirmation Popup */}
            {showCancelPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-[420px] w-full mx-4">
                        <h3 className="text-lg text-center font-semibold mb-4">Xác nhận hủy đơn hàng</h3>
                        <p className="text-center text-gray-600 mb-6">Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowCancelPopup(false)}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                            >
                                Không
                            </button>
                            <button
                                onClick={handleCancelConfirm}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                            >
                                Có, hủy đơn
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}