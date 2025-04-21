import Image from "next/image";
import Link from "next/link";
import {useCallback, useEffect, useState} from "react";
import type {ProductResponse} from "@/app/models/Product";
import type {OrderResponse} from "@/app/models/Order";
import type {OrderDetailResponse} from "@/app/models/OrderDetail";
import {formatDate} from "@/app/libs/formatDate";

interface Item {
    productId: ProductResponse;
    selectedColor: string;
    selectedSize: number;
    quantity: number;
    price: number;
}

export default function OrderDetail({orderId}: { orderId: string }) {
    const [order, setOrder] = useState<OrderResponse | null>(null);
    const [orderDetail, setOrderDetail] = useState<OrderDetailResponse | null>(null);

    const getOrder = useCallback(async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3000/orders/${id}`);
            if (!response.ok) {
                const data = await response.json();
                console.log("Lỗi từ server:", data.message);
                return;
            }
            const data = await response.json();
            setOrder(data.data);
        } catch (error) {
            console.error("Lỗi fetch order client:", error);
        }
    }, []);

    const getOrderDetail = useCallback(async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3000/orderDetails/${id}`);
            if (!response.ok) {
                const data = await response.json();
                console.log("Lỗi từ server:", data.message);
                return;
            }
            const data = await response.json();
            setOrderDetail(data.data);
        } catch (error) {
            console.error("Lỗi fetch orderDetail client:", error);
        }
    }, []);

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

    useEffect(() => {
        if (orderId) {
            getOrder(orderId);
        }
    }, [orderId, getOrder]);

    useEffect(() => {
        console.log("Order data:", order); // Log order data to check its structure
        if (order?.orderDetailId && order.orderDetailId._id) {
            getOrderDetail(order.orderDetailId._id);
        }
    }, [order, getOrderDetail]);

    return (
        <div className="bg-white mt-6 p-6 border rounded-lg space-y-4">
            {order && orderDetail && (
                <div>
                    <div className="space-y-2 text-gray-700">
                        <p>
                            <span className={`font-semibold mr-3`}> Mã đơn hàng:</span>{order.uniqueKey}
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
                            <span>{handleStatus(order.status)}</span>
                        </p>
                        <p>
                            <span className={`font-semibold mr-3`}>Ngày mua:</span> {formatDate(order.createdAt)}
                        </p>
                    </div>

                    {/* Bảng sản phẩm */}
                    <div className="overflow-x-auto mt-4">
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
                                        <Link href={`/pages/productDetail/${item.productId._id}`}>
                                            Mua lại
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

        </div>
    );
}
