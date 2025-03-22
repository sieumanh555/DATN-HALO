import React from "react";

const categories = [
  {
    name: "Giày Jordan",
    image: "https://i.ebayimg.com/images/g/97oAAOSweLFalc-f/s-l1200.jpg",
  },
  {
    name: "Giày Sneaker",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0_M28FaIiWvIvvFCqu0ZqYm3-gAIzs6OaxA&s",
  },
  {
    name: "Giày Adidas",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwBJOtyZGcC-5b0xtu4SHUb4-iXz2ApiIsG4gW04yxm6sbAPShYWzHeEQN7zN7d9IhFG4&usqp=CAU",
  },
  {
    name: "Giày Nike",
    image: "https://www.pngall.com/wp-content/uploads/2016/06/Nike-Logo.png",
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
              className="w-20 h-20 object-contain mx-auto" // Thay object-cover thành object-contain
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