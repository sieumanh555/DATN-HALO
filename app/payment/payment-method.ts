import {ProductCart} from "@/app/models/Product";
import User from "@/app/models/User";
import {OrderDetailResponse} from "@/app/models/OrderDetail";
import Discount from "@/app/models/Discount";

export const createOrderDetail = async (checkout: ProductCart[]) => {
    try {
        const response = await fetch("http://localhost:3000/orderDetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                items: checkout.map((item) => ({
                    productId: item._id,
                    selectedSize: item.selectedSize,
                    selectedColor: item.selectedColor,
                    quantity: item.quantityy,
                    price: item.price
                }))
            })
        })
        const data = await response.json();
        if (!response.ok) {
            console.log(">>> Lỗi tạo chi tiết đơn hàng: ", data);
            return;
        }
        return data
    } catch (error) {
        console.log(">>> Lỗi : ", error);
    }
};

export const createOrder = async (user: User, orderDetail: OrderDetailResponse, total: number, discount: Discount, address: string, paymentMethod: string, shipping: number) => {
    try {
        if (user && user._id) {
            const {_id: userId} = user;
            const response = await fetch("http://localhost:3000/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,
                    orderDetailId: orderDetail._id,
                    amount: total,
                    discountId: discount._id,
                    address: address,
                    paymentMethod: paymentMethod,
                    paymentStatus: "Uncompleted",
                    shipping: shipping,
                    status: "Processing"
                })
            })
            const data = await response.json()
            if (!response.ok) {
                console.log(">>> Lỗi tạo đơn hàng: ", data);
                return;
            }
            return data;
        }
    } catch (error) {
        console.log(">>> Lỗi : ", error);
    }
};

export const codPayment = async (checkout: ProductCart[], user: User, total: number, discount: Discount, address: string, paymentMethod: string, shipping: number) => {
    const orderDetail = await createOrderDetail(checkout);
    return await createOrder(user, orderDetail.data, total, discount, address, paymentMethod, shipping);
}

export const zaloPayment = async (checkout: ProductCart[], user: User, total: number, discount: Discount, address: string, paymentMethod: string, shipping: number) => {
    try {
        const createOrder = {
            products: [...checkout],
            total: total,
            orderDescription: "Tạo đơn hàng",
            orderInfo: {}
        }
        console.log("XXX", createOrder);
        const response = await fetch("http://localhost:3000/checkouts/zaloPay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(createOrder)
        })

        const createOrderRes = await response.json();

        if (!response.ok) {
            console.log("Tạo đơn hàng thất bại: ", createOrderRes);
            return;
        }
        return createOrderRes;
    } catch (error) {
        console.log(">>> Lỗi : ", error);
    }

}
export const creditPayment = async () => {

}

