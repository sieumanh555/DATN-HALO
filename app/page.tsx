"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from "./components/product";
import CategoryList from "./components/CategoryList";
import VoucherList from "./components/VoucherList";

const banners = [
  { image: "/assets/images/banner1.jpg", alt: "Giày chạy bộ khuyến mãi", title: "Giày chạy bộ khuyến mãi" },
  { image: "/assets/images/banner2.webp", alt: "Giày bóng rổ mới", title: "Giày bóng rổ mới" },
  { image: "/assets/images/banner3.webp", alt: "Giày sneaker hot trend", title: "Giày sneaker hot trend" },
];

const products = [
  {
    banner: "/assets/images/banner2.webp",
    category: "Giày Nam",
  },
  {
    banner: "/assets/images/banner2.webp",
    category: "Giày Nữ",
  },
  {
    banner: "/assets/images/banner2.webp",
    category: "Phụ kiện",
  },
];

const BannerSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
  };

  return (
    <div className="w-screen relative">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="w-screen">
            <img
              src={banner.image}
              alt={banner.alt}
              className="w-screen h-[500px] object-cover"
            />
            <h2 className="text-left text-gray-900 text-2xl font-bold bg-white/80 px-4 py-2 rounded-md mt-2">
              {banner.title}
            </h2>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const StorePage = () => {
  return (
    <>
      {/* Video Banner */}
      <div className="flex flex-col">
        <div className="relative flex h-screen w-full mb-12 overflow-hidden">
          <div className="flex gap-2 flex-col my-6 font-bold uppercase"></div>
          <video
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/banner.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="max-w-6xl mx-auto p-6">
        <CategoryList />
        <VoucherList />
        {products.map((section, index) => (
          <div key={index}>
            <div></div>
            {/* Hiển thị banner trên mỗi danh mục */}
            <div className="relative mb-6">
              <img
                src={section.banner}
                alt={`Banner ${section.category}`}
                className="w-full h-80 object-cover rounded-lg shadow-md"
              />
              <h2 className="text-left text-gray-900 text-2xl font-bold px-4 py-2 rounded-md mt-2">
                {section.category}
              </h2>
            </div>
            
            <div className="grid grid-cols-4 gap-6 mb-12">
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
            </div>

          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto p-6">
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-12">
      {/* Section 1 */}
      <div className="w-full flex flex-col lg:flex-row items-center gap-6">
        <div className="w-full lg:w-1/2">
          <video autoPlay loop muted className="relative z-10 w-full h-auto rounded-lg shadow-md">
            <source src="/banner.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="text-gray-900 w-full lg:w-1/2 px-6 flex justify-center flex-col gap-4">
          <h1 className="text-2xl md:text-4xl lg:text-[48px] font-bold leading-tight">
            Bộ sưu tập nam
          </h1>
          <p className="text-lg text-gray-600">
            This collection brings together dreamy spirit with Hello Kitty’s
            timeless adorableness...
          </p>
          <button className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-700 hover:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
            Xem ngay
          </button>
        </div>
      </div>

      {/* Section 2 */}
      <div className="w-full flex flex-col lg:flex-row-reverse items-center gap-6">
        <div className="w-full lg:w-1/2">
          <video autoPlay loop muted className="relative z-10 w-full h-auto rounded-lg shadow-md">
            <source src="/banner.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="text-gray-900 w-full lg:w-1/2 px-6 flex justify-center flex-col gap-4">
          <h1 className="text-2xl md:text-4xl lg:text-[48px] font-bold leading-tight">
            Bộ sưu tập nam
          </h1>
          <p className="text-lg text-gray-600">
            This collection brings together dreamy spirit with Hello Kitty’s
            timeless adorableness...
          </p>
          <button className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-700 hover:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
            Xem ngay
          </button>
        </div>
      </div>
    </div>
  </div>
      <BannerSlider />
    </>
  );
};

export default StorePage;
