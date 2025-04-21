import type User from "./User";
import type Discount from "@/app/models/Discount"
import type { OrderDetailResponse } from "./OrderDetail";

export interface OrderRequest {
    _id?: string,
    userId: string,
    orderDetailId: string,
    amount: number,
    description: string,
    discountId?: string,
    address: string,
    paymentMethod: string,
    paymentStatus: string,
    shipping: number,
    status: string,
    createdAt?: Date,
    updatedAt?: Date
}

export interface OrderResponse {
    _id: string,
    uniqueKey: string,
    userId: User,
    orderDetailId: OrderDetailResponse,
    amount: number,
    description: string,
    discountId: Discount,
    address: string,
    paymentMethod: string,
    paymentStatus: string,
    shipping: number,
    status: string,
    createdAt: Date,
    updatedAt: Date
}

