import React from "react";

const categories = [
  {
    name: "Giày Thể Thao",
    image: "/assets/images/giaythethao.webp",
    products: 110,
  },
  {
    name: "Dép Thể Thao",
    image: "/assets/images/depthethao.webp",
    products: 12,
  },
  {
    name: "Quần Áo Thể Thao",
    image: "/assets/images/quanao.webp",
    products: 5,
  },
  {
    name: "Phụ Kiện",
    image: "/assets/images/phukien.webp",
    products: 32,
  },
];

const CategoryList = () => {
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="grid grid-cols-4 gap-6 text-center">
        {categories.map((category, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <img src={category.image} alt={category.name} className="w-20 mx-auto" />
            <h3 className="text-red-600 font-bold text-lg mt-3">{category.name.toUpperCase()}</h3>
            <p className="text-gray-600 mt-1">{category.products} sản phẩm</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
