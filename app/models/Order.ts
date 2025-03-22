import type User from "./User";
import type OrderDetail from "./OrderDetail";

interface Order {
    _id: string,
    userId: string | User,
    orderDetailId: string | OrderDetail,
    amount: number,
    status: string,
    createdAt: Date,
    updatedAt: Date
}
export default Order;