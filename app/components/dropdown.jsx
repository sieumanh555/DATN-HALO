"use client";

import { useState, useEffect, useMemo } from "react";

export default function DropDown({ onChange }) {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Danh sách các tùy chọn lọc
  const filterOptions = [
    { value: "all", label: "Tất cả sản phẩm" },
    { value: "hot", label: "Sản phẩm hot" },
    { value: "new", label: "Sản phẩm mới" },
    { value: "discount", label: "Sản phẩm được ưu đãi" },
  ];

  // Fetch data từ API khi component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/product");
        if (!response.ok) {
          throw new Error("Không thể tải dữ liệu sản phẩm");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  
  // Hàm lọc và sắp xếp sản phẩm
  const filterAndSortProducts = (sort = sortOption, filter = filterOption) => {
    let filtered = [...products];

    // Lọc theo tùy chọn
    switch (filter) {
      case "hot":
        filtered = filtered.filter((product) => product?.hot === 1); // Sửa từ true thành 1
        break;
      case "new":
        // Giả định sản phẩm mới dựa trên createdAt (ví dụ: trong vòng 30 ngày)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        filtered = filtered.filter(
          (product) => new Date(product?.createdAt) >= thirtyDaysAgo
        );
        break;
      case "discount":
        filtered = filtered.filter(
          (product) =>
            product?.pricePromo &&
            product?.price &&
            product.pricePromo < product.price
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

    return filtered;
  };

  // Sử dụng useMemo để tối ưu hiệu suất
  const processedProducts = useMemo(
    () => filterAndSortProducts(),
    [products, sortOption, filterOption]
  );

  // Gửi danh sách sản phẩm đã xử lý khi thay đổi
  useEffect(() => {
    if (typeof onChange === "function" && !loading) {
      onChange(processedProducts);
    }
  }, [processedProducts, onChange, loading]);

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

  // Hiển thị loading hoặc error nếu có
  if (loading) return <div>Đang tải sản phẩm...</div>;
  if (error) return <div>Lỗi: {error}</div>;

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