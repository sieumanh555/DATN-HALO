"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Tintuc = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-8">
      {/* Desktop: 1440px, 12 cols, 75px/col, gutter 24px */}
      {/* Tablet: auto width, margin 60px, gutter 35px, 8 cols */}
      {/* Mobile: auto width, margin 12px, gutter 10px, 2 cols */}
      <div className="mx-auto 
        md:max-w-[1164px] md:px-[138px] md:grid md:grid-cols-12 md:gap-6 
        sm:max-w-full sm:mx-[60px] sm:grid sm:grid-cols-8 sm:gap-[35px]
        max-w-full mx-3 grid grid-cols-2 gap-[10px]"
      >
        {/* Left Sidebar */}
        <aside className="md:col-span-3 sm:col-span-2 col-span-2 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="flex items-center bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image 
                  src="/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red(3).png" 
                  alt="Thumbnail" 
                  width={64}
                  height={64}
                  className="rounded-lg"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">Tin tức sản phẩm</h3>
                <p className="text-xs text-gray-500 mt-1">1 phút trước</p>
              </div>
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="md:col-span-6 sm:col-span-4 col-span-2">
          <div className="relative w-full h-72 rounded-xl overflow-hidden shadow-lg group">
            <Image 
              src="/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red(3).png" 
              alt="Game Banner"
              width={800}
              height={288}
              className="w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <h2 className="absolute bottom-4 left-4 right-4 text-white text-xl font-bold drop-shadow-lg">
              Xuất hiện thêm một game MMO mới mẻ đầy tiềm năng trên Steam, chưa ra mắt đã có 100.000 người "mong ước"
            </h2>
          </div>

          <div className="grid md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 mt-6">
            {[...Array(2)].map((_, i) => (
              <div 
                key={i} 
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <div className="relative w-full h-32">
                  <Image 
                    src="/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red(3).png" 
                    alt="Sản phẩm" 
                    width={300}
                    height={128}
                    className="w-full h-full"
                  />
                </div>
                <p className="p-3 text-sm font-semibold text-gray-800 text-center">Tin tức sản phẩm</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="bg-white h-24 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4"
              >
                {/* Có thể thêm nội dung cụ thể ở đây */}
              </div>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="md:col-span-3 sm:col-span-2 col-span-2 space-y-6">
          {[...Array(2)].map((_, i) => (
            <div 
              key={i}
              className="relative h-[30rem] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Image 
                src="/assets/images/quangcao.png" 
                alt="Quảng cáo" 
                width={300}
                height={480}
                className="w-full h-full"
              />
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
};

export default Tintuc;