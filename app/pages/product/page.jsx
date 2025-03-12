"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import SearchComponent from "@/app/components/search";
import DropDown from "@/app/components/dropown";
import Product from "@/app/components/product";
import Pagination from "@/app/components/pagination";
import Sidebar from "@/app/components/sidebar";
import Processbar from "@/app/components/processBar";

export default function Products() {
  const [products, setProducts] = useState([]); // Danh sách sản phẩm sau lọc/sắp xếp
  const [searchedProducts, setSearchedProducts] = useState([]); // Danh sách sản phẩm sau tìm kiếm
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // 3 sản phẩm mỗi hàng, 3 hàng mỗi trang

  // Xử lý thay đổi từ DropDown (lọc và sắp xếp)
  const handleProductsChange = (updatedProducts) => {
    setProducts(updatedProducts);
    setSearchedProducts(updatedProducts); // Đồng bộ với tìm kiếm
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Xử lý tìm kiếm từ SearchComponent
  const handleSearch = (filteredProducts) => {
    setSearchedProducts(filteredProducts);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Tính toán sản phẩm hiển thị trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="flex justify-center bg-gray-100">
      <div className="min-h-[100vh] max-w-[1440px] flex gap-6 my-20 px-6">
        {/* Sidebar */}
        <div className="w-[25%] hidden lg:block">
          <div className="space-y-5">
            {[
              { icon: faListCheck, title: "Danh mục", content: <Sidebar /> },
              { icon: faMoneyBill, title: "Theo giá", content: <Processbar /> },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md">
                <div className="flex items-center gap-4 text-gray-900 bg-gradient-to-r from-blue-400 to-blue-600 py-4 px-4 rounded-t-xl">
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="text-[24px] text-white"
                  />
                  <h2 className="text-lg font-semibold text-white">
                    {item.title}
                  </h2>
                </div>
                <div className="p-4">{item.content}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-[70%]">
          {/* Top Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-400 to-blue-600 text-white py-4 px-5 rounded-lg shadow-md">
            <div className="flex gap-x-4">
              <DropDown onChange={handleProductsChange} />
            </div>
            <div className="mt-3 md:mt-0">
              <SearchComponent
                onSearch={handleSearch}
                products={products} // Truyền danh sách từ DropDown vào Search
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="my-5 text-gray-900 text-lg font-medium">
            Kết quả tìm kiếm: <span className="text-blue-600">Sản phẩm có sẵn</span>
          </div>

          {/* Hiển thị danh sách sản phẩm */}
          <Product products={currentProducts} limit={productsPerPage} />

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={handlePageChange}
              totalProducts={searchedProducts.length}
              productsPerPage={productsPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}