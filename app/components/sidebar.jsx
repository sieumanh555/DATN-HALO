"use client";

import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faBars } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({ products = [], onCategoryChange, initialCategory = "all" }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const categories = useMemo(() => {
    return [
      "all",
      ...new Set(products.map((p) => p.category?.categoryName).filter(Boolean)),
    ];
  }, [products]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category);
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

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
            {categories.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className={`w-full flex items-center p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-blue-200 ${
                    selectedCategory === category ? "bg-blue-200 text-gray-900" : ""
                  }`}
                >
                  <span className="mr-2">
                    {selectedCategory === category ? <FontAwesomeIcon icon={faCaretRight} /> : " "}
                  </span>
                  <span className="ms-1 text-left">
                    {category === "all" ? "Tất cả danh mục" : category}
                  </span>
                </button>
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