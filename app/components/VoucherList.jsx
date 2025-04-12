"use client";

import React, { useState, useEffect } from "react";

const VoucherFloatingButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null); // Track which voucher code was copied

  // Fetch dữ liệu voucher từ API
  useEffect(() => {
    const fetchVouchers = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://datn-api-production.up.railway.app/voucher");
        if (!response.ok) {
          throw new Error("Lỗi khi lấy dữ liệu");
        }
        const data = await response.json();
        setVouchers(data); // Lưu dữ liệu vào state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []); // Gọi API khi component mount

  // Hàm xử lý khi click vào nút nổi
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Hàm xử lý sao chép mã voucher
  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code); // Mark this code as copied
      setTimeout(() => setCopiedCode(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Lỗi khi sao chép:", err);
    }
  };

  return (
    <div className="relative">
      {/* Nút nổi */}
      <button
        onClick={toggleModal}
        className="fixed bottom-16 right-8 bg-blue-600 text-white rounded-full px-4 py-2 flex items-center justify-center shadow-lg hover:bg-blue-700 transition duration-300 z-20"
      >
        <span className="text-base font-semibold">Voucher</span>
      </button>

      {/* Bảng thông báo voucher */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Danh sách Voucher</h2>
              <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Trạng thái loading hoặc lỗi */}
            {loading ? (
              <p className="text-gray-500">Đang tải dữ liệu...</p>
            ) : error ? (
              <p className="text-red-500">Lỗi: {error}</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {vouchers.length > 0 ? (
                  vouchers.map((voucher, index) => (
                    <div
                      key={voucher.id || `${voucher.code}-${index}`}
                      className="border p-4 rounded-lg shadow-sm"
                    >
                      <p className="font-semibold text-lg">{voucher.code}</p>
                      <p className="text-gray-600">Giảm giá: {voucher.value}%</p>
                      {/* <p className="text-gray-500 text-sm">Thời hạn: {voucher.status}</p> */}
                      <button
                        onClick={() => handleCopy(voucher.code)}
                        className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition duration-300"
                      >
                        {copiedCode === voucher.code ? "Đã sao chép!" : "Sao chép"}
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Hiện tại không có voucher nào.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherFloatingButton;