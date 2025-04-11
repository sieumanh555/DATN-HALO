"use client";

import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretRight } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({ products = [], onCategoryChange, initialCategory = "all" }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory === "all" ? [] : [initialCategory]
  );
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false); // Đặt mặc định là thu gọn

  const categories = useMemo(() => {
    return [
      "all",
      ...new Set(products.map((p) => p.category?.categoryName).filter(Boolean)),
    ];
  }, [products]);

  const handleCheckboxChange = (category) => {
    let updatedCategories;
    if (category === "all") {
      // Nếu chọn "Tất cả danh mục", bỏ chọn tất cả
      updatedCategories = [];
    } else {
      // Toggle category trong danh sách selectedCategories
      updatedCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories.filter((c) => c !== "all"), category];
    }

    setSelectedCategories(updatedCategories);

    // Gọi onCategoryChange với danh sách categories hoặc "all" nếu không có gì được chọn
    if (updatedCategories.length === 0) {
      onCategoryChange("all");
    } else {
      onCategoryChange(updatedCategories);
    }

    // Đóng sidebar trên mobile sau khi chọn
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const toggleCategoryExpand = () => setIsCategoryExpanded((prev) => !prev);

  return (
    <div>
      <button
        className="sm:hidden p-2 text-gray-700 focus:outline-none"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Đóng sidebar" : "Mở sidebar"}
      >
        <FontAwesomeIcon icon={faBars} className="text-xl" />
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-white shadow-lg transition-transform sm:static sm:w-full sm:h-auto sm:shadow-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium text-sm">
            {/* Tất cả danh mục */}
            <li>
              <button
                type="button"
                onClick={() => {
                  handleCheckboxChange("all");
                  toggleCategoryExpand();
                }}
                className={`w-full flex items-center p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-blue-200 ${
                  selectedCategories.length === 0 ? "bg-blue-200 text-gray-900" : ""
                }`}
              >
                <span className="mr-2">
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className={`transition-transform ${isCategoryExpanded ? "rotate-90" : ""}`}
                  />
                </span>
                <span className="ms-1 text-left">Tất cả danh mục</span>
              </button>
            </li>

            {/* Các danh mục con */}
            {isCategoryExpanded &&
              categories
                .filter((category) => category !== "all")
                .map((category) => (
                  <li key={category}>
                    <label
                      className={`w-full flex items-center p-2 pl-8 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-blue-200 ${
                        selectedCategories.includes(category)
                          ? "bg-blue-200 text-gray-900"
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCheckboxChange(category)}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ms-1 text-left">{category}</span>
                    </label>
                  </li>
                ))}
          </ul>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}