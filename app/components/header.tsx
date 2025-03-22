"use client";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { Heart, Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";

import CartState from "../models/CartState"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const hiddenOnPaths = ["/pages/login", "/pages/register"];
    const isHidden = hiddenOnPaths.includes(pathname);

    const cart = useSelector((state: CartState) => state.cart.products || []);
    const cartQuantity = cart.length;

    const menuItems = [
        "Tất cả sản phẩm",
        "Danh mục",
        "Sản phẩm mới",
        "Giày nam",
        "Giày nữ",
        "Phụ kiện"
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    };

    return (
        <header
            className={`${isHidden ? "hidden" : "block"} relative bg-white text-gray-800 font-medium px-4 md:px-8 lg:px-12 py-4`}
        >
            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
                    isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={toggleMenu}
            />

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 left-0 h-full w-[80%] max-w-sm bg-white z-50 transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="p-4">
                    <button
                        onClick={toggleMenu}
                        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <div className="mt-12 space-y-6">
                        <Link href="/" className="block text-lg hover:text-gray-600">
                            Trang chủ
                        </Link>
                        <Link href="/" className="block text-lg hover:text-gray-600">
                            Kiểm tra đơn hàng
                        </Link>
                        <Link href="/" className="block text-lg hover:text-gray-600">
                            Chính sách đổi trả
                        </Link>

                        <div className="h-px bg-gray-200 my-4" />

                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                href="/"
                                className="block text-lg hover:text-gray-600"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto">
                {/* Mobile Header */}
                <div className="md:hidden px-8 flex justify-between items-center">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <Link href="/" className="flex justify-center">
                        <div className="w-20 h-20 relative">
                            <Image
                                src="/assets/images/logo.jpg"
                                alt="Logo"
                                fill
                                className="mix-blend-darken object-contain"
                            />
                        </div>
                    </Link>

                    <div className={`flex gap-3`}>
                        <Link href="/pages/login">
                            <div className="text-gray-600">
                                <User className="w-6 h-6" />
                            </div>
                        </Link>
                        <Link href="/pages/cart">
                            <div className="relative text-gray-600">
                                <ShoppingBag className="w-6 h-6" />
                                <div className="absolute top-3 -right-2 w-[20px] h-[20px] bg-[#034292] rounded-full flex items-center justify-center">
                                    <span className="text-xs text-white">{cartQuantity}</span>
                                </div>
                            </div>
                        </Link>
                    </div>

                </div>

                {/* Desktop Header */}
                <div className="hidden md:block">
                    <div className="w-full lg:w-[90%] text-center mx-auto uppercase pb-2 border-b-[3px] flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                        <Link
                            href="/"
                            className="w-full md:w-[20%] hover:text-gray-400 transition-colors duration-300"
                        >
                            trang chủ
                        </Link>

                        <Link
                            href="/"
                            className="w-full md:w-[20%] hover:text-gray-400 transition-colors duration-300"
                        >
                            kiểm tra đơn hàng
                        </Link>

                        <Link href="/" className="w-full md:w-[16%]">
                            <div className="w-full flex justify-center">
                                <div className="w-24 h-24 md:w-[120px] md:h-[120px] relative">
                                    <Image
                                        src="/assets/images/logo.jpg"
                                        alt="Logo"
                                        fill
                                        className="mix-blend-darken object-contain"
                                    />
                                </div>
                            </div>
                        </Link>

                        <Link
                            href="/"
                            className="w-full md:w-[20%] hover:text-gray-400 transition-colors duration-300"
                        >
                            chính sách đổi trả
                        </Link>

                        <div className="w-full md:w-[20%]">
                            <div className="flex justify-center space-x-3 text-gray-600">
                                <button className="hover:text-gray-800 transition-colors duration-300">
                                    <Search className="w-6 h-6" />
                                </button>
                                <button className="hover:text-gray-800 transition-colors duration-300">
                                    <Heart className="w-6 h-6" />
                                </button>
                                <Link
                                    href="/pages/login"
                                    className="hover:text-gray-800 transition-colors duration-300"
                                >
                                    <User className="w-6 h-6" />
                                </Link>
                                <Link href="/pages/cart" className="hover:text-gray-800 transition-colors duration-300">
                                    <div className="relative">
                                        <ShoppingBag className="w-6 h-6" />
                                        <div className="absolute top-3 -right-2 w-[20px] h-[20px] bg-[#034292] rounded-full flex items-center justify-center">
                                            <span className="text-xs text-white">{cartQuantity}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Navigation Menu */}
            <div className="hidden md:block container mx-auto mt-4 overflow-x-auto">
                <div className="w-full lg:w-[90%] mx-auto flex justify-between min-w-max px-4">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href="/"
                            className="px-4 whitespace-nowrap hover:text-gray-400 transition-colors duration-300"
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}