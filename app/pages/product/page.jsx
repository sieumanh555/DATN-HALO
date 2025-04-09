"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000000 });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const productsPerPage = 9;
  const maxPrice = 5000000;

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/product");
        if (!response.ok) throw new Error("API không phản hồi");
        const data = await response.json();
        if (Array.isArray(data)) {
          setInitialProducts(data);
        } else {
          throw new Error("Dữ liệu không phải mảng");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filter = searchParams.get("filter");
    const category = searchParams.get("category");
    if (filter) setFilterOption(filter);
    if (category) setSelectedCategory(category);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (selectedCategory !== "all") {
      result = result.filter((product) => product.category?.categoryName === selectedCategory);
    }

    switch (filterOption) {
      case "hot":
        result = result.filter((product) => product?.hot === 1);
        break;
      case "new":
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        result = result.filter((product) => new Date(product?.createdAt) >= thirtyDaysAgo);
        break;
      case "discount":
        result = result.filter(
          (product) => product?.pricePromo && product.pricePromo < product.price
        );
        break;
      default:
        break;
    }

    result = result.filter(
      (product) =>
        (product.price || product.pricePromo || 0) >= priceRange.min &&
        (product.price || product.pricePromo || 0) <= priceRange.max
    );

    if (searchQuery.trim()) {
      result = result.filter((product) =>
        (product?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => (a.price || a.pricePromo || 0) - (b.price || b.pricePromo || 0));
        break;
      case "price-desc":
        result.sort((a, b) => (b.price || b.pricePromo || 0) - (a.price || b.pricePromo || 0));
        break;
      case "name-asc":
        result.sort((a, b) => (a?.name || "").localeCompare(b?.name || ""));
        break;
      case "name-desc":
        result.sort((a, b) => (b?.name || "").localeCompare(a?.name || ""));
        break;
      default:
        break;
    }

    return result;
  }, [initialProducts, selectedCategory, filterOption, priceRange, searchQuery, sortOption]);

  const handleCategoryChange = useCallback((category) => setSelectedCategory(category), []);
  const handleSortChange = useCallback((sort) => setSortOption(sort), []);
  const handleFilterChange = useCallback((filter) => setFilterOption(filter), []);
  const handleSearch = useCallback((query) => setSearchQuery(query), []);
  const handlePriceChange = useCallback(({ min, max }) => setPriceRange({ min, max }), []);
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setPriceRange({ min: 0, max: maxPrice });
    setSelectedCategory("all");
    setSortOption("");
    setFilterOption("all");
    setCurrentPage(1);
  }, [maxPrice]);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  if (isLoading) return <div className="text-center py-10">Đang tải...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-[1920px] flex flex-col lg:flex-row gap-6 my-6 px-[100px] lg:my-20">
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
                    initialCategory={selectedCategory}
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
                    initialMax={maxPrice}
                    min={0}
                    max={maxPrice}
                  />
                ),
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl shadow-md">
                <div className="flex items-center gap-4 text-gray-900 bg-gradient-to-r from-blue-400 to-blue-600 py-4 px-4 rounded-t-xl">
                  <FontAwesomeIcon icon={item.icon} className="text-[24px] text-white" />
                  <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                </div>
                <div className="p-4">{item.content}</div>
              </div>
            ))}
            <button
              onClick={resetFilters}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 rounded-lg mt-4"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-[75%]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gradient-to-r from-blue-400 to-blue-600 text-white py-4 px-5 rounded-lg shadow-md gap-4 sm:gap-0">
            <div className="w-full sm:w-auto">
              <DropDown
                onSortChange={handleSortChange}
                onFilterChange={handleFilterChange}
                sortOption={sortOption}
                filterOption={filterOption}
              />
            </div>
            <div className="w-full sm:w-auto">
              <SearchComponent onSearch={handleSearch} initialQuery={searchQuery} />
            </div>
          </div>

          <div className="my-5 text-gray-900 text-base sm:text-lg font-medium text-center sm:text-left">
            Kết quả tìm kiếm:{" "}
            <span className="text-blue-600">{filteredProducts.length} sản phẩm</span>
          </div>

          <div className="">
            <Product products={currentProducts} limit={productsPerPage} columns={3} />
          </div>

          {filteredProducts.length > 0 ? (
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={currentPage}
                setCurrentPage={handlePageChange}
                totalProducts={filteredProducts.length}
                productsPerPage={productsPerPage}
              />
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              Không tìm thấy sản phẩm nào phù hợp.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}