"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from "./components/product";
import CategoryList from "./components/CategoryList";
import VoucherList from "./components/VoucherList";

const banners = [
  { image: "/assets/images/banner1.jpg", alt: "Giày chạy bộ khuyến mãi" },
  { image: "/assets/images/banner2.webp", alt: "Giày bóng rổ mới" },
  { image: "/assets/images/banner3.webp", alt: "Giày sneaker hot trend" },
];

const products = [
  {
    banner: "/assets/images/banner2.webp",
    category: "Giày Nam",
    items: [
      {
        name: "Giày Bóng Rổ Nam PEAK Taichi Cavalry 4 EXT51051A",
        price: "1,790,000đ",
        image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png",
        colors: [
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },

        ],
      },
      {
        name: "Giày Bóng Rổ Nam PEAK Taichi Cavalry 4 EXT51051A",
        price: "1,790,000đ",
        image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png",
        colors: [
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          
        ],
      },
      {
        name: "Giày Bóng Rổ Nam PEAK Taichi Cavalry 4 EXT51051A",
        price: "1,790,000đ",
        image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png",
        colors: [
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
        ],
      },
      {
        name: "Giày Bóng Rổ Nam PEAK Taichi Cavalry 4 EXT51051A",
        price: "1,790,000đ",
        image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png",
        colors: [
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },

        ],
      },
    ],
  },
  {
    banner: "/assets/images/banner2.webp",
    category: "Giày Nữ",
    items: [
      {
        name: "Giày Bóng Rổ Nam PEAK Taichi Cavalry 4 EXT51051A",
        price: "1,790,000đ",
        image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png",
        colors: [
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
        ],
      },
      {
        name: "Giày Bóng Rổ Nam PEAK Taichi Cavalry 4 EXT51051A",
        price: "1,790,000đ",
        image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png",
        colors: [
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
        ],
      },
      {
        name: "Giày Bóng Rổ Nam PEAK Taichi Cavalry 4 EXT51051A",
        price: "1,790,000đ",
        image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png",
        colors: [
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
        ],
      },
      {
        name: "Giày Bóng Rổ Nam PEAK Taichi Cavalry 4 EXT51051A",
        price: "1,790,000đ",
        image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png",
        colors: [
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
        ],
      },
    ],
  },
  {
    banner: "/assets/images/banner2.webp",
    category: "Giày Thể Thao",
    items: [
      {
        name: "Giày Bóng Rổ Nam PEAK Taichi Cavalry 4 EXT51051A",
        price: "1,790,000đ",
        image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png",
        colors: [
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
        ],
      },
      {
        name: "Giày Bóng Rổ Nam PEAK Taichi Cavalry 4 EXT51051A",
        price: "1,790,000đ",
        image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png",
        colors: [
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
        ],
      },
      {
        name: "Giày Bóng Rổ Nam PEAK Taichi Cavalry 4 EXT51051A",
        price: "1,790,000đ",
        image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png",
        colors: [
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
        ],
      },
      {
        name: "Giày Bóng Rổ Nam PEAK Taichi Cavalry 4 EXT51051A",
        price: "1,790,000đ",
        image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png",
        colors: [
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
          { image: "/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red.png" },
        ],
      },
    ],
  },
];

const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
              className="w-screen h-80 object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const StorePage = () => {
  return (
    <>
      <BannerSlider /> {/* Để ngoài container bị giới hạn */}
      <div className="max-w-6xl mx-auto p-6">
        <CategoryList />
        <VoucherList />
        {products.map((section, index) => (
          <Product 
            key={index} 
            category={section.category} 
            banner={section.banner} 
            items={section.items} 
          />
        ))}
      </div>
    </>
  );
};


export default StorePage;
