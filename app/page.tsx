"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from "./components/product";
import CategoryList from "./components/CategoryList";

const staticData = {
  banners: [
    { id: 1, image: "/assets/images/banner1.jpg", alt: "Giày chạy bộ khuyến mãi" },
    { id: 2, image: "/assets/images/banner2.webp", alt: "Giày bóng rổ mới" },
    { id: 3, image: "/assets/images/banner3.webp", alt: "Giày sneaker hot trend" },
  ],
  productsSections: [
    { id: 1, banner: "/assets/images/banner2.webp", category: "Sản phẩm nổi bật" },
    { id: 2, banner: "/assets/images/banner1.jpg", category: "Giày Nam" },
    { id: 3, banner: "/assets/images/banner3.webp", category: "Giày Nữ" },
    { id: 4, banner: "/assets/images/banner2.webp", category: "Phụ kiện" },
  ],
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
    responsive: [{ breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } }],
  };

  return (
    <div className="w-full h-[300px] md:h-[520px] relative overflow-hidden bg-black">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id} className="w-full h-full flex items-center justify-center">
            <img
              src={banner.image}
              alt={banner.alt}
              className="w-full h-full object-contain object-center"
              style={{ imageRendering: "crisp-edges" }}
              loading="lazy"
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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await fetch("https://datn-api-production.up.railway.app/product");
        if (!productsResponse.ok) throw new Error("Failed to fetch products");
        const productsData = await productsResponse.json();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const filterProducts = (category) => {
    if (category === "Sản phẩm nổi bật") {
      return products.filter((product) => product.hot === 1);
    }
    return products.filter((product) => product.category?.categoryName === category);
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleViewMore = (category) => {
    const filter = category === "Sản phẩm nổi bật" ? "hot" : null;
    const query = filter ? `?filter=${filter}` : `?category=${encodeURIComponent(category)}`;
    router.push(`/pages/product${query}`); // Hoàn thiện navigation
  };

  return (
    <>
      <div className="max-w-[1920px] flex flex-col">
        <div className="relative flex w-full h-auto md:h-screen mb-12 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            className="w-full h-auto md:h-full object-contain md:object-cover"
          >
            <source src="/banner.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-left text-gray-900 text-2xl font-bold px-4 py-2 rounded-md">
          Danh mục nổi bật
        </h2>
        <CategoryList onCategorySelect={handleCategorySelect} />

        {selectedCategory && (
          <div className="mt-12">
            <div className="flex justify-between items-center px-4 py-2">
              <h2 className="text-left text-gray-900 text-2xl font-bold rounded-md">
                {selectedCategory}
              </h2>
              <button
                onClick={() => handleViewMore(selectedCategory)}
                className="text-black hover:text-blue-600 text-lg"
              >
                Xem thêm
              </button>
            </div>
            <div className="grid gap-6 mt-6">
              <Product products={filterProducts(selectedCategory)} limit={4} columns={4} />
            </div>
          </div>
        )}

        <div className="mt-12">
          {productsSections.map((section) => (
            <div key={section.id} className="mb-12">
              <div className="relative mb-6">
                <div className="w-full h-[200px] md:h-[450px] overflow-hidden rounded-lg shadow-md">
                  <img
                    src={section.banner}
                    alt={`Banner ${section.category}`}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex justify-between items-center px-4 py-2 mt-2">
                  <h2 className="text-left text-gray-900 text-2xl font-bold rounded-md">
                    {section.category}
                  </h2>
                  <button
                    onClick={() => handleViewMore(section.category)}
                    className="text-black hover:text-blue-600 text-lg"
                  >
                    Xem thêm
                  </button>
                </div>
              </div>
              <div className="">
                <Product products={filterProducts(section.category)} limit={4} columns={4} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-12">
          <div className="w-full flex flex-col lg:flex-row items-center gap-6">
            <div className="w-full lg:w-1/2">
              <video
                autoPlay
                loop
                muted
                className="w-full h-auto rounded-lg shadow-md object-contain"
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
                This collection brings together dreamy spirit with Hello Kitty’s timeless adorableness...
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
                className="w-full h-auto rounded-lg shadow-md object-contain"
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
                This collection brings together dreamy spirit with Hello Kitty’s timeless adorableness...
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