"use client";
import { useState } from "react";
import { useVoucher } from "../pages/context/page";

export default function VoucherInput() {
    const [code, setCode] = useState("");
    const { voucher, applyVoucher } = useVoucher();

    return (
        <div className="mt-4 p-4 border rounded-lg bg-gray-100 w-full max-w-md">
            <h3 className="text-lg font-medium mb-2">Nhập mã giảm giá</h3>
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-1 p-2 border rounded-md focus:ring focus:ring-blue-400"
                    placeholder="Nhập mã..."
                />
                <button
                    onClick={() => applyVoucher(code)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Áp dụng
                </button>
            </div>

            {/* Hiển thị thông tin voucher nếu có */}
            {voucher && (
                <p className="mt-2 text-green-600 font-medium">
                    ✅ {voucher.description}
                </p>
            )}
        </div>
    );
}