"use client";

import { useState, useEffect, useMemo } from "react";

export default function DropDown({ products = [], onChange }) {
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("all");

  // Danh sách các tùy chọn lọc
  const filterOptions = [
    { value: "all", label: "Tất cả sản phẩm" },
    { value: "hot", label: "Sản phẩm hot" },
    { value: "new", label: "Sản phẩm mới" },
    { value: "discount", label: "Sản phẩm được ưu đãi" },
  ];

  // Hàm lọc và sắp xếp sản phẩm
  const filterAndSortProducts = (sort = sortOption, filter = filterOption) => {
    let filtered = [...products];

    // Lọc theo tùy chọn
    switch (filter) {
      case "hot":
        filtered = filtered.filter((product) => product?.hot === true);
        break;
      case "new": // Sửa từ "isNew" thành "new" để khớp với filterOptions
        filtered = filtered.filter((product) => product?.isNew === true);
        break;
      case "discount":
        filtered = filtered.filter(
          (product) =>
            product?.oldPrice &&
            product?.price &&
            product.oldPrice > product.price
        );
        break;
      case "all":
      default:
        break;
    }

    // Sắp xếp
    switch (sort) {
      case "price-asc":
        filtered.sort((a, b) => (a?.price || 0) - (b?.price || 0));
        break;
      case "price-desc":
        filtered.sort((a, b) => (b?.price || 0) - (a?.price || 0));
        break;
      case "name-asc":
        filtered.sort((a, b) => (a?.name || "").localeCompare(b?.name || ""));
        break;
      case "name-desc":
        filtered.sort((a, b) => (b?.name || "").localeCompare(a?.name || ""));
        break;
      default:
        break;
    }

    console.log("DropDown filtered:", filtered); // Debug
    return filtered;
  };

  // Sử dụng useMemo để tối ưu hiệu suất (tùy chọn)
  const processedProducts = useMemo(
    () => filterAndSortProducts(),
    [products, sortOption, filterOption]
  );

  // Gửi danh sách ban đầu khi mount hoặc products thay đổi
  useEffect(() => {
    if (typeof onChange === "function") {
      onChange(processedProducts);
    }
  }, [processedProducts, onChange]);

  // Xử lý thay đổi sort
  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortOption(newSort);
    if (typeof onChange === "function") {
      onChange(filterAndSortProducts(newSort, filterOption));
    }
  };

  // Xử lý thay đổi filter
  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilterOption(newFilter);
    if (typeof onChange === "function") {
      onChange(filterAndSortProducts(sortOption, newFilter));
    }
  };

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