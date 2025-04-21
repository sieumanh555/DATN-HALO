"use client";
import Link from "next/link";
import Image from "next/image";
import { Search, Heart, User, ShoppingBag, Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {CartState} from "@/app/models/CartState";

export default function Header() {
    const cart = useSelector((state: CartState) => state.cart.products || []);
    const cartQuantity = cart.length;
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
        if ("key" in e && e.key === "Enter" || e.type === "click") {
            if (searchQuery.trim()) {
                try {
                    const response = await fetch(
                        `https://datn-api-production.up.railway.app/product?search=${encodeURIComponent(searchQuery)}`
                    );
                    if (!response.ok) {
                        throw new Error("Không thể tìm kiếm sản phẩm");
                    }
                    const data = await response.json();
                    console.log("Kết quả tìm kiếm:", data);
                    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                } catch (error) {
                    console.error("Lỗi tìm kiếm:", error);
                } finally {
                    setSearchQuery("");
                    setIsSearchOpen(false);
                }
            }
        }
    };

    return (
        <header className="text-xl text-gray-800 font-medium mx-4 md:mx-12 py-4">
            <div className="">
                <div className="w-full text-center mx-auto uppercase pb-2 border-b-[3px] flex justify-between items-center">
                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        <Menu className="w-6 h-6" />
                    </button>
                    <Link href="/" className="hidden md:block w-[20%] hover:text-gray-400">
                        trang chủ
                    </Link>
                    <Link href="/" className="hidden md:block w-[20%] hover:text-gray-400">
                        kiểm tra đơn hàng
                    </Link>
                    <Link href="/" className="w-[16%]">
                        <div className="w-full flex justify-center">
                            <Image
                                src="/assets/images/logo.jpg"
                                alt="Logo"
                                width={100}
                                height={100}
                                style={{ mixBlendMode: "darken" }}
                            />
                        </div>
                    </Link>
                    <Link href="/" className="hidden md:block w-[20%] hover:text-gray-400">
                        chính sách đổi trả
                    </Link>
                    <div className="w-[20%] flex justify-end space-x-4 text-gray-600 items-center">
                        <div className="relative">
                            <Search
                                className="w-6 h-6 cursor-pointer"
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                            />
                            {isSearchOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-10">
                                    <div className="flex items-center p-2">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyDown={handleSearch}
                                            placeholder="Tìm kiếm sản phẩm..."
                                            className="w-full p-2 text-sm text-gray-700 border-none focus:outline-none"
                                        />
                                        <button onClick={handleSearch} className="ml-2">
                                            <Search className="w-5 h-5 text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <Heart className="w-6 h-6 cursor-pointer" />
                        <User className="w-6 h-6 cursor-pointer" />
                        <Link href="/cart">
                            <div className="relative">
                                <ShoppingBag className="w-6 h-6 cursor-pointer" />
                                {cartQuantity > 0 && (
                                    <div className="absolute top-3 -right-2 w-[20px] h-[20px] bg-[#034292] rounded-full flex items-center justify-center">
                                        <span className="text-xs text-white">{cartQuantity}</span>
                                    </div>
                                )}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-white py-4 px-6 space-y-4 text-center">
                    <Link href="/pages/product" className="block hover:text-gray-400">TẤT CẢ SẢN PHẨM</Link>
                    <Link href="/pages/product?filter=discount" className="block hover:text-gray-400">SẢN PHẨM ƯU ĐÃI</Link>
                    <Link href="/pages/product?gender=Nam" className="block hover:text-gray-400">GIÀY NAM</Link>
                    <Link href="/pages/product?gender=Nữ" className="block hover:text-gray-400">GIÀY NỮ</Link>
                    <Link href="/pages/product?category=Phụ Kiện" className="block hover:text-gray-400">PHỤ KIỆN</Link>
                    <Link href="/pages/tintuc" className="block hover:text-gray-400">TIN TỨC</Link>
                </div>
            )}
            <div className="hidden md:block container mt-4">
                <div className="w-[90%] mx-auto flex justify-between">
                    <Link href="/pages/product" className="hover:text-gray-400">TẤT CẢ SẢN PHẨM</Link>
                    <Link href="/pages/product?filter=discount" className="hover:text-gray-400">SẢN PHẨM ƯU ĐÃI</Link>
                    <Link href="/pages/product?gender=Nam" className="hover:text-gray-400">GIÀY NAM</Link>
                    <Link href="/pages/product?gender=Nữ" className="hover:text-gray-400">GIÀY NỮ</Link>
                    <Link href="/pages/product?category=Phụ Kiện" className="hover:text-gray-400">PHỤ KIỆN</Link>
                    <Link href="/pages/tintuc" className="hover:text-gray-400">TIN TỨC</Link>
                </div>
            </div>
        </header>
    );
}