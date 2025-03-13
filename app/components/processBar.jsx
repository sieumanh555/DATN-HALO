"use client";
import { useState, useEffect } from "react";

export default function PriceRange({ onPriceChange, initialMin = 0, initialMax = 5000000 }) {
  const MIN_LIMIT = 0;
  const MAX_LIMIT = 5000000;
  const STEP = 10000;

  const [minPrice, setMinPrice] = useState(initialMin);
  const [maxPrice, setMaxPrice] = useState(initialMax);
  const [formattedMinPrice, setFormattedMinPrice] = useState("");
  const [formattedMaxPrice, setFormattedMaxPrice] = useState("");

  // Cập nhật định dạng giá
  useEffect(() => {
    setFormattedMinPrice(minPrice.toLocaleString("vi-VN"));
    setFormattedMaxPrice(maxPrice.toLocaleString("vi-VN"));
  }, [minPrice, maxPrice]);

  // Gọi onPriceChange khi giá thay đổi từ người dùng
  const handleMinChange = (e) => {
    const value = Math.max(MIN_LIMIT, Math.min(Number(e.target.value), maxPrice));
    setMinPrice(value);
    onPriceChange({ min: value, max: maxPrice });
  };

  const handleMaxChange = (e) => {
    const value = Math.min(MAX_LIMIT, Math.max(Number(e.target.value), minPrice));
    setMaxPrice(value);
    onPriceChange({ min: minPrice, max: value });
  };

  const handleReset = () => {
    setMinPrice(MIN_LIMIT);
    setMaxPrice(MAX_LIMIT);
    onPriceChange({ min: MIN_LIMIT, max: MAX_LIMIT });
  };

  return (
    <div className="bg-white w-full p-4 rounded-lg shadow-md">
      <p className="text-sm font-semibold text-gray-700">Chọn khoảng giá:</p>
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">Giá thấp nhất:</label>
          <input
            type="number"
            min={MIN_LIMIT}
            max={MAX_LIMIT}
            step={STEP}
            value={minPrice}
            onChange={handleMinChange}
            className="w-32 p-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">Giá cao nhất:</label>
          <input
            type="number"
            min={MIN_LIMIT}
            max={MAX_LIMIT}
            step={STEP}
            value={maxPrice}
            onChange={handleMaxChange}
            className="w-32 p-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-700">
        Khoảng giá:
        <span className="font-semibold text-blue-600"> {formattedMinPrice}đ</span> -
        <span className="font-semibold text-blue-600"> {formattedMaxPrice}đ</span>
      </p>
      <button
        className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
        onClick={handleReset}
      >
        Đặt lại
      </button>
    </div>
  );
}