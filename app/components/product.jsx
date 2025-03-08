import React from "react";

const Product = ({ category, banner, items }) => (
  <div className="mb-10">
    {/* Hiển thị banner của danh mục (nếu có) */}
    {banner && (
      <img
        src={banner}
        alt={`Banner ${category}`}
        className="w-full h-80 object-cover rounded-lg mb-4"
      />
    )}

    {/* Tiêu đề danh mục + Nút Xem tất cả */}
    <div className="flex justify-between items-center mb-5">
      <h2 className="text-2xl font-bold text-gray-800">{category}</h2>
      <a href={`/category/${category}`} className="hover:underline text-sm">
        Xem tất cả
      </a>
    </div>

    {/* Danh sách sản phẩm */}
    <div className="grid grid-cols-4 gap-6">
      {items.map((product, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4">
          {/* Ảnh sản phẩm */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-60 object-cover rounded-md mx-auto"
          />

          {/* Tên sản phẩm */}
          <h3 className="mt-3 font-semibold text-base text-gray-800">{product.name}</h3>

          {/* Giá sản phẩm */}
          <p className="text-red-500 font-bold text-lg mt-1">{product.price}</p>

          {/* Ảnh các phiên bản màu sắc (nếu có) */}
          {product.colors && (
            <div className="flex mt-2 space-x-2">
              {product.colors.map((color, idx) => (
                <img
                  key={idx}
                  src={color.image}
                  alt={`Color ${idx}`}
                  className="w-8 h-8 border border-gray-300 rounded-full cursor-pointer hover:scale-110 transition-transform"
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default Product;
