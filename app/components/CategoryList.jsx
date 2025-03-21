import React from "react";

const categories = [
  {
    name: "Giày Thể Thao",
    image: "/assets/images/giaythethao.webp",
  },
  {
    name: "Giày Sneaker",
    image: "/assets/images/depthethao.webp",
  },
  {
    name: "Giày trẻ em",
    image: "/assets/images/quanao.webp",
  },
  {
    name: "Phụ Kiện",
    image: "/assets/images/phukien.webp",
  },
];

const CategoryList = () => {
  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-20 h-20 object-cover mx-auto"
            />
            <h3 className="text-blue-600 font-bold text-lg mt-3">
              {category.name.toUpperCase()}
            </h3>
            {/* <p className="text-gray-600 mt-1">{category.products} sản phẩm</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;