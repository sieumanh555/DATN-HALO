export default async function zaloPayment( products, user, amount) {
    const order = {
        // là object tự định nghĩa thông tin sẽ chuyển đi vd: {"sản phẩm" (tên giá số lượng), "khách hàng": (tên địa chỉ ...)}
        item: {
            // {...product}
            // {...user}
            orderTotal: amount
        },
        description: "test zaloPay",
        amount: amount
    }
    try {
        // send request to sever, từ server-> request zalo
        fetch('http://localhost:3000/checkout', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
        })
            .then((res) => res.json())
            .then(data => {
                //khi config
                console.log("Response data: ", data);
                window.location.href = data.order_url;
            })
            .catch((error) => {
                console.log("Lỗi request to server: ", error)
            })
    } catch(error){
        console.log(error)
    }

}
