"use client";

import { useState, useEffect } from "react";

export default function DropDown({ products = [], onChange }) {
  const [sortOption, setSortOption] = useState("");
  const [categoryOption, setCategoryOption] = useState("all");

  // Lấy danh sách danh mục từ products
  const categories = ["all", ...new Set(products.map((p) => p.category).filter(Boolean))];

  // Hàm lọc và sắp xếp sản phẩm
  const filterAndSortProducts = (sort = sortOption, category = categoryOption) => {
    let filtered = [...products];

    // Lọc theo danh mục
    if (category && category !== "all") {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Sắp xếp
    switch (sort) {
      case "price-asc":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-desc":
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "name-asc":
        filtered.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "name-desc":
        filtered.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
        break;
      default:
        break;
    }

    console.log("DropDown filtered:", filtered); // Debug
    return filtered;
  };

  // Gửi danh sách ban đầu khi mount hoặc products thay đổi
  useEffect(() => {
    onChange(filterAndSortProducts());
  }, [products, onChange]);

  // Xử lý thay đổi sort
  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortOption(newSort);
    onChange(filterAndSortProducts(newSort, categoryOption));
  };

  // Xử lý thay đổi category
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategoryOption(newCategory);
    onChange(filterAndSortProducts(sortOption, newCategory));
  };

  return (
    <div className="flex gap-4">
      <select
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
        className="text-gray-900 bg-gray-50 border-2 border-gray-900/40 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3"
        value={categoryOption}
        onChange={handleCategoryChange}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category === "all" ? "Tất cả" : category}
          </option>
        ))}
      </select>
    </div>
  );
}