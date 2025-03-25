import type User from "./User";
import type { OrderDetailResponse } from "./OrderDetail";

export interface OrderRequest {
    _id: string,
    userId: string,
    orderDetailId: string,
    amount: number,
    status: string,
    createdAt: Date,
    updatedAt: Date
}

export interface OrderResponse {
    _id: string,
    userId: User,
    orderDetailId: OrderDetailResponse,
    amount: number,
    status: string,
    createdAt: Date,
    updatedAt: Date
}

