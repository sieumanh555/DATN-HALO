
"use client"
import React, { useEffect, useState } from "react";

const GamingNewsInterface = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-gray-100 p-4 max-w-6xl mx-auto grid grid-cols-4 gap-4 min-h-screen">
      {/* Left Sidebar */}
      <div className="col-span-1 space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-300 h-24"></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="col-span-2">
        <img src="/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red(3).png" alt="Game Banner" className="w-full h-64 object-cover" />
        <h2 className="font-bold text-lg mt-2">
          Xuất hiện thêm một game MMO mới mẻ đầy tiềm năng trên Steam, chưa ra mắt đã có 100.000 người "mong ước"
        </h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-300 h-40"></div>
          <div className="bg-gray-300 h-40"></div>
        </div>
        <div className="mt-4 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-300 h-24"></div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="col-span-1 space-y-4">
        <div className="bg-gray-300 h-[30rem]">
          {isClient && <img src="/assets/images/quangcao.png" alt="quang cao" />}
        </div>
        <div className="bg-gray-300 h-[30rem]">
          {isClient && <img src="/assets/images/quangcao.png" alt="quang cao" />}
        </div>
      </div>
    </div>
  );
};

export default GamingNewsInterface;
