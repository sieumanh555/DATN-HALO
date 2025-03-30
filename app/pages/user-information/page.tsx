'use client';
import {useEffect, useState} from 'react';
import {Menu} from 'lucide-react';


import type {OrderResponse} from "../../models/Order";
import type {OrderDetailResponse} from "../../models/OrderDetail";
import UserInformationComponent from "@/app/components/user-information/information"
import OrderManagementComponent from "@/app/components/user-information/orderManagement";
import OrderDetailComponent from "@/app/components/user-information/orderDetail";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('Thông tin tài khoản');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [orders, setOrders] = useState<OrderResponse[] | []>([]); // mảng orders
    const [order, setOrder] = useState<OrderResponse | null>(null);
    const [orderDetail, setOrderDetail] = useState<OrderDetailResponse | null>(null); // thông tin orderDetail
    const [orderDetailId, setOrderDetailId] = useState('');

    const getOrders = async () => {
        try {
            const response = await fetch("http://localhost:3000/orders");
            if (!response.ok) {
                const data = await response.json()
                return console.log(data.message);
            }
            const data = await response.json();
            return setOrders(data.data);
        } catch (error) {
            console.log("Lỗi fetch orders client: ", error);
        }
    };
    const getOrderByOrderDetail = (arr: OrderResponse[]) => {
        const order = arr.find((order: OrderResponse) => order.orderDetailId._id === orderDetailId);
        if (order !== null) {
            setOrder(order);
        }
        return;
    }
    const getOrderById = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3000/orderDetails/${id}`);
            if (!response.ok) {
                const data = await response.json()
                return console.log(data.message);
            }
            const data = await response.json();
            setOrderDetail(data.data);
        } catch (error) {
            console.log("Lỗi fetch order client: ", error);
        }
    };

    useEffect(() => {
        getOrders()
    }, []);


    return (
        <div className="min-h-screen bg-gray-50 relative">

            {/* Mobile Header */}
            <div className="md:hidden bg-white shadow-sm p-4 flex items-center justify-between">
                <h1 className="text-lg font-semibold">Profile</h1>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <Menu size={24}/>
                </button>
            </div>

            <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] md:min-h-screen">
                {/* Sidebar */}
                <aside className={`
                    ${isSidebarOpen ? 'block' : 'hidden'} 
                    full-shadow
                    md:block 
                    md:rounded
                    w-full md:w-64 
                    bg-white shadow-sm 
                    fixed md:relative md:top-6
                    md:min-h-[200px]
                    z-10 md:z-0 
                    h-full
                `}>
                    <div className="p-4">
                        <ul className="space-y-2">
                            {['Thông tin tài khoản', 'Quản lý đơn hàng', 'Chi tiết đơn hàng'].map((tab) => (
                                <li
                                    key={tab}
                                    onClick={() => {
                                        setActiveTab(tab);
                                        setIsSidebarOpen(false);
                                    }}
                                    className={`
                                        p-3 
                                        cursor-pointer 
                                        rounded-lg
                                        transition-colors 
                                        hover:bg-green-50
                                        ${activeTab === tab ? 'bg-green-100 text-green-600 font-medium' : 'text-gray-700'}
                                    `}
                                >
                                    {tab}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-6">
                    <div className="full-shadow bg-white rounded shadow-sm p-4 md:p-6">
                        <h2 className="text-xl font-semibold mb-4">{activeTab}</h2>

                        {activeTab === 'Thông tin tài khoản' && (
                            <UserInformationComponent/>
                        )}

                        {activeTab === 'Quản lý đơn hàng' && (
                            <OrderManagementComponent data={orders}
                                                      setActiveTab={setActiveTab}
                                                      setOrderDetailId={setOrderDetailId}
                            />
                        )}

                        {activeTab === 'Chi tiết đơn hàng' && (
                            <div className="w-full">
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        className="w-[30%] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#034292] transition-all duration-200"
                                        placeholder="Nhập Order ID"
                                        value={orderDetailId}
                                        onChange={(e) => setOrderDetailId(e.target.value)}
                                    />
                                    <button
                                        onClick={() => {
                                            getOrderById(orderDetailId);
                                            getOrderByOrderDetail(orders)
                                        }}
                                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                                    >
                                        Tìm kiếm
                                    </button>
                                </div>

                                {orderDetail && (
                                    <OrderDetailComponent order={order} orderDetail={orderDetail}/>
                                )}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}