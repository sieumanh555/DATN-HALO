"use client";
import { useState } from "react";

export default function Processbar() {
    const [price, setPrice] = useState(0); // Giá trị mặc định

    const handleChange = (e) => {
        setPrice(Number(e.target.value));
    };

    return (
        <div className="bg-white w-full">
            <p className="text-sm font-semibold text-gray-700">Chọn mức giá:</p>
            <div className="relative flex items-center mt-2">
                <input
                    id="price-range"
                    type="range"
                    min="0"
                    max="5000000"
                    value={price}
                    step="500000"
                    onChange={handleChange}
                    className="w-full h-4 bg-blue-200 rounded-lg appearance-none cursor-pointer transition-all duration-300"
                />
            </div>
            <p className="mt-2 text-sm text-gray-700">
                Giá hiện tại:{" "}
                <span className="font-semibold text-blue-600">
          {price.toLocaleString()}đ
        </span>
            </p>
        </div>
    );
}