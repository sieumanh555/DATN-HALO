"use client";

import { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";

export default function PriceRange({ onPriceChange, initialMin = 0, initialMax = 5000000 }) {
  const MIN_LIMIT = 0;
  const MAX_LIMIT = 5000000;
  const STEP = 10000;

  const safeInitialMin = Math.max(MIN_LIMIT, Math.min(Number(initialMin) || 0, MAX_LIMIT - STEP));
  const safeInitialMax = Math.min(MAX_LIMIT, Math.max(Number(initialMax) || MAX_LIMIT, MIN_LIMIT + STEP));

  const [minPrice, setMinPrice] = useState(safeInitialMin);
  const [maxPrice, setMaxPrice] = useState(safeInitialMax);
  const [formattedMinPrice, setFormattedMinPrice] = useState("");
  const [formattedMaxPrice, setFormattedMaxPrice] = useState("");

  const formatPrice = (value) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  useEffect(() => {
    setFormattedMinPrice(formatPrice(minPrice));
    setFormattedMaxPrice(formatPrice(maxPrice));
  }, [minPrice, maxPrice]);

  const handleMinChange = (value) => {
    const newMin = Math.max(MIN_LIMIT, Math.min(Number(value) || 0, maxPrice - STEP));
    setMinPrice(newMin);
  };

  const handleMaxChange = (value) => {
    const newMax = Math.min(MAX_LIMIT, Math.max(Number(value) || 0, minPrice + STEP));
    setMaxPrice(newMax);
  };

  const debouncedSearch = useCallback(
    debounce(() => onPriceChange({ min: minPrice, max: maxPrice }), 300),
    [minPrice, maxPrice, onPriceChange]
  );

  useEffect(() => {
    debouncedSearch();
  }, [minPrice, maxPrice, debouncedSearch]);

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
            value={minPrice}
            onChange={(e) => handleMinChange(e.target.value)}
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
            value={maxPrice}
            onChange={(e) => handleMaxChange(e.target.value)}
            className="w-full p-2 mt-1 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
      <div className="mt-6">
        <div className="relative">
          <input
            type="range"
            min={MIN_LIMIT}
            max={MAX_LIMIT}
            step={STEP}
            value={minPrice}
            onChange={(e) => handleMinChange(e.target.value)}
            className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{ zIndex: 2 }}
          />
          {/* <input
            type="range"
            min={MIN_LIMIT}
            max={MAX_LIMIT}
            step={STEP}
            value={maxPrice}
            onChange={(e) => handleMaxChange(e.target.value)}
            className="absolute w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer"
            style={{ zIndex: 1 }}
          /> */}
          <div className="relative h-2 bg-gray-200 rounded-lg">
            <div
              className="absolute h-2 bg-blue-500 rounded-lg"
              style={{
                left: `${(minPrice / MAX_LIMIT) * 100}%`,
                width: `${((maxPrice - minPrice) / MAX_LIMIT) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-700 mt-4">
        Khoảng giá: <span className="font-semibold text-blue-600">{formattedMinPrice}</span> - 
        <span className="font-semibold text-blue-600">{formattedMaxPrice}</span>
      </p>
    </div>
  );
}