"use client";
import Link from "next/link";
import Image from "next/image";
import { Search, Heart, User, ShoppingBag, Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Navbar() {
  const cart = useSelector((state) => state.cart.products || []);
  const cartQuantity = cart.length;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="text-xl text-gray-800 font-medium mx-4 md:mx-12 py-4">
      <div className="container">
        <div className="w-full text-center mx-auto uppercase pb-2 border-b-[3px] flex justify-between items-center">
          {/* Menu button for mobile */}
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
          
          <div className="w-[20%] flex justify-end space-x-4 text-gray-600">
            <Search className="w-6 h-6 cursor-pointer" />
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
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white py-4 px-6 space-y-4 text-center">
          <Link href="/pages/product" className="block hover:text-gray-400">TẤT CẢ SẢN PHẨM</Link>
          <Link href="/" className="block hover:text-gray-400">SẢN PHẨM ƯU ĐÃI</Link>
          <Link href="/" className="block hover:text-gray-400">GIÀY NAM</Link>
          <Link href="/" className="block hover:text-gray-400">GIÀY NỮ</Link>
          <Link href="/" className="block hover:text-gray-400">PHỤ KIỆN</Link>
          <Link href="/pages/tintuc" className="block hover:text-gray-400">TIN TỨC</Link>
        </div>
      )}

      {/* Desktop menu */}
      <div className="hidden md:block container mt-4">
        <div className="w-[90%] mx-auto flex justify-between">
          <Link href="/pages/product" className="hover:text-gray-400">TẤT CẢ SẢN PHẨM</Link>
          <Link href="/" className="hover:text-gray-400">SẢN PHẨM ƯU ĐÃI</Link>
          <Link href="/" className="hover:text-gray-400">GIÀY NAM</Link>
          <Link href="/" className="hover:text-gray-400">GIÀY NỮ</Link>
          <Link href="/" className="hover:text-gray-400">PHỤ KIỆN</Link>
          <Link href="/pages/tintuc" className="hover:text-gray-400">TIN TỨC</Link>
        </div>
      </div>
    </header>
  );
}