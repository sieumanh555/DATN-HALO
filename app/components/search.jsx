"use client";

import { useState, useCallback } from "react";
import debounce from "lodash/debounce";

export default function SearchComponent({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useCallback(
    debounce((query) => onSearch(query), 300),
    [onSearch]
  );

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return (
    <form className="flex items-center max-w-lg mx-auto">
      <div className="relative w-full">
        <input
          type="text"
          aria-label="Tìm kiếm sản phẩm"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full ps-10 p-2.5"
          placeholder="Tìm sản phẩm"
          value={searchQuery}
          onChange={handleChange}
        />
        <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
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