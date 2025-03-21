"use client";

import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import SearchComponent from "@/app/components/search";
import DropDown from "@/app/components/dropdown";
import Product from "@/app/components/product";
import Pagination from "@/app/components/pagination";
import Sidebar from "@/app/components/sidebar";
import PriceRange from "@/app/components/processBar";

export default function Products() {
  const [initialProducts, setInitialProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000000 });
  const [categoryFiltered, setCategoryFiltered] = useState([]);
  const productsPerPage = 9;

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/products")
      .then((response) => {
        if (!response.ok) throw new Error("API không phản hồi");
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setInitialProducts(data);
          setFilteredProducts(data);
          setCategoryFiltered(data);
        } else {
          throw new Error("Dữ liệu không phải mảng");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi fetch products:", error);
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const applyAdditionalFilters = useCallback(
    (baseProducts) => {
      let result = [...baseProducts];
      result = result.filter(
        (product) =>
          (product.price || 0) >= priceRange.min && (product.price || 0) <= priceRange.max
      );
      if (searchQuery.trim()) {
        result = result.filter((product) =>
          (product?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return result;
    },
    [priceRange, searchQuery]
  );

  const handleCategoryChange = useCallback(
    (filteredFromSidebar) => {
      setCategoryFiltered(filteredFromSidebar);
      const finalFiltered = applyAdditionalFilters(filteredFromSidebar);
      setFilteredProducts(finalFiltered);
      setCurrentPage(1);
    },
    [applyAdditionalFilters]
  );

  const handleSortChange = useCallback(
    (filteredFromDropDown) => {
      const finalFiltered = applyAdditionalFilters(filteredFromDropDown);
      setFilteredProducts(finalFiltered);
      setCurrentPage(1);
    },
    [applyAdditionalFilters]
  );

  const handleSearch = useCallback(
    (query) => {
      setSearchQuery(query);
      const finalFiltered = applyAdditionalFilters(categoryFiltered);
      setFilteredProducts(finalFiltered);
      setCurrentPage(1);
    },
    [categoryFiltered, applyAdditionalFilters]
  );

  const handlePriceChange = useCallback(
    ({ min, max }) => {
      setPriceRange({ min, max });
      const finalFiltered = applyAdditionalFilters(categoryFiltered);
      setFilteredProducts(finalFiltered);
      setCurrentPage(1);
    },
    [categoryFiltered, applyAdditionalFilters]
  );

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  if (isLoading) return <div className="text-center py-10">Đang tải...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-[1440px] flex flex-col lg:flex-row gap-6 my-6 px-4 sm:px-6 lg:px-[100px] lg:my-20">
        {/* Sidebar */}
        <div className="w-full lg:w-[25%]">
          <div className="space-y-5">
            {[
              {
                icon: faListCheck,
                title: "Danh mục",
                content: (
                  <Sidebar
                    products={initialProducts}
                    onCategoryChange={handleCategoryChange}
                  />
                ),
              },
              {
                icon: faMoneyBill,
                title: "Theo giá",
                content: (
                  <PriceRange
                    onPriceChange={handlePriceChange}
                    initialMin={0}
                    initialMax={5000000}
                  />
                ),
              },
              
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md">
                <div className="flex items-center gap-4 text-gray-900 bg-gradient-to-r from-blue-400 to-blue-600 py-4 px-4 rounded-t-xl">
                  <FontAwesomeIcon icon={item.icon} className="text-[24px] text-white" />
                  <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                </div>
                <div className="p-4">{item.content}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-[75%]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gradient-to-r from-blue-400 to-blue-600 text-white py-4 px-5 rounded-lg shadow-md gap-4 sm:gap-0">
            <div className="w-full sm:w-auto">
              <DropDown products={initialProducts} onChange={handleSortChange} />
            </div>
            <div className="w-full sm:w-auto">
              <SearchComponent onSearch={handleSearch} />
            </div>
          </div>

          <div className="my-5 text-gray-900 text-base sm:text-lg font-medium text-center sm:text-left">
            Kết quả tìm kiếm:{" "}
            <span className="text-blue-600">{filteredProducts.length} sản phẩm</span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Product products={currentProducts} limit={productsPerPage} />
          </div>

          {filteredProducts.length > 0 && (
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={currentPage}
                setCurrentPage={handlePageChange}
                totalProducts={filteredProducts.length}
                productsPerPage={productsPerPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}