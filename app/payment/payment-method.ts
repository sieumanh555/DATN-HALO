import {OrderRequest} from "@/app/models/Order";

const createOrderDetail = async () => {
    if (user && user._id) {
        const {_id: userId} = user;
        const createOrderDetail = async () => {
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
                if (response.ok) {
                    const data = await response.json();
                    const orderDetailId = data.data._id;
                    console.log("orderDetailId: ", orderDetailId);

                    setOrder({
                        userId,
                        orderDetailId: orderDetailId,
                        amount: total,
                        description: note,
                        discountId: discount?._id,
                        address: address,
                        paymentMethod: paymentMethod,
                        paymentStatus: "Uncompleted",
                        shipping: shipping,
                        status: "Processing"
                    })
                }
            } catch (err) {
                console.log(">>>Lỗi tạo chi tiết đơn hàng: ", err);
            }
        }
        createOrderDetail();
    }
}

export const codPayment = async (order: OrderRequest) => {
    const response = await fetch("http://localhost:3000/orders", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    });

    const data = await response.json();
    if (response.ok) {

    }
}
export const zaloPayment = async () => {

}

export const creditPayment = async () => {

}

