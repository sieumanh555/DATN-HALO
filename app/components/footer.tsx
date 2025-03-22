"use client";
import Link from "next/link";
import { Send } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="tracking-wide py-6 px-8 sm:px-8 md:px-[100px] bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
                {/* About HALO Section */}
                <div className="space-y-2 md:col-span-2">
                    <h2 className="text-xl font-semibold text-gray-800 pb-2 transition-colors duration-300">
                        Về HALO
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed hover:text-gray-700 transition-colors duration-300">
                        HALO - "Highlight Alluring Lifestyle Outfit" tượng trưng cho phong
                        cách thời trang nổi bật và cuốn hút.
                    </p>
                    <h2 className="text-xl font-semibold text-gray-800 pb-2 transition-colors duration-300">
                        Công ty TNHH HALO
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed hover:text-gray-700 transition-colors duration-300">
                        0315986019 cấp ngày 31/10/2019 tại Sở kế hoạch đầu tư TPHCM
                    </p>
                </div>

                {/* Address Section */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-gray-800 pb-2 transition-colors duration-300">
                        Địa chỉ
                    </h2>
                    <p className="text-sm font-semibold text-gray-800">Tp Hồ Chí Minh:</p>
                    <ul className="list-inside list-disc text-sm text-gray-600">
                        <li className="hover:text-gray-700 transition-colors duration-300">
                            43 Huỳnh Văn Bánh, P.17, Q.Phú Nhuận.
                        </li>
                    </ul>
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold">Điện thoại:</span>{" "}
                        <a
                            href="tel:0999999999"
                            className="hover:text-blue-600 transition-colors duration-300"
                        >
                            0999999999
                        </a>
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold">Email:</span>{" "}
                        <a
                            href="mailto:halo@gmail.com"
                            className="hover:text-blue-600 transition-colors duration-300"
                        >
                            halo@gmail.com
                        </a>
                    </p>
                </div>

                {/* Customer Support Section */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-gray-800 pb-2 transition-colors duration-300">
                        Hỗ trợ khách hàng
                    </h2>
                    <ul className="text-sm text-gray-600 space-y-2">
                        {["Giới thiệu về HALO", "FAQ", "Hoàn trả", "Hướng dẫn đặt hàng"].map(
                            (item) => (
                                <li key={item}>
                                    <Link
                                        href="/"
                                        className="hover:text-[#034292] transition-all duration-300 inline-block transform hover:translate-x-1"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                </div>

                {/* Terms & Conditions Section */}
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-gray-800 pb-2 transition-colors duration-300">
                        Điều khoản & điều kiện
                    </h2>
                    <ul className="text-sm text-gray-600 space-y-2">
                        {[
                            "Chính sách & quy định",
                            "Chính sách bảo mật",
                            "Thông tin sở hữu",
                        ].map((item) => (
                            <li key={item}>
                                <Link
                                    href="/"
                                    className="hover:text-[#034292] transition-all duration-300 inline-block transform hover:translate-x-1"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Newsletter & Social Media Section */}
            <div className="container mx-auto mt-6">
                <h2 className="text-xl font-semibold text-gray-800 pb-2 transition-colors duration-300">
                    Đăng ký nhận tin
                </h2>
                <form className="relative max-w-[240px] mt-1">
                    <input
                        type="email"
                        placeholder="Nhập email của bạn"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
                    />
                    <button className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600">
                        <Send className="w-5 h-5" />
                    </button>
                </form>

                <h2 className="text-xl font-semibold text-gray-800 mt-8 pb-2 transition-colors duration-300">
                    Theo dõi HALO
                </h2>
                <div className="flex space-x-6 mt-1">
                    {[
                        { name: "Facebook", url: "https://www.facebook.com" },
                        { name: "Instagram", url: "https://www.instagram.com" },
                        { name: "TikTok", url: "https://www.tiktok.com" },
                    ].map((social) => (
                        <Link
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            title={social.name}
                            className="transform hover:scale-110 transition-transform duration-300"
                        >
                            <Image
                                src={`/assets/images/${social.name.toLowerCase()}-icon.png`}
                                alt={social.name}
                                width={32}
                                height={32}
                                className="rounded-lg"
                            />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Copyright Section */}
            <p className="text-center mt-8 text-gray-600 pt-8">
                &copy;2025{" "}
                <Link
                    href="/"
                    className="text-[#034292]"
                    title="Trang chủ"
                >
                    HALO
                </Link>
                . All rights reserved.
            </p>
        </footer>
    );
}