"use client";
import { useState } from "react";

export default function DropDown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Nút dropdown */}
      <button
        onClick={toggleDropdown}
        className="bg-white hover:bg-gray-300 transition duration-300 text-gray-900 focus:ring-4 focus:ring-blue-300 
        font-medium rounded-lg text-sm px-6 py-3 flex items-center border-2 border-gray-300"
        type="button"
      >
        Chọn chức năng
        <svg
          className="w-3 h-3 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          className="absolute mt-2 w-48 bg-white text-blue-900 border border-gray-300 rounded-lg shadow-lg z-10"
        >
          <ul className="py-2 text-sm">
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-blue-100 rounded-t-lg"
              >
                Bảng điều khiển
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-blue-100"
              >
                Cài đặt
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-blue-100"
              >
                Thu nhập
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-red-100 text-red-600 rounded-b-lg"
              >
                Đăng xuất
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
