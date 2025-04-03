"use client"
import {useParams} from "next/navigation";
import OrderDetailComponent from "@/app/components/user-information/orderDetail";

export default function OrderDetail() {
    const {id} = useParams();
    return (
            <div className="full-shadow h-full
             '
             bg-white rounded-lg shadow-sm p-4 md:p-6">
                <h2 className="text-xl font-semibold mb-4">Chi tiết đơn hàng</h2>
                <OrderDetailComponent orderId={id as string}/>
            </div>
    )
}