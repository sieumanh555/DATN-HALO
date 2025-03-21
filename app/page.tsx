"use client";

import { useState, useEffect, Key } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from "./components/product";
import CategoryList from "./components/CategoryList";

const staticData = {
  "banners": [
    { "id": 1, "image": "/assets/images/banner1.jpg", "alt": "Giày chạy bộ khuyến mãi" },
    { "id": 2, "image": "/assets/images/banner2.webp", "alt": "Giày bóng rổ mới" },
    { "id": 3, "image": "/assets/images/banner3.webp", "alt": "Giày sneaker hot trend" }
  ],
  "productsSections": [
    { "id": 1, "banner": "/assets/images/banner2.webp", "category": "Giày Nam" },
    { "id": 2, "banner": "/assets/images/banner2.webp", "category": "Giày Nữ" },
    { "id": 3, "banner": "/assets/images/banner2.webp", "category": "Phụ kiện" }
  ]
};

const BannerSlider = ({ banners }) => {
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
        {banners.map((banner: { id: Key | null | undefined; image: string | undefined; alt: string | undefined; }) => (
          <div key={banner.id} className="w-screen">
            <img
              src={banner.image}
              alt={banner.alt}
              className="w-screen h-[500px] object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const StorePage = () => {
  const [products, setProducts] = useState([]);
  const [banners] = useState(staticData.banners);
  const [productsSections] = useState(staticData.productsSections);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await fetch("http://localhost:3000/products");
        if (productsResponse.ok) {
          const productsData = await productsResponse.json();
          setProducts(productsData);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/* Video Banner */}
      <div className="flex flex-col">
        <div className="relative flex h-screen w-full mb-12 overflow-hidden">
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <CategoryList />
        {/* <VoucherList /> */}
        {productsSections.map((section) => (
          <div key={section.id} className="mt-12">
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
            <div className="grid gap-6 mt-6">
              <Product products={products} limit={6} />
            </div>
          </div>
        ))}
      </div>

      {/* Other Sections */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-12">
          <div className="w-full flex flex-col lg:flex-row items-center gap-6">
            <div className="w-full lg:w-1/2">
              <video
                autoPlay
                loop
                muted
                className="relative z-10 w-full h-auto rounded-lg shadow-md"
              >
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
              <button className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-700 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
                Xem ngay
              </button>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row-reverse items-center gap-6">
            <div className="w-full lg:w-1/2">
              <video
                autoPlay
                loop
                muted
                className="relative z-10 w-full h-auto rounded-lg shadow-md"
              >
                <source src="/banner.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="text-gray-900 w-full lg:w-1/2 px-6 flex justify-center flex-col gap-4">
              <h1 className="text-2xl md:text-4xl lg:text-[48px] font-bold leading-tight">
                Bộ sưu tập nữ
              </h1>
              <p className="text-lg text-gray-600">
                This collection brings together dreamy spirit with Hello Kitty’s
                timeless adorableness...
              </p>
              <button className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-700 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
                Xem ngay
              </button>
            </div>
          </div>
        </div>
      </div>
      <BannerSlider banners={banners} />
    </>
  );
};

export default StorePage;