"use client";

import { createContext, useContext, useState } from "react";

// Tạo Context
const VoucherContext = createContext();

export const VoucherProvider = ({ children }) => {
  const [voucher, setVoucher] = useState(null);

  // Danh sách voucher hợp lệ
  const validVouchers = {
    SALE15: { discount: 50, description: "Giảm 15% đơn hàng" },
    FREESHIP: { discount: 0, description: "Miễn phí vận chuyển" },
  };

  // Hàm áp dụng voucher
  const applyVoucher = (code) => {
    if (validVouchers[code]) {
      setVoucher(validVouchers[code]);
    } else {
      setVoucher(null);
      alert("Mã voucher không hợp lệ!");
    }
  };

  return (
    <VoucherContext.Provider value={{ voucher, applyVoucher }}>
      {children}
    </VoucherContext.Provider>
  );
};

// Hook dùng voucher
export const useVoucher = () => useContext(VoucherContext);
