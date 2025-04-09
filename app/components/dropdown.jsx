"use client";

import { useState, useEffect } from "react";

export default function DropDown({ onSortChange, onFilterChange, sortOption, filterOption }) {
  const filterOptions = [
    { value: "all", label: "Tất cả sản phẩm" },
    { value: "hot", label: "Sản phẩm hot" },
    { value: "new", label: "Sản phẩm mới" },
    { value: "discount", label: "Sản phẩm được ưu đãi" },
  ];

  const handleSortChange = (e) => onSortChange(e.target.value);
  const handleFilterChange = (e) => onFilterChange(e.target.value);

  return (
    <div className="flex gap-4">
      <select
        aria-label="Sort products"
        className="text-gray-900 bg-gray-50 border-2 border-gray-900/40 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3"
        value={sortOption}
        onChange={handleSortChange}
      >
        <option value="" disabled hidden>
          Sắp xếp
        </option>
        <option value="">Mặc định</option>
        <option value="price-asc">Giá: Thấp đến cao</option>
        <option value="price-desc">Giá: Cao đến thấp</option>
        <option value="name-asc">Tên: A-Z</option>
        <option value="name-desc">Tên: Z-A</option>
      </select>
      <select
        aria-label="Filter products"
        className="text-gray-900 bg-gray-50 border-2 border-gray-900/40 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3"
        value={filterOption}
        onChange={handleFilterChange}
      >
        {filterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}