"use client";
import Link from "next/link";
import Image from "next/image";
import { Search, Heart, User, ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const cart = useSelector((state) => state.cart.products || []);
  const cartQuantity = cart.length;
  return (
    <header className="text-xl text-gray-800 font-medium mx-12 py-4">
      <div className="container">
        <div className="w-[90%] text-center mx-auto uppercase mx-auto pb-2 border-b-[3px] flex justify-between items-center">
          <Link href="/" className="w-[20%] hover:text-gray-400">
            trang chủ
          </Link>

          <Link href="/" className="w-[20%] hover:text-gray-400">
            kiểm tra đơn hàng
          </Link>

          <Link href="/" className="w-[16%]">
            <div className="w-full flex justify-center">
              <img
                src="/images/logo.jpg"
                alt="Logo"
                style={{ mixBlendMode: "darken", width: "120px" }}
              />
            </div>
          </Link>

          <Link href="/" className="w-[20%] hover:text-gray-400">
            chính sách đổi trả
          </Link>

          <div className="w-[20%] hover:text-gray-400">
            <div className="flex justify-center space-x-5 text-gray-600">
              <Search className="w-6 h-6 cursor-pointer" />
              <Heart className="w-6 h-6 cursor-pointer" />
              <User className="w-6 h-6 cursor-pointer" />
              <Link href="/cart">
                <div className="relative">
                  <ShoppingBag className="w-6 h-6 cursor-pointer" />
                  <div className="absolute top-3 -right-2 w-[20px] h-[20px] bg-[#034292] rounded-full flex items-center justify-center">
                    <span className="text-xs text-[#fff]">{cartQuantity}</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="w-[90%] mx-auto flex justify-between">
          <Link href="/" className="hover:text-gray-400">
            Tất cả sản phẩm
          </Link>
          <Link href="/" className="hover:text-gray-400">
            Danh mục
          </Link>
          <Link href="/" className="hover:text-gray-400">
            Sản phẩm mới
          </Link>
          <Link href="/" className="hover:text-gray-400">
            Giày nam
          </Link>
          <Link href="/" className="hover:text-gray-400">
            Giày nữ
          </Link>
          <Link href="/" className="hover:text-gray-400">
            Phụ kiện
          </Link>
        </div>
      </div>
    </header>
  );
}
