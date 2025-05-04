import {ProductCart} from "@/app/models/Product";

export const changeStock = async (product: ProductCart) => {
    try {
        // let sold = product.sold + product.quantitty;
        // let stock = product.stock - product.quantitty;
        const response = await fetch(`http://localhost:3000/products/${product._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...product})
        })
        const data = await response.json();
        if (!response.ok) {
            console.log(">>> Lỗi cập nhật số lượng sản phẩm: ", data);
            return;
        }
        return console.log("Cập nhật số lượng sản phẩm thành công");

    } catch (error) {
        console.log(">>> Lỗi : ", error);
    }
}