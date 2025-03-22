'use client';
import {useEffect, useState} from 'react';
import Image from "next/image";
import {Edit, Menu, Save, X} from 'lucide-react';
import type User from "../../models/User";
import type Order from "../../models/Order";
import type OrderDetail from "../../models/OrderDetail";

import OrderManagement from "@/app/components/user-information/orderManagement";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('Thông tin tài khoản');
    const [isEditing, setIsEditing] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null)
    const [orders, setOrders] = useState<Order[] | []>([]);
    const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
    const [orderDetailId, setOrderDetailId] = useState('');

    const userid = "67dbcf2c65e402187e708682"
    const getUserById = async (userid: string) => {
        try {
            const response = await fetch(`http://localhost:3000/users/${userid}`);
            if (!response.ok) {
                const data = await response.json()
                return console.log(data.message);
            }
            const data = await response.json();
            setUser(data.data);
        } catch (error) {
            console.log("Lỗi fetch order client: ", error);
        }
    };
    getUserById(userid);
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
    const getOrderById = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3000/orderDetails/${id}`);
            if (!response.ok) {
                const data = await response.json()
                return console.log(data.message);
            }
            const data = await response.json();
            console.log(">>>>>Check data res: ", data);
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
                        <h2 className="text-xl font-semibold mb-8">{activeTab}</h2>

                        {activeTab === 'Thông tin tài khoản' && (
                            <div>
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                    <div className="flex flex-col items-center">
                                        <Image
                                            src={`/assets/images/default-user.avif`}
                                            alt="Avatar"
                                            width={100}
                                            height={100}
                                            className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
                                        />
                                        <p className="mt-4 text-sm text-gray-600">
                                            Xin chào, Đạt
                                        </p>
                                    </div>

                                    <div className="flex-1">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                            {user && (
                                                <div key={user._id} className="space-y-1">
                                                    <label
                                                        className="block text-sm font-medium text-gray-700 capitalize">
                                                        Tên tài khoản
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={user.name}
                                                        readOnly={!isEditing}
                                                        className={`
                                                            w-full 
                                                            px-3 
                                                            py-2 
                                                            border 
                                                            rounded-lg 
                                                            text-gray-700
                                                            ${!isEditing ? 'bg-gray-50' : 'bg-white'}
                                                            ${isEditing ? 'border-green-300 focus:ring-2 focus:ring-green-200' : 'border-gray-200'}
                                                        `}
                                                    />
                                                    <label
                                                        className="block text-sm font-medium text-gray-700 capitalize">
                                                        Tên tài khoản
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={user.name}
                                                        readOnly={!isEditing}
                                                        className={`
                                                            w-full 
                                                            px-3 
                                                            py-2 
                                                            border 
                                                            rounded-lg 
                                                            text-gray-700
                                                            ${!isEditing ? 'bg-gray-50' : 'bg-white'}
                                                            ${isEditing ? 'border-green-300 focus:ring-2 focus:ring-green-200' : 'border-gray-200'}
                                                        `}
                                                    />
                                                    <label
                                                        className="block text-sm font-medium text-gray-700 capitalize">
                                                        Tên tài khoản
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={user.name}
                                                        readOnly={!isEditing}
                                                        className={`
                                                            w-full 
                                                            px-3 
                                                            py-2 
                                                            border 
                                                            rounded-lg 
                                                            text-gray-700
                                                            ${!isEditing ? 'bg-gray-50' : 'bg-white'}
                                                            ${isEditing ? 'border-green-300 focus:ring-2 focus:ring-green-200' : 'border-gray-200'}
                                                        `}
                                                    />
                                                    <label
                                                        className="block text-sm font-medium text-gray-700 capitalize">
                                                        Tên tài khoản
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={user.name}
                                                        readOnly={!isEditing}
                                                        className={`
                                                            w-full 
                                                            px-3 
                                                            py-2 
                                                            border 
                                                            rounded-lg 
                                                            text-gray-700
                                                            ${!isEditing ? 'bg-gray-50' : 'bg-white'}
                                                            ${isEditing ? 'border-green-300 focus:ring-2 focus:ring-green-200' : 'border-gray-200'}
                                                        `}
                                                    />
                                                    <label
                                                        className="block text-sm font-medium text-gray-700 capitalize">
                                                        Tên tài khoản
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={user.name}
                                                        readOnly={!isEditing}
                                                        className={`
                                                            w-full 
                                                            px-3 
                                                            py-2 
                                                            border 
                                                            rounded-lg 
                                                            text-gray-700
                                                            ${!isEditing ? 'bg-gray-50' : 'bg-white'}
                                                            ${isEditing ? 'border-green-300 focus:ring-2 focus:ring-green-200' : 'border-gray-200'}
                                                        `}
                                                    />
                                                    <label
                                                        className="block text-sm font-medium text-gray-700 capitalize">
                                                        Tên tài khoản
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={user.name}
                                                        readOnly={!isEditing}
                                                        className={`
                                                            w-full 
                                                            px-3 
                                                            py-2 
                                                            border 
                                                            rounded-lg 
                                                            text-gray-700
                                                            ${!isEditing ? 'bg-gray-50' : 'bg-white'}
                                                            ${isEditing ? 'border-green-300 focus:ring-2 focus:ring-green-200' : 'border-gray-200'}
                                                        `}
                                                    />
                                                    <label
                                                        className="block text-sm font-medium text-gray-700 capitalize">
                                                        Tên tài khoản
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={user.name}
                                                        readOnly={!isEditing}
                                                        className={`
                                                            w-full 
                                                            px-3 
                                                            py-2 
                                                            border 
                                                            rounded-lg 
                                                            text-gray-700
                                                            ${!isEditing ? 'bg-gray-50' : 'bg-white'}
                                                            ${isEditing ? 'border-green-300 focus:ring-2 focus:ring-green-200' : 'border-gray-200'}
                                                        `}
                                                    />
                                                </div>

                                            )}
                                        </div>

                                        <div className="flex gap-3 mt-6">
                                            <button
                                                onClick={() => setIsEditing(!isEditing)}
                                                className={`
                                                    px-4 
                                                    py-2 
                                                    rounded-lg
                                                    flex 
                                                    items-center 
                                                    gap-2
                                                    transition-colors
                                                    ${isEditing
                                                    ? 'bg-green-500 hover:bg-green-600 text-white'
                                                    : 'bg-blue-500 hover:bg-blue-600 text-white'}
                                                `}
                                            >
                                                {isEditing ? <Save size={18}/> : <Edit size={18}/>}
                                                {isEditing ? 'Lưu' : 'Sửa'}
                                            </button>

                                            {isEditing && (
                                                <button
                                                    onClick={() => setIsEditing(false)}
                                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                                                >
                                                    <X size={18}/>
                                                    Hủy
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Quản lý đơn hàng' && (
                            <OrderManagement data={orders}/>
                        )}

                        {activeTab === 'Chi tiết đơn hàng' && (
                            <div className="max-w-2xl">
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#034292] transition-all duration-200"
                                        placeholder="Nhập Order ID"
                                        value={orderDetailId}
                                        onChange={(e) => setOrderDetailId(e.target.value)}
                                    />
                                    <button
                                        onClick={() => getOrderById(orderDetailId)}
                                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                                    >
                                        Tìm kiếm
                                    </button>
                                </div>

                                {orderDetail && (
                                    <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-3">
                                        <p className="text-sm"><span
                                            className="font-medium">Mã đơn hàng:</span> {orderDetail._id}</p>
                                        <p className="text-sm">Chi tiết đơn hàng</p>

                                        <table>
                                            <thead>
                                            <tr>
                                                <th>Hình ảnh</th>
                                                <th>Màu chọn</th>
                                                <th>Size chọn</th>
                                                <th>Số lượng</th>
                                                <th>Giá</th>
                                            </tr>
                                            </thead>
                                            {orderDetail.items.map((item: any, index: number) => (
                                                    <tbody key={index}>
                                                    <tr>
                                                        <td>
                                                            <Image
                                                                src={`assets/images/${item.productId.image}`}
                                                                alt={`${item.productId.name}`}
                                                                width={100}
                                                                height={100}>
                                                            </Image>
                                                        </td>
                                                        <td>{item.selectedColor}</td>
                                                        <td>{item.selectedSize}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{item.price}</td>
                                                    </tr>
                                                    </tbody>
                                                )
                                            )}
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}