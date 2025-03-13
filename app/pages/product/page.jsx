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
  const [dropDownFiltered, setDropDownFiltered] = useState([]); // Lưu kết quả từ DropDown
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
          setDropDownFiltered(data); // Khởi tạo từ dữ liệu gốc
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

  // Tổng hợp các bộ lọc
  const applyAdditionalFilters = useCallback(
    (baseProducts) => {
      let result = [...baseProducts];

      // Lọc theo giá
      result = result.filter(
        (product) =>
          (product.price || 0) >= priceRange.min && (product.price || 0) <= priceRange.max
      );

      // Lọc theo tìm kiếm
      if (searchQuery.trim()) {
        result = result.filter((product) =>
          (product?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      console.log("Final filtered:", result); // Debug
      return result;
    },
    [priceRange, searchQuery]
  );

  // Xử lý từ DropDown
  const handleDropDownChange = useCallback(
    (filteredFromDropDown) => {
      setDropDownFiltered(filteredFromDropDown); // Lưu kết quả từ DropDown
      const finalFiltered = applyAdditionalFilters(filteredFromDropDown);
      setFilteredProducts(finalFiltered);
      setCurrentPage(1);
    },
    [applyAdditionalFilters]
  );

  // Xử lý tìm kiếm
  const handleSearch = useCallback(
    (query) => {
      setSearchQuery(query);
      const finalFiltered = applyAdditionalFilters(dropDownFiltered); // Dùng kết quả từ DropDown
      setFilteredProducts(finalFiltered);
      setCurrentPage(1);
    },
    [dropDownFiltered, applyAdditionalFilters]
  );

  // Xử lý lọc giá
  const handlePriceChange = useCallback(
    ({ min, max }) => {
      setPriceRange({ min, max });
      const finalFiltered = applyAdditionalFilters(dropDownFiltered); // Dùng kết quả từ DropDown
      setFilteredProducts(finalFiltered);
      setCurrentPage(1);
    },
    [dropDownFiltered, applyAdditionalFilters]
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
    <div className="flex justify-center bg-gray-100">
      <div className="min-h-[100vh] max-w-[1440px] flex gap-6 my-20 px-6">
        <div className="w-[25%] hidden lg:block">
          <div className="space-y-5">
            {[
              { icon: faListCheck, title: "Danh mục", content: <Sidebar /> },
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

        <div className="w-full lg:w-[70%]">
          <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-400 to-blue-600 text-white py-4 px-5 rounded-lg shadow-md">
            <div className="flex gap-x-4">
              <DropDown products={initialProducts} onChange={handleDropDownChange} />
            </div>
            <div className="mt-3 md:mt-0">
              <SearchComponent onSearch={handleSearch} />
            </div>
          </div>

          <div className="my-5 text-gray-900 text-lg font-medium">
            Kết quả tìm kiếm:{" "}
            <span className="text-blue-600">{filteredProducts.length} sản phẩm</span>
          </div>

          <Product products={currentProducts} limit={productsPerPage} />

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