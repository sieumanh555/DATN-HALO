"use client";

import { useState, useEffect } from "react";

export default function SearchComponent({ onSearch, products }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      onSearch(products); // Nếu không có query, trả về toàn bộ danh sách
      return;
    }

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    onSearch(filteredProducts); // Truyền danh sách đã lọc ra ngoài
  };

  // Xử lý khi nhấn Enter hoặc nút tìm kiếm
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  // Tự động tìm kiếm khi searchQuery thay đổi
  useEffect(() => {
    handleSearch();
  }, [searchQuery, products]);

  return (
    <form
      className="flex items-center max-w-lg mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="relative w-full">
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full ps-10 p-2.5"
          placeholder="Tìm sản phẩm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          <svg
            className="w-5 h-5 text-gray-500 hover:text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
    </form>
  );
}