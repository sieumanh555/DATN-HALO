"use client";

import { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";

export default function PriceRange({ onPriceChange, initialMin = 0, initialMax = 5000000 }) {
  const MIN_LIMIT = 0;
  const MAX_LIMIT = 5000000;
  const STEP = 10000;

  const [minPrice, setMinPrice] = useState(initialMin);
  const [maxPrice, setMaxPrice] = useState(initialMax);
  const [formattedMinPrice, setFormattedMinPrice] = useState("");
  const [formattedMaxPrice, setFormattedMaxPrice] = useState("");

  // Định dạng giá trị tiền tệ
  const formatPrice = (value) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  // Cập nhật giá trị định dạng
  useEffect(() => {
    setFormattedMinPrice(formatPrice(minPrice));
    setFormattedMaxPrice(formatPrice(maxPrice));
  }, [minPrice, maxPrice]);

  // Xử lý thay đổi giá trị nhưng không gọi onPriceChange ngay
  const handleMinChange = (value) => {
    const newMin = Math.max(MIN_LIMIT, Math.min(Number(value), maxPrice - STEP));
    setMinPrice(newMin);
  };

  const handleMaxChange = (value) => {
    const newMax = Math.min(MAX_LIMIT, Math.max(Number(value), minPrice + STEP));
    setMaxPrice(newMax);
  };

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    onPriceChange({ min: minPrice, max: maxPrice });
  };

  // Xử lý khi nhấn Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-white w-full p-4 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label className="text-sm text-gray-700">Giá thấp nhất:</label>
          <input
            type="number"
            min={MIN_LIMIT}
            max={maxPrice - STEP}
            step={STEP}
            onChange={(e) => handleMinChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full p-2 mt-1 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="flex-1">
          <label className="text-sm text-gray-700">Giá cao nhất:</label>
          <input
            type="number"
            min={minPrice + STEP}
            max={MAX_LIMIT}
            step={STEP}

            onChange={(e) => handleMaxChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full p-2 mt-1 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
      <p className="text-sm text-gray-700">
        Khoảng giá:
        <span className="font-semibold text-blue-600"> {formattedMinPrice}</span> - 
        <span className="font-semibold text-blue-600"> {formattedMaxPrice}</span>
      </p>
      <button
        className="mt-4 w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
        onClick={handleSearch}
      >
        Tìm kiếm
      </button>
    </div>
  );
}