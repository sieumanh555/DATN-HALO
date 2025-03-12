"use client";

import { useState, useEffect } from "react";

export default function DropDown({ onChange }) {
  const [initialProducts, setInitialProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [categoryOption, setCategoryOption] = useState("all");

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setInitialProducts(data);
          // onChange(data);
        } else {
          setInitialProducts([]);
          onChange([]);
        }
      })
      .catch((error) => console.error("Lỗi khi fetch API:", error));
  }, [onChange]);

  const handleProductsChange = () => {
    let filteredProducts = [...initialProducts];

    if (categoryOption && categoryOption !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === categoryOption
      );
    }

    switch (sortOption) {
      case "price-asc":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    onChange(filteredProducts);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    handleProductsChange();
  };

  const handleCategoryChange = (event) => {
    setCategoryOption(event.target.value);
    handleProductsChange();
  };

  useEffect(() => {
    handleProductsChange();
  }, [sortOption, categoryOption]);

  return (
    <div className="flex gap-4">
      <select
        className="text-gray-900 bg-gray-50 border-2 border-gray-900/40 focus:ring-4 focus:ring-blue-300 
        font-medium rounded-lg text-sm px-4 py-3 dark:bg-gray-50 dark:focus:ring-gray-800"
        value={sortOption}
        onChange={handleSortChange}
      >
        <option value="" disabled hidden>
          Sắp xếp
        </option>
        <option value="">Sắp xếp</option>
        <option value="price-asc">Giá: Thấp đến cao</option>
        <option value="price-desc">Giá: Cao đến thấp</option>
        <option value="name-asc">Tên: A-Z</option>
        <option value="name-desc">Tên: Z-A</option>
      </select>

      <select
        className="text-gray-900 bg-gray-50 border-2 border-gray-900/40 focus:ring-4 focus:ring-blue-300 
        font-medium rounded-lg text-sm px-4 py-3 dark:bg-gray-50 dark:focus:ring-gray-800"
        value={categoryOption}
        onChange={handleCategoryChange}
      >
        <option value="" disabled hidden>
          Danh mục
        </option>
        <option value="all">Tất cả</option>
        <option value="Giày Nam">Giày Nam</option>
        <option value="Giày Nữ">Giày Nữ</option>
        <option value="Phụ kiện">Phụ kiện</option>
      </select>
    </div>
  );
}