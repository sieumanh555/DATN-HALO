import React, { useState } from "react";

const vouchers = [
    { code: "PEAK10", discount: "10K", condition: "500k", expiry: "31/03/2025" },
    { code: "PEAK50", discount: "50K", condition: "1500k", expiry: "31/03/2025" },
    { code: "PEAK100", discount: "100K", condition: "2500k", expiry: "31/03/2025" },
    { code: "PEAK200", discount: "200K", condition: "4000k", expiry: "31/03/2025" },
];

const VoucherList = () => {
    const [copiedVoucher, setCopiedVoucher] = useState(null);

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedVoucher(code);

        // Đặt timeout để reset lại nút sau 10 giây
        setTimeout(() => {
            setCopiedVoucher(null);
        }, 3000);
    };

    return (
        <div className="my-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Khuyến Mãi Hấp Dẫn</h2>
            <div className="grid grid-cols-4 gap-4">
                {vouchers.map((voucher, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-4 border border-gray-200 text-center">
                        <p className="text-blue-600 font-semibold">NHẬP MÃ: {voucher.code}</p>
                        <p className="text-gray-600 text-sm">Giảm {voucher.discount} cho đơn hàng từ {voucher.condition}</p>

                        <div className="flex justify-center my-2">
                            <div className="bg-blue-500 text-white w-16 h-16 flex flex-col items-center justify-center rounded-md">
                                <span className="text-xs">VOUCHER</span>
                                <span className="text-lg font-bold">{voucher.discount}</span>
                            </div>
                        </div>

                        <p className="text-gray-500 text-sm">Mã: <strong>{voucher.code}</strong></p>
                        <p className="text-gray-500 text-sm">HSD: {voucher.expiry}</p>

                        <button
                            onClick={() => copyToClipboard(voucher.code)}
                            className={`mt-2 px-4 py-1 rounded-md transition ${
                                copiedVoucher === voucher.code ? "bg-blue-300 text-white" : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                        >
                            {copiedVoucher === voucher.code ? "Đã sao chép" : "Sao chép"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VoucherList;