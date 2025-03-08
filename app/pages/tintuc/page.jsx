
"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Tintuc = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-gray-100 p-4 max-w-6xl mx-auto grid grid-cols-4 gap-4 min-h-screen">
      {/* Left Sidebar */}
      <div className="col-span-1 space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center bg-white p-2 rounded-lg">
            <img src="/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red(3).png" alt="Thumbnail" className="w-16 h-16 object-cover rounded-lg" />
            <div className="ml-2">
              <h3 className="text-sm font-semibold">Tin tức sản phẩm</h3>
              <p className="text-xs text-gray-600">1 phút trước</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="col-span-2">
        <img src="/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red(3).png" alt="Game Banner" className="w-full h-64 object-cover" />
        <h2 className="font-bold text-lg mt-2">
          Xuất hiện thêm một game MMO mới mẻ đầy tiềm năng trên Steam, chưa ra mắt đã có 100.000 người "mong ước"
        </h2>
        <div className="grid max-h-[120px] grid-cols-2 gap-4 mt-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-gray-300 h-40 flex flex-col items-center p-2">
              <img src="/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red(3).png" alt="Sản phẩm" className="w-full h-32 object-cover" />
              <p className="text-center text-sm font-semibold mt-1">Tin tức sản phẩm</p>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-300 h-24"></div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="col-span-1 space-y-4">
        <div className="bg-gray-300 h-[30rem]">
        <Image src="/assets/images/quangcao.png" alt="quang cao" width={300} height={480} />
        </div>
        <div className="bg-gray-300 h-[30rem]">
        <Image src="/assets/images/quangcao.png" alt="quang cao" width={300} height={480} />
        </div>
      </div>
    </div>
  );
};

export default Tintuc;
