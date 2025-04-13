//
// const order = {
//     // là object tự định nghĩa thông tin sẽ chuyển đi vd: {"sản phẩm" (tên giá số lượng), "khách hàng": (tên địa chỉ ...)}
//     item: {
//         // {...product}
//         // {...user}
//         orderTotal: amount
//     },
//     description: "test zaloPay",
//     amount: amount
// }

import {OrderRequest} from "@/app/models/Order";

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

