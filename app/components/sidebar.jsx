"use client";

import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faBars } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({ products = [], onCategoryChange, initialCategory = "all" }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile toggle state
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Sync selectedCategory with initialCategory from URL query
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  // Memoize category list to prevent recalculation
  const categories = useMemo(() => {
    return [
      "all",
      ...new Set(products.map((p) => p.category?.categoryName).filter(Boolean)),
    ].filter((value, index, self) => self.indexOf(value) === index);
  }, [products]);

  // Filter products by category
  const filterProductsByCategory = (category) => {
    let filtered = [...products];
    if (category && category !== "all") {
      filtered = filtered.filter((product) => product.category?.categoryName === category);
    }
    return filtered;
  };

  // Update filtered products when category changes
  useEffect(() => {
    const filteredProducts = filterProductsByCategory(selectedCategory);
    onCategoryChange(filteredProducts);
  }, [selectedCategory, products, onCategoryChange]);

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (isSidebarOpen) setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  // Toggle sidebar visibility on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Mobile toggle button */}
      <button
        className="sm:hidden p-2 text-gray-700 focus:outline-none"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Đóng sidebar" : "Mở sidebar"}
        aria-expanded={isSidebarOpen}
      >
        <FontAwesomeIcon icon={faBars} className="text-xl" />
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-white shadow-lg transition-transform sm:static sm:w-full sm:h-auto sm:shadow-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar danh mục sản phẩm"
        aria-hidden={!isSidebarOpen && !window.matchMedia("(min-width: 640px)").matches}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium text-sm">
            {categories.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => handleCategoryClick(category)}
                  className={`w-full flex items-center p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-blue-200 dark:hover:bg-gradient-to-r from-cyan-500 via-gray-800/50 to-blue-400 group ${
                    selectedCategory === category ? "bg-blue-200 text-gray-900" : ""
                  }`}
                  aria-current={selectedCategory === category ? "true" : undefined}
                >
                  <span className="mr-2">
                    {selectedCategory === category ? (
                      <FontAwesomeIcon icon={faCaretRight} />
                    ) : (
                      " "
                    )}
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

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
}