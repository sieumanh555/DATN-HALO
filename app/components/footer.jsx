"use client";
import Link from "next/link";
import { Send } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="text-sm tracking-wide py-10 px-6 md:px-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="space-y-4 md:col-span-2">
          <h2 className="text-lg font-semibold">Về HALO</h2>
          <p className="text-gray-600">
            HALO - “Highlight Alluring Lifestyle Outfit” tượng trưng cho phong
            cách thời trang nổi bật và cuốn hút.
          </p>
          <h2 className="text-lg font-semibold">Công ty TNHH HALO</h2>
          <p className="text-gray-600">
            0315986019 cấp ngày 31/10/2019 tại Sở kế hoạch đầu tư TPHCM
          </p>
        </div>

        <div className="space-y-4 text-gray-600">
          <h2 className="text-lg font-semibold">Địa chỉ</h2>
          <p className="font-semibold">Tp Hồ Chí Minh:</p>
          <ul className="list-inside list-disc">
            <li>43 Huỳnh Văn Bánh, P.17, Q.Phú Nhuận.</li>
          </ul>
          <p className="text-gray-600">
            <span className="font-semibold">Điện thoại:</span> 0999999999
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span> halo@gmail.com
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Hỗ trợ khách hàng</h2>
          <ul className="text-gray-600 space-y-2">
            <li>
              <Link href="/" className="hover:text-[#034292]">
                Giới thiệu về HALO
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-[#034292]">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-[#034292]">
                Hoàn trả
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-[#034292]">
                Hướng dẫn đặt hàng
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Điều khoản & điều kiện</h2>
          <ul className="text-gray-600 space-y-2">
            <li>
              <Link href="/" className="hover:text-[#034292]">
                Chính sách & quy định
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-[#034292]">
                Chính sách bảo mật
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-[#034292]">
                Thông tin sở hữu
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-4">
        <h2 className="text-lg font-semibold">Đăng ký nhận tin</h2>
        <form className="relative w-[280px] bg-[#fff] mt-4 flex items-center border rounded">
          <input
            type="email"
            placeholder="Nhập email của bạn"
            className="w-[240px] px-4 py-2 focus:outline-none"
          />
          <button className="absolute top-2 right-3 text-gray-600">
            <Send />
          </button>
        </form>
        <h2 className="text-lg font-semibold mt-6">Theo dõi HALO</h2>
        <div className="flex space-x-2 mt-4">
          <Link
            href="https://www.facebook.com"
            target="_blank"
            title="Facebook"
          >
            <img
              src="/assets/images/facebook-icon.png"
              alt="Facebook"
              width={32}
              height={32}
              className="max-sm:w-6"
            />
          </Link>

          <Link
            href="https://www.instagram.com/"
            target="_blank"
            title="Instagram"
          >
            <img
              src="/assets/images/instagram-icon.png"
              alt="Instagram"
              width={32}
              height={32}
              className="max-sm:w-6"
            />
          </Link>

          {/* <Link href="https://www.tiktok.com/" target="_blank" title="TikTok">
            <Image
              src="/assets/images/tiktok-icon.png"
              alt="TikTok"
              width={32}
              height={32}
              className="max-sm:w-6"
            />
          </Link> */}
        </div>
      </div>

      <p className="text-center mt-4">
        &copy;2025{" "}
        <Link href="/" className="text-[#034292]" title="Trang chủ">
          HALO
        </Link>
        . All right reserved.
      </p>
    </footer>
  );
}
