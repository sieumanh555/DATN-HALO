"use client";

import { useState, useEffect } from "react";

export default function DropDown({
                                     onSortChange = () => {},
                                     onFilterChange = () => {},
                                     onGenderChange = () => {},
                                     sortOption = "",
                                     filterOption = "all",
                                     genderOption = "all",
                                 }) {
    const filterOptions = [
        { value: "all", label: "Tất cả sản phẩm" },
        { value: "hot", label: "Sản phẩm hot" },
        { value: "new", label: "Sản phẩm mới" },
        { value: "discount", label: "Sản phẩm được ưu đãi" },
    ];

    const genderOptions = [
        { value: "all", label: "Tất cả giới tính" },
        { value: "Nam", label: "Giày Nam" },
        { value: "Nữ", label: "Giày Nữ" },
    ];

    const handleSortChange = (e) => onSortChange(e.target.value);
    const handleFilterChange = (e) => onFilterChange(e.target.value);
    const handleGenderChange = (e) => onGenderChange(e.target.value);

    return (
        <>
            <select
                aria-label="Sort products"
                className="text-gray-900 bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium rounded-lg text-sm px-4 py-2.5 w-full"
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
                className="text-gray-900 bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium rounded-lg text-sm px-4 py-2.5 w-full"
                value={filterOption}
                onChange={handleFilterChange}
            >
                {filterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <select
                aria-label="Filter by gender"
                className="text-gray-900 bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium rounded-lg text-sm px-4 py-2.5 w-full"
                value={genderOption}
                onChange={handleGenderChange}
            >
                {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </>
    );
}