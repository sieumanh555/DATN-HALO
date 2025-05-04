"use client";
import { useEffect, useState } from "react";
import type { OrderResponse } from "@/app/models/Order";
import OrderManagementComponent from "@/app/components/user-information/orderManagement";
import { getUserId } from "@/app/libs/Cookie/clientSideCookie";

export default function Orders() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderResponse[]>([]);

  const getOrders = async (): Promise<OrderResponse[]> => {
    try {
      const response = await fetch("https://datn-api-production.up.railway.app/order");
      if (!response.ok) {
        const data = await response.json();
        console.log("Lỗi từ server:", data.message);
        return [];
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Lỗi fetch orders client:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersData = await getOrders();
      setOrders(ordersData);
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const userId = getUserId();
    if (userId) {
      const filtered = orders.filter((order) => order.userId._id === userId);
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders([]);
    }
  }, [orders]);

  return (
    <div className="full-shadow h-full bg-white rounded-lg shadow-sm p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Quản lý đơn hàng</h2>
      <OrderManagementComponent data={filteredOrders} />
    </div>
  );
}
