"use client";
import {useEffect, useState} from "react";
import Image from "next/image";

const Tintuc = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className=" min-h-screen py-12">
            <div className="w-full px-[100px]">
                <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Left Sidebar - Trending News */}
                    <aside className="md:col-span-1 space-y-6">
                        {/* <h3 className="text-lg font-bold text-gray-900 mb-4">Tin Hot</h3> */}
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="group bg-white rounded-lg p-4 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer"
                            >
                                <div className="flex items-start space-x-3">
                                    <div className="relative w-16 h-16 flex-shrink-0">
                                        <Image
                                            src="/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red(3).png"
                                            alt="Thumbnail"
                                            width={64}
                                            height={64}
                                            className="rounded-md object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            Tin tức sản phẩm nổi bật
                                        </h4>
                                        <p className="text-xs text-gray-500 mt-1">{i + 1} giờ trước</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </aside>

                    {/* Main Content */}
                    <main className="md:col-span-2 space-y-6">
                        {/* Featured News */}
                        <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-xl group cursor-pointer">
                            <Image
                                src="/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red(3).png"
                                alt="Featured News"
                                width={800}
                                height={384}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent"/>
                            <div className="absolute bottom-0 p-6">
                <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full mb-2">
                  Mới nhất
                </span>
                                <h2 className="text-2xl font-bold text-white drop-shadow-md leading-tight">
                                    Giày HALO cao cấp mới xuất hiện
                                </h2>
                                <p className="text-sm text-gray-200 mt-2">100.000 người đang chờ đón</p>
                            </div>
                        </div>

                        {/* News Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 group"
                                >
                                    <div className="relative w-full h-40">
                                        <Image
                                            src="/assets/images/Adidas-Rivalry-Low-Dark-Grey-Red(3).png"
                                            alt="News"
                                            width={300}
                                            height={160}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 line-clamp-2">
                                            Tin tức sản phẩm
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">{i + 1} phút trước</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>

                    {/* Right Sidebar - Ads & Highlights */}
                    <aside className="md:col-span-1 space-y-6">
                        {[...Array(2)].map((_, i) => (
                            <div
                                key={i}
                                className="relative h-100 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                            >
                                <Image
                                    src="/assets/images/quangcao.png"
                                    alt="Advertisement"
                                    width={300}
                                    height={288}
                                    className="w-full h-full object-cover"
                                />
                                <div
                                    className="absolute bottom-0 p-4 bg-gradient-to-t from-gray-900/80 to-transparent w-full">
                                    <p className="text-sm font-medium text-white">Quảng cáo nổi bật</p>
                                </div>
                            </div>
                        ))}
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Tintuc;