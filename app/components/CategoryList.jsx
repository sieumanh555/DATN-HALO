import React from "react";

const categories = [
  { name: "Giày Mizuno", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFq3w-kZEZRGkXvAJcDzFdVDizSPTJxoAblDzGd2RExhReF5R8G_XiMaS__s6ZehOLtV8&usqp=CAU" },
  { name: "Giày New Balance", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW1FhtlC_2dOqBdJ2P4IoGFlSOqFEzbPlIVw&s" },
  { name: "Giày Adidas", image: "https://www.pngmart.com/files/23/Adidas-Logo-PNG-File.png" },
  { name: "Giày Nike", image: "https://www.pngall.com/wp-content/uploads/2016/06/Nike-Logo.png" },
];

const CategoryList = ({ onCategorySelect }) => {
  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => onCategorySelect(category.name)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-20 h-20 object-contain mx-auto"
            />
            <h3 className="text-blue-600 font-bold text-lg mt-3">
              {category.name.toUpperCase()}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;