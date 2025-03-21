"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons"; // Import faCaretRight

export default function Sidebar({ products = [], onCategoryChange }) {
  const [isSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Lấy danh sách danh mục từ products, thêm "Giày nam" nếu chưa có
  const categories = [
    "all",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ].filter((value, index, self) => self.indexOf(value) === index);

  // Hàm lọc sản phẩm theo danh mục
  const filterProductsByCategory = (category) => {
    let filtered = [...products];
    if (category && category !== "all") {
      filtered = filtered.filter((product) => product.category === category);
    }
    return filtered;
  };

  // Gửi danh sách sản phẩm đã lọc khi danh mục thay đổi hoặc products thay đổi
  useEffect(() => {
    onCategoryChange(filterProductsByCategory(selectedCategory));
  }, [products, selectedCategory, onCategoryChange]);

  // Xử lý chọn danh mục
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <aside
        id="sidebar-multi-level-sidebar"
        className={`z-40 w-full min-h-auto transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium text-sm">
            {categories.map((category) => (
              <li key={category}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick(category);
                  }}
                  className={`flex items-center p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-blue-200 dark:hover:bg-gradient-to-r from-cyan-500 via-gray-800/50 to-blue-400 group ${
                    selectedCategory === category ? "bg-blue-200 text-gray-900" : ""
                  }`}
                >
                  {/* Thêm mũi tên faCaretRight khi danh mục được chọn */}
                  <span className="mr-2">
                    {selectedCategory === category ? (
                      <FontAwesomeIcon icon={faCaretRight} />
                    ) : (
                      " "
                    )}
                  </span>
                  <span className="ms-1">
                    {category === "all" ? "Tất cả danh mục" : category}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}